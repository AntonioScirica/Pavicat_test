import { SanityImage } from '@/components/shared/SanityImage'

interface ServiceCardProps {
  category?: string
  text?: string
  image?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
}

export function ServiceCard({ category, text, image }: ServiceCardProps) {
  return (
    <div className="group relative block aspect-4/3 rounded-lg overflow-hidden bg-gray-200">
      {image?.image?.asset ? (
        <SanityImage
          image={image}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-gray-300 to-gray-400" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

      {category && (
        <span className="absolute top-4 left-4 bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-md uppercase tracking-wide">
          {category}
        </span>
      )}

      {text && (
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-white text-sm leading-relaxed line-clamp-5">
            {text}
          </p>
        </div>
      )}
    </div>
  )
}
