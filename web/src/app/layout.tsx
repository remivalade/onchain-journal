import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { MadeByRemivalade } from '@/components/MadeByRemivalade';

import { ClientProviders } from './client-providers';

/* ---------------- 1.  FONTS ------------------ */
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

/* ---------------- 2.  PAGE METADATA ---------- */
const siteConfig = {
  title: 'On-Chain Journal NFT – Mint Immutable Blockchain Diary Entries',
  description:
    'Turn each day’s thoughts into a collectible NFT. Timestamped, edit-proof, on-chain journal entries you can mint instantly.',
  url: 'https://onchain-journal.vercel.app',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/pics/og-onchain-journal.png'],
    url: siteConfig.url,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/pics/og-onchain-journal.png'],
  },
  icons: {
    icon: '/pics/favicon-32.png',
    shortcut: '/pics/favicon-32.png',
    apple: '/pics/apple-touch-icon.png',
  },
};

/* ---------------- 3.  ROOT LAYOUT ------------ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ClientProviders>{children}</ClientProviders>
        <MadeByRemivalade />
      </body>
    </html>
  );
}
