import { useState, useMemo } from 'react'
import type { CalendarProps, CalendarView, CalendarFilters as FilterState, Event } from '@/../product/sections/calendar/types'
import { EventCard } from './EventCard'
import { CalendarFilters } from './CalendarFilters'
import { EventDetailModal } from './EventDetailModal'
import { EventFormModal } from './EventFormModal'

// Helper functions
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

const formatMonthYear = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

const isSameDay = (date1: string, date2: Date) => {
  const d1 = new Date(date1)
  return d1.getFullYear() === date2.getFullYear() &&
    d1.getMonth() === date2.getMonth() &&
    d1.getDate() === date2.getDate()
}

const isToday = (date: Date) => {
  const today = new Date()
  return date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function Calendar({
  events,
  users,
  brands,
  currentView = 'month',
  selectedDate,
  filters = {},
  onViewChange,
  onDateChange,
  onFilterChange,
  onEventClick,
  onEventCreate,
  onEventSave,
  onEventUpdate,
  onEventDelete
}: CalendarProps) {
  const [viewDate, setViewDate] = useState(() => selectedDate ? new Date(selectedDate) : new Date())
  const [view, setView] = useState<CalendarView>(currentView)
  const [activeFilters, setActiveFilters] = useState<FilterState>(filters)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (activeFilters.type && event.type !== activeFilters.type) return false
      if (activeFilters.brandId && event.brandId !== activeFilters.brandId) return false
      if (activeFilters.picId && event.picId !== activeFilters.picId) return false
      return true
    })
  }, [events, activeFilters])

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter((event) => isSameDay(event.date, date))
  }

  // Navigation
  const navigateMonth = (delta: number) => {
    const newDate = new Date(viewDate)
    newDate.setMonth(newDate.getMonth() + delta)
    setViewDate(newDate)
    onDateChange?.(newDate.toISOString().split('T')[0])
  }

  const goToToday = () => {
    const today = new Date()
    setViewDate(today)
    onDateChange?.(today.toISOString().split('T')[0])
  }

  // View change
  const handleViewChange = (newView: CalendarView) => {
    setView(newView)
    onViewChange?.(newView)
  }

  // Filter change
  const handleFilterChange = (newFilters: FilterState) => {
    setActiveFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  // Event interactions
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setIsEditing(false)
    onEventClick?.(event.id)
  }

  const handleEventUpdate = (updates: Partial<Event>) => {
    if (selectedEvent) {
      onEventUpdate?.(selectedEvent.id, updates)
      setSelectedEvent(null)
      setIsEditing(false)
    }
  }

  const handleEventDelete = () => {
    if (selectedEvent) {
      onEventDelete?.(selectedEvent.id)
      setSelectedEvent(null)
    }
  }

  const handleCreateEvent = () => {
    setShowCreateModal(true)
    onEventCreate?.()
  }

  // Render calendar grid
  const renderMonthView = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const days: (Date | null)[] = []

    // Empty slots for days before first of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return (
      <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        {/* Day headers */}
        {DAYS.map((day) => (
          <div
            key={day}
            className="bg-slate-50 dark:bg-slate-800 px-2 py-3 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
          >
            {day}
          </div>
        ))}

        {/* Calendar cells */}
        {days.map((date, index) => {
          if (!date) {
            return (
              <div
                key={`empty-${index}`}
                className="bg-slate-50/50 dark:bg-slate-800/50 min-h-[120px]"
              />
            )
          }

          const dayEvents = getEventsForDate(date)
          const today = isToday(date)

          return (
            <div
              key={date.toISOString()}
              className={`
                bg-white dark:bg-slate-900 min-h-[120px] p-2 transition-colors
                hover:bg-slate-50 dark:hover:bg-slate-800/70
                ${today ? 'ring-2 ring-inset ring-indigo-500' : ''}
              `}
            >
              <div className={`
                text-sm font-medium mb-2 w-7 h-7 flex items-center justify-center rounded-full
                ${today
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 dark:text-slate-300'
                }
              `}>
                {date.getDate()}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    brand={brands.find(b => b.id === event.brandId)}
                    compact
                    onClick={() => handleEventClick(event)}
                  />
                ))}
                {dayEvents.length > 3 && (
                  <button className="w-full text-xs text-center text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                    +{dayEvents.length - 3} more
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Render week view
  const renderWeekView = () => {
    const startOfWeek = new Date(viewDate)
    startOfWeek.setDate(viewDate.getDate() - viewDate.getDay())

    const weekDays: Date[] = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      weekDays.push(day)
    }

    return (
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((date) => {
          const dayEvents = getEventsForDate(date)
          const today = isToday(date)

          return (
            <div key={date.toISOString()} className="min-h-[300px]">
              <div className={`
                text-center pb-3 mb-3 border-b border-slate-200 dark:border-slate-700
                ${today ? 'border-b-indigo-500' : ''}
              `}>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                  {DAYS[date.getDay()]}
                </div>
                <div className={`
                  text-lg font-bold mt-1 w-10 h-10 mx-auto flex items-center justify-center rounded-full
                  ${today
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-800 dark:text-slate-200'
                  }
                `}>
                  {date.getDate()}
                </div>
              </div>
              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    brand={brands.find(b => b.id === event.brandId)}
                    onClick={() => handleEventClick(event)}
                  />
                ))}
                {dayEvents.length === 0 && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">
                    No events
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Render day view
  const renderDayView = () => {
    const dayEvents = getEventsForDate(viewDate)
    const today = isToday(viewDate)

    return (
      <div>
        <div className={`
          text-center pb-4 mb-6 border-b border-slate-200 dark:border-slate-700
          ${today ? 'border-b-indigo-500' : ''}
        `}>
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase">
            {DAYS[viewDate.getDay()]}
          </div>
          <div className={`
            text-4xl font-bold mt-1 w-16 h-16 mx-auto flex items-center justify-center rounded-full
            ${today
              ? 'bg-indigo-600 text-white'
              : 'text-slate-800 dark:text-slate-200'
            }
          `}>
            {viewDate.getDate()}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {formatMonthYear(viewDate)}
          </div>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {dayEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">📅</div>
              <p className="text-slate-500 dark:text-slate-400">No events scheduled for this day</p>
              <button
                onClick={handleCreateEvent}
                className="mt-4 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
              >
                + Add Event
              </button>
            </div>
          ) : (
            dayEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                brand={brands.find(b => b.id === event.brandId)}
                user={users.find(u => u.id === event.picId)}
                onClick={() => handleEventClick(event)}
              />
            ))
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Calendar
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage team schedules and events
          </p>
        </div>

        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              {formatMonthYear(viewDate)}
            </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View Switcher */}
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            {(['day', 'week', 'month'] as CalendarView[]).map((v) => (
              <button
                key={v}
                onClick={() => handleViewChange(v)}
                className={`
                  px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-all
                  ${view === v
                    ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }
                `}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Add Event Button */}
          <button
            onClick={handleCreateEvent}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Add Event</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <CalendarFilters
          filters={activeFilters}
          brands={brands}
          users={users}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Calendar View */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
      </div>

      {/* Event Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5"><span>📸</span> Photo Shoot</span>
        <span className="flex items-center gap-1.5"><span>🎬</span> Video Shoot</span>
        <span className="flex items-center gap-1.5"><span>🚀</span> Launch</span>
        <span className="flex items-center gap-1.5"><span>📝</span> Editorial</span>
        <span className="flex items-center gap-1.5"><span>📅</span> Event</span>
      </div>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        users={users}
        brands={brands}
        isEditing={isEditing}
        onClose={() => { setSelectedEvent(null); setIsEditing(false) }}
        onEdit={() => setIsEditing(true)}
        onSave={handleEventUpdate}
        onDelete={handleEventDelete}
      />

      {/* Create Event Modal */}
      <EventFormModal
        isOpen={showCreateModal}
        users={users}
        brands={brands}
        existingEvents={events}
        onClose={() => setShowCreateModal(false)}
        onSubmit={(eventData) => {
          onEventSave?.(eventData)
          setShowCreateModal(false)
        }}
      />
      </div>
    </div>
  )
}
