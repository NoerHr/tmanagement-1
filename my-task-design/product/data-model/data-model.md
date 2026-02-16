# Data Model

## Entities

### User
A marketing team member who uses the system. Has a role of either PIC (can create and edit tasks) or Superior (can view, monitor, and approve). Each user has contact information for WhatsApp notifications and Google Calendar sync.

### Task
A parent task representing major work items like "Ramadan Collection Photo Shoot" or "Lebaran Campaign". Has a title, description, deadline, and status workflow (To Do → In Progress → Done → Review → Approved). Progress is automatically calculated from completed sub-tasks.

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

- User has many Tasks (as PIC)
- User has many Notifications (as recipient)
- Task belongs to User (PIC), Brand, and Category
- Task has many SubTasks
- SubTask belongs to Task
- SubTask optionally belongs to User (different PIC from parent)
- Event belongs to User (creator) and Brand
- Notification belongs to User (recipient)
- Notification optionally references Task or Event (trigger)
