import type { TaskStatus } from '../types'

interface StatusBadgeProps {
  status: TaskStatus
}

const STATUS_CONFIG: Record<TaskStatus, { label: string; className: string }> = {
  'to-do': {
    label: 'To Do',
    className: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  },
  'done': {
    label: 'Done',
    className: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  },
  'review': {
    label: 'Review',
    className: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  },
  'approved': {
    label: 'Approved',
    className: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}
