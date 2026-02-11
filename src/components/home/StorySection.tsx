interface StorySectionProps {
  heading?: string
  text?: string
  backgroundColor?: string
}

export function StorySection({ heading, text, backgroundColor }: StorySectionProps) {
  if (!heading && !text) return null

  return (
    <section className={`py-20 md:py-28 ${backgroundColor === 'gray' ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start">
          {heading && (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight leading-tight">
              {heading}
            </h2>
          )}
          {text && (
            <p className="text-gray-500 leading-[2] text-base font-medium">
              {text}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
