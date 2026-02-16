import type { Task, User, Brand, Category, TaskStatus } from '@/../product/sections/task-board/types'
import { ProgressBar } from './ProgressBar'
import { BrandBadge } from './BrandBadge'
import { Avatar } from './Avatar'

interface TaskKanbanProps {
  tasks: Task[]
  users: User[]
  brands: Brand[]
  categories: Category[]
  onTaskClick: (taskId: string) => void
  onStatusChange: (taskId: string, status: TaskStatus) => void
}

const COLUMNS: { status: TaskStatus; label: string; color: string }[] = [
  { status: 'to-do', label: 'To Do', color: 'bg-slate-400' },
  { status: 'in-progress', label: 'In Progress', color: 'bg-blue-500' },
  { status: 'done', label: 'Done', color: 'bg-amber-500' },
  { status: 'review', label: 'Review', color: 'bg-purple-500' },
  { status: 'approved', label: 'Approved', color: 'bg-emerald-500' },
]

export function TaskKanban({
  tasks,
  users,
  brands,
  categories,
  onTaskClick,
  onStatusChange,
}: TaskKanbanProps) {
  const getUser = (id: string) => users.find(u => u.id === id)
  const getBrand = (id: string) => brands.find(b => b.id === id)
  const getCategory = (id: string) => categories.find(c => c.id === id)

  const calculateProgress = (task: Task) => {
    if (task.subTasks.length === 0) return 0
    const completed = task.subTasks.filter(st => st.completed).length
    return Math.round((completed / task.subTasks.length) * 100)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
    })
  }

  const isOverdue = (task: Task) => {
    return new Date(task.deadline) < new Date() && task.status !== 'approved'
  }

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(t => t.status === status)
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {COLUMNS.map((column) => {
        const columnTasks = getTasksByStatus(column.status)

        return (
          <div
            key={column.status}
            className="flex-shrink-0 w-72 sm:w-80"
          >
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2.5 h-2.5 rounded-full ${column.color}`} />
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                {column.label}
              </h3>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                {columnTasks.length}
              </span>
            </div>

            {/* Column Content */}
            <div className="space-y-3 min-h-[200px] p-2 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl">
              {columnTasks.length === 0 ? (
                <div className="flex items-center justify-center h-24 text-sm text-slate-400 dark:text-slate-500">
                  No tasks
                </div>
              ) : (
                columnTasks.map((task) => {
                  const pic = getUser(task.picId)
                  const brand = getBrand(task.brandId)
                  const category = getCategory(task.categoryId)
                  const progress = calculateProgress(task)
                  const overdue = isOverdue(task)

                  return (
                    <div
                      key={task.id}
                      onClick={() => onTaskClick(task.id)}
                      className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 cursor-pointer transition-all"
                    >
                      {/* Brand & Category */}
                      <div className="flex items-center gap-2 mb-2">
                        {brand && <BrandBadge brand={brand} size="sm" />}
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {category?.name}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="font-medium text-slate-900 dark:text-white text-sm line-clamp-2 mb-2">
                        {task.title}
                      </h4>

                      {/* Progress */}
                      <div className="mb-3">
                        <ProgressBar progress={progress} size="sm" />
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        {/* PIC */}
                        {pic && (
                          <Avatar name={pic.name} initials={pic.avatar} size="xs" />
                        )}

                        {/* Deadline */}
                        <div className={`flex items-center gap-1 text-xs ${overdue ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className={overdue ? 'font-medium' : ''}>
                            {formatDate(task.deadline)}
                          </span>
                        </div>

                        {/* Sub-tasks count */}
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                          <span>
                            {task.subTasks.filter(st => st.completed).length}/{task.subTasks.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
