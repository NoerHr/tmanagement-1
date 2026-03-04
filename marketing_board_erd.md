erDiagram

    USER {
        INT userId PK
        VARCHAR(100) name
        VARCHAR(100) email UNIQUE
        ENUM role "Leader, PIC"
        BOOLEAN isSuperAdmin
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
        INT createdBy FK
        DECIMAL(15,2) budgetEstimation
        ENUM status "Active, Completed, Cancelled"
        DATETIME archivedAt NULLABLE
        DATETIME createdAt
        DATETIME updatedAt
    }

    ACTIVITY_MEMBER {
        INT activityMemberId PK
        INT activityId FK
        INT userId FK
        ENUM role "Leader, PIC"
        INT addedBy FK
        DATETIME addedAt
    }

    ACTIVITY_APPROVER {
        INT activityApproverId PK
        INT activityId FK
        INT userId FK
    }

    TASK {
        INT taskId PK
        INT activityId FK
        INT createdBy FK
        VARCHAR(150) title
        TEXT description
        ENUM status "To Do, In Progress, Need Review, Revision, Approved"
        ENUM approvalStatus "Pending, Approved, Revision"
        DATE startDate
        DATE endDate
        DATETIME archivedAt NULLABLE
        DATETIME createdAt
        DATETIME updatedAt
    }

    TASK_PIC {
        INT taskPicId PK
        INT taskId FK
        INT userId FK
    }

    TASK_ASSIGNMENT_LOG {
        INT assignmentLogId PK
        INT taskId FK
        INT changedBy FK
        ENUM action "Add, Remove, Replace"
        INT affectedUserId
        DATETIME changedAt
    }

    APPROVAL_LOG {
        INT approvalLogId PK
        INT taskId FK
        INT reviewedBy FK
        ENUM action "Approved, Revision"
        TEXT note
        DATETIME actionAt
    }

    MESSAGE_TEMPLATE {
        INT messageTemplateId PK
        VARCHAR(100) name
        TEXT body
        DATETIME createdAt
    }

    REMINDER {
        INT reminderId PK
        INT activityId FK NULLABLE
        INT taskId FK NULLABLE
        INT messageTemplateId FK
        INT whatsappGroupId FK
        INT offsetDays
        BOOLEAN isActive
        DATETIME createdAt
    }

    WHATSAPP_ACCOUNT {
        INT whatsappAccountId PK
        VARCHAR(255) encryptedApiKey
        VARCHAR(255) encryptedNumberKey
        BOOLEAN isActive
        DATETIME createdAt
    }

    WHATSAPP_GROUP {
        INT whatsappGroupId PK
        INT whatsappAccountId FK
        VARCHAR(100) groupName
        VARCHAR(255) encryptedGroupId
        BOOLEAN isActive
    }

    WHATSAPP_LOG {
        INT whatsappLogId PK
        INT activityId FK NULLABLE
        INT taskId FK NULLABLE
        INT messageTemplateId FK
        INT whatsappGroupId FK
        ENUM status "Pending, Sent, Failed"
        INT retryCount
        DATETIME scheduledAt
        DATETIME lastTriedAt
        DATETIME sentAt
        TEXT apiResponse
    }

    NOTIFICATION {
        INT notificationId PK
        INT userId FK
        INT activityId FK NULLABLE
        INT taskId FK NULLABLE
        VARCHAR(100) type
        BOOLEAN isRead
        DATETIME createdAt
    }
