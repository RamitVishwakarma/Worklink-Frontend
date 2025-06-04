import Navbar, { Header } from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Oswald, JetBrains_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

// Industrial Typography Implementation
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-industrial-body',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-industrial-heading',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-industrial-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WorkLink',
  description: 'Connecting Talent with Opportunity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} ${jetbrainsMono.variable} flex flex-col min-h-screen font-industrial-body antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
