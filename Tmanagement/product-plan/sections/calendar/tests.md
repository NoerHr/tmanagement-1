# Calendar Section Tests

## Setup

```typescript
// Test data
const mockEvents = [
  {
    id: 'evt-001',
    title: 'Ramadan Collection Photo Shoot',
    type: 'photo_shoot',
    date: '2024-02-15',
    startTime: '09:00',
    endTime: '17:00',
    brandId: 'brand-001',
    picId: 'user-001',
  },
  // ... more events
]

const mockUsers = [
  { id: 'user-001', name: 'Rina Kartika', role: 'pic' },
]

const mockBrands = [
  { id: 'brand-001', name: 'Shi by Shireen', color: 'rose' },
]
```

## View Rendering Tests

### Month View

- [ ] Renders current month by default
- [ ] Shows correct number of days for the month
- [ ] Highlights today's date with indigo ring
- [ ] Displays events on correct dates
- [ ] Shows "+N more" when date has more than 3 events
- [ ] Day headers show Sun-Sat

### Week View

- [ ] Renders 7 columns for days of the week
- [ ] Shows current week by default
- [ ] Highlights today's date
- [ ] Events displayed in full card format
- [ ] Empty days show "No events" message

### Day View

- [ ] Shows single day with large date display
- [ ] Lists all events for the day
- [ ] Empty state shows "No events scheduled"
- [ ] Add Event button in empty state

## Navigation Tests

### Month Navigation

- [ ] Previous button goes to previous month
- [ ] Next button goes to next month
- [ ] Today button returns to current date
- [ ] Month/year header updates correctly

### View Switching

- [ ] View toggle shows Day, Week, Month buttons
- [ ] Active view button is highlighted
- [ ] Switching views preserves selected date
- [ ] View state persists on navigation

## Filter Tests

### Type Filter

- [ ] Default shows "All Types"
- [ ] Can filter by photo_shoot
- [ ] Can filter by video_shoot
- [ ] Can filter by launch
- [ ] Can filter by editorial
- [ ] Can filter by event
- [ ] Filter updates calendar display

### Brand Filter

- [ ] Default shows "All Brands"
- [ ] Lists all available brands
- [ ] Selecting brand filters events
- [ ] Can clear brand filter

### PIC Filter

- [ ] Default shows "All PICs"
- [ ] Lists all users
- [ ] Selecting PIC filters events
- [ ] Can clear PIC filter

### Combined Filters

- [ ] Multiple filters work together (AND logic)
- [ ] No events message when filters return empty

## Event Creation Tests

### Open Form

- [ ] "Add Event" button opens modal
- [ ] Modal has all required fields
- [ ] Date defaults to currently viewed date

### Form Validation

- [ ] Title is required
- [ ] Type is required
- [ ] Date is required
- [ ] Start time is required
- [ ] End time is required
- [ ] Brand is required
- [ ] PIC is required
- [ ] End time must be after start time

### Conflict Detection

- [ ] Warning shown when time overlaps existing event
- [ ] Warning shows conflicting event details
- [ ] Can proceed anyway with conflict
- [ ] Can change time to avoid conflict

### Submit

- [ ] Creates event on valid submission
- [ ] Modal closes after creation
- [ ] Calendar updates to show new event
- [ ] onEventSave callback is called

## Event Detail Modal Tests

### Open Detail

- [ ] Clicking event opens detail modal
- [ ] Shows all event information
- [ ] Shows brand badge
- [ ] Shows PIC name
- [ ] Shows formatted date and time

### Edit Mode

- [ ] Edit button enters edit mode
- [ ] Fields become editable
- [ ] Save button saves changes
- [ ] Cancel button discards changes

### Delete

- [ ] Delete button shows confirmation
- [ ] Confirming deletes event
- [ ] Canceling keeps event
- [ ] Calendar updates after deletion

## Empty States

- [ ] No events in month shows empty calendar
- [ ] No events for filtered view shows message
- [ ] Empty day view suggests adding event

## Responsive Tests

- [ ] Calendar adapts to mobile viewport
- [ ] Touch scrolling works on mobile
- [ ] Modal is mobile-friendly
- [ ] Filters collapse on mobile

## Accessibility Tests

- [ ] All controls are keyboard accessible
- [ ] Focus visible on interactive elements
- [ ] Modal traps focus when open
- [ ] Screen reader announces events
- [ ] Color coding has text alternatives
