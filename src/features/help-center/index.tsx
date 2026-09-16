import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  History,
  Sparkles,
  Calendar,
  Sprout,
  ShieldCheck,
  Search as SearchIcon,
  GitCommit,
  ExternalLink,
  BookOpen,
  Layers,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

interface ChangelogItem {
  title: string
  desc: string
  tag: string
  targetRoute?: string
  routeLabel?: string
}

interface ReleaseEntry {
  version: string
  date: string
  tagline: string
  category: 'FEATURES' | 'DATA' | 'UI_POLISH'
  badgeType: 'default' | 'secondary' | 'outline'
  summary: string
  highlights: ChangelogItem[]
}

const RELEASES: ReleaseEntry[] = [
  {
    version: 'v1.4.0',
    date: '16 September 2026',
    tagline: 'Field Operations Task Detail & Agronomist Telemetry Engine',
    category: 'FEATURES',
    badgeType: 'default',
    summary:
      'Penyempurnaan pusat kendali tugas lapangan dengan drawer detail interaktif (TasksDetailDrawer), standar operasional prosedur 5-langkah, formulasi dosis tangki 16L, profil kemitraan Poktan/KPL, log audit riwayat, dan integrasi WhatsApp dispatch satu-klik.',
    highlights: [
      {
        title: 'Interactive Task Detail Drawer (TasksDetailDrawer)',
        desc: 'Setiap baris tabel tugas, nomor ID tugas, judul, kartu Kanban, jadwal mingguan, dan meja darurat OPT dapat diklik untuk membuka lembar detail terintegrasi.',
        tag: 'Fitur Utama',
        targetRoute: '/tasks',
        routeLabel: 'Buka Field Operations Desk',
      },
      {
        title: 'Deep Linking Tugas Langsung (/tasks?taskId=...)',
        desc: 'Mendukung URL deep-link langsung menuju spesifik ID tugas (misal /tasks?taskId=TASK-1001) lengkap dengan auto-open drawer dan sinkronisasi status.',
        tag: 'Arsitektur URL',
        targetRoute: '/tasks?taskId=TASK-1001',
        routeLabel: 'Uji Deep Link TASK-1001',
      },
      {
        title: 'Rekomendasi Formulasi Input & Dosis Tangki Semprot 16L',
        desc: 'Spesifikasi bahan aktif resmi Kementan (fungisida sistemik translaminar, insektisida translaminar, pupuk mikro kelat) dengan takaran presisi per tangki 16L dan anjuran waktu semprot optimal.',
        tag: 'Agronomi Presisi',
      },
      {
        title: 'Standar Operasional Prosedur Lapangan (SOP 5 Langkah)',
        desc: 'Protokol baku bagi agronomis di petak lahan: kalibrasi pH air 6.0-6.8, metode pre-mix, penggunaan cone nozzle 3.0 bar, perataan kanopi, dan dokumentasi foto georeferenced.',
        tag: 'Tata Kelola Lapangan',
      },
      {
        title: 'Profil Kemitraan Poktan, Kios KPL, & Anggaran Operasional',
        desc: 'Informasi otomatis kelompok tani binaan, kios resmi KPL penyalur saprotan di lokasi sentra, target efikasi numerik, dan estimasi biaya operasional dalam Rupiah (IDR).',
        tag: 'Data Bisnis',
      },
      {
        title: 'Log Aktivitas Interaktif & Disposisi WhatsApp',
        desc: 'Form tambah catatan lapangan cepat langsung di drawer dan tombol kirim pesan disposisi baku ke nomor WhatsApp agronomis/mandor lapangan.',
        tag: 'Integrasi WA',
      },
    ],
  },
  {
    version: 'v1.3.0',
    date: '15 September 2026',
    tagline: 'Geospatial Drilldown Engine & Full 514-Regency Census Breakdown',
    category: 'DATA',
    badgeType: 'secondary',
    summary:
      'Pembaruan menyeluruh modul peta spasial nasional: integrasi drilldown paralel provinsi ke kabupaten, kelengkapan data sensus 514 kabupaten/kota se-Indonesia, kluster sentra komoditas, dan audit QA Gate-0 zero-delta.',
    highlights: [
      {
        title: 'Peta Spasial Drilldown Provinsi ke Kabupaten/Kota',
        desc: 'Klik pada provinsi manapun di Indonesia otomatis memecah data spasial ke seluruh kabupaten/kota di provinsi tersebut dengan visualisasi komparatif.',
        tag: 'Spasial Interaktif',
        targetRoute: '/map',
        routeLabel: 'Buka Geospatial Map',
      },
      {
        title: 'Breakdown Sensus Lengkap 514 Kabupaten/Kota Se-Indonesia',
        desc: 'Data mikro tingkat II mencakup luas panen (Ha), volume produksi (Ton), estimasi nilai farmgate (Miliar Rp), dan profil iklim sentra pertanian di 38 provinsi.',
        tag: 'Sensus BPS 2024',
      },
      {
        title: 'Kluster Sentra Primer & Wilayah Utama Pertanian',
        desc: 'Pemetaan kluster sentra utama komoditas pangan, hortikultura dataran tinggi, dan perkebunan (misal Brebes, Temanggung, Nganjuk, Karo, Kampar).',
        tag: 'Sentra Unggulan',
      },
      {
        title: 'Automated QA Test Engine (district-breakdown-qa.test.ts)',
        desc: 'Rangkaian 23 uji otomatis memvalidasi 494 titik data terhadap angka agregat BPS, memastikan 0 NaN, 0 nilai tak terhingga, dan kepatuhan Gate-0 matematis.',
        tag: 'Quality Assurance',
      },
    ],
  },
  {
    version: 'v1.2.0',
    date: '14 September 2026',
    tagline: 'Commercial Fertilizer Selling Windows & Phenology Calibration',
    category: 'DATA',
    badgeType: 'outline',
    summary:
      'Kalibrasi akurasi fenologi 13 komoditas strategis, penyelesaian isu kalkulasi Alpukat, penambahan tag momentum pembelian pupuk komersial, dan standardisasi 11 taksonomi fase agronomi.',
    highlights: [
      {
        title: 'Perbaikan Total Fase & Visibilitas Komoditas Alpukat',
        desc: 'Menuntaskan isu rekaman fase generatif Alpukat yang terputus, mengkalibrasi struktur margin komersial, dan memastikan kalkulasi P&L tampil sempurna.',
        tag: 'Perbaikan Komoditas',
        targetRoute: '/commodities',
        routeLabel: 'Lihat Analisis Komoditas',
      },
      {
        title: 'Jendela Waktu Jual Pupuk Komersial (Pupuk Timing)',
        desc: 'Indikator strategis momentum pembelian pupuk petani (fase Pengolahan Lahan/PL, Vegetatif/VG, dan Generatif/GN) untuk memandu sales prinsipal dan kios KPL mengunci pesanan.',
        tag: 'Komersial Pupuk',
      },
      {
        title: 'Standardisasi 11 Taksonomi Fase Agronomi & Bera Lahan (BR)',
        desc: 'Panduan lengkap kode fase: PL (Olah Lahan), TN (Tanam), SM (Persemaian), VG (Vegetatif), GN (Generatif), PT (Serangan OPT), PN (Panen), PF (Pupuk Sawit), HC (High Crop), LC (Low Crop), dan BR (Bera Lahan / Istirahat Tanah Pemutus Siklus Hama).',
        tag: 'Taksonomi Resmi',
        targetRoute: '/calendar',
        routeLabel: 'Buka Kalender Tanam',
      },
    ],
  },
  {
    version: 'v1.1.0',
    date: '13 September 2026',
    tagline: 'Clean Minimalist Tone, Full-Width Hero, & Zero Over-Width Mobile',
    category: 'UI_POLISH',
    badgeType: 'outline',
    summary:
      'Modernisasi visual antarmuka berprinsip clean modern, eliminasi elemen redundan/AI slop, perombakan hero section berlatar penuh (full-width), dan optimasi responsif layar smartphone.',
    highlights: [
      {
        title: 'Homepage Hero Full-Width Background',
        desc: 'Bagian hero berlatar penuh dengan subtle emerald radial glow, precision grid backdrop, dan penataan kartu metrik eksekutif yang elegan.',
        tag: 'Desain UI',
        targetRoute: '/',
        routeLabel: 'Lihat Homepage Hero',
      },
      {
        title: 'Pembersihan AI Slop & Elemen Template Tidak Perlu',
        desc: 'Menghilangkan drawer konfigurasi demo yang tidak relevan dan meniadakan tombol ganda pemicu navigasi di TopNav dan Header.',
        tag: 'Clean Code',
      },
      {
        title: 'Eliminasi Masalah Horizontal Over-Width pada Mobile',
        desc: 'Audit viewport mobile (360px - 420px): padding responsif, tabel pembungkus no-scrollbar, dan chip filter geser fleksibel tanpa kebocoran lebar layar.',
        tag: 'Mobile Precision',
      },
    ],
  },
  {
    version: 'v1.0.0',
    date: '10 September 2026',
    tagline: 'Core Agrimarket Telemetry Platform & TAM-SAM-SOM Sizing',
    category: 'FEATURES',
    badgeType: 'default',
    summary:
      'Peluncuran platform dasar intelijen pasar agribisnis: estimasi TAM-SAM-SOM 13 komoditas di 38 provinsi, simulator kapasitas SOM dinamis, dan BPS Audit Ledger.',
    highlights: [
      {
        title: 'Pemodelan TAM-SAM-SOM Terverifikasi BPS 2024',
        desc: 'Sizing pasar input komersial terperinci menggabungkan sensus KSA, SPH, dan Sensus Pertanian ST2023 BPS RI.',
        tag: 'Market Sizing',
      },
      {
        title: 'SOM Commercial Simulator Dinamis (/simulator)',
        desc: 'Kalkulasi potensi tangkapan pasar dengan kontrol kapasitas agronomis (N_sales), rasio jangkauan kios (K_coverage), dan batas plafon kredit tempo yarnen.',
        tag: 'Simulator Finansial',
        targetRoute: '/simulator',
        routeLabel: 'Buka SOM Simulator',
      },
      {
        title: 'BPS Audit Ledger & Ekspor Master Dataset (/audit)',
        desc: 'Buku besar verifikasi integritas matematika Gate-0 0.0000% delta dan tombol ekspor satu-klik Master Dataset JSON dan CSV.',
        tag: 'Audit Engine',
        targetRoute: '/audit',
        routeLabel: 'Buka Audit Ledger',
      },
    ],
  },
]

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  const filteredReleases = useMemo(() => {
    return RELEASES.filter((rel) => {
      // Category filter
      if (selectedCategory !== 'ALL' && rel.category !== selectedCategory) {
        return false
      }

      // Search query filter
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      const matchHeader =
        rel.version.toLowerCase().includes(q) ||
        rel.tagline.toLowerCase().includes(q) ||
        rel.summary.toLowerCase().includes(q) ||
        rel.date.toLowerCase().includes(q)
      const matchItems = rel.highlights.some(
        (h) =>
          h.title.toLowerCase().includes(q) ||
          h.desc.toLowerCase().includes(q) ||
          h.tag.toLowerCase().includes(q)
      )
      return matchHeader || matchItems
    })
  }, [searchQuery, selectedCategory])

  return (
    <>
      <Header fixed>
        <div className='flex items-center gap-2 me-auto min-w-0'>
          <History className='h-5 w-5 text-emerald-600 shrink-0' />
          <div className='min-w-0'>
            <h1 className='text-base font-bold tracking-tight text-foreground truncate'>
              System Update Log & Changelog
            </h1>
            <p className='text-xs text-muted-foreground hidden sm:block truncate'>
              Catatan pembaruan berkala fitur operasional, dataset BPS, perbaikan bug, dan optimasi performa
            </p>
          </div>
        </div>
        <Search className='hidden sm:flex' />
        <ThemeSwitch />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-5 sm:gap-6 p-4 sm:p-6 pb-16'>
        {/* Hero Banner Update Log */}
        <div className='relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-background to-muted/30 p-5 sm:p-7 shadow-xs'>
          <div className='pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl' />
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10'>
            <div className='space-y-2 max-w-3xl'>
              <div className='flex flex-wrap items-center gap-2'>
                <Badge variant='outline' className='bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 font-semibold text-xs'>
                  <Sparkles className='h-3 w-3 mr-1 text-emerald-600' />
                  Versi Stabil: v1.4.0 Live
                </Badge>
                <Badge variant='secondary' className='text-xs'>
                  5 Siklus Rilis Produksi
                </Badge>
                <Badge variant='outline' className='text-xs font-mono text-muted-foreground'>
                  100% Gate-0 Verified
                </Badge>
              </div>
              <h2 className='text-xl sm:text-2xl font-bold tracking-tight text-foreground'>
                Agrimarket Telemetry Release Ledger
              </h2>
              <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                Transparansi penuh atas setiap penyempurnaan kode, pemutakhiran data sensus 514 kabupaten BPS 2024, kalibrasi algoritma agronomi, serta modul eksekusi lapangan terintegrasi.
              </p>
            </div>

            {/* Quick Summary Numbers */}
            <div className='grid grid-cols-2 gap-2 sm:gap-3 shrink-0'>
              <div className='rounded-xl border bg-background/80 p-3 text-center shadow-2xs backdrop-blur-xs'>
                <div className='text-xs text-muted-foreground font-medium'>Sensus Daerah</div>
                <div className='text-lg font-bold font-mono text-foreground mt-0.5'>514 Kab/Kota</div>
              </div>
              <div className='rounded-xl border bg-background/80 p-3 text-center shadow-2xs backdrop-blur-xs'>
                <div className='text-xs text-muted-foreground font-medium'>Komoditas</div>
                <div className='text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5'>13 Strategis</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b pb-4'>
          {/* Filter Pills */}
          <div className='flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1'>
            {[
              { key: 'ALL', label: 'Semua Pembaruan' },
              { key: 'FEATURES', label: 'Fitur & Operasional' },
              { key: 'DATA', label: 'Data BPS & QA' },
              { key: 'UI_POLISH', label: 'Desain & Mobile Polish' },
            ].map((cat) => (
              <Button
                key={cat.key}
                size='sm'
                variant={selectedCategory === cat.key ? 'default' : 'outline'}
                className='h-8 text-xs shrink-0'
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Quick Search */}
          <div className='relative w-full sm:w-72 shrink-0'>
            <SearchIcon className='absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Cari pembaruan (misal: SOP, Alpukat, Map)...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='h-8.5 pl-8 text-xs'
            />
          </div>
        </div>

        {/* Release Timeline Entries */}
        <div className='space-y-6'>
          {filteredReleases.length === 0 ? (
            <div className='rounded-xl border border-dashed p-8 text-center space-y-2'>
              <History className='h-8 w-8 mx-auto text-muted-foreground/60' />
              <div className='text-sm font-semibold text-foreground'>Tidak ditemukan catatan pembaruan</div>
              <p className='text-xs text-muted-foreground max-w-sm mx-auto'>
                Kata kunci &quot;{searchQuery}&quot; tidak cocok dengan riwayat log pembaruan. Silakan reset filter pencarian Anda.
              </p>
              <Button size='sm' variant='outline' onClick={() => { setSearchQuery(''); setSelectedCategory('ALL') }} className='h-7 text-xs mt-2'>
                Reset Filter
              </Button>
            </div>
          ) : (
            filteredReleases.map((release) => (
              <Card key={release.version} className='border shadow-xs overflow-hidden'>
                <CardHeader className='pb-3 bg-muted/20 border-b'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                    <div className='flex items-center gap-2.5 flex-wrap'>
                      <Badge variant='outline' className='font-mono font-bold text-xs bg-background px-2.5 py-1 border-primary/40 text-primary shadow-2xs'>
                        {release.version}
                      </Badge>
                      <span className='font-bold text-base text-foreground'>
                        {release.tagline}
                      </span>
                    </div>

                    <div className='flex items-center gap-2 text-xs text-muted-foreground shrink-0'>
                      <Calendar className='h-3.5 w-3.5 text-muted-foreground' />
                      <span className='font-medium'>{release.date}</span>
                    </div>
                  </div>
                  <CardDescription className='text-xs text-muted-foreground mt-1.5 leading-relaxed'>
                    {release.summary}
                  </CardDescription>
                </CardHeader>

                <CardContent className='p-4 sm:p-5 space-y-3'>
                  <div className='text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 pb-1'>
                    <GitCommit className='h-3.5 w-3.5 text-emerald-600' />
                    Rincian Item Perubahan & Penyempurnaan:
                  </div>

                  <div className='grid gap-2.5 sm:grid-cols-2'>
                    {release.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className='rounded-lg border bg-card/60 p-3.5 space-y-1.5 hover:border-emerald-400/50 hover:bg-muted/20 transition-all shadow-2xs flex flex-col justify-between'
                      >
                        <div className='space-y-1'>
                          <div className='flex items-start justify-between gap-2'>
                            <h4 className='font-semibold text-xs text-foreground leading-snug'>
                              {item.title}
                            </h4>
                            <Badge variant='outline' className='text-[10px] shrink-0 font-medium px-1.5 py-0'>
                              {item.tag}
                            </Badge>
                          </div>
                          <p className='text-xs text-muted-foreground leading-relaxed'>
                            {item.desc}
                          </p>
                        </div>

                        {item.targetRoute && (
                          <div className='pt-2 mt-auto border-t border-border/40'>
                            <Button
                              asChild
                              size='sm'
                              variant='ghost'
                              className='h-6 text-[11px] px-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 p-0'
                            >
                              <Link to={item.targetRoute}>
                                <span>{item.routeLabel || 'Lihat Fitur Terkait'}</span>
                                <ExternalLink className='h-2.5 w-2.5 ml-1 opacity-70' />
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Knowledge Base & FAQ Reference (Preserved & Cleaned) */}
        <Card className='border shadow-xs mt-4'>
          <CardHeader className='pb-3'>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='text-base font-semibold flex items-center gap-2'>
                  <BookOpen className='h-4 w-4 text-primary' />
                  Referensi Dasar Metodologi & Sumber Data BPS
                </CardTitle>
                <CardDescription className='text-xs'>
                  Arsip acuan konsep TAM-SAM-SOM, Kerangka Sampel Area (KSA), dan Sensus Pertanian ST2023
                </CardDescription>
              </div>
              <Badge variant='outline' className='text-xs hidden sm:inline-flex'>
                Dokumentasi Teknis
              </Badge>
            </div>
          </CardHeader>

          <CardContent className='grid gap-3 sm:grid-cols-3'>
            <div className='rounded-lg border p-3.5 space-y-1.5 bg-muted/20'>
              <div className='font-bold text-xs text-foreground flex items-center gap-1.5'>
                <Sprout className='h-3.5 w-3.5 text-emerald-600' /> TAM (Total Market)
              </div>
              <p className='text-[11px] text-muted-foreground leading-relaxed'>
                Total seluruh luas panen fisik (Ha), produksi (Ton), dan nilai kotor panen (Miliar Rp) 13 komoditas strategis bersumber dari sensus resmi BPS RI.
              </p>
            </div>

            <div className='rounded-lg border p-3.5 space-y-1.5 bg-muted/20'>
              <div className='font-bold text-xs text-foreground flex items-center gap-1.5'>
                <Layers className='h-3.5 w-3.5 text-blue-600' /> SAM (Serviceable Market)
              </div>
              <p className='text-[11px] text-muted-foreground leading-relaxed'>
                Pangsa pasar saprotan komersial pabrikan yang lolos 4 driver: orientasi komersial petani, adopsi input, daya beli, dan keterjangkauan kios KPL.
              </p>
            </div>

            <div className='rounded-lg border p-3.5 space-y-1.5 bg-muted/20'>
              <div className='font-bold text-xs text-foreground flex items-center gap-1.5'>
                <ShieldCheck className='h-3.5 w-3.5 text-purple-600' /> SOM (Obtainable Market)
              </div>
              <p className='text-[11px] text-muted-foreground leading-relaxed'>
                Kapasitas rebut riil prinsipal yang dibatasi daya jangkau agronomis (N_sales), pembinaan kios dealer, dan pagu tempo yarnen modal kerja.
              </p>
            </div>
          </CardContent>
        </Card>
      </Main>
    </>
  )
}

// Alias for backwards route compatibility
export const UpdateLog = HelpCenter
