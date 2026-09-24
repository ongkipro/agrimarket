import { useState, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Filter,
  Calendar,
  Droplets,
  Search as SearchIcon,
  FlaskConical,
  ShieldCheck,
  Calculator,
  BookOpen,
  Layers,
  Info,
  CalendarDays,
  Target,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  getMixMatchRules,
  getProductsCatalog,
  getFieldPlaybooks,
} from '@/features/agri/data-provider'
import type { FieldPlaybookItem } from '@/features/agri/products-catalog-data'

const MONTH_NAMES = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

const MONTH_SEASONS: Record<string, { label: string; ensoNote: string; badge: string }> = {
  Januari: {
    label: 'Puncak Rendeng MT 1 (Curah Hujan Tinggi)',
    ensoNote: 'Anomali hujan lebat memicu antraknosa patek & kebusukan akar.',
    badge: 'RENDENG',
  },
  Februari: {
    label: 'Akhir Rendeng MT 1 & Pengisian Bulir Padi',
    ensoNote: 'Kelembaban jenuh > 85% RH memicu blast padi & daun bendera kering.',
    badge: 'RENDENG',
  },
  Maret: {
    label: 'Panen Raya MT 1 & Persiapan Lahan MT 2',
    ensoNote: 'Transisi cuaca, sanitasi lahan sisa jerami & jamur tanah.',
    badge: 'TRANSISI',
  },
  April: {
    label: 'Pancaroba I (Musim Tanam Gadu MT 2 Awal)',
    ensoNote: 'Fluktuasi suhu siang-malam ekstrem; stres pindah tanam bibit tray.',
    badge: 'PANCAROBA',
  },
  Mei: {
    label: 'Awal Kemarau Gadu MT 2 (Pertumbuhan Vegetatif)',
    ensoNote: 'Penyusutan debit air irigasi, pembentukan anakan & ketahanan batang.',
    badge: 'GADU',
  },
  Juni: {
    label: 'Kemarau Gadu MT 2 (Fase Generatif / Bunga)',
    ensoNote: 'Risiko dehidrasi sel bunga & serapan silika untuk tahan rebah.',
    badge: 'GADU',
  },
  Juli: {
    label: 'Puncak Kemarau / Terik El Niño (Pengisian Buah & Panen MT 2)',
    ensoNote: 'Suhu siang hari > 35°C; risiko gugur pentil buah & buah terbakar panas.',
    badge: 'EL_NINO',
  },
  Agustus: {
    label: 'Kemarau Kering / Puncak Defisit Air (MT 3 Palawija & Bawang)',
    ensoNote: 'Transpirasi tinggi; evaporasi ekstrem menguras cadangan energi sel.',
    badge: 'EL_NINO',
  },
  September: {
    label: 'Pancaroba II (Akhir Kemarau Menuju Musim Hujan)',
    ensoNote: 'Hujan kiriman sporadis menyebabkan daun menguning dan kaget air.',
    badge: 'PANCAROBA',
  },
  Oktober: {
    label: 'Awal Musim Hujan Rendeng MT 1 (Pengolahan Tanah & Tanam Awal)',
    ensoNote: 'Curah hujan pertama merendam tanah asam, bibit kaget osmotik.',
    badge: 'RENDENG',
  },
  November: {
    label: 'Musim Hujan Rendeng Aktif (Vegetatif Cepat Padi & Horti)',
    ensoNote: 'Pertumbuhan gulma & jamur Ganoderma / antraknosa mulai merebak.',
    badge: 'RENDENG',
  },
  Desember: {
    label: 'Musim Hujan Lebat (Fase Kritis Proteksi Jamur & Bunga)',
    ensoNote: 'Intensitas mendung tebal kurangi fotosintesis; bunga butuh asam amino.',
    badge: 'RENDENG',
  },
}

export function MixMatchView() {
  const [activeTab, setActiveTab] = useState<string>('kamus-masalah')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL')
  const [selectedCropCategory, setSelectedCropCategory] = useState<string>('ALL')

  // Matrix tab interactive states
  const [selectedMatrixPrimary, setSelectedMatrixPrimary] = useState<string>('bensu')

  // Monthly guide tab states
  const [selectedMonth, setSelectedMonth] = useState<string>('Januari')

  // Dosage calculator states
  const [calcMode, setCalcMode] = useState<'AREA' | 'TANKS'>('AREA')
  const [calcAreaValue, setCalcAreaValue] = useState<number>(1)
  const [calcAreaUnit, setCalcAreaUnit] = useState<'HA' | 'M2' | 'RANTE'>('HA')
  const [calcTanksCount, setCalcTanksCount] = useState<number>(15)
  const [calcSelectedProduct, setCalcSelectedProduct] = useState<string>('saratoga')
  const [calcDosagePerTank, setCalcDosagePerTank] = useState<number>(25)

  const mixMatchRules = getMixMatchRules()
  const products = getProductsCatalog()
  const playbooks = getFieldPlaybooks()

  // Filtered Playbooks for Tab 1
  const filteredPlaybooks = useMemo(() => {
    return playbooks.filter((item) => {
      // Search matching
      const matchesSearch =
        searchQuery === '' ||
        item.problemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.visualSymptoms.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.crops.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.commercialMetaAdsHook.headline.toLowerCase().includes(searchQuery.toLowerCase())

      // Category matching
      const matchesCat =
        selectedCategory === 'ALL' || item.problemCategory === selectedCategory

      // Severity matching
      const matchesSeverity =
        selectedSeverity === 'ALL' || item.severityLevel === selectedSeverity

      // Crop category matching
      const matchesCrop =
        selectedCropCategory === 'ALL' ||
        (selectedCropCategory === 'HORTIKULTURA' &&
          item.crops.some((c) =>
            ['Cabai', 'Tomat', 'Bawang Merah', 'Kentang', 'Melon', 'Semangka'].includes(c)
          )) ||
        (selectedCropCategory === 'PERKEBUNAN' &&
          item.crops.some((c) => ['Kelapa Sawit', 'Karet', 'Kopi', 'Kakao'].includes(c))) ||
        (selectedCropCategory === 'PANGAN' &&
          item.crops.some((c) => ['Padi Sawah', 'Jagung Hibrida', 'Kedelai'].includes(c)))

      return matchesSearch && matchesCat && matchesSeverity && matchesCrop
    })
  }, [playbooks, searchQuery, selectedCategory, selectedSeverity, selectedCropCategory])

  // Playbooks matching active month
  const monthlyPlaybooks = useMemo(() => {
    return playbooks.filter((p) => p.peakMonths.includes(selectedMonth))
  }, [playbooks, selectedMonth])

  // Calculation outcomes
  const calcResults = useMemo(() => {
    let effectiveTanks: number

    if (calcMode === 'TANKS') {
      effectiveTanks = calcTanksCount
    } else {
      let areaInHa = calcAreaValue
      if (calcAreaUnit === 'M2') {
        areaInHa = calcAreaValue / 10000
      } else if (calcAreaUnit === 'RANTE') {
        areaInHa = (calcAreaValue * 400) / 10000 // 1 Rante = 400 m2
      }
      effectiveTanks = Math.max(1, Math.round(areaInHa * 15)) // 15 tanks (240 L) per Ha standard
    }

    const totalConcentrateMl = effectiveTanks * calcDosagePerTank
    const totalWaterLiter = effectiveTanks * 16
    const totalConcentrateLiter = (totalConcentrateMl / 1000).toFixed(2)

    // Recommended package purchases
    let recommendedPackage: string
    if (totalConcentrateMl <= 500) {
      recommendedPackage = '1 Botol (500 ml)'
    } else if (totalConcentrateMl <= 1000) {
      recommendedPackage = '1 Botol (1.000 ml / 1 Liter)'
    } else if (totalConcentrateMl <= 2000) {
      recommendedPackage = '2 Botol (1 Liter)'
    } else if (totalConcentrateMl <= 4000) {
      recommendedPackage = '1 Jerigen (4 Liter / 4.000 ml)'
    } else {
      const jerigen = Math.floor(totalConcentrateMl / 4000)
      const remainderMl = totalConcentrateMl % 4000
      const bottles = Math.ceil(remainderMl / 1000)
      recommendedPackage = `${jerigen} Jerigen (4L)${bottles > 0 ? ` + ${bottles} Botol (1L)` : ''}`
    }

    return {
      effectiveTanks,
      totalConcentrateMl,
      totalWaterLiter,
      totalConcentrateLiter,
      recommendedPackage,
    }
  }, [calcMode, calcAreaValue, calcAreaUnit, calcTanksCount, calcDosagePerTank])

  const getProductBadge = (prodId: string) => {
    switch (prodId) {
      case 'aussie':
        return (
          <Badge
            variant='outline'
            className='border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-[10px]'
          >
            AUSSIE Sawit
          </Badge>
        )
      case 'bensu':
        return (
          <Badge
            variant='outline'
            className='border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[10px]'
          >
            BENSU Horti
          </Badge>
        )
      case 'saratoga':
        return (
          <Badge
            variant='outline'
            className='border-indigo-500/40 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[10px]'
          >
            SARATOGA Serum
          </Badge>
        )
      case 'kojien':
        return (
          <Badge
            variant='outline'
            className='border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px]'
          >
            KOJIEN Activator
          </Badge>
        )
      default:
        return (
          <Badge variant='outline' className='font-mono text-[10px]'>
            {prodId}
          </Badge>
        )
    }
  }

  const problemCategories = [
    { key: 'ALL', label: 'Semua Kasus' },
    { key: 'DAUN_VEGETATIF', label: 'Daun & Vegetatif' },
    { key: 'JAMUR_PATOGEN', label: 'Penyakit & Jamur' },
    { key: 'BUNGA_BUAH', label: 'Bunga & Buah' },
    { key: 'BATANG_AKAR', label: 'Akar & Batang' },
  ]

  const severityLevels = [
    { key: 'ALL', label: 'Semua Severity' },
    { key: 'KRITIS', label: 'Level Kritis' },
    { key: 'SEDANG', label: 'Level Sedang' },
    { key: 'PREVENTIF', label: 'Level Preventif' },
  ]

  const cropCategories = [
    { key: 'ALL', label: 'Semua Komoditas' },
    { key: 'HORTIKULTURA', label: 'Hortikultura' },
    { key: 'PERKEBUNAN', label: 'Kelapa Sawit' },
    { key: 'PANGAN', label: 'Padi & Jagung' },
  ]

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='space-y-6'>
        {/* Navigation Breadcrumb */}
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <div className='flex items-center gap-2 text-xs text-muted-foreground'>
            <Link
              to='/products'
              className='hover:text-foreground hover:underline'
            >
              Katalog Produk
            </Link>
            <span>/</span>
            <span className='font-semibold text-foreground'>
              Kamus Playbook & Sinergi Mix & Match
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <Button asChild variant='outline' size='sm' className='h-8 text-xs'>
              <Link to='/products'>
                <BookOpen className='mr-1.5 h-3.5 w-3.5 text-muted-foreground' />
                Katalog Produk
              </Link>
            </Button>
            <Button asChild variant='outline' size='sm' className='h-8 text-xs'>
              <Link to='/products/campaigns'>
                <Calendar className='mr-1.5 h-3.5 w-3.5 text-muted-foreground' />
                Kampanye Iklim 2026-27
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className='space-y-2 rounded-lg border border-border bg-card p-5 shadow-xs'>
          <div className='flex flex-wrap items-center gap-2'>
            <h1 className='text-xl font-bold tracking-tight text-foreground sm:text-2xl'>
              Kamus Playbook Lapangan & Matriks Sinergi Mix & Match
            </h1>
            <Badge variant='outline' className='font-mono text-[10px]'>
              15 Kasus Masalah • 4 SKU • Resep Dokter Tanaman
            </Badge>
          </div>
          <p className='max-w-4xl text-xs leading-relaxed text-muted-foreground'>
            Ensiklopedi diagnostik lapangan dan panduan tindakan multi-dimensi:
            memetakan masalah visual tanaman, akar masalah fisiologis cuaca,
            kombinasi antar-produk (AUSSIE, BENSU, SARATOGA, KOJIEN), resep dosis
            tangki 16L, jendela aplikasi bulanan, dan panduan keamanan tangki
            semprot.
          </p>
        </div>

        {/* Multi-Tab Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='w-full space-y-4'
        >
          <TabsList className='flex h-auto w-full flex-wrap justify-start gap-1 bg-muted/60 p-1'>
            <TabsTrigger
              value='kamus-masalah'
              className='gap-1.5 text-xs data-[state=active]:bg-card'
            >
              <BookOpen className='h-3.5 w-3.5' />
              Kamus Masalah Tanaman ({filteredPlaybooks.length})
            </TabsTrigger>
            <TabsTrigger
              value='matriks-kombinasi'
              className='gap-1.5 text-xs data-[state=active]:bg-card'
            >
              <Layers className='h-3.5 w-3.5' />
              Matriks Sinergi Antar-Produk
            </TabsTrigger>
            <TabsTrigger
              value='kalender-bulanan'
              className='gap-1.5 text-xs data-[state=active]:bg-card'
            >
              <CalendarDays className='h-3.5 w-3.5' />
              Kalender Playbook Musiman
            </TabsTrigger>
            <TabsTrigger
              value='kalkulator-dosis'
              className='gap-1.5 text-xs data-[state=active]:bg-card'
            >
              <Calculator className='h-3.5 w-3.5' />
              Kalkulator Dosis & Kebutuhan Lahan
            </TabsTrigger>
            <TabsTrigger
              value='keamanan-tangki'
              className='gap-1.5 text-xs data-[state=active]:bg-card'
            >
              <FlaskConical className='h-3.5 w-3.5' />
              Standar Keamanan Tangki Semprot
            </TabsTrigger>
          </TabsList>

          {/* ============================================================== */}
          {/* TAB 1: KAMUS MASALAH TANAMAN (15 KASUS LAPANGAN DETAIL) */}
          {/* ============================================================== */}
          <TabsContent value='kamus-masalah' className='space-y-4 pt-1'>
            {/* Search & Filter Toolbar (Clean, non-card container) */}
            <div className='rounded-lg bg-muted/30 p-4 space-y-3 border border-border/70'>
              <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
                {/* Search Bar */}
                <div className='relative w-full max-w-md'>
                  <SearchIcon className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='Cari gejala (daun kuning, patek, rontok bunga, rebah, layu)...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='h-9 pl-9 text-xs bg-card'
                  />
                </div>

                <div className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
                  <span>Menampilkan:</span>
                  <Badge variant='secondary' className='font-mono text-xs font-semibold'>
                    {filteredPlaybooks.length} dari {playbooks.length} Kasus
                  </Badge>
                </div>
              </div>

              {/* Filter Pills */}
              <div className='flex flex-wrap items-center gap-2 pt-1 border-t border-border/40'>
                <div className='flex flex-wrap items-center gap-1.5'>
                  <span className='mr-1 flex items-center text-xs font-medium text-muted-foreground'>
                    <Filter className='mr-1 h-3.5 w-3.5' /> Kategori:
                  </span>
                  {problemCategories.map((cat) => (
                    <Button
                      key={cat.key}
                      variant={selectedCategory === cat.key ? 'default' : 'outline'}
                      size='sm'
                      className='h-6 px-2 text-[11px]'
                      onClick={() => setSelectedCategory(cat.key)}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>

                <div className='flex flex-wrap items-center gap-1.5 pl-0 md:pl-2'>
                  <span className='mr-1 text-xs font-medium text-muted-foreground'>
                    Keparahan:
                  </span>
                  {severityLevels.map((sev) => (
                    <Button
                      key={sev.key}
                      variant={selectedSeverity === sev.key ? 'default' : 'outline'}
                      size='sm'
                      className='h-6 px-2 text-[11px]'
                      onClick={() => setSelectedSeverity(sev.key)}
                    >
                      {sev.label}
                    </Button>
                  ))}
                </div>

                <div className='flex flex-wrap items-center gap-1.5 pl-0 md:pl-2'>
                  <span className='mr-1 text-xs font-medium text-muted-foreground'>
                    Komoditas:
                  </span>
                  {cropCategories.map((crp) => (
                    <Button
                      key={crp.key}
                      variant={selectedCropCategory === crp.key ? 'default' : 'outline'}
                      size='sm'
                      className='h-6 px-2 text-[11px]'
                      onClick={() => setSelectedCropCategory(crp.key)}
                    >
                      {crp.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Playbook Cases List - Clean, high-density cards without nested frame-itis */}
            {filteredPlaybooks.length === 0 ? (
              <div className='rounded-lg border border-dashed border-border p-8 text-center text-xs text-muted-foreground'>
                Tidak ditemukan kasus masalah tanaman yang cocok dengan kata kunci & filter.
                Silakan reset filter atau gunakan kata kunci lain.
              </div>
            ) : (
              <div className='space-y-4'>
                {filteredPlaybooks.map((item: FieldPlaybookItem) => (
                  <Card key={item.id} className='border border-border shadow-xs'>
                    <div className='p-5 space-y-4 text-xs'>
                      {/* Top Header: ID, Badges, Title, Commodities */}
                      <div className='space-y-2'>
                        <div className='flex flex-wrap items-center justify-between gap-2'>
                          <div className='flex flex-wrap items-center gap-2'>
                            <Badge
                              variant='outline'
                              className='font-mono text-[10px] font-semibold tracking-wider'
                            >
                              {item.id}
                            </Badge>
                            <Badge
                              variant={
                                item.severityLevel === 'KRITIS'
                                  ? 'destructive'
                                  : item.severityLevel === 'SEDANG'
                                    ? 'secondary'
                                    : 'outline'
                              }
                              className='font-mono text-[10px]'
                            >
                              LEVEL: {item.severityLevel}
                            </Badge>
                            <Badge variant='outline' className='text-[10px]'>
                              {item.categoryLabel}
                            </Badge>
                            <Badge variant='secondary' className='text-[10px]'>
                              {item.seasonLabel}
                            </Badge>
                          </div>

                          <Badge
                            variant={
                              item.tankMixSafety.status === 'COMPATIBLE'
                                ? 'outline'
                                : item.tankMixSafety.status === 'APPLY_SEPARATELY'
                                  ? 'secondary'
                                  : 'destructive'
                            }
                            className='font-mono text-[10px]'
                          >
                            TANGKI: {item.tankMixSafety.status}
                          </Badge>
                        </div>

                        <h3 className='text-base font-bold text-foreground'>
                          {item.problemName}
                        </h3>

                        <div className='flex flex-wrap items-center gap-1.5'>
                          <span className='text-[11px] font-medium text-muted-foreground'>
                            Komoditas Rentan:
                          </span>
                          {item.crops.map((crop) => (
                            <Badge
                              key={crop}
                              variant='secondary'
                              className='text-[10px]'
                            >
                              {crop}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* 2-Column Split: Field Diagnostics vs Prescription Schedule */}
                      <div className='grid gap-4 md:grid-cols-2 pt-2 border-t border-border/60'>
                        {/* Left: Diagnostik Lapangan */}
                        <div className='space-y-3'>
                          <div>
                            <div className='flex items-center gap-1.5 font-semibold text-rose-600 dark:text-rose-400'>
                              <AlertTriangle className='h-3.5 w-3.5 shrink-0' />
                              Gejala Visual di Kebun (Visual Symptoms):
                            </div>
                            <p className='mt-1 text-[11px] leading-relaxed text-muted-foreground'>
                              {item.visualSymptoms}
                            </p>
                          </div>

                          <div>
                            <div className='flex items-center gap-1.5 font-semibold text-foreground'>
                              <Info className='h-3.5 w-3.5 shrink-0 text-primary' />
                              Akar Masalah Bio-Fisiologis & Pemicu Iklim:
                            </div>
                            <p className='mt-1 text-[11px] leading-relaxed text-muted-foreground'>
                              {item.rootCause}
                            </p>
                            <div className='mt-1 font-mono text-[10px] text-primary'>
                              Pemicu Cuaca: {item.climateTrigger}
                            </div>
                          </div>
                        </div>

                        {/* Right: Resep Lapangan Presisi (Clean Key-Value Schedule) */}
                        <div className='rounded-lg bg-muted/30 p-3.5 space-y-2'>
                          <div className='font-bold text-foreground text-xs'>
                            Resep Dokter Tanaman Presisi:
                          </div>
                          <div className='grid grid-cols-2 gap-2 text-xs'>
                            <div>
                              <span className='block text-[10px] text-muted-foreground uppercase font-mono'>
                                Dosis per Tangki 16 Liter:
                              </span>
                              <span className='font-mono text-xs font-bold text-primary'>
                                {item.prescription.dosagePer16L}
                              </span>
                            </div>
                            <div>
                              <span className='block text-[10px] text-muted-foreground uppercase font-mono'>
                                Dosis Kebutuhan per Hektar:
                              </span>
                              <span className='font-mono text-xs font-semibold text-foreground'>
                                {item.prescription.dosagePerHa}
                              </span>
                            </div>
                            <div>
                              <span className='block text-[10px] text-muted-foreground uppercase font-mono'>
                                Metode & Cara Aplikasi:
                              </span>
                              <span className='text-[11px] text-muted-foreground'>
                                {item.prescription.applicationMethodLabel}
                              </span>
                            </div>
                            <div>
                              <span className='block text-[10px] text-muted-foreground uppercase font-mono'>
                                Waktu Semprot Terbaik:
                              </span>
                              <span className='text-[11px] text-muted-foreground'>
                                {item.prescription.bestTime}
                              </span>
                            </div>
                            <div>
                              <span className='block text-[10px] text-muted-foreground uppercase font-mono'>
                                Interval & Siklus:
                              </span>
                              <span className='font-mono text-[11px] text-muted-foreground'>
                                Tiap {item.prescription.intervalDays} Hari ({item.prescription.roundsNeeded} Putaran)
                              </span>
                            </div>
                            <div>
                              <span className='block text-[10px] text-muted-foreground uppercase font-mono'>
                                SLA Pemulihan Visual:
                              </span>
                              <span className='font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400'>
                                {item.prescription.recoverySlaDays}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Panel: Synergy, Safety & Kios Hook */}
                      <div className='space-y-3 pt-3 border-t border-border/60'>
                        {/* Formula Pairing */}
                        <div className='flex flex-wrap items-center justify-between gap-2'>
                          <div className='flex flex-wrap items-center gap-2'>
                            <span className='text-[11px] font-semibold text-foreground'>
                              Kombinasi Ekosistem:
                            </span>
                            <div className='flex items-center gap-1.5'>
                              {getProductBadge(item.productPairing.heroProduct)}
                              {item.productPairing.partnerProduct && (
                                <>
                                  <ArrowRight className='h-3 w-3 text-muted-foreground' />
                                  {getProductBadge(item.productPairing.partnerProduct)}
                                </>
                              )}
                              {item.productPairing.rotationProduct && (
                                <>
                                  <ArrowRight className='h-3 w-3 text-muted-foreground' />
                                  {getProductBadge(item.productPairing.rotationProduct)}
                                </>
                              )}
                            </div>
                          </div>
                          <Badge variant='outline' className='font-mono text-[10px]'>
                            {item.productPairing.pairingLabel} • {item.productPairing.pairingType}
                          </Badge>
                        </div>

                        <p className='text-[11px] leading-relaxed text-muted-foreground'>
                          <span className='font-semibold text-foreground'>
                            Mekanisme Kerja Bio-Kimiawi:{' '}
                          </span>
                          {item.productPairing.synergyMechanism}
                        </p>

                        {/* Tank Safety Guideline */}
                        <div className='flex items-start gap-2 text-[11px] text-muted-foreground'>
                          <ShieldCheck className='h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-500' />
                          <div>
                            <span className='font-semibold text-foreground'>
                              Panduan Tangki Semprot & Kompatibilitas Kimia:{' '}
                            </span>
                            {item.tankMixSafety.guideline}
                            {item.tankMixSafety.prohibitedMixes.length > 0 && (
                              <span className='inline-flex items-center gap-1 ml-1.5 font-mono text-[10px] text-rose-500 font-semibold'>
                                [DILARANG DICAMPUR DENGAN: {item.tankMixSafety.prohibitedMixes.join(', ')}]
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Kios & Meta Ads Hook */}
                        <div className='rounded-lg bg-muted/30 p-3 space-y-1'>
                          <div className='flex items-center gap-1.5 font-semibold text-foreground text-[11px]'>
                            <Target className='h-3.5 w-3.5 text-primary' />
                            Playbook Edukasi Kios & Hook Iklan Meta Ads:
                          </div>
                          <div className='font-medium text-foreground text-xs italic'>
                            &ldquo;{item.commercialMetaAdsHook.headline}&rdquo;
                          </div>
                          <p className='text-[11px] text-muted-foreground'>
                            <span className='font-semibold text-foreground not-italic'>
                              Arahan untuk Kios / Petugas Lapangan:{' '}
                            </span>
                            {item.commercialMetaAdsHook.kiosAdviceScript}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ============================================================== */}
          {/* TAB 2: MATRIKS KOMBINASI ANTAR-PRODUK (PAIRING MATRIX) */}
          {/* ============================================================== */}
          <TabsContent value='matriks-kombinasi' className='space-y-6 pt-1'>
            {/* Interactive Primary SKU Selector */}
            <Card className='border border-border shadow-xs'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm font-semibold'>
                  Pilih Produk Utama untuk Analisis Sinergi & Pantangan:
                </CardTitle>
                <CardDescription className='text-xs'>
                  Klik salah satu produk inti untuk melihat peta interaksinya dengan 3 produk lainnya
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-2 sm:grid-cols-4'>
                  {products.map((prod) => (
                    <Button
                      key={prod.id}
                      variant={selectedMatrixPrimary === prod.id ? 'default' : 'outline'}
                      className='h-auto flex-col items-start p-3 text-left'
                      onClick={() => setSelectedMatrixPrimary(prod.id)}
                    >
                      <div className='font-bold text-xs'>{prod.name}</div>
                      <div className='text-[10px] opacity-80'>{prod.categoryLabel}</div>
                      <Badge variant='outline' className='mt-2 font-mono text-[9px]'>
                        Target: {prod.targetCommodityLabels.slice(0, 2).join(', ')}
                      </Badge>
                    </Button>
                  ))}
                </div>

                {/* Sinergi Breakdown for Selected SKU */}
                <div className='rounded-lg border border-border/80 bg-muted/20 p-4'>
                  <div className='flex items-center gap-2 pb-2 font-semibold text-foreground text-xs'>
                    <Layers className='h-4 w-4 text-primary' />
                    Matriks Hubungan {products.find((p) => p.id === selectedMatrixPrimary)?.name}:
                  </div>

                  <div className='grid gap-3 sm:grid-cols-3 pt-2 text-xs'>
                    {products
                      .filter((p) => p.id !== selectedMatrixPrimary)
                      .map((partner) => {
                        let relType = 'KOMPATIBEL_ROTASI'
                        let relDesc = ''
                        let relRule = ''

                        if (
                          (selectedMatrixPrimary === 'bensu' && partner.id === 'saratoga') ||
                          (selectedMatrixPrimary === 'saratoga' && partner.id === 'bensu')
                        ) {
                          relType = 'DUO_EMAS_HORTI'
                          relDesc =
                            'BENSU (Fase Vegetatif 0-35 HST / pemulihan akar) dilanjutkan SARATOGA (Fase Bunga & Buah 35-70 HST). Sinergi booster terkuat untuk cabai, tomat, dan melon.'
                          relRule = 'Aplikasi rotasi bergantian tiap 7 hari.'
                        } else if (
                          (selectedMatrixPrimary === 'kojien' && partner.id === 'saratoga') ||
                          (selectedMatrixPrimary === 'saratoga' && partner.id === 'kojien')
                        ) {
                          relType = 'DUO_PANEN_BERNAS'
                          relDesc =
                            'KOJIEN memperkokoh batang dan daun tegak (silika fitoaleksin), SARATOGA memadatkan bobot gabah & bulir buah. Sinergi raja timbangan padi sawah dan jagung hibrida.'
                          relRule = 'Bisa dicampur tangki saat fase bunting (45-55 HST).'
                        } else if (
                          (selectedMatrixPrimary === 'kojien' && partner.id === 'bensu') ||
                          (selectedMatrixPrimary === 'bensu' && partner.id === 'kojien')
                        ) {
                          relType = 'DUO_STARTER_KETAHANAN'
                          relDesc =
                            'BENSU memicu perakaran awal, KOJIEN mempertebal dinding sel agar tidak rentan serangan bibit rebah atau layu bakteri.'
                          relRule = 'Dapat dicampur tangki pada 10-20 HST.'
                        } else if (
                          selectedMatrixPrimary === 'aussie' ||
                          partner.id === 'aussie'
                        ) {
                          relType = 'SPESIALIS_SAWIT_PERKEBUNAN'
                          relDesc =
                            'AUSSIE diaplikasikan terfokus ke pangkal batang dan zona perakaran sawit. Tidak disarankan dicampur dalam tangki yang sama dengan pupuk daun mikro tinggi.'
                          relRule = 'Aplikasi tunggal kocor atau oles pasta.'
                        }

                        return (
                          <div
                            key={partner.id}
                            className='space-y-1.5 rounded-lg border border-border/80 bg-card p-3 shadow-2xs'
                          >
                            <div className='flex items-center justify-between'>
                              <span className='font-bold text-foreground text-xs'>
                                + {partner.shortTitle}
                              </span>
                              <Badge variant='outline' className='font-mono text-[9px]'>
                                {relType}
                              </Badge>
                            </div>
                            <p className='text-[11px] leading-relaxed text-muted-foreground'>
                              {relDesc}
                            </p>
                            <div className='font-mono text-[10px] text-primary pt-1'>
                              Aturan: {relRule}
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Existing Comprehensive Master Combination Rules */}
            <div className='space-y-3'>
              <h3 className='text-sm font-bold text-foreground'>
                5 Protokol Baku Rotasi & Sinergi Antar-Produk (Master Rules):
              </h3>
              <div className='grid gap-4'>
                {mixMatchRules.map((rule) => (
                  <Card key={rule.id} className='border border-border shadow-xs'>
                    <div className='p-5 space-y-3 text-xs'>
                      <div className='flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2.5'>
                        <div className='flex items-center gap-2'>
                          <Badge variant='secondary' className='font-mono text-[10px]'>
                            {rule.id}
                          </Badge>
                          <h4 className='text-sm font-bold text-foreground'>
                            {rule.cropCategory} ({rule.cropNames.join(', ')})
                          </h4>
                        </div>
                        <Badge
                          variant={
                            rule.tankMixSafety === 'COMPATIBLE'
                              ? 'outline'
                              : rule.tankMixSafety === 'APPLY_SEPARATELY'
                                ? 'secondary'
                                : 'destructive'
                          }
                          className='font-mono text-[10px]'
                        >
                          {rule.tankMixSafety === 'APPLY_SEPARATELY'
                            ? 'ROTASI FASE (TERPISAH)'
                            : rule.tankMixSafety}
                        </Badge>
                      </div>

                      <div className='text-xs text-muted-foreground'>
                        Target Fase: <span className='font-medium text-foreground'>{rule.growthStage}</span>
                      </div>

                      <div className='flex flex-wrap items-center gap-2 rounded-lg bg-muted/30 p-2.5'>
                        <span className='text-xs font-semibold text-foreground'>
                          Alur Rotasi Produk:
                        </span>
                        <div className='flex items-center gap-1.5'>
                          {getProductBadge(rule.primaryProduct)}
                          {rule.partnerProduct && (
                            <>
                              <ArrowRight className='h-3.5 w-3.5 text-muted-foreground' />
                              {getProductBadge(rule.partnerProduct)}
                            </>
                          )}
                        </div>
                      </div>

                      <div className='grid gap-3 sm:grid-cols-2 pt-1'>
                        <div className='space-y-1'>
                          <div className='text-[11px] font-semibold text-foreground'>
                            Mekanisme Sinergi Agronomis:
                          </div>
                          <p className='text-[11px] leading-relaxed text-muted-foreground'>
                            {rule.synergyDescription}
                          </p>
                        </div>

                        <div className='space-y-1'>
                          <div className='text-[11px] font-semibold text-foreground'>
                            Protokol Waktu Aplikasi (HST):
                          </div>
                          <p className='font-mono text-[11px] leading-relaxed text-primary'>
                            {rule.sequenceProtocol}
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-2 pt-2 border-t border-border/40 text-[11px] leading-relaxed text-muted-foreground'>
                        <AlertTriangle className='mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500' />
                        <div>
                          <span className='font-semibold text-foreground'>
                            Panduan Tangki Semprot:{' '}
                          </span>
                          {rule.tankMixGuidelines}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ============================================================== */}
          {/* TAB 3: KALENDER PLAYBOOK MUSIMAN (JAN - DES) */}
          {/* ============================================================== */}
          <TabsContent value='kalender-bulanan' className='space-y-4 pt-1'>
            {/* 12-Month Button Bar */}
            <Card className='border border-border shadow-xs'>
              <CardHeader className='pb-3'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                  <CardTitle className='text-sm font-semibold'>
                    Panduan Aksi Bulanan & Antisipasi Iklim BMKG (12 Bulan)
                  </CardTitle>
                  <Badge variant='outline' className='font-mono text-xs'>
                    {MONTH_SEASONS[selectedMonth]?.badge}
                  </Badge>
                </div>
                <CardDescription className='text-xs'>
                  Klik bulan untuk melihat dinamika iklim, ancaman masalah tanaman yang memuncak,
                  serta rekomendasi produk dan angle edukasi petani.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-3 gap-1.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12'>
                  {MONTH_NAMES.map((m) => (
                    <Button
                      key={m}
                      variant={selectedMonth === m ? 'default' : 'outline'}
                      size='sm'
                      className='h-8 text-xs font-medium'
                      onClick={() => setSelectedMonth(m)}
                    >
                      {m.substring(0, 3)}
                    </Button>
                  ))}
                </div>

                {/* Selected Month Climate & Agronomic Outlook */}
                <div className='space-y-2 rounded-lg bg-primary/5 border border-primary/20 p-4 text-xs'>
                  <div className='flex flex-wrap items-center justify-between gap-2 border-b border-primary/20 pb-2'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4 text-primary' />
                      <span className='text-sm font-bold text-foreground'>
                        Fokus Bulan {selectedMonth}
                      </span>
                    </div>
                    <span className='font-mono text-xs font-semibold text-primary'>
                      {MONTH_SEASONS[selectedMonth]?.label}
                    </span>
                  </div>

                  <p className='text-xs leading-relaxed text-muted-foreground pt-1'>
                    <span className='font-semibold text-foreground'>
                      Dinamika Iklim BMKG / ENSO:{' '}
                    </span>
                    {MONTH_SEASONS[selectedMonth]?.ensoNote}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Playbooks Peaking in Selected Month */}
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm font-bold text-foreground'>
                  Masalah Tanaman yang Memuncak di Bulan {selectedMonth} ({monthlyPlaybooks.length} Kasus):
                </h3>
              </div>

              {monthlyPlaybooks.length === 0 ? (
                <div className='rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground'>
                  Tidak ada ancaman penyakit kritis utama yang memuncak di bulan {selectedMonth}.
                  Pemeliharaan rutin tetap berjalan normal.
                </div>
              ) : (
                <div className='grid gap-3 md:grid-cols-2'>
                  {monthlyPlaybooks.map((item) => (
                    <Card key={item.id} className='border border-border shadow-xs'>
                      <div className='p-4 space-y-2.5 text-xs'>
                        <div className='flex items-center justify-between gap-2'>
                          <Badge variant='outline' className='font-mono text-[10px]'>
                            {item.id}
                          </Badge>
                          <Badge
                            variant={
                              item.severityLevel === 'KRITIS'
                                ? 'destructive'
                                : item.severityLevel === 'SEDANG'
                                  ? 'secondary'
                                  : 'outline'
                            }
                            className='font-mono text-[10px]'
                          >
                            {item.severityLevel}
                          </Badge>
                        </div>
                        <h4 className='text-xs font-bold leading-tight text-foreground'>
                          {item.problemName}
                        </h4>
                        <div className='text-[11px] text-muted-foreground'>
                          Komoditas: {item.crops.join(', ')}
                        </div>

                        <p className='text-[11px] text-muted-foreground leading-relaxed'>
                          <span className='font-semibold text-foreground'>Gejala: </span>
                          {item.visualSymptoms}
                        </p>

                        <div className='flex flex-wrap items-center justify-between gap-1.5 rounded bg-muted/40 p-2'>
                          <span className='text-[11px] font-semibold text-foreground'>
                            Solusi Hero:
                          </span>
                          <div className='flex items-center gap-1.5'>
                            {getProductBadge(item.productPairing.heroProduct)}
                            {item.productPairing.partnerProduct && (
                              <>
                                <ArrowRight className='h-3 w-3 text-muted-foreground' />
                                {getProductBadge(item.productPairing.partnerProduct)}
                              </>
                            )}
                          </div>
                        </div>

                        <div className='flex items-center justify-between font-mono text-[11px] text-primary pt-1'>
                          <span>Dosis: {item.prescription.dosagePer16L}</span>
                          <span className='text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold'>
                            SLA: {item.prescription.recoverySlaDays}
                          </span>
                        </div>

                        <div className='border-t border-border/40 pt-2 text-[11px] text-muted-foreground'>
                          <span className='font-semibold text-foreground'>
                            Hook Iklan Kios:{' '}
                          </span>
                          &ldquo;{item.commercialMetaAdsHook.headline}&rdquo;
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* ============================================================== */}
          {/* TAB 4: KALKULATOR DOSIS & KEBUTUHAN LAHAN */}
          {/* ============================================================== */}
          <TabsContent value='kalkulator-dosis' className='space-y-6 pt-1'>
            <div className='grid gap-6 md:grid-cols-12'>
              {/* Form Input Parameters */}
              <Card className='border border-border shadow-xs md:col-span-5'>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-sm font-semibold'>
                    Parameter Kalkulasi Lapang
                  </CardTitle>
                  <CardDescription className='text-xs'>
                    Tentukan skala aplikasi untuk menghitung total kebutuhan konsentrat dan kemasan
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4 text-xs'>
                  {/* Mode Selector */}
                  <div className='space-y-1.5'>
                    <label className='font-semibold text-foreground'>
                      Metode Input:
                    </label>
                    <div className='grid grid-cols-2 gap-2'>
                      <Button
                        type='button'
                        variant={calcMode === 'AREA' ? 'default' : 'outline'}
                        size='sm'
                        className='text-xs'
                        onClick={() => setCalcMode('AREA')}
                      >
                        Luas Lahan (Ha/m²)
                      </Button>
                      <Button
                        type='button'
                        variant={calcMode === 'TANKS' ? 'default' : 'outline'}
                        size='sm'
                        className='text-xs'
                        onClick={() => setCalcMode('TANKS')}
                      >
                        Jumlah Tangki 16L
                      </Button>
                    </div>
                  </div>

                  {calcMode === 'AREA' ? (
                    <div className='grid grid-cols-2 gap-2'>
                      <div className='space-y-1.5'>
                        <label className='font-medium text-muted-foreground'>
                          Luas Lahan:
                        </label>
                        <Input
                          type='number'
                          min={0.1}
                          step={0.1}
                          value={calcAreaValue}
                          onChange={(e) => setCalcAreaValue(Number(e.target.value) || 1)}
                          className='h-9 text-xs'
                        />
                      </div>
                      <div className='space-y-1.5'>
                        <label className='font-medium text-muted-foreground'>
                          Satuan:
                        </label>
                        <div className='flex gap-1'>
                          {(['HA', 'M2', 'RANTE'] as const).map((unit) => (
                            <Button
                              key={unit}
                              type='button'
                              variant={calcAreaUnit === unit ? 'default' : 'outline'}
                              size='sm'
                              className='h-9 flex-1 px-1 text-[11px]'
                              onClick={() => setCalcAreaUnit(unit)}
                            >
                              {unit}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='space-y-1.5'>
                      <label className='font-medium text-muted-foreground'>
                        Jumlah Tangki Semprot (16 Liter):
                      </label>
                      <Input
                        type='number'
                        min={1}
                        value={calcTanksCount}
                        onChange={(e) => setCalcTanksCount(Number(e.target.value) || 1)}
                        className='h-9 text-xs'
                      />
                    </div>
                  )}

                  {/* Product Choice */}
                  <div className='space-y-1.5'>
                    <label className='font-medium text-muted-foreground'>
                      Pilih Produk Agrimarket:
                    </label>
                    <div className='grid grid-cols-2 gap-1.5'>
                      {products.map((p) => (
                        <Button
                          key={p.id}
                          type='button'
                          variant={calcSelectedProduct === p.id ? 'default' : 'outline'}
                          size='sm'
                          className='h-8 text-xs'
                          onClick={() => {
                            setCalcSelectedProduct(p.id)
                            if (p.id === 'saratoga') setCalcDosagePerTank(25)
                            else if (p.id === 'bensu') setCalcDosagePerTank(30)
                            else if (p.id === 'kojien') setCalcDosagePerTank(20)
                            else if (p.id === 'aussie') setCalcDosagePerTank(40)
                          }}
                        >
                          {p.shortTitle}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Dosage Input */}
                  <div className='space-y-1.5'>
                    <div className='flex items-center justify-between'>
                      <label className='font-medium text-muted-foreground'>
                        Dosis per Tangki 16L (ml):
                      </label>
                      <span className='font-mono text-xs font-bold text-primary'>
                        {calcDosagePerTank} ml / 16 Liter
                      </span>
                    </div>
                    <div className='flex gap-1.5'>
                      {[15, 20, 25, 30, 40].map((dose) => (
                        <Button
                          key={dose}
                          type='button'
                          variant={calcDosagePerTank === dose ? 'default' : 'outline'}
                          size='sm'
                          className='h-7 flex-1 px-1 text-xs font-mono'
                          onClick={() => setCalcDosagePerTank(dose)}
                        >
                          {dose}ml
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Calculator Output Dashboard */}
              <Card className='border border-border shadow-xs md:col-span-7'>
                <CardHeader className='pb-3'>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-sm font-semibold'>
                      Rekomendasi Kebutuhan Pembelian Lapang
                    </CardTitle>
                    <Badge variant='outline' className='font-mono text-xs'>
                      ESTIMASI PRESISI
                    </Badge>
                  </div>
                  <CardDescription className='text-xs'>
                    Hasil kalkulasi kebutuhan riil untuk mencegah kelebihan atau kekurangan stok di lahan
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4 text-xs'>
                  <div className='grid gap-3 sm:grid-cols-2'>
                    <div className='space-y-1 rounded-lg bg-muted/30 p-3'>
                      <div className='text-[11px] text-muted-foreground'>
                        Kebutuhan Tangki Semprot:
                      </div>
                      <div className='font-mono text-lg font-bold text-foreground'>
                        {calcResults.effectiveTanks} Tangki (16L)
                      </div>
                      <div className='text-[10px] text-muted-foreground'>
                        Volume Air: {calcResults.totalWaterLiter} Liter air bersih
                      </div>
                    </div>

                    <div className='space-y-1 rounded-lg bg-primary/5 border border-primary/20 p-3'>
                      <div className='text-[11px] text-primary'>
                        Total Konsentrat Dibutuhkan:
                      </div>
                      <div className='font-mono text-lg font-bold text-primary'>
                        {calcResults.totalConcentrateMl.toLocaleString()} ml
                      </div>
                      <div className='text-[10px] font-mono text-muted-foreground'>
                        Setara: {calcResults.totalConcentrateLiter} Liter
                      </div>
                    </div>
                  </div>

                  {/* Recommended Package */}
                  <div className='space-y-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3.5'>
                    <div className='flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400'>
                      <CheckCircle2 className='h-4 w-4' />
                      Rekomendasi Paket Pembelian di Kios Saprotan:
                    </div>
                    <div className='font-mono text-base font-bold text-foreground'>
                      {calcResults.recommendedPackage}
                    </div>
                    <p className='text-[11px] text-muted-foreground'>
                      Disarankan membeli kemasan sesuai rekomendasi agar efisien dan tidak meninggalkan
                      sisa obat terbuka terlalu lama yang berisiko teroksidasi.
                    </p>
                  </div>

                  {/* Standard Mixing Protocol */}
                  <div className='space-y-2 rounded-lg bg-muted/20 p-3 border border-border/50'>
                    <div className='font-semibold text-foreground text-xs'>
                      Protokol Pencampuran Standar Lapangan (SOP Tangki):
                    </div>
                    <ol className='list-decimal space-y-1 pl-4 text-[11px] text-muted-foreground'>
                      <li>
                        Isi tangki sprayer dengan air tawar bersih bersuhu normal sebanyak separuh volume (8 Liter).
                      </li>
                      <li>
                        Takarkan konsentrat produk sebanyak {calcDosagePerTank} ml menggunakan tutup takar presisi.
                      </li>
                      <li>
                        Larutkan konsentrat ke dalam ember kecil terlebih dahulu (pre-dilution) sebelum dituang ke tangki.
                      </li>
                      <li>
                        Tuang larutan ke dalam tangki, aduk perlahan, lalu tambahkan sisa air hingga tanda batas 16 Liter.
                      </li>
                      <li>
                        Lakukan penyemprotan kabut halus (mist nozzle) pada pagi hari sebelum pukul 09.00 WIB.
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ============================================================== */}
          {/* TAB 5: STANDAR KEAMANAN TANGKI SEMPROT */}
          {/* ============================================================== */}
          <TabsContent value='keamanan-tangki' className='space-y-6 pt-1'>
            <Card className='border border-border shadow-xs'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <Droplets className='h-4 w-4 text-primary' />
                  <CardTitle className='text-sm font-semibold'>
                    Standar Operasional Pencampuran Tangki (Universal Tank-Mix Safety)
                  </CardTitle>
                </div>
                <CardDescription className='text-xs'>
                  Pedoman keselamatan agronomi yang wajib dipatuhi di seluruh lini lapangan
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4 text-xs sm:grid-cols-3'>
                <div className='space-y-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-4'>
                  <div className='flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400'>
                    <CheckCircle2 className='h-4 w-4' />
                    Sangat Kompatibel (Boleh Dicampur)
                  </div>
                  <ul className='space-y-1.5 text-[11px] text-muted-foreground'>
                    <li>• Pupuk kalsium murni bebas boron tinggi</li>
                    <li>• Pupuk kalium sulfat / KNO3 putih butiran larut air</li>
                    <li>• Insektisida emamektin, abamektin, klorfenapir</li>
                    <li>• Fungisida mankozeb dan azoksistrobin dosis normal</li>
                    <li>• Pupuk hayati Trichoderma sp. (aplikasi sore hari)</li>
                  </ul>
                </div>

                <div className='space-y-2 rounded-lg bg-amber-500/5 border border-amber-500/20 p-4'>
                  <div className='flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400'>
                    <AlertTriangle className='h-4 w-4' />
                    Wajib Uji Jar-Test Terlebih Dahulu
                  </div>
                  <ul className='space-y-1.5 text-[11px] text-muted-foreground'>
                    <li>• Pupuk mikro majemuk dengan konsentrasi garam tinggi</li>
                    <li>• Formulasi insektisida berbasis minyak (EC / Oil Dispersion pekat)</li>
                    <li>• Perekat / penembus silikon berkonsentrasi sangat tinggi</li>
                    <li>• Air sumur berkapur tinggi / air payau keruh</li>
                    <li>• Herbisida selektif pratumbuh pada jagung</li>
                  </ul>
                </div>

                <div className='space-y-2 rounded-lg bg-rose-500/5 border border-rose-500/20 p-4'>
                  <div className='flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400'>
                    <XCircle className='h-4 w-4' />
                    DILARANG KERAS DICAMPUR
                  </div>
                  <ul className='space-y-1.5 text-[11px] text-muted-foreground'>
                    <li>• Fungisida tembaga hidroksida pekat (merusak asam amino)</li>
                    <li>• Herbisida glifosat / parakuat (wajib jeda minimal 7 hari)</li>
                    <li>• Larutan belerang (sulfur kental) pH sangat asam (&lt; 2.5)</li>
                    <li>• Kaporit / klorin tinggi pembersih instalasi air</li>
                    <li>• Campuran &gt; 3 jenis pestisida kimia pekat sekaligus</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Jar-Test SOP */}
            <Card className='border border-border shadow-xs'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <FlaskConical className='h-4 w-4 text-primary' />
                  <CardTitle className='text-sm font-semibold'>
                    SOP Uji Kompatibilitas Botol (15-Minute Jar-Test Protocol)
                  </CardTitle>
                </div>
                <CardDescription className='text-xs'>
                  Prosedur 4 langkah mudah untuk memastikan larutan tidak menggumpal sebelum dituangkan ke tangki semprot besar
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-3 text-xs'>
                <div className='grid gap-3 sm:grid-cols-4'>
                  <div className='rounded-lg bg-muted/30 p-3 space-y-1'>
                    <div className='font-mono text-xs font-bold text-primary'>Langkah 1</div>
                    <div className='font-semibold text-foreground'>Ambil Sampel Air</div>
                    <p className='text-[11px] text-muted-foreground leading-relaxed'>
                      Masukkan 500 ml air yang akan digunakan ke dalam botol transparan bersih.
                    </p>
                  </div>

                  <div className='rounded-lg bg-muted/30 p-3 space-y-1'>
                    <div className='font-mono text-xs font-bold text-primary'>Langkah 2</div>
                    <div className='font-semibold text-foreground'>Teteskan Bahan Campuran</div>
                    <p className='text-[11px] text-muted-foreground leading-relaxed'>
                      Teteskan produk sesuai proporsi dosis tangki (sekitar 1-2 ml) dan aduk rata.
                    </p>
                  </div>

                  <div className='rounded-lg bg-muted/30 p-3 space-y-1'>
                    <div className='font-mono text-xs font-bold text-primary'>Langkah 3</div>
                    <div className='font-semibold text-foreground'>Diamkan 15 Menit</div>
                    <p className='text-[11px] text-muted-foreground leading-relaxed'>
                      Letakkan botol di tempat teduh selama 15 menit tanpa digoyang.
                    </p>
                  </div>

                  <div className='rounded-lg bg-muted/30 p-3 space-y-1'>
                    <div className='font-mono text-xs font-bold text-primary'>Langkah 4</div>
                    <div className='font-semibold text-foreground'>Inspeksi Visual</div>
                    <p className='text-[11px] text-muted-foreground leading-relaxed'>
                      Jika timbul endapan seperti keju, buih tebal, atau panas, JANGAN campur di tangki.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
