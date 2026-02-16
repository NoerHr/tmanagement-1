erDiagram

    USER {
        INT userId PK
        VARCHAR(100) name
        VARCHAR(100) email "UNIQUE"
        ENUM role "Leader, PIC"
        BOOLEAN isActive
        DATETIME createdAt
    }

    ACTIVITY_TYPE {
        INT activityTypeId PK
        VARCHAR(50) name
        VARCHAR(10) colorCode
    }

    ACTIVITY {
        INT activityId PK
        VARCHAR(150) title
        TEXT description
        INT activityTypeId FK
        DATE startDate
        DATE endDate
        INT createBy FK
        DECIMAL(15,2) budgetEstimation "NULLABLE"
        DATETIME createdAt
    }

    ACTIVITY_PIC {
        INT activityPicId PK
        INT activityId FK
        INT userId FK
    }

    SUBTASK {
        INT subtaskId PK
        VARCHAR(150) title
        TEXT description
        INT activityId FK
        INT picId FK
        DATE startDate
        DATE endDate
        INT createBy FK
        ENUM status "To Do, In Progress, Need Review, Revision, Approved"
        DATETIME createdAt
    }

    APPROVAL_LOG {
        INT approvalId PK
        INT subtaskId FK
        INT reviewedBy FK
        ENUM status "Approved, Revision"
        TEXT note
        DATETIME reviewedAt
    }

    CALENDAR_ACTIVITY {
        INT calendarActivityId PK
        ENUM referenceType "Activity, Subtask"
        INT referenceId
        DATE startDate
        DATE endDate
        VARCHAR(10) colorCode
    }

    REMINDER {
        INT reminderId PK
        ENUM referenceType "Activity, Subtask"
        INT referenceId
        ENUM reminderType "H-7, H-3, H-1, Day-H"
        ENUM targetGroup "Marketing Group, Marketing Finance Group"
    }

    %% RELATIONSHIPS
    USER ||--o{ ACTIVITY : creates
    ACTIVITY_TYPE ||--o{ ACTIVITY : categorizes

    ACTIVITY ||--o{ SUBTASK : has
    USER ||--o{ SUBTASK : assigned_as_PIC

    ACTIVITY ||--o{ ACTIVITY_PIC : has
    USER ||--o{ ACTIVITY_PIC : becomes

    SUBTASK ||--o{ APPROVAL_LOG : reviewed_in
    USER ||--o{ APPROVAL_LOG : reviews

    ACTIVITY ||--o{ CALENDAR_ACTIVITY : displayed_as
    SUBTASK ||--o{ CALENDAR_ACTIVITY : displayed_as

    ACTIVITY ||--o{ REMINDER : has
    SUBTASK ||--o{ REMINDER : has
