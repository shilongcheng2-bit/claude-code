import { NextRequest, NextResponse } from 'next/server';
import { readPosts, createPost } from '@/lib/store';
import { Post } from '@/lib/types';
import { randomUUID } from 'crypto';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let posts = readPosts();

  if (category && category !== 'all') {
    posts = posts.filter((p) => p.category === category);
  }

  // Newest first
  posts = posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, body: postBody, category, author } = body;

    if (!title?.trim() || !postBody?.trim() || !category) {
      return NextResponse.json(
        { error: 'タイトル、本文、カテゴリーは必須です' },
        { status: 400 }
      );
    }

    const newPost: Post = {
      id: randomUUID(),
      title: title.trim(),
      body: postBody.trim(),
      category,
      author: author?.trim() || '匿名',
      createdAt: new Date().toISOString(),
      reactions: { heart: 0, hug: 0, strength: 0 },
      replies: [],
    };

    createPost(newPost);
    return NextResponse.json(newPost, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
