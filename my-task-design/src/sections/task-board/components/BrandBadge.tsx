import type { Brand, BrandColor } from '@/../product/sections/task-board/types'

interface BrandBadgeProps {
  brand: Brand
  size?: 'sm' | 'md'
}

const COLOR_CONFIG: Record<BrandColor, string> = {
  pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800',
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  green: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
}

export function BrandBadge({ brand, size = 'md' }: BrandBadgeProps) {
  const colorClass = COLOR_CONFIG[brand.color]
  const sizeClass = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'

  return (
    <span className={`inline-flex items-center rounded border font-medium ${colorClass} ${sizeClass}`}>
      {brand.name}
    </span>
  )
}
