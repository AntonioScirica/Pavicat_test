import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { sanityFetch, SanityLive } from '@/sanity/live'
import { siteSettingsQuery, navigationQuery, allServicesNavQuery, footerQuery } from '@/sanity/queries/settings'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [settingsResult, navResult, servicesResult, footerResult] = await Promise.all([
    sanityFetch({ query: siteSettingsQuery }),
    sanityFetch({ query: navigationQuery }),
    sanityFetch({ query: allServicesNavQuery }),
    sanityFetch({ query: footerQuery }),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings = settingsResult.data as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = navResult.data as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const services = (servicesResult.data as any[]) || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const footer = footerResult.data as any

  return (
    <>
      <Header
        logo={settings?.logo}
        siteName={settings?.siteName}
        navItems={nav?.mainNav || []}
        ctaButton={nav?.ctaButton}
        services={services}
      />
      <main className="min-h-screen">{children}</main>
      <Footer
        logo={footer?.logo || settings?.logoWhite || settings?.logo}
        siteName={settings?.siteName}
        footerText={footer?.description}
        footerColumns={footer?.columns}
        contactInfo={footer?.contactInfo}
        socialLinks={footer?.socialLinks}
        copyrightText={footer?.copyrightText}
      />
      <SanityLive />
      {(await draftMode()).isEnabled && <VisualEditing />}
    </>
  )
}
