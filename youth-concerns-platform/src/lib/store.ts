import fs from 'fs';
import path from 'path';
import { Post } from './types';

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json');

export function readPosts(): Post[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as Post[];
  } catch {
    return [];
  }
}

export function writePosts(posts: Post[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
}

export function getPostById(id: string): Post | undefined {
  const posts = readPosts();
  return posts.find((p) => p.id === id);
}

export function createPost(post: Post): Post {
  const posts = readPosts();
  posts.unshift(post);
  writePosts(posts);
  return post;
}

export function updatePost(updated: Post): void {
  const posts = readPosts();
  const idx = posts.findIndex((p) => p.id === updated.id);
  if (idx !== -1) {
    posts[idx] = updated;
    writePosts(posts);
  }
}
