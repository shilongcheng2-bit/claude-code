'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Post, Reply } from '@/lib/types';
import Header from '@/components/Header';
import CategoryBadge from '@/components/CategoryBadge';
import ReplyForm from '@/components/ReplyForm';

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'たった今';
  if (diffMins < 60) return `${diffMins}分前`;
  if (diffHours < 24) return `${diffHours}時間前`;
  if (diffDays < 7) return `${diffDays}日前`;
  return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [reactions, setReactions] = useState({ heart: 0, hug: 0, strength: 0 });
  const [reacted, setReacted] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${params.id}`);
        if (!res.ok) { router.push('/'); return; }
        const data: Post = await res.json();
        setPost(data);
        setReactions(data.reactions);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.id, router]);

  const handleReact = async (type: 'heart' | 'hug' | 'strength') => {
    if (reacted.has(type) || !post) return;
    const newReacted = new Set(reacted);
    newReacted.add(type);
    setReacted(newReacted);
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    await fetch('/api/reactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: post.id, type }),
    });
  };

  const handleReplySubmitted = (reply: Reply) => {
    if (!post) return;
    setPost({ ...post, replies: [...post.replies, reply] });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800 mb-5 transition-colors">
          ← 一覧に戻る
        </Link>

        {/* Post */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-sm p-5 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <CategoryBadge category={post.category} />
            <span className="text-xs text-gray-400">{timeAgo(post.createdAt)}</span>
          </div>

          <h1 className="text-xl font-bold text-gray-800 mb-3 leading-snug">{post.title}</h1>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mb-6">{post.body}</p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {(['heart', 'hug', 'strength'] as const).map((type) => {
                const emoji = type === 'heart' ? '❤️' : type === 'hug' ? '🤗' : '💪';
                const label = type === 'heart' ? 'いいね' : type === 'hug' ? 'ハグ' : '頑張れ';
                const isReacted = reacted.has(type);
                return (
                  <button
                    key={type}
                    onClick={() => handleReact(type)}
                    disabled={isReacted}
                    title={label}
                    className={`flex items-center gap-1.5 text-sm rounded-full px-3 py-1.5 border transition-all duration-150 ${
                      isReacted
                        ? 'bg-purple-100 border-purple-300 text-purple-700 cursor-default'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 active:scale-95'
                    }`}
                  >
                    <span>{emoji}</span>
                    <span>{reactions[type]}</span>
                  </button>
                );
              })}
            </div>
            <span className="text-xs text-gray-400">
              投稿者: <span className="text-gray-500">{post.author}</span>
            </span>
          </div>
        </div>

        {/* Replies */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            返信 <span className="text-purple-500 font-bold">{post.replies.length}</span>件
          </h2>

          {post.replies.length === 0 ? (
            <div className="text-center py-8 text-gray-400 bg-white/50 rounded-2xl border border-dashed border-purple-100">
              <p className="text-2xl mb-2">💌</p>
              <p className="text-sm">最初の応援メッセージを送りましょう</p>
            </div>
          ) : (
            <div className="space-y-3">
              {post.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="bg-white/80 rounded-2xl border border-purple-100 px-4 py-3.5"
                >
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mb-2">{reply.body}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {reply.author || '匿名'}
                    </span>
                    <span className="text-xs text-gray-400">{timeAgo(reply.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Reply form */}
        <ReplyForm postId={post.id} onReplyAdded={handleReplySubmitted} />
      </main>
    </>
  );
}
