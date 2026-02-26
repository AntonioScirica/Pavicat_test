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

  return (
    <>
      <PageHeader
        title={service.title}
        subtitle={service.shortDescription}
        image={service.featuredImage}
      />

      {service.contentBlocks && service.contentBlocks.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {service.contentBlocks.map((block: any, index: number) => (
                <div key={index} className="group relative block aspect-video rounded-lg overflow-hidden bg-gray-200">
                  {block.image?.image?.asset ? (
                    <SanityImage
                      image={block.image}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-gray-300 to-gray-400" />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                  {service.category && (
                    <span className="absolute top-4 left-4 bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-md uppercase tracking-wide">
                      {service.category}
                    </span>
                  )}

                  {block.text && (
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-white text-sm leading-relaxed line-clamp-5">
                        {block.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <Link
                href="/contattaci"
                className="inline-flex items-center gap-2.5 bg-gray-900 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-gray-800 transition-colors"
              >
                Richiedi un preventivo
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
