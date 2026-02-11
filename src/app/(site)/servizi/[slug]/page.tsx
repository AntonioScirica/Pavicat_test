import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/live'
import { client } from '@/sanity/client'
import { serviceBySlugQuery, allServiceSlugsQuery } from '@/sanity/queries/services'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { PageHeader } from '@/components/shared/PageHeader'
import { PortableTextRenderer } from '@/components/shared/PortableTextRenderer'
import { SanityImage } from '@/components/shared/SanityImage'
import { Button } from '@/components/shared/Button'
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

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {service.body && <PortableTextRenderer value={service.body} />}
          </div>

          {service.features && service.features.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Caratteristiche</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature: any, index: number) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    {feature.icon && (
                      <div className="shrink-0 w-12 h-12">
                        <SanityImage image={feature.icon} width={48} height={48} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      {feature.description && (
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {service.gallery && service.gallery.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Galleria</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.gallery.map((image: any, index: number) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <SanityImage image={image} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto mt-16 text-center">
            <Button href="/contattaci" size="lg">
              Richiedi un preventivo
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
