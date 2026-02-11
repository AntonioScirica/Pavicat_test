import { SanityImage } from '@/components/shared/SanityImage'

interface Logo {
  image?: { asset?: { _ref?: string } }
  alt?: string
}

interface PartnersLogosProps {
  logos?: Logo[]
  backgroundColor?: string
}

export function PartnersLogos({ logos, backgroundColor }: PartnersLogosProps) {
  if (!logos || logos.length === 0) return null

  return (
    <section className={`border-t border-gray-100 ${backgroundColor === 'gray' ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex items-center gap-8 md:gap-12 overflow-x-auto scrollbar-hide">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <SanityImage
                image={{ image: logo.image, alt: logo.alt }}
                width={140}
                height={50}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
