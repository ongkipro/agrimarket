# FIELD OPERATIONS & AGRONOMIST TASK MANAGEMENT SPECIFICATION
**Agrimarket Field Execution OS (Tugas Operasional & Agronomi Lapangan)**  
**Version:** 1.0.0  
**Target Module:** `/tasks` (`src/features/tasks`)

---

## 1. EXECUTIVE SUMMARY & PROBLEM STATEMENT

Dalam ekosistem input pertanian Indonesia (benih, pupuk, pestisida), keberhasilan penetrasi pasar (SAM ke SOM) ditentukan oleh eksekusi di lapangan (*last-mile execution*). Modul `Tasks` sebelumnya berisi placeholder teks acak (*lorem ipsum*) tanpa relevansi agronomis.

Spesifikasi ini mereformasi modul `Tasks` menjadi **Agrimarket Field Operations OS**, mencakup 4 pilar kerja utama:
1. **Demoplot & Temu Lapang (Field Days):** Pembuktian efikasi produk langsung di lahan petani sentra bersama Poktan.
2. **Audit Kios KPL & Manajemen Kredit Tempo (Yarnen):** Monitoring likuiditas, stok buffer saprotan, dan kepatuhan izin edar Kementan.
3. **Tanggap Darurat Hama & Penyakit (OPT Outbreak Incident Desk):** Eskalasi cepat serangan wereng, penggerek batang (sundep), patek, atau ulat grayak.
4. **Follow-up Leads Petani Digital (Meta/Google Ads Conversion):** Eskalasi konsultasi WhatsApp dan order COD dari kampanye digital ke tim agronomis lokal.

---

## 2. TAXONOMY & LABELING MATRIX

### 2.1 Labels & Kategori Tugas (Backwards-Compatible)
| Label Key | Nama Label | Deskripsi Operasional |
| :--- | :--- | :--- |
| `demoplot` | Demoplot & Temu Lapang | Uji coba efikasi formula di lahan petani dan gathering kelompok tani |
| `kios_kpl` | Kios KPL & Distribusi | Kunjungan pengecer KPL, audit plafon tempo yarnen, dan restocking |
| `opt_hama` | Tanggap Darurat OPT | Respons darurat laporan ledakan hama/penyakit di sentra komoditas |
| `distribusi` | Logistik & Buffer Stock | Pengiriman pasokan saprotan pra-musim tanam (T-30 ke T-15) |
| `ads_leads` | Follow-up Digital Leads | Follow-up prospek petani dan kios dari Meta Ads & Google Ads |
| `feature` | Fitur Sistem | Kompatibilitas pengujian Vitest existing |
| `bug` | Kendala Teknis | Kompatibilitas pengujian Vitest existing |
| `documentation` | Laporan & Dokumen | Kompatibilitas pengujian Vitest existing |

### 2.2 Status Pipeline
- **Backlog:** Usulan program dari Sales Rep / Poktan yang sedang menunggu persetujuan anggaran.
- **Todo:** Tugas terjadwal yang siap dieksekusi minggu berjalan.
- **In Progress:** Tim agronomis atau field assistant sedang aktif berada di lapangan.
- **Done:** Kegiatan telah selesai, dokumentasi hasil terunggah, dan laporan terverifikasi.
- **Canceled:** Kegiatan dibatalkan karena cuaca ekstrem atau panen dini.

### 2.3 Tingkat Prioritas
- **Critical (Merah):** Ledakan OPT skala luas, batas tempo yarnen terancam gagal bayar, atau stok benih kosong saat tanam raya.
- **High (Oranye):** Demoplot utama pra-musim, audit kios sentra beromzet >Rp 200M/musim.
- **Medium (Kuning):** Kunjungan rutin KPL, monitoring pertumbuhan vegetatif mingguan.
- **Low (Biru/Abu):** Penyusunan laporan administrasi bulanan, rekapitulasi data demoplot.

---

## 3. MULTI-VIEW TAB ARCHITECTURE DALAM `/tasks`

Untuk memberikan pengalaman pengguna yang fleksibel bagi tim manajerial maupun agronomis lapangan, `/tasks` dilengkapi dengan 4 tab interaktif:

### Tab 1: Daftar Tugas (Comprehensive Table View)
- Tabel data TanStack dengan kemampuan seleksi jamak (*bulk actions*), pencarian teks bebas, pagination URL-synced, sorting, dan filter status/prioritas.
- Kolom Task ID, Kategori Label agronomis, Judul Operasional, Status eksekusi, Tingkat Prioritas, dan Action buttons (Edit/Delete).

### Tab 2: Papan Alur Kerja (Kanban Board View)
- Visualisasi alur kerja kolaboratif 4 kolom: *Backlog*, *Todo*, *In Progress*, dan *Done*.
- Kartu tugas menampilkan:
  - Header: Kategori label + badge prioritas warna.
  - Body: Judul tugas lapangan, lokasi sentra kabupaten, dan nama penanggung jawab (Assignee).
  - Footer: Tenggat waktu (*Due Date*) dan estimasi progres.

### Tab 3: Jadwal Kunjungan Agronomis (Field Dispatch Calendar)
- Matriks jadwal harian 7 hari untuk tim agronomis wilayah:
  - Hari 1 (Senin): Audit Kios KPL & Verifikasi Stok Menjelang Tanam.
  - Hari 2 (Selasa): Aplikasi Fungisida Demoplot Cabai Fase Generatif.
  - Hari 3 (Rabu): Temu Lapang (Field Day) Petani Padi Bersama Poktan.
  - Hari 4 (Kamis): Kunjungan Kebun Sawit Plasma & Sosialisasi Pupuk Mikro.
  - Hari 5 (Jumat): Evaluasi & Follow-up 35 Leads Petani WhatsApp dari Iklan Facebook.
  - Hari 6 (Sabtu): Inspeksi Serangan Ulat Grayak Bawang Merah.
  - Hari 7 (Minggu): Rekapitulasi & Perencanaan Minggu Depan.

### Tab 4: Meja Tanggap OPT Darurat (Pest Outbreak Incident Desk)
- Log insiden darurat serangan OPT yang dilaporkan kios binaan atau agronomis:
  - Jenis Serangan: Sundep Padi (Indramayu), Patek Cabai (Temanggung), Ulat Grayak (Brebes), Ulat Api (Riau), Moler Bawang (Nganjuk).
  - Luas Terdampak (Ha).
  - Tingkat Keparahan (Severe / Moderate / Early Stage).
  - Tindakan Cepat: Tombol satu-klik "Kirim Bantuan Agronomis" dan "Alokasi Stok Darurat Kios".

---

## 4. METRIK & KPI OPERASI LAPANGAN (HEADER SUMMARY)

Di atas tab view, ditampilkan 4 kartu indikator kesehatan operasional lapangan:
1. **Total Tugas Operasi**: Jumlah seluruh penugasan lapangan bulan berjalan.
2. **Demoplot & Temu Lapang**: Target uji efikasi produk bersama Poktan.
3. **Audit Kios KPL**: Pengecekan jaringan kios penyalur resmi.
4. **Peringatan OPT Kritis**: Insiden hama darurat yang memerlukan penanganan <24 jam.
5. **Tingkat Penyelesaian (Completion Rate)**: % tugas yang telah diselesaikan tepat waktu.
