'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Post } from '@/lib/types';
import CategoryBadge from './CategoryBadge';

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

interface PostCardProps {
  post: Post;
  onReact?: (postId: string, type: 'heart' | 'hug' | 'strength') => void;
}

export default function PostCard({ post, onReact }: PostCardProps) {
  const [reactions, setReactions] = useState(post.reactions);
  const [reacted, setReacted] = useState<Set<string>>(new Set());

  const handleReact = async (type: 'heart' | 'hug' | 'strength') => {
    if (reacted.has(type)) return;

    const newReacted = new Set(reacted);
    newReacted.add(type);
    setReacted(newReacted);
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));

    try {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id, type }),
      });
      onReact?.(post.id, type);
    } catch {
      // Revert on error
      setReacted(reacted);
      setReactions(post.reactions);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <CategoryBadge category={post.category} size="sm" />
          <span className="text-xs text-gray-400 shrink-0">{timeAgo(post.createdAt)}</span>
        </div>

        <Link href={`/post/${post.id}`} className="group">
          <h2 className="text-base font-bold text-gray-800 group-hover:text-purple-700 transition-colors leading-snug mb-2 line-clamp-2">
            {post.title}
          </h2>
        </Link>

        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
          {post.body}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
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
                  className={`flex items-center gap-1 text-xs rounded-full px-2.5 py-1 border transition-all duration-150 ${
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

          <Link
            href={`/post/${post.id}`}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-purple-600 transition-colors"
          >
            <span>💬</span>
            <span>{post.replies.length}件の返信</span>
          </Link>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            投稿者: <span className="text-gray-500">{post.author}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
