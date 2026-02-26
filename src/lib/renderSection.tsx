import { Hero } from '@/components/home/Hero'
import { StorySection } from '@/components/home/StorySection'
import { PartnersLogos } from '@/components/home/PartnersLogos'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { ProjectsShowcase } from '@/components/home/ProjectsShowcase'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { CtaBanner } from '@/components/home/CtaBanner'
import { Divider } from '@/components/home/Divider'
import { ContactSection } from '@/components/contact/ContactSection'
import { DownloadSection } from '@/components/home/DownloadSection'
import { ServicesGrid } from '@/components/services/ServicesGrid'
import { WorksGrid } from '@/components/services/WorksGrid'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderSection(section: any) {
  switch (section._type) {
    case 'heroSection':
      return (
        <Hero
          key={section._key}
          badge={section.badge}
          title={section.title}
          subtitle={section.subtitle}
          image={section.image}
          images={section.images}
        />
      )
    case 'storySectionBlock':
      return (
        <StorySection
          key={section._key}
          heading={section.heading}
          text={section.text}
          buttonText={section.buttonText}
          buttonLink={section.buttonLink}
          buttonIcon={section.buttonIcon}
          backgroundColor={section.backgroundColor}
        />
      )
    case 'partnersSectionBlock':
      return (
        <PartnersLogos
          key={section._key}
          logos={section.logos}
          backgroundColor={section.backgroundColor}
        />
      )
    case 'servicesSectionBlock':
      return (
        <ServicesOverview
          key={section._key}
          heading={section.heading}
          subheading={section.subheading}
          services={section.featuredServices}
          backgroundColor={section.backgroundColor}
        />
      )
    case 'projectsSectionBlock':
      return (
        <ProjectsShowcase
          key={section._key}
          heading={section.heading}
          subheading={section.subheading}
          stats={section.stats}
          featuredWorks={section.featuredWorks}
          categories={section.categories}
          ctaText={section.ctaText}
          ctaHref={section.ctaHref}
          backgroundColor={section.backgroundColor}
        />
      )
    case 'whyUsSectionBlock':
      return (
        <WhyChooseUs
          key={section._key}
          heading={section.heading}
          subheading={section.subheading}
          values={section.values}
          backgroundColor={section.backgroundColor}
        />
      )
    case 'ctaBlock':
      return (
        <CtaBanner
          key={section._key}
          heading={section.heading}
          text={section.text}
          buttonText={section.buttonText}
          buttonLink={section.buttonLink}
          backgroundColor={section.backgroundColor}
        />
      )
    case 'contactSectionBlock':
      return (
        <ContactSection
          key={section._key}
          phone={section.phone}
          email={section.email}
          address={section.address}
          mapUrl={section.mapUrl}
          hours={section.hours}
          formHeading={section.formHeading}
          successMessage={section.successMessage}
        />
      )
    case 'downloadSectionBlock':
      return (
        <DownloadSection
          key={section._key}
          text={section.text}
          buttonText={section.buttonText}
          fileUrl={section.fileUrl}
          backgroundColor={section.backgroundColor}
        />
      )
    case 'allServicesGridBlock':
      return (
        <section key={section._key} className={`py-16 md:py-24 ${section.backgroundColor === 'gray' ? 'bg-gray-50' : ''}`}>
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <ServicesGrid services={section.services || []} />
          </div>
        </section>
      )
    case 'allWorksGridBlock':
      return (
        <section key={section._key} className={`py-16 md:py-24 ${section.backgroundColor === 'gray' ? 'bg-gray-50' : ''}`}>
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <WorksGrid works={section.services || []} />
          </div>
        </section>
      )
    case 'dividerBlock':
      return <Divider key={section._key} />
    default:
      return null
  }
}
