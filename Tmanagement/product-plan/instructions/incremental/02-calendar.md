# Milestone 2: Calendar

This milestone implements the shared calendar for viewing and managing team schedules.

## What's Provided

- `sections/calendar/README.md` - Feature specification
- `sections/calendar/tests.md` - TDD test scenarios
- `sections/calendar/types.ts` - TypeScript interfaces
- `sections/calendar/sample-data.json` - Sample events data
- `sections/calendar/components/` - Reference UI components

## What You Build

- Calendar API routes (CRUD for events)
- Event filtering and search
- Conflict detection logic
- Integration with data model

---

## Overview

The Calendar section provides a shared team calendar with multiple view options, event management, and filtering capabilities.

## Features

1. **View Modes**: Daily, weekly, and monthly calendar views
2. **Event Management**: Create, edit, delete schedule items
3. **Filtering**: Filter by event type, brand, and PIC
4. **Conflict Detection**: Warning when scheduling overlaps
5. **Visual Distinction**: Different colors/icons for event types

---

## User Flows

### View Calendar
1. User navigates to Calendar section
2. Default view is monthly, showing current month
3. Events appear on their scheduled dates
4. Click event to view details

### Create Event
1. Click "Add Event" button
2. Form modal opens
3. Fill in: title, type, date, time, location, brand, PIC
4. If conflict detected, warning banner appears
5. Submit to create event

### Edit Event
1. Click event to open detail modal
2. Click "Edit" button
3. Modify fields
4. Save changes

### Filter Events
1. Use filter controls in header
2. Filter by: type, brand, PIC
3. Calendar updates to show only matching events

---

## UI Components

### Calendar Header
```
+------------------------------------------+
| February 2025      < Today >             |
|                                          |
| [Day] [Week] [Month]      [+ Add Event]  |
+------------------------------------------+
```

### Filters Bar
```
+------------------------------------------+
| Type: [All ▼]  Brand: [All ▼]  PIC: [All ▼]
+------------------------------------------+
```

### Month View Grid
- 7 columns (Sun-Sat)
- Day headers
- Cells with date number and events
- Today highlighted with indigo ring
- Events show compact cards (title, type icon)
- "+N more" link if > 3 events

### Week View
- 7 columns with day/date headers
- Full-height columns
- Events as cards

### Day View
- Single day focus
- Large date display
- List of events with full details

### Event Card
```
+------------------------+
| [icon] Event Title     |
| 9:00 - 11:00          |
| Brand badge            |
+------------------------+
```

### Event Type Icons/Emoji
- Photo Shoot: camera or 📸
- Video Shoot: video or 🎬
- Launch: rocket or 🚀
- Editorial: document or 📝
- Event: calendar or 📅

### Event Form Modal
Fields:
- Title (required)
- Type (dropdown, required)
- Date (date picker, required)
- Start Time (time picker, required)
- End Time (time picker, required)
- Location (text)
- Description (textarea)
- Brand (dropdown, required)
- PIC (dropdown, required)

### Event Detail Modal
- Event title and type
- Date and time
- Location (with map link if available)
- Brand badge
- PIC name
- Description
- Actions: Edit, Delete

### Conflict Warning Banner
```
+------------------------------------------+
| ⚠️ This time slot overlaps with          |
| "Existing Event" (9:00 - 11:00)          |
| [Proceed Anyway] [Change Time]           |
+------------------------------------------+
```

---

## API Endpoints

### GET /api/events
Query params: type, brandId, picId, startDate, endDate
Returns: Event[]

### POST /api/events
Body: Omit<Event, 'id' | 'createdAt'>
Returns: Event
Note: Check for conflicts before creating

### GET /api/events/:id
Returns: Event

### PUT /api/events/:id
Body: Partial<Event>
Returns: Event

### DELETE /api/events/:id
Returns: { success: true }

---

## Conflict Detection

Check for overlapping events:
```typescript
function checkConflict(newEvent: Partial<Event>, existingEvents: Event[]) {
  return existingEvents.filter(existing => {
    // Same date
    if (existing.date !== newEvent.date) return false

    // Time overlap check
    const newStart = parseTime(newEvent.startTime)
    const newEnd = parseTime(newEvent.endTime)
    const existStart = parseTime(existing.startTime)
    const existEnd = parseTime(existing.endTime)

    return newStart < existEnd && newEnd > existStart
  })
}
```

---

## Data Types

See `types.ts` for full interface definitions:
- `Event` - Calendar event entity
- `EventType` - photo_shoot | video_shoot | launch | editorial | event
- `CalendarView` - day | week | month
- `CalendarFilters` - Filter state
- `CalendarProps` - Main component props

---

## Test Scenarios

See `tests.md` for complete test coverage including:
- View rendering at each mode
- Navigation (prev/next/today)
- Event CRUD operations
- Filter behavior
- Conflict detection
- Empty states
- Mobile responsiveness
