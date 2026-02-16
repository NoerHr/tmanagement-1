# Dokumen Konsep Aplikasi Activity & Task

## 1. Tujuan Aplikasi

Aplikasi ini dirancang untuk membantu tim dalam **perencanaan, eksekusi, monitoring, dan evaluasi aktivitas kerja** (terutama campaign, photoshoot, event, dan kolaborasi) secara terstruktur, transparan, dan sinkron antar peran.

Fokus utama:

* Kalender sebagai pusat aktivitas
* Activity sebagai konteks besar
* Task sebagai unit kerja utama
* Monitoring progres lintas role

---

## 2. Role & Hak Akses

### 2.1 Super Admin

* Biasanya salah satu Leader (misal: Ketua / Head)
* Hak akses:

  * Manage user & role
  * Invite user
  * Mengubah role user
  * Manage Activity Type
  * Full access ke seluruh data

### 2.2 Leader

* Membuat Activity utama
* Menentukan:

  * Timeline activity
  * PIC
  * Budget (jika ada)
* Monitoring progres semua activity & Task
* Approve / request revision

### 2.3 PIC

* Bertanggung jawab terhadap activity yang diberikan
* Membuat & mengelola **Task**
* Update progres Task
* Melihat dashboard pribadi

---

## 3. Konsep Data Utama

### 3.1 Activity (Level Atas)

Activity adalah **payung besar** dari sebuah pekerjaan.

Contoh Activity:

* Photoshoot Campaign A
* Influencer Collaboration Batch 1
* Event Launch Product

Properti Activity:

* Nama activity
* Activity Type
* PIC
* Timeline (start–end)
* Deskripsi

Catatan:

* Activity **dibuat oleh Leader**
* Activity tidak dipecah langsung menjadi task, tapi ke Task

---

### 3.2 Task (Unit Kerja Utama)

Task adalah **pekerjaan operasional** yang benar-benar dikerjakan harian.

Properti Task:

* Nama Task
* Deskripsi
* Start date – end date (deadline)
* Status (To Do / In Progress / Review / Done / Revisi)
* PIC

Catatan penting:

* Task **tersinkron otomatis ke Kalender**
* Reminder & notifikasi berbasis Task

---

## 4. Activity Type

### 4.1 Definisi

Activity Type adalah **master kategori aktivitas** yang digunakan untuk:

* Menentukan warna
* Konsistensi visual
* Klasifikasi kerja

### 4.2 Isi Activity Type

Setiap Activity Type memiliki:

* Nama
* Warna
* Icon (opsional)
* Deskripsi singkat
* (Opsional) Template default Task

Contoh Activity Type:

| Nama        | Warna  | Contoh          |
| ----------- | ------ | --------------- |
| Photoshoot  | Biru   | Produksi konten |
| IG Campaign | Ungu   | Posting & reels |
| Influencer  | Hijau  | Endorse         |
| Event       | Oranye | Launching       |
| Sponsorship | Merah  | Partnership     |

### 4.3 Hak Akses

* Super Admin / Leader: create & edit
* PIC: hanya memilih

---

## 5. Kalender (Core Feature)

### 5.1 Prinsip Utama

* **Satu kalender untuk semua Activity (lintas brand)**
* Fokus pada **ketersediaan orang**, bukan brand
* Kalender bersifat **anti-blok** (memberi peringatan, bukan melarang)

### 5.2 Activity

Activity adalah konteks utama pekerjaan (payung besar).

Contoh Activity:

* Photoshoot Koleksi
* Launching Produk
* Influencer Campaign
* Sponsorship
* Konten Instagram

Setiap Activity memiliki:

* Activity Type
* Timeline (start–end)
* PIC utama
* Daftar orang terlibat
* Estimasi budget (opsional)

> Tidak ada Activity tanpa timeline.

### 5.3 Task

* Semua pekerjaan operasional berada di **Task**
* Tidak ada standalone task
* Setiap Task **wajib punya parent Activity**

Task memiliki:

* Deskripsi
* PIC
* Tanggal (sync ke kalender)
* Status

### 5.4 Anti-Bentrok (Anti-Blok System)

Saat user membuat atau mengedit Activity/Task:

* Sistem mengecek keterlibatan orang pada tanggal tersebut
* Jika bentrok, sistem menampilkan **Conflict Alert**, bukan blok

Contoh alert:

> ⚠️ PIC ini terlibat di Activity lain pada tanggal 18–20 Maret

Tujuan:

* Membantu keputusan reschedule
* Menghindari konflik yang baru ketahuan di akhir

### 5.5 Warna & Visual

* Warna mengikuti Activity Type
* Task mewarisi warna Activity
* Kalender mendukung Day / Week / Month

### 5.1 Prinsip Utama

* **Satu kalender untuk semua activity**
* Activity = konteks (rentang waktu)
* Task = item utama di kalender

### 5.2 Tampilan Kalender

* View: Day / Week / Month
* Filter:

  * Activity Type
  * PIC
  * Status

### 5.3 Warna

* Warna mengikuti Activity Type
* Task mewarisi warna parent Activity

---

## 6. Taskboard

Taskboard menampilkan **daftar Task**, bukan Activity.

Fitur:

* Group by:

  * Activity
  * Status
  * PIC
* Progress tracking
* Inspect detail Task

---

## 7. Dashboard

### 7.1 Dashboard Leader

* Ringkasan semua activity
* Task overdue
* Progress per PIC
* Chart visual

### 7.2 Dashboard PIC

* Task pribadi
* Deadline terdekat
* Progress pribadi

---

## 8. Approval Flow

1. PIC submit Task
2. Leader review
3. Jika approve:

   * Status Done
   * Locked (tidak bisa edit)
4. Jika revisi:

   * Wajib feedback
   * Status kembali ke In Progress

---

## 9. Navigasi Aplikasi

### 9.1 Sidebar Navbar

* Dashboard
* Taskboard
* Calendar
* Activity Type
* Settings

### 9.2 Top Bar

* 🔔 Notification (lonceng)
* Profile

---

## 10. Catatan Implementasi

* Task adalah **driver utama sistem**
* Kalender adalah **single source of truth**
* Activity Type menjaga konsistensi visual & struktur
* Sistem scalable untuk tim & project besar

---

## 11. Next Step (Opsional)

* User testing
* Refinement UI
* Sosialisasi internal
* Iterasi template Task

## Notifikasi & Reminder (WhatsApp Integration)

### Tujuan

Fitur reminder via WhatsApp dibuat untuk memastikan **tidak ada activity atau Task yang terlewat**, tanpa harus user membuka aplikasi secara aktif. WhatsApp dipilih karena menjadi channel komunikasi utama tim marketing, leader, dan finance.

---

### Kanal Reminder

Reminder **hanya dikirim ke WhatsApp Group**, bukan ke chat personal.

Group tujuan:

1. **WA Group Marketing**
2. **WA Group Marketing–Finance**

Alasan:

* Menghindari PIC / Leader lupa atau tidak sempat meneruskan info
* Semua pihak terkait langsung aware
* Transparansi dan shared responsibility

---

### Nomor WhatsApp Sistem

* Menggunakan **Nomor WhatsApp Kantor**
* Bukan nomor personal

Alasan:

* Aman jika terjadi resign
* Konsisten sebagai sistem
* Lebih profesional

Identitas pengirim:

> 🤖 Marketing Assistant

---

### Jenis Reminder

#### 1. Reminder Task

Dikirim ke **WA Group Marketing**

Trigger:

* H-1 sebelum deadline Task
* Hari-H jika belum selesai

Isi pesan:

* Nama Activity
* Nama Task
* PIC
* Deadline
* Status

Tujuan:

* Semua tim tahu progres
* Leader tidak perlu follow-up manual

---

#### 2. Reminder Activity

Dikirim ke **WA Group Marketing**

Trigger:

* H-3 sebelum Activity
* H-1 sebelum Activity

Isi pesan:

* Nama Activity
* Activity Type
* Tanggal
* PIC terlibat

---

#### 3. Reminder Review & Approval

Dikirim ke **WA Group Marketing**

Trigger:

* Status berubah ke **Need Review**

Isi pesan:

* Activity / Task
* PIC
* Deadline

Tujuan:

* Menghindari task stuck karena lupa direview

---

#### 4. Reminder Finance

Dikirim ke **WA Group Marketing–Finance**

Trigger:

* Activity dibuat dengan kebutuhan budget
* H-x sebelum dana dibutuhkan

Isi pesan:

* Nama Activity
* Jenis Activity
* Tanggal Activity
* Estimasi Budget
* Tanggal dana dibutuhkan

Tujuan:

* Finance aware sejak tahap planning
* Tidak ada kejutan pengeluaran

---

### Sinkronisasi Kalender

* Reminder terhubung langsung ke Kalender
* Perubahan tanggal → reminder otomatis update
* Task dengan tanggal akan muncul di kalender

---

### Kontrol Reminder

* Bisa aktif / nonaktif per Activity
* Setting H-1 / H-3 / Hari-H
* Akses penuh di Leader / Super Admin

---

### Batasan

* WhatsApp hanya notifikasi (satu arah)
* Tidak menggantikan komunikasi manual sepenuhnya

---

## Mapping Masalah → Solusi

### 1. Timeline Mundur karena Konflik Jadwal Orang

**Masalah:**
Build selesai lebih awal, tapi eksekusi mundur karena orang yang sama terlibat di banyak activity.

**Solusi Sistem:**

* Kalender lintas brand
* Conflict alert berbasis orang
* Visibility PIC sebelum eksekusi

---

### 2. Ketergantungan Tanya Manual via WhatsApp

**Masalah:**
Harus tanya satu-satu untuk cek ketersediaan.

**Solusi Sistem:**

* Kalender menampilkan activity + PIC
* Task & progres bisa dilihat semua

---

### 3. Finance Kaget Pengeluaran

**Masalah:**
Finance baru tahu saat dana harus keluar.

**Solusi Sistem:**

* Reminder ke WA Group Marketing–Finance sejak planning
* Info activity, tanggal, dan estimasi budget

---

### 4. Approval Jadi Bottleneck

**Masalah:**
Task selesai tapi lupa direview.

**Solusi Sistem:**

* Status Need Review
* Reminder otomatis ke WA Group
* Lock editing setelah approved

---

### 5. Leader Terlalu Teknis

**Masalah:**
Leader harus turun ke detail operasional.

**Solusi Sistem:**

* Leader membuat Activity & timeline
* PIC mengelola Task
* Progres tetap transparan
