"""
X (Twitter) affiliate auto-posting bot using Claude API for content generation.

Required environment variables:
  ANTHROPIC_API_KEY       - Claude API key
  X_API_KEY               - X (Twitter) API key
  X_API_SECRET            - X (Twitter) API secret
  X_ACCESS_TOKEN          - X access token
  X_ACCESS_TOKEN_SECRET   - X access token secret
  AFFILIATE_PRODUCT       - Product name/description to promote
  AFFILIATE_URL           - Affiliate link to include in tweets
"""

import os
import sys
import anthropic
import tweepy


def generate_tweet(product: str, affiliate_url: str) -> str:
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=300,
        messages=[
            {
                "role": "user",
                "content": (
                    f"以下の商品のアフィリエイトツイートを1つ日本語で作成してください。\n\n"
                    f"商品: {product}\n"
                    f"リンク: {affiliate_url}\n\n"
                    f"要件:\n"
                    f"- 自然で魅力的な文章\n"
                    f"- ハッシュタグを2〜3個含める\n"
                    f"- URLを含めて全体で280文字以内\n"
                    f"- URLはそのまま末尾に含める\n"
                    f"- ツイート本文のみ出力（説明不要）"
                ),
            }
        ],
    )

    tweet_text = response.content[0].text.strip()

    # Safety check: ensure URL is included
    if affiliate_url not in tweet_text:
        tweet_text = f"{tweet_text}\n{affiliate_url}"

    # Truncate if over 280 characters
    if len(tweet_text) > 280:
        # Keep the URL by truncating the text before it
        url_part = f"\n{affiliate_url}"
        max_text_len = 280 - len(url_part)
        tweet_text = tweet_text[:max_text_len].rstrip() + url_part

    return tweet_text


def post_tweet(tweet_text: str) -> str:
    client = tweepy.Client(
        consumer_key=os.environ["X_API_KEY"],
        consumer_secret=os.environ["X_API_SECRET"],
        access_token=os.environ["X_ACCESS_TOKEN"],
        access_token_secret=os.environ["X_ACCESS_TOKEN_SECRET"],
    )

    response = client.create_tweet(text=tweet_text)
    tweet_id = response.data["id"]
    return tweet_id


def main():
    product = os.environ.get("AFFILIATE_PRODUCT", "")
    affiliate_url = os.environ.get("AFFILIATE_URL", "")

    if not product or not affiliate_url:
        print("Error: AFFILIATE_PRODUCT and AFFILIATE_URL must be set")
        sys.exit(1)

    print(f"Generating tweet for: {product}")
    tweet_text = generate_tweet(product, affiliate_url)
    print(f"Generated tweet ({len(tweet_text)} chars):\n{tweet_text}\n")

    tweet_id = post_tweet(tweet_text)
    print(f"Posted successfully! Tweet ID: {tweet_id}")


if __name__ == "__main__":
    main()
