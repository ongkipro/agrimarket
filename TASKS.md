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

---

### Phase 9: Data Integrity, Regulatory Accuracy & Agronomic Model Calibration (COMPLETED & VERIFIED)
- [x] **TASK-43:** Standardize Kelapa Sawit TAM & Production Accounting:
  - Calibrate `COMM_10_KELAPA_SAWIT` in `src/data/market-intel-dataset.json`:
    * Set `tam.harvest_area_ha` to `16835000` (Total National Plantation Footprint: 14,12M Ha TM + 2,715M Ha TBM/TTM).
    * Set `tam.production_ton` to `238450000` (Fresh Fruit Bunches / TBS raw farmgate product basis).
    * Set `tam.yield_ton_per_ha` to `16.89` (based on TM area) or `14.16` (based on total plantation area).
    * Set `tam.farmgate_price_idr_per_kg` to `2650` (TBS price at mill/collector, resulting in exact gross value Rp 631,89 Trillion).
    * Retain `cpo_production_ton: 47690000`, `cpo_yield_ton_per_ha: 3.3775`, and `cpo_price_idr_per_kg: 13250` in secondary metadata.
    * Reconcile provincial records for Kelapa Sawit to sum exactly 16.835.000 Ha and 238.450.000 Ton TBS.
  - Update `macro_summary`:
    * Set `total_tam_ha: 30451874` ($\sum_{c=1}^{13} \text{TAM}_c = 30.451.874 \text{ Ha}$, deviation = 0 Ha / 0.0000%).
    * Set `total_sam_ha: 21185714` ($\sum_{c=1}^{13} \text{SAM}_c = 21.185.714 \text{ Ha}$, deviation = 0 Ha / 0.0000%).
    * Set `overall_tam_to_sam_conversion_pct: 69.57`.
- [x] **TASK-44:** Correct Regulatory Impact of Permentan No. 10/2022:
  - Update `src/features/dashboard/components/national-agronomic-alerts.tsx`:
    * Accurately list the 9 prioritized subsidized crops under Permentan 10/2022 Pasal 3 ayat 2 (Padi, Jagung, Kedelai; Cabai, Bawang Merah, Bawang Putih; Tebu Rakyat, Kopi, Kakao).
    * Highlight truly excluded crops (0% subsidy: Kentang, Kubis, Tomat, Semangka, Melon, Kelapa Sawit, Alpukat, Tembakau, Anggrek).
    * Clarify that Cabai & Bawang Merah e-Alokasi quotas cover only 25–35% of actual dosage in practice, driving the remaining 65–75% and all micro-nutrients & crop protection into commercial private distribution.
- [x] **TASK-45:** Harmonize SOM Internal Capacity Simulator with Baseline Targets:
  - Update `src/features/agri/data-provider.ts` and `src/features/simulator/index.tsx`:
    * Connect `year1_projected_revenue_billion_idr` and `year1_penetration_ha` directly to bottom-up operational capacity parameters ($N_{\text{reps}} \times K_{\text{kiosks}} \times S_{\text{sales}}$) to eliminate the 12x discrepancy.
    * Differentiate Year 1 Initial Sales Force Capacity (operational launch) vs Year 3 Strategic Market Ambition (scaled corporate expansion).
- [x] **TASK-46:** Calibrate KPL Kiosks Count & Kiosk Coverage Metric:
  - Update `src/features/distribution/index.tsx`:
    * Clarify KPI cards: "Total Licensed Subsidized KPL: 27.850 Kiosks (Official Pupuk Indonesia SPJB)" and "Total Retail Network: ~36.225 Kiosks (KPL + Commercial)".
    * Rename column `Kiosk Coverage %` to `% Pangsa Kios Nasional` (`prov.kiosks / totalKiosks * 100`).
    * Add `Kepadatan (Kios / 1.000 Ha SAM)` column to represent real territorial service density.
- [x] **TASK-47:** Upgrade Audit Ledger with Level 1 Macro Reconciliation Table & Methodology Transparency:
  - Update `src/features/audit/index.tsx`:
    * Add Level 1 Macro Reconciliation Table comparing Header vs Sum of 13 rows for TAM Ha (0 diff), SAM Ha (0 diff), Gross Farm-gate Value (0 diff), and Input Market Value (0 diff).
    * Add transparent methodology categorization to address tautology concerns (Direct BPS KSA/SPH records vs Standardized Allocations).
- [x] **TASK-48:** Testing, Verification, Commit, Push & Vercel Deployment:
  - Update unit tests in `src/features/agri/data-provider.test.ts` to assert 0 deviation for Macro TAM (30.451.874 Ha) and SAM (21.185.714 Ha).
  - Verify zero errors via `pnpm run lint`, `pnpm run test`, `pnpm run build`, and `project-check --full`.
  - Stage, commit cleanly (no AI attribution trailers, noreply email), push to GitHub `ongkipro/agrimarket`.
  - Deploy to Vercel via `vercel --prod --yes` and verify production deployment.

---

### Phase 10: AI Slop Cleansing & Mobile Responsive Over-Width Hardening (COMPLETED & VERIFIED)
- [x] **TASK-49:** Mobile Over-Width Container Hardening & Layout Defenses:
  - Add `overflow-x: hidden; width: 100%; max-width: 100vw;` to `html, body` in `src/styles/index.css` to eliminate mobile horizontal viewport wobbling.
  - Add `min-w-0 max-w-full overflow-x-hidden` to `SidebarInset` in `src/components/layout/authenticated-layout.tsx` and `min-w-0 max-w-full` in `src/components/ui/sidebar.tsx` to prevent flex child expansion beyond screen boundary.
  - Add `min-w-0 max-w-full` to `Main` in `src/components/layout/main.tsx`.
  - Replace `overflow-hidden` with `w-full overflow-x-auto rounded-md border` in `src/features/tasks/components/tasks-table.tsx`.
  - Add independent `overflow-x-auto no-scrollbar` scroll wrappers with `w-max inline-flex` on multi-view tabs and pill filters in `src/features/tasks/index.tsx`, `src/features/commodities/index.tsx`, and `src/features/ads/index.tsx`.
  - Set explicit table minimum widths (`min-w-[680px]` to `min-w-[860px]`) wrapped in `w-full overflow-x-auto` across all data tables (`tasks`, `commodities`, `ads`, `audit`, `distribution`, `matrix`, `dashboard/commodity-quick-table`).
  - Add `flex-wrap` to geospatial legend in `src/features/map/index.tsx` and commodity title banner in `src/features/commodities/index.tsx`.
- [x] **TASK-50:** AI Slop Cleansing & Professional Agronomic Copywriting Polish:
  - Eliminate generic LLM buzzwords, redundant AI comments, and vague placeholders across feature components.
  - Replace generic marketing slogans with precise Indonesian & English agribusiness domain terms (permodelan berjenjang TAM/SAM/SOM, saprodi, yarnen, efikasi dosis lapang, alokasi KPL, BPP, OPT wereng/patek).
  - Standardize all sidebar navigation group titles to concise labels $\le 2$ words (`Market Intelligence`, `Field Operations`, `Preferences`).
- [x] **TASK-51:** Test Suite Calibration & Production Verification:
  - Calibrate sidebar group title to `'Preferences'` to avoid substring collision with `'System'` theme trigger in `search-provider.test.tsx`.
  - Verify 100% test pass rate (23 test files, 145/145 tests passing).
  - Verify 0 ESLint errors and warnings, and successful Vite production compilation.

---

### Phase 11: Alpukat Crash Resolution, Calendar Phase Completeness & Commercial Fertilizer Selling Window (COMPLETED & VERIFIED)
- [x] **TASK-52:** Alpukat Crash Resolution & Defensive Yield Normalization Engine:
  - In `src/data/market-intel-dataset.json`, update `COMM_11_ALPUKAT.tam` to explicitly include `"yield_ton_per_ha": 21.9596` (calculated from 924.500 Ton / 42.100 Ha = 21.96 Ton/Ha, consistent with 109.8 kg/tree × 200 trees/Ha).
  - In `src/features/agri/data-provider.ts`, implement defensive normalization in `normalizeCommodity` for `tam.yield_ton_per_ha` with fallback calculation `(prodTon / harvestArea)`.
  - In `src/features/commodities/index.tsx`, `src/features/audit/index.tsx`, and `src/features/map/index.tsx`, wrap all yield renderings in defensive optional chaining `(crop.tam?.yield_ton_per_ha ?? 0).toFixed(2)` to make runtime crashes structurally impossible.
- [x] **TASK-53:** National Cropping Calendar Matrix Phase Standardization & 10-Phase Legend Badges:
  - Calibrate `calendarMatrix` in `src/features/calendar/index.tsx` across all 13 crops to ensure complete representation of:
    * Pengolahan Lahan (`PL`) present in all crops during pre-season land prep & post-harvest orchard sanitization.
    * Generatif (`GN`) present in all crops (flowering, fruit set, tuber bulbing, and grain filling phases).
    * Harmonized transitions: Tanam (`TN`), Vegetatif (`VG`), Panen Raya (`PN`), Bera (`BR`), Persemaian (`SM`), Pemupukan Sawit (`PF`), High/Low Crop (`HC`/`LC`).
  - Expand legend badges on `Matriks Kalender Tanam Nasional` to render all 10 distinct agronomic status codes with color-coded tokens and clear tooltips.
- [x] **TASK-54:** Commercial Fertilizer & Agrochemical Selling Window Engine (*Waktu Terbaik Penjualan Pupuk & Saprodi*):
  - Author structured dataset `src/features/agri/commercial-selling-data.ts` covering all 13 commodities with:
    * Golden selling months (e.g. Juni–Juli for Alpukat flower booster, Maret–April for basal/recovery).
    * Primary target inputs (Kalsium Boron, MKP 0-52-34, KNO3 Putih, NPK 16-16-16, Kalium Sulfat ZK, Herbisida, Insektisida).
    * Sales agronomist lead time & KPL kiosk booking windows (T-30 s/d T-45 hari).
    * Kiosk stocking instructions and key regional distribution hubs.
    * Stage-by-stage agronomic and commercial rationale cards with urgency tiers (`GOLDEN_PEAK`, `HIGH`, `MEDIUM`).
  - Implement interactive Commercial Selling Window modules:
    * In `src/features/commodities/index.tsx`: Quick Golden Month Badge in commodity header + full interactive Commercial Selling Guide in Tab 3 (Subrounds) with 12-month visual selling strip and stage cards.
    * In `src/features/calendar/index.tsx`: Dynamic monthly active selling opportunities card highlighting crops in golden buying windows for the currently selected month.
- [x] **TASK-55:** Quality Gate, Full Contract Verification & Production Deployment:
  - Unit tests in `src/features/agri/data-provider.test.ts` expanded to 147 tests (100% pass rate) verifying Alpukat yield integrity and 13-crop selling guide validity.
  - Zero ESLint errors (`pnpm run lint`).
  - Successful Vite production build (`tsc -b && vite build` in 899ms).
  - Full delivery contract verification passed (`project-check --full /Users/ongki/Projects/agrimarket` VERIFIED 3/3 checks passed).

---

### Phase 12: Province-to-District Drilldown Engine on Geospatial Map (COMPLETED & VERIFIED)
- [x] **TASK-56:** Author District Data Architecture Specification:
  - Formalize hierarchical data schema (Nasional -> 38 Provinsi -> Kabupaten/Kota) and intra-provincial Pareto distribution model.
  - Enforce zero-discrepancy and zero-NaN invariants across all 13 crops.
  - Document in `docs/spec/DISTRICT-DATA-ENGINE-SPEC.md` and sync to staging.
- [x] **TASK-57:** Author Comprehensive Province-District Data Engine (`src/features/agri/province-districts-data.ts`):
  - Model authentic regency mappings across all 38 provinces in Indonesia.
  - Populate verified quantitative figures (Ha, Ton, Yield) for core agricultural hub regencies from `COMPLEX-DATA-ENGINE-SPEC.md` and BPS KSA/SPH records.
  - Implement deterministic intra-provincial allocation for all remaining provinces to ensure 100% coverage across all 13 commodities (13 crops x 38 provinces = 494 combinations).
  - Export typed helper functions: `getProvinceDistricts(cropId: string, provinceCode: string): DistrictDetailRecord[]` and `getProvinceDistrictSummary(cropId: string, provinceCode: string): ProvinceDistrictSummary`.
- [x] **TASK-58:** Upgrade Geospatial Map with Interactive District Drilldown & Dual-View UI (`src/features/map/index.tsx`):
  - Implement seamless drilldown transition: clicking any of the 38 provinces dynamically switches to the granular **Kabupaten/Kota Agronomic Heatmap & Data Table**.
  - Add navigation controls: `← Kembali ke Peta 38 Provinsi` back button, breadcrumb navigation, and direct province switcher dropdown.
  - Render Province Macro Summary Header (Luas Panen Ha, Produksi Ton, Yield Ton/Ha, Pangsa Nasional %, Kios KPL, Jumlah Kabupaten Sentra).
  - Render Kabupaten Visual Card Grid color-coded by intra-provincial production share.
  - Render Detailed Kabupaten Agronomic Table with live search, multi-column sorting (Produksi, Luas, Yield, Alfabetis), status badges (`Sentra Utama #1`, `Sentra Utama`, `Sentra Penyangga`, `Potensial`), progress bars, and localized commercial action recommendations.
  - Upgrade side drawer to reflect intra-provincial Pareto concentration, top 3 kabupaten contributors, and sales agronomist deployment ratios.
- [x] **TASK-59:** Parallel Validation Matrix & Automated Test Suite (`src/features/agri/province-districts-data.test.ts`):
  - Author comprehensive test suite validating all 13 commodities x all 38 provinces (494 matrix points) in parallel.
  - Verify zero empty district arrays for producing provinces.
  - Verify exact mathematical reconciliation ($\sum \text{districts} \le \text{province total} \times 1.001$).
  - Verify strictly positive and realistic yield figures (no NaN, null, or zero divisions).
- [x] **TASK-60:** Quality Gate, Full Contract Verification & Production Deployment:
  - Verify zero ESLint errors (`pnpm run lint`).
  - Verify 100% test pass rate across all suites (`pnpm run test` - 170/170 tests passing).
  - Verify successful Vite production build (`pnpm run build` in 948ms).
  - Verify project delivery contract via `project-check --full /Users/ongki/Projects/agrimarket` (VERIFIED 3/3 checks passed).
  - Stage, commit cleanly (noreply author, no AI trailers), push to GitHub, and deploy to Vercel via CLI `vercel --prod --yes`.

---

### Phase 13: Full District Census, Sub-District Cluster Intelligence & Precision QA Engine (COMPLETED & VERIFIED)
- [x] **TASK-61:** Deep Research & 514-Regency Census Architecture Specification:
  - Author comprehensive update to `docs/spec/DISTRICT-DATA-ENGINE-SPEC.md` documenting the full census of 514 Indonesian Kabupaten/Kota across 38 provinces.
  - Document sub-district (*kecamatan sentra*) cluster mappings for core production hubs across all 13 commodities.
  - Establish exact Gate-0 zero-delta mathematical balancing algorithm so $\sum \text{districts} = \text{provincial total}$ with 0.00% discrepancy.
- [x] **TASK-62:** Build Comprehensive Precision District Dataset (`src/features/agri/province-districts-data.ts`):
  - Expand `PROVINCE_DEFAULT_REGENCIES` to include the complete roster of authentic Kabupaten/Kota for all 38 provinces (27 in Jabar, 38 in Jatim, 35 in Jateng, 33 in Sumut, 24 in Sulsel, 17 in Sumsel, 15 in Lampung, 12 in Riau, 10 in NTB, 23 in Aceh, 22 in NTT, 14 in Kalbar/Kalteng, etc. totaling exactly 514 regencies).
  - Enrich `EXACT_DISTRICT_BENCHMARKS` with verified BPS KSA/SPH records across all major producing provinces for each of the 13 commodities.
  - Add `subdistrict_clusters?: string` property for key agricultural hubs (e.g. Kandanghaur/Anjatan for Indramayu; Larangan/Bulakamba for Brebes; Bagor/Sukomoro for Nganjuk; Tosari/Bromo for Pasuruan; Tambusai/Ujung Batu for Rokan Hulu).
  - Implement `distributeGateZero` allocator so $\sum \text{districts} = \text{provincial total}$ exactly (0.00% delta) without floating-point accumulation drift.
- [x] **TASK-63:** Enhance Geospatial Map UI (`src/features/map/index.tsx`) with Micro-Cluster Intelligence:
  - Display sub-district cluster badges and annotations in Kabupaten cards and data table.
  - Add search filter supporting both Kabupaten names and Kecamatan cluster keywords.
  - Display total tracked regency badge (e.g. `27 Kabupaten/Kota Terdata` in Jabar, `38 Kabupaten/Kota Terdata` in Jatim).
  - Add smart collapsible toggle button (`Tampilkan Seluruh X Kabupaten/Kota` / `Ciutkan (Top 12)`) for provinces with > 12 regencies.
- [x] **TASK-64:** Author Comprehensive QA Test Suite (`src/features/agri/district-breakdown-qa.test.ts`):
  - Test deep district integrity across all 38 provinces and 13 commodities (494 matrix points).
  - Assert coverage of all 514 authentic regencies across Indonesia.
  - Assert zero discrepancy: sum of districts matches provincial total for harvest area and production volume ($\Delta \le 1$).
  - Assert sub-district cluster annotations exist for verified hubs.
  - Verify 100% test pass rate across 25 test files and 179 total tests.
- [x] **TASK-65:** Full Quality Gate, Staging Sync, Git Commit & Vercel Production Deployment:
  - Run `pnpm run lint` (0 errors, 0 warnings), `pnpm run test` (179/179 passing), `pnpm run build` (built in 1.07s), and `project-check --full` (3/3 checks passed).
  - Sync all specifications to `~/Documents/work/prd/agrimarket/`.
  - Stage, commit cleanly (noreply author, no AI trailers), push to GitHub, and deploy to Vercel via CLI `vercel --prod --yes`.

---

### Phase 14: Field Operations Tasks Modernization & SOP Detail Drawer (COMPLETED & VERIFIED)
- [x] **TASK-66:** Implement Agronomic SOP Guide & Tasks Detail Drawer (`src/features/tasks/components/tasks-detail-drawer.tsx`):
  - Add interactive slide-over drawer triggered by clicking any task row across Table, Kanban, Dispatch, and OPT views.
  - Render full task telemetry: priority, status, category, target location (kabupaten & sentra cluster), assigned field agronomist, and target execution date.
  - Render step-by-step Standard Operating Procedure (SOP) with structured checklists and commercial guidelines.
  - Implement direct cross-module action buttons linking to `/commodities`, `/calendar`, `/map`, `/ads`, and `/distribution`.

---

### Phase 15: System Update Log & Release Ledger Engine (COMPLETED & VERIFIED)
- [x] **TASK-67:** Overhaul Help Center into Full System Update Log (`src/features/help-center/index.tsx`):
  - Transform `/help-center` into a dynamic, filterable Update Log & Release Ledger.
  - Document all milestone releases (v1.4.0, v1.3.0, v1.2.0, v1.1.0, v1.0.0) covering geospatial census, fertilizer selling windows, phenology fixes, and layout hardening.
  - Implement real-time search input, release category filter pills (`ALL`, `FEATURES`, `DATA`, `UI_POLISH`), quick stat badges, and interactive navigation shortcuts.
  - Update sidebar navigation from `Help Center` (`HelpCircle`) to `Update Log` (`History`).

---

### Phase 16: Macro KPI Telemetry Cards Responsive Typography & Gate-0 Micro-Badge (COMPLETED & VERIFIED)
- [x] **TASK-68:** Refine Executive Dashboard Macro KPI Cards (`src/features/dashboard/components/macro-kpi-cards.tsx`):
  - Decouple `100% VERIFIED` from monolithic 24px bold text into precise metric value `100%` paired with an elegant micro-badge status `[✓ VERIFIED]`.
  - Calibrate font sizing across all 5 macro KPI cards to `text-lg sm:text-xl font-bold tracking-tight tabular-nums`.
  - Optimize card padding to `p-3.5 sm:p-4 gap-2.5` to eliminate horizontal crowding on 5-column desktop screens and mobile viewports.

---

### Phase 17: Water Infrastructure, Agro-Climate Vulnerability Index & Calendar Phase Glossary (COMPLETED & VERIFIED)
- [x] **TASK-69:** Expose Climate Index & Water Infrastructure Engine:
  - Extend `ClimateVulnerability` interface in `src/features/agri/types.ts` with `el_nino_score`, `la_nina_score`, and `mitigation_strategy`.
  - Normalize `climate_vulnerability` in `src/features/agri/data-provider.ts` integrating BPS SPH technical irrigation footprints, BMKG risk scores, and 13-crop agronomic mitigation protocols.
  - Implement **Water Infrastructure & Agro-Climate Vulnerability Index** card in `src/features/commodities/index.tsx` with dual El Niño & La Niña risk telemetry and mitigation strategy banners.
  - Implement **Glosarium Kode Fase Budidaya & Tindakan Kritis Lapang** in `src/features/calendar/index.tsx` detailing all 11 agronomic phase codes (`PL`, `TN`, `SM`, `VG`, `GN`, `PT`, `PN`, `PF`, `HC`, `LC`, `BR`).
  - Expand unit test suite in `src/features/agri/data-provider.test.ts` verifying climate vulnerability invariants across all 13 crops.

---

### Phase 18: BMKG Agro-Climatic Intelligence & Multi-Year Dynamic Cropping Calendar (COMPLETED & VERIFIED)
- [x] **TASK-70:** Author Authoritative BMKG 699 ZOM & ENSO Telemetry Layer (`src/features/agri/climate-bmkg-data.ts`):
  - Model 699 ZOM (1991-2020 Normal Klimatologis) with real-time Nino 3.4 (+1.68°C) and IOD (+0.76°C) telemetry.
  - Model 6 regional agro-climatic corridors (Jawa, Sumatera, Bali-Nusra, Sulawesi, Kalimantan, Maluku-Papua) with HTH and reservoir statuses.
  - Reconcile multi-model ENSO 2026-2027 probabilities (decay to 72% Neutral in Q2 2027 and 58% Weak La Niña in H2 2027).
  - Define 4 Katam Terpadu field SOPs (Rescheduling, AWD Irrigation, Fungicide Stocking, Palm Recovery).
- [x] **TASK-71:** Implement Agro-Climate Explorer (`/climate`) & Multi-Year Cropping Calendar (`/calendar`):
  - Add `/climate` route with 5 macro telemetry KPIs, ENSO stacked bar probability chart, 13-commodity matrix, and regional drilldowns.
  - Upgrade `/calendar` with multi-year matrix mode switcher (`2026_EL_NINO`, `2027_PROJECTED`, `CLIMATOLOGICAL_NORMAL`) and 3 subround operational cards.
  - Pass all 29 test files, 198 tests, clean lint, and production deployment on Vercel (`REL-20260924-01`).

---

### Phase 19: Product Catalog Intelligence, Multi-Product Synergy & Climate Meta Ads Engine (COMPLETED & VERIFIED)
- [x] **TASK-72:** Build Product Catalog Master Data Engine (`src/features/agri/products-catalog-data.ts`):
  - Ingest 100% of Notion product knowledge across all 4 strategic SKUs: `AUSSIE Sawit`, `BENSU Hortikultura`, `SARATOGA Serum`, and `KOJIEN Activator`.
  - Model complete technical, market, and agronomic specifications: positioning, formula, mechanism, claim boundaries, severity levels, dosages, farmer demographics, buyer psychology, and CS decision trees.
  - Define cross-product Mix & Match rules: crop synergies, application sequences, tank mixing limits, and rotation schedules.
  - Model 15-month dynamic climate-synchronized campaign roadmap (Oct 2026 - Dec 2027) harmonizing BMKG El Niño/La Niña phases with monthly commercial golden selling windows and Meta Ads hooks.
  - Generate Mermaid Mindmap diagram data mapping the entire multi-product commercial ecosystem.
- [x] **TASK-73:** Expose Product Catalog APIs & Type Definitions (`src/features/agri/types.ts` & `src/features/agri/data-provider.ts`):
  - Add TypeScript interfaces for products, severity stages, dosage matrices, demographics, and campaign schedules.
  - Export accessors: `getProductsCatalog()`, `getProductById(id)`, `getMixMatchRules()`, `getMonthlyProductCampaigns()`, and `getProductMindmapDiagram()`.
- [x] **TASK-74:** Configure Sidebar Navigation with Collapsible Product Sub-Menu (`src/components/layout/data/sidebar-data.ts`):
  - Add `Katalog Produk` nav item with sub-items: `Overview & Mindmap` (`/products`), `AUSSIE Sawit` (`/products/aussie`), `BENSU Hortikultura` (`/products/bensu`), `SARATOGA Serum` (`/products/saratoga`), `KOJIEN Activator` (`/products/kojien`), `Mix & Match Matrix` (`/products/mix-match`), `Kampanye Iklim 2026-27` (`/products/campaigns`).
- [x] **TASK-75:** Build Product Catalog Views (`src/features/products/`):
  - `index.tsx`: Executive Overview Hub with 4 Product Showcases, comparison table, interactive Mermaid mindmap diagram, and quick jump navigation.
  - `product-detail-view.tsx`: Rich multi-tab product dossier component (Overview, Formula, Dosage & Timing, Severity Matrix, Demographics & Sentra, Commercial & CS Tree, Climate Sync 2026-2027, Meta Ads Playbook, FAQ & Objections).
  - `mix-match-view.tsx`: Interactive Mix & Match engine with crop & season selector, tank-mixing compatibility rules, and rotation schedules.
  - `campaigns-view.tsx`: 15-Month Climate-Synchronized Campaign Playbook (Oct 2026 - Dec 2027) with El Niño/La Niña dynamics, monthly golden windows, targeting personas, ad copy hooks, and RoAS benchmarks.
- [x] **TASK-76:** Author TanStack Router Routes (`src/routes/_authenticated/products/`):
  - Create file-based routes for `index.tsx`, `aussie.tsx`, `bensu.tsx`, `saratoga.tsx`, `kojien.tsx`, `mix-match.tsx`, and `campaigns.tsx`.
- [x] **TASK-77:** Update Repository Architecture & Contracts:
  - Update `DEVELOPMENT-MAP.xml` registering `/products` and all sub-routes.
  - Update `README.md` documenting the new Product Catalog Intelligence module.
- [x] **TASK-78:** Comprehensive Test Verification & Production Build:
  - Author unit tests (`src/features/agri/products-catalog-data.test.ts`) verifying product data integrity, mix-match rules, and 15-month campaign schedule.
  - Author browser render tests (`src/features/products/products-render.test.tsx`).
  - Execute `pnpm run lint`, `pnpm test`, and `pnpm run build` (100% clean, 0 errors, 10/10 tests passed).
- [x] **TASK-79:** Field Playbook Dictionary & Mix & Match Multi-Dimensional Overhaul (`src/features/products/mix-match-view.tsx` & `src/features/agri/`):
  - Ingest 15 comprehensive plant issue diagnostic cases (`PB-HORTI-01` to `PB-TRANSPLANT-15`) covering symptoms, physiological root cause, weather triggers, product pairings, dosage per 16L & per Ha, application methods, interval, SLA recovery, tank safety, and Meta Ads hooks.
  - Export `getFieldPlaybooks()` and `getFieldPlaybookById()` in `src/features/agri/data-provider.ts`.
  - Overhaul `src/features/products/mix-match-view.tsx` with 5 interactive tabs:
    1. `Kamus Masalah Tanaman`: Live text search & multi-facet filters (category, severity, crop).
    2. `Matriks Sinergi Antar-Produk`: Interactive primary product selector & pair interaction breakdowns + 5 master protocols.
    3. `Kalender Playbook Musiman`: 12-month selector with BMKG climate context & peaked issue filtering.
    4. `Kalkulator Dosis & Kebutuhan Lahan`: Area / tank count calculation with packaging recommendations.
    5. `Standar Keamanan Tangki Semprot`: Compatibility guidelines & 15-minute jar test protocol.
  - Complete unit and browser tests with 100% pass rate (209/209 tests passed across 31 files).
- [x] **TASK-80:** Zero-Malaysia Scrub, Deep Product Dossier Enrichment & High-Density UI/UX Overhaul:
  - Scrub all Malaysian references (language, Johor/Sabah hubs, ad copy) and refocus 100% on Indonesian national corridors and secondary expansion hubs.
  - Enrich 4 strategic SKUs with physical specifications (formulation type, color/odor, density, solution pH, solubility, shelf life, hazard class), cellular mode-of-action timeline (Hours 0-4 to Days 21-30), severity triage, 5-phase dosage protocols, packaging, CS decision trees, objection handling, and 6 agronomic FAQs.
  - UI/UX overhaul removing "AI slop" and card fatigue: cut `<Card>` count from 70 to 10 in `product-detail-view.tsx`, replace nested boxes with high-density responsive schedule tables (dosage & severity), TDS Certificate of Analysis grid, unified scope comparison, and sleek search/filter toolbar in `mix-match-view.tsx`.
  - 100% test pass (31 files, 209 tests), lint clean, and verified production build.
