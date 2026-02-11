interface DownloadSectionProps {
  text?: string
  buttonText?: string
  fileUrl?: string
  backgroundColor?: string
}

export function DownloadSection({ text, buttonText, fileUrl, backgroundColor }: DownloadSectionProps) {
  return (
    <section className={`py-16 md:py-24 ${backgroundColor === 'gray' ? 'bg-gray-50' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 text-center">
        {text && (
          <p className="text-lg md:text-xl font-semibold text-gray-900 leading-relaxed whitespace-pre-line">
            {text}
          </p>
        )}
        {buttonText && fileUrl && (
          <a
            href={`${fileUrl}?dl=`}
            className="inline-flex items-center gap-2.5 bg-gray-900 text-white text-xs font-semibold uppercase tracking-wider px-8 py-3 rounded-sm hover:bg-gray-800 transition-colors mt-10"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  )
}
