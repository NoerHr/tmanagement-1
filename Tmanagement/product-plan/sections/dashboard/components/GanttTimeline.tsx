import type { Task, Brand } from '../types'

interface GanttTimelineProps {
  tasks: Task[]
  brands: Brand[]
  onTaskClick?: (taskId: string) => void
}

const brandColors: Record<string, { bg: string; border: string; text: string }> = {
  rose: { bg: 'bg-rose-500/80', border: 'border-rose-400', text: 'text-rose-50' },
  sky: { bg: 'bg-sky-500/80', border: 'border-sky-400', text: 'text-sky-50' },
  emerald: { bg: 'bg-emerald-500/80', border: 'border-emerald-400', text: 'text-emerald-50' },
  violet: { bg: 'bg-violet-500/80', border: 'border-violet-400', text: 'text-violet-50' },
}

export function GanttTimeline({ tasks, brands, onTaskClick }: GanttTimelineProps) {
  // Generate days for the current month view (Feb 2024 based on sample data)
  const days = Array.from({ length: 29 }, (_, i) => {
    const date = new Date(2024, 1, i + 1)
    return {
      day: i + 1,
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    }
  })

  const getBrandColor = (brandId: string) => {
    const brand = brands.find(b => b.id === brandId)
    return brand ? brandColors[brand.color] : brandColors.sky
  }

  const getTaskPosition = (task: Task) => {
    const start = new Date(task.startDate)
    const end = new Date(task.deadline)
    const startDay = start.getDate()
    const endDay = end.getDate()
    const duration = endDay - startDay + 1

    // Calculate position as percentage
    const left = ((startDay - 1) / 29) * 100
    const width = (duration / 29) * 100

    return { left: `${left}%`, width: `${width}%` }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Project Timeline
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">February 2024</p>
        </div>
        <div className="flex items-center gap-3">
          {brands.map(brand => (
            <div key={brand.id} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${brandColors[brand.color].bg}`} />
              <span className="text-xs text-slate-600 dark:text-slate-400">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Days header */}
          <div className="flex border-b border-slate-200 dark:border-slate-700 pb-2 mb-3">
            {days.map(({ day, dayOfWeek, isWeekend }) => (
              <div
                key={day}
                className={`flex-1 text-center ${isWeekend ? 'opacity-50' : ''}`}
              >
                <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase">
                  {dayOfWeek}
                </div>
                <div className={`text-xs font-medium ${
                  day === 5
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {day}
                </div>
              </div>
            ))}
          </div>

          {/* Task rows */}
          <div className="space-y-2">
            {tasks.map(task => {
              const position = getTaskPosition(task)
              const colors = getBrandColor(task.brandId)

              return (
                <div key={task.id} className="relative h-10 group">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex">
                    {days.map(({ day, isWeekend }) => (
                      <div
                        key={day}
                        className={`flex-1 border-r border-slate-100 dark:border-slate-800 ${
                          isWeekend ? 'bg-slate-50/50 dark:bg-slate-800/30' : ''
                        }`}
                      />
                    ))}
                  </div>

                  {/* Task bar */}
                  <div
                    className={`absolute top-1 h-8 rounded-md ${colors.bg} ${colors.border} border
                      cursor-pointer transition-all duration-200
                      hover:scale-[1.02] hover:shadow-lg hover:z-10
                      ${task.isOverdue ? 'ring-2 ring-red-400 ring-offset-1 dark:ring-offset-slate-900' : ''}`}
                    style={{ left: position.left, width: position.width }}
                    onClick={() => onTaskClick?.(task.id)}
                  >
                    <div className="px-2 h-full flex items-center overflow-hidden">
                      <span className={`text-xs font-medium truncate ${colors.text}`}>
                        {task.title}
                      </span>
                    </div>

                    {/* Progress indicator */}
                    <div
                      className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-md"
                      style={{ width: `${task.progress}%` }}
                    />

                    {/* Hover tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2
                      opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                      <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900
                        text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
                        <div className="font-medium">{task.title}</div>
                        <div className="text-slate-300 dark:text-slate-600 mt-1">
                          {task.picName} · {task.progress}% complete
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full">
                          <div className="border-4 border-transparent border-t-slate-900 dark:border-t-slate-100" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
