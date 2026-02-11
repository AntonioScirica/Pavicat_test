interface TimelineItem {
  year: string
  title: string
  description?: string
}

interface TimelineProps {
  items?: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  if (!items || items.length === 0) return null

  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-translate-x-0.5" />
      <div className="space-y-8">
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col md:flex-row ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } items-start md:items-center gap-4`}
          >
            <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} pl-10 md:pl-0`}>
              <span className="text-blue-700 font-bold text-lg">{item.year}</span>
              <h4 className="font-semibold text-gray-900 mt-1">{item.title}</h4>
              {item.description && (
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              )}
            </div>
            <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-blue-700 rounded-full -translate-x-1.5 md:-translate-x-1.5 mt-2 md:mt-0" />
            <div className="hidden md:block md:w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}
