# Milestone 6: Settings & Administration

This milestone implements user profile management and admin configuration.

## What's Provided

- `sections/settings-and-administration/README.md` - Feature specification
- `sections/settings-and-administration/tests.md` - TDD test scenarios
- `sections/settings-and-administration/types.ts` - TypeScript interfaces
- `sections/settings-and-administration/sample-data.json` - Sample settings data
- `sections/settings-and-administration/components/` - Reference UI components

## What You Build

- Profile management API
- User CRUD (admin only)
- Brand/category management (admin only)
- Role-based access control

---

## Overview

Settings & Administration provides profile management for all users and system configuration for Superiors.

## Features

1. **Profile Tab**: Personal info and preferences (all users)
2. **Users Tab**: Team member management (Superior only)
3. **Brands Tab**: Brand configuration (Superior only)
4. **Categories Tab**: Category configuration (Superior only)

---

## Role-Based Access

| Tab | PIC | Superior |
|-----|-----|----------|
| Profile | Yes | Yes |
| Users | No | Yes |
| Brands | No | Yes |
| Categories | No | Yes |

---

## User Flows

### Edit Profile
1. Navigate to Settings
2. Update name, email
3. Upload profile photo
4. Enter WhatsApp number (required)
5. Connect/disconnect Google Calendar
6. Configure notification preferences
7. Save changes

### Manage Users (Superior)
1. Switch to Users tab
2. View list of team members
3. Create new user with details
4. Edit existing user
5. Deactivate or delete user

### Manage Brands (Superior)
1. Switch to Brands tab
2. View brand cards
3. Add new brand with color
4. Edit brand name/color
5. Delete unused brand

### Manage Categories (Superior)
1. Switch to Categories tab
2. View category cards
3. Add new category with color
4. Edit category name/color
5. Delete unused category

---

## UI Components

### Tab Navigation (Horizontal)
```
+--------------------------------------------------+
| [Profile] [Users (Admin)] [Brands (Admin)] [Categories (Admin)]
+--------------------------------------------------+
```
PICs only see Profile tab.

### Profile Tab
```
+------------------------------------------+
| Profile                                  |
+------------------------------------------+
| [Avatar]  [Upload photo]                 |
|                                          |
| Name: ___________________                |
| Email: _________________ (read-only)     |
| WhatsApp: ______________ *required       |
|                                          |
| -------- Google Calendar --------        |
| [✓] Connected: user@gmail.com            |
| [Disconnect]                             |
|                                          |
| -------- Notifications --------          |
| [✓] Deadline reminders                   |
| [✓] Event reminders                      |
| [✓] Task assignments                     |
| [✓] Status changes                       |
| [✓] Approval requests                    |
|                                          |
| [Save Changes]                           |
+------------------------------------------+
```

### Users Tab
```
+------------------------------------------+
| Users                     [+ Add User]   |
+------------------------------------------+
| [Avatar] Rina Putri       PIC    Active  |
|          rina@company.com         [Edit] |
+------------------------------------------+
| [Avatar] Dimas Pratama    PIC    Active  |
|          dimas@company.com        [Edit] |
+------------------------------------------+
| [Avatar] Siti Rahma       PIC   Inactive |
|          siti@company.com     [Reactivate]
+------------------------------------------+
```

### User Form Modal
```
+------------------------------------------+
| Add User / Edit User                     |
+------------------------------------------+
| Name: ___________________                |
| Email: ___________________               |
| WhatsApp: ___________________            |
| Role: [PIC ▼]                           |
|                                          |
| [Cancel]  [Save]                         |
+------------------------------------------+
```

### Brands/Categories Tab (Card Grid)
```
+------------------------------------------+
| Brands                    [+ Add Brand]  |
+------------------------------------------+
| +----------------+  +----------------+   |
| | [color swatch] |  | [color swatch] |   |
| | Shi by Shireen |  | ZS             |   |
| | 12 tasks       |  | 8 tasks        |   |
| | [Edit] [Delete]|  | [Edit] [Delete]|   |
| +----------------+  +----------------+   |
+------------------------------------------+
```

### Brand/Category Form Modal
```
+------------------------------------------+
| Add Brand                                |
+------------------------------------------+
| Name: ___________________                |
|                                          |
| Color: [Color picker grid]               |
|  [rose] [pink] [orange] [amber]         |
|  [lime] [emerald] [teal] [sky]          |
|  [indigo] [violet] [stone]              |
|                                          |
| [Cancel]  [Save]                         |
+------------------------------------------+
```

### Delete Confirmation Dialog
```
+------------------------------------------+
| Delete Brand                             |
+------------------------------------------+
| Are you sure you want to delete          |
| "Shi by Shireen"?                        |
|                                          |
| This action cannot be undone.            |
| 12 tasks are associated with this brand. |
|                                          |
| [Cancel]  [Delete]                       |
+------------------------------------------+
```

---

## API Endpoints

### Profile

#### GET /api/users/me
Returns: CurrentUser

#### PUT /api/users/me
Body: Partial<CurrentUser>
Returns: CurrentUser

#### POST /api/users/me/avatar
Body: FormData with image file
Returns: { avatarUrl: string }

#### PUT /api/users/me/notifications
Body: NotificationPreferences
Returns: NotificationPreferences

### Users (Admin)

#### GET /api/users
Returns: User[]

#### POST /api/users
Body: Omit<User, 'id' | 'createdAt'>
Returns: User

#### PUT /api/users/:id
Body: Partial<User>
Returns: User

#### PUT /api/users/:id/deactivate
Returns: User

#### PUT /api/users/:id/reactivate
Returns: User

#### DELETE /api/users/:id
Returns: { success: true }

### Brands (Admin)

#### GET /api/brands
Returns: Brand[]

#### POST /api/brands
Body: { name: string, color: string }
Returns: Brand

#### PUT /api/brands/:id
Body: Partial<Brand>
Returns: Brand

#### DELETE /api/brands/:id
Returns: { success: true }
Note: Check for associated tasks first

### Categories (Admin)

#### GET /api/categories
Returns: Category[]

#### POST /api/categories
Body: { name: string, color: string }
Returns: Category

#### PUT /api/categories/:id
Body: Partial<Category>
Returns: Category

#### DELETE /api/categories/:id
Returns: { success: true }
Note: Check for associated tasks first

---

## Validation

### User
- Name: required, max 255 chars
- Email: required, valid email format, unique
- WhatsApp: required, valid phone format
- Role: required, one of PIC/Superior

### Brand/Category
- Name: required, max 255 chars, unique
- Color: required, valid color name

---

## Authorization

Implement middleware to check:
1. User is authenticated
2. For admin tabs: user.role === 'Superior'

```typescript
function requireSuperior(handler) {
  return async (req, res) => {
    const user = await getCurrentUser(req)
    if (!user || user.role !== 'Superior') {
      return res.status(403).json({ error: 'Forbidden' })
    }
    return handler(req, res)
  }
}
```

---

## Available Colors

```typescript
const availableColors = [
  { name: 'rose', value: '#f43f5e' },
  { name: 'pink', value: '#ec4899' },
  { name: 'orange', value: '#f97316' },
  { name: 'amber', value: '#f59e0b' },
  { name: 'lime', value: '#84cc16' },
  { name: 'emerald', value: '#10b981' },
  { name: 'teal', value: '#14b8a6' },
  { name: 'sky', value: '#0ea5e9' },
  { name: 'indigo', value: '#6366f1' },
  { name: 'violet', value: '#8b5cf6' },
  { name: 'stone', value: '#78716c' },
]
```

---

## Test Scenarios

See `tests.md` for complete test coverage including:
- Profile form validation
- Avatar upload
- Google Calendar connection
- Notification preferences
- User CRUD operations
- Role-based tab visibility
- Brand/category management
- Delete confirmation flows
- Error handling
