import { useState, useMemo } from 'react'
import type { TaskBoardProps, Task, TaskStatus, TaskFilters } from '@/../product/sections/task-board/types'
import { TaskTable } from './TaskTable'
import { TaskKanban } from './TaskKanban'
import { TaskDetailPanel } from './TaskDetailPanel'
import { FilterBar } from './FilterBar'

type ViewMode = 'table' | 'kanban'

export function TaskBoard({
  tasks,
  users,
  brands,
  categories,
  taskTemplates,
  currentUser,
  onCreateTask,
  onViewTask,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onApproveTask,
  onRequestRevision,
  onToggleSubTask,
  onAddSubTask,
  onRemoveSubTask,
  onEditSubTask,
  onViewChange,
  onFilterChange,
  onSearch,
}: TaskBoardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [filters, setFilters] = useState<TaskFilters>({})
  const [searchQuery, setSearchQuery] = useState('')

  const selectedTask = useMemo(
    () => tasks.find(t => t.id === selectedTaskId) || null,
    [tasks, selectedTaskId]
  )

  const filteredTasks = useMemo(() => {
    let result = tasks

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(t =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
      )
    }

    if (filters.status?.length) {
      result = result.filter(t => filters.status!.includes(t.status))
    }

    if (filters.picId?.length) {
      result = result.filter(t => filters.picId!.includes(t.picId))
    }

    if (filters.brandId?.length) {
      result = result.filter(t => filters.brandId!.includes(t.brandId))
    }

    if (filters.categoryId?.length) {
      result = result.filter(t => filters.categoryId!.includes(t.categoryId))
    }

    if (filters.dateRange?.start) {
      result = result.filter(t => t.deadline >= filters.dateRange!.start)
    }

    if (filters.dateRange?.end) {
      result = result.filter(t => t.deadline <= filters.dateRange!.end)
    }

    return result
  }, [tasks, filters, searchQuery])

  const handleViewChange = (view: ViewMode) => {
    setViewMode(view)
    onViewChange?.(view)
  }

  const handleFilterChange = (newFilters: TaskFilters) => {
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
  }

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId)
    onViewTask?.(taskId)
  }

  const handleClosePanel = () => {
    setSelectedTaskId(null)
  }

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    onStatusChange?.(taskId, newStatus)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Task Board
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
                {searchQuery || Object.keys(filters).length > 0 ? ' (filtered)' : ''}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                <button
                  onClick={() => handleViewChange('table')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    viewMode === 'table'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    Table
                  </span>
                </button>
                <button
                  onClick={() => handleViewChange('kanban')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    viewMode === 'kanban'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                    Kanban
                  </span>
                </button>
              </div>

              {/* New Task Button */}
              <button
                onClick={() => onCreateTask?.()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Task
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-6">
          <FilterBar
            users={users}
            brands={brands}
            categories={categories}
            filters={filters}
            searchQuery={searchQuery}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
          />
        </div>

        {/* Main Content */}
        {viewMode === 'table' ? (
          <TaskTable
            tasks={filteredTasks}
            users={users}
            brands={brands}
            categories={categories}
            onTaskClick={handleTaskClick}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <TaskKanban
            tasks={filteredTasks}
            users={users}
            brands={brands}
            categories={categories}
            onTaskClick={handleTaskClick}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* Task Detail Panel */}
      <TaskDetailPanel
        task={selectedTask}
        users={users}
        brands={brands}
        categories={categories}
        isOpen={selectedTask !== null}
        currentUser={currentUser}
        onClose={handleClosePanel}
        onStatusChange={(status) => selectedTask && onStatusChange?.(selectedTask.id, status)}
        onDelete={() => selectedTask && onDeleteTask?.(selectedTask.id)}
        onApprove={() => selectedTask && onApproveTask?.(selectedTask.id)}
        onRequestRevision={(feedback) => selectedTask && onRequestRevision?.(selectedTask.id, feedback)}
        onToggleSubTask={(subTaskId) => selectedTask && onToggleSubTask?.(selectedTask.id, subTaskId)}
        onAddSubTask={(title) => selectedTask && onAddSubTask?.(selectedTask.id, title)}
        onRemoveSubTask={(subTaskId) => selectedTask && onRemoveSubTask?.(selectedTask.id, subTaskId)}
      />
    </div>
  )
}
