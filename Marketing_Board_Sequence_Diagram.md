# Marketing Board - Detailed Sequence Diagrams

Dokumen ini memecah alur sistem menjadi 4 diagram sekuensial yang saling berkesinambungan. Setiap diagram merepresentasikan satu **Unit Fitur Utama** dari lifecycle pekerjaan tim marketing.

---

## 🔗 Overview Kesinambungan
1.  **Activity Planning:** Leader membuat "Wadah" (Activity) → Output: `ActivityID`.
2.  **Subtask Planning:** PIC mengisi wadah tersebut dengan "Isi" (Subtask) → Memerlukan `ActivityID`.
3.  **Execution & Monitoring:** PIC mengerjakan task + Sistem mengirim Reminder.
4.  **Review Loop:** Validasi hasil kerja sebelum ditutup.

---

## 1. Feature: Activity Planning (Leader Context)
*Goal: Leader menetapkan timeline besar dan konteks pekerjaan. Jika menggunakan budget, Finance langsung diberitahu.*

```mermaid
sequenceDiagram
    autonumber
    
    actor Leader
    participant FE as Frontend (Nav: Calendar)
    participant BE as Backend API
    participant DB as Database
    participant WA as WA Service (Group Finance)

    Note over Leader, WA: **Pre-condition:** Leader logged in & opens Calendar

    Leader->>FE: Click Date Range (Start-End)
    FE->>Leader: Show "Create Activity" Drawer
    
    Leader->>FE: Input: Name, Type, PIC Utama, **Budget Est.**
    Leader->>FE: Click "Save Activity"
    
    FE->>BE: POST /activity/create (payload)
    activate BE
    
    BE->>DB: Insert Activity Data
    DB-->>BE: Success (Return New ActivityID)

    %% Feature: Finance Alert
    alt Has Budget Value > 0?
        BE->>WA: Send Msg to "Marketing-Finance Group"
        Note right of WA: "New Activity: [Name]\nEst: Rp[XXX]\nDate: [Date]"
        WA-->>BE: Message Queued
    end

    BE-->>FE: Return Activity Object
    deactivate BE

    FE-->>Leader: Show Success Toast
    FE->>FE: Refresh Calendar Grid (Show new color bar)

    Note over Leader, WA: **Output:** Activity Context Created for PIC
```

---

## 2. Feature: Subtask Planning & Anti-Block System (PIC Context)
*Goal: PIC memecah Activity menjadi tugas harian. Sistem mencegah bentrok jadwal dengan "Anti-Block Alert".*

```mermaid
sequenceDiagram
    autonumber
    
    actor PIC
    participant FE as Frontend (Nav: Task Board)
    participant BE as Backend API
    participant DB as Database
    participant Cal as Master Calendar Engine

    Note over PIC, Cal: **Input:** Menggunakan ActivityID dari Feat #1

    PIC->>FE: Open Activity Details
    PIC->>FE: Click "Add Subtask"
    PIC->>FE: Input: Name, **Execution Dates**, PIC Assignee
    
    FE->>BE: POST /subtask/validate-availability
    
    %% Feature: Anti-Block Logic
    activate BE
    BE->>Cal: Check Existing Tasks for [Assignee] on [Dates]
    Cal-->>BE: Result: {conflict: true/false, tasks: [...]}
    
    alt Conflict Detected (Busy)
        BE-->>FE: 409 Conflict (Warning Data)
        FE->>PIC: Show Alert: "⚠️ PIC sibuk di tanggal ini!"
        
        alt PIC Decides to Force
            PIC->>FE: Click "Proceed Anyway (Force)"
            FE->>BE: POST /subtask/create (force: true)
        else PIC Reschedules
            PIC->>FE: Change Dates
            FE->>BE: POST /subtask/create (new dates)
        end
    else No Conflict
        BE-->>FE: 200 OK
        FE->>BE: POST /subtask/create
    end
    deactivate BE

    activate BE
    BE->>DB: Save Subtask
    BE->>Cal: Sync to Master Calendar
    BE-->>FE: Subtask Created
    deactivate BE
    
    FE->>PIC: Update Task List
```

---

## 3. Feature: Daily Execution & Automated Reminders
*Goal: Monitoring harian dan reminder otomatis agar tidak ada yang terlewat.*

```mermaid
sequenceDiagram
    autonumber
    
    participant Cron as System CronJob
    participant BE as Backend API
    participant WA as WA Service (Marketing Group)
    actor PIC
    participant FE as Frontend

    %% Sub-feature: Automated Reminders (System-driven)
    Note over Cron, WA: **Background Process (Every Morning 08:00)**
    
    Cron->>BE: Trigger: Check Deadlines
    activate BE
    BE->>BE: Query Subtasks with DueDate = Today OR Tomorrow
    
    loop For Each Upcoming Task
        BE->>WA: Send Reminder to "Marketing Group"
        Note right of WA: "Reminder: [Task Name]\nPIC: [Name]\nDue: [Tomorrow]"
    end
    deactivate BE

    %% Sub-feature: User Execution (User-driven)
    Note over PIC, FE: **User Interaction (Daily Work)**
    
    PIC->>FE: Drag Task to "In Progress"
    FE->>BE: PATCH /subtask/{id}/status {status: 'IN_PROGRESS'}
    BE->>BE: Log Timestamp (Start)
    BE-->>FE: OK

    PIC->>FE: Upload Attachment / Comment
    FE->>BE: POST /subtask/{id}/comment
    BE-->>FE: OK
```

---

## 4. Feature: Review & Approval Loop
*Goal: Quality Control. Task tidak bisa "Done" tanpa persetujuan Leader.*

```mermaid
sequenceDiagram
    autonumber
    
    actor PIC
    actor Leader
    participant FE as Frontend
    participant BE as Backend API
    participant WA as WA Service

    Note over PIC, WA: **Trigger:** PIC telah menyelesaikan pekerjaan

    PIC->>FE: Move Task to "In Review" / Click Submit
    FE->>BE: PATCH /status {status: 'REVIEW'}
    
    activate BE
    BE->>WA: Send Info to "Marketing Group"
    Note right of WA: "Need Review: [Task Name]\nBy: [PIC]"
    BE-->>FE: Status Updated (Locked for PIC)
    deactivate BE

    %% Leader Action
    Note over PIC, WA: **Action:** Leader menerima notifikasi

    Leader->>FE: Click Notification / Open Review Tab
    Leader->>FE: Inspect Attachments & Result
    
    alt Result NOT OK (Revisi)
        Leader->>FE: Click "Request Revision" + **Feedback Note**
        FE->>BE: POST /review/reject
        BE->>DB: Update Status = 'REVISI'
        BE->>WA: Tag PIC: "Revisi required: [Note]"
        BE-->>FE: Updated
        Note left of PIC: Task Unlocked for PIC to Edit
        
    else Result OK (Approve)
        Leader->>FE: Click "Approve"
        FE->>BE: POST /review/approve
        
        activate BE
        BE->>DB: Update Status = 'DONE'
        BE->>DB: **Lock Subtask** (Read-only)
        BE->>DB: Update Parent Activity Progress %
        BE-->>FE: Success
        deactivate BE
    end
```
