import { useState } from 'react'
import type { User, Brand, Category, TaskFilters, TaskStatus } from '../types'

interface FilterBarProps {
  users: User[]
  brands: Brand[]
  categories: Category[]
  filters: TaskFilters
  searchQuery: string
  onFilterChange: (filters: TaskFilters) => void
  onSearch: (query: string) => void
}

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'to-do', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'review', label: 'Review' },
  { value: 'approved', label: 'Approved' },
]

export function FilterBar({
  users,
  brands,
  categories,
  filters,
  searchQuery,
  onFilterChange,
  onSearch,
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasActiveFilters =
    (filters.status?.length ?? 0) > 0 ||
    (filters.picId?.length ?? 0) > 0 ||
    (filters.brandId?.length ?? 0) > 0 ||
    (filters.categoryId?.length ?? 0) > 0 ||
    filters.dateRange?.start ||
    filters.dateRange?.end

  const clearFilters = () => {
    onFilterChange({})
    onSearch('')
  }

  const toggleFilter = (
    key: 'status' | 'picId' | 'brandId' | 'categoryId',
    value: string
  ) => {
    const current = filters[key] || []
    const updated = current.includes(value as never)
      ? current.filter(v => v !== value)
      : [...current, value]
    onFilterChange({ ...filters, [key]: updated.length ? updated : undefined })
  }

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                hasActiveFilters
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
              {hasActiveFilters && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-indigo-600 text-white rounded-full">
                  {(filters.status?.length ?? 0) +
                    (filters.picId?.length ?? 0) +
                    (filters.brandId?.length ?? 0) +
                    (filters.categoryId?.length ?? 0)}
                </span>
              )}
            </button>

            {/* Clear Filters */}
            {(hasActiveFilters || searchQuery) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Status
              </label>
              <div className="flex flex-wrap gap-1.5">
                {STATUS_OPTIONS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => toggleFilter('status', value)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                      filters.status?.includes(value)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* PIC Filter */}
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                PIC
              </label>
              <div className="flex flex-wrap gap-1.5">
                {users.filter(u => u.role === 'pic').map((user) => (
                  <button
                    key={user.id}
                    onClick={() => toggleFilter('picId', user.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                      filters.picId?.includes(user.id)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {user.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Brand
              </label>
              <div className="flex flex-wrap gap-1.5">
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => toggleFilter('brandId', brand.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                      filters.brandId?.includes(brand.id)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleFilter('categoryId', category.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                      filters.categoryId?.includes(category.id)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
