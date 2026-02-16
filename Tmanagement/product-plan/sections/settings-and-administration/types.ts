// =============================================================================
// Data Types
// =============================================================================

export type UserRole = 'PIC' | 'Superior'

export type UserStatus = 'active' | 'inactive'

export interface NotificationPreferences {
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
  notificationPreferences: NotificationPreferences
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatarUrl: string | null
  avatarInitials: string
  whatsappNumber: string
  googleCalendarConnected: boolean
  status: UserStatus
  createdAt: string
}

export interface Brand {
  id: string
  name: string
  color: string
  colorName: string
  taskCount: number
}

export interface Category {
  id: string
  name: string
  color: string
  colorName: string
  taskCount: number
}

export interface ColorOption {
  name: string
  value: string
}

// =============================================================================
// Component Props
// =============================================================================

export type SettingsTab = 'profile' | 'users' | 'brands' | 'categories'

export interface SettingsProps {
  /** The currently logged-in user's profile */
  currentUser: CurrentUser
  /** List of all users in the system */
  users: User[]
  /** List of brands */
  brands: Brand[]
  /** List of categories */
  categories: Category[]
  /** Available colors for brand/category color pickers */
  availableColors: ColorOption[]
  /** Currently active tab */
  activeTab?: SettingsTab
  /** Called when user switches tabs */
  onTabChange?: (tab: SettingsTab) => void

  // Profile actions
  /** Called when user updates their profile */
  onUpdateProfile?: (updates: Partial<CurrentUser>) => void
  /** Called when user uploads a new avatar */
  onUploadAvatar?: (file: File) => void
  /** Called when user connects Google Calendar */
  onConnectGoogleCalendar?: () => void
  /** Called when user disconnects Google Calendar */
  onDisconnectGoogleCalendar?: () => void
  /** Called when user updates notification preferences */
  onUpdateNotificationPreferences?: (prefs: Partial<NotificationPreferences>) => void

  // User management actions (Superior only)
  /** Called when creating a new user */
  onCreateUser?: (user: Omit<User, 'id' | 'avatarInitials' | 'createdAt'>) => void
  /** Called when editing a user */
  onEditUser?: (id: string, updates: Partial<User>) => void
  /** Called when deactivating a user */
  onDeactivateUser?: (id: string) => void
  /** Called when reactivating a user */
  onReactivateUser?: (id: string) => void
  /** Called when deleting a user */
  onDeleteUser?: (id: string) => void

  // Brand management actions (Superior only)
  /** Called when creating a new brand */
  onCreateBrand?: (brand: Omit<Brand, 'id' | 'taskCount'>) => void
  /** Called when editing a brand */
  onEditBrand?: (id: string, updates: Partial<Brand>) => void
  /** Called when deleting a brand */
  onDeleteBrand?: (id: string) => void

  // Category management actions (Superior only)
  /** Called when creating a new category */
  onCreateCategory?: (category: Omit<Category, 'id' | 'taskCount'>) => void
  /** Called when editing a category */
  onEditCategory?: (id: string, updates: Partial<Category>) => void
  /** Called when deleting a category */
  onDeleteCategory?: (id: string) => void
}
