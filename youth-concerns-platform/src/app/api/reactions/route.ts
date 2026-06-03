import { NextRequest, NextResponse } from 'next/server';
import { getPostById, updatePost } from '@/lib/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, type } = body;

    if (!postId || !type || !['heart', 'hug', 'strength'].includes(type)) {
      return NextResponse.json({ error: '無効なリクエストです' }, { status: 400 });
    }

    const post = getPostById(postId);
    if (!post) {
      return NextResponse.json({ error: '投稿が見つかりません' }, { status: 404 });
    }

    post.reactions[type as 'heart' | 'hug' | 'strength'] += 1;
    updatePost(post);

    return NextResponse.json({ reactions: post.reactions });
  } catch {
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
