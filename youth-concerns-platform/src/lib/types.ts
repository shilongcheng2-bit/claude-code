export interface Post {
  id: string;
  title: string;
  body: string;
  category: string;
  author: string;
  createdAt: string;
  reactions: { heart: number; hug: number; strength: number };
  replies: Reply[];
}

export interface Reply {
  id: string;
  body: string;
  author: string;
  createdAt: string;
}

export const CATEGORIES = [
  '学校・勉強',
  '友人関係',
  '恋愛',
  '家族',
  '進路・就職',
  'メンタルヘルス',
  'その他',
] as const;

export type Category = typeof CATEGORIES[number];
