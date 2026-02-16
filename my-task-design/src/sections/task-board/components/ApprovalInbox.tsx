import { useState } from 'react'
import type { ApprovalInboxProps, Task } from '@/../product/sections/task-board/types'
import { BrandBadge } from './BrandBadge'
import { ProgressBar } from './ProgressBar'
import { Avatar } from './Avatar'

export function ApprovalInbox({
  tasksForReview,
  users,
  brands,
  categories,
  onViewTask,
  onApprove,
  onRequestRevision,
}: ApprovalInboxProps) {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null)
  const [revisionFeedback, setRevisionFeedback] = useState<Record<string, string>>({})

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

  const formatRelativeTime = (date: string) => {
    const now = new Date()
    const updated = new Date(date)
    const diffMs = now.getTime() - updated.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return formatDate(date)
  }

  const handleApprove = (taskId: string) => {
    onApprove?.(taskId)
  }

  const handleRequestRevision = (taskId: string) => {
    const feedback = revisionFeedback[taskId]
    if (feedback?.trim()) {
      onRequestRevision?.(taskId, feedback.trim())
      setRevisionFeedback(prev => ({ ...prev, [taskId]: '' }))
      setExpandedTaskId(null)
    }
  }

  const toggleExpanded = (taskId: string) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Approval Inbox
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {tasksForReview.length} task{tasksForReview.length !== 1 ? 's' : ''} awaiting your review
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {tasksForReview.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
              <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              All caught up!
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              No tasks are waiting for your approval right now. Check back later or review the task board.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl">
            {tasksForReview.map((task) => {
              const pic = getUser(task.picId)
              const brand = getBrand(task.brandId)
              const category = getCategory(task.categoryId)
              const progress = calculateProgress(task)
              const isExpanded = expandedTaskId === task.id

              return (
                <div
                  key={task.id}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Task Header */}
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Task Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {brand && <BrandBadge brand={brand} />}
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {category?.name}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Submitted {formatRelativeTime(task.updatedAt)}
                          </span>
                        </div>

                        <h3
                          onClick={() => onViewTask?.(task.id)}
                          className="text-lg font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                        >
                          {task.title}
                        </h3>

                        {task.description && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                            {task.description}
                          </p>
                        )}

                        {/* Meta Row */}
                        <div className="flex flex-wrap items-center gap-4 mt-3">
                          {/* PIC */}
                          {pic && (
                            <div className="flex items-center gap-2">
                              <Avatar name={pic.name} initials={pic.avatar} size="xs" />
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                {pic.name}
                              </span>
                            </div>
                          )}

                          {/* Deadline */}
                          <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Due {formatDate(task.deadline)}</span>
                          </div>

                          {/* Sub-tasks */}
                          <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                            <span>{task.subTasks.filter(st => st.completed).length}/{task.subTasks.length} completed</span>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="mt-3 max-w-xs">
                          <ProgressBar progress={progress} size="sm" />
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex sm:flex-col gap-2 sm:w-32">
                        <button
                          onClick={() => handleApprove(task.id)}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Approve
                        </button>
                        <button
                          onClick={() => toggleExpanded(task.id)}
                          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                            isExpanded
                              ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                              : 'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Revise
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Sub-tasks & Revision Input */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                      {/* Sub-tasks Preview */}
                      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-700">
                        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                          Sub-tasks ({task.subTasks.filter(st => st.completed).length}/{task.subTasks.length})
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {task.subTasks.map((subTask) => (
                            <div
                              key={subTask.id}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                                subTask.completed
                                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {subTask.completed ? (
                                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <div className="w-4 h-4 rounded border-2 border-slate-300 dark:border-slate-500 flex-shrink-0" />
                              )}
                              <span className={subTask.completed ? 'line-through opacity-75' : ''}>
                                {subTask.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Revision Feedback */}
                      <div className="p-4 sm:p-5">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          Revision Feedback
                        </label>
                        <textarea
                          placeholder="Describe what needs to be revised or improved..."
                          value={revisionFeedback[task.id] || ''}
                          onChange={(e) => setRevisionFeedback(prev => ({ ...prev, [task.id]: e.target.value }))}
                          rows={3}
                          className="w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                        />
                        <div className="flex justify-end gap-2 mt-3">
                          <button
                            onClick={() => {
                              setExpandedTaskId(null)
                              setRevisionFeedback(prev => ({ ...prev, [task.id]: '' }))
                            }}
                            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleRequestRevision(task.id)}
                            disabled={!revisionFeedback[task.id]?.trim()}
                            className="px-4 py-2 text-sm font-medium bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                          >
                            Send Revision Request
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
