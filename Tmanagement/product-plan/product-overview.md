# TeamPulse — Product Overview

## Summary

A shared calendar and task board that gives marketing teams real-time visibility into schedules, tasks, and progress — eliminating the need to wait for weekly WIP meetings.

## Problems Solved

1. **No Real-Time Visibility** — The team currently relies on weekly WIP meetings to know what's happening. TeamPulse provides a shared board where everyone can see all tasks and their status instantly.

2. **Schedule Conflicts** — Team members accidentally book overlapping times for shoots, events, and campaigns. TeamPulse offers a shared calendar with automatic conflict warnings.

3. **Missed Deadlines** — Without reminders, tasks slip through the cracks. TeamPulse sends automated reminders via WhatsApp and syncs with Google Calendar.

4. **PIC Absence Breaks Tracking** — When a team member is sick or on leave, their tasks become invisible. TeamPulse makes all tasks visible to the entire team.

5. **Timeline Hard to Maintain** — Project delays happen without clear visual tracking. TeamPulse provides a timeline/Gantt view with deadline highlights.

## Key Features

- Shared calendar with daily, weekly, and monthly views
- Task management with sub-tasks and checklists
- Progress tracking with status workflow (To Do → In Progress → Done → Review → Approved)
- WhatsApp notifications for reminders and updates
- Google Calendar sync for mobile access
- Timeline/Gantt view for visual progress tracking
- Filter by brand (Shi by Shireen, ZS, ZS Active, ZS Signature)
- Filter by PIC, status, and category
- Cross-department coordination notes
- Role-based access: PIC (edit) and Superior (view, monitor, approve)

## Planned Sections

1. **Dashboard** — Timeline and Gantt view for visual progress tracking, overdue and deadline highlights, and summary statistics by status and PIC.

2. **Calendar** — Shared calendar with daily, weekly, and monthly views, conflict warnings, and scheduling for events, photo shoots, launches, and editorial plans.

3. **Task Board** — Task management with sub-tasks and checklists, status workflow (To Do → In Progress → Done → Review → Approved), progress tracking, and filters by brand, PIC, and category.

4. **Notifications** — WhatsApp reminders for deadlines and events, Google Calendar sync for mobile access, and real-time alerts for task assignments and status changes.

5. **Settings & Administration** — User management (roles: PIC vs Superior), master data configuration (brands, categories), and personal profile settings for Google Calendar sync and WhatsApp number registration.

## Data Model

**Entities:**
- User — Team members with roles (PIC or Superior)
- Task — Parent tasks with status workflow and progress tracking
- SubTask — Checklist items within tasks
- Event — Calendar items (photo shoots, launches, etc.)
- Brand — Product brands (Shi by Shireen, ZS, ZS Active, ZS Signature)
- Category — Activity types (Photo Shoot, Video Shoot, Event, Campaign, Editorial, Other)
- Notification — Alerts and reminders sent to users

## Design System

**Colors:**
- Primary: `indigo` — Used for buttons, links, key accents
- Secondary: `amber` — Used for tags, highlights, secondary elements
- Neutral: `slate` — Used for backgrounds, text, borders

**Typography:**
- Heading: DM Sans
- Body: DM Sans
- Mono: JetBrains Mono

## User Roles

### PIC (Person in Charge)
- Create and edit tasks
- Manage sub-task checklists
- Schedule calendar events
- Receive notifications
- Submit tasks for review

### Superior
- All PIC capabilities
- Review and approve tasks
- Request revisions
- Manage team members
- Configure brands and categories

## Brands

The marketing team manages four brands:
- Shi by Shireen
- ZS
- ZS Active
- ZS Signature

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing, and application shell
2. **Dashboard** — Timeline/Gantt view, attention items, statistics
3. **Calendar** — Shared calendar with event management
4. **Task Board** — Task management with status workflow
5. **Notifications** — In-app notifications, WhatsApp integration, Google Calendar sync
6. **Settings & Administration** — User management, brands, categories, profile settings

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
