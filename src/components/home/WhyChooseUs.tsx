interface Value {
  icon?: string
  title?: string
  description?: string
}

interface WhyChooseUsProps {
  heading?: string
  subheading?: string
  values?: Value[]
  backgroundColor?: string
}

const icons: Record<string, React.ReactNode> = {
  clock: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  temple: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 10h4" strokeLinecap="round" />
    </svg>
  ),
  target: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  star: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  heart: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export function WhyChooseUs({ heading, subheading, values, backgroundColor }: WhyChooseUsProps) {
  if (!heading) return null

  return (
    <section className={`py-20 md:py-28 ${backgroundColor === 'gray' ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Title + description */}
          <div className="lg:col-span-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight leading-tight mb-2">
              {heading}
            </h2>
            {subheading && (
              <p className="text-gray-500 leading-relaxed text-[15px]">
                {subheading}
              </p>
            )}
          </div>

          {/* Right: 2x2 grid */}
          {values && values.length > 0 && (
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-xl p-7 border border-gray-100">
                  {value.icon && icons[value.icon] && (
                    <div className="text-gray-400 mb-5">
                      {icons[value.icon]}
                    </div>
                  )}
                  {value.title && (
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                  )}
                  {value.description && (
                    <p className="text-gray-500 text-[13px] leading-relaxed">
                      {value.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
