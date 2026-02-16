# Task Board Specification

## Overview
A task management section with table and kanban views for tracking parent tasks with sub-task checklists. Supports a status workflow (To Do → In Progress → Done → Review → Approved), progress visualization, and a dedicated Approval Inbox for Superiors to review and approve completed work.

## User Flows
- **Create Task:** Click "New Task" button → Side panel opens with template options (Photo Shoot, Video Shoot, Event, or blank) → Fill in task details (title, PIC, brand, category, deadline) → Add sub-tasks → Save
- **View/Edit Task:** Click task row or card → Side panel slides in showing full details and sub-task checklist → Edit fields or check off sub-tasks → Progress auto-updates
- **Update Status:** Change task status via dropdown in side panel or inline → When set to "Review", task appears in Approval Inbox
- **Approve Task (Superior):** Navigate to Approval Inbox → See all tasks with status "Review" → Click task to open side panel → Review details → Click "Approve" or "Request Revision"
- **Filter Tasks:** Use filter bar to narrow by status, PIC, brand, category, date range, or search text
- **Switch Views:** Toggle between table view and kanban view using view switcher

## UI Requirements
- Table view with columns: Title, PIC, Brand, Category, Status, Deadline, Progress
- Kanban view with columns for each status (To Do, In Progress, Done, Review, Approved)
- Side panel for task details with sub-task checklist (checkboxes)
- Visual progress indicator (progress bar or percentage) based on completed sub-tasks
- Filter bar with dropdowns for Status, PIC, Brand, Category + date range picker + search input
- View switcher (table/kanban toggle)
- Dedicated Approval Inbox view filtering tasks with status "Review"
- Task templates: Photo Shoot, Video Shoot, Event (pre-filled sub-tasks)
- Collapsible app shell navigation for full-screen table/kanban views

## Configuration
- shell: true
