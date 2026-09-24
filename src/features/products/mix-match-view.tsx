import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Filter,
  Package,
  Calendar,
  Droplets,
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
  getMixMatchRules,
  getProductsCatalog,
} from '@/features/agri/data-provider'

export function MixMatchView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const mixMatchRules = getMixMatchRules()
  const products = getProductsCatalog()

  const categories = [
    'ALL',
    'Hortikultura Buah & Sayuran',
    'Tanaman Pangan Sawah',
    'Tanaman Pangan Hamparan',
    'Hortikultura Umbi',
    'Perkebunan',
  ]

  const filteredRules =
    selectedCategory === 'ALL'
      ? mixMatchRules
      : mixMatchRules.filter((r) => r.cropCategory === selectedCategory)

  const getProductBadge = (productId: string) => {
    const prod = products.find((p) => p.id === productId)
    if (!prod) return <Badge variant='outline'>{productId}</Badge>
    return (
      <Badge variant='outline' className='font-mono text-xs'>
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
              Mix & Match Matrix
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
              Matriks Sinergi & Panduan Mix & Match Antar-Produk
            </h1>
            <Badge variant='outline' className='font-mono text-[10px]'>
              Aturan Kompatibilitas Lapang
            </Badge>
          </div>
          <p className='max-w-4xl text-xs leading-relaxed text-muted-foreground'>
            Panduan teknis bagi agronomist, kios saprotan, dan petani dalam
            merotasi atau mengombinasikan AUSSIE Sawit, BENSU Hortikultura,
            SARATOGA Serum, dan KOJIEN Activator untuk efisiensi biaya input dan
            hasil panen optimal tanpa risiko keracunan tanaman.
          </p>

          {/* Filter Pills */}
          <div className='flex flex-wrap items-center gap-1.5 pt-2'>
            <Filter className='mr-1 h-3.5 w-3.5 text-muted-foreground' />
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size='sm'
                className='h-7 px-2.5 text-xs'
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Synergy Rules Cards */}
        <div className='space-y-4'>
          {filteredRules.map((rule) => (
            <Card key={rule.id} className='border border-border shadow-xs'>
              <CardHeader className='pb-3'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                  <div className='flex items-center gap-2'>
                    <Badge
                      variant='secondary'
                      className='font-mono text-[10px]'
                    >
                      {rule.id}
                    </Badge>
                    <CardTitle className='text-sm font-semibold'>
                      {rule.cropCategory} ({rule.cropNames.join(', ')})
                    </CardTitle>
                  </div>
                  <div className='flex items-center gap-1.5'>
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
                        ? 'APLIKASI TERPISAH (ROTASI FASE)'
                        : rule.tankMixSafety}
                    </Badge>
                  </div>
                </div>
                <CardDescription className='text-xs'>
                  Target Fase: {rule.growthStage}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-3 text-xs'>
                {/* Product Combination Flow */}
                <div className='flex flex-wrap items-center gap-2 rounded-lg border bg-muted/20 p-3'>
                  <span className='text-xs font-semibold text-foreground'>
                    Kombinasi Produk:
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

                <div className='grid gap-3 sm:grid-cols-2'>
                  <div className='space-y-1 rounded-lg border border-border/80 p-3'>
                    <div className='text-xs font-semibold text-foreground'>
                      Mekanisme Sinergi Agronomis:
                    </div>
                    <p className='text-[11px] leading-relaxed text-muted-foreground'>
                      {rule.synergyDescription}
                    </p>
                  </div>

                  <div className='space-y-1 rounded-lg border border-border/80 p-3'>
                    <div className='text-xs font-semibold text-foreground'>
                      Urutan Waktu Aplikasi (HST / Minggu):
                    </div>
                    <p className='font-mono text-[11px] leading-relaxed text-primary'>
                      {rule.sequenceProtocol}
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[11px] leading-relaxed text-muted-foreground'>
                  <AlertTriangle className='mt-0.5 h-4 w-4 shrink-0 text-amber-500' />
                  <div>
                    <span className='font-semibold text-foreground'>
                      Panduan Keamanan Tangki Semprot:{' '}
                    </span>
                    {rule.tankMixGuidelines}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Global Tank-Mixing Rules & Precautions */}
        <Card className='border border-border shadow-xs'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-2'>
              <Droplets className='h-4 w-4 text-primary' />
              <CardTitle className='text-sm font-semibold'>
                Standar Operasional Pencampuran Tangki (Universal Tank-Mix
                Safety)
              </CardTitle>
            </div>
            <CardDescription className='text-xs'>
              Pedoman keselamatan dasar yang wajib dipatuhi di seluruh lini
              lapangan
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-3 text-xs sm:grid-cols-3'>
            <div className='space-y-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3'>
              <div className='flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400'>
                <CheckCircle2 className='h-4 w-4' />
                Sangat Kompatibel (Boleh Dicampur)
              </div>
              <ul className='space-y-1 text-[11px] text-muted-foreground'>
                <li>• Pupuk kalsium murni bebas boron tinggi</li>
                <li>• Pupuk kalium sulfat / KNO3 putih butiran larut air</li>
                <li>• Insektisida emamektin, abamektin, klorfenapir</li>
                <li>• Fungisida mankozeb dan azoksistrobin dosis normal</li>
              </ul>
            </div>

            <div className='space-y-1.5 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3'>
              <div className='flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400'>
                <AlertTriangle className='h-4 w-4' />
                Wajib Uji Jar-Test Terlebih Dahulu
              </div>
              <ul className='space-y-1 text-[11px] text-muted-foreground'>
                <li>• Pupuk mikro majemuk dengan konsentrasi garam tinggi</li>
                <li>
                  • Formulasi insektisida berbasis minyak (EC / Oil Dispersion
                  pekat)
                </li>
                <li>
                  • Perekat / penembus silikon berkonsentrasi sangat tinggi
                </li>
                <li>• Air sumur berkapur tinggi / air payau keruh</li>
              </ul>
            </div>

            <div className='space-y-1.5 rounded-lg border border-rose-500/30 bg-rose-500/5 p-3'>
              <div className='flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400'>
                <XCircle className='h-4 w-4' />
                DILARANG KERAS DICAMPUR
              </div>
              <ul className='space-y-1 text-[11px] text-muted-foreground'>
                <li>
                  • Fungisida tembaga hidroksida pekat (merusak asam amino)
                </li>
                <li>
                  • Herbisida glifosat / parakuat (wajib jeda minimal 7 hari)
                </li>
                <li>
                  • Larutan belerang (sulfur kental) pH sangat asam (&lt; 2.5)
                </li>
                <li>• Kaporit / klorin tinggi pembersih instalasi air</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </Main>
    </>
  )
}
