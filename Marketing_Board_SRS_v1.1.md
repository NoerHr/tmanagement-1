# Software Requirements Specification
## Marketing Board

**Project Name:** Marketing Board  
**Version:** 1.1  
**Date:** 29 Januari 2026  
**Stakeholder:** Sally Dinihari (Marketing Department)  
**Author:** IT Development Team

---

## 1. Introduction

### 1.1 Purpose
Dokumen ini menjelaskan kebutuhan fungsional untuk sistem Marketing Board, sebuah collaborative project management tool untuk tim Marketing dalam mengelola Activity (Project/Campaign) dan Subtask (Pekerjaan Harian) secara terintegrasi.

### 1.2 Scope
Marketing Board adalah sistem berbasis web (dengan akses mobile-friendly) yang memungkinkan tim Marketing untuk:
- Mengelola Activity sebagai payung besar pekerjaan (Campaign, Event, dll)
- Mengelola Subtask sebagai unit kerja operasional harian
- Mengelola Shared Calendar dengan sistem **Anti-Bentrok (Anti-Blok)**
- Monitoring progres lintas role (Leader & PIC)
- Menerima notifikasi/reminder via **WhatsApp Group** (Marketing & Finance)

### 1.3 Stakeholders

| Stakeholder | Role | Kepentingan |
|-------------|------|-------------|
| Sally Dinihari (Manager) | **Super Admin** / Leader | Full access, Manage Users & Roles, Manage Activity Types |
| Leader (Event & Content) | **Leader** | Create Activity, Monitor Progress, Approval, Budgeting |
| Social Media Specialist | **PIC** | Manage Subtask, Update Progress |
| Graphic Designer | **PIC** | Manage Subtask, Update Progress |
| Digital Ads Specialist | **PIC** | Manage Subtask, Update Progress |
| Camera Person | **PIC** | Manage Subtask, Update Progress |
| Video Editor | **PIC** | Manage Subtask, Update Progress |

**Cross-Department Coordination (No direct system access, via WA Group):**

| Department | Coordination Area |
|------------|-------------------|
| Finance | RAB dan pembayaran vendor (via WA Group Reminder) |
| Fashion Design (FD) | Photo shoot coordination |
| Sales | Jadwal launching |
| Gudang | FOC / peminjaman baju |
| General Affairs (GA) | Transport |

### 1.4 Brands Under Management
Sistem akan digunakan untuk mengelola aktivitas marketing 4 brand (dalam satu board gabungan):
- Shi by Shireen
- ZS
- ZS Active
- ZS Signature

---

## 2. Current State Analysis

### 2.1 Current Process
Saat ini tim Marketing melakukan koordinasi dan monitoring secara manual melalui rapat WIP (Work In Progress) mingguan, dimana masing-masing PIC melaporkan:
- Task yang sudah selesai (done)
- Kendala yang dihadapi
- Task yang sedang berjalan
- Task yang akan dilakukan dalam waktu dekat

### 2.2 Pain Points

| Problem | Impact |
|---------|--------|
| Jadwal sering bentrok | Konflik resource dan waktu, mengganggu produktivitas |
| Timeline sulit terjaga | Project delay, deadline terlewat |
| Progress sulit dimonitor | Tidak ada visibility real-time |
| PIC absent (sakit/cuti) = tracking hilang | Task urgent tidak ter-backup, handover sulit |
| Koordinasi lintas departemen manual | Delay pengajuan RAB ke Finance, pembayaran vendor terlambat |
| Persiapan & evaluasi tidak optimal | Brainstorm, survey, dan post-project review kurang terstruktur |

### 2.3 Desired Outcome
Sistem board yang **simple dan informatif** yang memungkinkan:
- **Kalender** sebagai pusat aktivitas (Single Source of Truth) dengan fitur Conflict Alert (bukan blokir).
- **Activity** sebagai konteks besar dan **Subtask** sebagai driver pekerjaan harian.
- Setiap **PIC** mengelola Subtask secara mandiri.
- **Leader** dapat memonitor Activity dan melakukan approval.
- Notifikasi otomatis via **WhatsApp Group** untuk transparansi.

---

## 3. Feature Priority

Berdasarkan input stakeholder, berikut urutan prioritas fitur:

| Priority | Feature | Notes |
|----------|---------|-------|
| 1 | Shared Calendar & Activity Management | **Core Feature** - Anti-block system, Activity Types |
| 2 | Subtask Management (Operational) | PIC driven, Status workflow, Calendar sync |
| 3 | WhatsApp Group Notifications | Marketing & Finance Groups |
| 4 | Dashboard & Taskboard View | Monitoring for Leader & PIC |
| 5 | Approval System | Lock after Done, Revision loop |
| 6 | Finance Integration (Information) | Budget estimation & reminders |

---

## 4. Functional Requirements

### 4.1 User Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | **Super Admin** (Leader/Head) memiliki akses penuh: Manage User, Role, Activity Type. | High |
| FR-02 | **Leader** dapat membuat Activity, menentukan Timeline & PIC, dan melakukan Approval. | High |
| FR-03 | **PIC** dapat membuat dan mengelola **Subtask** di bawah Activity yang ditugaskan. | High |
| FR-04 | Semua user dapat melihat Dashboard dan Kalender (transparan). | High |

### 4.2 Calendar Management (Core Feature)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-05 | Sistem menyediakan **Satu Kalender** yang menampilkan Activity dan Subtask semua brand. | High |
| FR-06 | Sistem menggunakan **Anti-Blok System**: Menampilkan **Conflict Alert** jika jadwal PIC bentrok, bukan melarang input. | High |
| FR-07 | Kalender dapat di-filter berdasarkan Activity Type, PIC, dan Status. | Medium |
| FR-08 | Visual Kalender mengikuti warna **Activity Type**. | High |
| FR-09 | Jadwal terintegrasi 2 arah dengan Google Calendar. | High |

### 4.3 Activity & Subtask Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-10 | **Activity** (Payung Besar) hanya dapat dibuat oleh Leader. | High |
| FR-11 | **Subtask** (Unit Kerja) dibuat oleh PIC di dalam sebuah Activity. | High |
| FR-12 | Tidak ada Subtask yang berdiri sendiri (wajib punya Activity). | High |
| FR-13 | Sistem mendukung status Subtask: **To Do → In Progress → Review → Done**. | High |
| FR-14 | Jika Status = Review, Leader dapat **Approve** (Lock Subtask) atau **Revisi** (Kembali ke In Progress + Notes). | High |

### 4.4 Data Attributes

**Activity (Level Atas):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Activity ID | Auto | Yes | Unique ID |
| Name | Text | Yes | Contoh: "Photoshoot Campaign A" |
| Activity Type | Ref | Yes | Link ke Master Activity Type (Warna/Icon) |
| PIC Utama | Ref | Yes | Penanggung jawab utama |
| Timeline | Date Range | Yes | Start Date - End Date |
| Budget | Currency | No | Estimasi Budget |
| Description | Text | No | Detail aktivitas |

**Subtask (Unit Kerja):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Subtask ID | Auto | Yes | Unique ID |
| Parent Activity | Ref | Yes | Link ke Activity |
| Name | Text | Yes | Contoh: "Sewa Studio" |
| PIC | Ref | Yes | Pelaksana (bisa beda dengan PIC Activity) |
| Date | Date Range | Yes | Start - End (Sync ke Kalender) |
| Status | Enum | Yes | To Do / In Progress / Review / Done / Revisi |
| Description | Text | No | Detail pekerjaan |

### 4.5 Notifications (WhatsApp Group Integration)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-15 | Sistem mengirim notifikasi ke **WA Group Marketing** dan **WA Group Marketing-Finance**. | High |
| FR-16 | **Reminder Subtask**: Dikirim H-1 dan Hari-H ke WA Group Marketing. | High |
| FR-17 | **Reminder Activity**: Dikirim H-3 dan H-1 ke WA Group Marketing. | High |
| FR-18 | **Reminder Review**: Dikirim saat status Subtask berubah menjadi "Need Review". | High |
| FR-19 | **Reminder Finance**: Dikirim jika Activity memiliki budget, H-x sebelum dana dibutuhkan (ke WA Group Finance). | High |
| FR-20 | Notifikasi dikirim oleh bot "Marketing Assistant" menggunakan nomor kantor. | Medium |

### 4.6 Visualization (Views)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-21 | **Taskboard View**: Menampilkan Subtask dikelompokkan by Activity / Status / PIC. | High |
| FR-22 | **Dashboard Leader**: Ringkasan Activity, Progres PIC, Subtask Overdue. | High |
| FR-23 | **Dashboard PIC**: Subtask pribadi, Deadline terdekat. | High |

### 4.7 Activity Type Management (Master Data)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-24 | Super Admin/Leader dapat mengelola **Activity Type** (Nama, Warna, Icon, Template Subtask). | Medium |
| FR-25 | Saat Activity dibuat, user memilih Activity Type yang menentukan warna di kalender. | High |

### 4.8 Finance & Cross-Dept Coordination

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-26 | Activity memiliki info estimasi budget dan tanggal dana dibutuhkan. | High |
| FR-27 | Integrasi notifikasi spesifik ke Group WA Finance untuk awareness cashflow. | High |

---

## 5. User Stories

### 5.1 Calendar & Activity (Leader)

**US-01: Sebagai Leader, saya ingin membuat Activity (Campaign/Event) dengan timeline, agar PIC tahu konteks pekerjaan.**
- Acceptance Criteria:
  - Input Nama, Activity Type, PIC Utama, Timeline, Budget.
  - Conflict Alert muncul jika PIC utama sibuk di tanggal tersebut.

**US-02: Sebagai Leader, saya ingin melihat satu kalender lengkap, agar bisa mengatur jadwal tanpa bentrok.**
- Acceptance Criteria:
  - Melihat semua Activity & Subtask di satu view.
  - Filter by Activity Type / PIC.

### 5.2 Subtask Management (PIC)

**US-03: Sebagai PIC, saya ingin memecah Activity menjadi Subtask, agar pekerjaan teknis terdata.**
- Acceptance Criteria:
  - Menambah subtask di bawah Activity.
  - Set deadline subtask (otomatis muncul di kalender).
  - Update status subtask.

**US-04: Sebagai PIC, saya ingin mengajukan review saat subtask selesai, agar Leader bisa mengecek.**
- Acceptance Criteria:
  - Ubah status "In Progress" -> "Review".
  - Notifikasi otomatis terkirim ke WA Group.

### 5.3 Notifications (Team)

**US-05: Sebagai Tim Marketing, saya ingin reminder dikirim ke Grup WA, agar semua orang aware dan saling backup.**
- Acceptance Criteria:
  - Reminder H-1 dan Hari-H masuk ke Grup.
  - Bot mengirimkan detail Activity/Subtask.

---

## 6. Status Workflow

```
┌───────┐    ┌─────────────┐    ┌────────┐    ┌────────────┐
│ To Do │ ──►│ In Progress │ ──►│ Review │ ──►│    Done    │
└───────┘    └─────────────┘    └────────┘    │  (Locked)  │
                    ▲                         └────────────┘
                    │                                │
                    │          ┌──────────┐          │
                    └──────────┤  Revisi  │◄─────────┘
                               └──────────┘
```

**Status Definitions:**

| Status | Description | User Action |
|--------|-------------|-------------|
| To Do | Belum dikerjakan | PIC create |
| In Progress | Sedang dikerjakan | PIC start |
| Review | Selesai dikerjakan, butuh pengecekan | PIC request review |
| Done | Disetujui Leader, tidak bisa diedit lagi | Leader approve |
| Revisi | Ada perbaikan, kembali aktif | Leader reject |

---

## 7. Data Requirements

### 7.1 Master Data

| Entity | Fields | Notes |
|--------|--------|-------|
| Users | id, name, role (Super Admin/Leader/PIC), WA number | Login & Access |
| Activity Types | id, name, color, icon, default_subtasks | **Configurable by Admin** |
| Brands | id, name | Shi by Shireen, ZS, dll |

### 7.2 Transactional Data

| Entity | Fields (Key) | Notes |
|--------|--------------|-------|
| Activity | name, type_id, start_date, end_date, pic_id, budget | Parent object |
| Subtask | activity_id, name, pic_id, deadline, status | Child object, linked to Calendar |

---

## 8. Integration Requirements

| System | Integration Type | Purpose |
|--------|------------------|---------|
| **WhatsApp Group** | Outbound Webhook/API | Reminder ke Grup Marketing & Finance |
| Google Calendar | 2-way sync | Sync Jadwal Activity & Subtask |

---

## 9. Out of Scope

Berikut adalah item yang **tidak** termasuk dalam scope project ini:

- Direct access untuk department lain (Finance, FD, Sales, Gudang, GA)
- Resource/workload balancing otomatis
- Time tracking / timesheet
- Budget tracking / RAB management
- File storage/DAM (Digital Asset Management)
- Complex approval workflow (multi-level)
- Native mobile app (web responsive + Google Calendar sync saja)
- Multi-language support
- Advanced reporting/analytics
- Brand-specific boards (semua dalam satu board)

---

## 10. Open Questions

Pertanyaan yang masih perlu dikonfirmasi:

1. **Berapa jumlah user (PIC + Superior) yang akan menggunakan sistem ini?**
2. **Apakah ada existing tools (Excel, Trello, dll) yang datanya perlu dimigrate?**
3. **Siapa yang akan menjadi admin sistem untuk manage master data?**
4. **Apakah ada deadline target untuk go-live?**
5. **Untuk WhatsApp integration, apakah perusahaan sudah punya WhatsApp Business API?**
6. **Apakah semua user sudah punya Google account untuk Calendar sync?**

---

## 11. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 29 Jan 2026 | IT Development | Initial draft based on elicitation session |
| 1.1 | 29 Jan 2026 | IT Development | Updated based on stakeholder follow-up answers: corrected role model (PIC edits, Superior approves), added sub-task structure, updated status workflow (added Review), added Google Calendar sync requirement, updated cross-dept list, reordered priorities |

---

*Document Status: DRAFT v1.1 - Pending final stakeholder sign-off*
