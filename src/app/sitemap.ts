import type { MetadataRoute } from 'next'
import { client } from '@/sanity/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pavicat.it'

  let services: { slug: string }[] = []
  try {
    services = await client.fetch<{ slug: string }[]>(
      `*[_type == "service"]{ "slug": slug.current }`
    )
  } catch {
    // Sanity not configured yet
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/servizi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
{ url: `${baseUrl}/chi-siamo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contattaci`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/lavora-con-noi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const servicePages: MetadataRoute.Sitemap = (services || []).map((s) => ({
    url: `${baseUrl}/servizi/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages]
}
