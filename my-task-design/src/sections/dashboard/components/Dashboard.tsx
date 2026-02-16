import { useState, useMemo } from 'react'
import type { DashboardProps } from '@/../product/sections/dashboard/types'
import { BrandFilter } from './BrandFilter'
import { GanttTimeline } from './GanttTimeline'
import { AttentionList } from './AttentionList'
import { TaskStatusChart } from './TaskStatusChart'
import { WorkloadChart } from './WorkloadChart'
import { LaunchCountdown } from './LaunchCountdown'

export function Dashboard({
  brands,
  tasks,
  taskStatistics,
  workloadDistribution,
  upcomingLaunch,
  attentionItems,
  selectedBrandId: initialBrandId = null,
  onBrandFilterChange,
  onTaskClick,
  onReschedule,
  onMarkDone,
  onApprove,
  onRevise,
}: DashboardProps) {
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(initialBrandId)

  // Filter data based on selected brand
  const filteredData = useMemo(() => {
    if (!selectedBrandId) {
      return { tasks, attentionItems, taskStatistics, workloadDistribution, upcomingLaunch }
    }

    const filteredTasks = tasks.filter(t => t.brandId === selectedBrandId)
    const filteredAttention = attentionItems.filter(a => {
      const task = tasks.find(t => t.id === a.id)
      return task?.brandId === selectedBrandId
    })

    // Recalculate statistics for filtered tasks
    const filteredStats = {
      toDo: filteredTasks.filter(t => t.status === 'to-do').length,
      inProgress: filteredTasks.filter(t => t.status === 'in-progress').length,
      done: filteredTasks.filter(t => t.status === 'done').length,
      review: filteredTasks.filter(t => t.status === 'review').length,
      approved: filteredTasks.filter(t => t.status === 'approved').length,
      total: filteredTasks.length,
    }

    // Recalculate workload for filtered tasks
    const workloadMap = new Map<string, { picId: string; picName: string; taskCount: number; overdueCount: number }>()
    filteredTasks.forEach(task => {
      const existing = workloadMap.get(task.picId) || {
        picId: task.picId,
        picName: task.picName,
        taskCount: 0,
        overdueCount: 0,
      }
      existing.taskCount++
      if (task.isOverdue) existing.overdueCount++
      workloadMap.set(task.picId, existing)
    })
    const filteredWorkload = Array.from(workloadMap.values())

    // Filter upcoming launch
    const filteredLaunch = upcomingLaunch?.brandName === brands.find(b => b.id === selectedBrandId)?.name
      ? upcomingLaunch
      : null

    return {
      tasks: filteredTasks,
      attentionItems: filteredAttention,
      taskStatistics: filteredStats,
      workloadDistribution: filteredWorkload,
      upcomingLaunch: filteredLaunch,
    }
  }, [selectedBrandId, tasks, attentionItems, taskStatistics, workloadDistribution, upcomingLaunch, brands])

  const handleBrandChange = (brandId: string | null) => {
    setSelectedBrandId(brandId)
    onBrandFilterChange?.(brandId)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Dashboard
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Overview of your marketing campaigns and tasks
              </p>
            </div>
            <BrandFilter
              brands={brands}
              selectedBrandId={selectedBrandId}
              onBrandChange={handleBrandChange}
            />
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
          {/* Timeline - Full width */}
          <div className="md:col-span-2 lg:col-span-4 row-span-1
            bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800
            shadow-sm hover:shadow-md transition-shadow duration-300 p-5">
            <GanttTimeline
              tasks={filteredData.tasks}
              brands={brands}
              onTaskClick={onTaskClick}
            />
          </div>

          {/* Attention Items - 2 cols on lg */}
          <div className="md:col-span-1 lg:col-span-2 row-span-2
            bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800
            shadow-sm hover:shadow-md transition-shadow duration-300 p-5">
            <AttentionList
              items={filteredData.attentionItems}
              onReschedule={onReschedule}
              onMarkDone={onMarkDone}
              onApprove={onApprove}
              onRevise={onRevise}
            />
          </div>

          {/* Task Status - 1 col */}
          <div className="md:col-span-1 lg:col-span-1 row-span-1
            bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800
            shadow-sm hover:shadow-md transition-shadow duration-300 p-5">
            <TaskStatusChart statistics={filteredData.taskStatistics} />
          </div>

          {/* Launch Countdown - 1 col */}
          <div className="md:col-span-1 lg:col-span-1 row-span-1
            bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20
            rounded-2xl border border-amber-200/50 dark:border-amber-800/30
            shadow-sm hover:shadow-md transition-shadow duration-300 p-5">
            <LaunchCountdown launch={filteredData.upcomingLaunch} />
          </div>

          {/* Workload - 1 col */}
          <div className="md:col-span-1 lg:col-span-1 row-span-1
            bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800
            shadow-sm hover:shadow-md transition-shadow duration-300 p-5">
            <WorkloadChart distribution={filteredData.workloadDistribution} />
          </div>

          {/* Quick Stats - 1 col */}
          <div className="md:col-span-1 lg:col-span-1 row-span-1
            bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700
            rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-5 text-white">
            <h3 className="text-lg font-semibold mb-4 text-indigo-100">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-indigo-200">Total Tasks</span>
                <span className="text-2xl font-bold">{filteredData.taskStatistics.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-indigo-200">Overdue</span>
                <span className="text-2xl font-bold text-red-300">
                  {filteredData.attentionItems.filter(i => i.type === 'overdue').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-indigo-200">Awaiting Approval</span>
                <span className="text-2xl font-bold text-amber-300">
                  {filteredData.attentionItems.filter(i => i.type === 'needs-approval').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
