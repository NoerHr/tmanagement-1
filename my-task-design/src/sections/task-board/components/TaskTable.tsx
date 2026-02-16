import type { Task, User, Brand, Category, TaskStatus } from '@/../product/sections/task-board/types'
import { ProgressBar } from './ProgressBar'
import { StatusBadge } from './StatusBadge'
import { BrandBadge } from './BrandBadge'
import { Avatar } from './Avatar'

interface TaskTableProps {
  tasks: Task[]
  users: User[]
  brands: Brand[]
  categories: Category[]
  onTaskClick: (taskId: string) => void
  onStatusChange: (taskId: string, status: TaskStatus) => void
}

export function TaskTable({
  tasks,
  users,
  brands,
  categories,
  onTaskClick,
  onStatusChange,
}: TaskTableProps) {
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
      year: 'numeric',
    })
  }

  const isOverdue = (task: Task) => {
    return new Date(task.deadline) < new Date() && task.status !== 'approved'
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="mt-4 text-sm font-medium text-slate-900 dark:text-white">No tasks found</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Try adjusting your filters or create a new task.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Task
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                PIC
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">
                Progress
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {tasks.map((task) => {
              const pic = getUser(task.picId)
              const brand = getBrand(task.brandId)
              const category = getCategory(task.categoryId)
              const progress = calculateProgress(task)
              const overdue = isOverdue(task)

              return (
                <tr
                  key={task.id}
                  onClick={() => onTaskClick(task.id)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900 dark:text-white line-clamp-1">
                        {task.title}
                      </span>
                      {task.description && (
                        <span className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {task.description}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {pic && (
                      <div className="flex items-center gap-2">
                        <Avatar name={pic.name} initials={pic.avatar} size="sm" />
                        <span className="text-sm text-slate-700 dark:text-slate-300 hidden sm:inline">
                          {pic.name.split(' ')[0]}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {brand && <BrandBadge brand={brand} />}
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {category?.name}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-sm ${overdue ? 'text-red-600 dark:text-red-400 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                      {formatDate(task.deadline)}
                      {overdue && (
                        <span className="ml-1 text-xs">(Overdue)</span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <ProgressBar progress={progress} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
