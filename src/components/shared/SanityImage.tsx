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

  if (fill) {
    const fillUrl = urlFor(image.image).width(1600).auto('format').url()
    return (
      <Image
        src={fillUrl}
        alt={image.alt || ''}
        fill
        className={className}
        sizes={sizes || '100vw'}
        priority={priority}
      />
    )
  }

  const imageUrl = urlFor(image.image).width(width).auto('format').url()

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
