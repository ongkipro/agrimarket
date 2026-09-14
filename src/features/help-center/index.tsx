import {
  HelpCircle,
  BookOpen,
  Sprout,
  ShieldCheck,
  Layers,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

export function HelpCenter() {
  const faqs = [
    {
      q: 'Apa perbedaan mendasar antara TAM, SAM, dan SOM dalam Agrimarket?',
      a: 'TAM (Total Addressable Market) adalah total seluruh lahan panen, tonase produksi, dan nilai farmgate kotor komoditas di Indonesia berbasis publikasi resmi BPS. SAM (Serviceable Addressable Market) adalah proporsi TAM yang telah menggunakan saprotan komersial pabrikan (purchased inputs) dan dapat dijangkau oleh saluran distribusi retail KPL. SOM (Serviceable Obtainable Market) adalah porsi SAM yang realistis dimenangkan oleh prinsipal dengan mempertimbangkan kapasitas agronomis (N_sales), rasio jangkauan kios (K_coverage), dan batas plafon kredit modal kerja (tempo yarnen).',
      tag: 'Metodologi',
    },
    {
      q: 'Dari mana sumber data resmi yang digunakan?',
      a: 'Data dikompilasi dari Badan Pusat Statistik (BPS RI) melalui survei Kerangka Sampel Area (KSA Padi & Jagung), Statistik Pertanian Hortikultura (SPH-SBS/TBF/BST), Sensus Pertanian 2023 (ST2023 Tahap I & II), Ditjen Perkebunan Kementan (Statistik Kelapa Sawit & Tembakau), serta Pusat Informasi Harga Pangan Strategis (PIHPS) Bank Indonesia.',
      tag: 'Data BPS',
    },
    {
      q: 'Bagaimana cara membaca kode status pada Kalender Tanam Nasional?',
      a: 'Kalender tanam menggunakan 11 taksonomi fase agronomi: PL (Pengolahan Lahan), SM (Persemaian Benih), TN (Tanam Raya), VG (Vegetatif Cepat), GN (Generatif/Pengisian Buah), PT (Puncak Serangan Hama/OPT), PN (Panen Raya), HC (High Crop Sawit), LC (Low Crop Sawit), PF (Pemupukan Pokok Sawit), dan BR (Bera Lahan).',
      tag: 'Kalender Tanam',
    },
    {
      q: 'Bagaimana formula penentuan batas modal kerja (Working Capital Ceiling) pada Simulator SOM?',
      a: 'Agrimarket menerapkan batas prudensial di mana perputaran piutang kios (tempo kredit yarnen rata-rata 90-120 hari per musim tanam) membatasi kapasitas penjualan tahunan maksimal 2.5 kali dari plafon modal kerja kredit yang disediakan. Jika simulasi omset melebihi batas ini, sistem akan memunculkan peringatan restriksi likuiditas.',
      tag: 'Simulator SOM',
    },
    {
      q: 'Apakah dataset dapat diekspor untuk pemodelan internal tim komersial?',
      a: 'Ya, pada menu BPS Audit Ledger (/audit), tersedia tombol ekspor satu-klik untuk Master Dataset JSON, Ringkasan 13 Komoditas Nasional (CSV), dan Data Mikro 38 Provinsi per Komoditas (CSV) yang siap diimpor ke Excel, Python pandas, atau BI tools.',
      tag: 'Ekspor Data',
    },
  ]

  return (
    <>
      <Header fixed>
        <div className='flex items-center gap-2 me-auto min-w-0'>
          <HelpCircle className='h-5 w-5 text-emerald-600 shrink-0' />
          <div className='min-w-0'>
            <h1 className='text-base font-bold tracking-tight text-foreground truncate'>
              Pusat Panduan & Dokumentasi Metodologi
            </h1>
            <p className='text-xs text-muted-foreground hidden sm:block truncate'>
              Dokumentasi metodologi TAM-SAM-SOM, referensi BPS, dan petunjuk operasional Agrimarket
            </p>
          </div>
        </div>
        <Search className='hidden sm:flex' />
        <ThemeSwitch />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6'>
        {/* Banner Hero */}
        <div className='rounded-xl border bg-linear-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-4 sm:p-6 border-emerald-500/20'>
          <div className='flex items-start gap-4'>
            <div className='rounded-lg bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-400'>
              <BookOpen className='h-6 w-6' />
            </div>
            <div className='space-y-1'>
              <h2 className='text-lg font-bold tracking-tight text-foreground'>
                Agrimarket Knowledge Base & Research Framework
              </h2>
              <p className='text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed'>
                Platform intelijen pasar komoditas pertanian Indonesia yang menggabungkan 100% data sensus dan survei resmi BPS RI, formula konversi mikro-ekonomi saprotan, serta siklus fenologi tanaman untuk akselerasi penetrasi komersial.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pilar Metodologi */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Card className='border shadow-xs'>
            <CardHeader className='pb-2'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-xs font-semibold text-muted-foreground uppercase'>
                  Pilar 1: TAM
                </CardTitle>
                <Sprout className='h-4 w-4 text-emerald-600' />
              </div>
            </CardHeader>
            <CardContent className='space-y-1.5'>
              <div className='font-bold text-sm text-foreground'>Luas Kolam Nasional</div>
              <p className='text-xs text-muted-foreground leading-relaxed'>
                Luas panen fisik (Ha), tonase hasil (Ton), dan nilai output kotor petani berdasarkan sensus KSA, SPH, dan Ditjenbun.
              </p>
            </CardContent>
          </Card>

          <Card className='border shadow-xs'>
            <CardHeader className='pb-2'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-xs font-semibold text-muted-foreground uppercase'>
                  Pilar 2: SAM
                </CardTitle>
                <Layers className='h-4 w-4 text-blue-600' />
              </div>
            </CardHeader>
            <CardContent className='space-y-1.5'>
              <div className='font-bold text-sm text-foreground'>Pasar Saprotan Komersial</div>
              <p className='text-xs text-muted-foreground leading-relaxed'>
                Penyaringan 4 Driver: Orientasi komersial ($R_1$), Adopsi input pabrikan ($R_2$), Daya beli petani ($R_3$), dan Jangkauan kios ($R_4$).
              </p>
            </CardContent>
          </Card>

          <Card className='border shadow-xs'>
            <CardHeader className='pb-2'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-xs font-semibold text-muted-foreground uppercase'>
                  Pilar 3: SOM
                </CardTitle>
                <TrendingUp className='h-4 w-4 text-purple-600' />
              </div>
            </CardHeader>
            <CardContent className='space-y-1.5'>
              <div className='font-bold text-sm text-foreground'>Kapasitas Rebut Riil</div>
              <p className='text-xs text-muted-foreground leading-relaxed'>
                Kalkulasi target terikat daya serap agronomis lapangan, pembinaan kios KPL, dan plafon kredit yarnen.
              </p>
            </CardContent>
          </Card>

          <Card className='border shadow-xs'>
            <CardHeader className='pb-2'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-xs font-semibold text-muted-foreground uppercase'>
                  Pilar 4: Gate-0
                </CardTitle>
                <ShieldCheck className='h-4 w-4 text-teal-600' />
              </div>
            </CardHeader>
            <CardContent className='space-y-1.5'>
              <div className='font-bold text-sm text-foreground'>Integritas Data 0.0000%</div>
              <p className='text-xs text-muted-foreground leading-relaxed'>
                Seluruh 13 komoditas terekonsiliasi matematis presisi tanpa deviasi antara angka agregat nasional dan jumlah 38 provinsi.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tanya Jawab Populer (FAQ) */}
        <Card className='border shadow-xs'>
          <CardHeader>
            <CardTitle className='text-base font-semibold flex items-center gap-2'>
              <HelpCircle className='h-4 w-4 text-primary' />
              Pertanyaan yang Sering Diajukan (FAQ)
            </CardTitle>
            <CardDescription>
              Jawaban ringkas seputar terminologi, data, dan penggunaan sistem Agrimarket
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className='rounded-lg border p-4 bg-card/60 hover:bg-muted/20 transition-colors space-y-2'
              >
                <div className='flex items-start justify-between gap-2'>
                  <h3 className='font-semibold text-sm text-foreground'>{faq.q}</h3>
                  <Badge variant='outline' className='text-[10px] shrink-0'>
                    {faq.tag}
                  </Badge>
                </div>
                <p className='text-xs text-muted-foreground leading-relaxed'>{faq.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </Main>
    </>
  )
}
