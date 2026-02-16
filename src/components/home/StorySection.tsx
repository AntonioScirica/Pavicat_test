import Link from 'next/link'
import { VideoModal } from '@/components/shared/VideoModal'

interface StorySectionProps {
  heading?: string
  text?: string
  buttonText?: string
  buttonLink?: string
  buttonIcon?: string
  backgroundColor?: string
}

function ButtonIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'play':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'arrow':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      )
    case 'download':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      )
    case 'phone':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
      )
    default:
      return null
  }
}

function isVideoUrl(url: string) {
  return url.includes('facebook.com/watch') || url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com')
}

export function StorySection({ heading, text, buttonText, buttonLink, buttonIcon, backgroundColor }: StorySectionProps) {
  if (!heading && !text) return null

  const icon = buttonIcon && buttonIcon !== 'none' ? buttonIcon : null
  const isVideo = buttonLink && isVideoUrl(buttonLink)

  return (
    <section className={`py-20 md:py-28 ${backgroundColor === 'gray' ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-24 items-start">
          {heading && (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight leading-tight">
              {heading}
            </h2>
          )}
          <div>
            {text && (
              <p className="text-gray-500 leading-loose text-base font-medium whitespace-pre-line">
                {text}
              </p>
            )}
            {buttonText && buttonLink && (
              isVideo ? (
                <VideoModal
                  url={buttonLink}
                  buttonText={buttonText}
                  icon={icon ? <ButtonIcon icon={icon} /> : undefined}
                />
              ) : (
                <Link
                  href={buttonLink}
                  target={buttonLink.startsWith('http') ? '_blank' : undefined}
                  rel={buttonLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2.5 bg-gray-900 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-gray-800 transition-colors mt-8"
                >
                  {icon && <ButtonIcon icon={icon} />}
                  {buttonText}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
