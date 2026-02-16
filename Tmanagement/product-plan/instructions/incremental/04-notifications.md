# Milestone 4: Notifications

This milestone implements the notification center with preferences and Google Calendar sync.

## What's Provided

- `sections/notifications/README.md` - Feature specification
- `sections/notifications/tests.md` - TDD test scenarios
- `sections/notifications/types.ts` - TypeScript interfaces
- `sections/notifications/sample-data.json` - Sample notifications data
- `sections/notifications/components/` - Reference UI components

## What You Build

- Notification API routes
- Notification preferences storage
- Google Calendar OAuth integration
- Sync status tracking

---

## Overview

The Notification Center displays system alerts and reminders with configurable preferences and Google Calendar integration.

## Features

1. **Notification Inbox**: Chronological list with filtering
2. **Read/Unread Management**: Mark individual or all as read
3. **Notification Preferences**: Toggle types and channels
4. **Google Calendar Sync**: Connect and sync events
5. **WhatsApp Integration**: Delivery channel for critical alerts

---

## Notification Types

| Type | Trigger | Mandatory? |
|------|---------|------------|
| Deadline | D-3 and D-1 before task deadline | Yes (WhatsApp) |
| Assignment | User assigned to task/sub-task | No |
| Status Change | Task status updated | No |
| Approval | Task needs approval or was approved | No |
| Sync | Calendar sync completed | No |
| Error | Sync or system error | No |

---

## User Flows

### View Notifications
1. Navigate to Notifications section
2. See chronological list (newest first)
3. Unread notifications highlighted
4. Filter by type if needed

### Mark as Read
1. Click notification to navigate to related item
2. Notification automatically marked as read
3. Or use checkbox/menu to mark without navigating

### Configure Preferences
1. Click "Preferences" tab
2. Toggle notification types on/off
3. Choose delivery channels (in-app, WhatsApp)
4. Note: Deadline notifications are mandatory

### Connect Google Calendar
1. Go to Preferences tab
2. Click "Connect Google Calendar"
3. Complete OAuth flow
4. See connected account info
5. Events start syncing automatically

### Manual Sync
1. Click "Sync Now" button
2. See loading state
3. Success/error notification appears

---

## UI Components

### Tab Navigation
```
+------------------------------------------+
| [Inbox (3)]  [Preferences]               |
+------------------------------------------+
```

### Notification Filters
```
+------------------------------------------+
| All | Deadlines | Assignments | Status | Approvals | Sync
|                              [Mark all as read]
+------------------------------------------+
```

### Notification Card
```
+------------------------------------------+
| [icon] Deadline Tomorrow                 |
|        Task "Photo Shoot" deadline is    |
|        tomorrow (Feb 28).               |
|                                          |
|        2 hours ago    [Read] [Dismiss]   |
+------------------------------------------+
```

Unread: Blue dot indicator, slightly darker background

### Preferences Panel
```
+------------------------------------------+
| Notification Preferences                 |
|                                          |
| Deadlines        [🔒] In-app [✓] WA [✓] |
| Assignments      [on] In-app [✓] WA [ ] |
| Status Changes   [on] In-app [✓] WA [ ] |
| Approvals        [on] In-app [✓] WA [✓] |
| Sync             [on] In-app [✓] WA [ ] |
|                                          |
| 🔒 = Mandatory, cannot be disabled       |
+------------------------------------------+
```

### Google Calendar Card
```
+------------------------------------------+
| Google Calendar                          |
|                                          |
| ✓ Connected                              |
| user@gmail.com                           |
| Last synced: 5 minutes ago               |
| 12 events synced                         |
|                                          |
| [Sync Now] [Disconnect]                  |
+------------------------------------------+
```

Or disconnected state:
```
+------------------------------------------+
| Google Calendar                          |
|                                          |
| Connect your Google Calendar to sync     |
| events and receive reminders on mobile.  |
|                                          |
| [Connect Google Calendar]                |
+------------------------------------------+
```

### Empty State
```
+------------------------------------------+
|        [bell icon]                       |
|                                          |
|    No notifications                      |
|    New notifications will appear here    |
+------------------------------------------+
```

---

## API Endpoints

### Notifications

#### GET /api/notifications
Query params: type, isRead
Returns: Notification[]

#### PUT /api/notifications/:id/read
Returns: Notification

#### PUT /api/notifications/:id/unread
Returns: Notification

#### DELETE /api/notifications/:id
(Mark as dismissed)
Returns: { success: true }

#### POST /api/notifications/mark-all-read
Returns: { count: number }

### Preferences

#### GET /api/notifications/preferences
Returns: NotificationPreferences

#### PUT /api/notifications/preferences
Body: Partial<NotificationPreferences>
Returns: NotificationPreferences

### Google Calendar

#### POST /api/calendar/connect
Initiates OAuth flow
Returns: { redirectUrl: string }

#### GET /api/calendar/callback
OAuth callback handler
Stores tokens and connection info

#### DELETE /api/calendar/disconnect
Returns: { success: true }

#### POST /api/calendar/sync
Triggers manual sync
Returns: SyncLog

#### GET /api/calendar/status
Returns: GoogleCalendarConnection

---

## Notification Generation

Create notifications for these events:

### Deadline Reminders (Scheduled Job)
- Run daily at 8:00 AM
- Find tasks with deadline in 3 days or 1 day
- Create notification for PIC
- Send WhatsApp message

### Task Assignment
- When task.picId is set/changed
- When subTask.picId is set
- Notify the assigned user

### Status Change
- When task.status changes
- Notify the PIC
- If status is "review", also notify Superiors

### Approval
- When task status changes to "approved"
- Notify the PIC
- Include approval feedback if any

---

## Google Calendar Integration

### OAuth Setup
1. Create Google Cloud project
2. Enable Calendar API
3. Configure OAuth consent screen
4. Get client ID and secret

### Sync Logic
```typescript
async function syncToGoogleCalendar(userId: string) {
  const connection = await getConnection(userId)
  if (!connection.isConnected) return

  const events = await getTeamEvents()

  for (const event of events) {
    await upsertGoogleEvent(connection, event)
  }

  await updateLastSyncTime(userId)
}
```

### Event Mapping
TeamPulse Event -> Google Calendar Event:
- title -> summary
- description -> description
- date + startTime -> start.dateTime
- date + endTime -> end.dateTime
- location -> location

---

## Test Scenarios

See `tests.md` for complete test coverage including:
- Notification list rendering
- Filter functionality
- Read/unread state management
- Mark all as read
- Preferences toggling
- Mandatory notification handling
- Google Calendar connection flow
- Sync success/failure states
- Empty states
