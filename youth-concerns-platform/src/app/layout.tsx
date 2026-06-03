import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '若者の悩みプラットフォーム',
  description: '匿名で悩みを打ち明けて、みんなで支え合おう。あなたは一人じゃない。',
  keywords: ['悩み相談', '匿名', '若者', 'メンタルヘルス', 'サポート'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        {children}
      </body>
    </html>
  );
}
