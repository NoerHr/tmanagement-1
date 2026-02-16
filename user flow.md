# Marketing Board - User Flow Documentation

Dokumen ini berisi dua versi alur kerja sistem:
1. **Technical Flow:** Untuk referensi tim developer/IT (Detail Teknis).
2. **Team Presentation Flow:** Alur detail untuk presentasi user, dengan pewarnaan yang konsisten.

---

## 1. Technical Implementation Flow (For Developers)
*Focus: Data logic, system states, background services, APIs.*

```mermaid
flowchart TD
    %% Eye-Catching Technical Palette
    classDef authNode fill:#6A1B9A,stroke:#4A148C,stroke-width:2px,color:#fff;
    classDef picNode fill:#0277BD,stroke:#01579b,stroke-width:2px,color:#fff;
    classDef supNode fill:#EF6C00,stroke:#E65100,stroke-width:2px,color:#fff;
    classDef sysNode fill:#2E7D32,stroke:#1B5E20,stroke-width:2px,color:#fff,stroke-dasharray: 5 5;
    classDef critNode fill:#D32F2F,stroke:#B71C1C,stroke-width:3px,color:#fff;

    %% Entry Point
    Start((Start)) --> Auth[User Authentication]
    Auth --> RoleCheck{Identify Role}

    %% PIC PATH: CALENDAR & TASK MANAGEMENT
    subgraph PIC_Workflow [PIC Operations - Lifecycle]
        RoleCheck -- PIC --> PIC_Dash[PIC Dashboard: View Tasks & Calendar]
        
        %% Calendar Detailed Flow
        PIC_Dash --> AddSch[Action: Create Schedule/Event]
        AddSch --> SchInput[Input: Title, Brand, Category, Start/End Date, Remarks]
        SchInput --> ConflictCheck{System Check: Conflict?}
        ConflictCheck -- Conflict Detected --> Warn[Display Conflict Warning & Suggest Alternatives]
        Warn --> SchInput
        ConflictCheck -- Clear --> SaveSch[Save Schedule & Sync to Google Calendar]
        
        %% Task Detailed Flow
        PIC_Dash --> CreateTask[Action: Create Parent Task]
        CreateTask --> TaskDetails[Input: Title, Brand, PIC, Category, Deadline, Est. Man-Hours]
        TaskDetails --> SubTaskGroup[Define Sub-tasks/Checklist Items]
        SubTaskGroup --> Status_ToDo[Status set to: TO DO]
        
        %% Execution Loop
        Status_ToDo --> StartWork[Action: Change Status to IN PROGRESS]
        StartWork --> ManHourTrack[System: Start Tracking Duration]
        ManHourTrack --> WorkLoop[Update Sub-task Checklist]
        WorkLoop --> CalcProgress[System: Calculate % Progress based on Checklist]
        CalcProgress --> AllDone{All Sub-tasks Checked?}
        AllDone -- No --> WorkLoop
        AllDone -- Yes --> FinalCheck[PIC: Final Review & Remarks Update]
        FinalCheck --> MoveReview[Change Status to: REVIEW]
    end

    %% SUPERIOR PATH: MONITORING & QUALITY GATE
    subgraph Superior_Workflow [Superior Review - Quality Gate]
        RoleCheck -- Superior --> Sup_Dash[Superior Dashboard: Monitoring & Approval View]
        Sup_Dash --> FilterReview[Filter: Status = REVIEW]
        FilterReview --> InspectTask[Inspect: Checklist, Timeline, Man-hours, Cross-Dept Notes]
        
        InspectTask --> Decision{Decision: Approved?}
        
        Decision -- No: Revision --> AddComment[Input Feedback & Revision Requirements]
        AddComment --> Status_Rev[Status set to: REVISION]
        Status_Rev -- Notify PIC --> StartWork
        
        Decision -- Yes --> Status_App[Status set to: APPROVED]
        Status_App --> LockTask[System: Lock Task for Editing]
    end

    %% SYSTEM AUTOMATION: NOTIFICATIONS & REMINDERS
    subgraph Automation_Logic [System Automation - Background Process]
        SaveSch --> WANotif_New[Trigger WA: 'New Schedule Added']
        MoveReview --> WANotif_Review[Trigger WA to Superior: 'Task Pending Review']
        Status_App --> WANotif_Done[Trigger WA to PIC: 'Task Approved']
        
        %% Cron Jobs
        Cron[Daily Cron Job Check] --> CheckDL{Deadline Check}
        CheckDL -- Deadline -1 Day --> RemindPIC[WA: Urgent Deadline Reminder]
        CheckDL -- Event -3 Days --> RemindTeam[WA: Upcoming Event Coordination]
        CheckDL -- Overdue --> AlertSup[WA: Alert Superior of Overdue Task]
    end

    %% Role Assignments for Visual Clarity
    class Start,Auth,RoleCheck authNode;
    class PIC_Dash,AddSch,SchInput,CreateTask,TaskDetails,SubTaskGroup,StartWork,WorkLoop,FinalCheck,MoveReview,Status_ToDo picNode;
    class Sup_Dash,FilterReview,InspectTask,Decision,AddComment,Status_Rev,Status_App superiorNode;
    class ConflictCheck,SaveSch,CalcProgress,LockTask,WANotif_New,WANotif_Review,WANotif_Done,Cron,CheckDL,RemindPIC,RemindTeam,AlertSup,ManHourTrack sysNode;
    class Warn critNode;
```

---

## 2. Team Presentation Flow (User Journey)
*Focus: Detailed User Journey with Clear Roles & Quality Gates.*

```mermaid
graph TD
    subgraph App_Shell [TeamPulse Application Shell]
        subgraph Header [Header Bar - Global]
            H1[TeamPulse Logo / Wordmark]
            H2[Global Search / Add Task Button]
            H3[User Menu: Avatar + Role Badge]
        end
        
        subgraph Sidebar [Sidebar Navigation - Indigo Theme]
            S1[🏠 Dashboard]
            S2[📅 Calendar]
            S3[📋 Task Board]
            S4[🔔 Notifications]
            S5[--- Spacer ---]
            S6[⚙️ Settings - Bottom Fixed]
        end
        
        subgraph Main_Content [Main Content Area - Dynamic]
            M1[Page Header: Title & Context Actions]
            M2[Content: Stats / Calendar / Board / Gantt]
        end
    end

    %% Responsive Behavior Logic
    App_Shell -.-> |Desktop| Full_View[240px Sidebar + Header]
    App_Shell -.-> |Mobile| Overlay_View[Hamburger Menu + Sidebar Overlay]
```
