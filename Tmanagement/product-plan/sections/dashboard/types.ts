// =============================================================================
// Core Entity Types (from Global Data Model)
// =============================================================================

export interface User {
  id: string
  name: string
  role: 'PIC' | 'Superior'
  avatarInitials: string
  whatsappNumber: string
}

export interface Brand {
  id: string
  name: string
  color: 'rose' | 'sky' | 'emerald' | 'violet'
}

export type TaskStatus = 'to-do' | 'in-progress' | 'done' | 'review' | 'approved'

export type CategoryType = 'Photo Shoot' | 'Video Shoot' | 'Event' | 'Campaign' | 'Editorial' | 'Other'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  progress: number
  startDate: string
  deadline: string
  picId: string
  picName: string
  brandId: string
  brandName: string
  category: CategoryType
  isOverdue: boolean
  needsApproval: boolean
}

export interface SubTask {
  id: string
  taskId: string
  title: string
  completed: boolean
}

export type EventType = 'launch' | 'photo-shoot' | 'video-shoot' | 'campaign' | 'editorial' | 'other'

export interface Event {
  id: string
  title: string
  type: EventType
  date: string
  time: string
  location: string
  brandId: string
  brandName: string
  description: string
}

// =============================================================================
// Dashboard-Specific Types
// =============================================================================

export interface TaskStatistics {
  toDo: number
  inProgress: number
  done: number
  review: number
  approved: number
  total: number
}

export interface WorkloadItem {
  picId: string
  picName: string
  taskCount: number
  overdueCount: number
}

export interface UpcomingLaunch {
  id: string
  title: string
  date: string
  brandName: string
  daysUntil: number
}

export type AttentionItemType = 'overdue' | 'needs-approval'

export interface AttentionItem {
  id: string
  title: string
  type: AttentionItemType
  deadline: string
  picName: string
  brandName: string
  daysOverdue?: number
  waitingDays?: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface DashboardProps {
  /** List of users (PICs) for workload display */
  users: User[]
  /** Available brands for filtering */
  brands: Brand[]
  /** All tasks for timeline/Gantt view */
  tasks: Task[]
  /** Sub-tasks for progress calculation */
  subTasks: SubTask[]
  /** Upcoming events including launches */
  events: Event[]
  /** Pre-calculated task status breakdown for donut chart */
  taskStatistics: TaskStatistics
  /** Pre-calculated workload per PIC for bar chart */
  workloadDistribution: WorkloadItem[]
  /** Nearest upcoming launch for countdown card */
  upcomingLaunch: UpcomingLaunch | null
  /** Overdue tasks and items needing approval */
  attentionItems: AttentionItem[]
  /** Currently selected brand filter (null = all brands) */
  selectedBrandId?: string | null
  /** Called when user changes the brand filter */
  onBrandFilterChange?: (brandId: string | null) => void
  /** Called when user clicks a task bar in the Gantt view */
  onTaskClick?: (taskId: string) => void
  /** Called when user wants to reschedule an overdue task */
  onReschedule?: (taskId: string) => void
  /** Called when user marks an overdue task as done */
  onMarkDone?: (taskId: string) => void
  /** Called when user approves a task in review */
  onApprove?: (taskId: string) => void
  /** Called when user requests revisions for a task in review */
  onRevise?: (taskId: string) => void
}
