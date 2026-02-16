# Milestone 5: Dashboard

This milestone implements the bento-style dashboard with timeline and statistics.

## What's Provided

- `sections/dashboard/README.md` - Feature specification
- `sections/dashboard/tests.md` - TDD test scenarios
- `sections/dashboard/types.ts` - TypeScript interfaces
- `sections/dashboard/sample-data.json` - Sample dashboard data
- `sections/dashboard/components/` - Reference UI components

## What You Build

- Dashboard API aggregating data from other sections
- Brand filtering across all widgets
- Attention item calculations
- Statistics computation

---

## Overview

The Dashboard provides a visual overview of project progress with a Gantt timeline, attention items, and statistics widgets.

## Features

1. **Brand Filter**: Filter all widgets by brand
2. **Gantt Timeline**: Visual task schedule
3. **Attention Items**: Overdue and needs-approval lists
4. **Task Statistics**: Status breakdown chart
5. **Workload Distribution**: Tasks per PIC
6. **Launch Countdown**: Next upcoming launch

---

## Bento Grid Layout

```
+-----------------------------------------------------------------------+
|                        Gantt Timeline (full width)                     |
+-----------------------------------------------------------------------+
+-------------------------------+  +----------------+  +----------------+
|                               |  |                |  |                |
|    Attention Items            |  | Task Status    |  | Launch         |
|    (overdue + needs approval) |  | Chart          |  | Countdown      |
|                               |  |                |  |                |
|                               |  +----------------+  +----------------+
|                               |  +----------------+  +----------------+
|                               |  |                |  |                |
|                               |  | Workload       |  | Quick          |
|                               |  | Chart          |  | Stats          |
+-------------------------------+  +----------------+  +----------------+
```

---

## User Flows

### View Dashboard
1. Navigate to Dashboard (default/home)
2. See all widgets with current month data
3. Widgets show data for all brands by default

### Filter by Brand
1. Click brand filter in header
2. Select a brand (or "All")
3. All widgets update to show filtered data

### Handle Attention Items
1. See overdue tasks (red) and needs-approval (amber)
2. Hover to reveal action buttons
3. For overdue: Reschedule or Mark Done
4. For needs-approval: Approve or Revise

### Navigate to Task
1. Click task bar in Gantt timeline
2. Or click attention item
3. Navigate to Task Board with that task selected

---

## UI Components

### Header with Brand Filter
```
+--------------------------------------------------+
| Dashboard                                        |
| Overview of your marketing campaigns and tasks   |
|                                                  |
|                    [All Brands ▼]                |
+--------------------------------------------------+
```

### Brand Filter Pills
```
[All] [Shi by Shireen] [ZS] [ZS Active] [ZS Signature]
```
Active brand has colored background.

### Gantt Timeline
```
+--------------------------------------------------+
| Timeline                          Feb 2025 ► ◄   |
+--------------------------------------------------+
|                | 1 | 5 | 10 | 15 | 20 | 25 | 28 |
+--------------------------------------------------+
| Task 1         |▓▓▓▓▓▓▓▓▓▓▓▓|                   |
| Task 2         |        |▓▓▓▓▓▓▓▓|              |
| Task 3         |                    |▓▓▓▓▓▓▓▓|  |
+--------------------------------------------------+
```
- Bars colored by brand
- Hover shows task preview
- Click navigates to task

### Attention List
```
+------------------------------------------+
| Needs Attention                          |
+------------------------------------------+
| 🔴 New Product Catalog Design    OVERDUE |
|    Dimas Pratama · Shi           4 days  |
|    [Reschedule] [Mark Done]              |
+------------------------------------------+
| 🟡 Lebaran Campaign Landing Page REVIEW  |
|    Dimas Pratama · ZS           3 days   |
|    [Approve] [Revise]                    |
+------------------------------------------+
```

### Task Status Chart (Donut)
```
       ┌─────────┐
      ╱     20%   ╲
    ╱    Approved   ╲
   │   ╭─────────╮   │
   │   │  Total  │   │
   │   │   10    │   │
   │   ╰─────────╯   │
    ╲    30% Done   ╱
      ╲    20%    ╱
       └─────────┘
          In Progress
```

Colors:
- To Do: slate-400
- In Progress: indigo-500
- Done: emerald-400
- Review: amber-500
- Approved: emerald-600

### Workload Chart (Bar)
```
| Rina Putri    |████████░░| 3
| Dimas Pratama |██████████████| 4 (1 overdue)
| Ayu Lestari   |██████░░░░| 3 (2 overdue)
```
Overdue portion in red.

### Launch Countdown
```
+------------------------------------------+
| 🚀 Upcoming Launch                       |
+------------------------------------------+
|                                          |
|              20                          |
|             days                         |
|                                          |
| Ramadan Collection Launch                |
| Shi by Shireen · Feb 25                  |
+------------------------------------------+
```

### Quick Stats Card
```
+------------------------------------------+
| Quick Stats                              |
+------------------------------------------+
| Total Tasks          10                  |
| Overdue              3                   |
| Awaiting Approval    2                   |
+------------------------------------------+
```
Gradient indigo background, white text.

---

## API Endpoints

### GET /api/dashboard
Query params: brandId (optional)
Returns:
```typescript
{
  tasks: Task[]
  taskStatistics: {
    toDo: number
    inProgress: number
    done: number
    review: number
    approved: number
    total: number
  }
  workloadDistribution: {
    picId: string
    picName: string
    taskCount: number
    overdueCount: number
  }[]
  attentionItems: {
    id: string
    title: string
    type: 'overdue' | 'needs-approval'
    deadline: string
    picName: string
    brandName: string
    daysOverdue?: number
    waitingDays?: number
  }[]
  upcomingLaunch: {
    id: string
    title: string
    date: string
    brandName: string
    daysUntil: number
  } | null
}
```

---

## Data Aggregation

### Task Statistics
```typescript
function calculateStatistics(tasks: Task[]) {
  return {
    toDo: tasks.filter(t => t.status === 'to-do').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    review: tasks.filter(t => t.status === 'review').length,
    approved: tasks.filter(t => t.status === 'approved').length,
    total: tasks.length
  }
}
```

### Attention Items
```typescript
function getAttentionItems(tasks: Task[]) {
  const today = new Date()
  const items = []

  // Overdue: past deadline, not approved
  tasks.forEach(task => {
    if (new Date(task.deadline) < today && task.status !== 'approved') {
      items.push({
        ...task,
        type: 'overdue',
        daysOverdue: daysDiff(task.deadline, today)
      })
    }
  })

  // Needs approval: status is 'review'
  tasks.forEach(task => {
    if (task.status === 'review') {
      items.push({
        ...task,
        type: 'needs-approval',
        waitingDays: daysDiff(task.updatedAt, today)
      })
    }
  })

  return items
}
```

### Upcoming Launch
```typescript
function getUpcomingLaunch(events: Event[]) {
  const today = new Date()
  const launches = events
    .filter(e => e.type === 'launch' && new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  if (launches.length === 0) return null

  const next = launches[0]
  return {
    ...next,
    daysUntil: daysDiff(today, next.date)
  }
}
```

---

## Brand Filtering

When a brand is selected, filter:
- Tasks by brandId
- Attention items by task's brandId
- Recalculate statistics for filtered tasks
- Recalculate workload for filtered tasks
- Filter upcoming launch by brand

---

## Test Scenarios

See `tests.md` for complete test coverage including:
- Dashboard loading with aggregated data
- Brand filter functionality
- Gantt timeline rendering
- Attention item actions
- Chart rendering
- Launch countdown calculation
- Empty states
- Mobile responsiveness
