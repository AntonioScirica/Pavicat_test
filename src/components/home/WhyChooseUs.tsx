import { Award, Users } from 'lucide-react'

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
  shield: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  award: <Award className="w-6 h-6" strokeWidth={1.5} />,
  users: <Users className="w-6 h-6" strokeWidth={1.5} />,
}

export function WhyChooseUs({ heading, subheading, values, backgroundColor }: WhyChooseUsProps) {
  if (!heading) return null

  return (
    <section className={`py-20 md:py-28 ${backgroundColor === 'gray' ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Title + description */}
          <div className="lg:col-span-4 lg:sticky lg:top-64">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight leading-tight mb-2">
              {heading}
            </h2>
            {subheading && (
              <p className="text-gray-500 leading-relaxed text-base">
                {subheading}
              </p>
            )}
          </div>

          {/* Right: 2x2 grid */}
          {values && values.length > 0 && (
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-5 md:p-7 border border-gray-300">
                  {value.icon && icons[value.icon] && (
                    <div className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-md text-gray-900 mb-5">
                      {icons[value.icon]}
                    </div>
                  )}
                  {value.title && (
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                  )}
                  {value.description && (
                    <p className="text-gray-500 text-sm leading-relaxed">
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
