import Link from 'next/link'

interface CtaBannerProps {
  heading?: string
  text?: string
  buttonText?: string
  buttonLink?: {
    linkType?: string
    external?: string
  }
  backgroundColor?: string
}

export function CtaBanner({ heading, text, buttonText, buttonLink, backgroundColor }: CtaBannerProps) {
  if (!heading) return null

  const href = buttonLink?.linkType === 'external' ? buttonLink.external : '/contattaci'

  return (
    <section className={`py-20 md:py-28 border-t border-gray-100 ${backgroundColor === 'gray' ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{heading}</h2>
        {text && (
          <p className="text-gray-500 max-w-lg mx-auto mb-8 text-[15px] leading-relaxed whitespace-pre-line">
            {text}
          </p>
        )}
        {buttonText && href && (
          <Link
            href={href}
            className="inline-block border border-gray-900 text-gray-900 text-xs font-semibold uppercase tracking-wider px-8 py-3 rounded-sm hover:bg-gray-900 hover:text-white transition-colors"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  )
}
