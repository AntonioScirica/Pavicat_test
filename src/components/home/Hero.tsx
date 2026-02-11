import { SanityImage } from '@/components/shared/SanityImage'

interface HeroProps {
  badge?: string
  title?: string
  subtitle?: string
  image?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
}

export function Hero({ badge, title, subtitle, image }: HeroProps) {
  return (
    <section className="relative bg-white text-white min-h-screen p-3 md:p-4">
      <div className="relative w-full h-full min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-2rem)] rounded-2xl overflow-hidden border border-white/20 flex items-end">
        {image ? (
          <div className="absolute inset-0">
            <SanityImage image={image} fill className="object-cover grayscale" priority />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/40 to-black/25" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gray-800" />
        )}
        <div className="w-full mx-auto px-6 md:px-10 lg:px-14 relative z-10 pb-14 md:pb-20 pt-40">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 md:gap-6 lg:gap-16">
            <div className="max-w-170">
              {badge && (
                <span className="inline-block border border-white/30 text-white/90 text-xs tracking-wider uppercase px-4 py-1.5 rounded-sm mb-5">
                  {badge}
                </span>
              )}
              {title && (
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {title}
                </h1>
              )}
            </div>
            {subtitle && (
              <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-sm lg:max-w-72 lg:text-right shrink-0">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
