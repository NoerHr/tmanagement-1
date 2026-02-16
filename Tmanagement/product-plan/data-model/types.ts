// =============================================================================
// TeamPulse - Combined Type Definitions
// =============================================================================

// =============================================================================
// Shared Enums and Types
// =============================================================================

export type UserRole = 'PIC' | 'Superior'
export type UserStatus = 'active' | 'inactive'

export type TaskStatus = 'to-do' | 'in-progress' | 'done' | 'review' | 'approved'

export type EventType = 'photo_shoot' | 'video_shoot' | 'launch' | 'editorial' | 'event'

export type NotificationType =
  | 'deadline'
  | 'assignment'
  | 'status-change'
  | 'approval'
  | 'sync'
  | 'error'

export type DeliveryChannel = 'in-app' | 'whatsapp'

export type SyncStatus = 'success' | 'failed' | 'in-progress'

// =============================================================================
// Core Entities
// =============================================================================

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  whatsappNumber: string
  avatarUrl: string | null
  avatarInitials: string
  googleCalendarConnected: boolean
  googleCalendarEmail: string | null
  status: UserStatus
  createdAt: string
}

export interface Brand {
  id: string
  name: string
  color: string
  colorName?: string
  taskCount?: number
}

export interface Category {
  id: string
  name: string
  color: string
  colorName?: string
  taskCount?: number
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  picId: string
  brandId: string
  categoryId: string
  startDate?: string
  deadline: string
  crossDeptNotes?: string
  createdAt: string
  updatedAt: string
}

export interface SubTask {
  id: string
  taskId?: string
  title: string
  completed: boolean
  picId?: string
  dueDate?: string
}

export interface TaskWithSubTasks extends Task {
  subTasks: SubTask[]
}

export interface TaskWithDetails extends Task {
  pic: User
  brand: Brand
  category: Category
  subTasks: SubTask[]
  progress: number
}

export interface Event {
  id: string
  title: string
  description: string
  type: EventType
  date: string
  startTime: string
  endTime: string
  location: string
  brandId: string
  picId: string
  createdAt: string
}

export interface Notification {
  id: string
  userId?: string
  type: NotificationType
  title: string
  description: string
  isRead: boolean
  isDismissed: boolean
  taskId: string | null
  eventId: string | null
  createdAt: string
  deliveredVia?: DeliveryChannel[]
}

// =============================================================================
// Task Templates
// =============================================================================

export interface TaskTemplate {
  id: string
  name: string
  categoryId: string
  subTasks: string[]
}

// =============================================================================
// Calendar Types
// =============================================================================

export type CalendarView = 'day' | 'week' | 'month'

export interface CalendarFilters {
  type?: EventType | null
  brandId?: string | null
  picId?: string | null
}

export interface ConflictWarning {
  conflictingEvent: Event
  message: string
}

// =============================================================================
// Task Board Types
// =============================================================================

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
// Notification Types
// =============================================================================

export interface NotificationTypePreference {
  enabled: boolean
  inApp: boolean
  whatsapp: boolean
  isMandatory: boolean
}

export interface NotificationPreferences {
  userId: string
  deadlines: NotificationTypePreference
  assignments: NotificationTypePreference
  statusChanges: NotificationTypePreference
  approvals: NotificationTypePreference
  sync: NotificationTypePreference
}

export interface GoogleCalendarConnection {
  userId: string
  isConnected: boolean
  accountEmail: string | null
  accountName: string | null
  connectedAt: string | null
  lastSyncAt: string | null
  syncStatus: SyncStatus | null
  eventsCount: number
}

export interface SyncLog {
  id: string
  status: SyncStatus
  syncedAt: string
  eventsAdded: number
  eventsUpdated: number
  eventsRemoved: number
  errorMessage: string | null
}

export interface NotificationTypeInfo {
  id: NotificationType
  label: string
  icon: string
}

// =============================================================================
// Dashboard Types
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
// Settings Types
// =============================================================================

export type SettingsTab = 'profile' | 'users' | 'brands' | 'categories'

export interface ProfileNotificationPreferences {
  deadlineReminders: boolean
  eventReminders: boolean
  taskAssignments: boolean
  statusChanges: boolean
  approvalRequests: boolean
}

export interface CurrentUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatarUrl: string | null
  avatarInitials: string
  whatsappNumber: string
  googleCalendarConnected: boolean
  googleCalendarEmail: string | null
  notificationPreferences: ProfileNotificationPreferences
}

export interface ColorOption {
  name: string
  value: string
}

// =============================================================================
// API Response Types
// =============================================================================

export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
