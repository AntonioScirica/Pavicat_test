import { SanityImage } from './SanityImage'

interface PageHeaderProps {
  title: string
  subtitle?: string
  image?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
}

export function PageHeader({ title, subtitle, image }: PageHeaderProps) {
  return (
    <section className="relative bg-gray-900 text-white pt-32 md:pt-36 pb-20 md:pb-28">
      {image && (
        <div className="absolute inset-0 opacity-30">
          <SanityImage image={image} fill className="object-cover" priority />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl text-gray-300 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
