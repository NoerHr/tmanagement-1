import { useState } from 'react'
import type { Task, User, Brand, Category, TaskStatus } from '@/../product/sections/task-board/types'
import { StatusBadge } from './StatusBadge'
import { BrandBadge } from './BrandBadge'
import { ProgressBar } from './ProgressBar'
import { Avatar } from './Avatar'

interface TaskDetailPanelProps {
  task: Task | null
  users: User[]
  brands: Brand[]
  categories: Category[]
  isOpen: boolean
  currentUser?: User
  onClose?: () => void
  onSave?: (updates: Partial<Task>) => void
  onStatusChange?: (newStatus: TaskStatus) => void
  onDelete?: () => void
  onApprove?: () => void
  onRequestRevision?: (feedback: string) => void
  onToggleSubTask?: (subTaskId: string) => void
  onAddSubTask?: (title: string) => void
  onRemoveSubTask?: (subTaskId: string) => void
}

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'to-do', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'review', label: 'Review' },
  { value: 'approved', label: 'Approved' },
]

export function TaskDetailPanel({
  task,
  users,
  brands,
  categories,
  isOpen,
  currentUser,
  onClose,
  onSave,
  onStatusChange,
  onDelete,
  onApprove,
  onRequestRevision,
  onToggleSubTask,
  onAddSubTask,
  onRemoveSubTask,
}: TaskDetailPanelProps) {
  const [newSubTaskTitle, setNewSubTaskTitle] = useState('')
  const [revisionFeedback, setRevisionFeedback] = useState('')
  const [showRevisionInput, setShowRevisionInput] = useState(false)

  if (!isOpen || !task) return null

  const pic = users.find(u => u.id === task.picId)
  const brand = brands.find(b => b.id === task.brandId)
  const category = categories.find(c => c.id === task.categoryId)

  const completedSubTasks = task.subTasks.filter(st => st.completed).length
  const progress = task.subTasks.length > 0
    ? Math.round((completedSubTasks / task.subTasks.length) * 100)
    : 0

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'approved'
  const canApprove = currentUser?.role === 'superior' && task.status === 'review'

  const handleAddSubTask = () => {
    if (newSubTaskTitle.trim()) {
      onAddSubTask?.(newSubTaskTitle.trim())
      setNewSubTaskTitle('')
    }
  }

  const handleRequestRevision = () => {
    if (revisionFeedback.trim()) {
      onRequestRevision?.(revisionFeedback.trim())
      setRevisionFeedback('')
      setShowRevisionInput(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white dark:bg-slate-800 shadow-xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            {brand && <BrandBadge brand={brand} />}
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {category?.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 space-y-6">
            {/* Title & Description */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {task.title}
              </h2>
              {task.description && (
                <p className="text-slate-600 dark:text-slate-400">
                  {task.description}
                </p>
              )}
            </div>

            {/* Status & Progress */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 dark:text-slate-400">Status:</span>
                <select
                  value={task.status}
                  onChange={(e) => onStatusChange?.(e.target.value as TaskStatus)}
                  disabled={task.status === 'approved'}
                  className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
                >
                  {STATUS_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <StatusBadge status={task.status} />
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Progress</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {completedSubTasks}/{task.subTasks.length} sub-tasks
                </span>
              </div>
              <ProgressBar progress={progress} size="lg" />
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">PIC</span>
                {pic && (
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar name={pic.name} initials={pic.avatar} size="sm" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{pic.name}</span>
                  </div>
                )}
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Deadline</span>
                <p className={`text-sm font-medium mt-1 ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
                  {formatDate(task.deadline)}
                  {isOverdue && <span className="ml-1 text-xs">(Overdue)</span>}
                </p>
              </div>
              {task.startDate && (
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Start Date</span>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">
                    {formatDate(task.startDate)}
                  </p>
                </div>
              )}
              {task.crossDeptNotes && (
                <div className="col-span-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cross-Dept Notes</span>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                    {task.crossDeptNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Sub-tasks Checklist */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                Sub-tasks ({completedSubTasks}/{task.subTasks.length})
              </h3>
              <div className="space-y-2">
                {task.subTasks.map((subTask) => {
                  const subTaskPic = subTask.picId ? users.find(u => u.id === subTask.picId) : null

                  return (
                    <div
                      key={subTask.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                        subTask.completed
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
                          : 'bg-white dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                      }`}
                    >
                      <button
                        onClick={() => onToggleSubTask?.(subTask.id)}
                        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          subTask.completed
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-slate-300 dark:border-slate-500 hover:border-indigo-500'
                        }`}
                      >
                        {subTask.completed && (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${subTask.completed ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}>
                          {subTask.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          {subTaskPic && (
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {subTaskPic.name.split(' ')[0]}
                            </span>
                          )}
                          {subTask.dueDate && (
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              Due: {new Date(subTask.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveSubTask?.(subTask.id)}
                        className="flex-shrink-0 p-1 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )
                })}

                {/* Add Sub-task */}
                <div className="flex items-center gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="Add a sub-task..."
                    value={newSubTaskTitle}
                    onChange={(e) => setNewSubTaskTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSubTask()}
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleAddSubTask}
                    disabled={!newSubTaskTitle.trim()}
                    className="px-3 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Approval Actions (for Superiors) */}
            {canApprove && (
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-3">
                  Approval Required
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
                  This task is ready for your review. Please approve or request a revision.
                </p>

                {showRevisionInput ? (
                  <div className="space-y-3">
                    <textarea
                      placeholder="Enter revision feedback..."
                      value={revisionFeedback}
                      onChange={(e) => setRevisionFeedback(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-amber-300 dark:border-amber-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleRequestRevision}
                        disabled={!revisionFeedback.trim()}
                        className="flex-1 px-4 py-2 text-sm font-medium bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 text-white rounded-lg transition-colors"
                      >
                        Send Feedback
                      </button>
                      <button
                        onClick={() => {
                          setShowRevisionInput(false)
                          setRevisionFeedback('')
                        }}
                        className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={onApprove}
                      className="flex-1 px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setShowRevisionInput(true)}
                      className="flex-1 px-4 py-2 text-sm font-medium bg-white dark:bg-slate-700 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-lg transition-colors"
                    >
                      Request Revision
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center justify-between">
            <button
              onClick={onDelete}
              className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              Delete Task
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
