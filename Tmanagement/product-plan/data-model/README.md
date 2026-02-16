# TeamPulse Data Model

## Entities

### User
A marketing team member who uses the system. Has a role of either PIC (can create and edit tasks) or Superior (can view, monitor, and approve). Each user has contact information for WhatsApp notifications and Google Calendar sync.

### Task
A parent task representing major work items like "Ramadan Collection Photo Shoot" or "Lebaran Campaign". Has a title, description, deadline, and status workflow (To Do > In Progress > Done > Review > Approved). Progress is automatically calculated from completed sub-tasks.

### SubTask
A checklist item within a parent task. Examples: photo concept, mood board, find location, find model, budget proposal (RAB), etc. Can have its own PIC and due date different from the parent task.

### Event
A schedule item that appears on the shared calendar. Can be a photo shoot, video shoot, product launch, editorial plan, or other event. Has date, time, location, and type for different visual styling on the calendar.

### Brand
A brand managed by the marketing team: Shi by Shireen, ZS, ZS Active, and ZS Signature. Tasks and events can be filtered by brand.

### Category
A type of marketing activity: Photo Shoot, Video Shoot, Event, Campaign, Editorial, and Other. Used to categorize tasks and enable filtering.

### Notification
A record of reminders and alerts sent to users. Includes deadline reminders (D-1), event reminders (D-3), task assignment notifications, schedule changes, and approval requests. Sent via WhatsApp and/or synced to Google Calendar.

## Relationships

```
User (1) ----< (many) Task (as PIC)
User (1) ----< (many) Notification (as recipient)
Task (many) >---- (1) User (PIC)
Task (many) >---- (1) Brand
Task (many) >---- (1) Category
Task (1) ----< (many) SubTask
SubTask (many) >---- (0..1) User (optional different PIC)
Event (many) >---- (1) User (creator)
Event (many) >---- (1) Brand
Notification (many) >---- (1) User (recipient)
Notification (many) >---- (0..1) Task (trigger)
Notification (many) >---- (0..1) Event (trigger)
```

## Entity Relationship Diagram

```
+------------------+
|      User        |
+------------------+
| id               |
| name             |
| email            |
| role             |
| whatsappNumber   |
| avatarUrl        |
| gcalConnected    |
| status           |
+------------------+
        |
        | 1:many
        v
+------------------+     +------------------+
|      Task        |---->|      Brand       |
+------------------+     +------------------+
| id               |     | id               |
| title            |     | name             |
| description      |     | color            |
| status           |     +------------------+
| picId      ------+
| brandId    ------+     +------------------+
| categoryId ------+---->|    Category      |
| deadline         |     +------------------+
| progress         |     | id               |
+------------------+     | name             |
        |                | color            |
        | 1:many         +------------------+
        v
+------------------+
|    SubTask       |
+------------------+
| id               |
| taskId           |
| title            |
| completed        |
| picId (optional) |
| dueDate          |
+------------------+

+------------------+     +------------------+
|     Event        |---->|      Brand       |
+------------------+     +------------------+
| id               |
| title            |
| type             |
| date             |
| startTime        |
| endTime          |
| location         |
| picId            |
| brandId          |
+------------------+

+------------------+
|  Notification    |
+------------------+
| id               |
| userId           |
| type             |
| title            |
| description      |
| isRead           |
| isDismissed      |
| taskId           |
| eventId          |
| createdAt        |
+------------------+
```

## Status Workflow

Tasks follow this status progression:

```
To Do  -->  In Progress  -->  Done  -->  Review  -->  Approved
                                            |
                                            v
                                       (Revision)
                                            |
                                            v
                                       In Progress
```

- **To Do**: Task created, not yet started
- **In Progress**: PIC is actively working on task
- **Done**: PIC has completed all work
- **Review**: Waiting for Superior approval
- **Approved**: Superior has approved the work

## Progress Calculation

Task progress is calculated from sub-tasks:

```
progress = (completedSubTasks / totalSubTasks) * 100
```

If a task has no sub-tasks, progress is 0.
