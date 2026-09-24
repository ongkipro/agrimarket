import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Layers,
  Package,
  Megaphone,
  Store,
  Compass,
  MapPin,
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
  getMonthlyProductCampaigns,
  getProductsCatalog,
} from '@/features/agri/data-provider'

export function CampaignsView() {
  const [selectedYear, setSelectedYear] = useState<'ALL' | '2026' | '2027'>(
    'ALL'
  )
  const [selectedProduct, setSelectedProduct] = useState<string>('ALL')

  const campaigns = getMonthlyProductCampaigns()
  const products = getProductsCatalog()

  const filteredCampaigns = campaigns.filter((c) => {
    if (selectedYear !== 'ALL' && c.year.toString() !== selectedYear)
      return false
    if (
      selectedProduct !== 'ALL' &&
      c.heroProduct !== selectedProduct &&
      c.secondaryProduct !== selectedProduct
    )
      return false
    return true
  })

  const getProductBadge = (productId: string) => {
    const prod = products.find((p) => p.id === productId)
    if (!prod) return <Badge variant='outline'>{productId}</Badge>

    let colorClass = 'border-border'
    if (prod.badgeVariant === 'rose')
      colorClass =
        'border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400'
    if (prod.badgeVariant === 'amber')
      colorClass =
        'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400'
    if (prod.badgeVariant === 'indigo')
      colorClass =
        'border-indigo-500/40 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
    if (prod.badgeVariant === 'emerald')
      colorClass =
        'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'

    return (
      <Badge
        variant='outline'
        className={`font-mono text-[10px] ${colorClass}`}
      >
        {prod.shortTitle}
      </Badge>
    )
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
        {/* Breadcrumb & Navigation */}
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
              Kampanye Iklim 2026-2027
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <Button asChild variant='outline' size='sm' className='h-8 text-xs'>
              <Link to='/products'>
                <Package className='mr-1.5 h-3.5 w-3.5 text-muted-foreground' />
                Katalog Produk
              </Link>
            </Button>
            <Button asChild variant='outline' size='sm' className='h-8 text-xs'>
              <Link to='/products/mix-match'>
                <Layers className='mr-1.5 h-3.5 w-3.5 text-muted-foreground' />
                Sinergi Mix & Match
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className='space-y-2 rounded-lg border border-border bg-card p-5 shadow-xs'>
          <div className='flex flex-wrap items-center gap-2'>
            <h1 className='text-xl font-bold tracking-tight text-foreground sm:text-2xl'>
              Kalender Kampanye Komersial Iklim 15 Bulan (Okt 2026 – Des 2027)
            </h1>
            <Badge variant='outline' className='font-mono text-[10px]'>
              Sinkronisasi BMKG & Katam
            </Badge>
          </div>
          <p className='max-w-4xl text-xs leading-relaxed text-muted-foreground'>
            Rekomendasi sudut pandang pemasaran (ad angles), fokus produk utama
            (hero product), dan tindakan distributor per bulan mengikuti
            dinamika transisi El Niño Kuat 2026 menuju ENSO Netral dan potensi
            Kemarau Basah La Niña Lemah 2027.
          </p>

          {/* Filter Bar */}
          <div className='flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-2'>
            {/* Year Filters */}
            <div className='flex items-center gap-1.5'>
              <span className='mr-1 text-xs font-semibold text-muted-foreground'>
                Tahun:
              </span>
              <Button
                variant={selectedYear === 'ALL' ? 'default' : 'outline'}
                size='sm'
                className='h-7 px-2.5 text-xs'
                onClick={() => setSelectedYear('ALL')}
              >
                Semua (15 Bln)
              </Button>
              <Button
                variant={selectedYear === '2026' ? 'default' : 'outline'}
                size='sm'
                className='h-7 px-2.5 text-xs'
                onClick={() => setSelectedYear('2026')}
              >
                2026 (El Niño)
              </Button>
              <Button
                variant={selectedYear === '2027' ? 'default' : 'outline'}
                size='sm'
                className='h-7 px-2.5 text-xs'
                onClick={() => setSelectedYear('2027')}
              >
                2027 (Transisi & La Niña)
              </Button>
            </div>

            {/* Product Filters */}
            <div className='flex flex-wrap items-center gap-1.5'>
              <span className='mr-1 text-xs font-semibold text-muted-foreground'>
                Hero SKU:
              </span>
              <Button
                variant={selectedProduct === 'ALL' ? 'secondary' : 'ghost'}
                size='sm'
                className='h-7 px-2 text-xs'
                onClick={() => setSelectedProduct('ALL')}
              >
                Semua
              </Button>
              {products.map((p) => (
                <Button
                  key={p.id}
                  variant={selectedProduct === p.id ? 'secondary' : 'ghost'}
                  size='sm'
                  className='h-7 px-2 text-xs'
                  onClick={() => setSelectedProduct(p.id)}
                >
                  {p.shortTitle}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* 15-Month Campaign Timeline Cards */}
        <div className='space-y-4'>
          {filteredCampaigns.map((camp) => (
            <Card
              key={camp.monthIndex}
              className='border border-border shadow-xs'
            >
              <CardHeader className='pb-3'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                  <div className='flex items-center gap-2'>
                    <Badge variant='outline' className='font-mono text-xs'>
                      Bulan #{camp.monthIndex}: {camp.monthName}
                    </Badge>
                    <Badge variant='secondary' className='text-[10px]'>
                      {camp.quarterLabel}
                    </Badge>
                  </div>

                  <div className='flex items-center gap-2'>
                    <span className='text-[11px] text-muted-foreground'>
                      Hero Product:
                    </span>
                    {getProductBadge(camp.heroProduct)}
                    {camp.secondaryProduct && (
                      <>
                        <span className='text-muted-foreground'>+</span>
                        {getProductBadge(camp.secondaryProduct)}
                      </>
                    )}
                    <Badge
                      variant='outline'
                      className='font-mono text-[10px] text-primary'
                    >
                      Demand Index: {camp.estimatedDemandIndex}/100
                    </Badge>
                  </div>
                </div>

                <div className='pt-1'>
                  <CardTitle className='text-sm font-bold text-foreground'>
                    {camp.campaignTheme}
                  </CardTitle>
                  <CardDescription className='flex items-center gap-1.5 pt-0.5 text-xs'>
                    <Compass className='h-3.5 w-3.5 shrink-0 text-sky-500' />
                    <span>{camp.climatePhenomenon}</span>
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className='space-y-3 text-xs'>
                {/* Headline Hook Meta Ads */}
                <div className='space-y-1 rounded-lg border border-primary/30 bg-primary/5 p-3'>
                  <div className='flex items-center gap-1.5 text-xs font-bold text-foreground'>
                    <Megaphone className='h-3.5 w-3.5 text-primary' />
                    Rekomendasi Headline & Hook Meta Ads:
                  </div>
                  <p className='font-mono text-xs leading-relaxed font-semibold text-primary'>
                    &ldquo;{camp.headlineHook}&rdquo;
                  </p>
                </div>

                <div className='grid gap-3 sm:grid-cols-2'>
                  {/* Agro-Climate Context */}
                  <div className='space-y-1 rounded-lg border bg-muted/20 p-3'>
                    <span className='text-xs font-semibold text-foreground'>
                      Dampak Agroklimat Lapang:
                    </span>
                    <p className='text-[11px] leading-relaxed text-muted-foreground'>
                      {camp.agroClimateImpact}
                    </p>
                  </div>

                  {/* Kios Action */}
                  <div className='space-y-1 rounded-lg border bg-muted/20 p-3'>
                    <div className='flex items-center gap-1 text-xs font-semibold text-foreground'>
                      <Store className='h-3 w-3 text-amber-500' />
                      Aksi Distributor & Kios Saprotan:
                    </div>
                    <p className='text-[11px] leading-relaxed text-muted-foreground'>
                      {camp.commercialActionKios}
                    </p>
                  </div>
                </div>

                {/* Agronomist & Provinces */}
                <div className='flex flex-wrap items-center justify-between gap-2 border-t pt-1 text-[11px] text-muted-foreground'>
                  <div>
                    <span className='font-semibold text-foreground'>
                      Tindakan Agronomist Lapangan:{' '}
                    </span>
                    {camp.fieldAgronomistAction}
                  </div>
                  <div className='flex items-center gap-1'>
                    <MapPin className='h-3 w-3 text-rose-500' />
                    <span>
                      Sentra Fokus: {camp.targetSentraProvinces.join(', ')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Main>
    </>
  )
}
