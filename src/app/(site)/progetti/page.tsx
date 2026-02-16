import { sanityFetch } from '@/sanity/live'
import { allWorksQuery } from '@/sanity/queries/works'
import { projectsGalleryPageQuery } from '@/sanity/queries/gallery'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { PageHeader } from '@/components/shared/PageHeader'
import { WorksGrid } from '@/components/services/WorksGrid'
import type { Metadata } from 'next'
import { urlFor } from '@/sanity/image'

export async function generateMetadata(): Promise<Metadata> {
  const [pageResult, settingsResult] = await Promise.all([
    sanityFetch({ query: projectsGalleryPageQuery }),
    sanityFetch({ query: siteSettingsQuery }),
  ])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (pageResult.data as any)?.seo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultSeo = (settingsResult.data as any)?.defaultSeo

  return {
    title: seo?.metaTitle || 'Progetti',
    description: seo?.metaDescription || defaultSeo?.metaDescription,
    openGraph: {
      title: seo?.metaTitle || 'Progetti | Pavicat',
      description: seo?.metaDescription || defaultSeo?.metaDescription,
      images: seo?.ogImage ? [urlFor(seo.ogImage).width(1200).height(630).url()] : [],
      locale: 'it_IT',
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function ProgettiPage() {
  const [pageResult, worksResult] = await Promise.all([
    sanityFetch({ query: projectsGalleryPageQuery }),
    sanityFetch({ query: allWorksQuery }),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = pageResult.data as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const works = (worksResult.data as any[]) || []

  return (
    <>
      <PageHeader
        title={page?.hero?.title || 'I Nostri Progetti'}
        subtitle={page?.hero?.subtitle}
        image={page?.hero?.image}
        grayscale={page?.hero?.grayscale ?? false}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <WorksGrid works={works} />
        </div>
      </section>
    </>
  )
}
