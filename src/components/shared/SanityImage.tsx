import Image from 'next/image'
import { urlFor } from '@/sanity/image'

interface SanityImageProps {
  image: {
    image?: {
      asset?: {
        _ref?: string
      }
    }
    alt?: string
  }
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
}

export function SanityImage({
  image,
  width = 800,
  height = 600,
  fill = false,
  className,
  sizes,
  priority = false,
}: SanityImageProps) {
  if (!image?.image?.asset?._ref) return null

  const imageUrl = urlFor(image.image).width(width).height(height).url()

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={image.alt || ''}
        fill
        className={className}
        sizes={sizes || '100vw'}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={image.alt || ''}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  )
}
