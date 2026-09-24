import { Link } from '@tanstack/react-router'
import {
  Package,
  Layers,
  Calendar,
  ShieldAlert,
  RefreshCw,
  Award,
  ShieldCheck,
  ArrowRight,
  GitCompare,
  Compass,
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
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  getProductsCatalog,
  getMixMatchRules,
  getMonthlyProductCampaigns,
} from '@/features/agri/data-provider'

type ProductDetailRoute =
  | '/products/aussie'
  | '/products/bensu'
  | '/products/saratoga'
  | '/products/kojien'

export function ProductsOverviewHub() {
  const products = getProductsCatalog()
  const mixMatchRules = getMixMatchRules()
  const campaigns = getMonthlyProductCampaigns()

  const getProductIcon = (id: string) => {
    switch (id) {
      case 'aussie':
        return <ShieldAlert className='h-5 w-5 text-rose-500' />
      case 'bensu':
        return <RefreshCw className='h-5 w-5 text-amber-500' />
      case 'saratoga':
        return <Award className='h-5 w-5 text-indigo-500' />
      case 'kojien':
        return <ShieldCheck className='h-5 w-5 text-emerald-500' />
      default:
        return <Package className='h-5 w-5' />
    }
  }

  const getBorderColor = (variant: string) => {
    switch (variant) {
      case 'rose':
        return 'hover:border-rose-500/50'
      case 'amber':
        return 'hover:border-amber-500/50'
      case 'indigo':
        return 'hover:border-indigo-500/50'
      case 'emerald':
        return 'hover:border-emerald-500/50'
      default:
        return 'hover:border-primary/50'
    }
  }

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
        {/* Page Header */}
        <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
          <div>
            <div className='flex items-center gap-2'>
              <h1 className='text-xl font-bold tracking-tight sm:text-2xl'>
                Katalog Produk & Ekosistem Agrokimia Presisi
              </h1>
              <Badge variant='outline' className='font-mono text-[10px]'>
                4 Strategic SKUs
              </Badge>
            </div>
            <p className='mt-0.5 max-w-3xl text-xs leading-relaxed text-muted-foreground'>
              Dokumentasi komprehensif produk nutrisi & stimulator tanaman
              (AUSSIE Sawit, BENSU Hortikultura, SARATOGA Serum, KOJIEN
              Activator) yang tersinkronisasi dengan kalender tanam, anomali
              iklim BMKG, dan playbook Meta Ads.
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <Button asChild variant='outline' size='sm' className='h-8 text-xs'>
              <Link to='/products/mix-match'>
                <GitCompare className='mr-1.5 h-3.5 w-3.5 text-muted-foreground' />
                Sinergi Mix & Match ({mixMatchRules.length})
              </Link>
            </Button>
            <Button asChild variant='default' size='sm' className='h-8 text-xs'>
              <Link to='/products/campaigns'>
                <Calendar className='mr-1.5 h-3.5 w-3.5' />
                Kampanye Iklim 15 Bulan
              </Link>
            </Button>
          </div>
        </div>

        {/* 4 Macro KPI Cards */}
        <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
          <Card className='border border-border shadow-xs'>
            <CardContent className='p-3.5'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                  Total Produk Strategis
                </span>
                <Package className='h-4 w-4 text-primary' />
              </div>
              <div className='mt-1 font-mono text-xl font-bold tracking-tight text-foreground'>
                4 Formula
              </div>
              <div className='mt-1 text-[11px] text-muted-foreground'>
                Sawit, Horti, Buah & Serealia
              </div>
            </CardContent>
          </Card>

          <Card className='border border-border shadow-xs'>
            <CardContent className='p-3.5'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                  Protokol Sinergi Lapang
                </span>
                <Layers className='h-4 w-4 text-emerald-500' />
              </div>
              <div className='mt-1 font-mono text-xl font-bold tracking-tight text-foreground'>
                {mixMatchRules.length} Kombinasi
              </div>
              <div className='mt-1 text-[11px] text-muted-foreground'>
                Rotasi Vegetatif ke Generatif
              </div>
            </CardContent>
          </Card>

          <Card className='border border-border shadow-xs'>
            <CardContent className='p-3.5'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                  Cakupan Kampanye Iklim
                </span>
                <Calendar className='h-4 w-4 text-sky-500' />
              </div>
              <div className='mt-1 font-mono text-xl font-bold tracking-tight text-foreground'>
                {campaigns.length} Bulan
              </div>
              <div className='mt-1 text-[11px] text-muted-foreground'>
                Okt 2026 s/d Des 2027
              </div>
            </CardContent>
          </Card>

          <Card className='border border-border shadow-xs'>
            <CardContent className='p-3.5'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                  Sinkronisasi BMKG ZOM
                </span>
                <Compass className='h-4 w-4 text-amber-500' />
              </div>
              <div className='mt-1 font-mono text-xl font-bold tracking-tight text-foreground'>
                100% Calibrated
              </div>
              <div className='mt-1 text-[11px] text-muted-foreground'>
                El Niño Kuat -&gt; La Niña Lemah
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 4 Core Product Showcase Cards */}
        <div className='grid gap-4 md:grid-cols-2'>
          {products.map((prod) => (
            <Card
              key={prod.id}
              className={`border border-border bg-card shadow-xs transition-colors ${getBorderColor(
                prod.badgeVariant
              )}`}
            >
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between gap-3'>
                  <div className='flex items-center gap-2.5'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted/40'>
                      {getProductIcon(prod.id)}
                    </div>
                    <div>
                      <div className='flex items-center gap-2'>
                        <CardTitle className='text-base font-bold'>
                          {prod.name}
                        </CardTitle>
                      </div>
                      <CardDescription className='text-xs'>
                        {prod.categoryLabel}
                      </CardDescription>
                    </div>
                  </div>

                  <Badge variant='outline' className='font-mono text-[10px]'>
                    {prod.targetCommodityLabels[0]}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className='space-y-3.5 text-xs'>
                {/* Core Angle & Mantra */}
                <div className='space-y-1.5 rounded-lg border bg-muted/20 p-3'>
                  <div className='text-xs font-semibold text-foreground'>
                    &ldquo;{prod.coreAngle}&rdquo;
                  </div>
                  <p className='text-[11px] leading-relaxed text-muted-foreground'>
                    {prod.corePositioning.id}
                  </p>
                </div>

                {/* Technical Highlights */}
                <div className='grid grid-cols-2 gap-2 text-[11px]'>
                  <div className='space-y-0.5 rounded border p-2'>
                    <span className='block text-[10px] text-muted-foreground uppercase'>
                      Formula Inti
                    </span>
                    <span className='line-clamp-1 font-semibold text-foreground'>
                      {prod.formulaConcept}
                    </span>
                  </div>
                  <div className='space-y-0.5 rounded border p-2'>
                    <span className='block text-[10px] text-muted-foreground uppercase'>
                      Peran Iklim 2026-27
                    </span>
                    <span className='line-clamp-1 font-semibold text-foreground'>
                      {prod.climateIntegration.elNino2026Role.slice(0, 38)}...
                    </span>
                  </div>
                </div>

                {/* Commodity Tags & Action Button */}
                <div className='flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-1'>
                  <div className='flex flex-wrap gap-1'>
                    {prod.targetCommodityLabels
                      .slice(0, 3)
                      .map((crop: string) => (
                        <Badge
                          key={crop}
                          variant='secondary'
                          className='text-[9px] font-normal'
                        >
                          {crop}
                        </Badge>
                      ))}
                    {prod.targetCommodityLabels.length > 3 && (
                      <Badge
                        variant='outline'
                        className='text-[9px] font-normal'
                      >
                        +{prod.targetCommodityLabels.length - 3} lainnya
                      </Badge>
                    )}
                  </div>

                  <Button asChild size='sm' className='h-7 text-xs'>
                    <Link to={`/products/${prod.id}` as ProductDetailRoute}>
                      Lihat Rincian
                      <ArrowRight className='ml-1.5 h-3 w-3' />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Visual Mindmap: Architectural Ecosystem Mapping */}
        <Card className='border border-border shadow-xs'>
          <CardHeader className='pb-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Compass className='h-4 w-4 text-primary' />
                <CardTitle className='text-sm font-semibold'>
                  Arsitektur Ekosistem Produk (Mindmap Visual Alignment)
                </CardTitle>
              </div>
              <Badge variant='outline' className='font-mono text-[10px]'>
                Mermaid Topology
              </Badge>
            </div>
            <CardDescription className='text-xs'>
              Pemetaan multi-dimensi antara portofolio produk, fenomena iklim
              BMKG, fase fenologi, dan saluran distribusi
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4 text-xs'>
            {/* Mindmap Node Tree Layout */}
            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
              {/* Branch 1: AUSSIE */}
              <div className='space-y-2 rounded-lg border border-rose-500/30 bg-rose-500/5 p-3.5'>
                <div className='flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400'>
                  <ShieldAlert className='h-4 w-4' />
                  1. AUSSIE Sawit
                </div>
                <div className='space-y-1 text-[11px] text-muted-foreground'>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Fokus:
                    </span>{' '}
                    Recovery Pokok & Ganoderma
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Aplikasi:
                    </span>{' '}
                    Kocor Batang 200ml & Pasta
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Sentra:
                    </span>{' '}
                    Riau, Sumut, Kalbar, Kalteng
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Iklim:
                    </span>{' '}
                    Benteng Jamur Lembab 2027
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Ad Angle:
                    </span>{' '}
                    Fear of Loss / Selamatkan Aset
                  </div>
                </div>
              </div>

              {/* Branch 2: BENSU */}
              <div className='space-y-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3.5'>
                <div className='flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400'>
                  <RefreshCw className='h-4 w-4' />
                  2. BENSU Hortikultura
                </div>
                <div className='space-y-1 text-[11px] text-muted-foreground'>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Fokus:
                    </span>{' '}
                    Growth Restart & Anti-Stres
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Aplikasi:
                    </span>{' '}
                    Semprot Daun 2 ml/L Pagi
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Sentra:
                    </span>{' '}
                    Brebes, Kediri, Garut, Malang
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Iklim:
                    </span>{' '}
                    Osmoprotektan Panas El Niño 2026
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Ad Angle:
                    </span>{' '}
                    Panic Recovery / Tanaman Mandek
                  </div>
                </div>
              </div>

              {/* Branch 3: SARATOGA */}
              <div className='space-y-2 rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-3.5'>
                <div className='flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-400'>
                  <Award className='h-4 w-4' />
                  3. SARATOGA Plant Serum
                </div>
                <div className='space-y-1 text-[11px] text-muted-foreground'>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Fokus:
                    </span>{' '}
                    Bobot, Brix & Sortiran Grade A
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Aplikasi:
                    </span>{' '}
                    Semprot Kritis Bunga & Buah
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Sentra:
                    </span>{' '}
                    Banyuwangi, Nganjuk, Demak
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Iklim:
                    </span>{' '}
                    Chitosan Cegah Patek Antraknosa
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Ad Angle:
                    </span>{' '}
                    Grade A Pride / Timbangan Juara
                  </div>
                </div>
              </div>

              {/* Branch 4: KOJIEN */}
              <div className='space-y-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3.5'>
                <div className='flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400'>
                  <ShieldCheck className='h-4 w-4' />
                  4. KOJIEN Activator
                </div>
                <div className='space-y-1 text-[11px] text-muted-foreground'>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Fokus:
                    </span>{' '}
                    Anti-Bulai & Batang Tahan Rebah
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Aplikasi:
                    </span>{' '}
                    Semprot Jagung 15 & 35 HST
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Sentra:
                    </span>{' '}
                    Tuban, Grobogan, Lampung, Bima
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Iklim:
                    </span>{' '}
                    Silika Tekan Evaporasi 30%
                  </div>
                  <div>
                    •{' '}
                    <span className='font-semibold text-foreground'>
                      Ad Angle:
                    </span>{' '}
                    Yield Insurance / Pertumbuhan Rata
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Matrix Table */}
        <Card className='border border-border shadow-xs'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-semibold'>
              Matriks Komparasi 4 Strategic SKUs
            </CardTitle>
            <CardDescription className='text-xs'>
              Pembeda kunci posisi pasar, segmen harga, dan batasan komoditas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto rounded-lg border'>
              <table className='w-full text-left text-xs'>
                <thead className='border-b bg-muted/50 font-semibold text-muted-foreground'>
                  <tr>
                    <th className='p-3'>Nama Produk</th>
                    <th className='p-3'>Kategori</th>
                    <th className='p-3'>Komoditas Utama</th>
                    <th className='p-3'>Mekanisme Kunci</th>
                    <th className='p-3'>Dosis Utama</th>
                    <th className='p-3'>Pemicu Transaksi</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-border/60'>
                  {products.map((p) => (
                    <tr key={p.id} className='hover:bg-muted/30'>
                      <td className='p-3 font-bold text-foreground'>
                        <Link
                          to={`/products/${p.id}` as ProductDetailRoute}
                          className='text-primary hover:underline'
                        >
                          {p.name}
                        </Link>
                      </td>
                      <td className='p-3 text-muted-foreground'>
                        {p.categoryLabel}
                      </td>
                      <td className='p-3 font-medium text-foreground'>
                        {p.targetCommodityLabels.join(', ')}
                      </td>
                      <td className='p-3 text-muted-foreground'>
                        {p.formulaConcept}
                      </td>
                      <td className='p-3 font-mono font-semibold'>
                        {p.dosageMatrix[0]?.dosagePerLiter}
                      </td>
                      <td className='p-3 text-muted-foreground'>
                        {p.demographics.persona.buyingMotivator.slice(0, 45)}...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Main>
    </>
  )
}
