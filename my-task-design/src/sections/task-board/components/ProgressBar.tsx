interface ProgressBarProps {
  progress: number
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressBar({ progress, size = 'md' }: ProgressBarProps) {
  const heightClass = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2',
  }[size]

  const getColorClass = () => {
    if (progress === 100) return 'bg-emerald-500'
    if (progress >= 75) return 'bg-indigo-500'
    if (progress >= 50) return 'bg-amber-500'
    if (progress >= 25) return 'bg-orange-500'
    return 'bg-slate-400'
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 ${heightClass} bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden`}>
        <div
          className={`${heightClass} ${getColorClass()} rounded-full transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs font-medium text-slate-600 dark:text-slate-400 w-9 text-right">
        {progress}%
      </span>
    </div>
  )
}
