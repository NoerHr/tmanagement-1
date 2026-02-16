# Notifications Section

## Overview

An in-app notification center displaying system alerts, deadline reminders, and task updates with delivery logs for WhatsApp and Google Calendar sync. Supports read/unread states, click-to-navigate actions, and configurable preferences with mandatory critical alerts via WhatsApp.

## User Flows

1. **View Notifications:** Open notification inbox > See chronological list with unread items highlighted > Click notification to navigate to related task/event and mark as read

2. **Manage Notifications:** Mark individual notifications as read/unread > Dismiss notifications to remove from inbox > Use "Mark all as read" for bulk action

3. **Configure Preferences:** Access notification settings > Toggle notification types on/off (critical alerts like deadlines remain mandatory) > Choose delivery channel preferences (WhatsApp, in-app)

4. **Manage Google Calendar Sync:** View connection status card > See connected account and last sync time > Click "Sync Now" to trigger manual sync > Connect/disconnect Google Calendar account

5. **Handle Sync Errors:** Receive in-app error notifications when sync fails > View error details > Retry sync

## UI Requirements

- Notification inbox with chronological list (newest first)
- Notification cards showing: type icon, title, description, relative timestamp, read/unread indicator
- Filter by notification type (Deadlines, Assignments, Status Changes, Approvals, Sync)
- "Mark all as read" bulk action button
- Notification preferences panel with toggles by type and delivery channel
- Google Calendar connection card (status, connected account, last sync time, connect/disconnect)
- Manual "Sync Now" button with loading state
- Real-time sync indicator in app header (visible globally)
- Error notification display for sync failures with retry option
- Collapsible shell navigation for focus mode

## Notification Types

| Type | Description | Mandatory? |
|------|-------------|------------|
| Deadline | D-3 and D-1 reminders | Yes |
| Assignment | Task/sub-task assignment | No |
| Status Change | Task status updated | No |
| Approval | Task needs or received approval | No |
| Sync | Calendar sync completed | No |
| Error | Sync or system errors | No |

## Components

- `NotificationCenter.tsx` - Main notification inbox
- `NotificationCard.tsx` - Individual notification display
- `NotificationFilters.tsx` - Filter by type
- `PreferencesPanel.tsx` - Notification settings
- `CalendarSyncCard.tsx` - Google Calendar connection
