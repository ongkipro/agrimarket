# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## INDONESIA AGRICULTURAL MARKET INTELLIGENCE & REPORTING DASHBOARD
### Comprehensive Market Sizing (TAM, SAM, SOM), Commodity Breakdown & Market Penetration Research Engine for 13 Strategic Commodities

- **Document Version:** 1.0.0
- **Status:** APPROVED FOR STAGING & SPECIFICATION REVIEW
- **Author:** Business System Architect & Full-Stack Development Team
- **Target Release:** Q4 2026 / Enterprise Agronomy Edition
- **Reference Benchmark:** [TAM Agronomis Bawang Merah Indonesia](https://tam-agronomis-bawang-merah-indonesia.ai.studio/)
- **Target User:** Business Development, Agri-Input Manufacturers (Seed, Fertilizer, Crop Protection, AgTech), Distributors, Financial/Investment Analysts, & Commercial Strategy Teams.

---

## 1. EXECUTIVE SUMMARY & BUSINESS OBJECTIVES

### 1.1 Background & Strategic Intent
The Indonesian agricultural sector represents a multitrillion-rupiah economic ecosystem encompassing food crops (*tanaman pangan*), horticulture (*tanaman hortikultura*), plantation crops (*perkebunan*), and floriculture (*florikultura*). However, market actors—including agrochemical providers, fertilizer formulators, seed breeders, mechanization providers, and agricultural off-takers—regularly encounter severe blind spots when evaluating commercial viability, territorial expansion, and product go-to-market strategies:
1. **Uncalibrated TAM Claims:** Traditional market research often conflates national gross harvests with realistic commercial target addressability.
2. **Missing Micro-Macro Reconciliation:** Discrepancies between national aggregated statistics and provincial/district reports create planning errors.
3. **Absence of Sequential Filtering:** Failure to separate subsistence farming, low-input traditional plots, and distribution dead zones from truly accessible commercial acreage.
4. **Lack of Transparent Audit Trails:** Market figures frequently lack traceable publication metadata, catalog numbers, and calculation integrity flags.

### 1.2 Core Purpose
This product delivers a centralized **Market Intelligence, Reporting, and Research Platform** designed to analyze the market size, reception, and penetration pathways across **13 strategic commodities** in Indonesia:
- **Food Crops (2):** Padi (Rice), Jagung (Corn).
- **Horticultural Vegetables & Fruits (7):** Cabai (Chili - Besar & Rawit), Bawang Merah (Shallot), Kentang (Potato), Kubis (Cabbage), Tomat (Tomato), Semangka (Watermelon), Melon (Melon).
- **Estate & Plantation Crops (2):** Kelapa Sawit (Oil Palm), Tembakau (Tobacco).
- **Perennial Fruit (1):** Alpukat (Avocado).
- **Floriculture (1):** Anggrek (Orchid).

### 1.3 Strategic Value Proposition
- **Rigorous 3-Tier Sizing:** Mathematical modeling connecting macro TAM (gross agronomic footprint) to SAM (commercially viable and addressable farming) down to SOM (executable market capture based on supply chain and commercial capacity).
- **Official BPS & Ministry of Agriculture Grounding:** 100% anchored in verified Badan Pusat Statistik (BPS) publications (KSA, SPH, ST2023, Statistik Perkebunan, Statistik Hortikultura), complete with catalog numbers, ISSNs, and document URLs.
- **Menu-by-Menu Granular UX:** Multi-perspective exploration enabling national overviews, single-commodity drilldowns, provincial rankings, district cluster hotspots, interactive multi-driver SAM calculators, and actionable penetration playbooks.

---

## 2. MARKET SIZING METHODOLOGY: TAM, SAM, SOM FRAMEWORK

The platform enforces a standardized, scientifically disciplined market sizing model across all 13 commodities.

```
+-------------------------------------------------------------------------+
| TOTAL ADDRESSABLE MARKET (TAM)                                          |
| Total Physical Agronomic Footprint in Indonesia                         |
| Luas Panen (Ha), Produksi (Ton), Produktivitas (Ton/Ha), Farm-gate IDR  |
+-------------------------------------------------------------------------+
                                    |
                    R1: Commercial Orientation Rate (%)
                                    v
+-------------------------------------------------------------------------+
| ACTIVE COMMERCIAL CULTIVATION                                            |
| Crops grown for cash sale vs. subsistence household consumption        |
+-------------------------------------------------------------------------+
                                    |
                    R2: Purchased Input Addressability Rate (%)
                                    v
+-------------------------------------------------------------------------+
| PURCHASED INPUT ADDRESSABILITY                                           |
| Farmland utilizing commercial inputs (certified seed, fertilizer, CP)  |
+-------------------------------------------------------------------------+
                                    |
                    R3: Economic Affordability & Solvency Rate (%)
                                    v
+-------------------------------------------------------------------------+
| SERVICEABLE AVAILABLE MARKET (SAM)                                      |
| Farmland with viable R/C ratio (>1.2) + within physical retail reach   |
| (R4: Geographic & Channel Serviceability Rate)                          |
+-------------------------------------------------------------------------+
                                    |
                    R5: Realizable Market Penetration Rate (%)
                        (Internal capacity, brand, field force)
                                    v
+-------------------------------------------------------------------------+
| SERVICEABLE OBTAINABLE MARKET (SOM)                                     |
| Realistically captured hectarage, volume, and revenue over 1-3 years    |
+-------------------------------------------------------------------------+
```

### 2.1 Total Addressable Market (TAM) — The Whole Pond
- **Definition:** The total gross agronomic footprint of a given commodity across all 38 provinces in Indonesia.
- **Metrics Tracked:**
  - Annual Cumulative Harvested Area (`Luas Panen` in Hectares/year).
  - Total Harvest Volume (`Produksi` in Metric Tons).
  - Crop Yield / Land Productivity (`Produktivitas` in Ton/Ha or Kuintal/Ha).
  - Gross Farm-gate Production Value (`Estimasi Nilai Bruto Panen` in Trillion IDR = Production Volume × Producer Farm-gate Price).
- **Rule of Non-Conflation:** TAM is strictly an agronomic denominator. It does not factor in brand-specific dosage, market share, or corporate sales targets.

### 2.2 Serviceable Available Market (SAM) — The Accessible Catchment
- **Definition:** The subset of TAM that meets commercial qualification, consumes market-purchased inputs, exhibits economic solvency, and sits within reach of active distribution channels.
- **Sequential Multi-Driver Formula:**
  $$\text{SAM}_{\text{Ha}} = \text{TAM}_{\text{Ha}} \times R_1 \times R_2 \times R_3 \times R_4$$
  Where:
  - **$R_1$ (Active Commercial Cultivation Rate):** Percentage of harvested area intended for commercial monetization rather than self-subsistence or seed retention.
  - **$R_2$ (Purchased Input Addressability Rate):** Percentage of farmers purchasing manufactured agro-inputs (formulated NPK/organic, chemical/biological crop protection, hybrid/certified seed/seedlings).
  - **$R_3$ (Economic Affordability & Solvency Rate):** Percentage of farms maintaining positive cash flow and healthy cost-benefit ratios (Revenue/Cost Ratio $R/C > 1.20$), ensuring liquidity to purchase quality inputs.
  - **$R_4$ (Geographic & Channel Serviceability Rate):** Physical reachability via licensed farm kiosks (KPL), agri-dealers, village farmer cooperatives (Gapoktan), and agricultural extension centers (BPP).

### 2.3 Serviceable Obtainable Market (SOM) — The Realizable Catch
- **Definition:** The realistic share of SAM that a commercial provider (e.g., input manufacturer, off-taker, or agritech platform) can capture within a 1- to 3-year operating horizon based on tangible internal constraints.
- **Calculation Formulation:**
  $$\text{SOM}_{\text{Ha}} = \text{SAM}_{\text{Ha}} \times \text{Penetration Rate Target} (\%)$$
  $$\text{SOM}_{\text{Revenue}} = \text{SOM}_{\text{Ha}} \times \text{Input Intensity Spending per Hectare (IDR/Ha)}$$
- **Gating Factors:**
  - Field Sales Force & Technical Agronomist (DAP/BA) deployment capacity.
  - Distribution network depth (number of active stocking retail kiosks).
  - Working capital and trade credit terms (*Tempo* repayment cycles aligned with harvest dates).
  - Competitive displacement velocity vs. established incumbent brands.

---

## 3. COMMODITY SCOPE & TAXONOMY (13 COMMODITIES)

The 13 commodities span 4 distinct agricultural sectors with specific agronomic boundaries:

| No | Commodity Name | Scientific Name | Sector | Key Units | Official BPS Boundary & Exclusions |
|:---|:---|:---|:---|:---|:---|
| 1 | **Padi** (Rice) | *Oryza sativa* | Tanaman Pangan | Ha, Ton GKG, Ton Beras | Includes Padi Sawah & Padi Ladang (GKG). Excludes processed rice products and wild varieties. |
| 2 | **Jagung** (Corn) | *Zea mays* | Tanaman Pangan | Ha, Ton Pipilan Kering (14% KA) | Pipilan kering KA 14%. Excludes sweet corn for table use (*jagung manis*) and silage fodder. |
| 3 | **Cabai** (Chili) | *Capsicum annuum* & *C. frutescens* | Hortikultura | Ha, Ton Segar | Includes Cabai Besar (TW, Teropong, Keriting) & Cabai Rawit. Excludes paprika and processed chili. |
| 4 | **Bawang Merah** (Shallot) | *Allium cepa var. aggregatum* | Hortikultura | Ha, Ton Umbi Kering | Strictly shallots. Excludes bawang putih (garlic), bawang bombai (onion), and daun bawang (scallion). |
| 5 | **Kentang** (Potato) | *Solanum tuberosum* | Hortikultura | Ha, Ton Umbi Segar | Table potatoes (Granola, Atlantic). Excludes ubi jalar (sweet potato) and singkong (cassava). |
| 6 | **Kubis** (Cabbage) | *Brassica oleracea var. capitata* | Hortikultura | Ha, Ton Krop Segar | Head cabbage (*kubis krop*). Excludes sawi putih (chinese cabbage), pakcoy, and broccoli. |
| 7 | **Tomat** (Tomato) | *Solanum lycopersicum* | Hortikultura | Ha, Ton Buah Segar | Fresh tomatoes (table & processing). Excludes tomat ceri and canned tomato products. |
| 8 | **Semangka** (Watermelon) | *Citrullus lanatus* | Hortikultura Buah | Ha, Ton Buah Segar | Watermelon (seeded & seedless). Excludes melon and labu air. |
| 9 | **Melon** (Melon) | *Cucumis melo* | Hortikultura Buah | Ha, Ton Buah Segar | Cantaloupe, rock melon, honeydew, golden melon. Excludes semangka and timun suri. |
| 10 | **Kelapa Sawit** (Oil Palm) | *Elaeis guineensis* | Perkebunan | Ha (Total Areal 16,83M Ha), Ton TBS (238,45M Ton) & CPO (47,69M Ton) | Total national plantation area (16.835.000 Ha: TM 14,12M Ha + TBM/TTM 2,715M Ha). Primary agricultural farm-gate value is anchored in Fresh Fruit Bunches (TBS @ Rp 2.650/kg = Rp 631,89 T) with mill-level CPO (47,69M Ton @ Rp 13.250/kg) recorded as secondary downstream processing metric. Excludes kelapa dalam (coconut) and palm kernel shell waste. |
| 11 | **Alpukat** (Avocado) | *Persea americana* | Buah Tahunan | Pohon Menghasilkan, Ton Buah | Productive trees & fruit output. Excludes seedling nursery stock prior to field transplanting. |
| 12 | **Tembakau** (Tobacco) | *Nicotiana tabacum* | Perkebunan Semusim | Ha, Ton Daun Kering | Virginia, Vorstenlanden, Kasturi, Madura dried leaves. Excludes manufactured cigarettes/kretek. |
| 13 | **Anggrek** (Orchid) | *Orchidaceae* | Florikultura | Tangkai Bunga Potong, Tanaman Pot | Dendrobium, Phalaenopsis, Vanda cut stems & potted plants. Excludes wild uncultivated forest species. |

---

## 4. DATA ARCHITECTURE, INTEGRITY & RECONCILIATION PROTOCOL

### 4.1 Data Sources & Extraction Standards
All quantitative baseline metrics are retrieved through disciplined protocols from official primary publications:
1. **Badan Pusat Statistik (BPS RI):**
   - *Survei Kerangka Sampel Area (KSA) Padi dan Jagung* (Subround 1, 2, 3, ATAP).
   - *Statistik Hortikultura Indonesia* (Buku Angka Tetap Hortikultura, Katalog: 5204003).
   - *Statistik Tanaman Sayuran dan Buah-buahan Semusim* (Katalog: 5205001).
   - *Statistik Kelapa Sawit Indonesia* (Katalog: 5205011).
   - *Statistik Perkebunan Indonesia: Tembakau* (Katalog: 5205019).
   - *Statistik Tanaman Hias Indonesia* (Katalog: 5205023).
   - *Sensus Pertanian 2023 (ST2023) Tahap I & II* (Profil Usaha Pertanian Perorangan / UTP).
2. **Kementerian Pertanian RI (Ditjen TP, Ditjen Hortikultura, Ditjen Perkebunan):**
   - *Buku Rekomendasi Alokasi & Rekonsiliasi Komoditas Pertanian Nasional*.
   - *Satu Data Pertanian (SDP)* API and statistical datasets.

### 4.2 Data Integrity Flagging & Metadata Schema
Every single numeric metric in the platform repository must carry an immutable 8-point metadata signature:

```json
{
  "commodity_id": "COMM_04_SHALLOT",
  "region_level": "PROVINCE",
  "region_code": "33",
  "region_name": "JAWA TENGAH",
  "district_clusters": ["Brebes", "Demak", "Kendal", "Pati", "Grobogan"],
  "year": 2024,
  "indicator_type": "HARVEST_AREA",
  "unit": "HECTARE",
  "value": 53900.00,
  "audit_status": "VERIFIED_VALUE",
  "reconciliation_status": "PASS",
  "source_document": "Buku Angka Tetap Hortikultura 2024, Tabel 2.10",
  "source_catalog": "5204003",
  "source_url": "https://bps.go.id/id/publication/2025/statistik-hortikultura-2024",
  "verified_at": "2026-05-14"
}
```

#### Status Classification Codes:
- `VERIFIED_VALUE`: Value directly extracted from an official BPS table or ATAP gazette without modification.
- `CALCULATED`: Mathematical derivation using verified values (e.g., Productivity = $\text{Produksi} \div \text{Luas Panen}$; Gross Value = $\text{Volume} \times \text{Price}$).
- `ESTIMATED`: Analytical projection derived from econometric models or validated proxy surveys (e.g., SAM filter ratios from ST2023).
- `NOT_REPORTED`: Officially recorded as blank/unreported in source documentation (strictly prohibited from being arbitrarily replaced with zero).

### 4.3 Gate-0 Macro-Micro Reconciliation Engine
The system enforces a strict 2-Level mathematical reconciliation protocol:

#### Level 1: Macro Aggregate Reconciliation (Header vs. Sum of 13 Strategic Crops)
Validates that the top-line national headers displayed across all dashboard views equal the exact sum of all 13 underlying commodity records:
- **Macro TAM Footprint:** $\text{TAM}_{\text{Header}} (30.451.874 \text{ Ha}) = \sum_{c=1}^{13} \text{TAM}_c (30.451.874 \text{ Ha})$ | $\Delta = 0 \text{ Ha } (0.0000\%)$
- **Macro SAM Addressability:** $\text{SAM}_{\text{Header}} (21.185.714 \text{ Ha}) = \sum_{c=1}^{13} \text{SAM}_c (21.185.714 \text{ Ha})$ | $\Delta = 0 \text{ Ha } (0.0000\%)$
- **Gross Farmgate Value:** $\text{Farmgate}_{\text{Header}} (\text{Rp } 1.276,46 \text{ T}) = \sum_{c=1}^{13} \text{Farmgate}_c$ | $\Delta = \text{Rp } 0 (0.0000\%)$
- **Input Market SAM Value:** $\text{InputMarket}_{\text{Header}} (\text{Rp } 204,22 \text{ T}) = \sum_{c=1}^{13} \text{InputMarket}_c$ | $\Delta = \text{Rp } 0 (0.0000\%)$

#### Level 2: Spatial Provincial Reconciliation (National vs. Sum of 38 Provinces)
Prior to model generation, the system validates the sum of all 38 provinces against the national top-line figure for each commodity:
$$\Delta_{\text{Absolut}} = |\text{TAM}_{\text{Nasional Resmi}} - \sum_{i=1}^{38} \text{TAM}_{\text{Provinsi } i}|$$
$$\Delta_{\%} = \frac{\Delta_{\text{Absolut}}}{\text{TAM}_{\text{Nasional Resmi}}} \times 100\%$$
- **PASS Threshold:** $\Delta_{\%} \le 0.05\%$.
- **WARNING Threshold:** $0.05\% < \Delta_{\%} \le 0.50\%$.
- **FAIL Threshold:** $\Delta_{\%} > 0.50\%$ (blocks export and marks provisional status).

*Methodological Transparency Note:* To ensure full analytical rigor, provincial distributions distinguish between:
1. **Direct Enumeration:** Commodities with comprehensive provincial surveys published directly by BPS (Padi & Jagung via KSA; Cabai, Bawang Merah, Kentang, Kubis, Tomat via SPH Hortikultura).
2. **Standardized Census Allocation:** Commodities where sub-provincial records are compiled via Ditjen Perkebunan/Ditjen Hortikultura census registries (Kelapa Sawit, Tembakau, Semangka, Melon, Alpukat, Anggrek), ensuring zero statistical drift while reflecting actual agro-climatic corridor concentrations.

---

## 5. UI/UX SYSTEM & MENU-BY-MENU SPECIFICATION (VOLUM-ADMIN ARCHITECTURE)

The application user interface and experience strictly adhere to the **`volum-admin`** design system (`ongkipro/volum-admin`):
- **Core Architecture:** React 19 + TypeScript + Vite + Tailwind CSS v4.
- **Design System Tokens:** Native OKLCH color space (`--primary`, `--card`, `--muted`, `--accent`, `--border`, `--chart-1` to `--chart-5`) with automatic Light / Dark mode toggling.
- **Navigation Shell:** Inset collapsible sidebar (`<AppSidebar>`), Topbar with breadcrumb navigation, global Command Palette (`cmdk`), Theme switcher, and Config Drawer.
- **Data Tables:** Powered by `@tanstack/react-table` with multi-column sorting, faceted filters (Sektor, Wilayah, Status Rekonsiliasi, Subround), search input, pagination, and bulk export.
- **Visualization Engine:** High-performance `recharts` responsive charts styled with OKLCH theme variables.
- **Form Controls:** `react-hook-form` + `zod` validation + Radix UI primitive sliders for interactive simulation.

```
+-----------------------------------------------------------------------------------------------+
| TOPBAR: Volum Agri Intel | Breadcrumb: Dashboard > Bawang Merah | [Search ⌘K] | [Theme Toggle] |
+-----------------------------------------------------------------------------------------------+
| SIDEBAR (volum-admin)      | MAIN CONTENT VIEWPORT                                            |
|                            |                                                                 |
| [1] Executive Dashboard    | [KPI Telemetry Bar: Total TAM Ha | SAM Ha | SOM IDR | Crops 13]  |
| [2] Commodity Explorer     | +-------------------------------------------------------------+ |
|   - Padi (Rice)            | | Sub-Tabs: [Agronomics] [Districts] [Subround] [SAM/SOM]     | |
|   - Jagung (Corn)          | +-------------------------------------------------------------+ |
|   - Cabai (Chili)          |                                                                 |
|   - Bawang Merah           | [volum-admin Card Grid & High-Density TanStack Tables]          |
|   - Kentang (Potato)       | - Macro Harvest & Production Trend Curves (Recharts AreaChart)  |
|   - Kubis (Cabbage)        | - Top 10 Provincial Pareto & District Quantitative Hotspots     |
|   - Tomat (Tomato)         | - Subround 1-3 Temporal Calendar & Pre-Season Buying Waves      |
|   - Semangka (Watermelon)  | - ST2023 Farmer Typology & Input Decomposition Breakdown        |
|   - Melon (Melon)          |                                                                 |
|   - Kelapa Sawit (Palm)    | +-------------------------------------------------------------+ |
|   - Alpukat (Avocado)      | | Price Ladder (Farm-Gate -> Wholesale -> Retail) & Margin     | |
|   - Tembakau (Tobacco)     | +-------------------------------------------------------------+ |
|   - Anggrek (Orchid)       |                                                                 |
| [3] Spatial & Geospatial   | +-------------------------------------------------------------+ |
| [4] Dynamic SOM Simulator  | | Internal Capacity SOM Simulator (Sales, Kiosks, Tempo Credit)| |
| [5] Cross-Commodity Matrix | +-------------------------------------------------------------+ |
| [6] Market Playbook        |                                                                 |
| [7] Audit & Source Ledger  |                                                                 |
| [8] Export & Reporting     |                                                                 |
+-----------------------------------------------------------------------------------------------+
```

### 5.1 Menu 1: Executive Dashboard (Macro Overview)
- **Target Audience:** C-Suite, Heads of Strategy, Commercial Directors.
- **Components:**
  1. **Top-Level KPI Cards (`volum-admin` Card pattern):**
     - National Aggregate TAM (30,45M Hectares).
     - National Aggregate SAM (20,98M Qualified Addressable Hectares).
     - Total Farm-gate Gross Value (Rp 1.276,46 Trillion IDR).
     - Aggregate Input Market Potential (Rp 204,22 Trillion IDR annual spend).
  2. **Crop Sector Distribution Matrix:** Recharts Pie/Donut and TreeMap grouping crops by sector (Food Crops, Veg/Fruit Horti, Estate Crops, Flori).
  3. **High-Growth vs. Stagnant Quadrant:** Scatter plot mapping 5-year Harvest CAGR (%) vs. Productivity Growth (%).
  4. **Geographic Concentration Heatmap:** Provincial concentration showing Java (50-78% of horti/padi) vs. Outer Islands (95% of palm/plantation) agrarian density.

### 5.2 Menu 2: Commodity Explorer (13 Dedicated Sub-Menus)
Each commodity possesses its own dedicated sub-menu following an identical, rigorous 6-tab structure:
- **Tab A: Executive Agronomic Summary:**
  - Standardized benchmark table (Harvest Area, Volume, Yield, Farm-gate Value, YoY change).
  - Gate-0 Reconciliation badge (`RECONCILED: PASS — 0.0000% Deviation`).
- **Tab B: Spatial 38-Province Table & District Micro-Data (Gap 1):**
  - TanStack Table with 38-Province data + expandable sub-rows showing top 3–5 producing **Kabupaten/Kota** with exact quantitative Hectares and Tonnage.
- **Tab C: Temporal Subround & Seasonal Calendar (Gap 2):**
  - Subround 1 (Jan-Apr), Subround 2 (May-Aug), Subround 3 (Sep-Dec) % volume distribution.
  - Planting windows, harvest peaks, and pre-season buying windows for input distribution.
- **Tab D: Farmer Typology & Input Decomposition (Gaps 3 & 4):**
  - ST2023 landholding distribution: Petani Gurem (<0.5 ha), Menengah (0.5–2 ha), Korporasi/Besar (>2 ha).
  - Input spending breakdown per hectare: Insektisida, Fungisida, Herbisida, Pupuk NPK Makro, Pupuk Mikro/Foliar, dan Benih/Bibit.
- **Tab E: Price Ladder & Farmer's Share (Gap 6):**
  - Price comparison: Farm-Gate (Petani) vs. Wholesale (Pasar Induk) vs. Retail (Konsumen).
  - Farmer's share calculation and price volatility index.
- **Tab F: Market Penetration Playbook:**
  - Channel architecture (KPL density, Poktan dynamics, Tengkulak vs. Off-taker control).
  - Concrete GTM barriers & tactical counter-strategies.

### 5.3 Menu 3: Spatial & Geospatial Mapping Engine
- **Choropleth Visualizer:** Color-coded 38-province map of Indonesia with choropleth intensity based on:
  - Total Harvest Area (Ha).
  - Total Production Volume (Ton).
  - Average Yield (Ton/Ha).
  - Qualified SAM Acreage (Ha).
- **Interactive Tooltip & Province Selection:** Hovering over or clicking any of the 38 provinces initiates territorial inspection.
- **Hierarchical Drilldown Architecture (Nasional -> 38 Provinsi -> Rincian Kabupaten/Kota):**
  - **Dynamic Drilldown Transition:** When a province is clicked, the geospatial interface switches from the national overview into a granular **District-Level (Kabupaten/Kota) Agronomic Heatmap & Data Table**.
  - **Comprehensive Regency Roster (514 Kab/Kota):** Encompasses full coverage of authentic Indonesian regencies per province (e.g. 27 Kab/Kota in Jawa Barat, 38 in Jawa Timur, 35 in Jawa Tengah, 33 in Sumatera Utara, 24 in Sulawesi Selatan, 12 in Riau, 17 in Sumatera Selatan, 15 in Lampung, 10 in NTB, 23 in Aceh, 22 in NTT).
  - **Micro Sub-District Clusters (Kecamatan Sentra):** Each key agricultural hub includes verified sub-district cluster annotations (e.g. Indramayu: Kandanghaur, Anjatan, Losarang; Brebes: Larangan, Wanasari, Bulakamba; Nganjuk: Bagor, Sukomoro, Rejoso; Kediri: Pare, Plemahan; Tuban: Merakurak, Semanding; Rokan Hulu: Tambusai, Ujung Batu) for precise sales territory routing.
  - **Breadcrumb & Swift Navigation:** Features a prominent `← Kembali ke Peta 38 Provinsi` toggle alongside a direct province selector dropdown to seamlessly explore neighboring provinces without navigating back to the root.
  - **Provincial Macro Header:** Summarizes provincial Harvest Area (Ha), Production Volume (Ton), Average Yield (Ton/Ha), National Share (%), KPL Kiosk Density, and count of tracked regencies.
  - **Intra-Provincial Visual Density Grid:** Kabupaten cards with proportional color badges reflecting intra-provincial production contribution (Top Hubs, Secondary Centers, Buffer Districts).
  - **Detailed Kabupaten Agronomic Table:** TanStack table with live search by regency/subdistrict name, multi-column sorting (Production, Area, Yield, Alphabetical), status classification badges (`Sentra Utama #1`, `Sentra Utama`, `Sentra Penyangga`, `Potensial`), percentage progress bars, sub-district cluster annotations, and localized commercial action recommendations.
  - **Dedicated Provincial Sidebar Telemetry:** Dynamically updates the side drawer to calculate intra-provincial Pareto concentration (e.g. Top 3 districts controlling X% of provincial volume), territorial agronomist deployment ratios, and depot stocking suggestions.
  - **Parallel Mathematical Integrity & Gate-0 Reconciliation:** Enforces zero undefined/NaN invariants, strict positivity, and exact reconciliation ($\sum \text{districts} = \text{provincial total}$) across all 13 commodities and all 38 provinces.


### 5.4 Menu 4: Dynamic SOM Simulation Engine (Gap 7)
- **Purpose:** Transforms static SAM into an executable, realistic Serviceable Obtainable Market (SOM) by incorporating internal commercial company constraints.
- **Input Variables (User Configuration Drawer):**
  1. $N_{\text{sales}}$: Active Field Agronomists / Sales Representatives.
  2. $C_{\text{rep}}$: Capacity of supported hectares per agronomist (2,500 – 4,000 Ha/rep).
  3. $N_{\text{kiosk}}$: Active retail kiosk partner accounts.
  4. $S_{\text{tempo}}$: Allocated working capital credit line for *yarnen* / tempo repayment terms.
  5. Target Penetration Rate (% of SAM).
- **Engine Formulation:**
  $$\text{SOM}_{\text{Capacity Ha}} = \min \left( \text{SAM}_{\text{Ha}} \times \text{PenetrationTarget}\%, \; N_{\text{sales}} \times C_{\text{rep}}, \; N_{\text{kiosk}} \times \text{AvgKioskVolume} \right)$$
  $$\text{SOM}_{\text{Revenue IDR}} = \text{SOM}_{\text{Capacity Ha}} \times \text{Input Spend per Ha (IDR)}$$
- **Outputs:** Real-time recalculation of executable Hectares, Revenue Potential, Required Tempo Financing, and Target Kiosk Network.

### 5.5 Menu 5: Cross-Commodity Benchmark & Attractiveness Matrix
- Multi-crop comparative table scoring all 13 commodities across 6 strategic vectors:
  1. Market Scale (Total Value IDR).
  2. Input Intensity (Spending on crop protection/nutrition per Ha).
  3. Margin Health (Farmer R/C ratio & Farmer's share).
  4. Seasonal Turnover (Crops per year / cycle length).
  5. Policy & Subsidy Headwind (Sensitivity to fertilizer subsidy regulations).
  6. Climate Resilience (El Nino / La Nina vulnerability index).
- Multi-crop comparative table scoring all 13 commodities across 5 strategic vectors:
  1. Market Scale (Total Value IDR).
  2. Input Intensity (Spending on crop protection/nutrition per Ha).
  3. Margin Health (Farmer R/C ratio).
  4. Seasonal Turnover (Crops per year / cycle length).
  5. Policy & Subsidy Headwind (Sensitivity to fertilizer subsidy regulations).

### 5.6 Menu 6: Strategic Market Penetration Playbook & Commercial Playbook
- Cross-commodity tactical library detailing:
  - Seed-to-Harvest cycle management.
  - Credit & liquidity structures (e.g., *Yarnen* / bayar panen systems).
  - Digital channel penetration (agritech adoption among millennial farmers).
  - Regulatory compliance standards (Kementan registration, distribution permits).

### 5.7 Menu 7: Audit Trail & Official Source Ledger
- Complete searchable, filterable repository of every source publication cited across the 13 commodities.
- Direct outbound links to BPS publications, catalog numbers, release dates, and verification timestamps.

### 5.8 Menu 8: Export & Reporting Engine
- **Instant Markdown Exporter:** Generates full publication-ready `.md` executive reports for any single crop or national aggregate.
- **CSV Data Exporter:** One-click downloads for 38-province datasets formatted for BI tools (PowerBI, Tableau, Excel).

### 5.9 Menu 9: Digital Advertising Intelligence & Growth Engine (Meta & Google Ads)
- **Buyer Personas & Demographics:**
  - 5 segmented agricultural buyer profiles: Petani Maju & Komersial, Petani Tradisional/Gurem, Juragan Kios Pertanian Lengkap (KPL), Mandor & Pengelola Kebun Sawit, and Hobiis Urban Farming & High-Value Florikultura.
  - Granular demographic profiles: Age distribution, digital behavior, primary hardware/OS, payment channel preferences (COD vs. Transfer/QRIS), and peak browsing hours (05:00-06:30 Subuh, 11:30-13:00 Istirahat Sawah, 18:30-21:00 Lepas Maghrib).
- **Competitor Ad Library Spy Matrix:**
  - In-depth ad intelligence across 8 multinational and national agrochemical/seed brands: Syngenta, Bayer CropScience, FMC Corporation, Corteva Agriscience, DGW (Dharma Guna Wibawa), Petrokimia Gresik, PT Advansia Indotani, and PT Bisi International Tbk.
  - Active formats breakdown (Video Demoplot, UGC Testimonial Petani, Carousel Masalah-Solusi, Static Infografis Dosis).
  - Teardown of high-performing competitor hooks, offer structures, and CTA funnels.
- **Creative Formats & Copywriting Playbook:**
  - Agricultural 5-step copywriting blueprint: *1. Hook Masalah Lapangan*, *2. Validasi Emosional & Bukti Lokal*, *3. Mekanisme Kerja Unik (Bahan Aktif/Formulasi)*, *4. Edukasi Dosis & Cara Aplikasi*, *5. CTA Langsung (WhatsApp Kios/Beli Online COD)*.
  - Battle-tested ad script templates for Cabai, Padi, Bawang Merah, and Kelapa Sawit.
- **Google Ads High-Intent Search Architecture:**
  - Three-tier intent taxonomy: Tier 1 (Urgent Problem & Diagnostic: e.g. "obat patek cabai paling ampuh"), Tier 2 (Product Comparison & Active Ingredient: e.g. "dosis amistar top per tangki"), Tier 3 (Commercial & Transactional: e.g. "distributor benih bisi 18 resmi").
  - Search volume, average CPC benchmark (IDR 850 - IDR 3,200), and comprehensive negative keyword exclusion lists (skripsi, makalah, pdf, dinas pertanian, lowongan kerja).
- **Campaign Budget, CPL & RoAS Financial Simulator:**
  - Interactive calculator for digital agro-input customer acquisition: Target crop input budget, estimated CPM (IDR 15,000 - 32,000), CTR (1.8% - 3.5%), WhatsApp lead conversion rate, closing rate via kios/COD, and expected Customer Lifetime Value (LTV).

### 5.10 Menu 10: Field Operations & Agronomist Task Execution (`/tasks`)
- **Agronomic Field Task Dataset:** Curated operational tasks spanning Demoplots & Field Days, KPL Retail Kiosk Audits, Rapid OPT Outbreak Emergencies, and Digital Ads Lead follow-ups.
- **Multi-View Execution Architecture:**
  - *Comprehensive Table View*: TanStack table with search, sorting, URL-synced pagination, and bulk actions.
  - *Kanban Pipeline Board*: 4-column visual board (Backlog, Todo, In Progress, Done) with priority cards and assignee indicators.
  - *Field Dispatch Calendar*: 7-day operational schedule for regional agronomists and field teams.
  - *OPT Outbreak Incident Desk*: Rapid incident logging and emergency dispatch for critical pest infestations.
- **Field Health KPI Summary:** Real-time metrics tracking Active Field Tasks, Active Demoplots, Pending KPL Audits, Critical OPT Alerts, and Monthly Completion Rate.

---

## 6. NON-FUNCTIONAL REQUIREMENTS & ENGINEERING SPECIFICATIONS

1. **Performance & Rendering:** Client-side data indexing must render table queries and choropleth re-shading within `< 100ms` for seamless UX.
2. **Deterministic Reproducibility:** All SAM/SOM mathematical calculations must execute client-side using deterministic pure functions without rounding drift ($>0.0001\%$).
3. **Data Freshness & Auditing:** Automated schema verification ensures every numeric node contains complete source lineage metadata before UI compilation.
4. **Responsive Layout:** Responsive down to tablet/laptop screen widths ($1024px \times 768px$) with optimized high-density data tables and touch targets $\ge 44px$.

---

## 7. EXECUTION ROADMAP & MILESTONES

- [x] **Phase 1: Architecture & PRD Staging:** Complete system specification, PRD drafting, and methodology formalization.
- [x] **Phase 2: Deep Research & Commodity Dossier Construction:** Thorough verification of all 13 commodities using official BPS/Kementan statistics, establishing province-by-province datasets, SAM drivers, economics, and GTM playbooks.
- [x] **Phase 3: Master Synthesis Compilation:** Cross-commodity comparative tables, aggregate sizing, and strategic matrix.
- [x] **Phase 4: UI/UX Front-End Implementation:** React 19 / Tailwind v4 responsive dashboard build with Volum styling.
- [x] **Phase 5: Viewport Lock, Mobile Optimization & Navigation Polish:** Zero zoom jitter, fixed viewport, sticky columns, command menu pop-up search modal.
- [x] **Phase 6: Kalender Tanam Nasional:** 12-month planting and harvest seasonal matrix across 13 strategic crops.
- [x] **Phase 7: Digital Advertising Intelligence & Growth Engine:** Dedicated `/ads` engine covering Meta Ads, Competitor Spy Matrix, Buyer Personas, Creative Library, Google High-Intent Keywords, and RoAS Simulator.
- [x] **Phase 8: Field Operations Tasks Modernization & Multi-View Execution Engine:** Revamped agronomic task dataset, multi-view tabs (Table, Kanban, Agronomist Dispatch Calendar, OPT Outbreak Incident Desk), and KPI metrics.
- [x] **Phase 9: Data Integrity, Regulatory Calibration & Mathematical Audit:** Elimination of Kelapa Sawit macro deviation, Permentan 10/2022 policy alert accuracy, SOM capacity alignment, and Level 1 macro reconciliation.
- [x] **Phase 10: AI Slop Cleansing & Mobile Responsive Over-Width Hardening:** Elimination of generic LLM fluff, CSS flexbox min-w-0 layout defense, independent horizontal scroll wrappers for tables/tabs, and concise sidebar labels.
- [x] **Phase 11: Alpukat Crash Resolution, Calendar Phase Completeness & Commercial Fertilizer Selling Window:**
  * Fixed fatal `TypeError: Cannot read properties of undefined (reading 'toFixed')` on Alpukat by providing explicit national yield `21.96 Ton/Ha` in dataset and defensive fallback normalization.
  * Standardized National Cropping Calendar matrix to guarantee complete `PL` (Pengolahan Lahan / Persiapan) and `GN` (Generatif / Pembungaan / Pengisian) coverage across all 13 strategic crops, complete with 10-phase visual legend badges.
  * Engineered Commercial Fertilizer & Agrochemical Selling Window (*Waktu Terbaik Penjualan Pupuk & Saprodi*): 13-commodity structured dataset mapping golden selling windows, T-30/T-45 KPL kiosk booking timelines, priority input products (Kalsium Boron, MKP 0-52-34, KNO3 Putih, NPK 16-16-16, Kalium Sulfat ZK), regional distribution hubs, and agronomic rationale.
  * Integrated interactive Commercial Selling modules into both Commodity Explorer (Tab Subrounds with 12-month selling wave strip) and Kalender Tanam Nasional (monthly active selling opportunities card).



