# TeamPulse Implementation Instructions

This document contains complete implementation instructions for TeamPulse. Work through each milestone in order.

---

## Milestone 1: Foundation

### Design System Setup

Configure your project with the TeamPulse design tokens.

#### Colors (Tailwind)
- **Primary**: `indigo` (indigo-50 through indigo-950)
- **Secondary**: `amber` (amber-50 through amber-950)
- **Neutral**: `slate` (slate-50 through slate-950)

#### Typography (Google Fonts)
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

- **Headings**: DM Sans (font-weight: 600-700)
- **Body**: DM Sans (font-weight: 400-500)
- **Monospace**: JetBrains Mono (code, data)

#### CSS Variables
```css
:root {
  --color-primary: theme('colors.indigo.600');
  --color-secondary: theme('colors.amber.500');
  --color-background: theme('colors.slate.50');
  --font-heading: 'DM Sans', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Data Model

Implement the following entities:

#### User
```typescript
interface User {
  id: string
  name: string
  email: string
  role: 'PIC' | 'Superior'
  whatsappNumber: string
  avatarUrl?: string
  googleCalendarConnected: boolean
}
```

#### Task
```typescript
interface Task {
  id: string
  title: string
  description: string
  status: 'to-do' | 'in-progress' | 'done' | 'review' | 'approved'
  picId: string
  brandId: string
  categoryId: string
  startDate?: string
  deadline: string
  createdAt: string
  updatedAt: string
}
```

#### SubTask
```typescript
interface SubTask {
  id: string
  taskId: string
  title: string
  completed: boolean
  picId?: string
  dueDate?: string
}
```

#### Event
```typescript
interface Event {
  id: string
  title: string
  description: string
  type: 'photo_shoot' | 'video_shoot' | 'launch' | 'editorial' | 'event'
  date: string
  startTime: string
  endTime: string
  location: string
  brandId: string
  picId: string
}
```

#### Brand
```typescript
interface Brand {
  id: string
  name: string
  color: string
}
```

#### Category
```typescript
interface Category {
  id: string
  name: string
  color: string
}
```

#### Notification
```typescript
interface Notification {
  id: string
  userId: string
  type: 'deadline' | 'assignment' | 'status-change' | 'approval' | 'sync' | 'error'
  title: string
  description: string
  isRead: boolean
  isDismissed: boolean
  taskId?: string
  eventId?: string
  createdAt: string
}
```

### Application Shell

Build a sidebar + header layout:

#### Sidebar (240px width on desktop)
- TeamPulse logo at top
- Navigation items:
  - Dashboard (default/home)
  - Calendar
  - Task Board
  - Notifications
  - Settings (at bottom, separated)
- Active state: indigo background with white text
- Hover: indigo-50 background

#### Header
- Mobile hamburger menu (left)
- User menu (right):
  - Avatar with initials fallback
  - User name
  - Role badge
  - Dropdown: Profile, Logout

#### Responsive Behavior
- Desktop (1024px+): Full sidebar visible
- Tablet (768px-1023px): Collapsible sidebar
- Mobile (<768px): Hamburger menu, sidebar as overlay

---

## Milestone 2: Calendar

### Overview
Shared calendar for viewing and managing team schedules.

### Features
1. Daily, weekly, and monthly views
2. Filter by event type, brand, PIC
3. Create/edit/delete events
4. Conflict detection warnings
5. Event detail modal

### UI Components
- View switcher (day/week/month)
- Navigation (prev/next, today)
- Filter bar
- Calendar grid with events
- Event cards with type icons
- Event form modal
- Event detail modal

### Event Types with Icons
- Photo Shoot: camera icon
- Video Shoot: video icon
- Launch: rocket icon
- Editorial: document icon
- Event: calendar icon

### Conflict Detection
When creating an event that overlaps with an existing event:
- Show warning banner
- Allow user to proceed anyway

---

## Milestone 3: Task Board

### Overview
Task management with table and kanban views.

### Features
1. Table view with sortable columns
2. Kanban view with drag-and-drop
3. Task detail side panel
4. Sub-task checklist
5. Status workflow
6. Approval inbox for Superiors

### Status Workflow
`To Do` -> `In Progress` -> `Done` -> `Review` -> `Approved`

### UI Components
- View toggle (table/kanban)
- Filter bar (status, PIC, brand, category, date range, search)
- Task table with columns: Title, PIC, Brand, Category, Status, Deadline, Progress
- Kanban columns for each status
- Task detail panel with:
  - Task info
  - Status dropdown
  - Sub-task checklist (add/toggle/remove)
  - Progress bar (auto-calculated)
  - Actions (edit, delete)
  - Approval actions (Superior only)

### Task Templates
Pre-filled sub-tasks for:
- Photo Shoot
- Video Shoot
- Event

### Progress Calculation
```
progress = (completedSubTasks / totalSubTasks) * 100
```

---

## Milestone 4: Notifications

### Overview
Notification inbox with preferences and Google Calendar sync.

### Features
1. Notification inbox with filters
2. Mark as read/unread
3. Dismiss notifications
4. Notification preferences
5. Google Calendar connection
6. Manual sync trigger

### Notification Types
- Deadline reminders (D-1, D-3) - mandatory
- Task assignments
- Status changes
- Approval requests
- Sync status
- Errors

### Delivery Channels
- In-app (always)
- WhatsApp (configurable, mandatory for deadlines)

### UI Components
- Tab navigation (Inbox, Preferences)
- Filter by notification type
- Mark all as read button
- Notification cards with:
  - Type icon
  - Title and description
  - Relative timestamp
  - Read/unread indicator
  - Actions (mark read, dismiss)
- Preferences panel with toggles
- Google Calendar card with:
  - Connection status
  - Connected account
  - Last sync time
  - Sync now button
  - Connect/disconnect

---

## Milestone 5: Dashboard

### Overview
Bento-style overview with timeline and statistics.

### Features
1. Brand filter across all widgets
2. Gantt timeline of tasks
3. Attention items list
4. Task status donut chart
5. Workload bar chart
6. Launch countdown

### Bento Grid Layout
```
+---------------------------------------+
|         Gantt Timeline (full width)   |
+-------------------+-------+-------+---+
| Attention Items   | Status| Launch|   |
| (overdue +        | Chart | Count |   |
|  needs approval)  |       | down  |   |
|                   +-------+-------+   |
|                   |Workload|Quick  |   |
|                   | Chart  |Stats  |   |
+-------------------+-------+-------+---+
```

### Attention Items
- Overdue: red highlight, actions: Reschedule, Mark Done
- Needs Approval: amber highlight, actions: Approve, Revise

### Quick Stats
- Total tasks
- Overdue count
- Awaiting approval count

---

## Milestone 6: Settings & Administration

### Overview
Profile management and admin configuration.

### Role-Based Tabs
- PICs see: Profile only
- Superiors see: Profile, Users, Brands, Categories

### Profile Tab
- Name, email (read-only)
- Profile photo upload
- WhatsApp number (required)
- Google Calendar connection
- Notification preferences toggles

### Users Tab (Superior only)
- User list with avatars, roles, status
- Create new user
- Edit user
- Deactivate/reactivate
- Delete (with confirmation)

### Brands Tab (Superior only)
- Card grid with color swatches
- Add new brand with color picker
- Edit brand
- Delete (with confirmation)

### Categories Tab (Superior only)
- Card grid with color swatches
- Add new category with color picker
- Edit category
- Delete (with confirmation)

---

## Integration Points

### WhatsApp API
- Send deadline reminders (D-1, D-3)
- Send task assignments
- Send approval requests
- Requires phone number validation

### Google Calendar API
- OAuth2 connection flow
- Sync events to user's calendar
- Two-way sync for changes
- Handle token refresh

---

## Testing Checklist

For each section, verify:
- [ ] All user flows work correctly
- [ ] Empty states are handled
- [ ] Error states are handled
- [ ] Mobile responsive
- [ ] Dark mode support
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] Loading states
- [ ] Optimistic updates where appropriate

See each section's `tests.md` for detailed test scenarios.
