# Task Board Section Tests

## Setup

```typescript
const mockTasks = [
  {
    id: 'task-001',
    title: 'Foto Koleksi Ramadan 2025',
    status: 'in-progress',
    picId: 'user-001',
    brandId: 'brand-001',
    categoryId: 'cat-001',
    deadline: '2025-02-28',
    subTasks: [
      { id: 'sub-001', title: 'Konsep foto', completed: true },
      { id: 'sub-002', title: 'Mood board', completed: true },
      { id: 'sub-003', title: 'Cari studio', completed: false },
    ]
  },
  // ... more tasks
]
```

## View Rendering Tests

### Table View

- [ ] Renders table with correct columns
- [ ] Shows all tasks in rows
- [ ] Columns: Title, PIC, Brand, Category, Status, Deadline, Progress
- [ ] Progress bar shows correct percentage
- [ ] Deadline shows formatted date
- [ ] Clicking row opens detail panel

### Kanban View

- [ ] Renders 5 columns (one per status)
- [ ] Tasks appear in correct column
- [ ] Task cards show title, brand, progress
- [ ] Clicking card opens detail panel

### View Switching

- [ ] Table button activates table view
- [ ] Kanban button activates kanban view
- [ ] Active view button is highlighted
- [ ] View persists during filtering

## Task CRUD Tests

### Create Task

- [ ] "New Task" button opens creation flow
- [ ] Template options shown (Photo Shoot, Video Shoot, Event, Blank)
- [ ] Selecting template pre-fills sub-tasks
- [ ] Required fields validated
- [ ] Task created successfully
- [ ] Board updates with new task

### View Task

- [ ] Clicking task opens side panel
- [ ] Panel shows all task details
- [ ] Sub-tasks displayed as checklist
- [ ] Progress bar shows correct percentage

### Edit Task

- [ ] Fields are editable in panel
- [ ] Save button updates task
- [ ] Cancel discards changes

### Delete Task

- [ ] Delete button shows confirmation
- [ ] Confirming deletes task
- [ ] Board updates after deletion

## Sub-task Tests

### Toggle Sub-task

- [ ] Clicking checkbox toggles completion
- [ ] Progress updates immediately
- [ ] Task progress recalculated

### Add Sub-task

- [ ] Add button/input available
- [ ] New sub-task added to list
- [ ] Progress updates

### Remove Sub-task

- [ ] Remove button on each sub-task
- [ ] Confirmation shown
- [ ] Sub-task removed
- [ ] Progress updates

## Status Workflow Tests

### Status Changes

- [ ] Can change from To Do to In Progress
- [ ] Can change from In Progress to Done
- [ ] Can change from Done to Review
- [ ] Review status shows in Approval Inbox
- [ ] Only Superior can approve

### Approval (Superior)

- [ ] Approval Inbox shows review tasks
- [ ] Approve button changes status to Approved
- [ ] Request Revision returns to In Progress
- [ ] Revision feedback sent to PIC

## Filter Tests

### Status Filter

- [ ] Default shows all statuses
- [ ] Can filter by single status
- [ ] Can filter by multiple statuses

### PIC Filter

- [ ] Lists all users
- [ ] Filtering shows only their tasks

### Brand Filter

- [ ] Lists all brands
- [ ] Filtering shows only brand tasks

### Category Filter

- [ ] Lists all categories
- [ ] Filtering shows only category tasks

### Date Range Filter

- [ ] Can set start date
- [ ] Can set end date
- [ ] Filters by deadline

### Search

- [ ] Search by task title
- [ ] Search by description
- [ ] Real-time filtering

### Combined Filters

- [ ] Multiple filters work together
- [ ] Clear filters button resets all

## Progress Calculation Tests

- [ ] 0% when no sub-tasks completed
- [ ] 100% when all sub-tasks completed
- [ ] Correct percentage for partial
- [ ] Handles 0 sub-tasks (shows 0%)

## Empty States

- [ ] No tasks message when board empty
- [ ] No results when filter returns empty
- [ ] Empty kanban column message

## Responsive Tests

- [ ] Table scrolls horizontally on mobile
- [ ] Kanban scrolls horizontally on mobile
- [ ] Detail panel full screen on mobile
- [ ] Filter bar collapses on mobile

## Accessibility Tests

- [ ] Keyboard navigation works
- [ ] Focus management in panel
- [ ] Screen reader announces changes
- [ ] Status badges have text labels
