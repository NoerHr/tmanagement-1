# Dashboard Section Tests

## Setup

```typescript
const mockData = {
  tasks: [...],
  taskStatistics: { toDo: 2, inProgress: 3, done: 2, review: 2, approved: 1, total: 10 },
  workloadDistribution: [
    { picId: 'user-001', picName: 'Rina', taskCount: 3, overdueCount: 0 },
    { picId: 'user-002', picName: 'Dimas', taskCount: 4, overdueCount: 1 },
  ],
  attentionItems: [
    { id: 'task-005', title: 'Catalog Design', type: 'overdue', daysOverdue: 4 },
    { id: 'task-002', title: 'Landing Page', type: 'needs-approval', waitingDays: 3 },
  ],
  upcomingLaunch: {
    title: 'Ramadan Collection Launch',
    date: '2024-02-25',
    brandName: 'Shi by Shireen',
    daysUntil: 20
  }
}
```

## Dashboard Layout Tests

### Bento Grid

- [ ] Grid renders with correct layout
- [ ] Full-width timeline at top
- [ ] Widgets arranged in bento style
- [ ] Responsive on tablet
- [ ] Stacks on mobile

### Widget Rendering

- [ ] Timeline widget renders
- [ ] Attention list renders
- [ ] Task status chart renders
- [ ] Workload chart renders
- [ ] Launch countdown renders
- [ ] Quick stats renders

## Brand Filter Tests

### Filter Display

- [ ] Shows "All" option
- [ ] Shows all brand options
- [ ] Active brand is highlighted

### Filter Behavior

- [ ] Selecting brand filters all widgets
- [ ] Timeline shows only brand tasks
- [ ] Attention items filtered
- [ ] Statistics recalculated
- [ ] Workload recalculated
- [ ] Launch shows brand launch or null

### Clear Filter

- [ ] Selecting "All" shows everything
- [ ] All widgets update

## Gantt Timeline Tests

### Display

- [ ] Shows current month by default
- [ ] Task bars positioned correctly
- [ ] Bar width matches duration
- [ ] Bars colored by brand

### Interaction

- [ ] Hover shows task preview
- [ ] Preview shows title, progress, dates
- [ ] Click navigates to task board
- [ ] Can scroll horizontally

### Navigation

- [ ] Can navigate to previous month
- [ ] Can navigate to next month

## Attention List Tests

### Overdue Items

- [ ] Shows overdue tasks
- [ ] Red highlight styling
- [ ] Shows days overdue
- [ ] Hover reveals actions

### Needs Approval Items

- [ ] Shows review tasks
- [ ] Amber highlight styling
- [ ] Shows waiting days
- [ ] Hover reveals actions

### Actions

- [ ] Reschedule opens modal
- [ ] Mark Done changes status
- [ ] Approve changes status
- [ ] Revise opens feedback

### Empty State

- [ ] Shows message when no attention items
- [ ] Positive message (all caught up)

## Task Status Chart Tests

### Chart Display

- [ ] Donut chart renders
- [ ] Segments colored correctly
- [ ] Total shown in center
- [ ] Legend displayed

### Data Accuracy

- [ ] Percentages are correct
- [ ] Counts match data
- [ ] Updates with filter

## Workload Chart Tests

### Chart Display

- [ ] Bar chart renders
- [ ] Bars show task count
- [ ] Overdue portion in red
- [ ] PIC names shown

### Data Accuracy

- [ ] Bar heights correct
- [ ] Overdue counts accurate
- [ ] Updates with filter

## Launch Countdown Tests

### With Upcoming Launch

- [ ] Shows countdown number
- [ ] Shows launch title
- [ ] Shows brand name
- [ ] Shows date

### No Upcoming Launch

- [ ] Shows empty state
- [ ] No upcoming launches message

### Countdown Accuracy

- [ ] Days calculation correct
- [ ] Updates daily

## Quick Stats Tests

- [ ] Total tasks count correct
- [ ] Overdue count correct
- [ ] Awaiting approval count correct
- [ ] Updates with filter

## Responsive Tests

- [ ] Desktop shows full grid
- [ ] Tablet adjusts columns
- [ ] Mobile stacks vertically
- [ ] Charts resize properly

## Accessibility Tests

- [ ] Charts have text alternatives
- [ ] Keyboard navigation works
- [ ] Color coding has patterns/labels
- [ ] Screen reader announces widgets
