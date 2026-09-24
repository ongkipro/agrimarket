import { useState, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import {
  CloudSun,
  ThermometerSun,
  Droplets,
  AlertTriangle,
  Compass,
  ShieldCheck,
  Calendar as CalendarIcon,
  Search as SearchIcon,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  MapPin,
} from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  getClimateTelemetry,
  getRegionalCorridors,
  getCommodityClimateProfiles,
  getKatamProtocols,
  getRainfallOnsetDistribution,
  getENSOProjections,
  type RegionalCorridorClimate,
} from '@/features/agri/data-provider'

export function AgroClimateExplorer() {
  const telemetry = getClimateTelemetry()
  const regionalCorridors = getRegionalCorridors()
  const commodityProfiles = getCommodityClimateProfiles()
  const katamProtocols = getKatamProtocols()
  const rainfallOnsets = getRainfallOnsetDistribution()
  const ensoProjections = getENSOProjections()

  const [activeTab, setActiveTab] = useState<
    'current_2026' | 'outlook_2027' | 'commodities_matrix' | 'katam_sop'
  >('current_2026')
  const [selectedCorridorId, setSelectedCorridorId] =
    useState<string>('CORRIDOR_JAWA')
  const [commoditySearch, setCommoditySearch] = useState<string>('')
  const [selectedSector, setSelectedSector] = useState<string>('ALL')

  const selectedCorridor: RegionalCorridorClimate = useMemo(() => {
    return (
      regionalCorridors.find((c) => c.id === selectedCorridorId) ||
      regionalCorridors[0]
    )
  }, [regionalCorridors, selectedCorridorId])

  const filteredCommodities = useMemo(() => {
    return commodityProfiles.filter((item) => {
      const matchSector =
        selectedSector === 'ALL' || item.sector === selectedSector
      const matchSearch =
        item.name.toLowerCase().includes(commoditySearch.toLowerCase()) ||
        item.sector.toLowerCase().includes(commoditySearch.toLowerCase())
      return matchSector && matchSearch
    })
  }, [commodityProfiles, selectedSector, commoditySearch])

  return (
    <>
      <Header>
        <div className='me-auto flex min-w-0 items-center gap-2'>
          <CloudSun className='h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400' />
          <span className='truncate text-sm font-bold tracking-tight sm:text-base'>
            Agro-Iklim BMKG &amp; Intelijen Cuaca Pertanian (699 ZOM)
          </span>
        </div>
        <div className='ms-auto flex shrink-0 items-center gap-2'>
          <Search className='hidden sm:flex' />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='space-y-6'>
        {/* Top Breadcrumb & Navigation Bar */}
        <div className='flex flex-col justify-between gap-3 border-b border-border pb-4 sm:flex-row sm:items-center'>
          <div>
            <div className='flex items-center gap-2'>
              <span className='font-mono text-[10px] tracking-widest text-muted-foreground uppercase'>
                Sistem Intelijen Agroklimat Nasional
              </span>
              <Badge variant='outline' className='font-mono text-[10px]'>
                BMKG ZOM9120 &bull; SI Katam Terpadu
              </Badge>
            </div>
            <h1 className='mt-1 text-xl font-bold tracking-tight sm:text-2xl'>
              Dinamika Cuaca Riil 2026 &amp; Proyeksi Iklim 2027
            </h1>
            <p className='mt-0.5 max-w-3xl text-xs text-muted-foreground'>
              Integrasi data operasional 699 Zona Musim (ZOM) BMKG, pemodelan
              anomali ENSO Nino 3.4, IOD positif, serta protokol Kalender Tanam
              Terpadu (KATAM) untuk mitigasi risiko produksi 13 komoditas
              strategis.
            </p>
          </div>

          <div className='flex shrink-0 items-center gap-2'>
            <Link
              to='/calendar'
              className='inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90'
            >
              <CalendarIcon className='h-3.5 w-3.5' />
              <span>Buka Kalender Tanam</span>
              <ArrowUpRight className='h-3.5 w-3.5' />
            </Link>
          </div>
        </div>

        {/* 5 Macro Telemetry KPI Cards */}
        <div className='grid grid-cols-2 gap-3 md:grid-cols-5'>
          {/* 1. ENSO Status */}
          <Card className='border border-border shadow-xs'>
            <CardContent className='p-3.5'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                  ENSO Nino 3.4
                </span>
                <ThermometerSun className='h-4 w-4 text-rose-500' />
              </div>
              <div className='mt-1 font-mono text-lg font-bold tracking-tight text-rose-600 sm:text-xl dark:text-rose-400'>
                +{telemetry.enso_nino34_anomaly_celsius.toFixed(2)}°C
              </div>
              <div className='mt-1 flex items-center gap-1 text-[11px] text-muted-foreground'>
                <span className='font-semibold text-foreground'>
                  {telemetry.enso_label.split(' ')[0]}
                </span>
                <span>(Fase Aktif)</span>
              </div>
            </CardContent>
          </Card>

          {/* 2. IOD Status */}
          <Card className='border border-border shadow-xs'>
            <CardContent className='p-3.5'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                  Indian Ocean Dipole
                </span>
                <Compass className='h-4 w-4 text-amber-500' />
              </div>
              <div className='mt-1 font-mono text-lg font-bold tracking-tight text-amber-600 sm:text-xl dark:text-amber-400'>
                +{telemetry.iod_dmi_anomaly_celsius.toFixed(2)}°C
              </div>
              <div className='mt-1 flex items-center gap-1 text-[11px] text-muted-foreground'>
                <span className='font-semibold text-foreground'>
                  IOD Positif
                </span>
                <span>(Defisit Uap Air)</span>
              </div>
            </CardContent>
          </Card>

          {/* 3. ZOM Delayed */}
          <Card className='border border-border shadow-xs'>
            <CardContent className='p-3.5'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                  Awal Hujan Mundur
                </span>
                <TrendingDown className='h-4 w-4 text-rose-500' />
              </div>
              <div className='mt-1 font-mono text-lg font-bold tracking-tight text-foreground sm:text-xl'>
                {telemetry.delayed_rainy_season_zom_pct}%
              </div>
              <div className='mt-1 text-[11px] text-muted-foreground'>
                <span>427 dari 699 ZOM</span>
              </div>
            </CardContent>
          </Card>

          {/* 4. Monsoon Phase */}
          <Card className='border border-border shadow-xs'>
            <CardContent className='p-3.5'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                  Dinamika Monsun
                </span>
                <Droplets className='h-4 w-4 text-sky-500' />
              </div>
              <div className='mt-1 truncate text-sm font-bold tracking-tight text-foreground sm:text-base'>
                Monsun Australia
              </div>
              <div className='mt-1 truncate text-[11px] text-muted-foreground'>
                Timuran Kering Dominan
              </div>
            </CardContent>
          </Card>

          {/* 5. Katam Verification Status */}
          <Card className='col-span-2 border border-border shadow-xs md:col-span-1'>
            <CardContent className='p-3.5'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                  Status Katam
                </span>
                <ShieldCheck className='h-4 w-4 text-emerald-500' />
              </div>
              <div className='mt-1 text-sm font-bold tracking-tight text-emerald-600 sm:text-base dark:text-emerald-400'>
                100% TERVERIFIKASI
              </div>
              <div className='mt-1 text-[11px] text-muted-foreground'>
                BSIP Kementan / BMKG
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs Bar */}
        <div className='no-scrollbar flex space-x-1 overflow-x-auto border-b border-border sm:space-x-2'>
          <button
            onClick={() => setActiveTab('current_2026')}
            className={`cursor-pointer border-b-2 px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all sm:text-sm ${
              activeTab === 'current_2026'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Tahun Ini: Dinamika Iklim 2026 (El Niño Aktif)
          </button>
          <button
            onClick={() => setActiveTab('outlook_2027')}
            className={`cursor-pointer border-b-2 px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all sm:text-sm ${
              activeTab === 'outlook_2027'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Tahun Depan: Proyeksi Iklim 2027 (Normalisasi ENSO)
          </button>
          <button
            onClick={() => setActiveTab('commodities_matrix')}
            className={`cursor-pointer border-b-2 px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all sm:text-sm ${
              activeTab === 'commodities_matrix'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Matriks 13 Komoditas &amp; Dampak Ekstrem
          </button>
          <button
            onClick={() => setActiveTab('katam_sop')}
            className={`cursor-pointer border-b-2 px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all sm:text-sm ${
              activeTab === 'katam_sop'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            SOP Katam Terpadu Lapang
          </button>
        </div>

        {/* TAB 1: TAHUN INI 2026 (REALITAS EL NINO & KETERLAMBATAN MUSIM) */}
        {activeTab === 'current_2026' && (
          <div className='space-y-6'>
            {/* Alert Banner 2026 */}
            <Card className='border border-amber-500/30 bg-amber-500/5 shadow-xs'>
              <CardContent className='p-4'>
                <div className='flex items-start gap-3'>
                  <AlertTriangle className='mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400' />
                  <div className='space-y-1 text-xs'>
                    <div className='text-sm font-bold text-foreground'>
                      Peringatan Agroklimat 2026: Anomali El Niño Kuat &amp;
                      Kemunduran Musim Tanam MT 1
                    </div>
                    <p className='leading-relaxed text-muted-foreground'>
                      Data stasiun klimatologi BMKG mencatat{' '}
                      <strong>61,08% Zona Musim (427 ZOM)</strong> di Indonesia
                      mengalami kemunduran awal musim hujan sebesar 1 hingga 3
                      dasarian (10–30 hari lebih lambat dari normal klimatologis
                      ZOM9120). Puncak tanam serempak padi MT 1 rendeng di
                      sentra lumbung Jawa dan NTB/NTT bergeser dari Oktober ke{' '}
                      <strong>November–Desember 2026</strong>. Petani tadah
                      hujan diinstruksikan menunda tebar benih hingga hujan
                      dasarian mencapai minimal 50 mm.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subround 1, 2, 3 Review 2026 */}
            <div className='grid gap-4 md:grid-cols-3'>
              <Card className='border border-border shadow-xs'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center justify-between'>
                    <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                      Subround 1 (Jan – Apr 2026)
                    </span>
                    <Badge variant='outline' className='text-[10px]'>
                      Selesai
                    </Badge>
                  </div>
                  <CardTitle className='text-sm font-bold'>
                    Musim Rendeng &amp; Panen MT 1
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-2 text-xs text-muted-foreground'>
                  <p>
                    Panen raya padi berlangsung di bawah bayang-bayang
                    keterlambatan tanam akhir 2025. Terjadi pemadatan panen pada
                    Maret–April 2026.
                  </p>
                  <div className='rounded bg-muted/40 p-2 font-mono text-[11px]'>
                    <span className='font-sans font-semibold text-foreground'>
                      Dampak Ekonomi:{' '}
                    </span>
                    Harga GKG di tingkat petani terjaga tinggi di Rp 7.150/kg;
                    likuiditas tunai petani melimpah saat lebaran.
                  </div>
                </CardContent>
              </Card>

              <Card className='border border-border shadow-xs'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center justify-between'>
                    <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                      Subround 2 (Mei – Agu 2026)
                    </span>
                    <Badge variant='outline' className='text-[10px]'>
                      Selesai
                    </Badge>
                  </div>
                  <CardTitle className='text-sm font-bold'>
                    Musim Gadu &amp; Kemarau Kering
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-2 text-xs text-muted-foreground'>
                  <p>
                    Monsun Australia meniupkan udara kering terik. Waduk irigasi
                    utama mengalami penurunan elevasi debit hingga 35%. Petani
                    beralih ke palawija dan hortikultura.
                  </p>
                  <div className='rounded bg-muted/40 p-2 font-mono text-[11px]'>
                    <span className='font-sans font-semibold text-foreground'>
                      Ancaman Hama:{' '}
                    </span>
                    Ledakan populasi hama vektor serangga (Thrips pada cabai,
                    FAW pada jagung muda).
                  </div>
                </CardContent>
              </Card>

              <Card className='border border-amber-500/40 bg-amber-500/5 shadow-xs'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center justify-between'>
                    <span className='font-mono text-[10px] tracking-wider text-amber-700 uppercase dark:text-amber-400'>
                      Subround 3 (Sep – Des 2026)
                    </span>
                    <Badge className='bg-amber-600 text-[10px] text-white'>
                      Periode Aktif
                    </Badge>
                  </div>
                  <CardTitle className='text-sm font-bold'>
                    Puncak El Niño &amp; Onset Tertunda
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-2 text-xs text-muted-foreground'>
                  <p>
                    Jendela bera lahan diperpanjang. Olah tanah MT 1 menunggu
                    hujan reguler November. Buffer stocking kios KPL digeser 30
                    hari.
                  </p>
                  <div className='rounded border bg-background p-2 font-mono text-[11px]'>
                    <span className='font-sans font-semibold text-foreground'>
                      Rekomendasi Utama:{' '}
                    </span>
                    Aktivasi pompanisasi sungai dan percepatan pasokan benih
                    genjah toleran kering (Inpari 42 GSR).
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sebaran Awal Musim Hujan 2026 / 2027 (Tabel Distribusi ZOM) */}
            <Card className='border border-border shadow-xs'>
              <CardHeader className='pb-3'>
                <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
                  <div>
                    <CardTitle className='text-sm font-semibold'>
                      Sebaran Prediksi Awal Musim Hujan 2026/2027 per Zona Musim
                      (ZOM)
                    </CardTitle>
                    <CardDescription className='text-xs'>
                      Analisis spasial kemunduran awal musim hujan berdasarkan
                      konsensus analisis dinamika atmosfer BMKG
                    </CardDescription>
                  </div>
                  <Badge
                    variant='outline'
                    className='self-start font-mono text-xs sm:self-auto'
                  >
                    Total 699 ZOM
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className='overflow-x-auto rounded-md border'>
                  <Table>
                    <TableHeader>
                      <TableRow className='bg-muted/50 text-xs font-semibold'>
                        <TableHead className='w-[160px]'>
                          Periode Onset Hujan
                        </TableHead>
                        <TableHead className='w-[90px] text-center'>
                          Jumlah ZOM
                        </TableHead>
                        <TableHead className='w-[90px] text-center'>
                          Pangsa (%)
                        </TableHead>
                        <TableHead className='min-w-[220px]'>
                          Wilayah Geografis Dominan
                        </TableHead>
                        <TableHead className='min-w-[260px]'>
                          Rekomendasi Operasional Lapang
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rainfallOnsets.map((row) => (
                        <TableRow
                          key={row.month}
                          className='text-xs transition-colors hover:bg-muted/30'
                        >
                          <TableCell className='font-bold text-foreground'>
                            {row.month}
                          </TableCell>
                          <TableCell className='text-center font-mono'>
                            {row.zom_count}
                          </TableCell>
                          <TableCell className='text-center font-mono font-semibold'>
                            {row.pct_of_total_zom.toFixed(1)}%
                          </TableCell>
                          <TableCell className='text-[11px] text-muted-foreground'>
                            {row.dominant_regions}
                          </TableCell>
                          <TableCell className='text-[11px] text-foreground'>
                            {row.agronomic_advisory}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* 6 Regional Corridors Detail Drilldown */}
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-sm font-bold tracking-tight'>
                    Status 6 Koridor Agroklimat Regional Indonesia (2026)
                  </h3>
                  <p className='text-xs text-muted-foreground'>
                    Pilih koridor wilayah untuk membedah tingkat keparahan
                    kemarau, deviasi dasarian, dan tindakan mitigasi lapang
                  </p>
                </div>
              </div>

              {/* Corridor Selector Chips */}
              <div className='no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-1'>
                {regionalCorridors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCorridorId(c.id)}
                    className={`cursor-pointer rounded-md border px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCorridorId === c.id
                        ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                        : 'border-border bg-card text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {c.name.split(' (')[0]}
                  </button>
                ))}
              </div>

              {/* Selected Corridor Card */}
              <Card className='border border-border shadow-xs'>
                <CardHeader className='pb-3'>
                  <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
                    <div>
                      <CardTitle className='flex items-center gap-2 text-base font-bold'>
                        <MapPin className='h-4 w-4 text-primary' />
                        {selectedCorridor.name}
                      </CardTitle>
                      <CardDescription className='mt-0.5 text-xs'>
                        Meliputi:{' '}
                        {selectedCorridor.provinces_covered.join(', ')} (
                        {selectedCorridor.zom_count} ZOM)
                      </CardDescription>
                    </div>
                    <Badge
                      className={`font-mono text-xs uppercase ${
                        selectedCorridor.current_2026_status
                          .dry_season_severity === 'EKSTREM'
                          ? 'bg-rose-600 text-white'
                          : selectedCorridor.current_2026_status
                                .dry_season_severity === 'BERAT'
                            ? 'bg-amber-600 text-white'
                            : 'bg-blue-600 text-white'
                      }`}
                    >
                      Kemarau:{' '}
                      {selectedCorridor.current_2026_status.dry_season_severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4 text-xs'>
                  <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
                    <div className='rounded-lg border bg-muted/20 p-2.5'>
                      <div className='font-mono text-[10px] text-muted-foreground uppercase'>
                        Kemunduran Hujan
                      </div>
                      <div className='mt-0.5 font-mono text-base font-bold text-foreground'>
                        +
                        {
                          selectedCorridor.current_2026_status
                            .rain_onset_delay_dasarian
                        }{' '}
                        Dasarian
                      </div>
                      <div className='mt-0.5 text-[10px] text-muted-foreground'>
                        (
                        {Math.round(
                          selectedCorridor.current_2026_status
                            .rain_onset_delay_dasarian * 10
                        )}{' '}
                        hari lebih lambat)
                      </div>
                    </div>

                    <div className='rounded-lg border bg-muted/20 p-2.5'>
                      <div className='font-mono text-[10px] text-muted-foreground uppercase'>
                        Hari Tanpa Hujan Max
                      </div>
                      <div className='mt-0.5 font-mono text-base font-bold text-foreground'>
                        {
                          selectedCorridor.current_2026_status
                            .max_consecutive_dry_days
                        }{' '}
                        Hari
                      </div>
                      <div className='mt-0.5 text-[10px] text-muted-foreground'>
                        Deret hari kering beruntun
                      </div>
                    </div>

                    <div className='rounded-lg border bg-muted/20 p-2.5'>
                      <div className='font-mono text-[10px] text-muted-foreground uppercase'>
                        Kapasitas Waduk/Embung
                      </div>
                      <div className='mt-0.5 font-mono text-base font-bold text-foreground'>
                        {
                          selectedCorridor.current_2026_status
                            .water_reservoir_capacity_pct
                        }
                        %
                      </div>
                      <div className='mt-0.5 text-[10px] text-muted-foreground'>
                        Rerata elevasi debit irigasi
                      </div>
                    </div>

                    <div className='rounded-lg border bg-muted/20 p-2.5'>
                      <div className='font-mono text-[10px] text-muted-foreground uppercase'>
                        Cakupan ZOM
                      </div>
                      <div className='mt-0.5 font-mono text-base font-bold text-foreground'>
                        {selectedCorridor.zom_count} ZOM
                      </div>
                      <div className='mt-0.5 text-[10px] text-muted-foreground'>
                        {((selectedCorridor.zom_count / 699) * 100).toFixed(1)}%
                        dari ZOM Nasional
                      </div>
                    </div>
                  </div>

                  <div className='space-y-1.5 rounded-lg border bg-muted/10 p-3'>
                    <div className='flex items-center gap-1.5 font-bold text-foreground'>
                      <AlertTriangle className='h-3.5 w-3.5 text-amber-600' />
                      Ancaman Lapang Utama (2026):
                    </div>
                    <p className='leading-relaxed text-muted-foreground'>
                      {selectedCorridor.current_2026_status.key_threat}
                    </p>
                  </div>

                  <div className='space-y-1.5'>
                    <div className='flex items-center gap-1.5 font-bold text-foreground'>
                      <ShieldCheck className='h-3.5 w-3.5 text-emerald-600' />
                      Tindakan Mitigasi Agronomis Prioritas (SOP Lapang):
                    </div>
                    <ul className='grid gap-1.5 sm:grid-cols-3'>
                      {selectedCorridor.current_2026_status.field_actions.map(
                        (act, idx) => (
                          <li
                            key={idx}
                            className='rounded border bg-card p-2 text-[11px] leading-snug'
                          >
                            <span className='mr-1 font-mono font-bold text-primary'>
                              0{idx + 1}.
                            </span>
                            {act}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 2: TAHUN DEPAN 2027 (PROYEKSI IKLIM & NORMALISASI ENSO) */}
        {activeTab === 'outlook_2027' && (
          <div className='space-y-6'>
            {/* Outlook Overview Card */}
            <Card className='border border-sky-500/30 bg-sky-500/5 shadow-xs'>
              <CardContent className='p-4'>
                <div className='flex items-start gap-3'>
                  <Compass className='mt-0.5 h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400' />
                  <div className='space-y-1 text-xs'>
                    <div className='text-sm font-bold text-foreground'>
                      Prakiraan Iklim 2027: Transisi El Niño Meluruh &bull; ENSO
                      Netral Menuju La Niña Lemah
                    </div>
                    <p className='leading-relaxed text-muted-foreground'>
                      Konsensus multi-model iklim global (BMKG, IRI Columbia
                      University, NOAA Climate Prediction Center, dan Bureau of
                      Meteorology Australia) memproyeksikan fenomena{' '}
                      <strong>
                        El Niño kuat akan meluruh pada kuartal pertama 2027
                      </strong>
                      . Memasuki kuartal kedua (April–Juni 2027), kondisi
                      atmosfer beralih ke{' '}
                      <strong>fase Netral (probabilitas 72%)</strong>, dan
                      berpotensi bertransisi menjadi{' '}
                      <strong>
                        La Niña lemah pada semester kedua 2027 (probabilitas
                        58%)
                      </strong>
                      . Implikasinya: musim kemarau 2027 bertipe{' '}
                      <em>kemarau basah</em>, ketersediaan air irigasi melimpah,
                      namun risiko penyakit jamur patogen melonjak drastis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ENSO Multi-Model Probability Chart 2026-2027 */}
            <Card className='border border-border shadow-xs'>
              <CardHeader className='pb-2'>
                <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
                  <div>
                    <CardTitle className='text-sm font-semibold'>
                      Model Probabilitas Siklus ENSO 2026 – 2027 (Multi-Model
                      Ensemble)
                    </CardTitle>
                    <CardDescription className='text-xs'>
                      Evolusi peluang fase El Niño, Netral, dan La Niña dari Q3
                      2026 hingga Q4 2027
                    </CardDescription>
                  </div>
                  <div className='flex items-center gap-3 text-xs'>
                    <span className='inline-flex items-center gap-1.5'>
                      <span className='h-2.5 w-2.5 rounded-xs bg-rose-500' /> El
                      Niño
                    </span>
                    <span className='inline-flex items-center gap-1.5'>
                      <span className='h-2.5 w-2.5 rounded-xs bg-slate-400' />{' '}
                      Netral
                    </span>
                    <span className='inline-flex items-center gap-1.5'>
                      <span className='h-2.5 w-2.5 rounded-xs bg-sky-500' /> La
                      Niña
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className='h-[260px] w-full'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart
                      data={ensoProjections}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray='3 3'
                        vertical={false}
                        opacity={0.3}
                      />
                      <XAxis dataKey='period' tick={{ fontSize: 11 }} />
                      <YAxis
                        tick={{ fontSize: 11 }}
                        unit='%'
                        domain={[0, 100]}
                      />
                      <Tooltip
                        contentStyle={{ fontSize: '11px', borderRadius: '6px' }}
                        formatter={(value, name) => [
                          `${value}%`,
                          name === 'el_nino_prob_pct'
                            ? 'El Niño'
                            : name === 'neutral_prob_pct'
                              ? 'Netral'
                              : 'La Niña',
                        ]}
                      />
                      <Bar
                        dataKey='el_nino_prob_pct'
                        name='El Niño'
                        fill='#f43f5e'
                        stackId='a'
                      />
                      <Bar
                        dataKey='neutral_prob_pct'
                        name='Netral'
                        fill='#94a3b8'
                        stackId='a'
                      />
                      <Bar
                        dataKey='la_nina_prob_pct'
                        name='La Niña'
                        fill='#0ea5e9'
                        stackId='a'
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* 2027 Agronomic Projections & Commercial Selling Strategy */}
            <div className='grid gap-4 md:grid-cols-2'>
              {/* Opportunities */}
              <Card className='border border-emerald-500/30 bg-emerald-500/5 shadow-xs'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center gap-2'>
                    <TrendingUp className='h-4 w-4 text-emerald-600 dark:text-emerald-400' />
                    <CardTitle className='text-sm font-semibold'>
                      Peluang Agronomis &amp; Panen Raya Padi 2027
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className='space-y-2 text-xs text-muted-foreground'>
                  <p>
                    <strong>1. Rebound Luas Panen Padi (+4,8% YoY):</strong>{' '}
                    Ketersediaan air penuh di seluruh waduk utama Jawa
                    (Jatiluhur, Saguling, Cirata, Kedung Ombo, Gajah Mungkur)
                    memungkinkan indeks pertanaman (IP) sawah irigasi naik ke IP
                    300 (tanam 3x setahun).
                  </p>
                  <p>
                    <strong>2. Pemulihan Produksi Sawit:</strong> Bunga betina
                    kelapa sawit yang terbentuk di awal 2027 pasca berakhirnya
                    kemarau 2026 akan matang menjadi Tandan Buah Segar (TBS)
                    berbobot tinggi pada semester 2 2027 (High Crop kuat).
                  </p>
                  <p>
                    <strong>3. Normalisasi Jadwal Tanam MT 1 2027/2028:</strong>{' '}
                    Musim tanam rendeng tahun 2027 diprediksi kembali serentak
                    tepat waktu di bulan Oktober 2027 tanpa kemunduran.
                  </p>
                </CardContent>
              </Card>

              {/* Threats & Mitigations */}
              <Card className='border border-rose-500/30 bg-rose-500/5 shadow-xs'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center gap-2'>
                    <AlertTriangle className='h-4 w-4 text-rose-600 dark:text-rose-400' />
                    <CardTitle className='text-sm font-semibold'>
                      Peringatan Dini Penyakit Basah &amp; Strategi Distributor
                      2027
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className='space-y-2 text-xs text-muted-foreground'>
                  <p>
                    <strong>1. Lonjakan Penyakit Jamur Patogen:</strong> Curah
                    hujan di atas normal pada musim tanam 2027 memicu ledakan
                    penyakit <em>Pyricularia oryzae</em> (blas padi),{' '}
                    <em>Colletotrichum</em> (patek antraknosa cabai), dan{' '}
                    <em>Phytophthora infestans</em> (busuk daun kentang).
                  </p>
                  <p>
                    <strong>2. Risiko Komoditas Sayuran Kering:</strong>{' '}
                    Semangka, melon, dan tembakau menghadapi risiko kegagalan
                    kualitas (pecah buah, brix kemanisan anjlok, daya bakar
                    tembakau hilang) jika ditanam di luar periode kemarau ketat.
                  </p>
                  <p>
                    <strong>
                      3. Aksi Pengadaan Saprodi (Distributor KPL):
                    </strong>{' '}
                    Distributor wajib menggandakan alokasi stok fungisida
                    translaminar (Azol + Strobilurin + Mankozeb) dan kalsium
                    boron penguat dinding sel sebelum akhir tahun 2026.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Regional Corridors 2027 Outlook Grid */}
            <div className='space-y-3'>
              <h3 className='text-sm font-bold tracking-tight'>
                Prakiraan Agroklimat 6 Koridor Wilayah Tahun 2027
              </h3>
              <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                {regionalCorridors.map((c) => (
                  <Card
                    key={c.id}
                    className='border border-border shadow-xs transition-colors hover:border-primary/40'
                  >
                    <CardHeader className='pb-2'>
                      <div className='flex items-start justify-between gap-1'>
                        <CardTitle className='text-xs font-bold'>
                          {c.name.split(' (')[0]}
                        </CardTitle>
                        <Badge
                          variant='outline'
                          className='font-mono text-[10px]'
                        >
                          {c.projected_2027_outlook.rainy_season_character}
                        </Badge>
                      </div>
                      <CardDescription className='text-[11px]'>
                        {c.projected_2027_outlook.enso_transition}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-2 text-xs'>
                      <div className='space-y-1 rounded bg-muted/30 p-2 text-[11px]'>
                        <div className='font-semibold text-foreground'>
                          Peluang Produksi:
                        </div>
                        <div className='text-muted-foreground'>
                          {c.projected_2027_outlook.agronomic_opportunity}
                        </div>
                      </div>
                      <div className='text-[11px] text-muted-foreground'>
                        <span className='font-semibold text-foreground'>
                          Fokus Pengadaan Input:{' '}
                        </span>
                        {c.projected_2027_outlook.fertilizer_procurement_advice}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MATRIKS 13 KOMODITAS & KERENTANAN IKLIM */}
        {activeTab === 'commodities_matrix' && (
          <div className='space-y-4'>
            {/* Filter and Search Bar */}
            <div className='flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center'>
              <div className='flex flex-wrap items-center gap-1.5'>
                {[
                  'ALL',
                  'Tanaman Pangan',
                  'Hortikultura Sayuran',
                  'Hortikultura Buah',
                  'Perkebunan',
                  'Florikultura',
                ].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setSelectedSector(sec)}
                    className={`cursor-pointer rounded-md border px-2.5 py-1 text-xs font-medium transition-all ${
                      selectedSector === sec
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {sec === 'ALL'
                      ? 'Semua Sektor'
                      : sec.replace('Hortikultura ', '')}
                  </button>
                ))}
              </div>

              <div className='relative w-full sm:w-64'>
                <SearchIcon className='absolute top-2.5 left-2.5 h-3.5 w-3.5 text-muted-foreground' />
                <Input
                  type='text'
                  placeholder='Cari komoditas...'
                  value={commoditySearch}
                  onChange={(e) => setCommoditySearch(e.target.value)}
                  className='h-8 ps-8 text-xs'
                />
              </div>
            </div>

            {/* Commodities Climate Table */}
            <Card className='border border-border shadow-xs'>
              <CardContent className='p-0'>
                <div className='overflow-x-auto rounded-md'>
                  <Table>
                    <TableHeader>
                      <TableRow className='bg-muted/50 text-xs font-semibold'>
                        <TableHead className='sticky left-0 z-20 w-[160px] border-r bg-background'>
                          Komoditas
                        </TableHead>
                        <TableHead className='w-[90px] text-center'>
                          Skor Kerentanan El Niño
                        </TableHead>
                        <TableHead className='w-[100px] text-center'>
                          Dampak Hasil 2026
                        </TableHead>
                        <TableHead className='w-[110px] text-center'>
                          Pergeseran Tanam 2026
                        </TableHead>
                        <TableHead className='min-w-[200px]'>
                          Mitigasi Lapang 2026 (El Niño)
                        </TableHead>
                        <TableHead className='w-[100px] text-center'>
                          Proyeksi Yield 2027
                        </TableHead>
                        <TableHead className='min-w-[220px]'>
                          Ancaman Musim Basah 2027 &amp; Input
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCommodities.map((item) => (
                        <TableRow
                          key={item.id}
                          className='text-xs transition-colors hover:bg-muted/30'
                        >
                          <TableCell className='sticky left-0 z-10 border-r bg-background font-semibold text-foreground'>
                            <div>
                              <div>{item.name}</div>
                              <div className='text-[10px] font-normal text-muted-foreground'>
                                {item.sector.replace('Hortikultura ', '')}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className='text-center'>
                            <span
                              className={`rounded px-2 py-0.5 font-mono text-[11px] font-bold ${
                                item.current_2026_el_nino.vulnerability_score >=
                                8
                                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                  : item.current_2026_el_nino
                                        .vulnerability_score >= 5
                                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              }`}
                            >
                              {item.current_2026_el_nino.vulnerability_score.toFixed(
                                1
                              )}{' '}
                              / 10
                            </span>
                          </TableCell>
                          <TableCell className='text-center font-mono font-semibold'>
                            <span
                              className={
                                item.current_2026_el_nino.yield_impact_pct > 0
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-rose-600 dark:text-rose-400'
                              }
                            >
                              {item.current_2026_el_nino.yield_impact_pct > 0
                                ? '+'
                                : ''}
                              {item.current_2026_el_nino.yield_impact_pct}%
                            </span>
                          </TableCell>
                          <TableCell className='text-center font-mono text-[11px]'>
                            {item.current_2026_el_nino.planting_shift_days >
                            0 ? (
                              <span className='font-semibold text-amber-600 dark:text-amber-400'>
                                +{item.current_2026_el_nino.planting_shift_days}{' '}
                                hari
                              </span>
                            ) : (
                              <span className='text-muted-foreground'>
                                Normal
                              </span>
                            )}
                          </TableCell>
                          <TableCell className='text-[11px] text-muted-foreground'>
                            <div className='space-y-1'>
                              <div>
                                {
                                  item.current_2026_el_nino
                                    .immediate_field_mitigation
                                }
                              </div>
                              <div className='font-mono text-[10px] text-foreground'>
                                <span className='font-semibold text-primary'>
                                  Input:{' '}
                                </span>
                                {item.current_2026_el_nino.recommended_varieties_or_inputs
                                  .slice(0, 2)
                                  .join(', ')}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className='text-center font-mono font-semibold'>
                            <span
                              className={
                                item.projected_2027_outlook
                                  .projected_yield_growth_pct > 0
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-rose-600 dark:text-rose-400'
                              }
                            >
                              {item.projected_2027_outlook
                                .projected_yield_growth_pct > 0
                                ? '+'
                                : ''}
                              {
                                item.projected_2027_outlook
                                  .projected_yield_growth_pct
                              }
                              %
                            </span>
                          </TableCell>
                          <TableCell className='text-[11px] text-muted-foreground'>
                            <div className='space-y-1'>
                              <div className='font-medium text-rose-700 dark:text-rose-300'>
                                {item.projected_2027_outlook.wet_season_threats
                                  .slice(0, 2)
                                  .join('; ')}
                              </div>
                              <div className='font-mono text-[10px] text-foreground'>
                                <span className='font-semibold text-sky-600 dark:text-sky-400'>
                                  Siapkan:{' '}
                                </span>
                                {item.projected_2027_outlook.recommended_proactive_procurement
                                  .slice(0, 2)
                                  .join(', ')}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 4: SOP KATAM TERPADU LAPANG */}
        {activeTab === 'katam_sop' && (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-sm font-bold tracking-tight'>
                  Standar Operasional Prosedur (SOP) Katam Terpadu BBSDLP / BSIP
                  Kementan
                </h3>
                <p className='text-xs text-muted-foreground'>
                  Panduan taktis lapangan bagi agronomist, penyuluh pertanian
                  lapangan (PPL), dan pemilik kios KPL
                </p>
              </div>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              {katamProtocols.map((proto) => (
                <Card
                  key={proto.protocol_id}
                  className='border border-border shadow-xs'
                >
                  <CardHeader className='pb-3'>
                    <div className='flex items-start justify-between gap-2'>
                      <div>
                        <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                          {proto.protocol_id} &bull; {proto.target_ecosystem}
                        </span>
                        <CardTitle className='mt-0.5 text-sm font-bold'>
                          {proto.title}
                        </CardTitle>
                      </div>
                      <Badge
                        className={`shrink-0 font-mono text-[10px] uppercase ${
                          proto.urgency === 'DARURAT_EL_NINO'
                            ? 'bg-rose-600 text-white'
                            : proto.urgency === 'PROAKTIF_2027'
                              ? 'bg-sky-600 text-white'
                              : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {proto.urgency.replace('_', ' ')}
                      </Badge>
                    </div>
                    <CardDescription className='mt-1 text-xs'>
                      {proto.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-3 text-xs'>
                    <div className='space-y-1.5'>
                      <div className='font-bold text-foreground'>
                        Langkah-Langkah Eksekusi Lapang:
                      </div>
                      <ol className='list-inside list-decimal space-y-1 text-[11px] leading-relaxed text-muted-foreground'>
                        {proto.steps.map((st, sIdx) => (
                          <li key={sIdx} className='ps-0.5'>
                            {st}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className='space-y-1 rounded-lg border bg-muted/20 p-2.5 text-[11px]'>
                      <div className='font-semibold text-foreground'>
                        Rekomendasi Saprodi &amp; Benih:
                      </div>
                      <div className='font-mono text-muted-foreground'>
                        {proto.recommended_inputs.join(' &bull; ')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Main>
    </>
  )
}
