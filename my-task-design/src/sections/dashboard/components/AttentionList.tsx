import { useState } from 'react'
import type { AttentionItem } from '@/../product/sections/dashboard/types'

interface AttentionListProps {
  items: AttentionItem[]
  onReschedule?: (taskId: string) => void
  onMarkDone?: (taskId: string) => void
  onApprove?: (taskId: string) => void
  onRevise?: (taskId: string) => void
}

export function AttentionList({
  items,
  onReschedule,
  onMarkDone,
  onApprove,
  onRevise,
}: AttentionListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const overdueItems = items.filter(item => item.type === 'overdue')
  const approvalItems = items.filter(item => item.type === 'needs-approval')

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Needs Attention
      </h3>

      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Overdue Section */}
        {overdueItems.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wide">
                Overdue ({overdueItems.length})
              </span>
            </div>
            <div className="space-y-2">
              {overdueItems.map(item => (
                <div
                  key={`overdue-${item.id}`}
                  className="relative group"
                  onMouseEnter={() => setHoveredId(`overdue-${item.id}`)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className={`
                    p-3 rounded-lg border transition-all duration-200
                    bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900/50
                    ${hoveredId === `overdue-${item.id}` ? 'shadow-md' : ''}
                  `}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.picName} · {item.brandName}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-red-600 dark:text-red-400 whitespace-nowrap">
                        {item.daysOverdue}d late
                      </span>
                    </div>

                    {/* Action buttons - revealed on hover */}
                    <div className={`
                      flex gap-2 mt-2 transition-all duration-200
                      ${hoveredId === `overdue-${item.id}` ? 'opacity-100 h-8' : 'opacity-0 h-0 overflow-hidden'}
                    `}>
                      <button
                        onClick={() => onReschedule?.(item.id)}
                        className="flex-1 text-xs font-medium px-3 py-1.5 rounded-md
                          bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                          text-slate-700 dark:text-slate-300
                          hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => onMarkDone?.(item.id)}
                        className="flex-1 text-xs font-medium px-3 py-1.5 rounded-md
                          bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                      >
                        Mark Done
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Needs Approval Section */}
        {approvalItems.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                Needs Approval ({approvalItems.length})
              </span>
            </div>
            <div className="space-y-2">
              {approvalItems.map(item => (
                <div
                  key={`approval-${item.id}`}
                  className="relative group"
                  onMouseEnter={() => setHoveredId(`approval-${item.id}`)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className={`
                    p-3 rounded-lg border transition-all duration-200
                    bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50
                    ${hoveredId === `approval-${item.id}` ? 'shadow-md' : ''}
                  `}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.picName} · {item.brandName}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-amber-600 dark:text-amber-400 whitespace-nowrap">
                        {item.waitingDays}d waiting
                      </span>
                    </div>

                    {/* Action buttons - revealed on hover */}
                    <div className={`
                      flex gap-2 mt-2 transition-all duration-200
                      ${hoveredId === `approval-${item.id}` ? 'opacity-100 h-8' : 'opacity-0 h-0 overflow-hidden'}
                    `}>
                      <button
                        onClick={() => onRevise?.(item.id)}
                        className="flex-1 text-xs font-medium px-3 py-1.5 rounded-md
                          bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                          text-slate-700 dark:text-slate-300
                          hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        Request Revision
                      </button>
                      <button
                        onClick={() => onApprove?.(item.id)}
                        className="flex-1 text-xs font-medium px-3 py-1.5 rounded-md
                          bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {items.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30
                flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">All caught up!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
