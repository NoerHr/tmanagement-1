import type { TaskStatistics } from '@/../product/sections/dashboard/types'

interface TaskStatusChartProps {
  statistics: TaskStatistics
}

export function TaskStatusChart({ statistics }: TaskStatusChartProps) {
  const segments = [
    { key: 'approved', value: statistics.approved, color: 'text-indigo-500', bgColor: 'bg-indigo-500', label: 'Approved' },
    { key: 'done', value: statistics.done, color: 'text-emerald-500', bgColor: 'bg-emerald-500', label: 'Done' },
    { key: 'review', value: statistics.review, color: 'text-amber-500', bgColor: 'bg-amber-500', label: 'Review' },
    { key: 'inProgress', value: statistics.inProgress, color: 'text-sky-500', bgColor: 'bg-sky-500', label: 'In Progress' },
    { key: 'toDo', value: statistics.toDo, color: 'text-slate-400', bgColor: 'bg-slate-400', label: 'To Do' },
  ]

  const total = statistics.total
  const completedPercent = Math.round(((statistics.done + statistics.approved) / total) * 100)

  // Calculate stroke dash arrays for the donut chart
  const radius = 45
  const circumference = 2 * Math.PI * radius
  let currentOffset = 0

  const segmentData = segments.map(segment => {
    const percent = (segment.value / total) * 100
    const dashArray = (percent / 100) * circumference
    const dashOffset = -currentOffset
    currentOffset += dashArray
    return { ...segment, percent, dashArray, dashOffset }
  })

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
        Task Status
      </h3>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Donut chart */}
          <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-slate-100 dark:text-slate-800"
            />
            {/* Segments */}
            {segmentData.map(segment => (
              <circle
                key={segment.key}
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${segment.dashArray} ${circumference}`}
                strokeDashoffset={segment.dashOffset}
                className={segment.color}
                style={{
                  transition: 'stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease',
                }}
              />
            ))}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {completedPercent}%
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Complete
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3">
        {segments.map(segment => (
          <div key={segment.key} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${segment.bgColor}`} />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {segment.label}
            </span>
            <span className="text-xs font-medium text-slate-900 dark:text-slate-100 ml-auto">
              {segment.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
