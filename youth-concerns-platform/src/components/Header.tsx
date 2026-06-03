'use client';

import Link from 'next/link';

interface HeaderProps {
  onOpenPostForm?: () => void;
}

export default function Header({ onOpenPostForm }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold shadow-sm">
            心
          </div>
          <div>
            <p className="text-sm font-bold text-purple-800 leading-tight">若者の悩みプラットフォーム</p>
            <p className="text-xs text-purple-400 leading-tight hidden sm:block">あなたは一人じゃない</p>
          </div>
        </Link>

        {onOpenPostForm && (
          <button
            onClick={onOpenPostForm}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 active:scale-95"
          >
            <span className="text-base">✏️</span>
            <span>悩みを投稿</span>
          </button>
        )}
      </div>
    </header>
  );
}
