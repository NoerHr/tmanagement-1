# Test Instructions: Settings & Administration

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

The Settings & Administration section provides profile management for all users and system configuration (users, brands, categories) for Superiors. Tests should verify role-based access, form validation, and CRUD operations.

---

## User Flow Tests

### Flow 1: Edit Profile (All Users)

**Scenario:** User updates their profile information

#### Success Path

**Setup:**
- User is logged in (PIC or Superior)
- User has existing profile data

**Steps:**
1. User navigates to `/settings`
2. User sees Profile tab selected by default
3. User sees form with current profile data (name, email, WhatsApp number)
4. User updates their name to "New Name"
5. User enters WhatsApp number "+6281234567890"
6. User clicks "Save Changes" button

**Expected Results:**
- [ ] Form shows current user data on load
- [ ] Name field is editable
- [ ] Email field is read-only (displayed but not editable)
- [ ] Success toast appears with message "Profile updated"
- [ ] Form shows updated values after save

#### Failure Path: Missing Required Field

**Setup:**
- User leaves WhatsApp number empty

**Steps:**
1. User clears the WhatsApp number field
2. User clicks "Save Changes"

**Expected Results:**
- [ ] Validation error appears: "WhatsApp number is required"
- [ ] Form is not submitted
- [ ] Focus moves to WhatsApp field

#### Failure Path: Invalid WhatsApp Format

**Setup:**
- User enters invalid phone format

**Steps:**
1. User enters "invalid-phone" in WhatsApp field
2. User clicks "Save Changes"

**Expected Results:**
- [ ] Validation error appears: "Enter a valid phone number"
- [ ] Form is not submitted

---

### Flow 2: Connect Google Calendar

**Scenario:** User connects their Google Calendar account

#### Success Path

**Setup:**
- User is logged in
- Google Calendar is not yet connected

**Steps:**
1. User navigates to Settings
2. User sees Google Calendar card showing "Not connected"
3. User clicks "Connect Google Calendar" button
4. OAuth flow completes (simulate/mock)
5. User returns to settings

**Expected Results:**
- [ ] Before: Card shows "Connect your Google Calendar" with connect button
- [ ] After: Card shows connected email address
- [ ] After: Card shows "Connected" status badge
- [ ] After: "Sync Now" and "Disconnect" buttons are visible

#### Disconnect Flow

**Steps:**
1. User clicks "Disconnect" button
2. Confirmation dialog appears
3. User confirms disconnection

**Expected Results:**
- [ ] Google Calendar is disconnected
- [ ] Card returns to "Not connected" state
- [ ] "Connect Google Calendar" button is visible again

---

### Flow 3: Manage Users (Superior Only)

**Scenario:** Superior creates a new team member

#### Success Path

**Setup:**
- User is logged in as Superior
- Users tab is visible

**Steps:**
1. Superior clicks "Users" tab
2. Superior clicks "+ Add User" button
3. Modal appears with empty form
4. Superior fills in: Name "Test User", Email "test@company.com", WhatsApp "+628123", Role "PIC"
5. Superior clicks "Save" button

**Expected Results:**
- [ ] User list shows before creating: existing users
- [ ] Modal opens on "+ Add User" click
- [ ] Form fields are empty initially
- [ ] After save: Success toast "User created"
- [ ] After save: New user appears in list
- [ ] After save: Modal closes

#### Edit User Flow

**Steps:**
1. Superior clicks "Edit" button on a user row
2. Modal opens with user's current data
3. Superior changes role from "PIC" to "Superior"
4. Superior clicks "Save"

**Expected Results:**
- [ ] Modal shows current user data
- [ ] Role badge updates to "Superior" after save
- [ ] Success toast "User updated"

#### Deactivate User Flow

**Steps:**
1. Superior clicks "Deactivate" on an active user
2. Confirmation dialog appears: "Deactivate this user?"
3. Superior confirms

**Expected Results:**
- [ ] User status changes to "Inactive"
- [ ] Status badge shows "Inactive" (gray)
- [ ] "Reactivate" button replaces "Deactivate"

#### Delete User Flow (with confirmation)

**Steps:**
1. Superior clicks "Delete" on a user
2. Confirmation dialog appears with warning
3. Superior confirms deletion

**Expected Results:**
- [ ] Dialog shows: "Are you sure you want to delete [User Name]?"
- [ ] After confirm: User is removed from list
- [ ] Success toast "User deleted"

---

### Flow 4: Manage Brands (Superior Only)

**Scenario:** Superior adds a new brand

#### Success Path

**Setup:**
- User is logged in as Superior
- Brands tab exists

**Steps:**
1. Superior clicks "Brands" tab
2. Superior clicks "+ Add Brand" button
3. Modal opens with brand form
4. Superior enters name "New Brand"
5. Superior selects color "teal" from picker
6. Superior clicks "Save"

**Expected Results:**
- [ ] Brand cards display existing brands
- [ ] Each card shows: color swatch, name, task count
- [ ] After save: New brand card appears
- [ ] New card shows teal color swatch
- [ ] Task count shows "0 tasks"

#### Edit Brand Flow

**Steps:**
1. Superior clicks "Edit" on a brand card
2. Modal shows current brand data
3. Superior changes color to "violet"
4. Superior clicks "Save"

**Expected Results:**
- [ ] Color swatch updates to violet
- [ ] Success toast appears

#### Delete Brand Flow (with associated tasks warning)

**Setup:**
- Brand has associated tasks

**Steps:**
1. Superior clicks "Delete" on a brand
2. Confirmation dialog appears with warning

**Expected Results:**
- [ ] Dialog shows: "12 tasks are associated with this brand"
- [ ] Warning: "This action cannot be undone"
- [ ] Cancel and Delete buttons are visible

---

### Flow 5: Manage Categories (Superior Only)

**Scenario:** Superior manages activity categories

#### Success Path

**Steps:**
1. Superior clicks "Categories" tab
2. Superior sees category cards (Photo Shoot, Video Shoot, etc.)
3. Superior clicks "+ Add Category"
4. Superior enters name "Webinar" and selects color "sky"
5. Superior saves

**Expected Results:**
- [ ] New "Webinar" category card appears
- [ ] Card shows sky color swatch
- [ ] Task count shows "0 tasks"

---

## Role-Based Access Tests

### PIC Tab Visibility

**Scenario:** PIC user can only see Profile tab

**Setup:**
- User is logged in as PIC (role = 'PIC')

**Expected Results:**
- [ ] Profile tab is visible and clickable
- [ ] Users tab is NOT visible
- [ ] Brands tab is NOT visible
- [ ] Categories tab is NOT visible
- [ ] Direct URL to /settings/users redirects to /settings or shows access denied

### Superior Tab Visibility

**Scenario:** Superior user can see all tabs

**Setup:**
- User is logged in as Superior (role = 'Superior')

**Expected Results:**
- [ ] Profile tab is visible
- [ ] Users tab is visible
- [ ] Brands tab is visible
- [ ] Categories tab is visible

---

## Empty State Tests

### Empty Users List

**Scenario:** No team members exist (except current user)

**Setup:**
- Only current Superior user exists in system

**Expected Results:**
- [ ] Users list shows only current user
- [ ] Message: "Add team members to get started"
- [ ] "+ Add User" button is prominent

### Empty Brands List

**Scenario:** No brands exist

**Setup:**
- Brands array is empty

**Expected Results:**
- [ ] Shows empty state: "No brands yet"
- [ ] Shows description: "Add brands to organize your tasks"
- [ ] "+ Add Brand" button is visible

### Empty Categories List

**Scenario:** No categories exist

**Setup:**
- Categories array is empty

**Expected Results:**
- [ ] Shows empty state: "No categories yet"
- [ ] Shows description: "Add categories to classify your tasks"
- [ ] "+ Add Category" button is visible

---

## Component Interaction Tests

### Settings Tab Navigation

**Renders correctly:**
- [ ] Profile tab is selected by default
- [ ] Active tab has visual indicator (underline or background)
- [ ] Tab content changes when clicking different tabs

**User interactions:**
- [ ] Clicking tab switches content
- [ ] URL updates to reflect current tab (if using URL routing)
- [ ] Back button works (browser navigation)

### Profile Form

**Renders correctly:**
- [ ] Shows user avatar (or initials if no avatar)
- [ ] Name field shows current value
- [ ] Email field shows current value (read-only)
- [ ] WhatsApp field shows current value
- [ ] Notification preference toggles show current state

**User interactions:**
- [ ] Avatar upload opens file picker
- [ ] Toggles update notification preferences
- [ ] Form submission triggers onUpdateProfile callback

### User List

**Renders correctly:**
- [ ] Each row shows: avatar, name, email, role badge, status badge
- [ ] Active users have different styling than inactive
- [ ] Action buttons are visible on hover or always visible

### Brand/Category Cards

**Renders correctly:**
- [ ] Color swatch displays correct color
- [ ] Name is visible
- [ ] Task count is displayed

---

## Edge Cases

- [ ] Very long brand/category names are truncated or wrapped appropriately
- [ ] Deleting the last brand shows empty state correctly
- [ ] Creating duplicate brand name shows validation error
- [ ] Creating duplicate category name shows validation error
- [ ] Network error during save shows error message and keeps form data
- [ ] Concurrent edit warning if another user modified the same record

---

## Accessibility Checks

- [ ] All form fields have associated labels
- [ ] Tab navigation works correctly (keyboard)
- [ ] Modal can be closed with Escape key
- [ ] Color picker is accessible (not color-dependent)
- [ ] Role badges have accessible text (not just color)
- [ ] Confirmation dialogs trap focus appropriately

---

## Sample Test Data

```typescript
// Current user (Superior)
const mockCurrentUser = {
  id: "user-004",
  name: "Budi Santoso",
  email: "budi.santoso@company.com",
  role: "Superior",
  avatarUrl: null,
  avatarInitials: "BS",
  whatsappNumber: "+62845678901",
  googleCalendarConnected: true,
  googleCalendarEmail: "budi.santoso@gmail.com",
  notificationPreferences: {
    deadlineReminders: true,
    eventReminders: true,
    taskAssignments: true,
    statusChanges: true,
    approvalRequests: true
  }
};

// Current user (PIC - for role testing)
const mockPICUser = {
  ...mockCurrentUser,
  id: "user-001",
  name: "Rina Putri",
  email: "rina.putri@company.com",
  role: "PIC"
};

// User list
const mockUsers = [
  { id: "user-001", name: "Rina Putri", email: "rina.putri@company.com", role: "PIC", status: "active" },
  { id: "user-002", name: "Dimas Pratama", email: "dimas.pratama@company.com", role: "PIC", status: "active" },
  { id: "user-005", name: "Siti Rahma", email: "siti.rahma@company.com", role: "PIC", status: "inactive" }
];

// Brands
const mockBrands = [
  { id: "brand-001", name: "Shi by Shireen", color: "#f43f5e", colorName: "rose", taskCount: 12 },
  { id: "brand-002", name: "ZS", color: "#0ea5e9", colorName: "sky", taskCount: 8 }
];

// Categories
const mockCategories = [
  { id: "cat-001", name: "Photo Shoot", color: "#f97316", colorName: "orange", taskCount: 9 },
  { id: "cat-002", name: "Video Shoot", color: "#ec4899", colorName: "pink", taskCount: 5 }
];

// Empty states
const mockEmptyUsers = [];
const mockEmptyBrands = [];
const mockEmptyCategories = [];
```

---

## Notes for Test Implementation

- Test role-based access thoroughly — PICs should never see admin tabs
- Mock OAuth flow for Google Calendar connection tests
- Test form validation on blur and on submit
- Verify confirmation dialogs appear for all destructive actions
- Test that "Save Changes" is disabled when form is unchanged
- Verify avatar upload accepts only image files
