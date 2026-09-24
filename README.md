# AgriMarket — Indonesia Agricultural Market Intelligence Dashboard

Platform intelijen pasar pertanian strategis Indonesia berbasis data sensus resmi BPS RI (KSA, SPH, ST2023), Kementerian Pertanian, dan Bank Indonesia (PIHPS). Memetakan permodelan berjenjang **TAM, SAM, dan SOM** secara presisi untuk 13 komoditas strategis di 38 provinsi dan 514 kabupaten/kota seluruh Indonesia.

**Live Production:** [https://agrimarket-five.vercel.app](https://agrimarket-five.vercel.app)

---

## 13 Komoditas Strategis Nasional

1. **Padi (Rice)**: TAM 10.051.780 Ha | 52,66 Juta Ton GKG | Rp 376,52 Triliun
2. **Jagung (Corn)**: TAM 2.553.420 Ha | 15,21 Juta Ton Pipilan Kering | Rp 79,09 Triliun
3. **Cabai Agregat (Chili)**: TAM 311.300 Ha | 3,13 Juta Ton | Rp 92,38 Triliun
4. **Bawang Merah (Shallot)**: TAM 188.584 Ha | 2,09 Juta Ton | Rp 44,85 Triliun
5. **Kentang (Potato)**: TAM 72.840 Ha | 1,51 Juta Ton | Rp 13,31 Triliun
6. **Kubis (Cabbage)**: TAM 63.400 Ha | 1,48 Juta Ton | Rp 4,14 Triliun
7. **Tomat (Tomato)**: TAM 58.200 Ha | 1,42 Juta Ton | Rp 8,80 Triliun
8. **Semangka (Watermelon)**: TAM 33.400 Ha | 0,61 Juta Ton | Rp 2,75 Triliun
9. **Melon (Melon)**: TAM 9.850 Ha | 0,16 Juta Ton | Rp 1,36 Triliun
10. **Kelapa Sawit (Oil Palm)**: TAM 16.835.000 Ha Total Areal | 238,45 Juta Ton TBS | Rp 631,89 Triliun
11. **Alpukat (Avocado)**: TAM 42.100 Ha (8,42 Juta Pohon) | 0,92 Juta Ton | Rp 13,41 Triliun
12. **Tembakau (Tobacco)**: TAM 226.500 Ha | 0,26 Juta Ton Rajangan Kering | Rp 12,48 Triliun
13. **Anggrek (Orchid)**: TAM 6.480 Ha (Florikultura) | 162 Juta Tangkai | Rp 1,38 Triliun

---

## Fitur & Modul Utama

1. **Executive Telemetry Dashboard (`/`)**
   - 5 Macro KPI Telemetry Cards: Total TAM Ha (30.451.874 Ha), Farm-Gate Value (Rp 1.276,46 Triliun), SAM Area (21.185.714 Ha), Input Market Value (Rp 204,22 Triliun), dan Gate-0 Status (`100% [✓ VERIFIED]`).
   - Sectoral Breakdown (Tanaman Pangan, Hortikultura Sayuran, Hortikultura Buah, Perkebunan, Florikultura).
   - Strategic Agronomic Catalysts & Regulatory Alerts (Permentan No. 10/2022).
2. **Commodity Deep Explorer (`/commodities`)**
   - 6 Tab Analisis Agronomi: Funnel & Economics, 38-Provinces & Districts, Subrounds (SR 1-3) & Commercial Selling Window, Input Expenditure Decomposition, ST2023 Farmer Landholding Typology & Price Ladder, dan Commercial GTM Playbook.
   - Water Infrastructure & Agro-Climate Vulnerability Index (Irigasi Teknis vs Tadah Hujan, Skor Risiko El Niño / La Niña, Protokol Mitigasi Lapang).
3. **Kalender Tanam Nasional & Seasonal Wave Engine (`/calendar`)**
   - Selector Mode Multi-Tahun Dinamis: **Tahun Ini (2026 — El Niño Aktif)**, **Tahun Depan (2027 — Proyeksi Normalisasi Iklim)**, dan **Normal Klimatologis (ZOM9120)**.
   - Analisis lengkap 3 Subround tahunan (SR 1 Jan-Apr, SR 2 Mei-Agu, SR 3 Sep-Des) dengan dinamika kemunduran onset tanam MT 1.
   - Matriks Visual 12 Bulan x 13 Komoditas dengan 11 kode fase agronomis (`PL`, `TN`, `SM`, `VG`, `GN`, `PT`, `PN`, `PF`, `HC`, `LC`, `BR`).
   - Panduan Glosarium Teknis 11 Fase Budidaya dan tindakan kritis lapang.
   - Dynamic Monthly Commercial Selling Opportunities & Lead-Time Booking Kios KPL.
4. **Agro-Climatic Intelligence & BMKG Weather Outlook (`/climate`)**
   - Telemetri iklim makro: Status ENSO Nino 3.4 (+1.68°C El Niño Kuat), IOD (+0.76°C Positif), Dinamika Monsun Australia vs Asia, dan 61,08% ZOM mundur.
   - Sebaran onset awal musim hujan 2026/2027 pada 699 Zona Musim (ZOM) seluruh Indonesia.
   - Drilldown 6 Koridor Agroklimat Regional (Jawa, Sumatera, Bali-Nusra, Sulawesi, Kalimantan, Maluku-Papua) dengan data hari tanpa hujan (HTH) dan kapasitas tampung waduk/embung.
   - Proyeksi multi-model ENSO 2027 (peluruhan El Niño di Q1 2027, fase netral 72% di Q2 2027, dan potensi La Niña lemah 58% di semester 2 2027).
   - Matriks sensitivitas 13 komoditas strategis terhadap anomali iklim ekstrem serta SOP Katam Terpadu (AWD macak-macak, pompanisasi, dan buffer stocking fungisida).
5. **Product Catalog Intelligence, Multi-Product Synergy & Climate Meta Ads Engine (`/products`)**
   - **4 Strategic SKUs Knowledge Dossiers:** `AUSSIE Sawit` (Recovery Anti-Kulat & Ganoderma), `BENSU Hortikultura` (Growth Restart & Weather Stress Stimulator), `SARATOGA Plant Serum` (Japanese Pro-Plant Complex™ ±47.5% Asam Amino), dan `KOJIEN Activator` (Crop Stability & Yield Support System).
   - **Multi-Tab Dossier Views:** Formula bio-kimia presisi, batas klaim teknis, matriks dosis & timing semprot/kocor/oles, 4-stage severity recovery prognosis, demografi petani BPS, dan CS objection decision tree.
   - **Matriks Sinergi Mix & Match (`/products/mix-match`):** 5 protokol kombinasi lapang teruji (Hortikultura, Padi Sawah, Kelapa Sawit, Jagung Hibrida, Bawang Merah) serta standar baku universal keselamatan tangki semprot (jar-test & prohibited tank-mixes).
   - **Kalender Kampanye Komersial Iklim 15 Bulan (`/products/campaigns`):** Sinkronisasi bulan-per-bulan (Okt 2026 – Des 2027) terkalibrasi dengan anomali El Niño 2026 s/d La Niña 2027, rekomendasi headline & hook Meta Ads, aksi distributor/kios saprotan, serta panduan agronomist lapang.
   - **Topologi Arsitektur Ekosistem Mindmap:** Diagram terstruktur memetakan portofolio produk terhadap komoditas, dinamika iklim, fenologi tanaman, dan corong pemasaran digital.
6. **Geospatial Map & 514-Regency Drilldown (`/map`)**
   - Peta regional 38 provinsi di 6 gugus kepulauan besar.
   - Drilldown interaktif paralel dari provinsi langsung ke seluruh Kabupaten/Kota sentra (514 kabupaten/kota terdata lengkap dengan Gate-0 balancing).
   - Kluster kecamatan sentra (*sub-district clusters*) dan rasio penempatan tim sales agronomis.
7. **Digital Advertising Intelligence & Growth Engine (`/ads`)**
   - 5 Persona Pembeli Pertanian (Petani Maju, Petani Gurem, Juragan KPL, Mandor Sawit, Hobiis Florikultura).
   - Competitor Ad Spy Matrix (8 brand agrokimia & benih nasional).
   - Google Ads 3-Tier Search Intent Matrix (High Intent, Commercial Research, Problem Aware).
   - Campaign Budget & RoAS Financial Modeling Simulator.
8. **Field Operations & Agronomist Task Hub (`/tasks`)**
   - 4 Multi-View Tabs: Table View, Kanban Board, Dispatch Calendar, dan OPT Outbreak Incident Desk.
   - Slide-over Tasks Detail Drawer dengan Standard Operating Procedure (SOP) terstruktur dan shortcut lintas-modul.
9. **Dynamic SOM Internal Capacity Simulator (`/simulator`)**
   - Simulasi kapasitas riil perusahaan berdasarkan $N_{\text{sales}}$, kapasitas binaan kios per rep, rata-rata serap musiman, dan pagu modal kerja tempo yarnen.
10. **BPS Data Audit Ledger & Export Center (`/audit`)**
    - Rekonsiliasi matematis Gate-0 dengan deviasi 0.0000% antara angka nasional dan penjumlahan 38 provinsi.
    - Ekspor satu-klik: Master Dataset JSON, Master National CSV, dan 38-Province Breakdown CSV.
11. **System Update Log & Release Ledger (`/help-center`)**
    - Riwayat rilis sistem kronologis (v1.0.0 s/d v1.6.0) dengan pencarian teks langsung dan filter kategori rilis.

---

## Tech Stack

- **Framework:** React 19, TypeScript, Vite 8
- **Styling:** Tailwind CSS v4, Radix UI primitives, Lucide Icons
- **Routing:** TanStack Router v1 (file-based routing)
- **Data Table:** TanStack Table v8
- **Charts:** Recharts
- **Testing:** Vitest Browser Mode, Playwright Chromium Headless

---

## Local Development

```sh
# Clone & install dependencies
pnpm install --frozen-lockfile

# Start local development server
pnpm run dev
# Server ready at http://localhost:5173/

# Run full test suite (26 test files, 182 tests)
pnpm test

# Run linter
pnpm run lint

# Run production build
pnpm run build
```

---

## Data Governance & Gate-0 Integrity

Seluruh data agregat makro dan mikro terikat oleh protokol validasi ketat **Gate-0 Reconciliation**:
- $\Delta \le 0,05\%$ margin of tolerance untuk seluruh perbandingan makro-mikro.
- Sum of 38 Provinces = National Total (0.0000% deviasi).
- Sum of 514 Regencies = Provincial Total (0.00% zero-delta allocation).
- Zero NaN, Zero Infinity, strictly positive agricultural yields.
