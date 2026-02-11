import { sanityFetch } from '@/sanity/live'
import { ctaPageQuery } from '@/sanity/queries/cta'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { PageHeader } from '@/components/shared/PageHeader'
import { renderSection } from '@/lib/renderSection'
import type { Metadata } from 'next'
import { urlFor } from '@/sanity/image'

export async function generateMetadata(): Promise<Metadata> {
  const [pageResult, settingsResult] = await Promise.all([
    sanityFetch({ query: ctaPageQuery }),
    sanityFetch({ query: siteSettingsQuery }),
  ])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (pageResult.data as any)?.seo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultSeo = (settingsResult.data as any)?.defaultSeo

  return {
    title: seo?.metaTitle || 'Contattaci',
    description: seo?.metaDescription || defaultSeo?.metaDescription,
    openGraph: {
      title: seo?.metaTitle || 'Contattaci | Pavicat',
      description: seo?.metaDescription || defaultSeo?.metaDescription,
      images: seo?.ogImage ? [urlFor(seo.ogImage).width(1200).height(630).url()] : [],
      locale: 'it_IT',
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function ContattaciPage() {
  const [pageResult, settingsResult] = await Promise.all([
    sanityFetch({ query: ctaPageQuery }),
    sanityFetch({ query: siteSettingsQuery }),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = pageResult.data as any

  return (
    <>
      <PageHeader
        title={page?.hero?.title || 'Contattaci'}
        subtitle={page?.hero?.subtitle}
        image={page?.hero?.image}
        grayscale={page?.hero?.grayscale ?? true}
      />

      {page?.sections?.map(renderSection)}
    </>
  )
}
