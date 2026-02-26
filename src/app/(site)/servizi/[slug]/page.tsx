import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/live'
import { client } from '@/sanity/client'
import { serviceBySlugQuery, allServiceSlugsQuery } from '@/sanity/queries/services'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { PageHeader } from '@/components/shared/PageHeader'
import { SanityImage } from '@/components/shared/SanityImage'
import Link from 'next/link'
import type { Metadata } from 'next'
import { urlFor } from '@/sanity/image'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(
    `*[_type == "service"]{ "slug": slug.current }`
  )
  return (slugs || []).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const [serviceResult, settingsResult] = await Promise.all([
    sanityFetch({ query: serviceBySlugQuery, params: { slug } }),
    sanityFetch({ query: siteSettingsQuery }),
  ])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (serviceResult.data as any)?.seo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultSeo = (settingsResult.data as any)?.defaultSeo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serviceData = serviceResult.data as any

  return {
    title: seo?.metaTitle || serviceData?.title || 'Servizio',
    description: seo?.metaDescription || serviceData?.shortDescription || defaultSeo?.metaDescription,
    openGraph: {
      title: seo?.metaTitle || serviceData?.title,
      description: seo?.metaDescription || serviceData?.shortDescription,
      images: seo?.ogImage ? [urlFor(seo.ogImage).width(1200).height(630).url()] : [],
      locale: 'it_IT',
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: service } = await sanityFetch({
    query: serviceBySlugQuery,
    params: { slug },
  }) as { data: any }

  if (!service) notFound()

  const hasGallery = service.gallery && service.gallery.length > 0

  return (
    <>
      <PageHeader
        title={service.title}
        image={service.featuredImage}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Titolo e descrizione */}
          {service.shortDescription && (
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight leading-tight mb-4">
                {service.subtitle || service.title}
              </h2>
              <p className="text-gray-500 leading-relaxed text-base md:text-lg">
                {service.shortDescription}
              </p>
            </div>
          )}

          {/* Galleria immagini */}
          {hasGallery && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {service.gallery.map((img: any, index: number) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-gray-200">
                  <SanityImage
                    image={img}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </>
  )
}
