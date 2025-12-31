import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'MNP SNS運用ヘルプデスク | XマーケAI',
    description: 'MNP（携帯乗り換え）案件のSNS集客を支援する専門AIアシスタント',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
          <html lang="ja">
                <body className={inter.className}>{children}</body>body>
          </html>html>
        );
}</html>
