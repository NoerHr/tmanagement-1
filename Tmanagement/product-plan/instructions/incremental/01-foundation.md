# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

**Colors (Tailwind CSS):**

TeamPulse uses three color scales from Tailwind:

| Role | Color | Usage |
|------|-------|-------|
| Primary | `indigo` | Actions, active states, links |
| Secondary | `amber` | Warnings, attention items |
| Neutral | `slate` | Text, backgrounds, borders |

Key color applications:
- Primary button: `bg-indigo-600 hover:bg-indigo-700`
- Active nav: `bg-indigo-600 text-white`
- Hover state: `bg-indigo-50 dark:bg-indigo-900/30`
- Text: `text-slate-900 dark:text-slate-100`
- Muted text: `text-slate-500 dark:text-slate-400`
- Borders: `border-slate-200 dark:border-slate-700`
- Background: `bg-slate-50 dark:bg-slate-950`

**Typography (Google Fonts):**

Add to your HTML head or use a font loader:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Apply globally:
```css
body {
  font-family: 'DM Sans', sans-serif;
}

code, pre, .font-mono {
  font-family: 'JetBrains Mono', monospace;
}
```

See `product-plan/design-system/` for full token definitions.

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

**Entity Overview:**

| Entity | Description |
|--------|-------------|
| User | Marketing team member (PIC or Superior) |
| Task | Parent task with status workflow |
| SubTask | Checklist item within a task |
| Event | Calendar schedule item |
| Brand | Product brand (Shi, ZS, etc.) |
| Category | Activity type (Photo Shoot, etc.) |
| Notification | Alert or reminder |

**Database Schema Reference:**

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('PIC', 'Superior')),
  whatsapp_number VARCHAR(50),
  avatar_url TEXT,
  google_calendar_connected BOOLEAN DEFAULT FALSE,
  google_calendar_email VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Brands
CREATE TABLE brands (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  color VARCHAR(50) NOT NULL
);

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  color VARCHAR(50) NOT NULL
);

-- Tasks
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'to-do'
    CHECK (status IN ('to-do', 'in-progress', 'done', 'review', 'approved')),
  pic_id UUID REFERENCES users(id),
  brand_id UUID REFERENCES brands(id),
  category_id UUID REFERENCES categories(id),
  start_date DATE,
  deadline DATE NOT NULL,
  cross_dept_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- SubTasks
CREATE TABLE sub_tasks (
  id UUID PRIMARY KEY,
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  pic_id UUID REFERENCES users(id),
  due_date DATE
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL
    CHECK (type IN ('photo_shoot', 'video_shoot', 'launch', 'editorial', 'event')),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location VARCHAR(255),
  brand_id UUID REFERENCES brands(id),
  pic_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL
    CHECK (type IN ('deadline', 'assignment', 'status-change', 'approval', 'sync', 'error')),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  is_dismissed BOOLEAN DEFAULT FALSE,
  task_id UUID REFERENCES tasks(id),
  event_id UUID REFERENCES events(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Task Templates
CREATE TABLE task_templates (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES categories(id),
  sub_tasks JSONB NOT NULL
);
```

**Seed Data:**

Create initial brands:
- Shi by Shireen (rose)
- ZS (sky)
- ZS Active (emerald)
- ZS Signature (violet)

Create initial categories:
- Photo Shoot (orange)
- Video Shoot (pink)
- Event (teal)
- Campaign (indigo)
- Editorial (lime)
- Other (stone)

See `product-plan/data-model/` for TypeScript interfaces and sample data.

### 3. Routing Structure

Create placeholder routes for each section:

| Route | Section |
|-------|---------|
| `/` or `/dashboard` | Dashboard |
| `/calendar` | Calendar |
| `/tasks` | Task Board |
| `/notifications` | Notifications |
| `/settings` | Settings & Administration |

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper
- `MainNav.tsx` — Navigation component
- `UserMenu.tsx` — User menu with avatar

**Layout Structure:**

```
+------------------+----------------------------------------+
|     SIDEBAR      |              HEADER                    |
|                  +----------------------------------------+
|    Navigation    |                                        |
|                  |                                        |
|  - Dashboard     |              CONTENT                   |
|  - Calendar      |                                        |
|  - Task Board    |                                        |
|  - Notifications |                                        |
|                  |                                        |
|  -----------     |                                        |
|  - Settings      |                                        |
+------------------+----------------------------------------+
```

**Wire Up Navigation:**

Connect navigation to your routing:
- Dashboard → `/dashboard`
- Calendar → `/calendar`
- Task Board → `/tasks`
- Notifications → `/notifications`
- Settings → `/settings`

**User Menu:**

The user menu expects:
- User name
- Role ('PIC' or 'Superior')
- Avatar URL (optional)
- Logout callback

**Responsive Behavior:**
- Desktop (1024px+): Full sidebar visible
- Tablet (768px-1023px): Collapsible sidebar
- Mobile (<768px): Hamburger menu, sidebar as overlay

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components
- `product-plan/shell/screenshot.png` — Shell visual reference (if available)

## Done When

- [ ] Design tokens are configured (colors, fonts)
- [ ] Database schema/migrations created
- [ ] Data model types are defined
- [ ] Seed data populates brands and categories
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Shell renders with navigation
- [ ] Navigation links to correct routes
- [ ] User menu shows user info
- [ ] Logout works
- [ ] Dark mode toggle works
- [ ] Responsive on mobile (hamburger menu, overlay sidebar)
