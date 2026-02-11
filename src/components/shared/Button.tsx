import Link from 'next/link'

interface ButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const variants = {
  primary: 'bg-blue-700 text-white hover:bg-blue-800',
  secondary: 'bg-gray-800 text-white hover:bg-gray-900',
  outline: 'border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  size = 'md',
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block font-semibold rounded-lg transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  )
}
