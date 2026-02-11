import Link from 'next/link'
import { SanityImage } from '@/components/shared/SanityImage'

interface ServiceCardProps {
  title: string
  category?: string
  slug: string
  shortDescription?: string
  featuredImage?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
}

export function ServiceCard({ title, category, slug, shortDescription, featuredImage }: ServiceCardProps) {
  return (
    <Link
      href={`/servizi/${slug}`}
      className="group relative block h-96 rounded-lg overflow-hidden bg-gray-200"
    >
      {featuredImage ? (
        <SanityImage
          image={featuredImage}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-300" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

      {category && (
        <span className="absolute top-4 left-4 bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-md uppercase tracking-wide">
          {category}
        </span>
      )}

      <div className="absolute bottom-5 left-5 right-5">
        <h3 className="text-white text-lg font-bold mb-1">{title}</h3>
        {shortDescription && (
          <p className="text-white/85 text-sm leading-relaxed line-clamp-4">
            {shortDescription}
          </p>
        )}
      </div>
    </Link>
  )
}
