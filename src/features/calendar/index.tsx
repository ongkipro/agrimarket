import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Calendar as CalendarIcon,
  Package,
  Filter,
  Clock,
  DollarSign,
  ArrowLeftRight,
  BookOpen,
  CloudSun,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
  getCommodities,
  getMonthlyActiveSellingOpportunities,
  getCalendarMatrix,
  type CalendarYearMode,
} from '@/features/agri/data-provider'

export function CroppingCalendar() {
  const commodities = getCommodities()
  const [selectedMonth, setSelectedMonth] = useState<number>(9) // Default: September (Bulan 9)
  const [selectedSector, setSelectedSector] = useState<string>('ALL')
  const [yearMode, setYearMode] = useState<CalendarYearMode>('2026_EL_NINO')

  const calendarMatrix = getCalendarMatrix(yearMode)
  const activeOpportunities =
    getMonthlyActiveSellingOpportunities(selectedMonth)

  const months = [
    { num: 1, name: 'Januari', subround: 'SR 1 (Jan-Apr)' },
    { num: 2, name: 'Februari', subround: 'SR 1 (Jan-Apr)' },
    { num: 3, name: 'Maret', subround: 'SR 1 (Jan-Apr)' },
    { num: 4, name: 'April', subround: 'SR 1 (Jan-Apr)' },
    { num: 5, name: 'Mei', subround: 'SR 2 (Mei-Agu)' },
    { num: 6, name: 'Juni', subround: 'SR 2 (Mei-Agu)' },
    { num: 7, name: 'Juli', subround: 'SR 2 (Mei-Agu)' },
    { num: 8, name: 'Agustus', subround: 'SR 2 (Mei-Agu)' },
    { num: 9, name: 'September', subround: 'SR 3 (Sep-Des)' },
    { num: 10, name: 'Oktober', subround: 'SR 3 (Sep-Des)' },
    { num: 11, name: 'November', subround: 'SR 3 (Sep-Des)' },
    { num: 12, name: 'Desember', subround: 'SR 3 (Sep-Des)' },
  ]

  // Phase Definitions & Color Tokens
  const phaseMap: Record<
    string,
    { label: string; bg: string; text: string; border: string; desc: string }
  > = {
    PL: {
      label: 'Pengolahan Lahan',
      bg: 'bg-stone-100 dark:bg-stone-900/50',
      text: 'text-stone-700 dark:text-stone-300',
      border: 'border-stone-300 dark:border-stone-700',
      desc: 'Olah tanah, drainase, dan stocking awal di kios pengecer.',
    },
    TN: {
      label: 'Tanam Raya',
      bg: 'bg-emerald-100 dark:bg-emerald-950/60',
      text: 'text-emerald-800 dark:text-emerald-300',
      border: 'border-emerald-300 dark:border-emerald-800',
      desc: 'Penanaman bibit/benih, pemupukan dasar, herbisida pra-tumbuh.',
    },
    SM: {
      label: 'Persemaian',
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      text: 'text-teal-800 dark:text-teal-300',
      border: 'border-teal-300 dark:border-teal-800',
      desc: 'Persiapan bibit rumah lindung / pembibitan awal.',
    },
    VG: {
      label: 'Vegetatif Cepat',
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      text: 'text-blue-800 dark:text-blue-300',
      border: 'border-blue-300 dark:border-blue-800',
      desc: 'Pemupukan susulan 1, herbisida selektif, pencegahan hama awal.',
    },
    GN: {
      label: 'Generatif / Buah',
      bg: 'bg-purple-100 dark:bg-purple-950/50',
      text: 'text-purple-800 dark:text-purple-300',
      border: 'border-purple-300 dark:border-purple-800',
      desc: 'Pengisian bulir/buah, aplikasi kalium, kalsium foliar, boron.',
    },
    PT: {
      label: 'Serangan OPT Kritis',
      bg: 'bg-rose-100 dark:bg-rose-950/60',
      text: 'text-rose-800 dark:text-rose-300',
      border: 'border-rose-300 dark:border-rose-800',
      desc: 'Puncak ancaman hama/penyakit, penyemprotan protektif & kuratif intensif.',
    },
    PN: {
      label: 'Panen Raya',
      bg: 'bg-amber-100 dark:bg-amber-950/60',
      text: 'text-amber-900 dark:text-amber-300',
      border: 'border-amber-300 dark:border-amber-800',
      desc: 'Pemetikan/panen, likuidasi uang tunai petani, pelunasan kredit yarnen.',
    },
    HC: {
      label: 'High Crop (Sawit)',
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      text: 'text-orange-800 dark:text-orange-300',
      border: 'border-orange-300 dark:border-orange-800',
      desc: 'Puncak produksi TBS tahunan, kapasitas pabrik kelapa sawit penuh.',
    },
    LC: {
      label: 'Low Crop (Sawit)',
      bg: 'bg-zinc-100 dark:bg-zinc-900/50',
      text: 'text-zinc-700 dark:text-zinc-300',
      border: 'border-zinc-300 dark:border-zinc-700',
      desc: 'Periode istirahat tanaman, pasokan TBS rendah.',
    },
    PF: {
      label: 'Pemupukan Sawit',
      bg: 'bg-indigo-100 dark:bg-indigo-950/50',
      text: 'text-indigo-800 dark:text-indigo-300',
      border: 'border-indigo-300 dark:border-indigo-800',
      desc: 'Aplikasi pupuk makro perkebunan (Urea, MOP/KCl, Rock Phosphate, Kieserite).',
    },
    BR: {
      label: 'Bera Lahan',
      bg: 'bg-muted',
      text: 'text-muted-foreground',
      border: 'border-border',
      desc: 'Periode istirahat tanah, sanitasi lahan, pemutusan siklus hama.',
    },
  }

  // Dynamic Monthly Alerts based on Year Mode
  const getMonthlyAlert = (monthNum: number, mode: CalendarYearMode) => {
    if (mode === '2026_EL_NINO') {
      const elNinoAlerts: Record<
        number,
        { title: string; focus: string; commercialAction: string }
      > = {
        9: {
          title: 'Kemarau Puncak El Niño & Olah Tanah MT 1 Tertunda',
          focus:
            'Pompanisasi Alsintan, Pembenah Tanah, Asam Humat, Sanitasi Sawah Kering',
          commercialAction:
            'Kemunduran musim hujan di 61,08% ZOM. Tunda tebar benih hingga curah hujan dasarian >50 mm. Distributor geser buffer stocking pupuk dasar ke November.',
        },
        10: {
          title: 'Onset Hujan Tertunda di Jawa & Persiapan Benih Genjah',
          focus:
            'Benih Padi Umur Genjah (Inpari 42 GSR, Inpago 9), Herbisida Pra-Tumbuh',
          commercialAction:
            'Hanya sentra beririgasi teknis yang mulai semai. Kios KPL fokus pasok benih tahan kering dan insektisida seed treatment penggerek batang.',
        },
        11: {
          title:
            'Tanam Serentak Padi MT 1 Rendeng Jawa & Sumatera (Hujan Tiba)',
          focus:
            'Pupuk Dasar NPK & Urea, Herbisida Selektif, Insektisida Klorantraniliprol',
          commercialAction:
            'Gelombang tanam raya MT 1 serentak tiba pasca kemunduran 30 hari. Lonjakan tajam serapan pupuk NPK majemuk di kios-kios Pantura.',
        },
        12: {
          title: 'Fase Vegetatif Aktif & Tanam Sawah Tadah Hujan',
          focus:
            'Pupuk Susulan 1 (Urea/ZA), Pengendalian Gulma Purna Tumbuh, Nutrisi Anakan',
          commercialAction:
            'Petani sawah tadah hujan mengejar tanam akhir. Permintaan herbisida selektif purna tumbuh melonjak tinggi di kios.',
        },
      }
      if (elNinoAlerts[monthNum]) return elNinoAlerts[monthNum]
    } else if (mode === '2027_PROJECTED') {
      const projected2027Alerts: Record<
        number,
        { title: string; focus: string; commercialAction: string }
      > = {
        1: {
          title: 'Puncak Panen MT 1 Tertunda & Pencegahan Jamur Blas Basah',
          focus:
            'Fungisida Azol + Strobilurin, Bakterisida Xanthomonas, Pengering Malai',
          commercialAction:
            'Panen raya dari pergeseran tanam 2026. Kelembaban tinggi akibat normalisasi hujan; kios wajib stok fungisida kuratif kapasitas ganda.',
        },
        2: {
          title: 'Panen Raya Padi Melimpah & Likuiditas Tunai Petani',
          focus: 'Pelunasan Kredit Yarnen & Stocking MT 2 Gadu Cepat',
          commercialAction:
            'Puncak kas petani. Agronomist kawal penagihan kios dan persiapkan benih jagung hibrida untuk musim tanam gadu kedua.',
        },
        10: {
          title: 'Normalisasi Tanam MT 1 2027/2028 Tepat Waktu',
          focus:
            'NPK Dasar, Benih Bersertifikat, Pupuk Organik, Herbisida Pra-Tumbuh',
          commercialAction:
            'Musim hujan tiba serentak normal di Oktober 2027 tanpa keterlambatan. Tanam raya berjalan serentak sesuai kalender standar.',
        },
      }
      if (projected2027Alerts[monthNum]) return projected2027Alerts[monthNum]
    }

    // Default Climatological Baseline
    const defaultAlerts: Record<
      number,
      { title: string; focus: string; commercialAction: string }
    > = {
      1: {
        title: 'Puncak Musim Rendeng & Proteksi Penyakit Jamur',
        focus:
          'Fungisida Blast Padi, Phytophthora Kentang/Tomat, Antraknosa Cabai',
        commercialAction:
          'Pasok fungisida kuratif azol + strobilurin ke kios. Petani menghadapi resiko busuk buah dan blast malai akibat curah hujan tinggi.',
      },
      2: {
        title: 'Awal Panen Raya Padi Dataran Rendah & Padi MT 1',
        focus: 'Persiapan Pengolahan Lahan MT 2 & Benih Jagung Hibrida',
        commercialAction:
          'Distributor mulai mengumpulkan pesanan benih jagung dan herbisida pra-tumbuh untuk musim gadu pasca panen padi.',
      },
      3: {
        title: 'Panen Raya Padi Nasional & Likuiditas Kas Petani',
        focus:
          'Pelunasan Kredit Yarnen & Stocking Awal Musim Tanam Gadu (MT 2)',
        commercialAction:
          'Puncak likuiditas tunai petani. Agronomist harus mengawal penagihan tempo kios dan mengunci kuota produk untuk musim tanam April-Mei.',
      },
      4: {
        title: 'Transisi MT 1 ke MT 2 (Gadu 1) & Tanam Bawang/Semangka',
        focus: 'Benih Bawang Merah, Semangka, Melon, Pupuk Dasar NPK & Urea',
        commercialAction:
          'Pengiriman massal NPK dan insektisida ulat grayak ke sentra Pantura Jawa (Brebes, Cirebon, Demak) dan sentra horti Jawa Timur.',
      },
      5: {
        title: 'Tanam Raya Hortikultura Musim Kemarau & Tembakau',
        focus:
          'Insektisida Klorfenapir, Emamektin, Pupuk Bebas Klorin (ZK / KNO3)',
        commercialAction:
          'Petani tembakau mulai tanam lapangan (larangan klorin!). Penjualan pupuk kalium sulfat dan insektisida FAW/Spodoptera melonjak.',
      },
      6: {
        title: 'Fase Vegetatif Hortikultura & Serangan Thrips / Kutu Kebul',
        focus:
          'Insektisida Sistemik, Abamektin, Imidakloprid, Perekat/Penembus',
        commercialAction:
          'Cuaca kering memicu ledakan populasi serangga vektor virus kuning. Promosikan paket insektisida + akarisida dengan perekat.',
      },
      7: {
        title: 'Puncak Panen Bawang Merah & Semangka / Melon',
        focus:
          'Pupuk Pembesar Buah Kalium Tinggi, Kalsium Boron, Pengering Daun',
        commercialAction:
          'Panen raya Bima, Nganjuk, dan Banyuwangi. Perputaran uang kas tinggi di pasar induk Kramat Jati dan Osowilangun.',
      },
      8: {
        title: 'Puncak Panen Tembakau & Awal High Crop Kelapa Sawit',
        focus: 'Pupuk Sawit Semester 2 (MOP/KCl + Urea), Herbisida Piringan',
        commercialAction:
          'Perkebunan sawit memasuki periode panen puncak (High Crop). Alokasikan pasokan pupuk MOP dan herbisida glifosat di Riau, Sumut, dan Kalteng.',
      },
      9: {
        title: 'Pre-Season Booking Padi MT 1 Rendeng & Pupuk Semester 2 Sawit',
        focus:
          'Benih Padi Bersertifikat, Herbisida Pra-Tumbuh, NPK Dasar, MOP Sawit',
        commercialAction:
          'Jendela krusial! Distributor harus sudah melakukan pre-season booking ke pabrikan dan mengalokasikan stok fisik ke seluruh kios KPL.',
      },
      10: {
        title: 'Tanam Raya Serempak Padi MT 1 (Rendeng) di Jawa & Sumatera',
        focus:
          'Herbisida Selektif Purna-Tumbuh, Pupuk Dasar, Insektisida Penggerek Batang',
        commercialAction:
          'Pelaksanaan demplot aplikasi herbisida selektif bersama kelompok tani (Poktan). Distribusi pupuk bersubsidi dan komersial berjalan serempak.',
      },
      11: {
        title: 'Fase Vegetatif Padi MT 1 & Puncak Panen Buah Alpukat',
        focus:
          'Insektisida Ulat Grayak Jagung (FAW), Pupuk Susulan 1, Penggerek Batang',
        commercialAction:
          'Monitoring serangan ulat FAW pada jagung muda umur 15-30 HST. Kampanye edukasi penyemprotan tepat sasaran di pucuk daun.',
      },
      12: {
        title: 'Puncak Hujan, Pengisian Bulir Padi, & Bunga Potong Akhir Tahun',
        focus:
          'Fungisida Blast Malai, Nutrisi Anggrek Bunga Potong, Kalsium Buah',
        commercialAction:
          'Permintaan bunga potong anggrek melonjak drastis menjelang Natal & Tahun Baru. Proteksi malai padi dari hawar pelepah (Rhizoctonia).',
      },
    }
    return defaultAlerts[monthNum] || defaultAlerts[9]
  }

  const filteredCommodities =
    selectedSector === 'ALL'
      ? commodities
      : commodities.filter((c) => c.sector === selectedSector)

  const activeAlert = getMonthlyAlert(selectedMonth, yearMode)

  return (
    <>
      <Header>
        <div className='me-auto flex min-w-0 items-center gap-2'>
          <CalendarIcon className='h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400' />
          <span className='truncate text-sm font-bold tracking-tight sm:text-base'>
            Kalender Tanam Terpadu & Jadwal Pembelian Input (13 Komoditas)
          </span>
        </div>
        <div className='ms-auto flex shrink-0 items-center gap-2'>
          <Search className='hidden sm:flex' />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='space-y-6'>
        {/* Page Header Banner */}
        <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
          <div>
            <div className='flex items-center gap-2'>
              <h1 className='text-xl font-bold tracking-tight'>
                Kalender Tanam & Gelombang Distribusi Saprotan Nasional
              </h1>
              <Badge variant='outline' className='font-mono text-[10px]'>
                Katam BPS / Kementan
              </Badge>
            </div>
            <p className='mt-0.5 text-xs text-muted-foreground'>
              Panduan siklus bulanan pengolahan lahan, tanam raya, serangan OPT
              kritis, dan penyerapan likuiditas panen untuk perencanaan
              distribusi input agrokimia & pupuk.
            </p>
          </div>

          {/* Sector Filter Pills */}
          <div className='flex flex-wrap items-center gap-1.5'>
            <Filter className='mr-1 h-3.5 w-3.5 text-muted-foreground' />
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
        </div>

        {/* YEAR SELECTION TOGGLE & AGRO-CLIMATE INTEGRATION BANNER */}
        <div className='space-y-2.5'>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <div className='inline-flex rounded-lg border border-border bg-muted/40 p-1'>
              <button
                onClick={() => setYearMode('2026_EL_NINO')}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                  yearMode === '2026_EL_NINO'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Tahun Ini: 2026 (El Niño Aktif &amp; Kemunduran Musim Tanam)
              </button>
              <button
                onClick={() => setYearMode('2027_PROJECTED')}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                  yearMode === '2027_PROJECTED'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Tahun Depan: 2027 (Proyeksi Normalisasi &amp; La Niña)
              </button>
              <button
                onClick={() => setYearMode('CLIMATOLOGICAL_NORMAL')}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                  yearMode === 'CLIMATOLOGICAL_NORMAL'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Normal Klimatologis (Standar BPS)
              </button>
            </div>

            <Link
              to='/climate'
              className='inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline'
            >
              <CloudSun className='h-4 w-4' />
              <span>Detail Agroklimat BMKG &amp; 699 ZOM</span>
              <ArrowUpRight className='h-3.5 w-3.5' />
            </Link>
          </div>

          {/* Contextual Agroklimat Status Strip */}
          <div className='flex flex-col justify-between gap-2.5 rounded-lg border border-border bg-muted/20 p-3 text-xs sm:flex-row sm:items-center'>
            <div className='flex items-start gap-2.5'>
              <ShieldAlert className='mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400' />
              <div>
                <span className='font-bold text-foreground'>
                  {yearMode === '2026_EL_NINO'
                    ? 'Dinamika Kalender Tanam 2026 (El Niño Aktif +1.68°C): '
                    : yearMode === '2027_PROJECTED'
                      ? 'Proyeksi Kalender Tanam 2027 (Transisi Netral & La Niña Lemah): '
                      : 'Acuan Kalender Tanam Rujukan Standar Klimatologis: '}
                </span>
                <span className='text-muted-foreground'>
                  {yearMode === '2026_EL_NINO'
                    ? 'Awal musim hujan mundur di 61,08% ZOM (1-3 dasarian). Puncak tanam serentak padi MT 1 rendeng bergeser ke November–Desember 2026. Buffer stocking pupuk dasar bergeser 30 hari.'
                    : yearMode === '2027_PROJECTED'
                      ? 'El Niño meluruh di Q1 2027. Panen raya padi melimpah di Feb–Mar 2027; kemarau bertipe basah dan waspadai lonjakan penyakit jamur patogen (blas & patek antraknosa).'
                      : 'Rata-rata klimatologis 30 tahun (ZOM9120) tanpa anomali iklim ekstrem. Digunakan sebagai dasar perbandingan neraca tanam nasional.'}
                </span>
              </div>
            </div>
            <Badge
              variant='outline'
              className='shrink-0 self-start font-mono text-[10px] sm:self-center'
            >
              {yearMode === '2026_EL_NINO'
                ? 'Status: El Niño Kuat'
                : yearMode === '2027_PROJECTED'
                  ? 'Status: Pemulihan ENSO'
                  : 'Status: Normal'}
            </Badge>
          </div>
        </div>

        {/* SUBROUND 1, 2, 3 FULL-YEAR ANALYSIS BREAKDOWN */}
        <div className='grid gap-3 sm:grid-cols-3'>
          <Card className='border border-border shadow-xs'>
            <CardHeader className='px-3.5 pt-3.5 pb-2'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                  Subround 1 (Jan – Apr)
                </span>
                <Badge variant='secondary' className='text-[10px]'>
                  Musim Rendeng
                </Badge>
              </div>
              <CardTitle className='mt-1 text-xs font-bold'>
                {yearMode === '2026_EL_NINO'
                  ? 'Panen MT 1 Tertunda & Harga GKG Tinggi'
                  : yearMode === '2027_PROJECTED'
                    ? 'Panen Raya Massal & Waspada Blas Padi'
                    : 'Panen Raya Padi MT 1 Normal'}
              </CardTitle>
            </CardHeader>
            <CardContent className='px-3.5 pb-3.5 text-[11px] leading-relaxed text-muted-foreground'>
              {yearMode === '2026_EL_NINO'
                ? 'Panen padi terkonsentrasi di Maret-April dampak kekeringan 2025. Perputaran uang kas petani melimpah; pelunasan yarnen lancar.'
                : yearMode === '2027_PROJECTED'
                  ? 'Panen raya melimpah dari pergeseran tanam akhir 2026. Kelembaban tinggi memicu penyakit jamur; siapkan fungisida azol ganda.'
                  : 'Puncak panen padi nasional (45-50% produksi tahunan). Periode likuiditas kas petani tertinggi dan pelunasan pinjaman saprodi.'}
            </CardContent>
          </Card>

          <Card className='border border-border shadow-xs'>
            <CardHeader className='px-3.5 pt-3.5 pb-2'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                  Subround 2 (Mei – Agu)
                </span>
                <Badge variant='secondary' className='text-[10px]'>
                  Musim Gadu
                </Badge>
              </div>
              <CardTitle className='mt-1 text-xs font-bold'>
                {yearMode === '2026_EL_NINO'
                  ? 'Kemarau Terik & Ledakan Vektor Hama'
                  : yearMode === '2027_PROJECTED'
                    ? 'Kemarau Basah & IP Sawah Naik'
                    : 'Tanam Palawija & Sayuran Komersial'}
              </CardTitle>
            </CardHeader>
            <CardContent className='px-3.5 pb-3.5 text-[11px] leading-relaxed text-muted-foreground'>
              {yearMode === '2026_EL_NINO'
                ? 'Waduk irigasi menyusut. Petani menanam semangka, tembakau, dan jagung. Ledakan hama thrips cabai dan ulat FAW jagung muda.'
                : yearMode === '2027_PROJECTED'
                  ? 'Curah hujan di atas normal mendukung pertanaman padi MT 2 dan MT 3 tanpa defisit air. Tanaman tembakau perlu drainase ekstra.'
                  : 'Transisi lahan sawah ke palawija (jagung, kedelai) dan hortikultura sayuran dataran rendah (bawang merah Brebes).'}
            </CardContent>
          </Card>

          <Card className='border border-border shadow-xs'>
            <CardHeader className='px-3.5 pt-3.5 pb-2'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                  Subround 3 (Sep – Des)
                </span>
                <Badge variant='secondary' className='text-[10px]'>
                  Awal Rendeng Baru
                </Badge>
              </div>
              <CardTitle className='mt-1 text-xs font-bold'>
                {yearMode === '2026_EL_NINO'
                  ? 'Bera Panjang & Tanam Geser ke Nov-Des'
                  : yearMode === '2027_PROJECTED'
                    ? 'Tanam MT 1 Serempak Tepat Waktu'
                    : 'Tanam Raya Serentak MT 1 Padi'}
              </CardTitle>
            </CardHeader>
            <CardContent className='px-3.5 pb-3.5 text-[11px] leading-relaxed text-muted-foreground'>
              {yearMode === '2026_EL_NINO'
                ? '61,08% ZOM mundur. Tanam Oktober tertunda ke November/Desember. Prioritaskan pompanisasi dan varietas padi umur genjah (Inpari 42 GSR).'
                : yearMode === '2027_PROJECTED'
                  ? 'Hujan datang tepat waktu di Oktober 2027. Tanam serentak normal di seluruh Jawa dan Sumatera dengan jaminan air optimal.'
                  : 'Musim hujan dimulai di seluruh wilayah ekuatorial dan monsunal. Olah lahan dan pemupukan dasar massal di kios KPL.'}
            </CardContent>
          </Card>
        </div>

        {/* 12 Months Selector Tabs */}
        <div className='no-scrollbar overflow-x-auto pb-1'>
          <div className='flex min-w-max items-center gap-1.5'>
            {months.map((m) => {
              const isSelected = m.num === selectedMonth
              return (
                <button
                  key={m.num}
                  onClick={() => setSelectedMonth(m.num)}
                  className={`flex min-w-[85px] cursor-pointer flex-col items-center rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                      : 'border-border bg-card text-foreground hover:bg-accent'
                  }`}
                >
                  <span className='font-bold'>{m.name}</span>
                  <span
                    className={`mt-0.5 text-[10px] ${isSelected ? 'opacity-90' : 'text-muted-foreground'}`}
                  >
                    Bulan {m.num}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Month Commercial Action Alert Banner */}
        <Card className='border bg-card shadow-xs'>
          <CardHeader className='pb-2'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4 text-primary' />
                <CardTitle className='text-sm font-semibold'>
                  Fokus Lapangan & Strategi Komersial Bulan{' '}
                  {months[selectedMonth - 1]?.name} (
                  {months[selectedMonth - 1]?.subround})
                </CardTitle>
              </div>
              <Badge className='bg-primary/90 text-xs text-primary-foreground'>
                {activeAlert.title}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className='space-y-3 text-xs'>
            <div className='grid gap-3 md:grid-cols-2'>
              <div className='space-y-1 rounded-lg border bg-muted/20 p-3'>
                <div className='flex items-center gap-1.5 font-semibold text-foreground'>
                  <Package className='h-3.5 w-3.5 text-indigo-600' />
                  Fokus Kategori Produk & Ancaman Lapangan
                </div>
                <div className='font-mono text-[11px] leading-relaxed text-muted-foreground'>
                  {activeAlert.focus}
                </div>
              </div>
              <div className='space-y-1 rounded-lg border bg-muted/20 p-3'>
                <div className='flex items-center gap-1.5 font-semibold text-foreground'>
                  <DollarSign className='h-3.5 w-3.5 text-emerald-600' />
                  Rekomendasi Aksi Distributor & Agronomist
                </div>
                <div className='text-[11px] leading-relaxed text-muted-foreground'>
                  {activeAlert.commercialAction}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Commercial Selling Opportunities for Selected Month */}
        <Card className='border border-amber-500/30 bg-card shadow-xs'>
          <CardHeader className='pb-2'>
            <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
              <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4 shrink-0 text-amber-500' />
                <CardTitle className='text-sm font-semibold'>
                  Waktu Emas Penjualan Pupuk & Saprodi Bulan{' '}
                  {months[selectedMonth - 1]?.name}
                </CardTitle>
              </div>
              <Badge
                variant='outline'
                className='w-fit border-amber-500/40 text-xs text-amber-700 dark:text-amber-400'
              >
                {activeOpportunities.filter((o) => o.isGoldenPeak).length}{' '}
                Komoditas di Puncak Pembelian Pupuk
              </Badge>
            </div>
            <CardDescription className='text-xs'>
              Daftar komoditas strategis yang berada di jendela waktu pembelian
              pupuk aktif oleh petani pada bulan{' '}
              {months[selectedMonth - 1]?.name}. Gunakan untuk panduan tim sales
              agronomist & dealer stocking.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {activeOpportunities.map((item, idx) => (
                <div
                  key={`${item.cropId}-${idx}`}
                  className={`rounded-lg border p-3 transition-all ${
                    item.isGoldenPeak
                      ? 'border-amber-500/40 bg-amber-500/10 shadow-xs'
                      : 'border-border bg-card/70 hover:bg-muted/30'
                  }`}
                >
                  <div className='flex items-start justify-between gap-1'>
                    <div>
                      <span className='text-sm font-bold text-foreground'>
                        {item.cropName}
                      </span>
                      <div className='text-[10px] font-medium text-muted-foreground'>
                        {item.phase.target_months_label}
                      </div>
                    </div>
                    {item.isGoldenPeak ? (
                      <Badge className='shrink-0 bg-amber-500 px-1.5 py-0 text-[10px] font-semibold text-white dark:text-black'>
                        GOLDEN PEAK
                      </Badge>
                    ) : (
                      <Badge
                        variant='secondary'
                        className='shrink-0 px-1.5 py-0 text-[10px]'
                      >
                        {item.phase.category.replace('PUPUK_', '')}
                      </Badge>
                    )}
                  </div>

                  <div className='mt-2 space-y-1.5 text-xs'>
                    <div className='text-[11px] font-medium text-foreground'>
                      {item.phase.phase_name}
                    </div>
                    <div className='text-[11px] text-muted-foreground'>
                      <span className='font-semibold text-foreground'>
                        Booking KPL:{' '}
                      </span>
                      {item.phase.kiosk_booking_window}
                    </div>
                    <div className='rounded border bg-background/80 p-1.5 font-mono text-[11px] leading-tight text-foreground'>
                      <span className='font-sans font-semibold text-amber-700 dark:text-amber-400'>
                        Produk:{' '}
                      </span>
                      {item.phase.product_recommendations
                        .slice(0, 3)
                        .join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Master 12-Month Matrix Table */}
        <Card className='border shadow-xs'>
          <CardHeader className='pb-3'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <CardTitle className='text-sm font-semibold'>
                    Matriks Kalender Tanam Nasional (12 Bulan × 13 Komoditas)
                  </CardTitle>
                  <CardDescription>
                    Warna blok menunjukkan fase budidaya dominan pada bulan
                    berjalan
                  </CardDescription>
                </div>
              </div>
              {/* Legend Badges - Complete 10 Phase Codes */}
              <div className='flex flex-wrap items-center gap-1.5 pt-1 text-[11px]'>
                <span className='rounded border border-stone-300 bg-stone-100 px-1.5 py-0.5 font-semibold text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300'>
                  PL: Olah Lahan
                </span>
                <span className='rounded border border-emerald-300 bg-emerald-100 px-1.5 py-0.5 font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'>
                  TN: Tanam
                </span>
                <span className='rounded border border-teal-300 bg-teal-100 px-1.5 py-0.5 font-semibold text-teal-800 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300'>
                  SM: Persemaian
                </span>
                <span className='rounded border border-blue-300 bg-blue-100 px-1.5 py-0.5 font-semibold text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300'>
                  VG: Vegetatif
                </span>
                <span className='rounded border border-purple-300 bg-purple-100 px-1.5 py-0.5 font-semibold text-purple-800 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300'>
                  GN: Generatif
                </span>
                <span className='rounded border border-rose-300 bg-rose-100 px-1.5 py-0.5 font-semibold text-rose-800 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300'>
                  PT: Serangan OPT
                </span>
                <span className='rounded border border-amber-300 bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300'>
                  PN: Panen Raya
                </span>
                <span className='rounded border border-indigo-300 bg-indigo-100 px-1.5 py-0.5 font-semibold text-indigo-800 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'>
                  PF: Pemupukan Sawit
                </span>
                <span className='rounded border border-orange-300 bg-orange-100 px-1.5 py-0.5 font-semibold text-orange-800 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300'>
                  HC: High Crop
                </span>
                <span className='rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-semibold text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'>
                  LC: Low Crop
                </span>
                <span className='rounded border border-border bg-muted px-1.5 py-0.5 font-semibold text-muted-foreground'>
                  BR: Bera Lahan
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='mb-2 flex items-center justify-between text-[11px] text-muted-foreground sm:hidden'>
              <span className='inline-flex items-center gap-1 font-medium'>
                <ArrowLeftRight className='h-3 w-3' /> Geser tabel secara
                horizontal untuk melihat 12 bulan
              </span>
            </div>
            <div className='overflow-x-auto rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow className='bg-muted/50 text-xs font-semibold'>
                    <TableHead className='sticky left-0 z-20 w-[160px] min-w-[140px] border-r bg-background shadow-sm'>
                      Komoditas
                    </TableHead>
                    {months.map((m) => (
                      <TableHead
                        key={m.num}
                        className={`w-[55px] text-center ${
                          m.num === selectedMonth
                            ? 'bg-primary/15 font-bold text-primary'
                            : ''
                        }`}
                      >
                        {m.name.substring(0, 3)}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCommodities.map((crop) => {
                    const rowCodes =
                      calendarMatrix[crop.id] || Array(12).fill('VG')
                    return (
                      <TableRow
                        key={crop.id}
                        className='text-xs transition-colors hover:bg-muted/30'
                      >
                        <TableCell className='sticky left-0 z-10 border-r bg-background font-semibold text-foreground shadow-sm'>
                          <div>
                            <div>{crop.name}</div>
                            <div className='text-[10px] font-normal text-muted-foreground'>
                              {crop.sector.replace('Hortikultura ', '')}
                            </div>
                          </div>
                        </TableCell>
                        {rowCodes.map((code, monthIdx) => {
                          const phase = phaseMap[code] || phaseMap.VG
                          const isHighlightedMonth =
                            monthIdx + 1 === selectedMonth
                          return (
                            <TableCell
                              key={monthIdx}
                              className={`p-1.5 text-center ${
                                isHighlightedMonth
                                  ? 'bg-primary/5 ring-1 ring-primary/20'
                                  : ''
                              }`}
                            >
                              <div
                                title={`${crop.name} Bulan ${months[monthIdx].name}: ${phase.label} - ${phase.desc}`}
                                className={`w-full rounded border py-1 text-[10px] font-bold transition-transform hover:scale-105 ${phase.bg} ${phase.text} ${phase.border}`}
                              >
                                {code}
                              </div>
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Agronomic Phase Technical Glossary & Action Guide */}
        <Card className='border shadow-xs'>
          <CardHeader className='pb-3'>
            <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
              <div>
                <CardTitle className='flex items-center gap-2 text-sm font-semibold'>
                  <BookOpen className='h-4 w-4 text-emerald-600 dark:text-emerald-400' />
                  Glosarium Kode Fase Budidaya &amp; Tindakan Kritis Lapang
                </CardTitle>
                <CardDescription className='text-xs'>
                  Penjelasan singkat arti 11 kode fase budidaya pada matriks
                  kalender dan fokus input agronomis
                </CardDescription>
              </div>
              <Badge
                variant='outline'
                className='self-start font-mono text-xs sm:self-auto'
              >
                Standar Operasional Lapang
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid gap-2.5 text-xs sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              <div className='space-y-1 rounded-lg border border-stone-200 bg-stone-50/50 p-2.5 dark:border-stone-800 dark:bg-stone-900/30'>
                <div className='flex items-center gap-1.5 font-bold text-stone-900 dark:text-stone-200'>
                  <span className='rounded bg-stone-200 px-1.5 py-0.5 text-[10px] dark:bg-stone-800'>
                    PL
                  </span>
                  Olah Lahan (Land Prep)
                </div>
                <p className='text-[11px] leading-snug text-stone-700 dark:text-stone-400'>
                  Pembajakan, penggaruan, sanitasi sisa tanaman, dan penaburan
                  kapur dolomit untuk netralisasi pH tanah masam.
                </p>
              </div>

              <div className='space-y-1 rounded-lg border border-emerald-200 bg-emerald-50/50 p-2.5 dark:border-emerald-900 dark:bg-emerald-950/20'>
                <div className='flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-200'>
                  <span className='rounded bg-emerald-200 px-1.5 py-0.5 text-[10px] dark:bg-emerald-900'>
                    TN
                  </span>
                  Tanam Raya (Planting)
                </div>
                <p className='text-[11px] leading-snug text-emerald-700 dark:text-emerald-400'>
                  Penanaman bibit atau sebar benih serentak di hamparan sentra
                  untuk meminimalisir sebaran hama penyakit.
                </p>
              </div>

              <div className='space-y-1 rounded-lg border border-teal-200 bg-teal-50/50 p-2.5 dark:border-teal-900 dark:bg-teal-950/20'>
                <div className='flex items-center gap-1.5 font-bold text-teal-900 dark:text-teal-200'>
                  <span className='rounded bg-teal-200 px-1.5 py-0.5 text-[10px] dark:bg-teal-900'>
                    SM
                  </span>
                  Persemaian (Nursery)
                </div>
                <p className='text-[11px] leading-snug text-teal-700 dark:text-teal-400'>
                  Penyemaian benih unggul di tray/bedengan pembibitan dengan
                  proteksi insektisida seed treatment sebelum pindah tanam.
                </p>
              </div>

              <div className='space-y-1 rounded-lg border border-blue-200 bg-blue-50/50 p-2.5 dark:border-blue-900 dark:bg-blue-950/20'>
                <div className='flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-200'>
                  <span className='rounded bg-blue-200 px-1.5 py-0.5 text-[10px] dark:bg-blue-900'>
                    VG
                  </span>
                  Vegetatif Cepat
                </div>
                <p className='text-[11px] leading-snug text-blue-700 dark:text-blue-400'>
                  Fase pembentukan anakan, akar, dan tajuk daun aktif. Fokus
                  utama aplikasi pupuk berunsur Nitrogen tinggi &amp; Fosfat.
                </p>
              </div>

              <div className='space-y-1 rounded-lg border border-purple-200 bg-purple-50/50 p-2.5 dark:border-purple-900 dark:bg-purple-950/20'>
                <div className='flex items-center gap-1.5 font-bold text-purple-900 dark:text-purple-200'>
                  <span className='rounded bg-purple-200 px-1.5 py-0.5 text-[10px] dark:bg-purple-900'>
                    GN
                  </span>
                  Generatif / Pembungaan
                </div>
                <p className='text-[11px] leading-snug text-purple-700 dark:text-purple-400'>
                  Inisiasi bunga, pembentukan buah, dan pengisian bulir/umbi.
                  Membutuhkan asupan Kalium tinggi, Kalsium, dan Boron.
                </p>
              </div>

              <div className='space-y-1 rounded-lg border border-rose-200 bg-rose-50/50 p-2.5 dark:border-rose-900 dark:bg-rose-950/20'>
                <div className='flex items-center gap-1.5 font-bold text-rose-900 dark:text-rose-200'>
                  <span className='rounded bg-rose-200 px-1.5 py-0.5 text-[10px] dark:bg-rose-900'>
                    PT
                  </span>
                  Serangan OPT Kritis
                </div>
                <p className='text-[11px] leading-snug text-rose-700 dark:text-rose-400'>
                  Puncak ledakan hama/patogen (wereng, ulat grayak, patek
                  antraknosa). Memerlukan aplikasi fungisida &amp; insektisida
                  kuratif intensif.
                </p>
              </div>

              <div className='space-y-1 rounded-lg border border-amber-200 bg-amber-50/50 p-2.5 dark:border-amber-900 dark:bg-amber-950/20'>
                <div className='flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200'>
                  <span className='rounded bg-amber-200 px-1.5 py-0.5 text-[10px] dark:bg-amber-900'>
                    PN
                  </span>
                  Panen Raya (Harvest)
                </div>
                <p className='text-[11px] leading-snug text-amber-700 dark:text-amber-400'>
                  Pemetikan/pemanenan massal hasil panen di sentra utama.
                  Periode likuidasi hasil panen dan pelunasan pinjaman tempo
                  yarnen.
                </p>
              </div>

              <div className='space-y-1 rounded-lg border border-indigo-200 bg-indigo-50/50 p-2.5 dark:border-indigo-900 dark:bg-indigo-950/20'>
                <div className='flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-200'>
                  <span className='rounded bg-indigo-200 px-1.5 py-0.5 text-[10px] dark:bg-indigo-900'>
                    PF
                  </span>
                  Pemupukan Sawit (PF)
                </div>
                <p className='text-[11px] leading-snug text-indigo-700 dark:text-indigo-400'>
                  Aplikasi pupuk makro terprogram (Urea, MOP, Kieserit, Borat)
                  di piringan pohon sawit sebelum masuk musim kemarau atau hujan
                  lebat.
                </p>
              </div>

              <div className='space-y-1 rounded-lg border border-orange-200 bg-orange-50/50 p-2.5 dark:border-orange-900 dark:bg-orange-950/20'>
                <div className='flex items-center gap-1.5 font-bold text-orange-900 dark:text-orange-200'>
                  <span className='rounded bg-orange-200 px-1.5 py-0.5 text-[10px] dark:bg-orange-900'>
                    HC
                  </span>
                  High Crop Sawit (Puncak)
                </div>
                <p className='text-[11px] leading-snug text-orange-700 dark:text-orange-400'>
                  Puncak produksi bulanan Tandan Buah Segar (TBS) kelapa sawit
                  di mana kapasitas pabrik kelapa sawit (PKS) terisi maksimal.
                </p>
              </div>

              <div className='space-y-1 rounded-lg border border-zinc-200 bg-zinc-50/50 p-2.5 dark:border-zinc-800 dark:bg-zinc-900/30'>
                <div className='flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-200'>
                  <span className='rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] dark:bg-zinc-800'>
                    LC
                  </span>
                  Low Crop Sawit (Trek)
                </div>
                <p className='text-[11px] leading-snug text-zinc-700 dark:text-zinc-400'>
                  Masa istirahat fisiologis pohon sawit di mana produksi TBS
                  anjlok. Fokus pemulihan nutrisi piringan dan perbaikan
                  drainase.
                </p>
              </div>

              <div className='space-y-1 rounded-lg border border-border bg-muted/40 p-2.5 sm:col-span-2 lg:col-span-1 xl:col-span-2'>
                <div className='flex items-center gap-1.5 font-bold text-foreground'>
                  <span className='rounded bg-muted-foreground/20 px-1.5 py-0.5 text-[10px]'>
                    BR
                  </span>
                  Bera Lahan (Fallow)
                </div>
                <p className='text-[11px] leading-snug text-muted-foreground'>
                  Lahan diistirahatkan tanpa tanaman budidaya untuk memutus
                  siklus hidup hama tanah, aerasi matahari, dan pemulihan
                  mikroorganisme hara.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agro-Ecosystem Rotation Diagrams & Field Timing */}
        <div className='grid gap-4 md:grid-cols-3'>
          <Card className='border shadow-xs'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xs font-semibold text-muted-foreground uppercase'>
                Rotasi Sawah Irigasi Teknis (Jawa)
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-xs'>
              <div className='space-y-1 rounded-lg border bg-muted/20 p-2.5'>
                <div className='font-bold text-foreground'>
                  Okt - Feb: Padi MT 1 (Rendeng)
                </div>
                <div className='text-[11px] text-muted-foreground'>
                  Puncak luas panen dan alokasi pupuk terbesar.
                </div>
              </div>
              <div className='space-y-1 rounded-lg border bg-muted/20 p-2.5'>
                <div className='font-bold text-foreground'>
                  Mar - Jun: Padi MT 2 (Gadu 1)
                </div>
                <div className='text-[11px] text-muted-foreground'>
                  Pemanfaatan sisa air tanah dan irigasi sekunder.
                </div>
              </div>
              <div className='space-y-1 rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 dark:border-emerald-800 dark:bg-emerald-950/30'>
                <div className='font-bold text-emerald-800 dark:text-emerald-300'>
                  Jul - Okt: Palawija / Hortikultura
                </div>
                <div className='text-[11px] text-emerald-700 dark:text-emerald-400'>
                  Jagung, Bawang Merah, Semangka pemutus siklus wereng.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='border shadow-xs'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xs font-semibold text-muted-foreground uppercase'>
                Rotasi Hortikultura Dataran Tinggi
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-xs'>
              <div className='space-y-1 rounded-lg border bg-muted/20 p-2.5'>
                <div className='font-bold text-foreground'>
                  Nov - Feb: Kentang Siklus 1
                </div>
                <div className='text-[11px] text-muted-foreground'>
                  Intensitas fungisida Phytophthora tertinggi (2x/minggu).
                </div>
              </div>
              <div className='space-y-1 rounded-lg border bg-muted/20 p-2.5'>
                <div className='font-bold text-foreground'>
                  Mar - Jun: Kubis / Wortel
                </div>
                <div className='text-[11px] text-muted-foreground'>
                  Memutus inang nematoda bengkak akar (*Meloidogyne*).
                </div>
              </div>
              <div className='space-y-1 rounded-lg border border-blue-200 bg-blue-50 p-2.5 dark:border-blue-800 dark:bg-blue-950/30'>
                <div className='font-bold text-blue-800 dark:text-blue-300'>
                  Jul - Okt: Tomat / Cabai / Kentang 2
                </div>
                <div className='text-[11px] text-blue-700 dark:text-blue-400'>
                  Kualitas umbi dan buah optimal pada musim kemarau sejuk.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='border shadow-xs'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xs font-semibold text-muted-foreground uppercase'>
                Timeline Pre-Season Booking Input
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-xs'>
              <div className='flex items-center justify-between rounded border bg-card p-2'>
                <span className='font-medium'>T - 60 Hari</span>
                <span className='text-muted-foreground'>
                  Alokasi kuota & plafon tempo kios
                </span>
              </div>
              <div className='flex items-center justify-between rounded border bg-card p-2'>
                <span className='font-medium'>T - 30 Hari</span>
                <span className='font-bold text-primary'>
                  Buffer stocking fisik di gudang
                </span>
              </div>
              <div className='flex items-center justify-between rounded border bg-card p-2'>
                <span className='font-medium'>T - 15 Hari</span>
                <span className='text-muted-foreground'>
                  Temu lapang & perlakuan benih Poktan
                </span>
              </div>
              <div className='flex items-center justify-between rounded border bg-card p-2'>
                <span className='font-medium'>T + 100 Hari</span>
                <span className='font-bold text-emerald-600'>
                  Pelunasan tempo yarnen pasca panen
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
