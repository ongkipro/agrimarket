# TASKS & EXECUTION ROADMAP
## INDONESIA AGRICULTURAL MARKET INTELLIGENCE DASHBOARD (13 COMMODITIES)

- **Project Staging Slug:** `agrimarket`
- **Location:** `~/Documents/work/prd/agrimarket/`
- **Reference URL Benchmark:** [TAM Agronomis Bawang Merah Indonesia](https://tam-agronomis-bawang-merah-indonesia.ai.studio/)
- **Target Repository:** `~/Projects/agrimarket/`
- **Design System Benchmark:** [`ongkipro/volum-admin`](https://github.com/ongkipro/volum-admin)
- **Document Status:** PROMOTING TO DEVELOPMENT REPOSITORY

---

### Phase 1: Market Research, BPS Ingestion & Agronomic Modeling (COMPLETED)
- [x] **TASK-01:** Establish TAM/SAM/SOM mathematical framework and sequential multi-driver logic ($R_1-R_4$).
- [x] **TASK-02:** Conduct deep research on Padi (Rice): BPS KSA 2024 harvest area, production, 38-province breakdown, and economics (`01-padi.md`).
- [x] **TASK-03:** Conduct deep research on Jagung (Corn): BPS KSA 2024 pipilan kering 14% KA, hybrid seed adoption, feedmill drivers (`02-jagung.md`).
- [x] **TASK-04:** Conduct deep research on Cabai (Chili - Besar & Rawit): BPS horticulture data, high-intensity pesticide dynamics (`03-cabai.md`).
- [x] **TASK-05:** Conduct deep research on Bawang Merah (Shallot): 2024 reconciliation audit (188.584 Ha, 2,085M Ton), Brebes/Nganjuk hubs (`04-bawang-merah.md`).
- [x] **TASK-06:** Conduct deep research on Kentang (Potato): Highland Solanaceae data, Atlantic vs Granola, Dieng & Pangalengan clusters (`05-kentang.md`).
- [x] **TASK-07:** Conduct deep research on Kubis (Cabbage): High-volume vegetable data, Lembang & Wonosobo centers, export flows (`06-kubis.md`).
- [x] **TASK-08:** Conduct deep research on Tomat (Tomato): Hybrid seed Servo F1, calcium bloom economics, fresh market dynamics (`07-tomat.md`).
- [x] **TASK-09:** Conduct deep research on Semangka (Watermelon): Lowland sandy soil data, Banyuwangi hub, brix nutrition drivers (`08-semangka.md`).
- [x] **TASK-10:** Conduct deep research on Melon (Melon): Precision cucurbit data, netting & golden melon, greenhouse & open field (`09-melon.md`).
- [x] **TASK-11:** Conduct deep research on Kelapa Sawit (Oil Palm): 16,8M Ha total areal, TM/TBM breakdown, CPO & TBS values, Riau/Sumut/Kalteng (`10-kelapa-sawit.md`).
- [x] **TASK-12:** Conduct deep research on Alpukat (Avocado): 8,42M productive trees, Miki & Aligator varieties, off-season booster dynamics (`11-alpukat.md`).
- [x] **TASK-13:** Conduct deep research on Tembakau (Tobacco): 226k Ha plantation data, Virginia/Madura/Temanggung hubs, chlorine-free rules (`12-tembakau.md`).
- [x] **TASK-14:** Conduct deep research on Anggrek (Orchid): Floriculture data (stems & pots), Rawa Belong & Tangsel hubs, high-margin inputs (`13-anggrek.md`).
- [x] **TASK-15:** Compile Master Commodity Synthesis Matrix (`MASTER-COMMODITY-SYNTHESIS.md`).

---

### Phase 2: Product Requirements & UX Architecture (COMPLETED)
- [x] **TASK-16:** Author comprehensive Product Requirements Document (`PRD.md`) incorporating:
  - System goals and strategic objectives.
  - 13-commodity taxonomy and boundary definitions.
  - Data integrity classification (`VERIFIED_VALUE`, `CALCULATED`, `ESTIMATED`, `NOT_REPORTED`).
  - Menu-by-menu and screen-by-screen UX layout specifications (8 core views).
  - Gate-0 macro-micro reconciliation engine specification ($\le 0,05\%$ deviation threshold).
- [x] **TASK-16.1 (Parallel Enrichment):** Resolve the 8 complex data gaps in [`COMPLEX-DATA-ENGINE-SPEC.md`](file:///Users/ongki/Documents/work/prd/agrimarket/COMPLEX-DATA-ENGINE-SPEC.md):
  - Quantitative District/Kabupaten breakdown for top producing hubs across 13 commodities.
  - Subround 1-3 seasonal calendar and pre-season buying wave mapping.
  - ST2023 farmer typologies (gurem, menengah, korporasi) and credit yarnen dependence.
  - Input category decomposition (NPK, Foliar, Fungisida, Insektisida, Herbisida, Benih).
  - Physical distribution density (KPL kiosks, BPP centers, Poktan/Gapoktan).
  - Price ladder & farmer's share analysis.
  - Dynamic SOM Internal Capacity simulation engine formulation.
  - Climate vulnerability and water infrastructure indexing.
- [x] **TASK-16.2 (UI/UX Architecture Alignment):** Adopt `ongkipro/volum-admin` design system (React 19 + Tailwind CSS v4 + Radix UI + TanStack Router + TanStack Table + OKLCH color tokens + Recharts).
- [x] **TASK-16.3 (Machine-Readable Master Data Engine):** Compile and validate [`data/market-intel-dataset.json`](file:///Users/ongki/Documents/work/prd/agrimarket/data/market-intel-dataset.json) ready for direct consumption by frontend components.

---

### Phase 3: Staging Review & Development Authorization Gate (COMPLETED)
- [x] **TASK-17:** Deliver comprehensive Markdown research dossiers, Complex Data Spec, Master JSON Dataset, and PRD to Paduka Ongki for review.
- [x] **TASK-18:** Receive explicit development authorization from Paduka Ongki ("untuk nama agrimarket aja -> folder juga sempurnakan, lanjutkan ke task"). Ready to promote staged artifacts into `~/Projects/agrimarket/`.

---

### Phase 4: Frontend Implementation & Visual Engine (COMPLETED)
- [x] **TASK-19:** Scaffold React 19 / Vite / Tailwind CSS v4 / Radix UI workspace with `volum-admin` styling tokens.
- [x] **TASK-20:** Implement Navigation Sidebar, Top Telemetry Bar, Crop Selector pills, and Agrimarket branding.
- [x] **TASK-21:** Build Menu 1: Executive Dashboard (`/`):
  - 5 Macro KPI cards (TAM Ha, Farm-Gate Value IDR, SAM Ha, Input Market Value IDR, Gate-0 Status).
  - Sectoral breakdown (Pangan, Sayuran, Buah, Perkebunan, Florikultura) with Recharts bar & pie charts.
  - 13 Strategic commodities quick telemetry table with drilldown actions.
  - Strategic agronomic alerts (Permentan 10/2022 subsidy shift, La Nina pest threat, Yarnen credit risk).
- [x] **TASK-22:** Build Menu 2: Commodity Explorer (`/commodities`):
  - 13 dedicated crop views with 6 comprehensive tabs: Funnel & Economics, 38-Province & District Micro Data, Subrounds (SR 1-3) Calendar, Input Category Decomposition, ST2023 Farmer Typology & Price Ladder, and Commercial GTM Playbook.
- [x] **TASK-23:** Build Menu 3: Geospatial Map View (`/map`):
  - 38-Province regional heatmap across 6 major island groups (Sumatera, Jawa, Bali & Nusa Tenggara, Kalimantan, Sulawesi, Maluku & Papua).
  - Province detail drawer with harvest area, production, yield, national share, and active KPL kiosks.
- [x] **TASK-24:** Build Menu 4: Dynamic SOM Internal Capacity Simulator (`/simulator`):
  - Real-time interactive sliders for Sales Reps ($N_{\text{sales}}$), Kiosks Managed ($K_{\text{coverage}}$), Average Seasonal Sales, Working Capital Tempo Credit Ceiling, and Seasonality multiplier.
  - Real-time calculations of Realizable Revenue, Attainable Hectares, Market Share %, and working capital credit constraint triggers.
- [x] **TASK-25:** Build Menu 5: Cross-Commodity Attractiveness Matrix (`/matrix`):
  - Composite Attractiveness Scoring (0-100) across all 13 crops.
  - Scatter plot comparing chemical input intensity (Million IDR/Ha) vs Total Input Market Size (Trillion IDR).
  - Ranked tier classification (Tier 1 Priority, Tier 2 High Margin, Tier 3 Volume, Tier 4 Niche).
- [x] **TASK-26:** Build Menu 6: Distribution Infrastructure & KPL Kiosk Density (`/distribution`):
  - 38-Province census of active KPL licensed kiosks, BPP extension centers, and Poktan farmer groups.
  - Dealer credit risk tier categorization (Low, Medium, High).
- [x] **TASK-27:** Build Menu 7: BPS Data Audit Ledger & Export Center (`/audit`):
  - Gate-0 macro-micro reconciliation audit table comparing national totals against sum of 38 provinces.
  - Citations for BPS KSA, SPH, ST2023, Ditjenbun, and BI PIHPS publications.
  - Instant one-click exports: Master JSON, National 13-Commodities CSV, and 38-Provinces CSV.

---

### Phase 5: Verification & Gate-0 Testing (COMPLETED & VERIFIED)
- [x] **TASK-29:** Automated Gate-0 reconciliation unit tests executed in Vitest + Playwright:
  - 13 out of 13 commodities verified with 0.0000% deviation between national totals and 38-province sums.
  - All 137 tests passing cleanly (`pnpm run test`).
- [x] **TASK-30:** Full project delivery contract verification via `/Users/ongki/dotfiles/bin/project-check --full /Users/ongki/Projects/agrimarket`:
  - `OK pnpm run lint` (ESLint clean, 0 errors, 0 warnings).
  - `OK pnpm run test` (137 tests passed in 7.68s).
  - `OK pnpm run build` (`tsc -b && vite build` built in 790ms).
  - `OK delivery contract: all nine documents and .delivery/current.json present`.
  - `project-check: VERIFIED (3/3 checks passed)`.

---

### Phase 6: Kalender Tanam Nasional & Seasonal Procurement Wave Engine (COMPLETED)
- [x] **TASK-31:** Author comprehensive National Planting Calendar Specification ([`docs/spec/KALENDER-TANAM-NASIONAL.md`](file:///Users/ongki/Projects/agrimarket/docs/spec/KALENDER-TANAM-NASIONAL.md)) covering:
  - 12-Month master agronomic matrix across all 13 strategic crops (Januari – Desember).
  - Phase status taxonomy: Pengolahan Lahan (`PL`), Pembibitan (`SM`), Tanam Raya (`TN`), Vegetatif Cepat (`VG`), Generatif/Pengisian Buah (`GN`), Puncak Serangan OPT Kritis (`PT`), Panen Raya (`PN`), High Crop (`HC`), Low Crop (`LC`), Pemupukan Utama Sawit (`PF`), dan Bera Lahan (`BR`).
  - Deep agronomic cycles and input waves per crop (HST cycles, basal & top-dress fertilizer, specific pest outbreaks, and credit liquidation).
  - 4 Regional crop rotation patterns: Sawah Irigasi Teknis Jawa, Hortikultura Dataran Tinggi Vulkanik, Lahan Kering & Tadah Hujan, dan Perkebunan Kelapa Sawit.
  - Commercial execution timeline for Sales Agronomists & KPL Kiosks (T-60 Pre-season planning, T-30 Buffer Stocking, T-15 Temu Lapang, T0-T15 Tanam, T+45 Perlindungan Bunga/Buah, T+80 Temu Hasil Panen, T+100 Pelunasan Tempo Yarnen).
  - Synchronized canonical copy in `docs/spec/` and staging snapshot in `~/Documents/work/prd/agrimarket/KALENDER-TANAM-NASIONAL.md`.
- [x] **TASK-32:** Implement Interactive Kalender Tanam & Seasonal Wave View ([`src/routes/_authenticated/calendar/`](file:///Users/ongki/Projects/agrimarket/src/routes/_authenticated/calendar/index.lazy.tsx)):
  - Month selector (Jan – Des) with dynamic commercial action alerts (Input Wave, Peak Pest Surge, Liquidation Window).
  - 13-Crop x 12-Month visual status matrix grid with color-coded agronomic phases and legend.
  - Agro-ecosystem crop rotation deep-dive cards (Sawah Irigasi Teknis, Hortikultura Vulkanik, Lahan Tadah Hujan).
  - Nav link integrated into `sidebar-data.ts` under Market Sizing navigation group.

---

### Phase 7: Ads Market Research, Competitor Library & Digital Growth Engine (COMPLETED & VERIFIED)
- [x] **TASK-33:** Author comprehensive Digital Ads Specification ([`docs/spec/ADS-MARKET-RESEARCH.md`](file:///Users/ongki/Projects/agrimarket/docs/spec/ADS-MARKET-RESEARCH.md)) covering:
  - 5 Agricultural Buyer Personas (Petani Maju & Komersial, Petani Gurem, Juragan KPL, Mandor Sawit, Hobiis Urban/Florikultura).
  - Demographics & behavioral habits: age distribution, device/connectivity, payment preference (COD/Transfer), and peak browsing hours (Subuh, Istirahat Sawah, Lepas Maghrib).
  - Competitor Ad Library Spy Matrix across 8 agrochemical/seed brands (Syngenta, Bayer, FMC, Corteva, DGW, Petrokimia Gresik, Advansia, Bisi).
  - 5-Step Agricultural Copywriting Formula & battle-tested ad scripts.
  - Google Ads 3-Tier Search Intent taxonomy, search volume, CPC benchmarks, and negative keyword exclusion lists.
  - Budget, CPL & RoAS financial modeling framework.
  - Staging snapshot synchronized to `~/Documents/work/prd/agrimarket/ADS-MARKET-RESEARCH.md`.
- [x] **TASK-34:** Build Structured Ads Intelligence Dataset ([`src/data/ads-intelligence-dataset.json`](file:///Users/ongki/Projects/agrimarket/src/data/ads-intelligence-dataset.json)):
  - Complete JSON schema with personas, demographics, hourly browsing distribution, competitor ad library database, copywriting blueprints, Google search keyword clusters with CPC & volume, negative keywords, and benchmark metrics.
- [x] **TASK-35:** Data Provider & Types Extension ([`src/features/agri/ads-data-provider.ts`](file:///Users/ongki/Projects/agrimarket/src/features/agri/ads-data-provider.ts)):
  - TypeScript interfaces for Ads Personas, Competitor Ads, Copywriting Blueprint, Google Keywords, and RoAS parameters.
  - Query helpers, filter functions, and reactive calculators.
- [x] **TASK-36:** Implement Dedicated Growth Engine View ([`src/routes/_authenticated/ads/`](file:///Users/ongki/Projects/agrimarket/src/routes/_authenticated/ads/index.tsx)):
  - 5 Interactive Tabs:
    1. *Personas & Demographics*: Visual profiles, age charts, device breakdown, and 24-hour activity heatmap.
    2. *Meta Ads Creative Library*: Filterable ad creatives, video/carousel teardowns, hook breakdowns, and instant copy generator.
    3. *Google Ads High-Intent Keywords*: 3-Tier search matrix table, monthly volume, CPC ranges, intent tags, and negative keyword export.
    4. *Competitor Spy Matrix*: Brand comparison cards, active ad count, primary channel, key hooks, strengths/weaknesses.
    5. *Campaign Budget & RoAS Simulator*: Dynamic sliders for budget, CPM, CTR, conversion rates, and real-time revenue/profit/RoAS projections.
- [x] **TASK-37:** Sidebar Navigation & Search Integration:
  - Add `Ads & Growth Engine` to `sidebar-data.ts` under Market Intelligence.
  - Register `/ads` and all 5 tabs in `command-menu.tsx`.
- [x] **TASK-38:** Full Quality Gate & Delivery Verification:
  - `pnpm run lint` (0 errors, 0 warnings).
  - `pnpm run test` (all 23 test files, 144 tests passing).
  - `pnpm run build` (successful compilation in 717ms).
  - `project-check --full /Users/ongki/Projects/agrimarket` (VERIFIED 3/3 checks passed).

---

### Phase 8: Field Operations Tasks Modernization & Multi-View Execution Engine (COMPLETED & VERIFIED)
- [x] **TASK-39:** Author comprehensive Field Operations Specification ([`docs/spec/FIELD-OPERATIONS-SPEC.md`](file:///Users/ongki/Projects/agrimarket/docs/spec/FIELD-OPERATIONS-SPEC.md)) covering:
  - 4 Operational Task Pillars (Demoplots & Field Days, KPL Dealer Audits & Credit Yarnen, Rapid OPT Outbreak Emergencies, and Digital Ads Lead Follow-ups).
  - Taxonomy of labels, status pipelines, and priority tiers.
  - Multi-view architecture design (Table, Kanban, Dispatch Calendar, OPT Desk).
  - Staging snapshot synchronized to `~/Documents/work/prd/agrimarket/FIELD-OPERATIONS-SPEC.md`.
- [x] **TASK-40:** Curate Agronomic Field Task Dataset & Expand Labels:
  - Modernize `src/features/tasks/data/tasks.ts` with 50+ realistic Indonesian field operations tasks (Demoplot Cabai Temanggung, Audit Kios KPL Nganjuk, Wereng Coklat Karawang, Temu Lapang Padi Indramayu, Follow-up 35 Leads WA Meta Ads Kediri).
  - Update `src/features/tasks/data/data.tsx` to include agricultural labels (`demoplot`, `kios_kpl`, `opt_hama`, `distribusi`, `ads_leads`) while preserving backwards compatibility for test fixtures (`feature`, `bug`, `documentation`).
- [x] **TASK-41:** Implement Multi-View Field Operations Hub (`src/features/tasks/index.tsx`):
  - 4 Operational KPI Summary Cards (Total Active Field Tasks, Demoplots Active, KPL Audits Pending, OPT Alerts Critical, Monthly Completion Rate).
  - 4 Interactive Multi-View Tabs:
    1. *Table View*: TanStack table with bulk actions, sorting, URL-synced pagination, and filterable columns.
    2. *Kanban Board*: 4-column visual board (Backlog, Todo, In Progress, Done) with priority indicators and assignee badges.
    3. *Agronomist Dispatch Calendar*: 7-day schedule of field agronomy visits, Poktan gatherings, and dealer restocking.
    4. *OPT Outbreak Incident Desk*: Rapid incident logging and emergency dispatch for critical pest infestations with one-click action buttons.
- [x] **TASK-42:** Quality Gate & Delivery Verification:
  - `pnpm run lint` (0 errors, 0 warnings).
  - `pnpm run test` (all test suites passing).
  - `pnpm run build` (successful compilation).
  - `project-check --full /Users/ongki/Projects/agrimarket` (VERIFIED 3/3 checks passed).





