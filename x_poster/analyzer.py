"""
X (Twitter) post analysis avatar generator using Claude API.

Fetches all available posts from the authenticated X account,
analyzes them with Claude, and outputs a detailed persona avatar.

Required environment variables:
  ANTHROPIC_API_KEY         - Claude API key
  X_API_KEY                 - X (Twitter) API key (v1.1)
  X_API_SECRET              - X (Twitter) API secret (v1.1)
  X_ACCESS_TOKEN            - X access token
  X_ACCESS_TOKEN_SECRET     - X access token secret
  X_BEARER_TOKEN            - X Bearer token (v2 API, optional)

Optional:
  X_USERNAME                - Target username (default: authenticated user)
  MAX_POSTS                 - Max posts to fetch (default: 200, max: 3200)
  OUTPUT_FILE               - Path to save avatar profile (default: avatar_profile.md)
"""

import os
import sys
import json
import tweepy
import anthropic
from datetime import datetime


# ---------------------------------------------------------------------------
# Fetch posts
# ---------------------------------------------------------------------------

def fetch_posts(username: str | None, max_posts: int) -> list[dict]:
    """Fetch up to max_posts recent tweets for the target user."""
    api = tweepy.API(
        tweepy.OAuth1UserHandler(
            consumer_key=os.environ["X_API_KEY"],
            consumer_secret=os.environ["X_API_SECRET"],
            access_token=os.environ["X_ACCESS_TOKEN"],
            access_token_secret=os.environ["X_ACCESS_TOKEN_SECRET"],
        ),
        wait_on_rate_limit=True,
    )

    screen_name = username or api.verify_credentials().screen_name
    print(f"Fetching posts for @{screen_name} (up to {max_posts})...")

    tweets: list[dict] = []
    for page in tweepy.Cursor(
        api.user_timeline,
        screen_name=screen_name,
        count=200,
        tweet_mode="extended",
        include_rts=True,
    ).pages():
        for t in page:
            tweets.append({
                "id": t.id_str,
                "text": t.full_text,
                "created_at": t.created_at.isoformat(),
                "retweet_count": t.retweet_count,
                "favorite_count": t.favorite_count,
                "is_retweet": hasattr(t, "retweeted_status"),
                "hashtags": [h["text"] for h in t.entities.get("hashtags", [])],
                "mentions": [m["screen_name"] for m in t.entities.get("user_mentions", [])],
                "urls": [u["expanded_url"] for u in t.entities.get("urls", [])],
                "lang": t.lang,
            })
            if len(tweets) >= max_posts:
                break
        if len(tweets) >= max_posts:
            break

    print(f"Fetched {len(tweets)} posts.")
    return tweets


# ---------------------------------------------------------------------------
# Build statistics summary
# ---------------------------------------------------------------------------

def build_stats(posts: list[dict]) -> dict:
    if not posts:
        return {}

    original = [p for p in posts if not p["is_retweet"]]
    retweets = [p for p in posts if p["is_retweet"]]

    all_hashtags: list[str] = []
    all_mentions: list[str] = []
    for p in posts:
        all_hashtags.extend(p["hashtags"])
        all_mentions.extend(p["mentions"])

    hashtag_freq: dict[str, int] = {}
    for h in all_hashtags:
        hashtag_freq[h.lower()] = hashtag_freq.get(h.lower(), 0) + 1

    mention_freq: dict[str, int] = {}
    for m in all_mentions:
        mention_freq[m.lower()] = mention_freq.get(m.lower(), 0) + 1

    top_hashtags = sorted(hashtag_freq.items(), key=lambda x: x[1], reverse=True)[:20]
    top_mentions = sorted(mention_freq.items(), key=lambda x: x[1], reverse=True)[:10]

    lang_freq: dict[str, int] = {}
    for p in posts:
        lang_freq[p["lang"]] = lang_freq.get(p["lang"], 0) + 1

    dates = [datetime.fromisoformat(p["created_at"]) for p in posts]
    hour_freq: dict[int, int] = {}
    for d in dates:
        hour_freq[d.hour] = hour_freq.get(d.hour, 0) + 1

    avg_likes = sum(p["favorite_count"] for p in original) / max(len(original), 1)
    avg_rts = sum(p["retweet_count"] for p in original) / max(len(original), 1)

    top_posts = sorted(original, key=lambda p: p["favorite_count"] + p["retweet_count"] * 2, reverse=True)[:5]

    return {
        "total_posts": len(posts),
        "original_posts": len(original),
        "retweets": len(retweets),
        "top_hashtags": top_hashtags,
        "top_mentions": top_mentions,
        "languages": sorted(lang_freq.items(), key=lambda x: x[1], reverse=True),
        "active_hours_utc": sorted(hour_freq.items()),
        "avg_likes_per_post": round(avg_likes, 1),
        "avg_retweets_per_post": round(avg_rts, 1),
        "top_performing_posts": [
            {"text": p["text"][:200], "likes": p["favorite_count"], "rts": p["retweet_count"]}
            for p in top_posts
        ],
        "date_range": {
            "oldest": min(dates).isoformat() if dates else None,
            "newest": max(dates).isoformat() if dates else None,
        },
    }


# ---------------------------------------------------------------------------
# Generate avatar with Claude
# ---------------------------------------------------------------------------

AVATAR_PROMPT_TEMPLATE = """\
以下はあるXユーザーの投稿データの統計サマリーと、代表的な投稿サンプルです。
このデータを徹底的に分析し、そのユーザーの「アバター（ペルソナプロフィール）」を日本語で作成してください。

---
## 統計サマリー
{stats_json}

## 投稿サンプル（オリジナル投稿から最大50件）
{sample_posts}
---

以下の項目を詳しく記述したアバタープロフィールを作成してください。Markdownで出力すること。

1. **基本ペルソナ** - 一言でこのユーザーを表すキャッチフレーズ
2. **専門分野・興味トピック** - 投稿から読み取れる主な関心テーマ（上位5〜10件）
3. **投稿スタイル・文体の特徴** - 言葉遣い、文の長さ、絵文字使用、ユーモアの有無など
4. **価値観・信条** - 繰り返し現れるテーマや主張から読み取れる価値観
5. **コミュニティとの関わり方** - メンション・RTの傾向、どんな人と交流しているか
6. **投稿パターン** - 活動時間帯、頻度、言語使用
7. **エンゲージメント傾向** - どんな投稿が反響を得ているか
8. **このユーザーが発信するなら刺さるコンテンツ** - 今後効果的な投稿のアドバイス
9. **一行ペルソナサマリー** - このユーザーを端的に表す一文（SNSバイオに使えるレベルで）
"""


def generate_avatar(posts: list[dict], stats: dict) -> str:
    original_posts = [p for p in posts if not p["is_retweet"]]
    sample = original_posts[:50]
    sample_texts = "\n\n".join(
        f"[{i+1}] {p['text'][:300]}" for i, p in enumerate(sample)
    )

    prompt = AVATAR_PROMPT_TEMPLATE.format(
        stats_json=json.dumps(stats, ensure_ascii=False, indent=2),
        sample_posts=sample_texts,
    )

    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    print("Generating avatar profile with Claude...")
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        system=(
            "あなたはSNSアナリスト兼ペルソナデザイナーです。"
            "与えられたXの投稿データから、そのユーザーの本質的なペルソナを深く洞察し、"
            "マーケターやコンテンツクリエイターが実際に活用できる詳細なアバタープロフィールを作成します。"
        ),
        messages=[{"role": "user", "content": prompt}],
    )

    return response.content[0].text.strip()


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    username = os.environ.get("X_USERNAME") or None
    max_posts = int(os.environ.get("MAX_POSTS", "200"))
    max_posts = min(max(max_posts, 1), 3200)
    output_file = os.environ.get("OUTPUT_FILE", "avatar_profile.md")

    posts = fetch_posts(username, max_posts)
    if not posts:
        print("No posts found. Exiting.")
        sys.exit(1)

    stats = build_stats(posts)
    print(f"Stats summary built. Total: {stats['total_posts']} posts, "
          f"Original: {stats['original_posts']}, RTs: {stats['retweets']}")

    avatar_profile = generate_avatar(posts, stats)

    header = (
        f"# X アバタープロフィール\n\n"
        f"**生成日時:** {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}\n"
        f"**分析投稿数:** {stats['total_posts']} 件 "
        f"（オリジナル: {stats['original_posts']} / RT: {stats['retweets']}）\n"
        f"**期間:** {stats['date_range']['oldest']} 〜 {stats['date_range']['newest']}\n\n"
        f"---\n\n"
    )

    full_output = header + avatar_profile

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(full_output)

    print(f"\nAvatar profile saved to: {output_file}")
    print("\n" + "=" * 60)
    print(full_output)


if __name__ == "__main__":
    main()
