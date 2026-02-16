import type { WorkloadItem } from '../types'

interface WorkloadChartProps {
  distribution: WorkloadItem[]
}

export function WorkloadChart({ distribution }: WorkloadChartProps) {
  const maxTasks = Math.max(...distribution.map(d => d.taskCount))

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
        Workload
      </h3>

      <div className="flex-1 flex flex-col justify-center space-y-3">
        {distribution.map(item => {
          const percent = (item.taskCount / maxTasks) * 100
          const hasOverdue = item.overdueCount > 0

          return (
            <div key={item.picId}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {/* Avatar */}
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600
                    flex items-center justify-center text-[10px] font-medium text-white">
                    {item.picName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {item.picName.split(' ')[0]}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {item.taskCount}
                  </span>
                  {hasOverdue && (
                    <span className="text-xs text-red-500 dark:text-red-400">
                      ({item.overdueCount} late)
                    </span>
                  )}
                </div>
              </div>

              {/* Bar */}
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    hasOverdue
                      ? 'bg-gradient-to-r from-indigo-500 to-red-500'
                      : 'bg-gradient-to-r from-indigo-400 to-indigo-600'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Capacity indicator */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">Team capacity</span>
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {distribution.reduce((sum, d) => sum + d.taskCount, 0)} active tasks
          </span>
        </div>
      </div>
    </div>
  )
}
