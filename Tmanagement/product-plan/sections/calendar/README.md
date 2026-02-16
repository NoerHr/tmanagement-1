# Calendar Section

## Overview

Shared calendar for viewing and managing team schedules including events, photo shoots, launches, and editorial plans. Provides multiple views, filtering, and Google Calendar sync for mobile access.

## User Flows

1. **View shared calendar** in daily, weekly, or monthly view
2. **Filter calendar** by schedule type, brand, or PIC
3. **Add new schedule** with date, time, type, and description
4. **Receive conflict warning** when scheduling overlaps (can proceed anyway)
5. **Click schedule item** to view details in a modal
6. **Edit or delete** any schedule from the detail modal
7. **Schedules auto-sync** to Google Calendar for mobile access

## UI Requirements

- Calendar with daily/weekly/monthly view switcher
- Distinct visual styling (colors/icons) for each schedule type: event, photo shoot, launch, editorial
- Calendar items display title, time, and type indicator at a glance
- Filter controls for schedule type, brand, and PIC
- Add schedule form with date, time, type, and description fields
- Conflict warning banner when time overlaps detected (non-blocking)
- Detail/edit modal for viewing and modifying schedules
- Delete confirmation dialog

## Event Types

| Type | Icon | Description |
|------|------|-------------|
| photo_shoot | camera | Photo session |
| video_shoot | video | Video production |
| launch | rocket | Product launch |
| editorial | document | Editorial planning |
| event | calendar | Other events |

## Components

- `Calendar.tsx` - Main calendar component with views
- `CalendarFilters.tsx` - Filter controls
- `EventCard.tsx` - Event display card
- `EventDetailModal.tsx` - View/edit event modal
- `EventFormModal.tsx` - Create event form

## Data

- `types.ts` - TypeScript interfaces
- `sample-data.json` - Sample events for development
