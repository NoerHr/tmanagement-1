# Notifications Specification

## Overview
An in-app notification center displaying system alerts, deadline reminders, and task updates with delivery logs for WhatsApp and Google Calendar sync. Supports read/unread states, click-to-navigate actions, and configurable preferences with mandatory critical alerts via WhatsApp.

## User Flows
- **View Notifications:** Open notification inbox → See chronological list with unread items highlighted → Click notification to navigate to related task/event and mark as read
- **Manage Notifications:** Mark individual notifications as read/unread → Dismiss notifications to remove from inbox → Use "Mark all as read" for bulk action
- **Configure Preferences:** Access notification settings → Toggle notification types on/off (critical alerts like deadlines remain mandatory) → Choose delivery channel preferences (WhatsApp, in-app)
- **Manage Google Calendar Sync:** View connection status card → See connected account and last sync time → Click "Sync Now" to trigger manual sync → Connect/disconnect Google Calendar account
- **Handle Sync Errors:** Receive in-app error notifications when sync fails → View error details → Retry sync

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

## Configuration
- shell: true
