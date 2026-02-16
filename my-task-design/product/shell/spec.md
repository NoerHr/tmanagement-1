# Application Shell Specification

## Overview
TeamPulse uses a sidebar navigation pattern with a header bar. The sidebar provides access to all main sections, while the header contains the user menu and any global actions. This layout is optimized for a dashboard-style productivity tool where users frequently switch between sections.

## Navigation Structure
- Dashboard → Default/home view with overview and statistics
- Calendar → Shared calendar for scheduling
- Task Board → Task management with progress tracking
- Notifications → WhatsApp reminders and Google Calendar sync
- Settings → User preferences (positioned at bottom of sidebar)

## User Menu
Located in the top-right header area. Contains:
- User avatar (with initials fallback)
- User name
- Role badge (PIC or Superior)
- Dropdown with profile and logout options

## Layout Pattern
**Sidebar + Header Layout**
- Fixed sidebar on the left (240px width on desktop)
- Header bar at the top with user menu
- Main content area fills remaining space
- Sidebar uses the indigo primary color for active states
- Header has subtle border separation

## Responsive Behavior
- **Desktop (1024px+):** Full sidebar visible, expanded navigation labels
- **Tablet (768px-1023px):** Collapsible sidebar, can toggle between expanded/collapsed
- **Mobile (<768px):** Hamburger menu in header, sidebar appears as overlay when opened

## Design Notes
- Uses DM Sans font for navigation items and user info
- Active navigation item has indigo background with white text
- Hover states use indigo-50 (light) / indigo-900 (dark) backgrounds
- Settings icon placed at bottom of sidebar, separated from main nav
- Sidebar includes TeamPulse logo/wordmark at the top
