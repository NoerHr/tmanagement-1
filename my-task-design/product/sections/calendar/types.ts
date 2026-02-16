// =============================================================================
// Data Types
// =============================================================================

export type EventType = 'photo_shoot' | 'video_shoot' | 'launch' | 'editorial' | 'event'

export type UserRole = 'pic' | 'superior'

export type CalendarView = 'day' | 'week' | 'month'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface Brand {
  id: string
  name: string
  color: string
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

// =============================================================================
// Filter Types
// =============================================================================

export interface CalendarFilters {
  type?: EventType | null
  brandId?: string | null
  picId?: string | null
}

// =============================================================================
// Component Props
// =============================================================================

export interface CalendarProps {
  /** The list of events to display on the calendar */
  events: Event[]
  /** Available users for filtering and display */
  users: User[]
  /** Available brands for filtering and display */
  brands: Brand[]
  /** Current calendar view mode */
  currentView?: CalendarView
  /** Current selected date */
  selectedDate?: string
  /** Current active filters */
  filters?: CalendarFilters
  /** Called when user changes the calendar view (day/week/month) */
  onViewChange?: (view: CalendarView) => void
  /** Called when user navigates to a different date */
  onDateChange?: (date: string) => void
  /** Called when user updates filters */
  onFilterChange?: (filters: CalendarFilters) => void
  /** Called when user clicks on an event to view details */
  onEventClick?: (id: string) => void
  /** Called when user wants to create a new event */
  onEventCreate?: () => void
  /** Called when user submits a new event */
  onEventSave?: (event: Omit<Event, 'id' | 'createdAt'>) => void
  /** Called when user updates an existing event */
  onEventUpdate?: (id: string, event: Partial<Event>) => void
  /** Called when user deletes an event */
  onEventDelete?: (id: string) => void
}

// =============================================================================
// Modal Props
// =============================================================================

export interface EventDetailModalProps {
  /** The event to display (null if modal is closed) */
  event: Event | null
  /** Users lookup for displaying PIC name */
  users: User[]
  /** Brands lookup for displaying brand name */
  brands: Brand[]
  /** Whether the modal is in edit mode */
  isEditing?: boolean
  /** Called when user closes the modal */
  onClose?: () => void
  /** Called when user enters edit mode */
  onEdit?: () => void
  /** Called when user saves changes */
  onSave?: (event: Partial<Event>) => void
  /** Called when user deletes the event */
  onDelete?: () => void
}

export interface EventFormModalProps {
  /** Whether the modal is open */
  isOpen: boolean
  /** Available users for PIC selection */
  users: User[]
  /** Available brands for brand selection */
  brands: Brand[]
  /** Existing events to check for conflicts */
  existingEvents?: Event[]
  /** Called when user closes the modal */
  onClose?: () => void
  /** Called when user submits the form */
  onSubmit?: (event: Omit<Event, 'id' | 'createdAt'>) => void
}

// =============================================================================
// Conflict Detection
// =============================================================================

export interface ConflictWarning {
  conflictingEvent: Event
  message: string
}
