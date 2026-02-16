interface AvatarProps {
  name: string
  initials: string
  size?: 'xs' | 'sm' | 'md'
}

const COLORS = [
  'bg-indigo-500',
  'bg-pink-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-purple-500',
  'bg-cyan-500',
  'bg-rose-500',
  'bg-teal-500',
]

export function Avatar({ name, initials, size = 'md' }: AvatarProps) {
  // Generate consistent color based on name
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % COLORS.length
  const colorClass = COLORS[colorIndex]

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
  }[size]

  return (
    <div
      className={`${sizeClasses} ${colorClass} rounded-full flex items-center justify-center text-white font-medium`}
      title={name}
    >
      {initials}
    </div>
  )
}
