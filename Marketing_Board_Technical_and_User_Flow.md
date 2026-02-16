# Marketing Board - Activity & Subtask Flow Documentation

Dokumen ini berisi alur kerja sistem berdasarkan `marketing fix.md`, dibagi menjadi dua perspektif:
1.  **Technical Flow:** Logic sistem, validasi anti-bentrok, dan integrasi WhatsApp.
2.  **Team Presentation Flow:** User journey untuk presentasi ke tim (Leader & PIC).

---

## 1. Technical Implementation Flow (For Developers)
*Focus: Data logic, system states, "Anti-Block" checks, WhatsApp Triggers.*

```mermaid
flowchart TD
    %% Palette Definition
    classDef authNode fill:#6A1B9A,stroke:#4A148C,stroke-width:2px,color:#fff;
    classDef picNode fill:#0277BD,stroke:#01579b,stroke-width:2px,color:#fff;
    classDef leaderNode fill:#EF6C00,stroke:#E65100,stroke-width:2px,color:#fff;
    classDef sysNode fill:#2E7D32,stroke:#1B5E20,stroke-width:2px,color:#fff,stroke-dasharray: 5 5;
    classDef critNode fill:#D32F2F,stroke:#B71C1C,stroke-width:3px,color:#fff;

    %% Entry Point
    Start((Start)) --> Auth[User Authentication: Login]
    Auth --> RoleCheck{Identify Role}

    %% LEADER PATH: ACTIVITY PLANNING
    subgraph Leader_Workflow [Leader Level - Activity Planning]
        RoleCheck -- Leader --> Leader_Dash[Leader Dashboard: Overview]
        Leader_Dash --> CreateAct[Action: Create Activity]
        CreateAct --> ActInput[Input: Name, Type, Timeline, PIC, Budget]
        
        ActInput --> SaveAct[Save Activity]
        SaveAct --> CheckBudget{Budget Exists?}
        CheckBudget -- Yes --> WA_Finance[Trigger WA: Notify Finance Group]
        CheckBudget -- No --> ActCreated[Activity Created]
        WA_Finance --> ActCreated
    end

    %% PIC PATH: SUBTASK EXECUTION & CALENDAR
    subgraph PIC_Workflow [PIC Level - Subtask Execution]
        RoleCheck -- PIC --> PIC_Dash[PIC Dashboard: My Tasks]
        
        %% Subtask Creation & Anti-Block Logic
        PIC_Dash --> CreateSub[Action: Create Subtask]
        CreateSub --> SubInput[Input: Name, Desc, Dates, Parent Activity]
        SubInput --> ConflictCheck{System: Check Person Availability}
        
        ConflictCheck -- Conflict Found --> Warn[Display 'Anti-Block' Alert: ⚠️ Busy]
        Warn --> UserDecision{User Decision}
        UserDecision -- Proceed Anyway --> SaveSub[Save Subtask]
        UserDecision -- Reschedule --> SubInput
        ConflictCheck -- Clear --> SaveSub
        
        %% Sync & Execution
        SaveSub --> SyncCal[System: Sync to Master Calendar]
        
        %% Status Lifecycle
        SyncCal --> Status_ToDo[Status: TO DO]
        Status_ToDo --> Action_Start[PIC Updates: IN PROGRESS]
        Action_Start --> WorkLoop[Daily Work & Updates]
        WorkLoop --> Action_Submit[PIC Updates: REVIEW]
    end

    %% REVIEW & AUTOMATION LOOP
    subgraph System_Core [System Automation & Review]
        Action_Submit --> WA_Review[Trigger WA: 'Need Review' to Marketing Group]
        WA_Review --> LeaderReview[Leader: Inspect Subtask]
        
        LeaderReview --> Decision{Approved?}
        
        Decision -- No: Revision --> ReviseStatus[Status: REVISI]
        ReviseStatus --> WA_Rev[Trigger WA: Feedback for PIC]
        WA_Rev --> WorkLoop
        
        Decision -- Yes --> AppStatus[Status: DONE]
        AppStatus --> LockTask[System: Lock Subtask Editing]
        LockTask --> UpdateProg[System: Global Activity Progress Up]
        
        %% Cron Jobs / Background Services
        Cron[Daily Cron Service] --> CheckDates{Check Dates}
        CheckDates -- H-3 Activity --> WA_Act[Trigger WA: Activity Reminder]
        CheckDates -- H-1 Deadline --> WA_Sub[Trigger WA: Subtask Reminder]
        CheckDates -- Overdue --> WA_Late[Trigger WA: Overdue Alert]
    end

    %% Links between subgraphs
    ActCreated --> CreateSub

    %% Styling
    class Start,Auth,RoleCheck authNode;
    class PIC_Dash,CreateSub,SubInput,Status_ToDo,Action_Start,WorkLoop,Action_Submit,UserDecision picNode;
    class Leader_Dash,CreateAct,ActInput,LeaderReview,Decision,ReviseStatus leaderNode;
    class CheckBudget,SaveAct,WA_Finance,ActCreated,ConflictCheck,SaveSub,SyncCal,WA_Review,AppStatus,LockTask,UpdateProg,Cron,CheckDates,WA_Act,WA_Sub,WA_Late,WA_Rev sysNode;
    class Warn critNode;
```

---

## 2. Team Presentation Flow (User Journey)
*Focus: Detailed User Journey displaying the collaboration between Leader and PIC.*

```mermaid
flowchart TD
    %% Visual Palette for Presentation
    classDef userAction fill:#E3F2FD,stroke:#1565C0,color:#000,rx:5,ry:5;
    classDef systemResp fill:#E8F5E9,stroke:#2E7D32,color:#000,rx:5,ry:5;
    classDef decisionPoint fill:#FFF3E0,stroke:#EF6C00,color:#000;
    classDef waNotif fill:#25D366,stroke:#075E54,color:#fff,stroke-width:2px;
    classDef navNode fill:#424242,stroke:#000,color:#fff,rx:0,ry:0;

    %% Header
    subgraph Phase_1 [Phase 1: Planning Leader]
        direction TB
        L1(Leader Opens App) --> LN1[Nav: Calendar Menu]:::navNode
        LN1 --> L2(Click Date & Create 'Activity')
        L2 --> L3{Budget Needed?}
        L3 -- Yes --> S1[System: Notifies Finance Group via WA]
        L3 -- No --> L4(Activity Saved on Calendar)
    end

    subgraph Phase_2 [Phase 2: Execution PIC]
        direction TB
        P1(PIC Checks Calendar Assignment) --> PN1[Nav: Task Board Menu]:::navNode
        PN1 --> P2(Find Activity Group & Add 'Subtasks')
        P2 --> P3(Sets Dates & Deadlines)
        P3 --> S2{System: Conflict Check}
        S2 -- ⚠️ Clash --> P4(PIC sees Warning but decides to Proceed)
        S2 -- ✅ Clear --> P5(Subtask Created)
        P4 --> P5
        
        P5 --> S3[System: Syncs to Master Calendar]
        S3 --> P6(PIC Works: Updates Status to 'In Progress')
    end

    subgraph Phase_3 [Phase 3: Review & Completion]
        direction TB
        P7(PIC finishes work) --> P8(Changes Status to 'Review')
        P8 --> W1>📲 WA Notification: Task Needs Review]:::waNotif
        
        W1 --> L5(Leader Checks Details)
        L5 --> L6{Is Result OK?}
        
        L6 -- "No (Revisi)" --> P9(Status: Revisi + Feedback)
        P9 --> P6
        
        L6 -- "Yes (Approve)" --> S4(Status: DONE)
        S4 --> S5[System: Locks Task & Updates Progress]
    end

    %% Connections
    L4 --> P1
    P6 --> P7
    S1 --> L4

    %% Styling
    class L1,L2,L4,L5,P1,P2,P3,P4,P5,P6,P7,P8,P9 userAction;
    class S1,S3,S4,S5,S2 systemResp;
    class L3,L6 decisionPoint;
```
