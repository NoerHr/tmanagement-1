# Marketing Board - User Flow (Flowchart Style)

This document visualizes the user journey for Manager and Member roles in a flowchart format.

```text
[ START ]
    │
    ▼
1. LOGIN PAGE 🔐
    │
    ├─ User enters Email & Password
    ├─ System Validates Credentials
    │
    ▼
2. DASHBOARD 📊
    │
    │  (Role: Manager 🛡️ & Member 👤)
    │
    ├── [Manager Action] ──────────────────────────────┐
    │  Clicks "Create Project"                         │
    │                                                  │
    ▼                                                  │
3. CREATE PROJECT 📝                                   │
    │                                                  │
    ├─ Input: Project Name, Desc, Dates                │
    ├─ Action: Assign Members                          │
    ├─ Click Save                                      │
    │                                                  │
    ▼                                                  │
4. PROJECT DETAIL 📁                                   │
    │                                                  │
    ├─ View: Project Info & Member List                │
    │                                                  │
    ▼                                                  │
   [Manager Action]                                    │
   Clicks "Add Task"                                   │
    │                                                  │
    ▼                                                  │
5. CREATE TASK ✅                                      │
    │                                                  │
    ├─ Input: Title, Priority, Due Date                │
    ├─ Action: Assign to "Member A"                    │
    ├─ Click Save                                      │
    │                                                  │
    │                                                  ▼
    └──────────────────────────────────────────> [ System Updates DB ]
                                                       │
                                                       ▼
                                                (Member A Logs in)
                                                       │
                                                       ▼
                                            6. TASK DETAIL 📋
                                                       │
                                                       ├─ View: Assigned Task Info
                                                       │
                                                       ▼
                                                  [Member Action]
                                                Clicks "Add Subtask"
                                                       │
                                                       ▼
                                            7. CREATE SUBTASK 🔨
                                                       │
                                                       ├─ Input: "Draft Content"
                                                       ├─ Click Save
                                                       │
                                                       ▼
                                                  [Member Action]
                                               Mark Subtask as DONE
                                                       │
                                                       ▼
                                             (System Auto-Updates %)
                                                       │
                                                       ▼
                                            8. UPDATE TASK STATUS 🔄
                                                       │
                                                       ├─ Status: To Do -> In Progress
                                                       ├─ Status: In Progress -> Done
                                                       │
                                                       ▼
                                           (Project Progress Increases)
                                                       │
                                                       ▼
                                            9. ADD COMMENT 💬
                                                       │
                                                       ├─ Manager: "Please align assets"
                                                       ├─ Member: "Done uploaded"
                                                       │
                                                       ▼
                                           10. EDIT PROJECT ✏️
                                                       │
                                                       ├─ Manager notices details need update
                                                       ├─ Click "Edit Project"
                                                       ├─ Update & Save
                                                       │
                                                       ▼
                                                    [ END ]
```

## Mermaid Diagram Representation

```mermaid
flowchart TD

    %% START
    A((Start))
    B[User Login]
    C{Identify Role}

    A --> B --> C

    %% ROLE SPLIT
    C -->|Manager| M1[Open Dashboard]
    C -->|Member| T1[Open Dashboard]

    %% ======================
    %% MANAGER FLOW
    %% ======================

    M1 --> M2[Create Project]
    M2 --> M3[Input: Name, Desc, Dates]
    M3 --> M4[Assign Members]
    M4 --> M5[Save Project]

    M5 --> SYS1[System: Save Project to DB]
    SYS1 --> M6[Project Detail Page]

    M6 --> M7[Create Task]
    M7 --> M8[Input: Title, Priority, Due Date]
    M8 --> M9[Assign to Member]
    M9 --> M10[Save Task]

    M10 --> SYS2[System: Notify Member]
    SYS2 --> T2

    %% ======================
    %% TEAM MEMBER FLOW
    %% ======================

    T1 --> T2[View Assigned Task]
    T2 --> T3[Task Detail Page]
    
    T3 --> T4[Create Subtask]
    T4 --> T5[Mark Subtask as DONE]
    
    T5 --> SYS3[System: Auto Calculate Task Progress %]
    SYS3 --> T6

    T3 --> T6{Task Finished?}
    T6 -->|No| T3
    T6 -->|Yes| T7[Update Status: In Progress → Done]

    %% ======================
    %% SYSTEM AUTOMATION
    %% ======================

    T7 --> SYS4[System: Update Project Overall Progress]
    SYS4 --> M6

    %% ======================
    %% COLLABORATION
    %% ======================

    T3 --> COM1[Add Comment]
    M6 --> COM1
    COM1 --> SYS5[System: Post Comment]

    %% ======================
    %% EDIT / MAINTENANCE
    %% ======================

    M6 --> M11[Edit Project]
    M11 --> M12[Update Information]
    M12 --> M13[Save Changes]

    %% END
    M13 --> E((End))
    SYS5 --> E
```
