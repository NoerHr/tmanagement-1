import type { Event, EventType, Brand, User } from '../types'

// Event type colors - distinct visual styling for each type
const eventTypeStyles: Record<EventType, { bg: string; border: string; icon: string }> = {
  photo_shoot: {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-l-rose-500',
    icon: '📸'
  },
  video_shoot: {
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    border: 'border-l-violet-500',
    icon: '🎬'
  },
  launch: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-l-emerald-500',
    icon: '🚀'
  },
  editorial: {
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    border: 'border-l-sky-500',
    icon: '📝'
  },
  event: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-l-amber-500',
    icon: '📅'
  }
}

interface EventCardProps {
  event: Event
  brand?: Brand
  user?: User
  compact?: boolean
  onClick?: () => void
}

export function EventCard({ event, brand, compact = false, onClick }: EventCardProps) {
  const styles = eventTypeStyles[event.type]

  if (compact) {
    return (
      <button
        onClick={onClick}
        className={`
          w-full text-left px-2 py-1 rounded text-xs truncate
          border-l-2 ${styles.border} ${styles.bg}
          hover:ring-2 hover:ring-indigo-300 dark:hover:ring-indigo-600
          transition-all duration-150
        `}
      >
        <span className="mr-1">{styles.icon}</span>
        <span className="font-medium text-slate-700 dark:text-slate-200 truncate">
          {event.title}
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-3 rounded-lg
        border-l-4 ${styles.border} ${styles.bg}
        hover:ring-2 hover:ring-indigo-300 dark:hover:ring-indigo-600
        hover:shadow-md
        transition-all duration-200
        group
      `}
    >
      <div className="flex items-start gap-2">
        <span className="text-lg flex-shrink-0">{styles.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
            {event.title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {event.startTime} - {event.endTime}
          </p>
          {brand && (
            <span className="inline-block mt-1.5 px-2 py-0.5 text-xs font-medium rounded-full bg-slate-200/70 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300">
              {brand.name}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
