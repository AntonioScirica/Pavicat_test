import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/live'
import { client } from '@/sanity/client'
import { workBySlugQuery, allWorkSlugsQuery } from '@/sanity/queries/works'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { PageHeader } from '@/components/shared/PageHeader'
import { SanityImage } from '@/components/shared/SanityImage'
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

  const hasGallery = work.gallery && work.gallery.length > 0

  return (
    <>
      <PageHeader
        title={work.title}
        image={work.featuredImage}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Titolo e descrizione */}
          {work.shortDescription && (
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight leading-tight mb-4">
                {work.subtitle || work.title}
              </h2>
              <p className="text-gray-500 leading-relaxed text-base md:text-lg">
                {work.shortDescription}
              </p>
            </div>
          )}

          {/* Galleria immagini */}
          {hasGallery && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {work.gallery.map((img: any, index: number) => (
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
