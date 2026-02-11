import Link from 'next/link'
import { SanityImage } from '@/components/shared/SanityImage'

interface ServiceCardProps {
  title: string
  slug: string
  shortDescription?: string
  featuredImage?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
}

export function ServiceCard({ title, slug, shortDescription, featuredImage }: ServiceCardProps) {
  return (
    <Link
      href={`/servizi/${slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
    >
      {featuredImage && (
        <div className="relative h-52 overflow-hidden">
          <SanityImage
            image={featuredImage}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
          {title}
        </h3>
        {shortDescription && (
          <p className="text-gray-600 text-sm leading-relaxed">{shortDescription}</p>
        )}
        <span className="inline-block mt-4 text-blue-700 font-medium text-sm group-hover:underline">
          Scopri di più &rarr;
        </span>
      </div>
    </Link>
  )
}
