import type { Brand } from '@/../product/sections/dashboard/types'

interface BrandFilterProps {
  brands: Brand[]
  selectedBrandId: string | null
  onBrandChange: (brandId: string | null) => void
}

const brandColorStyles: Record<string, { active: string; inactive: string }> = {
  rose: {
    active: 'bg-rose-500 text-white border-rose-500',
    inactive: 'hover:bg-rose-50 hover:border-rose-300 dark:hover:bg-rose-950/30 dark:hover:border-rose-800',
  },
  sky: {
    active: 'bg-sky-500 text-white border-sky-500',
    inactive: 'hover:bg-sky-50 hover:border-sky-300 dark:hover:bg-sky-950/30 dark:hover:border-sky-800',
  },
  emerald: {
    active: 'bg-emerald-500 text-white border-emerald-500',
    inactive: 'hover:bg-emerald-50 hover:border-emerald-300 dark:hover:bg-emerald-950/30 dark:hover:border-emerald-800',
  },
  violet: {
    active: 'bg-violet-500 text-white border-violet-500',
    inactive: 'hover:bg-violet-50 hover:border-violet-300 dark:hover:bg-violet-950/30 dark:hover:border-violet-800',
  },
}

export function BrandFilter({ brands, selectedBrandId, onBrandChange }: BrandFilterProps) {
  return (
    <div className="flex items-center gap-2">
      {/* All brands button */}
      <button
        onClick={() => onBrandChange(null)}
        className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all duration-200 ${
          selectedBrandId === null
            ? 'bg-indigo-500 text-white border-indigo-500'
            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
        }`}
      >
        All Brands
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />

      {/* Brand buttons */}
      {brands.map(brand => {
        const styles = brandColorStyles[brand.color]
        const isSelected = selectedBrandId === brand.id

        return (
          <button
            key={brand.id}
            onClick={() => onBrandChange(brand.id)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all duration-200 ${
              isSelected
                ? styles.active
                : `bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 ${styles.inactive}`
            }`}
          >
            {brand.name}
          </button>
        )
      })}
    </div>
  )
}
