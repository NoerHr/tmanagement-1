import type { UpcomingLaunch } from '../types'

interface LaunchCountdownProps {
  launch: UpcomingLaunch | null
}

export function LaunchCountdown({ launch }: LaunchCountdownProps) {
  if (!launch) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-4">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800
          flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">No upcoming launches</p>
      </div>
    )
  }

  const launchDate = new Date(launch.date)
  const formattedDate = launchDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
        Next Launch
      </h3>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Countdown number */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-2xl bg-amber-400/20 dark:bg-amber-500/10 rounded-full" />

          <div className="relative">
            <span className="text-5xl font-bold bg-gradient-to-br from-amber-500 to-orange-600
              bg-clip-text text-transparent">
              {launch.daysUntil}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
              days left
            </p>
          </div>
        </div>

        {/* Launch details */}
        <div className="mt-4 space-y-1">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-2">
            {launch.title}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{launch.brandName}</span>
            <span>·</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-auto pt-3">
        <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full
              transition-all duration-500"
            style={{ width: `${Math.max(0, 100 - (launch.daysUntil / 30) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
