'use client';

import { useState } from 'react';
import { Reply } from '@/lib/types';

interface ReplyFormProps {
  postId: string;
  onReplyAdded: (reply: Reply) => void;
}

export default function ReplyForm({ postId, onReplyAdded }: ReplyFormProps) {
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!body.trim()) {
      setError('返信内容を入力してください');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body, author }),
      });

      if (res.ok) {
        const newReply: Reply = await res.json();
        onReplyAdded(newReply);
        setBody('');
        setAuthor('');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        const data = await res.json();
        setError(data.error || '返信の投稿に失敗しました');
      }
    } catch {
      setError('ネットワークエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-sm p-5 sm:p-6">
      <h3 className="text-base font-bold text-gray-700 mb-1 flex items-center gap-2">
        <span>✉️</span>
        <span>返信する</span>
      </h3>
      <p className="text-xs text-gray-400 mb-4">
        優しい言葉をかけてあげましょう。あなたの一言が誰かの支えになります。
      </p>

      {submitted && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
          <span>🎉</span>
          <span>返信を投稿しました！ありがとうございます。</span>
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            maxLength={500}
            placeholder="励ましの言葉、経験談、アドバイスなど、なんでも大丈夫です。"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 placeholder-gray-300 transition-all resize-none leading-relaxed"
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{body.length}/500</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={30}
            placeholder="ニックネーム（任意・空欄で匿名）"
            className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 placeholder-gray-300 transition-all"
          />
          <button
            type="submit"
            disabled={isSubmitting || !body.trim()}
            className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
          >
            {isSubmitting ? '送信中...' : '返信する'}
          </button>
        </div>
      </form>
    </div>
  );
}
