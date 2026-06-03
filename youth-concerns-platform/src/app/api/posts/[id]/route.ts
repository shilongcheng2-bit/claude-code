import { NextRequest, NextResponse } from 'next/server';
import { getPostById, updatePost } from '@/lib/store';
import { Reply } from '@/lib/types';
import { randomUUID } from 'crypto';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = getPostById(params.id);
  if (!post) {
    return NextResponse.json({ error: '投稿が見つかりません' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = getPostById(params.id);
    if (!post) {
      return NextResponse.json({ error: '投稿が見つかりません' }, { status: 404 });
    }

    const body = await request.json();
    const { body: replyBody, author } = body;

    if (!replyBody?.trim()) {
      return NextResponse.json({ error: '返信内容を入力してください' }, { status: 400 });
    }

    const newReply: Reply = {
      id: randomUUID(),
      body: replyBody.trim(),
      author: author?.trim() || '匿名',
      createdAt: new Date().toISOString(),
    };

    post.replies.push(newReply);
    updatePost(post);

    return NextResponse.json(newReply, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
