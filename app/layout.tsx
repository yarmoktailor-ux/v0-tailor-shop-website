import type { Metadata, Viewport } from 'next'
import { Cairo, Amiri } from 'next/font/google'

import './globals.css'

const cairo = Cairo({ 
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
})

const amiri = Amiri({ 
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
})

export const metadata: Metadata = {
  title: 'خياط اليرموك | تفصيل وخياطة فاخرة',
  description: 'خياط اليرموك - أفخم محلات التفصيل والخياطة الرجالية منذ عام 2002. تفصيل ثياب، أقمشة فاخرة، ملابس جاهزة.',
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${amiri.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
