import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/live'
import { client } from '@/sanity/client'
import { workBySlugQuery, allWorkSlugsQuery } from '@/sanity/queries/works'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { SanityImage } from '@/components/shared/SanityImage'
import { Button } from '@/components/shared/Button'
import { MapPin, Calendar } from 'lucide-react'
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

  const formattedDate = work.date
    ? new Date(work.date).toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })
    : null

  return (
    <>
      {/* Hero image with title overlay - full color */}
      <section className="relative bg-white text-white p-3 md:p-4">
        <div className="relative w-full min-h-[65vh] rounded-2xl overflow-hidden flex items-center justify-center">
          {work.featuredImage ? (
            <div className="absolute inset-0">
              <SanityImage image={work.featuredImage} fill className="object-cover" priority sizes="100vw" />
              <div className="absolute inset-0 bg-black/45" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gray-800" />
          )}
          <div className="relative z-10 text-center px-6">
            {work.category && (
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-md uppercase tracking-wider mb-4">
                {work.category}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {work.title}
            </h1>
            {(work.location || formattedDate) && (
              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-white/70">
                {work.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {work.location}
                  </span>
                )}
                {formattedDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formattedDate}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Description below image */}
      {work.shortDescription && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              {work.shortDescription}
            </p>
          </div>
        </section>
      )}

      {/* Content blocks */}
      {work.contentBlocks && work.contentBlocks.length > 0 && (
        <section className="pb-16 md:pb-24">
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
