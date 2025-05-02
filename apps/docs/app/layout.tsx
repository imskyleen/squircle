import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SquircleProvider } from '@/components/squircle-provider';
import { RootProvider } from 'fumadocs-ui/provider';
import { BProgressProvider } from '@/components/bprogress-provider';

export const metadata: Metadata = {
  title: {
    template: '%s - Squircle',
    default: 'Squircle',
  },
  description:
    'A library for creating beautiful squircles in CSS, offering full customization and seamless integration as well as Tailwind CSS integration.',
  authors: [
    {
      name: 'imskyleen',
      url: 'https://github.com/imskyleen',
    },
  ],
  openGraph: {
    title: 'Squircle',
    description:
      'A library for creating beautiful squircles in CSS, offering full customization and seamless integration as well as Tailwind CSS integration.',
    url: 'https://squircle.skyleen.dev',
    siteName: 'Squircle',
    images: [
      {
        url: 'https://squircle.skyleen.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Squircle',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@imskyleen',
    title: 'Squircle',
    description:
      'A library for creating beautiful squircles in CSS, offering full customization and seamless integration as well as Tailwind CSS integration.',
    images: [
      {
        url: 'https://squircle.skyleen.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Squircle',
      },
    ],
  },
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BProgressProvider>
            <SquircleProvider>
              <RootProvider>{children}</RootProvider>
            </SquircleProvider>
          </BProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
