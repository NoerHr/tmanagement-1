// =============================================================================
// Data Types
// =============================================================================

export type UserRole = 'pic' | 'superior'

export type TaskStatus = 'to-do' | 'in-progress' | 'done' | 'review' | 'approved'

export type BrandColor = 'pink' | 'blue' | 'green' | 'purple'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatar: string
}

export interface Brand {
  id: string
  name: string
  color: BrandColor
}

export interface Category {
  id: string
  name: string
}

export interface SubTask {
  id: string
  title: string
  completed: boolean
  picId?: string
  dueDate?: string
}

export interface Task {
  id: string
  title: string
  description: string
  picId: string
  brandId: string
  categoryId: string
  status: TaskStatus
  startDate?: string
  deadline: string
  crossDeptNotes: string
  createdAt: string
  updatedAt: string
  subTasks: SubTask[]
}

export interface TaskTemplate {
  id: string
  name: string
  categoryId: string
  subTasks: string[]
}

// =============================================================================
// Computed Types
// =============================================================================

/** Task with resolved references for display purposes */
export interface TaskWithDetails extends Task {
  pic: User
  brand: Brand
  category: Category
  progress: number
}

/** Sub-task with resolved PIC for display purposes */
export interface SubTaskWithDetails extends SubTask {
  pic?: User
}

// =============================================================================
// Component Props
// =============================================================================

export interface TaskBoardProps {
  /** List of tasks to display */
  tasks: Task[]
  /** List of team members for PIC dropdowns and display */
  users: User[]
  /** Available brands for filtering and assignment */
  brands: Brand[]
  /** Available categories for filtering and assignment */
  categories: Category[]
  /** Task templates for quick task creation */
  taskTemplates: TaskTemplate[]
  /** Current user viewing the board */
  currentUser?: User

  // Task CRUD
  /** Called when user wants to create a new task */
  onCreateTask?: (template?: TaskTemplate) => void
  /** Called when user clicks a task to view details */
  onViewTask?: (taskId: string) => void
  /** Called when user wants to edit a task */
  onEditTask?: (taskId: string) => void
  /** Called when user wants to delete a task */
  onDeleteTask?: (taskId: string) => void

  // Status changes
  /** Called when user changes a task's status */
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void
  /** Called when Superior approves a task in Review status */
  onApproveTask?: (taskId: string) => void
  /** Called when Superior requests revision on a task */
  onRequestRevision?: (taskId: string, feedback: string) => void

  // Sub-task actions
  /** Called when user toggles a sub-task's completion */
  onToggleSubTask?: (taskId: string, subTaskId: string) => void
  /** Called when user adds a new sub-task */
  onAddSubTask?: (taskId: string, title: string) => void
  /** Called when user removes a sub-task */
  onRemoveSubTask?: (taskId: string, subTaskId: string) => void
  /** Called when user edits a sub-task */
  onEditSubTask?: (taskId: string, subTaskId: string, updates: Partial<SubTask>) => void

  // View controls
  /** Called when user switches between table and kanban view */
  onViewChange?: (view: 'table' | 'kanban') => void
  /** Called when user applies filters */
  onFilterChange?: (filters: TaskFilters) => void
  /** Called when user searches */
  onSearch?: (query: string) => void
}

export interface TaskFilters {
  status?: TaskStatus[]
  picId?: string[]
  brandId?: string[]
  categoryId?: string[]
  dateRange?: {
    start: string
    end: string
  }
}

// =============================================================================
// Side Panel Props
// =============================================================================

export interface TaskDetailPanelProps {
  /** The task to display */
  task: Task
  /** All users for PIC display and assignment */
  users: User[]
  /** All brands for display */
  brands: Brand[]
  /** All categories for display */
  categories: Category[]
  /** Whether the panel is open */
  isOpen: boolean
  /** Current user (to determine if they can approve) */
  currentUser?: User

  /** Called when panel should close */
  onClose?: () => void
  /** Called when task is edited */
  onSave?: (updates: Partial<Task>) => void
  /** Called when task status changes */
  onStatusChange?: (newStatus: TaskStatus) => void
  /** Called when task is deleted */
  onDelete?: () => void
  /** Called when Superior approves */
  onApprove?: () => void
  /** Called when Superior requests revision */
  onRequestRevision?: (feedback: string) => void
  /** Called when sub-task is toggled */
  onToggleSubTask?: (subTaskId: string) => void
  /** Called when sub-task is added */
  onAddSubTask?: (title: string) => void
  /** Called when sub-task is removed */
  onRemoveSubTask?: (subTaskId: string) => void
}

// =============================================================================
// Approval Inbox Props
// =============================================================================

export interface ApprovalInboxProps {
  /** Tasks with status 'review' awaiting approval */
  tasksForReview: Task[]
  /** All users for PIC display */
  users: User[]
  /** All brands for display */
  brands: Brand[]
  /** All categories for display */
  categories: Category[]

  /** Called when user clicks a task to review */
  onViewTask?: (taskId: string) => void
  /** Called when Superior approves a task */
  onApprove?: (taskId: string) => void
  /** Called when Superior requests revision */
  onRequestRevision?: (taskId: string, feedback: string) => void
}
