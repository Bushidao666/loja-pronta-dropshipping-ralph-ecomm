'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FunnelProvider } from '@/contexts/FunnelContext';
import { FacebookPixel } from '@/components/analytics/facebook-pixel';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <title>Segredo Sujo do Dropshipping | Loja Pronta + Curso</title>
        <meta name="description" content="O Segredo Sujo que 1.247 pessoas usaram para faturar R$ 50.000+ com Dropshipping" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black overflow-x-hidden`}
      >
        <div className="absolute inset-0 bg-[url('/icons/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
        
        {/* Glassmorphism elements */}
        <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
          <div className="h-[300px] w-[300px] rounded-full bg-green-500 opacity-20 blur-[100px]"></div>
        </div>
        <div className="pointer-events-none fixed bottom-0 left-0">
          <div className="h-[200px] w-[200px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
        </div>
        <div className="pointer-events-none fixed top-0 right-0">
          <div className="h-[200px] w-[200px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
        </div>
        
        <FacebookPixel />
        <FunnelProvider>
          <main className="relative z-10">
        {children}
          </main>
        </FunnelProvider>
      </body>
    </html>
  );
}
