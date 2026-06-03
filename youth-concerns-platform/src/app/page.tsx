'use client';

import { useEffect, useState, useCallback } from 'react';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import PostForm from '@/components/PostForm';
import { Post, CATEGORIES } from '@/lib/types';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const url = category === 'all' ? '/api/posts' : `/api/posts?category=${encodeURIComponent(category)}`;
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <Header onOpenPostForm={() => setShowForm(true)} />

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-purple-100 rounded-full px-4 py-1.5 text-xs text-purple-600 font-medium mb-4">
            <span>🌸</span> 安心して話せる場所
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 leading-tight">
            あなたの悩み、<br className="sm:hidden" />吐き出してみよう
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            ここは匿名で悩みを打ち明けられる場所です。<br />
            一人で抱え込まないで、みんなで支え合いましょう。
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-5 inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 active:scale-95"
          >
            <span className="text-lg">✏️</span>
            <span>悩みを投稿する</span>
          </button>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
          <button
            onClick={() => setCategory('all')}
            className={`shrink-0 text-xs px-3.5 py-1.5 rounded-full border transition-all duration-150 ${
              category === 'all'
                ? 'bg-purple-600 border-purple-600 text-white'
                : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600'
            }`}
          >
            すべて
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 text-xs px-3.5 py-1.5 rounded-full border transition-all duration-150 ${
                category === cat
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-3xl mb-3">🌱</p>
            <p className="text-sm">まだ投稿がありません</p>
            <p className="text-xs mt-1">最初の一歩を踏み出してみませんか？</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <PostForm
          onClose={() => setShowForm(false)}
          onCreated={() => {
            fetchPosts();
            setShowForm(false);
          }}
        />
      )}
    </>
  );
}
