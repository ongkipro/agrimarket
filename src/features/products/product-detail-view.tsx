import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ShieldAlert,
  RefreshCw,
  Award,
  ShieldCheck,
  Droplets,
  AlertTriangle,
  MapPin,
  Megaphone,
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  Layers,
  FlaskConical,
  Scale,
  Users,
  Compass,
  Activity,
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
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { type ProductDetail } from '@/features/agri/products-catalog-data'

interface ProductDetailViewProps {
  product: ProductDetail
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'formula'
    | 'dosage'
    | 'severity'
    | 'demographics'
    | 'commercial'
    | 'climate'
    | 'meta_ads'
    | 'faq'
  >('overview')

  const getProductIcon = () => {
    switch (product.id) {
      case 'aussie':
        return <ShieldAlert className='h-6 w-6 text-rose-500' />
      case 'bensu':
        return <RefreshCw className='h-6 w-6 text-amber-500' />
      case 'saratoga':
        return <Award className='h-6 w-6 text-indigo-500' />
      case 'kojien':
        return <ShieldCheck className='h-6 w-6 text-emerald-500' />
    }
  }

  const getBadgeColor = () => {
    switch (product.badgeVariant) {
      case 'rose':
        return 'border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400'
      case 'amber':
        return 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400'
      case 'indigo':
        return 'border-indigo-500/40 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
      case 'emerald':
        return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
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
              {product.name}
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <Button asChild variant='outline' size='sm' className='h-8 text-xs'>
              <Link to='/products/mix-match'>
                <Layers className='mr-1.5 h-3.5 w-3.5 text-muted-foreground' />
                Sinergi Mix & Match
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

        {/* Product Hero Header - Clean, unified without nested card-itis */}
        <div className='rounded-lg border border-border bg-card p-5 shadow-xs'>
          <div className='flex flex-col justify-between gap-4 md:flex-row md:items-start'>
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40'>
                  {getProductIcon()}
                </div>
                <div>
                  <div className='flex flex-wrap items-center gap-2'>
                    <h1 className='text-2xl font-bold tracking-tight text-foreground'>
                      {product.name}
                    </h1>
                    <Badge
                      variant='outline'
                      className={`font-mono text-xs ${getBadgeColor()}`}
                    >
                      {product.categoryLabel}
                    </Badge>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {product.subtitle}
                  </p>
                </div>
              </div>

              {/* Internal Mantra Quote */}
              <div className='border-l-2 border-primary/60 pl-3 text-xs text-muted-foreground italic'>
                <span className='font-semibold text-foreground not-italic'>
                  Kalimat Internal Wajib:{' '}
                </span>
                &ldquo;{product.internalMantra}&rdquo;
              </div>
            </div>

            {/* Target Commodities & Quick Stats */}
            <div className='flex flex-col gap-2 rounded-lg bg-muted/40 p-3 text-xs md:min-w-[280px]'>
              <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                Komoditas Target Utama
              </span>
              <div className='flex flex-wrap gap-1.5'>
                {product.targetCommodityLabels.map((crop) => (
                  <Badge
                    key={crop}
                    variant='secondary'
                    className='text-[11px] font-normal'
                  >
                    {crop}
                  </Badge>
                ))}
              </div>
              <div className='mt-1 flex items-center justify-between border-t border-border/40 pt-1.5 text-[11px] text-muted-foreground'>
                <span>Formula:</span>
                <span className='font-semibold text-foreground'>
                  {product.formulaConcept}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as typeof activeTab)}
          className='space-y-4'
        >
          <div className='overflow-x-auto pb-1'>
            <TabsList className='inline-flex h-9 w-full justify-start rounded-md border border-border bg-muted/30 p-1 text-xs'>
              <TabsTrigger value='overview' className='px-3 py-1 text-xs'>
                Ringkasan & Core
              </TabsTrigger>
              <TabsTrigger value='formula' className='px-3 py-1 text-xs'>
                Formula & Kandungan
              </TabsTrigger>
              <TabsTrigger value='dosage' className='px-3 py-1 text-xs'>
                Dosis & Panduan Lapang
              </TabsTrigger>
              <TabsTrigger value='severity' className='px-3 py-1 text-xs'>
                Tingkat Keparahan
              </TabsTrigger>
              <TabsTrigger value='demographics' className='px-3 py-1 text-xs'>
                Demografi & Sentra
              </TabsTrigger>
              <TabsTrigger value='commercial' className='px-3 py-1 text-xs'>
                Strategi Komersial & CS
              </TabsTrigger>
              <TabsTrigger value='climate' className='px-3 py-1 text-xs'>
                Dinamika Iklim 2026-27
              </TabsTrigger>
              <TabsTrigger value='meta_ads' className='px-3 py-1 text-xs'>
                Meta Ads Playbook
              </TabsTrigger>
              <TabsTrigger value='faq' className='px-3 py-1 text-xs'>
                FAQ & Sanggahan
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: OVERVIEW & CORE */}
          <TabsContent value='overview' className='space-y-4'>
            {/* Unified Scope Comparison (What It Is vs What It Is NOT) */}
            <Card className='border border-border shadow-xs'>
              <div className='grid divide-y md:grid-cols-2 md:divide-y-0 md:divide-x divide-border'>
                {/* What It Is */}
                <div className='p-5 space-y-3'>
                  <div className='flex items-center gap-2 text-emerald-600 dark:text-emerald-400'>
                    <CheckCircle2 className='h-4 w-4' />
                    <h3 className='text-sm font-semibold'>
                      Produk Ini Apa (Identitas Resep)
                    </h3>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    Definisi fungsi dan peranan pokok produk di tingkat lapangan
                  </p>
                  <ul className='space-y-2 pt-1'>
                    {product.whatItIs.map((item, idx) => (
                      <li
                        key={idx}
                        className='flex items-start gap-2.5 text-xs text-foreground/90'
                      >
                        <span className='mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500' />
                        <span className='leading-relaxed'>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What It Is NOT */}
                <div className='p-5 space-y-3'>
                  <div className='flex items-center gap-2 text-rose-500 dark:text-rose-400'>
                    <XCircle className='h-4 w-4' />
                    <h3 className='text-sm font-semibold'>
                      Produk Ini Bukan Apa (Batasan Ekspektasi)
                    </h3>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    Menghindari miskonsepsi dan ekspektasi instan yang merusak kepercayaan petani
                  </p>
                  <ul className='space-y-2 pt-1'>
                    {product.whatItIsNot.map((item, idx) => (
                      <li
                        key={idx}
                        className='flex items-start gap-2.5 text-xs text-foreground/90'
                      >
                        <span className='mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500' />
                        <span className='leading-relaxed'>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Positioning Matrix */}
            <Card className='border border-border shadow-xs'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm font-semibold'>
                  Pondasi Positioning & Narasi Pasar
                </CardTitle>
                <CardDescription className='text-xs'>
                  Standar bahasa komunikasi untuk materi edukasi, landing page, dan percakapan tim agronomist
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-4 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border pt-1'>
                  <div className='space-y-1 sm:pr-4'>
                    <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                      English Technical Core
                    </span>
                    <p className='text-xs leading-relaxed font-semibold text-foreground pt-1'>
                      &ldquo;{product.corePositioning.en}&rdquo;
                    </p>
                  </div>
                  <div className='space-y-1 pt-3 sm:pt-0 sm:pl-4'>
                    <span className='font-mono text-[10px] tracking-wider text-muted-foreground uppercase'>
                      Bahasa Pasar Indonesia
                    </span>
                    <p className='text-xs leading-relaxed font-semibold text-foreground pt-1'>
                      &ldquo;{product.corePositioning.id}&rdquo;
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mode of Action Timeline - Sleek progressive timeline */}
            {product.modeOfActionTimeline && product.modeOfActionTimeline.length > 0 && (
              <Card className='border border-border shadow-xs'>
                <CardHeader className='pb-3'>
                  <div className='flex items-center gap-2'>
                    <Activity className='h-4 w-4 text-primary' />
                    <CardTitle className='text-sm font-semibold'>
                      Respon Bio-Fisiologis Seluler (Mode of Action Timeline)
                    </CardTitle>
                  </div>
                  <CardDescription className='text-xs'>
                    Tahapan reaksi sel tanaman dari jam pertama aplikasi hingga hasil panen visual
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    {product.modeOfActionTimeline.map((step, idx) => (
                      <div
                        key={idx}
                        className='relative flex flex-col justify-between rounded-lg bg-muted/30 p-3.5 space-y-2'
                      >
                        <div className='space-y-1.5'>
                          <div className='flex items-center justify-between'>
                            <Badge
                              variant='outline'
                              className='font-mono text-[10px] font-bold text-primary'
                            >
                              {step.timeframe}
                            </Badge>
                            <span className='font-mono text-[10px] text-muted-foreground font-semibold'>
                              0{idx + 1}
                            </span>
                          </div>
                          <div className='text-xs font-bold text-foreground'>
                            {step.phaseName}
                          </div>
                          <p className='text-[11px] leading-relaxed text-muted-foreground'>
                            {step.biologicalProcess}
                          </p>
                        </div>
                        <div className='border-t border-border/40 pt-2 text-[10px] text-foreground'>
                          <span className='font-semibold text-primary'>Tanda Lapang: </span>
                          {step.farmerVisibleResult}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* TAB 2: FORMULA & KANDUNGAN */}
          <TabsContent value='formula' className='space-y-4'>
            <Card className='border border-border shadow-xs'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <FlaskConical className='h-4 w-4 text-primary' />
                  <CardTitle className='text-sm font-semibold'>
                    Mekanisme Bio-Kimia & Formulasi
                  </CardTitle>
                </div>
                <CardDescription className='text-xs leading-relaxed'>
                  {product.brandMechanism}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-5'>
                {/* Active Composition Table */}
                <div className='overflow-x-auto rounded-lg border'>
                  <table className='w-full text-left text-xs'>
                    <thead className='border-b bg-muted/50 font-semibold text-muted-foreground'>
                      <tr>
                        <th className='p-3'>Komponen Aktif Formula</th>
                        <th className='w-28 p-3'>Kadar Analisis</th>
                        <th className='p-3'>
                          Fungsi Spesifik pada Fisiologi Tanaman
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-border/60'>
                      {product.composition.map((comp, idx) => (
                        <tr key={idx} className='hover:bg-muted/30'>
                          <td className='p-3 font-semibold text-foreground'>
                            {comp.item}
                          </td>
                          <td className='p-3 font-mono font-bold text-primary'>
                            {comp.value}
                          </td>
                          <td className='p-3 leading-relaxed text-muted-foreground'>
                            {comp.function}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Physical Specifications (TDS Specs Sheet) */}
                {product.physicalSpecifications && (
                  <div className='space-y-2 pt-1'>
                    <div className='flex items-center gap-2 text-xs font-bold text-foreground'>
                      <FlaskConical className='h-3.5 w-3.5 text-primary' />
                      Spesifikasi Fisik & Karakteristik Larutan (Quality Standards)
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-px bg-border/60 overflow-hidden rounded-lg border'>
                      <div className='bg-card p-3 space-y-0.5'>
                        <span className='text-[10px] text-muted-foreground uppercase font-mono'>
                          Bentuk Formulasi
                        </span>
                        <div className='text-xs font-bold text-foreground'>
                          {product.physicalSpecifications.formulationType}
                        </div>
                      </div>
                      <div className='bg-card p-3 space-y-0.5'>
                        <span className='text-[10px] text-muted-foreground uppercase font-mono'>
                          Warna & Aroma
                        </span>
                        <div className='text-xs font-medium text-foreground'>
                          {product.physicalSpecifications.colorAndAroma}
                        </div>
                      </div>
                      <div className='bg-card p-3 space-y-0.5'>
                        <span className='text-[10px] text-muted-foreground uppercase font-mono'>
                          Berat Jenis (Density)
                        </span>
                        <div className='text-xs font-mono font-bold text-primary'>
                          {product.physicalSpecifications.density}
                        </div>
                      </div>
                      <div className='bg-card p-3 space-y-0.5'>
                        <span className='text-[10px] text-muted-foreground uppercase font-mono'>
                          pH Larutan (1%)
                        </span>
                        <div className='text-xs font-mono font-bold text-foreground'>
                          {product.physicalSpecifications.solutionPh}
                        </div>
                      </div>
                      <div className='bg-card p-3 space-y-0.5'>
                        <span className='text-[10px] text-muted-foreground uppercase font-mono'>
                          Kelarutan Air (Solubility)
                        </span>
                        <div className='text-xs font-semibold text-emerald-600 dark:text-emerald-400'>
                          {product.physicalSpecifications.solubility}
                        </div>
                      </div>
                      <div className='bg-card p-3 space-y-0.5'>
                        <span className='text-[10px] text-muted-foreground uppercase font-mono'>
                          Masa Simpan (Shelf Life)
                        </span>
                        <div className='text-xs font-semibold text-foreground'>
                          {product.physicalSpecifications.shelfLife}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Claim Guardrails */}
                <div className='grid gap-4 pt-2 sm:grid-cols-2'>
                  <div className='space-y-2 rounded-lg bg-emerald-500/5 p-4 border border-emerald-500/20'>
                    <div className='flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400'>
                      <CheckCircle2 className='h-3.5 w-3.5' />
                      Klaim yang Boleh Digunakan (Compliant)
                    </div>
                    <ul className='space-y-1.5 text-[11px] text-muted-foreground'>
                      {product.claimGuardrails.allowedPhrasing.map((p, i) => (
                        <li key={i} className='flex items-start gap-1.5'>
                          <span className='font-bold text-emerald-600'>✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className='space-y-2 rounded-lg bg-rose-500/5 p-4 border border-rose-500/20'>
                    <div className='flex items-center gap-1.5 text-xs font-semibold text-rose-700 dark:text-rose-400'>
                      <AlertTriangle className='h-3.5 w-3.5' />
                      Klaim yang Dilarang (Over-claiming Risk)
                    </div>
                    <ul className='space-y-1.5 text-[11px] text-muted-foreground'>
                      {product.claimGuardrails.prohibitedPhrasing.map(
                        (p, i) => (
                          <li key={i} className='flex items-start gap-1.5'>
                            <span className='font-bold text-rose-600'>✕</span>
                            <span>{p}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: DOSAGE & APPLICATION - High-density Schedule Table */}
          <TabsContent value='dosage' className='space-y-4'>
            <Card className='border border-border shadow-xs'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <Droplets className='h-4 w-4 text-sky-500' />
                  <CardTitle className='text-sm font-semibold'>
                    Protokol Dosis, Timing & Metode Aplikasi
                  </CardTitle>
                </div>
                <CardDescription className='text-xs'>
                  Instruksi presisi bagi distributor, agronomist lapangan, dan
                  petani untuk efisiensi input tertinggi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='overflow-x-auto rounded-lg border'>
                  <table className='w-full text-left text-xs'>
                    <thead className='border-b bg-muted/50 font-semibold text-muted-foreground'>
                      <tr>
                        <th className='p-3 w-44'>Fase / Sasaran</th>
                        <th className='p-3 w-32'>Metode</th>
                        <th className='p-3 w-36'>Dosis</th>
                        <th className='p-3 w-40'>Timing & Interval</th>
                        <th className='p-3'>Catatan Kritis Lapangan</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-border/60'>
                      {product.dosageMatrix.map((step, idx) => (
                        <tr key={idx} className='hover:bg-muted/30'>
                          <td className='p-3'>
                            <div className='font-semibold text-foreground'>
                              {step.cropOrPhase}
                            </div>
                            <div className='font-mono text-[10px] text-muted-foreground'>
                              Aplikasi #{idx + 1}
                            </div>
                          </td>
                          <td className='p-3'>
                            <Badge variant='secondary' className='text-[10px]'>
                              {step.applicationMethod.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className='p-3 font-mono font-bold text-primary'>
                            {step.dosagePerLiter}
                          </td>
                          <td className='p-3 text-[11px]'>
                            <div className='text-foreground'>{step.timing}</div>
                            <div className='text-muted-foreground text-[10px]'>
                              Tiap {step.intervalDays} hari
                            </div>
                          </td>
                          <td className='p-3 leading-relaxed text-muted-foreground text-[11px]'>
                            {step.keyNotes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: SEVERITY LEVELS - Triage Matrix Table */}
          <TabsContent value='severity' className='space-y-4'>
            <Card className='border border-border shadow-xs'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <Scale className='h-4 w-4 text-amber-500' />
                  <CardTitle className='text-sm font-semibold'>
                    Matriks Diagnosa Tingkat Keparahan Lapang
                  </CardTitle>
                </div>
                <CardDescription className='text-xs'>
                  Alur triage cepat bagi petugas lapangan untuk menilai peluang recovery tanaman
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='overflow-x-auto rounded-lg border'>
                  <table className='w-full text-left text-xs'>
                    <thead className='border-b bg-muted/50 font-semibold text-muted-foreground'>
                      <tr>
                        <th className='p-3 w-40'>Stase & Kategori</th>
                        <th className='p-3 w-28'>Prognosis</th>
                        <th className='p-3'>Gejala Visual</th>
                        <th className='p-3 w-36'>Dosis Darurat</th>
                        <th className='p-3'>Protokol Tindakan Segera</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-border/60'>
                      {product.severityLevels.map((lvl, idx) => (
                        <tr key={idx} className='hover:bg-muted/30'>
                          <td className='p-3'>
                            <div className='flex items-center gap-1.5'>
                              <Badge
                                variant={idx >= 2 ? 'destructive' : 'secondary'}
                                className='font-mono text-[10px]'
                              >
                                {lvl.stage}
                              </Badge>
                            </div>
                            <div className='font-bold text-foreground pt-1'>
                              {lvl.title}
                            </div>
                          </td>
                          <td className='p-3'>
                            <Badge variant='outline' className='font-mono text-[10px]'>
                              {lvl.prognosis}
                            </Badge>
                          </td>
                          <td className='p-3 leading-relaxed text-muted-foreground text-[11px]'>
                            {lvl.symptoms}
                          </td>
                          <td className='p-3 font-mono font-bold text-primary'>
                            {lvl.recommendedDosage}
                          </td>
                          <td className='p-3 leading-relaxed text-muted-foreground text-[11px]'>
                            {lvl.actionProtocol}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 5: DEMOGRAPHICS & SENTRA */}
          <TabsContent value='demographics' className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2'>
              {/* Buyer Persona Card */}
              <Card className='border border-border shadow-xs'>
                <CardHeader className='pb-3'>
                  <div className='flex items-center gap-2'>
                    <Users className='h-4 w-4 text-primary' />
                    <CardTitle className='text-sm font-semibold'>
                      Profil Persona Pembeli Utama
                    </CardTitle>
                  </div>
                  <CardDescription className='text-xs'>
                    Karakteristik psikografis dan motivasi belanja petani
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4 text-xs'>
                  <div className='rounded-lg bg-muted/30 p-3.5 space-y-1'>
                    <div className='text-sm font-bold text-foreground'>
                      {product.demographics.persona.roleTitle}
                    </div>
                    <div className='text-[11px] text-muted-foreground'>
                      <span className='font-semibold text-foreground'>
                        Skala Lahan:{' '}
                      </span>
                      {product.demographics.persona.acreageProfile}
                    </div>
                  </div>

                  <div className='space-y-3 text-xs'>
                    <div>
                      <span className='font-semibold text-rose-600 dark:text-rose-400'>
                        Ketakutan Terbesar (Core Fear):{' '}
                      </span>
                      <p className='mt-0.5 leading-relaxed text-muted-foreground'>
                        {product.demographics.persona.coreFear}
                      </p>
                    </div>
                    <div>
                      <span className='font-semibold text-emerald-600 dark:text-emerald-400'>
                        Aspirasi & Harapan (Core Desire):{' '}
                      </span>
                      <p className='mt-0.5 leading-relaxed text-muted-foreground'>
                        {product.demographics.persona.coreAspiration}
                      </p>
                    </div>
                    <div className='border-t border-border/40 pt-2 text-[11px] text-muted-foreground'>
                      <span className='font-semibold text-foreground'>
                        Pemicu Transaksi:{' '}
                      </span>
                      {product.demographics.persona.buyingMotivator}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sentra Geographic Hubs */}
              <Card className='border border-border shadow-xs'>
                <CardHeader className='pb-3'>
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4 text-rose-500' />
                    <CardTitle className='text-sm font-semibold'>
                      Sentra Produksi Geografis Utama
                    </CardTitle>
                  </div>
                  <CardDescription className='text-xs'>
                    Wilayah agroklimat dengan densitas kebutuhan produk tertinggi
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-3.5'>
                  <div className='divide-y divide-border/60'>
                    {product.demographics.sentraHubs.map((hub, idx) => (
                      <div key={idx} className='py-2.5 first:pt-0 last:pb-0 space-y-1.5 text-xs'>
                        <div className='flex items-center justify-between'>
                          <span className='font-bold text-foreground'>
                            {hub.province}
                          </span>
                          <span className='font-mono text-[10px] text-muted-foreground'>
                            Sentra Prioritas
                          </span>
                        </div>
                        <div className='flex flex-wrap gap-1'>
                          {hub.regencies.map((reg) => (
                            <Badge
                              key={reg}
                              variant='secondary'
                              className='text-[10px]'
                            >
                              {reg}
                            </Badge>
                          ))}
                        </div>
                        <p className='text-[11px] leading-relaxed text-muted-foreground'>
                          {hub.soilAndClimateNote}
                        </p>
                      </div>
                    ))}
                  </div>

                  {product.demographics.indonesiaExpansionHubs && (
                    <div className='rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs space-y-1'>
                      <span className='font-bold text-primary'>
                        Sentra Sekunder & Koridor Ekspansi Nasional:
                      </span>
                      <p className='text-[11px] text-muted-foreground leading-relaxed'>
                        {product.demographics.indonesiaExpansionHubs.join(', ')}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 6: COMMERCIAL & CS TREE */}
          <TabsContent value='commercial' className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2'>
              {/* Hero Offers & Bundles */}
              <Card className='border border-border shadow-xs'>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-sm font-semibold'>
                    Skema Paket Penjualan & Pricing
                  </CardTitle>
                  <CardDescription className='text-xs'>
                    {product.commercialPillars.pricingStrategy}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='divide-y divide-border/60'>
                    {product.commercialPillars.heroOffers.map((offer, idx) => (
                      <div
                        key={idx}
                        className='flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 text-xs'
                      >
                        <div className='space-y-0.5'>
                          <div className='font-bold text-foreground'>
                            {offer.name}
                          </div>
                          <div className='text-[11px] text-muted-foreground'>
                            {offer.targetFarmer}
                          </div>
                        </div>
                        <div className='shrink-0 text-right'>
                          <div className='font-mono text-sm font-bold text-primary'>
                            Rp {offer.priceIdr.toLocaleString('id-ID')}
                          </div>
                          <Badge
                            variant='outline'
                            className='font-mono text-[9px]'
                          >
                            {offer.volume}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Service Decision Tree */}
              <Card className='border border-border shadow-xs'>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-sm font-semibold'>
                    Pohon Keputusan Tim CS / Agronomist
                  </CardTitle>
                  <CardDescription className='text-xs'>
                    Panduan respon langsung saat petani berkonsultasi via WhatsApp / telepon
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='divide-y divide-border/60'>
                    {product.commercialPillars.csDecisionTree.map((node, idx) => (
                      <div
                        key={idx}
                        className='py-3 first:pt-0 last:pb-0 space-y-1.5 text-xs'
                      >
                        <div className='text-xs font-semibold text-foreground'>
                          Trig: &ldquo;{node.farmerSymptomTrigger}&rdquo;
                        </div>
                        <div className='text-[11px] text-muted-foreground'>
                          <span className='font-semibold text-primary'>
                            Tanya Balik CS:{' '}
                          </span>
                          {node.csQuestion}
                        </div>
                        <div className='text-[11px] text-muted-foreground'>
                          <span className='font-semibold text-foreground'>
                            Rekomendasi Solusi:{' '}
                          </span>
                          {node.recommendation}
                        </div>
                        <div className='font-mono text-[10px] text-emerald-600 dark:text-emerald-400'>
                          Paket Closing: {node.suggestedBundle}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 7: CLIMATE SYNC 2026-2027 */}
          <TabsContent value='climate' className='space-y-4'>
            <Card className='border border-border shadow-xs'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <Compass className='h-4 w-4 text-sky-500' />
                  <CardTitle className='text-sm font-semibold'>
                    Sinkronisasi Siklus Iklim BMKG (2026 El Niño Kuat s/d 2027 La Niña Lemah)
                  </CardTitle>
                </div>
                <CardDescription className='text-xs'>
                  Bagaimana peran produk bergeser mengikuti anomali suhu muka laut dan kelembaban atmosfer
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4 text-xs'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  {/* El Nino 2026 */}
                  <div className='space-y-2 rounded-lg bg-rose-500/5 border border-rose-500/20 p-4'>
                    <div className='flex items-center justify-between'>
                      <Badge
                        variant='outline'
                        className='border-rose-500/50 font-mono text-[10px] text-rose-600 dark:text-rose-400'
                      >
                        Tahun 2026: El Niño Kuat (+1.68°C)
                      </Badge>
                      <span className='font-mono text-[10px] text-muted-foreground'>
                        Kemarau Kering Terik
                      </span>
                    </div>
                    <p className='text-xs leading-relaxed text-muted-foreground'>
                      {product.climateIntegration.elNino2026Role}
                    </p>
                  </div>

                  {/* La Nina 2027 */}
                  <div className='space-y-2 rounded-lg bg-sky-500/5 border border-sky-500/20 p-4'>
                    <div className='flex items-center justify-between'>
                      <Badge
                        variant='outline'
                        className='border-sky-500/50 font-mono text-[10px] text-sky-600 dark:text-sky-400'
                      >
                        Tahun 2027: Peluruhan & La Niña Lemah (-0.85°C)
                      </Badge>
                      <span className='font-mono text-[10px] text-muted-foreground'>
                        Kemarau Basah & Hujan Lembab
                      </span>
                    </div>
                    <p className='text-xs leading-relaxed text-muted-foreground'>
                      {product.climateIntegration.laNina2027Role}
                    </p>
                  </div>
                </div>

                <div className='rounded-lg bg-muted/30 p-3.5 text-xs space-y-1'>
                  <div className='flex items-center gap-1.5 font-semibold text-foreground'>
                    <Clock className='h-3.5 w-3.5 text-primary' />
                    Waktu Emas Penyerapan Pasar (Golden Selling Windows):
                  </div>
                  <p className='text-[11px] leading-relaxed text-muted-foreground'>
                    {product.climateIntegration.goldenApplicationWindows}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 8: META ADS PLAYBOOK */}
          <TabsContent value='meta_ads' className='space-y-4'>
            <Card className='border border-border shadow-xs'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <Megaphone className='h-4 w-4 text-indigo-500' />
                  <CardTitle className='text-sm font-semibold'>
                    Meta Ads Creative Angle & Copywriting Playbook
                  </CardTitle>
                </div>
                <CardDescription className='text-xs'>
                  Kumpulan hook teruji, sudut pandang iklan (angle), dan instruksi visual siap pakai untuk tim digital growth
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-5'>
                <div className='divide-y divide-border/60'>
                  {product.metaAdsPlaybook.coreHooks.map((hook) => (
                    <div
                      key={hook.angleId}
                      className='py-4 first:pt-0 last:pb-0 space-y-2.5 text-xs'
                    >
                      <div className='flex flex-wrap items-center justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                          <Badge
                            variant='secondary'
                            className='font-mono text-[10px]'
                          >
                            {hook.angleName}
                          </Badge>
                          <span className='text-xs font-bold text-foreground'>
                            {hook.primaryHeadline}
                          </span>
                        </div>
                        <Badge variant='outline' className='text-[10px]'>
                          {hook.seasonalFit}
                        </Badge>
                      </div>

                      <div className='space-y-1.5'>
                        <div className='rounded bg-muted/40 p-2.5 text-xs leading-relaxed font-medium text-foreground'>
                          &ldquo;{hook.hookQuestion}&rdquo;
                        </div>
                        <p className='text-[11px] leading-relaxed text-muted-foreground'>
                          {hook.bodyCopy}
                        </p>
                      </div>

                      <div className='grid gap-2 text-[11px] text-muted-foreground sm:grid-cols-2 pt-1'>
                        <div>
                          <span className='font-semibold text-foreground'>
                            Call To Action (CTA):{' '}
                          </span>
                          <span className='font-mono font-bold text-primary'>
                            {hook.callToAction}
                          </span>
                        </div>
                        <div>
                          <span className='font-semibold text-foreground'>
                            Format Visual:{' '}
                          </span>
                          <span>{hook.suggestedCreative}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Targeting Settings */}
                <div className='rounded-lg bg-muted/30 p-3.5 text-xs space-y-2'>
                  <div className='font-semibold text-foreground'>
                    Panduan Targeting Audience Meta Ads:
                  </div>
                  <div className='flex flex-wrap gap-1.5'>
                    {product.metaAdsPlaybook.targetingInterests.map(
                      (interest) => (
                        <Badge
                          key={interest}
                          variant='outline'
                          className='text-[10px]'
                        >
                          + {interest}
                        </Badge>
                      )
                    )}
                  </div>
                  <div className='text-[10px] text-muted-foreground'>
                    <span className='font-semibold text-rose-500'>
                      Exclusions:{' '}
                    </span>
                    {product.metaAdsPlaybook.exclusions.join(', ')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 9: FAQ */}
          <TabsContent value='faq' className='space-y-4'>
            <Card className='border border-border shadow-xs'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <HelpCircle className='h-4 w-4 text-primary' />
                  <CardTitle className='text-sm font-semibold'>
                    Pertanyaan Sering Diajukan (FAQ) & Sanggahan
                  </CardTitle>
                </div>
                <CardDescription className='text-xs'>
                  Jawaban otoritatif atas keraguan teknis maupun komersial petani dan pemilik toko kios saprotan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='divide-y divide-border/60'>
                  {product.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className='py-3.5 first:pt-0 last:pb-0 space-y-1.5 text-xs'
                    >
                      <div className='flex items-center justify-between gap-2'>
                        <span className='text-xs font-bold text-foreground'>
                          Q: {faq.question}
                        </span>
                        <Badge variant='outline' className='font-mono text-[9px]'>
                          {faq.category}
                        </Badge>
                      </div>
                      <p className='text-[11px] leading-relaxed text-muted-foreground'>
                        A: {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
