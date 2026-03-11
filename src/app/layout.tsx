import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { sanityFetch } from '@/sanity/live'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { urlFor } from '@/sanity/image'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: settings } = await sanityFetch({ query: siteSettingsQuery }) as { data: any }

  const icons: Metadata['icons'] = {}

  if (settings?.favicon?.asset?._ref) {
    const faviconUrl = urlFor(settings.favicon).width(32).height(32).format('png').url()
    const appleTouchUrl = urlFor(settings.favicon).width(180).height(180).format('png').url()
    icons.icon = faviconUrl
    icons.apple = appleTouchUrl
  }

  return {
    title: {
      default: 'Pavicat | Pavimenti e Edilizia',
      template: '%s | Pavicat',
    },
    description: 'Pavicat - Soluzioni professionali per pavimenti e edilizia',
    icons,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
