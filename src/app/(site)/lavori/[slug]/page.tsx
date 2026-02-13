import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/live'
import { client } from '@/sanity/client'
import { workBySlugQuery, allWorkSlugsQuery } from '@/sanity/queries/works'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { PageHeader } from '@/components/shared/PageHeader'
import { SanityImage } from '@/components/shared/SanityImage'
import { Button } from '@/components/shared/Button'
import type { Metadata } from 'next'
import { urlFor } from '@/sanity/image'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(
    `*[_type == "work"]{ "slug": slug.current }`
  )
  return (slugs || []).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const [workResult, settingsResult] = await Promise.all([
    sanityFetch({ query: workBySlugQuery, params: { slug } }),
    sanityFetch({ query: siteSettingsQuery }),
  ])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (workResult.data as any)?.seo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultSeo = (settingsResult.data as any)?.defaultSeo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const workData = workResult.data as any

  return {
    title: seo?.metaTitle || workData?.title || 'Lavoro',
    description: seo?.metaDescription || workData?.shortDescription || defaultSeo?.metaDescription,
    openGraph: {
      title: seo?.metaTitle || workData?.title,
      description: seo?.metaDescription || workData?.shortDescription,
      images: seo?.ogImage ? [urlFor(seo.ogImage).width(1200).height(630).url()] : [],
      locale: 'it_IT',
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: work } = await sanityFetch({
    query: workBySlugQuery,
    params: { slug },
  }) as { data: any }

  if (!work) notFound()

  return (
    <>
      <PageHeader
        title={work.title}
        subtitle={work.shortDescription}
        image={work.featuredImage}
      />

      {work.contentBlocks && work.contentBlocks.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {work.contentBlocks.map((block: any, index: number) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl bg-gray-50">
                  {block.image && (
                    <div className="relative h-56 overflow-hidden">
                      <SanityImage
                        image={block.image}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  {block.text && (
                    <div className="p-6">
                      <p className="text-gray-700 leading-relaxed">{block.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <Button href="/contattaci" size="lg">
                Richiedi un preventivo
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
