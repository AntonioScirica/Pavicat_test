import { SanityImage } from './SanityImage'

interface PageHeaderProps {
  title: string
  subtitle?: string
  image?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
  grayscale?: boolean
}

export function PageHeader({ title, subtitle, image, grayscale = true }: PageHeaderProps) {
  return (
    <section className="relative bg-white text-white p-3 md:p-4">
      <div className="relative w-full min-h-[65vh] rounded-2xl overflow-hidden border border-white/20 flex items-center justify-center">
        {image ? (
          <div className="absolute inset-0">
            <SanityImage image={image} fill className={`object-cover ${grayscale ? 'grayscale' : ''}`} priority />
            <div className="absolute inset-0 bg-black/45" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gray-800" />
        )}
        <div className="w-full mx-auto px-6 md:px-10 lg:px-14 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3">{title}</h1>
          {subtitle && (
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  )
}
