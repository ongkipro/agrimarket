import { useState } from 'react'
import {
  Calendar as CalendarIcon,
  Package,
  Filter,
  Clock,
  DollarSign,
  ArrowLeftRight,
  Sparkles,
  BookOpen,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
import { getCommodities, getMonthlyActiveSellingOpportunities } from '@/features/agri/data-provider'


export function CroppingCalendar() {
  const commodities = getCommodities()
  const [selectedMonth, setSelectedMonth] = useState<number>(9) // Default: September (Bulan 9)
  const [selectedSector, setSelectedSector] = useState<string>('ALL')
  const activeOpportunities = getMonthlyActiveSellingOpportunities(selectedMonth)

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
  const phaseMap: Record<string, { label: string; bg: string; text: string; border: string; desc: string }> = {
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

  // 13 Crops monthly schedule matrix
  const calendarMatrix: Record<string, string[]> = {
    COMM_01_PADI: ['VG', 'GN', 'PN', 'PL', 'TN', 'VG', 'GN', 'PN', 'PL', 'TN', 'VG', 'VG'],
    COMM_02_JAGUNG: ['VG', 'GN', 'PN', 'PL', 'TN', 'VG', 'GN', 'PN', 'PL', 'TN', 'VG', 'GN'],
    COMM_03_CABAI: ['PN', 'PN', 'PL', 'TN', 'VG', 'GN', 'PN', 'PN', 'PL', 'TN', 'VG', 'GN'],
    COMM_04_BAWANG_MERAH: ['PL', 'TN', 'GN', 'PN', 'PL', 'TN', 'GN', 'PN', 'PL', 'TN', 'GN', 'PN'],
    COMM_05_KENTANG: ['GN', 'PN', 'PL', 'TN', 'VG', 'GN', 'PN', 'PL', 'TN', 'VG', 'GN', 'PN'],
    COMM_06_KUBIS: ['GN', 'PN', 'PL', 'TN', 'VG', 'GN', 'PN', 'PL', 'TN', 'VG', 'GN', 'PN'],
    COMM_07_TOMAT: ['PN', 'PL', 'TN', 'VG', 'GN', 'PN', 'PL', 'TN', 'VG', 'GN', 'PN', 'PL'],
    COMM_08_SEMANGKA: ['BR', 'PL', 'TN', 'VG', 'GN', 'PN', 'PL', 'TN', 'VG', 'GN', 'PN', 'BR'],
    COMM_09_MELON: ['BR', 'PL', 'TN', 'VG', 'GN', 'PN', 'PL', 'TN', 'VG', 'GN', 'PN', 'BR'],
    COMM_10_KELAPA_SAWIT: ['PN', 'LC', 'PF', 'PF', 'VG', 'PN', 'HC', 'HC', 'PF', 'HC', 'PF', 'PN'],
    COMM_11_ALPUKAT: ['PN', 'PN', 'BR', 'PL', 'VG', 'VG', 'GN', 'GN', 'VG', 'VG', 'PN', 'PN'],
    COMM_12_TEMBAKAU: ['BR', 'BR', 'SM', 'PL', 'TN', 'VG', 'GN', 'PN', 'PN', 'PN', 'BR', 'BR'],
    COMM_13_ANGGREK: ['PN', 'PN', 'PL', 'VG', 'VG', 'GN', 'PN', 'VG', 'VG', 'GN', 'GN', 'PN'],
  }

  // Monthly Commercial Input Action Guide
  const monthlyProcurementAlerts: Record<number, { title: string; focus: string; commercialAction: string }> = {
    1: {
      title: 'Puncak Musim Rendeng & Proteksi Penyakit Jamur',
      focus: 'Fungisida Blast Padi, Phytophthora Kentang/Tomat, Antraknosa Cabai',
      commercialAction: 'Pasok fungisida kuratif azol + strobilurin ke kios. Petani menghadapi resiko busuk buah dan blast malai akibat curah hujan tinggi.',
    },
    2: {
      title: 'Awal Panen Raya Padi Dataran Rendah & Padi MT 1',
      focus: 'Persiapan Pengolahan Lahan MT 2 & Benih Jagung Hibrida',
      commercialAction: 'Distributor mulai mengumpulkan pesanan benih jagung dan herbisida pra-tumbuh untuk musim gadu pasca panen padi.',
    },
    3: {
      title: 'Panen Raya Padi Nasional & Likuiditas Kas Petani',
      focus: 'Pelunasan Kredit Yarnen & Stocking Awal Musim Tanam Gadu (MT 2)',
      commercialAction: 'Puncak likuiditas tunai petani. Agronomist harus mengawal penagihan tempo kios dan mengunci kuota produk untuk musim tanam April-Mei.',
    },
    4: {
      title: 'Transisi MT 1 ke MT 2 (Gadu 1) & Tanam Bawang/Semangka',
      focus: 'Benih Bawang Merah, Semangka, Melon, Pupuk Dasar NPK & Urea',
      commercialAction: 'Pengiriman massal NPK dan insektisida ulat grayak ke sentra Pantura Jawa (Brebes, Cirebon, Demak) dan sentra horti Jawa Timur.',
    },
    5: {
      title: 'Tanam Raya Hortikultura Musim Kemarau & Tembakau',
      focus: 'Insektisida Klorfenapir, Emamektin, Pupuk Bebas Klorin (ZK / KNO3)',
      commercialAction: 'Petani tembakau mulai tanam lapangan (larangan klorin!). Penjualan pupuk kalium sulfat dan insektisida FAW/Spodoptera melonjak.',
    },
    6: {
      title: 'Fase Vegetatif Hortikultura & Serangan Thrips / Kutu Kebul',
      focus: 'Insektisida Sistemik, Abamektin, Imidakloprid, Perekat/Penembus',
      commercialAction: 'Cuaca kering memicu ledakan populasi serangga vektor virus kuning. Promosikan paket insektisida + akarisida dengan perekat.',
    },
    7: {
      title: 'Puncak Panen Bawang Merah & Semangka / Melon',
      focus: 'Pupuk Pembesar Buah Kalium Tinggi, Kalsium Boron, Pengering Daun',
      commercialAction: 'Panen raya Bima, Nganjuk, dan Banyuwangi. Perputaran uang kas tinggi di pasar induk Kramat Jati dan Osowilangun.',
    },
    8: {
      title: 'Puncak Panen Tembakau & Awal High Crop Kelapa Sawit',
      focus: 'Pupuk Sawit Semester 2 (MOP/KCl + Urea), Herbisida Piringan',
      commercialAction: 'Perkebunan sawit memasuki periode panen puncak (High Crop). Alokasikan pasokan pupuk MOP dan herbisida glifosat di Riau, Sumut, dan Kalteng.',
    },
    9: {
      title: 'Pre-Season Booking Padi MT 1 Rendeng & Pupuk Semester 2 Sawit',
      focus: 'Benih Padi Bersertifikat, Herbisida Pra-Tumbuh, NPK Dasar, MOP Sawit',
      commercialAction: 'Jendela krusial! Distributor harus sudah melakukan pre-season booking ke pabrikan dan mengalokasikan stok fisik ke seluruh kios KPL.',
    },
    10: {
      title: 'Tanam Raya Serempak Padi MT 1 (Rendeng) di Jawa & Sumatera',
      focus: 'Herbisida Selektif Purna-Tumbuh, Pupuk Dasar, Insektisida Penggerek Batang',
      commercialAction: 'Pelaksanaan demplot aplikasi herbisida selektif bersama kelompok tani (Poktan). Distribusi pupuk bersubsidi dan komersial berjalan serempak.',
    },
    11: {
      title: 'Fase Vegetatif Padi MT 1 & Puncak Panen Buah Alpukat',
      focus: 'Insektisida Ulat Grayak Jagung (FAW), Pupuk Susulan 1, Penggerek Batang',
      commercialAction: 'Monitoring serangan ulat FAW pada jagung muda umur 15-30 HST. Kampanye edukasi penyemprotan tepat sasaran di pucuk daun.',
    },
    12: {
      title: 'Puncak Hujan, Pengisian Bulir Padi, & Bunga Potong Akhir Tahun',
      focus: 'Fungisida Blast Malai, Nutrisi Anggrek Bunga Potong, Kalsium Buah',
      commercialAction: 'Permintaan bunga potong anggrek melonjak drastis menjelang Natal & Tahun Baru. Proteksi malai padi dari hawar pelepah (Rhizoctonia).',
    },
  }

  const filteredCommodities =
    selectedSector === 'ALL'
      ? commodities
      : commodities.filter((c) => c.sector === selectedSector)

  const activeAlert = monthlyProcurementAlerts[selectedMonth] || monthlyProcurementAlerts[9]

  return (
    <>
      <Header>
        <div className='flex items-center gap-2 me-auto min-w-0'>
          <CalendarIcon className='h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0' />
          <span className='font-bold tracking-tight text-sm sm:text-base truncate'>
            Kalender Tanam Terpadu & Jadwal Pembelian Input (13 Komoditas)
          </span>
        </div>
        <div className='ms-auto flex items-center gap-2 shrink-0'>
          <Search className='hidden sm:flex' />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='space-y-6'>
        {/* Page Header Banner */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <div>
            <div className='flex items-center gap-2'>
              <h1 className='text-xl font-bold tracking-tight'>
                Kalender Tanam & Gelombang Distribusi Saprotan Nasional
              </h1>
              <Badge variant='outline' className='text-[10px] font-mono'>
                Katam BPS / Kementan
              </Badge>
            </div>
            <p className='text-xs text-muted-foreground mt-0.5'>
              Panduan siklus bulanan pengolahan lahan, tanam raya, serangan OPT kritis, dan penyerapan likuiditas panen untuk perencanaan distribusi input agrokimia & pupuk.
            </p>
          </div>

          {/* Sector Filter Pills */}
          <div className='flex flex-wrap items-center gap-1.5'>
            <Filter className='h-3.5 w-3.5 text-muted-foreground mr-1' />
            {['ALL', 'Tanaman Pangan', 'Hortikultura Sayuran', 'Hortikultura Buah', 'Perkebunan', 'Florikultura'].map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                  selectedSector === sec
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground hover:bg-muted border-border'
                }`}
              >
                {sec === 'ALL' ? 'Semua Sektor' : sec.replace('Hortikultura ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* 12 Months Selector Tabs */}
        <div className='overflow-x-auto pb-1 no-scrollbar'>
          <div className='flex items-center gap-1.5 min-w-max'>
            {months.map((m) => {
              const isSelected = m.num === selectedMonth
              return (
                <button
                  key={m.num}
                  onClick={() => setSelectedMonth(m.num)}
                  className={`flex flex-col items-center px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer min-w-[85px] ${
                    isSelected
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-card text-foreground hover:bg-accent border-border'
                  }`}
                >
                  <span className='font-bold'>{m.name}</span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? 'opacity-90' : 'text-muted-foreground'}`}>
                    Bulan {m.num}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Month Commercial Action Alert Banner */}
        <Card className='border shadow-xs bg-card'>
          <CardHeader className='pb-2'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4 text-primary' />
                <CardTitle className='text-sm font-semibold'>
                  Fokus Lapangan & Strategi Komersial Bulan {months[selectedMonth - 1]?.name} ({months[selectedMonth - 1]?.subround})
                </CardTitle>
              </div>
              <Badge className='bg-primary/90 text-primary-foreground text-xs'>
                {activeAlert.title}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className='space-y-3 text-xs'>
            <div className='grid gap-3 md:grid-cols-2'>
              <div className='rounded-lg border p-3 bg-muted/20 space-y-1'>
                <div className='font-semibold text-foreground flex items-center gap-1.5'>
                  <Package className='h-3.5 w-3.5 text-indigo-600' />
                  Fokus Kategori Produk & Ancaman Lapangan
                </div>
                <div className='text-muted-foreground font-mono text-[11px] leading-relaxed'>
                  {activeAlert.focus}
                </div>
              </div>
              <div className='rounded-lg border p-3 bg-muted/20 space-y-1'>
                <div className='font-semibold text-foreground flex items-center gap-1.5'>
                  <DollarSign className='h-3.5 w-3.5 text-emerald-600' />
                  Rekomendasi Aksi Distributor & Agronomist
                </div>
                <div className='text-muted-foreground text-[11px] leading-relaxed'>
                  {activeAlert.commercialAction}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Commercial Selling Opportunities for Selected Month */}
        <Card className='border shadow-xs border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-card to-card'>
          <CardHeader className='pb-2'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
              <div className='flex items-center gap-2'>
                <Sparkles className='h-4 w-4 text-amber-500 shrink-0' />
                <CardTitle className='text-sm font-semibold'>
                  Waktu Emas Penjualan Pupuk & Saprodi Bulan {months[selectedMonth - 1]?.name}
                </CardTitle>
              </div>
              <Badge variant='outline' className='text-xs border-amber-500/40 text-amber-700 dark:text-amber-400 w-fit'>
                {activeOpportunities.filter((o) => o.isGoldenPeak).length} Komoditas di Puncak Pembelian Pupuk
              </Badge>
            </div>
            <CardDescription className='text-xs'>
              Daftar komoditas strategis yang berada di jendela waktu pembelian pupuk aktif oleh petani pada bulan {months[selectedMonth - 1]?.name}. Gunakan untuk panduan tim sales agronomist & dealer stocking.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {activeOpportunities.map((item, idx) => (
                <div
                  key={`${item.cropId}-${idx}`}
                  className={`rounded-lg border p-3 transition-all ${
                    item.isGoldenPeak
                      ? 'bg-amber-500/10 border-amber-500/40 shadow-xs'
                      : 'bg-card/70 border-border hover:bg-muted/30'
                  }`}
                >
                  <div className='flex items-start justify-between gap-1'>
                    <div>
                      <span className='font-bold text-sm text-foreground'>{item.cropName}</span>
                      <div className='text-[10px] text-muted-foreground font-medium'>
                        {item.phase.target_months_label}
                      </div>
                    </div>
                    {item.isGoldenPeak ? (
                      <Badge className='bg-amber-500 text-white dark:text-black font-semibold text-[10px] px-1.5 py-0 shrink-0'>
                        GOLDEN PEAK
                      </Badge>
                    ) : (
                      <Badge variant='secondary' className='text-[10px] px-1.5 py-0 shrink-0'>
                        {item.phase.category.replace('PUPUK_', '')}
                      </Badge>
                    )}
                  </div>

                  <div className='mt-2 space-y-1.5 text-xs'>
                    <div className='font-medium text-foreground text-[11px]'>
                      {item.phase.phase_name}
                    </div>
                    <div className='text-muted-foreground text-[11px]'>
                      <span className='font-semibold text-foreground'>Booking KPL: </span>
                      {item.phase.kiosk_booking_window}
                    </div>
                    <div className='rounded bg-background/80 p-1.5 border text-[11px] font-mono leading-tight text-foreground'>
                      <span className='font-sans font-semibold text-amber-700 dark:text-amber-400'>Produk: </span>
                      {item.phase.product_recommendations.slice(0, 3).join(', ')}
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
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                <div>
                  <CardTitle className='text-sm font-semibold'>
                    Matriks Kalender Tanam Nasional (12 Bulan × 13 Komoditas)
                  </CardTitle>
                  <CardDescription>
                    Warna blok menunjukkan fase budidaya dominan pada bulan berjalan
                  </CardDescription>
                </div>
              </div>
              {/* Legend Badges - Complete 10 Phase Codes */}
              <div className='flex flex-wrap items-center gap-1.5 text-[11px] pt-1'>
                <span className='px-1.5 py-0.5 rounded bg-stone-100 text-stone-800 dark:bg-stone-900 dark:text-stone-300 font-semibold border border-stone-300 dark:border-stone-700'>PL: Olah Lahan</span>
                <span className='px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800'>TN: Tanam</span>
                <span className='px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-semibold border border-teal-300 dark:border-teal-800'>SM: Persemaian</span>
                <span className='px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-semibold border border-blue-300 dark:border-blue-800'>VG: Vegetatif</span>
                <span className='px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-semibold border border-purple-300 dark:border-purple-800'>GN: Generatif</span>
                <span className='px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-semibold border border-rose-300 dark:border-rose-800'>PT: Serangan OPT</span>
                <span className='px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold border border-amber-300 dark:border-amber-800'>PN: Panen Raya</span>
                <span className='px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-semibold border border-indigo-300 dark:border-indigo-800'>PF: Pemupukan Sawit</span>
                <span className='px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 font-semibold border border-orange-300 dark:border-orange-800'>HC: High Crop</span>
                <span className='px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 font-semibold border border-zinc-300 dark:border-zinc-700'>LC: Low Crop</span>
                <span className='px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-semibold border border-border'>BR: Bera Lahan</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between text-[11px] text-muted-foreground mb-2 sm:hidden'>
              <span className='inline-flex items-center gap-1 font-medium'>
                <ArrowLeftRight className='h-3 w-3' /> Geser tabel secara horizontal untuk melihat 12 bulan
              </span>
            </div>
            <div className='rounded-md border overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow className='bg-muted/50 text-xs font-semibold'>
                    <TableHead className='w-[160px] min-w-[140px] sticky left-0 bg-background z-20 border-r shadow-sm'>Komoditas</TableHead>
                    {months.map((m) => (
                      <TableHead
                        key={m.num}
                        className={`text-center w-[55px] ${
                          m.num === selectedMonth ? 'bg-primary/15 text-primary font-bold' : ''
                        }`}
                      >
                        {m.name.substring(0, 3)}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCommodities.map((crop) => {
                    const rowCodes = calendarMatrix[crop.id] || Array(12).fill('VG')
                    return (
                      <TableRow key={crop.id} className='hover:bg-muted/30 transition-colors text-xs'>
                        <TableCell className='font-semibold text-foreground sticky left-0 bg-background z-10 border-r shadow-sm'>
                          <div>
                            <div>{crop.name}</div>
                            <div className='text-[10px] text-muted-foreground font-normal'>
                              {crop.sector.replace('Hortikultura ', '')}
                            </div>
                          </div>
                        </TableCell>
                        {rowCodes.map((code, monthIdx) => {
                          const phase = phaseMap[code] || phaseMap.VG
                          const isHighlightedMonth = monthIdx + 1 === selectedMonth
                          return (
                            <TableCell
                              key={monthIdx}
                              className={`text-center p-1.5 ${
                                isHighlightedMonth ? 'bg-primary/5 ring-1 ring-primary/20' : ''
                              }`}
                            >
                              <div
                                title={`${crop.name} Bulan ${months[monthIdx].name}: ${phase.label} - ${phase.desc}`}
                                className={`w-full py-1 rounded text-[10px] font-bold border transition-transform hover:scale-105 ${phase.bg} ${phase.text} ${phase.border}`}
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
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
              <div>
                <CardTitle className='text-sm font-semibold flex items-center gap-2'>
                  <BookOpen className='h-4 w-4 text-emerald-600 dark:text-emerald-400' />
                  Glosarium Kode Fase Budidaya &amp; Tindakan Kritis Lapang
                </CardTitle>
                <CardDescription className='text-xs'>
                  Penjelasan singkat arti 11 kode fase budidaya pada matriks kalender dan fokus input agronomis
                </CardDescription>
              </div>
              <Badge variant='outline' className='text-xs self-start sm:self-auto font-mono'>
                Standar Operasional Lapang
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-xs'>
              <div className='rounded-lg border p-2.5 bg-stone-50/50 dark:bg-stone-900/30 border-stone-200 dark:border-stone-800 space-y-1'>
                <div className='flex items-center gap-1.5 font-bold text-stone-900 dark:text-stone-200'>
                  <span className='px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-[10px]'>PL</span>
                  Olah Lahan (Land Prep)
                </div>
                <p className='text-[11px] text-stone-700 dark:text-stone-400 leading-snug'>
                  Pembajakan, penggaruan, sanitasi sisa tanaman, dan penaburan kapur dolomit untuk netralisasi pH tanah masam.
                </p>
              </div>

              <div className='rounded-lg border p-2.5 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900 space-y-1'>
                <div className='flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-200'>
                  <span className='px-1.5 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-[10px]'>TN</span>
                  Tanam Raya (Planting)
                </div>
                <p className='text-[11px] text-emerald-700 dark:text-emerald-400 leading-snug'>
                  Penanaman bibit atau sebar benih serentak di hamparan sentra untuk meminimalisir sebaran hama penyakit.
                </p>
              </div>

              <div className='rounded-lg border p-2.5 bg-teal-50/50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-900 space-y-1'>
                <div className='flex items-center gap-1.5 font-bold text-teal-900 dark:text-teal-200'>
                  <span className='px-1.5 py-0.5 rounded bg-teal-200 dark:bg-teal-900 text-[10px]'>SM</span>
                  Persemaian (Nursery)
                </div>
                <p className='text-[11px] text-teal-700 dark:text-teal-400 leading-snug'>
                  Penyemaian benih unggul di tray/bedengan pembibitan dengan proteksi insektisida seed treatment sebelum pindah tanam.
                </p>
              </div>

              <div className='rounded-lg border p-2.5 bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 space-y-1'>
                <div className='flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-200'>
                  <span className='px-1.5 py-0.5 rounded bg-blue-200 dark:bg-blue-900 text-[10px]'>VG</span>
                  Vegetatif Cepat
                </div>
                <p className='text-[11px] text-blue-700 dark:text-blue-400 leading-snug'>
                  Fase pembentukan anakan, akar, dan tajuk daun aktif. Fokus utama aplikasi pupuk berunsur Nitrogen tinggi &amp; Fosfat.
                </p>
              </div>

              <div className='rounded-lg border p-2.5 bg-purple-50/50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900 space-y-1'>
                <div className='flex items-center gap-1.5 font-bold text-purple-900 dark:text-purple-200'>
                  <span className='px-1.5 py-0.5 rounded bg-purple-200 dark:bg-purple-900 text-[10px]'>GN</span>
                  Generatif / Pembungaan
                </div>
                <p className='text-[11px] text-purple-700 dark:text-purple-400 leading-snug'>
                  Inisiasi bunga, pembentukan buah, dan pengisian bulir/umbi. Membutuhkan asupan Kalium tinggi, Kalsium, dan Boron.
                </p>
              </div>

              <div className='rounded-lg border p-2.5 bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900 space-y-1'>
                <div className='flex items-center gap-1.5 font-bold text-rose-900 dark:text-rose-200'>
                  <span className='px-1.5 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-[10px]'>PT</span>
                  Serangan OPT Kritis
                </div>
                <p className='text-[11px] text-rose-700 dark:text-rose-400 leading-snug'>
                  Puncak ledakan hama/patogen (wereng, ulat grayak, patek antraknosa). Memerlukan aplikasi fungisida &amp; insektisida kuratif intensif.
                </p>
              </div>

              <div className='rounded-lg border p-2.5 bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 space-y-1'>
                <div className='flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200'>
                  <span className='px-1.5 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-[10px]'>PN</span>
                  Panen Raya (Harvest)
                </div>
                <p className='text-[11px] text-amber-700 dark:text-amber-400 leading-snug'>
                  Pemetikan/pemanenan massal hasil panen di sentra utama. Periode likuidasi hasil panen dan pelunasan pinjaman tempo yarnen.
                </p>
              </div>

              <div className='rounded-lg border p-2.5 bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900 space-y-1'>
                <div className='flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-200'>
                  <span className='px-1.5 py-0.5 rounded bg-indigo-200 dark:bg-indigo-900 text-[10px]'>PF</span>
                  Pemupukan Sawit (PF)
                </div>
                <p className='text-[11px] text-indigo-700 dark:text-indigo-400 leading-snug'>
                  Aplikasi pupuk makro terprogram (Urea, MOP, Kieserit, Borat) di piringan pohon sawit sebelum masuk musim kemarau atau hujan lebat.
                </p>
              </div>

              <div className='rounded-lg border p-2.5 bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900 space-y-1'>
                <div className='flex items-center gap-1.5 font-bold text-orange-900 dark:text-orange-200'>
                  <span className='px-1.5 py-0.5 rounded bg-orange-200 dark:bg-orange-900 text-[10px]'>HC</span>
                  High Crop Sawit (Puncak)
                </div>
                <p className='text-[11px] text-orange-700 dark:text-orange-400 leading-snug'>
                  Puncak produksi bulanan Tandan Buah Segar (TBS) kelapa sawit di mana kapasitas pabrik kelapa sawit (PKS) terisi maksimal.
                </p>
              </div>

              <div className='rounded-lg border p-2.5 bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800 space-y-1'>
                <div className='flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-200'>
                  <span className='px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px]'>LC</span>
                  Low Crop Sawit (Trek)
                </div>
                <p className='text-[11px] text-zinc-700 dark:text-zinc-400 leading-snug'>
                  Masa istirahat fisiologis pohon sawit di mana produksi TBS anjlok. Fokus pemulihan nutrisi piringan dan perbaikan drainase.
                </p>
              </div>

              <div className='rounded-lg border p-2.5 bg-muted/40 border-border space-y-1 sm:col-span-2 lg:col-span-1 xl:col-span-2'>
                <div className='flex items-center gap-1.5 font-bold text-foreground'>
                  <span className='px-1.5 py-0.5 rounded bg-muted-foreground/20 text-[10px]'>BR</span>
                  Bera Lahan (Fallow)
                </div>
                <p className='text-[11px] text-muted-foreground leading-snug'>
                  Lahan diistirahatkan tanpa tanaman budidaya untuk memutus siklus hidup hama tanah, aerasi matahari, dan pemulihan mikroorganisme hara.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agro-Ecosystem Rotation Diagrams & Field Timing */}
        <div className='grid gap-4 md:grid-cols-3'>
          <Card className='border shadow-xs'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xs font-semibold uppercase text-muted-foreground'>
                Rotasi Sawah Irigasi Teknis (Jawa)
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-xs'>
              <div className='p-2.5 rounded-lg border bg-muted/20 space-y-1'>
                <div className='font-bold text-foreground'>Okt - Feb: Padi MT 1 (Rendeng)</div>
                <div className='text-[11px] text-muted-foreground'>Puncak luas panen dan alokasi pupuk terbesar.</div>
              </div>
              <div className='p-2.5 rounded-lg border bg-muted/20 space-y-1'>
                <div className='font-bold text-foreground'>Mar - Jun: Padi MT 2 (Gadu 1)</div>
                <div className='text-[11px] text-muted-foreground'>Pemanfaatan sisa air tanah dan irigasi sekunder.</div>
              </div>
              <div className='p-2.5 rounded-lg border bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 space-y-1'>
                <div className='font-bold text-emerald-800 dark:text-emerald-300'>Jul - Okt: Palawija / Hortikultura</div>
                <div className='text-[11px] text-emerald-700 dark:text-emerald-400'>Jagung, Bawang Merah, Semangka pemutus siklus wereng.</div>
              </div>
            </CardContent>
          </Card>

          <Card className='border shadow-xs'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xs font-semibold uppercase text-muted-foreground'>
                Rotasi Hortikultura Dataran Tinggi
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-xs'>
              <div className='p-2.5 rounded-lg border bg-muted/20 space-y-1'>
                <div className='font-bold text-foreground'>Nov - Feb: Kentang Siklus 1</div>
                <div className='text-[11px] text-muted-foreground'>Intensitas fungisida Phytophthora tertinggi (2x/minggu).</div>
              </div>
              <div className='p-2.5 rounded-lg border bg-muted/20 space-y-1'>
                <div className='font-bold text-foreground'>Mar - Jun: Kubis / Wortel</div>
                <div className='text-[11px] text-muted-foreground'>Memutus inang nematoda bengkak akar (*Meloidogyne*).</div>
              </div>
              <div className='p-2.5 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 space-y-1'>
                <div className='font-bold text-blue-800 dark:text-blue-300'>Jul - Okt: Tomat / Cabai / Kentang 2</div>
                <div className='text-[11px] text-blue-700 dark:text-blue-400'>Kualitas umbi dan buah optimal pada musim kemarau sejuk.</div>
              </div>
            </CardContent>
          </Card>

          <Card className='border shadow-xs'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xs font-semibold uppercase text-muted-foreground'>
                Timeline Pre-Season Booking Input
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-xs'>
              <div className='flex items-center justify-between p-2 rounded border bg-card'>
                <span className='font-medium'>T - 60 Hari</span>
                <span className='text-muted-foreground'>Alokasi kuota & plafon tempo kios</span>
              </div>
              <div className='flex items-center justify-between p-2 rounded border bg-card'>
                <span className='font-medium'>T - 30 Hari</span>
                <span className='font-bold text-primary'>Buffer stocking fisik di gudang</span>
              </div>
              <div className='flex items-center justify-between p-2 rounded border bg-card'>
                <span className='font-medium'>T - 15 Hari</span>
                <span className='text-muted-foreground'>Temu lapang & perlakuan benih Poktan</span>
              </div>
              <div className='flex items-center justify-between p-2 rounded border bg-card'>
                <span className='font-medium'>T + 100 Hari</span>
                <span className='font-bold text-emerald-600'>Pelunasan tempo yarnen pasca panen</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
