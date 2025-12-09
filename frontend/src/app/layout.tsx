import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guardian Dashboard',
  description: 'Real-time monitoring for blind accessibility device',
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#3B82F6',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 to-slate-100">{children}</body>
    </html>
  )
}
