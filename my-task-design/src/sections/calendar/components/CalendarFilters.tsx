import type { CalendarFilters as FilterState, EventType, Brand, User } from '@/../product/sections/calendar/types'

const eventTypes: { value: EventType; label: string; icon: string }[] = [
  { value: 'photo_shoot', label: 'Photo Shoot', icon: '📸' },
  { value: 'video_shoot', label: 'Video Shoot', icon: '🎬' },
  { value: 'launch', label: 'Launch', icon: '🚀' },
  { value: 'editorial', label: 'Editorial', icon: '📝' },
  { value: 'event', label: 'Event', icon: '📅' }
]

interface CalendarFiltersProps {
  filters: FilterState
  brands: Brand[]
  users: User[]
  onFilterChange?: (filters: FilterState) => void
}

export function CalendarFilters({ filters, brands, users, onFilterChange }: CalendarFiltersProps) {
  const handleTypeChange = (type: EventType | null) => {
    onFilterChange?.({ ...filters, type })
  }

  const handleBrandChange = (brandId: string | null) => {
    onFilterChange?.({ ...filters, brandId })
  }

  const handlePicChange = (picId: string | null) => {
    onFilterChange?.({ ...filters, picId })
  }

  const hasActiveFilters = filters.type || filters.brandId || filters.picId

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Type Filter */}
      <div className="relative">
        <select
          value={filters.type || ''}
          onChange={(e) => handleTypeChange(e.target.value as EventType || null)}
          className="
            appearance-none pl-3 pr-8 py-2 rounded-lg
            bg-white dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            text-sm text-slate-700 dark:text-slate-200
            hover:border-indigo-300 dark:hover:border-indigo-600
            focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500
            transition-colors cursor-pointer
          "
        >
          <option value="">All Types</option>
          {eventTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.icon} {type.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="relative">
        <select
          value={filters.brandId || ''}
          onChange={(e) => handleBrandChange(e.target.value || null)}
          className="
            appearance-none pl-3 pr-8 py-2 rounded-lg
            bg-white dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            text-sm text-slate-700 dark:text-slate-200
            hover:border-indigo-300 dark:hover:border-indigo-600
            focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500
            transition-colors cursor-pointer
          "
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* PIC Filter */}
      <div className="relative">
        <select
          value={filters.picId || ''}
          onChange={(e) => handlePicChange(e.target.value || null)}
          className="
            appearance-none pl-3 pr-8 py-2 rounded-lg
            bg-white dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            text-sm text-slate-700 dark:text-slate-200
            hover:border-indigo-300 dark:hover:border-indigo-600
            focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500
            transition-colors cursor-pointer
          "
        >
          <option value="">All PICs</option>
          {users.filter(u => u.role === 'pic').map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={() => onFilterChange?.({ type: null, brandId: null, picId: null })}
          className="
            px-3 py-2 rounded-lg text-sm font-medium
            text-slate-500 dark:text-slate-400
            hover:text-slate-700 dark:hover:text-slate-200
            hover:bg-slate-100 dark:hover:bg-slate-800
            transition-colors
          "
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
