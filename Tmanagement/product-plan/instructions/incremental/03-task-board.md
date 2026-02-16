# Milestone 3: Task Board

This milestone implements task management with sub-task checklists and approval workflow.

## What's Provided

- `sections/task-board/README.md` - Feature specification
- `sections/task-board/tests.md` - TDD test scenarios
- `sections/task-board/types.ts` - TypeScript interfaces
- `sections/task-board/sample-data.json` - Sample tasks data
- `sections/task-board/components/` - Reference UI components

## What You Build

- Task CRUD API routes
- Sub-task management
- Status workflow logic
- Progress calculation
- Approval inbox filtering

---

## Overview

The Task Board provides table and kanban views for managing tasks with sub-task checklists and a status workflow.

## Features

1. **View Modes**: Table view and Kanban board
2. **Task Management**: Create, edit, delete tasks
3. **Sub-tasks**: Checklist items within tasks
4. **Status Workflow**: To Do > In Progress > Done > Review > Approved
5. **Progress Tracking**: Auto-calculated from sub-tasks
6. **Approval Inbox**: Dedicated view for Superiors

---

## Status Workflow

```
+--------+     +-----------+     +------+     +--------+     +----------+
| To Do  | --> | In Progr. | --> | Done | --> | Review | --> | Approved |
+--------+     +-----------+     +------+     +--------+     +----------+
                                                  ^              |
                                                  |   Request    |
                                                  +-- Revision --+
```

**Status Transitions:**
- PIC moves task: To Do -> In Progress -> Done
- PIC submits for review: Done -> Review
- Superior approves: Review -> Approved
- Superior requests revision: Review -> In Progress (with feedback)

---

## User Flows

### View Tasks
1. User navigates to Task Board
2. Default view is table
3. Tasks displayed with key info
4. Click task to open detail panel

### Create Task
1. Click "New Task" button
2. Optionally select template (Photo Shoot, Video Shoot, Event)
3. Fill in task details
4. Add/edit sub-tasks
5. Save task

### Update Task Status
1. Click task to open detail panel
2. Use status dropdown to change status
3. When setting to "Review", task appears in Approval Inbox

### Complete Sub-tasks
1. Open task detail panel
2. Check/uncheck sub-task checkboxes
3. Progress bar updates automatically

### Approve Task (Superior)
1. Navigate to Approval Inbox tab
2. See all tasks with "Review" status
3. Click task to review
4. Click "Approve" or "Request Revision"

---

## UI Components

### Header with View Toggle
```
+--------------------------------------------------+
| Task Board                    6 tasks (filtered) |
|                                                  |
| [Table] [Kanban]                    [+ New Task] |
+--------------------------------------------------+
```

### Filter Bar
```
+--------------------------------------------------+
| Status: [All ▼]  PIC: [All ▼]  Brand: [All ▼]   |
| Category: [All ▼]  Date: [From] - [To]  🔍      |
+--------------------------------------------------+
```

### Table View
| Title | PIC | Brand | Category | Status | Deadline | Progress |
|-------|-----|-------|----------|--------|----------|----------|
| Task 1 | Avatar+Name | Badge | Label | Badge | Date | Bar+% |

### Kanban View
5 columns (one per status):
```
+----------+  +----------+  +----------+  +----------+  +----------+
|  TO DO   |  |IN PROGRESS|  |   DONE   |  |  REVIEW  |  | APPROVED |
+----------+  +----------+  +----------+  +----------+  +----------+
| [Card]   |  | [Card]   |  | [Card]   |  | [Card]   |  | [Card]   |
| [Card]   |  | [Card]   |  |          |  |          |  |          |
+----------+  +----------+  +----------+  +----------+  +----------+
```

### Task Card (Kanban)
```
+------------------------+
| Task Title             |
| [Brand] [Category]     |
| ▓▓▓▓░░░░ 60%          |
| [Avatar] Due: Feb 28   |
+------------------------+
```

### Task Detail Panel (Slide-in)
```
+----------------------------------+
| Task Title                    [X]|
+----------------------------------+
| Status: [In Progress ▼]          |
|                                  |
| Description text here...         |
|                                  |
| PIC: [Avatar] Name               |
| Brand: [Badge]                   |
| Category: Label                  |
| Deadline: Feb 28, 2025           |
|                                  |
| -------- Sub-tasks --------      |
| [x] Completed sub-task           |
| [ ] Pending sub-task             |
| [ ] Another pending              |
| [+ Add sub-task]                 |
|                                  |
| Progress: ▓▓▓▓░░░░ 40%          |
|                                  |
| [Edit] [Delete]                  |
| (or [Approve] [Request Revision])|
+----------------------------------+
```

### Status Badge Colors
- To Do: slate
- In Progress: indigo
- Done: emerald
- Review: amber
- Approved: emerald (with checkmark)

### Brand Badge Colors
Use each brand's configured color.

---

## API Endpoints

### Tasks

#### GET /api/tasks
Query params: status[], picId[], brandId[], categoryId[], startDate, endDate, search
Returns: Task[]

#### POST /api/tasks
Body: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
Returns: Task

#### GET /api/tasks/:id
Returns: Task with subTasks

#### PUT /api/tasks/:id
Body: Partial<Task>
Returns: Task

#### DELETE /api/tasks/:id
Returns: { success: true }

#### PUT /api/tasks/:id/status
Body: { status: TaskStatus }
Returns: Task
Note: Validate status transitions

### Sub-tasks

#### POST /api/tasks/:id/subtasks
Body: { title: string, picId?: string, dueDate?: string }
Returns: SubTask

#### PUT /api/tasks/:taskId/subtasks/:id
Body: Partial<SubTask>
Returns: SubTask

#### DELETE /api/tasks/:taskId/subtasks/:id
Returns: { success: true }

#### PUT /api/tasks/:taskId/subtasks/:id/toggle
Returns: SubTask (with toggled completed)

---

## Progress Calculation

```typescript
function calculateProgress(subTasks: SubTask[]): number {
  if (subTasks.length === 0) return 0
  const completed = subTasks.filter(st => st.completed).length
  return Math.round((completed / subTasks.length) * 100)
}
```

---

## Task Templates

When creating a task from template, pre-populate sub-tasks:

**Photo Shoot:**
- Photo concept & creative direction
- Mood board & visual references
- Find studio/location
- Cast models
- Book decorator & props
- Book photographer
- Budget proposal (RAB)
- Crew call & rundown
- Execute photo shoot
- Select & edit photos
- Final delivery

**Video Shoot:**
- Script & storyboard
- Cast talent
- Location scouting
- Production house briefing
- Shooting day(s)
- Rough cut review
- Final editing & color grading
- Sound mixing & music licensing
- Final delivery

**Event:**
- Event concept & objectives
- Venue booking
- Vendor coordination
- Guest list & invitations
- Run of show / rundown
- Rehearsal
- Event day execution
- Post-event report

---

## Test Scenarios

See `tests.md` for complete test coverage including:
- View switching (table/kanban)
- Task CRUD operations
- Sub-task management
- Status transitions
- Progress calculation
- Filtering and search
- Approval workflow
- Empty states
