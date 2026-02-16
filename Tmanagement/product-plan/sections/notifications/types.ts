// =============================================================================
// Data Types
// =============================================================================

export type NotificationType =
  | 'deadline'
  | 'assignment'
  | 'status-change'
  | 'approval'
  | 'sync'
  | 'error'

export type DeliveryChannel = 'in-app' | 'whatsapp'

export type SyncStatus = 'success' | 'failed' | 'in-progress'

export interface CurrentUser {
  id: string
  name: string
  email: string
  avatar: string
}

export interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  isRead: boolean
  isDismissed: boolean
  taskId: string | null
  eventId: string | null
  createdAt: string
  deliveredVia: DeliveryChannel[]
}

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
// Component Props
// =============================================================================

export interface NotificationsProps {
  /** Current logged-in user */
  currentUser: CurrentUser
  /** List of notifications to display */
  notifications: Notification[]
  /** User's notification preferences */
  preferences: NotificationPreferences
  /** Google Calendar connection status */
  calendarConnection: GoogleCalendarConnection
  /** History of sync attempts */
  syncLogs: SyncLog[]
  /** Available notification types for filtering */
  notificationTypes: NotificationTypeInfo[]

  // Notification actions
  /** Called when user clicks a notification to navigate to related task/event */
  onNotificationClick?: (notification: Notification) => void
  /** Called when user marks a notification as read */
  onMarkAsRead?: (id: string) => void
  /** Called when user marks a notification as unread */
  onMarkAsUnread?: (id: string) => void
  /** Called when user dismisses a notification */
  onDismiss?: (id: string) => void
  /** Called when user clicks "Mark all as read" */
  onMarkAllAsRead?: () => void

  // Preference actions
  /** Called when user toggles a notification type on/off */
  onToggleNotificationType?: (
    type: keyof Omit<NotificationPreferences, 'userId'>,
    field: 'enabled' | 'inApp' | 'whatsapp',
    value: boolean
  ) => void

  // Google Calendar actions
  /** Called when user clicks "Connect" to link Google Calendar */
  onConnectGoogleCalendar?: () => void
  /** Called when user clicks "Disconnect" to unlink Google Calendar */
  onDisconnectGoogleCalendar?: () => void
  /** Called when user clicks "Sync Now" to trigger manual sync */
  onSyncNow?: () => void
  /** Called when user clicks "Retry" after a sync failure */
  onRetrySync?: () => void
}
