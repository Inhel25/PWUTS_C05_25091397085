# Laporan Pengerjaan Ujian Tengah Semester (UTS) Gasal 2026/2027
## Mata Kuliah: Pemrograman Web (2 SKS)
**Dosen Pengampu:** Ari Kurniawan, S.Kom, M.T.  
**Program Studi:** D4 Manajemen Informatika - Fakultas Vokasi, Universitas Negeri Surabaya (UNESA)  

---

### 👤 Identitas Mahasiswa & Kelompok
- **Nama Mahasiswa:** Kristina Ina Helan
- **NIM:** 25091397085
- **Kode Kelompok:** Kelompok 5 (C05)
- **Anggota Kelompok:**
  1. Kristina Ina Helan (25091397085) — **Peran: Administrator**
  2. Anisa Dini Septianda (25091397092) — Peran: Pelanggan
  3. Riska Nuraini (25091397102) — Peran: Pemilik Stan
- **Topik Proposal SRS:** *NyamCenter* — Sistem Informasi Pemesanan Makanan & Sentra Wisata Kuliner Multi-Vendor
- **Format Folder Repository:** `PWUTS_C05_25091397085`

---

### 📋 Implementasi Khusus ADMINISTRATOR Sesuai Proposal SRS

Sesuai pembagian peran pada SRS Bab I s/d Bab V dan Mockup Bab IV (Halaman 48-49), tugas UTS ini secara eksklusif mengimplementasikan seluruh kebutuhan **Administrator (Pengelola Pujasera)**:

| No | Modul Admin di Proposal | File HTML (AJAX) | Kebutuhan SRS & Test Scenario |
| :---: | :--- | :--- | :--- |
| **1** | **Dashboard Utama** | `dashboard.html` | **Mockup L2 & Bab 4.3.j:** Ringkasan KPI global (Total Stan, Pesanan, Omset Bruto, Fee Platform) dan log aktivitas pesanan lintas stan real-time. |
| **2** | **Kelola Stan** | `stan.html` | **FR-14 & Mockup L3 (TS-37, TS-38):** Tabel kemitraan stan pujasera, filter status stan (*Semua, Aktif, Pending, Suspend*), live search, dan tombol aksi Verifikasi Stan baru serta Penangguhan (Suspend). |
| **3** | **Kelola Pengguna** | `pengguna.html` | **FR-15 & Mockup L4 (TS-39, TS-40):** Tabel akun pengguna seluruh entitas (Admin, Stan, Pelanggan), toggle status akun (Aktif/Nonaktif), serta **Form Tambah Pengguna Baru** dengan validasi form (memenuhi **Item 2.c UTS**). |
| **4** | **Monitoring Transaksi** | `transaksi.html` | **FR-16 & Mockup L5 (TS-41, TS-42):** Log transaksi pesanan, pencarian pesanan via nomor order/stan/pemesan, serta modal konfigurasi besaran biaya layanan platform (Rp 2.000). |
| **5** | **Laporan Penjualan** | `laporan.html` | **FR-17 & Mockup L6 (TS-43, TS-44):** Filter periode tanggal penjualan, rekapitulasi penjualan per stan kuliner, tombol Cetak/Export PDF, dan Ekspor CSV interaktif. |

---

### 📂 Struktur Direktori Folder UTS

```text
📁 PWUTS_C05_25091397085/
│
├── 📄 index.html              # Layout utama dashboard admin responsive + Navigasi AJAX (Item 2.a)
├── 📄 dashboard.html          # Dashboard KPI & Log Aktivitas Admin (Mockup L2)
├── 📄 stan.html               # Manajemen Kemitraan Stan & Verifikasi (Mockup L3 / FR-14)
├── 📄 pengguna.html           # Manajemen Pengguna & Form Validasi JS (Mockup L4 / FR-15 / Item 2.c)
├── 📄 transaksi.html          # Monitoring Transaksi & Biaya Layanan (Mockup L5 / FR-16)
├── 📄 laporan.html            # Laporan Penjualan, Cetak PDF & Ekspor CSV (Mockup L6 / FR-17)
├── 📄 README.md               # Dokumentasi teknis pengerjaan UTS (Item 2.e)
│
├── 📁 css/
│   └── 📄 style.css           # Styling kustom (Font Montserrat & Palet Merah Putih Pink)
│
└── 📁 js/
    └── 📄 ajax-nav.js         # Router AJAX jQuery untuk memuat halaman tanpa reload
```

---

### 🚀 Cara Menjalankan Website Secara Lokal

Jalankan website ini menggunakan local web server agar request AJAX dapat berjalan lancar:

#### Opsi 1: Menggunakan PHP Built-in Server
1. Buka terminal pada folder `PWUTS_C05_25091397085`.
2. Jalankan perintah:
   ```bash
   php -S localhost:8000
   ```
3. Buka browser dan akses alamat: `http://localhost:8000`.

#### Opsi 2: Menggunakan Ekstensi VS Code "Live Server"
1. Buka folder `PWUTS_C05_25091397085` di VS Code.
2. Klik kanan pada file `index.html`.
3. Pilih **"Open with Live Server"**.
4. Website akan terbuka di browser pada `http://127.0.0.1:5500`.

---

### 🧪 Panduan Pengujian Fitur Khusus Administrator

1. **Uji Navigasi AJAX (Item 2.a):**
   - Klik menu navigasi di sidebar (*Dashboard Utama, Kelola Stan, Kelola Pengguna, Monitoring Transaksi, Laporan Penjualan*). Halaman berganti secara instan via jQuery AJAX tanpa me-refresh halaman browser.
2. **Uji Kelola Stan (FR-14 / Mockup L3):**
   - Klik menu *"Kelola Stan"*. Coba fitur live search atau klik tab filter (*Pending, Aktif, Suspended*). Coba klik tombol *"Verifikasi Stan"* pada stan yang Pending.
3. **Uji Validasi Form Tambah Pengguna (Item 2.c / FR-15 / Mockup L4):**
   - Klik menu *"Kelola Pengguna"*, lalu klik tombol *"Tambah Pengguna Baru"*.
   - Coba kosongkan input dan klik simpan: validasi jQuery akan memblokir submit (`e.preventDefault()`), memunculkan indikator merah pada input yang salah, dan menolak email yang tidak valid atau password di bawah 6 karakter.
   - Isi form dengan benar: baris pengguna baru akan langsung ditambahkan ke tabel secara dinamis.
4. **Uji Monitoring Transaksi (FR-16 / Mockup L5):**
   - Cari transaksi menggunakan nomor nota atau nama pemesan. Klik *"Atur Biaya Layanan"* untuk mengubah nominal fee platform.
5. **Uji Laporan & Ekspor CSV (FR-17 / Mockup L6):**
   - Klik *"Laporan Penjualan"*. Terapkan filter tanggal, lalu klik tombol *"Export Excel (CSV)"* untuk mengunduh rekapitulasi data penjualan dalam format `.csv`.
