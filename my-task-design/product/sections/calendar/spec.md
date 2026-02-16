# Calendar Specification

## Overview
Shared calendar for viewing and managing team schedules including events, photo shoots, launches, and editorial plans. Provides multiple views, filtering, and Google Calendar sync for mobile access.

## User Flows
- View shared calendar in daily, weekly, or monthly view
- Filter calendar by schedule type, brand, or PIC
- Add new schedule with date, time, type, and description
- Receive conflict warning when scheduling overlaps (can proceed anyway)
- Click schedule item to view details in a modal
- Edit or delete any schedule from the detail modal
- Schedules auto-sync to Google Calendar for mobile access

## UI Requirements
- Calendar with daily/weekly/monthly view switcher
- Distinct visual styling (colors/icons) for each schedule type: event, photo shoot, launch, editorial
- Calendar items display title, time, and type indicator at a glance
- Filter controls for schedule type, brand, and PIC
- Add schedule form with date, time, type, and description fields
- Conflict warning banner when time overlaps detected (non-blocking)
- Detail/edit modal for viewing and modifying schedules
- Delete confirmation dialog

## Configuration
- shell: true
