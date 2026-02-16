# Notifications Section Tests

## Setup

```typescript
const mockNotifications = [
  {
    id: 'notif-001',
    type: 'deadline',
    title: 'Deadline Tomorrow',
    description: 'Task "Photo Shoot" deadline is tomorrow',
    isRead: false,
    isDismissed: false,
    taskId: 'task-001',
    createdAt: '2025-02-27T08:00:00Z',
    deliveredVia: ['in-app', 'whatsapp']
  },
  // ... more notifications
]
```

## Notification List Tests

### Display

- [ ] Shows notifications in chronological order
- [ ] Newest notifications appear first
- [ ] Unread notifications have visual indicator
- [ ] Dismissed notifications are hidden
- [ ] Shows relative timestamp (e.g., "2 hours ago")

### Notification Card

- [ ] Shows type icon
- [ ] Shows title and description
- [ ] Shows delivery channel badges
- [ ] Unread has different background
- [ ] Click navigates to related item

### Empty State

- [ ] Shows empty message when no notifications
- [ ] Different message when filtered to empty

## Read/Unread Tests

### Mark as Read

- [ ] Click notification marks as read
- [ ] Read notification styling changes
- [ ] Unread count updates

### Mark as Unread

- [ ] Can mark read notification as unread
- [ ] Unread count updates

### Mark All as Read

- [ ] Button marks all visible as read
- [ ] Unread count becomes 0
- [ ] All notification styling updates

## Dismiss Tests

- [ ] Dismiss button removes from list
- [ ] Dismissed notifications don't appear
- [ ] Count updates after dismiss

## Filter Tests

### Type Filters

- [ ] All filter shows everything
- [ ] Deadlines filter works
- [ ] Assignments filter works
- [ ] Status Changes filter works
- [ ] Approvals filter works
- [ ] Sync filter works

### Filter Interaction

- [ ] Active filter is highlighted
- [ ] Count shows filtered total
- [ ] Clear filter returns to all

## Preferences Tests

### Toggle Types

- [ ] Can toggle each notification type
- [ ] Deadlines toggle is disabled (mandatory)
- [ ] Changes are saved

### Delivery Channels

- [ ] Can toggle in-app channel
- [ ] Can toggle WhatsApp channel
- [ ] WhatsApp requires deadlines enabled

### Mandatory Notifications

- [ ] Deadline notifications cannot be disabled
- [ ] Shows lock icon for mandatory
- [ ] Tooltip explains mandatory

## Google Calendar Tests

### Disconnected State

- [ ] Shows "Connect" button
- [ ] Explains benefits of connecting
- [ ] No sync options visible

### Connected State

- [ ] Shows connected email
- [ ] Shows last sync time
- [ ] Shows events count
- [ ] "Sync Now" button visible
- [ ] "Disconnect" button visible

### Connect Flow

- [ ] Connect button initiates OAuth
- [ ] Success shows connected state
- [ ] Error shows error message

### Disconnect

- [ ] Confirmation dialog shown
- [ ] Disconnect removes connection
- [ ] UI updates to disconnected state

### Manual Sync

- [ ] "Sync Now" shows loading state
- [ ] Success updates last sync time
- [ ] Success shows notification
- [ ] Error shows error message

### Sync Errors

- [ ] Error notification appears on failure
- [ ] Error details shown
- [ ] Retry button available
- [ ] Retry triggers new sync

## Responsive Tests

- [ ] List scrolls properly on mobile
- [ ] Cards adapt to screen size
- [ ] Preferences panel mobile-friendly
- [ ] Calendar card mobile-friendly

## Accessibility Tests

- [ ] Keyboard navigation works
- [ ] Focus visible on elements
- [ ] Screen reader announces notifications
- [ ] ARIA labels on icons
