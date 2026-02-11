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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {heading && /progetto/i.test(heading) ? (() => {
            const match = heading.match(/progetto/i)!
            const idx = match.index! + match[0].length
            return <>{heading.slice(0, idx)}<br className="sm:hidden" />{heading.slice(idx)}</>
          })() : heading}
        </h2>
        {text && (
          <p className="text-gray-500 max-w-xl mx-auto mb-8 text-base md:text-lg leading-relaxed whitespace-normal sm:whitespace-pre-line">
            {text}
          </p>
        )}
        {buttonText && href && (
          <Link
            href={href}
            className="inline-block bg-gray-900 text-white text-xs font-semibold uppercase tracking-wider px-8 py-3 rounded-sm hover:bg-gray-800 transition-colors"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  )
}
