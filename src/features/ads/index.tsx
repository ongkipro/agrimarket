import { useState } from 'react'
import {
  Megaphone,
  Target,
  Users,
  Search as SearchIcon,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Copy,
  Check,
  Smartphone,
  CreditCard,
  Clock,
  Layers,
  Calculator,
  Flame,
  Award,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  getNationalDemographics,
  getHourlyActivityHeatmap,
  getBuyerPersonas,
  getCompetitorProfiles,
  getCreativeTeardowns,
  getCopywritingBlueprints,
  getAdScripts,
  getGoogleKeywordTiers,
  getAllGoogleKeywords,
  getNegativeKeywordGroups,
  getRoASBenchmarks,
  calculateRoAS,
} from '@/features/agri/ads-data-provider'
import type { BuyerPersona, CompetitorProfile, AdScript } from '@/features/agri/ads-types'

export function AdsGrowthEngine() {
  const demographics = getNationalDemographics()
  const hourlyHeatmap = getHourlyActivityHeatmap()
  const buyerPersonas = getBuyerPersonas()
  const competitors = getCompetitorProfiles()
  const creativeTeardowns = getCreativeTeardowns()
  const blueprints = getCopywritingBlueprints()
  const adScripts = getAdScripts()
  const keywordTiers = getGoogleKeywordTiers()
  const allKeywords = getAllGoogleKeywords()
  const negativeKeywordGroups = getNegativeKeywordGroups()
  const roasBenchmarks = getRoASBenchmarks()

  // State
  const [selectedTab, setSelectedTab] = useState<string>('personas')
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(buyerPersonas[0]?.id || '')
  const selectedPersona: BuyerPersona =
    buyerPersonas.find((p) => p.id === selectedPersonaId) || buyerPersonas[0]

  const [selectedScriptIndex, setSelectedScriptIndex] = useState<number>(0)
  const activeScript: AdScript = adScripts[selectedScriptIndex] || adScripts[0]
  const [copiedScript, setCopiedScript] = useState<boolean>(false)

  // Keywords filter state
  const [keywordFilterTier, setKeywordFilterTier] = useState<string>('ALL')
  const [keywordSearchQuery, setKeywordSearchQuery] = useState<string>('')

  // Competitor filter state
  const [competitorFilterCategory, setCompetitorFilterCategory] = useState<string>('ALL')
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string>(competitors[0]?.id || '')
  const selectedCompetitor: CompetitorProfile =
    competitors.find((c) => c.id === selectedCompetitorId) || competitors[0]

  // RoAS Simulator State
  const [activePreset, setActivePreset] = useState<string>('hortikultura_intensif')
  const defaultBenchmark = roasBenchmarks.hortikultura_intensif || {
    typical_cpm_idr: 22000,
    avg_ctr_percent: 2.8,
    cpl_wa_idr: 11500,
    wa_to_order_closing_rate_percent: 18.5,
    average_order_value_idr: 385000,
    target_roas: 4.2,
  }

  const [monthlyAdSpend, setMonthlyAdSpend] = useState<number>(15000000) // Rp 15 Juta
  const [simCpm, setSimCpm] = useState<number>(defaultBenchmark.typical_cpm_idr)
  const [simCtr, setSimCtr] = useState<number>(defaultBenchmark.avg_ctr_percent)
  const [simWaCvr, setSimWaCvr] = useState<number>(9.5)
  const [simClosingRate, setSimClosingRate] = useState<number>(
    defaultBenchmark.wa_to_order_closing_rate_percent
  )
  const [simAov, setSimAov] = useState<number>(defaultBenchmark.average_order_value_idr)
  const [simCogsPct, setSimCogsPct] = useState<number>(35)

  const handleApplyPreset = (presetKey: string) => {
    setActivePreset(presetKey)
    const preset = roasBenchmarks[presetKey]
    if (preset) {
      setSimCpm(preset.typical_cpm_idr)
      setSimCtr(preset.avg_ctr_percent)
      setSimClosingRate(preset.wa_to_order_closing_rate_percent)
      setSimAov(preset.average_order_value_idr)
      if (presetKey === 'perkebunan_sawit') {
        setSimWaCvr(7.5)
        setSimCogsPct(40)
      } else if (presetKey === 'florikultura_urban') {
        setSimWaCvr(12.0)
        setSimCogsPct(30)
      } else {
        setSimWaCvr(9.5)
        setSimCogsPct(35)
      }
      toast.info(`Preset diterapkan: ${presetKey.replace(/_/g, ' ').toUpperCase()}`)
    }
  }

  const simResult = calculateRoAS({
    monthly_ad_spend_idr: monthlyAdSpend,
    cpm_idr: simCpm,
    ctr_percent: simCtr,
    wa_conversion_rate_percent: simWaCvr,
    closing_rate_percent: simClosingRate,
    average_order_value_idr: simAov,
    cogs_percentage: simCogsPct,
  })

  const handleCopyScript = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedScript(true)
    toast.success('Ad script berhasil disalin ke clipboard!')
    setTimeout(() => setCopiedScript(false), 2500)
  }

  const handleCopyAllNegatives = () => {
    const allNegatives = negativeKeywordGroups.flatMap((g) => g.list).join('\n')
    navigator.clipboard.writeText(allNegatives)
    toast.success(`${negativeKeywordGroups.reduce((acc, g) => acc + g.list.length, 0)} Negative Keywords berhasil disalin!`)
  }

  // Filtered Google Keywords
  const filteredKeywords = allKeywords.filter((k) => {
    const matchesTier =
      keywordFilterTier === 'ALL' ||
      (keywordFilterTier === 'TIER_1' && k.tier_name.includes('Tier 1')) ||
      (keywordFilterTier === 'TIER_2' && k.tier_name.includes('Tier 2')) ||
      (keywordFilterTier === 'TIER_3' && k.tier_name.includes('Tier 3'))
    const matchesQuery =
      keywordSearchQuery === '' ||
      k.keyword.toLowerCase().includes(keywordSearchQuery.toLowerCase()) ||
      k.crop.toLowerCase().includes(keywordSearchQuery.toLowerCase())
    return matchesTier && matchesQuery
  })

  // Filtered Competitors
  const filteredCompetitors = competitors.filter((c) => {
    if (competitorFilterCategory === 'ALL') return true
    if (competitorFilterCategory === 'TIER_1') return c.market_share_category.includes('Tier 1')
    if (competitorFilterCategory === 'TIER_2') return c.market_share_category.includes('Tier 2')
    return true
  })

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='space-y-6 pb-12'>
          {/* Header Title & Description */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4'>
            <div>
              <div className='flex items-center gap-2'>
                <Badge variant='outline' className='bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200'>
                  Growth & Ads Engine
                </Badge>
                <Badge variant='secondary' className='text-xs'>
                  Meta & Google Ads Intel
                </Badge>
              </div>
              <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1'>
                Agricultural Digital Acquisition & Ads Intelligence
              </h1>
              <p className='text-muted-foreground text-xs sm:text-sm mt-0.5'>
                Riset perilaku audiens petani digital, creative library Meta Ads, matriks kompetitor agrokimia, dan kata kunci Google Ads intent tinggi.
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                className='h-9 text-xs'
                onClick={() => setSelectedTab('simulator')}
              >
                <Calculator className='h-3.5 w-3.5 mr-1.5 text-indigo-600' />
                Simulator RoAS
              </Button>
              <Button
                variant='default'
                size='sm'
                className='h-9 text-xs bg-indigo-600 hover:bg-indigo-700 text-white'
                onClick={() => setSelectedTab('creative')}
              >
                <Sparkles className='h-3.5 w-3.5 mr-1.5' />
                Copywriting Playbook
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className='w-full'>
            <div className='w-full overflow-x-auto no-scrollbar pb-1'>
              <TabsList className='inline-flex w-max min-w-full sm:min-w-0 justify-start h-10'>
                <TabsTrigger value='personas' className='text-xs sm:text-sm px-3 sm:px-4 py-2'>
                  <Users className='h-3.5 w-3.5 mr-1.5' />
                  Personas & Demografi
                </TabsTrigger>
                <TabsTrigger value='creative' className='text-xs sm:text-sm px-3 sm:px-4 py-2'>
                  <Megaphone className='h-3.5 w-3.5 mr-1.5' />
                  Meta Ads Creative & Copy
                </TabsTrigger>
                <TabsTrigger value='keywords' className='text-xs sm:text-sm px-3 sm:px-4 py-2'>
                  <SearchIcon className='h-3.5 w-3.5 mr-1.5' />
                  Google Ads High-Intent
                </TabsTrigger>
                <TabsTrigger value='competitors' className='text-xs sm:text-sm px-3 sm:px-4 py-2'>
                  <Target className='h-3.5 w-3.5 mr-1.5' />
                  Competitor Spy Matrix
                </TabsTrigger>
                <TabsTrigger value='simulator' className='text-xs sm:text-sm px-3 sm:px-4 py-2'>
                  <Calculator className='h-3.5 w-3.5 mr-1.5' />
                  Budget & RoAS Calculator
                </TabsTrigger>
              </TabsList>
            </div>

            {/* TAB 1: PERSONAS & DEMOGRAFI */}
            <TabsContent value='personas' className='space-y-6 pt-4'>
              {/* Macro Demographic KPI Cards */}
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
                <Card className='p-4 border-l-4 border-l-blue-500'>
                  <div className='flex items-center justify-between text-muted-foreground text-xs'>
                    <span>Digital Farmers Reached</span>
                    <Users className='h-4 w-4 text-blue-500' />
                  </div>
                  <div className='text-xl sm:text-2xl font-bold font-mono text-foreground mt-1'>
                    12.45 Juta
                  </div>
                  <div className='text-[11px] text-muted-foreground mt-1'>
                    Aktif media sosial (FB, TikTok, WA)
                  </div>
                </Card>

                <Card className='p-4 border-l-4 border-l-emerald-500'>
                  <div className='flex items-center justify-between text-muted-foreground text-xs'>
                    <span>Android Dominance</span>
                    <Smartphone className='h-4 w-4 text-emerald-500' />
                  </div>
                  <div className='text-xl sm:text-2xl font-bold font-mono text-foreground mt-1'>
                    94.2%
                  </div>
                  <div className='text-[11px] text-muted-foreground mt-1'>
                    Vivo, Oppo, Samsung A, Xiaomi
                  </div>
                </Card>

                <Card className='p-4 border-l-4 border-l-amber-500'>
                  <div className='flex items-center justify-between text-muted-foreground text-xs'>
                    <span>Preferensi Bayar COD</span>
                    <CreditCard className='h-4 w-4 text-amber-500' />
                  </div>
                  <div className='text-xl sm:text-2xl font-bold font-mono text-foreground mt-1'>
                    58.0%
                  </div>
                  <div className='text-[11px] text-muted-foreground mt-1'>
                    Bayar di tempat saat kurir tiba di rumah
                  </div>
                </Card>

                <Card className='p-4 border-l-4 border-l-purple-500'>
                  <div className='flex items-center justify-between text-muted-foreground text-xs'>
                    <span>Prime Decision Makers</span>
                    <Clock className='h-4 w-4 text-purple-500' />
                  </div>
                  <div className='text-xl sm:text-2xl font-bold font-mono text-foreground mt-1'>
                    34.6%
                  </div>
                  <div className='text-[11px] text-muted-foreground mt-1'>
                    Rentang usia produktif 35 - 44 tahun
                  </div>
                </Card>
              </div>

              {/* Persona Selector Strip */}
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-base font-semibold text-foreground flex items-center gap-2'>
                    <Users className='h-4 w-4 text-indigo-600' />
                    5 Segmented Buyer Personas Pertanian Indonesia
                  </h3>
                  <span className='text-xs text-muted-foreground'>Klik persona untuk detail lengkap</span>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5'>
                  {buyerPersonas.map((persona) => {
                    const isSelected = persona.id === selectedPersonaId
                    return (
                      <button
                        key={persona.id}
                        type='button'
                        onClick={() => setSelectedPersonaId(persona.id)}
                        className={`text-left p-3 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 shadow-xs ring-1 ring-indigo-500'
                            : 'bg-card hover:bg-muted/50 border-border'
                        }`}
                      >
                        <div className='flex items-center justify-between'>
                          <Badge variant='outline' className='text-[10px] uppercase font-semibold'>
                            {persona.segment}
                          </Badge>
                          {isSelected && <Check className='h-3.5 w-3.5 text-indigo-600' />}
                        </div>
                        <div className='font-bold text-sm text-foreground mt-2 leading-tight'>
                          {persona.name}
                        </div>
                        <div className='text-[11px] text-muted-foreground line-clamp-1 mt-0.5'>
                          {persona.role}
                        </div>
                        <div className='text-[10px] text-indigo-600 dark:text-indigo-400 font-mono mt-1'>
                          {persona.demographics.land_size}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Selected Persona Deep Dive Card */}
              <Card className='border-indigo-100 dark:border-indigo-900/50 shadow-sm'>
                <CardHeader className='pb-3'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                    <div>
                      <div className='flex items-center gap-2'>
                        <Badge className='bg-indigo-600 text-white hover:bg-indigo-700'>
                          {selectedPersona.segment}
                        </Badge>
                        <span className='text-xs font-mono text-muted-foreground'>
                          ID: {selectedPersona.id}
                        </span>
                      </div>
                      <CardTitle className='text-xl mt-1'>{selectedPersona.name}</CardTitle>
                      <CardDescription className='text-xs sm:text-sm'>
                        {selectedPersona.role} • Wilayah Sentra: {selectedPersona.demographics.location}
                      </CardDescription>
                    </div>

                    <div className='text-right'>
                      <div className='text-xs text-muted-foreground'>Sensitivitas Harga</div>
                      <Badge variant='secondary' className='mt-0.5 text-xs font-semibold'>
                        {selectedPersona.price_sensitivity}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className='space-y-4 text-xs sm:text-sm'>
                  {/* Demographics & Crops */}
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-muted/40 rounded-lg'>
                    <div>
                      <span className='text-muted-foreground text-[11px] block'>Rentang Usia & Edukasi:</span>
                      <span className='font-semibold text-foreground'>
                        {selectedPersona.demographics.age_range} ({selectedPersona.demographics.education})
                      </span>
                    </div>
                    <div>
                      <span className='text-muted-foreground text-[11px] block'>Skala Pengelolaan:</span>
                      <span className='font-semibold text-foreground'>
                        {selectedPersona.demographics.land_size}
                      </span>
                    </div>
                    <div>
                      <span className='text-muted-foreground text-[11px] block'>Komoditas Utama:</span>
                      <div className='flex flex-wrap gap-1 mt-0.5'>
                        {selectedPersona.demographics.primary_crops.map((crop) => (
                          <Badge key={crop} variant='outline' className='text-[10px] py-0'>
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 3-Column: Pain Points, Triggers, Objections */}
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='space-y-2 p-3 rounded-lg border bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40'>
                      <span className='font-semibold text-rose-800 dark:text-rose-300 flex items-center gap-1.5 text-xs'>
                        <ShieldAlert className='h-3.5 w-3.5' />
                        Pain Points Utama
                      </span>
                      <ul className='list-disc list-inside space-y-1 text-muted-foreground text-xs'>
                        {selectedPersona.pain_points.map((pt, i) => (
                          <li key={i} className='leading-relaxed'>{pt}</li>
                        ))}
                      </ul>
                    </div>

                    <div className='space-y-2 p-3 rounded-lg border bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'>
                      <span className='font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 text-xs'>
                        <Sparkles className='h-3.5 w-3.5' />
                        Buying Triggers
                      </span>
                      <ul className='list-disc list-inside space-y-1 text-muted-foreground text-xs'>
                        {selectedPersona.buying_triggers.map((bt, i) => (
                          <li key={i} className='leading-relaxed'>{bt}</li>
                        ))}
                      </ul>
                    </div>

                    <div className='space-y-2 p-3 rounded-lg border bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40'>
                      <span className='font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 text-xs'>
                        <Flame className='h-3.5 w-3.5' />
                        Keberatan & Hambatan
                      </span>
                      <ul className='list-disc list-inside space-y-1 text-muted-foreground text-xs'>
                        {selectedPersona.objections.map((obj, i) => (
                          <li key={i} className='leading-relaxed'>{obj}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Winning Angle & Recommended CTA */}
                  <div className='p-4 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2'>
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
                      <div>
                        <span className='text-[11px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block'>
                          Formula Penawaran Juara (Winning Angle)
                        </span>
                        <p className='font-medium text-foreground text-sm mt-0.5'>
                          {selectedPersona.winning_offer_angle}
                        </p>
                      </div>
                      <Badge variant='outline' className='bg-background text-indigo-700 dark:text-indigo-300 border-indigo-300 shrink-0 text-xs'>
                        Recommended CTA: {selectedPersona.recommended_cta}
                      </Badge>
                    </div>

                    <div className='flex items-center gap-2 pt-1 border-t border-indigo-200/60 dark:border-indigo-800/60 text-xs text-muted-foreground'>
                      <span className='font-semibold text-foreground'>Platform Favorit:</span>
                      <span>{selectedPersona.preferred_platforms.join(' • ')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 24-Hour Browsing Heatmap & Demographics Charts */}
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
                {/* 24-Hour Activity Heatmap */}
                <Card className='lg:col-span-8'>
                  <CardHeader className='pb-2'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <CardTitle className='text-base flex items-center gap-2'>
                          <Clock className='h-4 w-4 text-indigo-600' />
                          24-Hour Farmer Browsing Activity Heatmap
                        </CardTitle>
                        <CardDescription className='text-xs'>
                          Indeks keaktifan membuka media sosial & chatting WhatsApp petani Indonesia (0 - 100)
                        </CardDescription>
                      </div>
                      <Badge variant='outline' className='text-[11px] border-emerald-500 text-emerald-600'>
                        3 Golden Prime Windows
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className='h-[240px] w-full min-w-0'>
                      <ResponsiveContainer width='100%' height='100%' minWidth={0}>
                        <BarChart data={hourlyHeatmap} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray='3 3' vertical={false} opacity={0.3} />
                          <XAxis
                            dataKey='hour'
                            tickFormatter={(h) => `${h}:00`}
                            tick={{ fontSize: 10 }}
                            interval={1}
                          />
                          <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload as (typeof hourlyHeatmap)[0]
                                return (
                                  <div className='bg-popover border border-border p-2 rounded shadow-md text-xs space-y-1'>
                                    <div className='font-bold text-foreground'>{data.label}</div>
                                    <div className='text-indigo-600 font-mono'>Skor Aktivitas: {data.activity_score}/100</div>
                                    <div className='text-muted-foreground text-[11px]'>{data.notes}</div>
                                    {data.is_peak && (
                                      <Badge variant='default' className='bg-emerald-600 text-[10px]'>
                                        Golden Prime Time
                                      </Badge>
                                    )}
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          <Bar dataKey='activity_score' radius={[4, 4, 0, 0]}>
                            {hourlyHeatmap.map((entry) => (
                              <Cell
                                key={entry.hour}
                                fill={entry.is_peak ? '#10b981' : entry.activity_score > 60 ? '#6366f1' : '#cbd5e1'}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t text-xs'>
                      <div className='p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded border border-emerald-200 dark:border-emerald-800'>
                        <div className='font-bold text-emerald-800 dark:text-emerald-300'>1. Subuh Browsing (05:00 - 06:30)</div>
                        <div className='text-[11px] text-muted-foreground mt-0.5'>
                          Petani minum kopi pagi sebelum berangkat ke sawah. Ideal untuk awareness & penawaran paket awal.
                        </div>
                      </div>
                      <div className='p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded border border-emerald-200 dark:border-emerald-800'>
                        <div className='font-bold text-emerald-800 dark:text-emerald-300'>2. Istirahat Sawah (11:30 - 13:00)</div>
                        <div className='text-[11px] text-muted-foreground mt-0.5'>
                          Berteduh di gubuk sawah/warung kopi, buka TikTok/FB reels santai. Waktu share video hama.
                        </div>
                      </div>
                      <div className='p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded border border-emerald-200 dark:border-emerald-800'>
                        <div className='font-bold text-emerald-800 dark:text-emerald-300'>3. Lepas Maghrib (19:00 - 21:00)</div>
                        <div className='text-[11px] text-muted-foreground mt-0.5'>
                          Puncak tertinggi (Peak Score 98). Waktu paling responsif untuk klik link WhatsApp & closing COD.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Age & Payment Breakdown */}
                <Card className='lg:col-span-4 space-y-4 p-4'>
                  <div>
                    <h4 className='text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5'>
                      <Users className='h-4 w-4 text-indigo-600' />
                      Distribusi Usia Petani Digital
                    </h4>
                    <div className='space-y-2'>
                      {demographics.age_distribution.map((age) => (
                        <div key={age.range} className='space-y-1'>
                          <div className='flex justify-between text-xs'>
                            <span className='font-medium'>{age.range} thn ({age.label})</span>
                            <span className='font-mono font-bold'>{age.percentage}%</span>
                          </div>
                          <div className='h-2 bg-muted rounded-full overflow-hidden'>
                            <div
                              className='h-full bg-indigo-600 rounded-full'
                              style={{ width: `${age.percentage * 2}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='pt-3 border-t'>
                    <h4 className='text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5'>
                      <CreditCard className='h-4 w-4 text-emerald-600' />
                      Preferensi Metode Pembayaran
                    </h4>
                    <div className='space-y-2 text-xs'>
                      {demographics.payment_channel_preferences.map((p) => (
                        <div key={p.channel} className='p-2 bg-muted/40 rounded border flex items-center justify-between'>
                          <div>
                            <div className='font-medium text-foreground'>{p.channel}</div>
                            <div className='text-[10px] text-muted-foreground'>{p.trust_driver}</div>
                          </div>
                          <Badge variant='secondary' className='font-mono font-bold'>
                            {p.percentage}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* TAB 2: META ADS CREATIVE & COPYWRITING */}
            <TabsContent value='creative' className='space-y-6 pt-4'>
              {/* 5-Step Copywriting Blueprint Visual */}
              <Card>
                <CardHeader className='pb-3'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <CardTitle className='text-base flex items-center gap-2'>
                        <Sparkles className='h-4 w-4 text-indigo-600' />
                        5-Step Agricultural Copywriting Formula
                      </CardTitle>
                      <CardDescription className='text-xs'>
                        Arsitektur copywriting terbukti yang membedakan edukasi teknis agronomi dengan penawaran direct-response.
                      </CardDescription>
                    </div>
                    <Badge variant='outline' className='text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60'>
                      High-Converting Formula
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3'>
                    {blueprints.map((bp) => (
                      <div
                        key={bp.step_number}
                        className='p-3.5 rounded-lg border bg-card hover:bg-muted/30 transition-all space-y-2'
                      >
                        <div className='flex items-center justify-between'>
                          <span className='w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center font-mono'>
                            {bp.step_number}
                          </span>
                          <Badge variant='secondary' className='text-[10px]'>
                            Step {bp.step_number}
                          </Badge>
                        </div>
                        <div className='font-bold text-sm text-foreground'>{bp.step_name}</div>
                        <div className='text-xs text-muted-foreground leading-relaxed'>
                          {bp.objective}
                        </div>
                        <div className='p-2 bg-muted/60 rounded text-[11px] italic text-foreground border-l-2 border-l-indigo-500'>
                          &ldquo;{bp.example_phrase}&rdquo;
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Creative Teardowns Cards */}
              <div className='space-y-3'>
                <h3 className='text-base font-semibold text-foreground flex items-center gap-2'>
                  <Layers className='h-4 w-4 text-indigo-600' />
                  Winning Creative Format Teardowns
                </h3>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                  {creativeTeardowns.map((cr) => (
                    <Card key={cr.id} className='border shadow-sm flex flex-col justify-between'>
                      <CardHeader className='pb-2'>
                        <div className='flex items-center justify-between'>
                          <Badge variant='outline' className='text-[10px] font-semibold text-indigo-600 border-indigo-200'>
                            {cr.format}
                          </Badge>
                          <Badge variant='secondary' className='text-[10px]'>
                            {cr.target_crops.join(', ')}
                          </Badge>
                        </div>
                        <CardTitle className='text-base mt-2'>{cr.concept_title}</CardTitle>
                        <CardDescription className='text-xs'>
                          Objective: {cr.objective}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className='space-y-3 text-xs'>
                        {/* Hook */}
                        <div className='p-2.5 bg-muted/40 rounded border space-y-1'>
                          <span className='font-bold text-foreground text-[11px] block text-indigo-600 dark:text-indigo-400'>
                            1. Hook (Detik 0 - 4):
                          </span>
                          <p className='text-muted-foreground italic leading-relaxed'>
                            &ldquo;{cr.hook_breakdown.audio_opening}&rdquo;
                          </p>
                          <div className='text-[10px] text-muted-foreground'>
                            Visual: {cr.hook_breakdown.visual}
                          </div>
                        </div>

                        {/* Body */}
                        <div className='p-2.5 bg-muted/40 rounded border space-y-1'>
                          <span className='font-bold text-foreground text-[11px] block'>
                            2. Inti Konten (Talking Points):
                          </span>
                          <p className='text-muted-foreground leading-relaxed'>
                            {cr.body_breakdown.talking_points}
                          </p>
                        </div>

                        {/* Offer & CTA */}
                        <div className='p-2.5 bg-indigo-50/50 dark:bg-indigo-950/30 rounded border border-indigo-200 dark:border-indigo-800 space-y-1'>
                          <span className='font-bold text-indigo-700 dark:text-indigo-300 text-[11px] block'>
                            3. Penawaran & Call To Action:
                          </span>
                          <p className='text-foreground font-medium text-[11px]'>
                            {cr.offer_and_cta.offer_text}
                          </p>
                          <p className='text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold'>
                            CTA: {cr.offer_and_cta.cta_text}
                          </p>
                        </div>

                        {/* Benchmarks */}
                        <div className='pt-2 border-t grid grid-cols-3 gap-1 text-center font-mono text-[10px]'>
                          <div>
                            <span className='text-muted-foreground block'>Avg CTR</span>
                            <span className='font-bold text-foreground'>{cr.performance_benchmarks.avg_ctr}</span>
                          </div>
                          <div>
                            <span className='text-muted-foreground block'>CPL WA</span>
                            <span className='font-bold text-emerald-600'>{cr.performance_benchmarks.avg_cpl_idr}</span>
                          </div>
                          <div>
                            <span className='text-muted-foreground block'>WA CVR</span>
                            <span className='font-bold text-foreground'>{cr.performance_benchmarks.conversion_to_wa_rate}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Ready-to-Use Ad Copy Scripts Generator */}
              <Card className='border-indigo-200 dark:border-indigo-900/60 shadow-sm'>
                <CardHeader className='pb-3'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                    <div>
                      <CardTitle className='text-base flex items-center gap-2'>
                        <Copy className='h-4 w-4 text-indigo-600' />
                        Battle-Tested Ad Script Templates
                      </CardTitle>
                      <CardDescription className='text-xs'>
                        Naskah copywriting lengkap yang siap digunakan langsung di Meta Ads Manager atau WhatsApp Blast.
                      </CardDescription>
                    </div>

                    <div className='flex items-center gap-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        className='h-8 text-xs'
                        onClick={() => handleCopyScript(activeScript.script_content)}
                      >
                        {copiedScript ? (
                          <>
                            <Check className='h-3.5 w-3.5 mr-1 text-emerald-600' />
                            Tersalin!
                          </>
                        ) : (
                          <>
                            <Copy className='h-3.5 w-3.5 mr-1' />
                            Salin Naskah Lengkap
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Commodity Selector Buttons */}
                  <div className='flex flex-wrap gap-2 pt-2'>
                    {adScripts.map((script, idx) => (
                      <Button
                        key={script.commodity_id}
                        size='sm'
                        variant={selectedScriptIndex === idx ? 'default' : 'outline'}
                        className='h-8 text-xs'
                        onClick={() => setSelectedScriptIndex(idx)}
                      >
                        {script.crop_name} ({script.pest_target.split('&')[0].trim()})
                      </Button>
                    ))}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between text-xs text-muted-foreground pb-2 border-b'>
                      <span>Platform Rekomendasi: <strong className='text-foreground'>{activeScript.platform}</strong></span>
                      <span>Target Hama/Masalah: <strong className='text-foreground'>{activeScript.pest_target}</strong></span>
                    </div>

                    <pre className='p-4 bg-muted/50 rounded-lg text-xs font-sans whitespace-pre-wrap leading-relaxed text-foreground border overflow-x-auto max-h-[380px] no-scrollbar'>
                      {activeScript.script_content}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 3: GOOGLE ADS HIGH-INTENT */}
            <TabsContent value='keywords' className='space-y-6 pt-4'>
              {/* Header & Controls */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                <div>
                  <h3 className='text-base font-semibold text-foreground flex items-center gap-2'>
                    <SearchIcon className='h-4 w-4 text-indigo-600' />
                    3-Tier Google Ads Search Intent Taxonomy
                  </h3>
                  <p className='text-xs text-muted-foreground'>
                    Kata kunci intent tinggi yang dicari petani saat mendesak mengatasi OPT atau mencari distributor grosir.
                  </p>
                </div>

                <div className='flex items-center gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    className='h-8 text-xs border-rose-200 text-rose-700 dark:border-rose-900 dark:text-rose-400'
                    onClick={handleCopyAllNegatives}
                  >
                    <ShieldAlert className='h-3.5 w-3.5 mr-1.5' />
                    Copy Negative Keywords
                  </Button>
                </div>
              </div>

              {/* Tier Cards Summary */}
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                {keywordTiers.map((tier, idx) => (
                  <Card
                    key={tier.tier}
                    className={`p-3.5 cursor-pointer transition-all border ${
                      keywordFilterTier === `TIER_${idx + 1}`
                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-xs'
                        : 'hover:bg-muted/40'
                    }`}
                    onClick={() =>
                      setKeywordFilterTier(keywordFilterTier === `TIER_${idx + 1}` ? 'ALL' : `TIER_${idx + 1}`)
                    }
                  >
                    <div className='flex items-center justify-between'>
                      <Badge variant='outline' className='text-[10px] font-bold'>
                        Tier {idx + 1}
                      </Badge>
                      <span className='text-[11px] font-mono text-muted-foreground'>
                        {tier.keywords.length} Target Keywords
                      </span>
                    </div>
                    <div className='font-bold text-sm text-foreground mt-2'>{tier.tier.split(':')[1]?.trim() || tier.tier}</div>
                    <div className='text-[11px] text-muted-foreground mt-1 leading-relaxed line-clamp-2'>
                      {tier.intent_description}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Keyword Filter & Table */}
              <Card>
                <CardHeader className='pb-3'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                    <div className='flex items-center gap-2 w-full sm:w-80'>
                      <SearchIcon className='h-4 w-4 text-muted-foreground shrink-0' />
                      <input
                        type='text'
                        placeholder='Cari keyword atau komoditas...'
                        value={keywordSearchQuery}
                        onChange={(e) => setKeywordSearchQuery(e.target.value)}
                        className='w-full text-xs bg-muted/40 border border-input rounded-md px-3 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-primary'
                      />
                    </div>

                    <div className='flex items-center gap-1.5 flex-wrap'>
                      <span className='text-xs text-muted-foreground mr-1'>Filter Tier:</span>
                      {['ALL', 'TIER_1', 'TIER_2', 'TIER_3'].map((tierKey) => (
                        <Button
                          key={tierKey}
                          size='sm'
                          variant={keywordFilterTier === tierKey ? 'default' : 'outline'}
                          className='h-7 text-[11px] px-2.5'
                          onClick={() => setKeywordFilterTier(tierKey)}
                        >
                          {tierKey === 'ALL' ? 'Semua Tier' : tierKey.replace('_', ' ')}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className='p-0'>
                  <div className='w-full overflow-x-auto rounded-md border'>
                    <Table className='min-w-[720px]'>
                      <TableHeader>
                        <TableRow className='text-[11px]'>
                          <TableHead className='w-[280px]'>Search Keyword</TableHead>
                          <TableHead>Komoditas</TableHead>
                          <TableHead>Tier & Intent</TableHead>
                          <TableHead className='text-right'>Search Volume/Bulan</TableHead>
                          <TableHead className='text-right'>Est. CPC (IDR)</TableHead>
                          <TableHead>Kompetisi</TableHead>
                          <TableHead>Match Type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className='text-xs'>
                        {filteredKeywords.map((k, i) => (
                          <TableRow key={i}>
                            <TableCell className='font-medium font-mono text-foreground'>
                              &ldquo;{k.keyword}&rdquo;
                            </TableCell>
                            <TableCell>
                              <Badge variant='outline' className='text-[10px]'>
                                {k.crop}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className='text-[11px] text-muted-foreground'>
                                {k.tier_name.split(':')[0]}
                              </span>
                            </TableCell>
                            <TableCell className='text-right font-mono font-semibold'>
                              {k.monthly_volume.toLocaleString('id-ID')}
                            </TableCell>
                            <TableCell className='text-right font-mono font-semibold text-emerald-600'>
                              Rp {k.avg_cpc_idr.toLocaleString('id-ID')}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant='secondary'
                                className={`text-[10px] ${
                                  k.competition === 'High'
                                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                                    : k.competition === 'Medium'
                                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                }`}
                              >
                                {k.competition}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <code className='text-[10px] bg-muted px-1.5 py-0.5 rounded'>
                                {k.match_type}
                              </code>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Negative Keywords Exclusion Groups */}
              <Card className='border-rose-200 dark:border-rose-900/40 shadow-sm'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <CardTitle className='text-base flex items-center gap-2 text-rose-800 dark:text-rose-400'>
                        <ShieldAlert className='h-4 w-4' />
                        Negative Keywords Exclusion Matrix (Zero Budget Waste)
                      </CardTitle>
                      <CardDescription className='text-xs'>
                        Daftar kata kunci pengecualian wajib untuk mencegah pemborosan budget Google Ads pada pencarian non-komersial.
                      </CardDescription>
                    </div>
                    <Button
                      size='sm'
                      variant='outline'
                      className='h-8 text-xs'
                      onClick={handleCopyAllNegatives}
                    >
                      <Copy className='h-3.5 w-3.5 mr-1' />
                      Salin Semua Kata Kunci Negatif
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
                    {negativeKeywordGroups.map((group) => (
                      <div key={group.category} className='p-3 bg-muted/40 rounded-lg border space-y-2'>
                        <div className='font-bold text-xs text-foreground flex items-center gap-1.5'>
                          <span className='w-2 h-2 rounded-full bg-rose-500' />
                          {group.category}
                        </div>
                        <div className='flex flex-wrap gap-1'>
                          {group.list.map((kw) => (
                            <span
                              key={kw}
                              className='text-[11px] font-mono bg-background border px-1.5 py-0.5 rounded text-muted-foreground'
                            >
                              -{kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 4: COMPETITOR SPY MATRIX */}
            <TabsContent value='competitors' className='space-y-6 pt-4'>
              {/* Header & Category Filter */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                <div>
                  <h3 className='text-base font-semibold text-foreground flex items-center gap-2'>
                    <Target className='h-4 w-4 text-indigo-600' />
                    Competitor Ad Library & Tactical Spy Matrix
                  </h3>
                  <p className='text-xs text-muted-foreground'>
                    Pembedahan naskah, active ads count, hero products, dan celah kelemahan 8 pemain agrokimia utama.
                  </p>
                </div>

                <div className='flex items-center gap-1.5'>
                  {['ALL', 'TIER_1', 'TIER_2'].map((cat) => (
                    <Button
                      key={cat}
                      size='sm'
                      variant={competitorFilterCategory === cat ? 'default' : 'outline'}
                      className='h-7 text-xs'
                      onClick={() => setCompetitorFilterCategory(cat)}
                    >
                      {cat === 'ALL' ? 'Semua Brand' : cat === 'TIER_1' ? 'Tier 1 Multinasional' : 'Tier 2 National Major'}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Brand Selector Cards Grid */}
              <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2'>
                {filteredCompetitors.map((comp) => {
                  const isSelected = comp.id === selectedCompetitorId
                  return (
                    <button
                      key={comp.id}
                      type='button'
                      onClick={() => setSelectedCompetitorId(comp.id)}
                      className={`p-2.5 rounded-lg border text-center transition-all ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-500'
                          : 'bg-card hover:bg-muted/40 border-border'
                      }`}
                    >
                      <div className='font-bold text-xs text-foreground truncate'>
                        {comp.brand_name.split(' ')[0]}
                      </div>
                      <div className='text-[10px] text-muted-foreground font-mono mt-0.5'>
                        ~{comp.active_ad_count_estimate} Ads
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Selected Competitor Deep Dive */}
              <Card className='border-indigo-200 dark:border-indigo-900/50 shadow-sm'>
                <CardHeader className='pb-3'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                    <div>
                      <div className='flex items-center gap-2'>
                        <Badge variant='outline' className='text-xs font-semibold'>
                          {selectedCompetitor.market_share_category}
                        </Badge>
                        <span className='text-xs text-muted-foreground font-mono'>
                          Asal: {selectedCompetitor.origin}
                        </span>
                      </div>
                      <CardTitle className='text-xl mt-1'>{selectedCompetitor.brand_name}</CardTitle>
                      <CardDescription className='text-xs'>
                        Target Crops: {selectedCompetitor.target_crops.join(', ')}
                      </CardDescription>
                    </div>

                    <div className='flex items-center gap-3'>
                      <div className='text-right'>
                        <span className='text-xs text-muted-foreground block'>Est. Active Ads</span>
                        <span className='text-lg font-bold font-mono text-indigo-600'>
                          ~{selectedCompetitor.active_ad_count_estimate} Iklan Aktif
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-wrap gap-1.5 pt-2'>
                    <span className='text-xs text-muted-foreground mr-1'>Saluran Iklan Utama:</span>
                    {selectedCompetitor.primary_channels.map((ch) => (
                      <Badge key={ch} variant='secondary' className='text-[10px]'>
                        {ch}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className='space-y-4 text-xs sm:text-sm'>
                  {/* Hero Products Table */}
                  <div className='space-y-2'>
                    <span className='font-bold text-xs text-foreground flex items-center gap-1.5'>
                      <Award className='h-3.5 w-3.5 text-indigo-600' />
                      Hero Products & Bahan Aktif Utama
                    </span>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2'>
                      {selectedCompetitor.top_hero_products.map((p) => (
                        <div key={p.name} className='p-2.5 bg-muted/40 rounded border space-y-1 text-xs'>
                          <div className='font-bold text-foreground'>{p.name}</div>
                          <div className='text-[11px] font-mono text-indigo-600 dark:text-indigo-400'>
                            {p.active_ingredient}
                          </div>
                          <div className='text-[10px] text-muted-foreground'>Target: {p.target}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Creative Strategy & Angles */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='p-3 bg-muted/30 rounded-lg border space-y-2'>
                      <span className='font-bold text-xs text-foreground flex items-center gap-1.5'>
                        <Megaphone className='h-3.5 w-3.5 text-indigo-600' />
                        Dominant Creative Formats
                      </span>
                      <ul className='list-disc list-inside space-y-1 text-xs text-muted-foreground'>
                        {selectedCompetitor.dominant_creative_formats.map((fmt, i) => (
                          <li key={i} className='leading-relaxed'>{fmt}</li>
                        ))}
                      </ul>
                    </div>

                    <div className='p-3 bg-muted/30 rounded-lg border space-y-2'>
                      <span className='font-bold text-xs text-foreground flex items-center gap-1.5'>
                        <Sparkles className='h-3.5 w-3.5 text-indigo-600' />
                        Key Angles & Psychological Hooks
                      </span>
                      <ul className='list-disc list-inside space-y-1 text-xs text-muted-foreground'>
                        {selectedCompetitor.key_angles_and_hooks.map((ang, i) => (
                          <li key={i} className='leading-relaxed'>&ldquo;{ang}&rdquo;</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Strengths vs Vulnerabilities (Opportunity Matrix) */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='p-3.5 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-lg space-y-1.5'>
                      <span className='font-bold text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5'>
                        <Check className='h-3.5 w-3.5' />
                        Kekuatan Utama Kompetitor
                      </span>
                      <p className='text-xs text-muted-foreground leading-relaxed'>
                        {selectedCompetitor.strengths}
                      </p>
                    </div>

                    <div className='p-3.5 bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-lg space-y-1.5'>
                      <span className='font-bold text-xs text-rose-800 dark:text-rose-300 flex items-center gap-1.5'>
                        <ShieldAlert className='h-3.5 w-3.5' />
                        Celah Kelemahan (Peluang Rebut Pasar)
                      </span>
                      <p className='text-xs text-muted-foreground leading-relaxed'>
                        {selectedCompetitor.vulnerabilities}
                      </p>
                    </div>
                  </div>

                  <div className='p-2.5 bg-muted/50 rounded border text-xs flex items-center justify-between text-muted-foreground'>
                    <span>Destinasi CTA Tipikal: <strong className='text-foreground'>{selectedCompetitor.typical_cta_destination}</strong></span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 5: CAMPAIGN BUDGET & ROAS SIMULATOR */}
            <TabsContent value='simulator' className='space-y-6 pt-4'>
              {/* Header & Sector Presets */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                <div>
                  <h3 className='text-base font-semibold text-foreground flex items-center gap-2'>
                    <Calculator className='h-4 w-4 text-indigo-600' />
                    Campaign Budget, CPL & RoAS Financial Simulator
                  </h3>
                  <p className='text-xs text-muted-foreground'>
                    Simulasi pendapatan kotor, profit bersih, dan return on ad spend (RoAS) berbasis funnel realitas petani Indonesia.
                  </p>
                </div>

                <div className='flex items-center gap-1.5 flex-wrap'>
                  <span className='text-xs text-muted-foreground mr-1'>Preset Sektor:</span>
                  {[
                    { key: 'hortikultura_intensif', label: 'Hortikultura' },
                    { key: 'tanaman_pangan', label: 'Tanaman Pangan' },
                    { key: 'perkebunan_sawit', label: 'Perkebunan Sawit' },
                    { key: 'florikultura_urban', label: 'Florikultura' },
                  ].map((p) => (
                    <Button
                      key={p.key}
                      size='sm'
                      variant={activePreset === p.key ? 'default' : 'outline'}
                      className='h-7 text-xs px-2.5'
                      onClick={() => handleApplyPreset(p.key)}
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Grid: Inputs (Left 5 cols) & Real-time Outputs (Right 7 cols) */}
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
                {/* Simulator Inputs Drawer */}
                <Card className='lg:col-span-5'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-sm font-bold flex items-center gap-1.5'>
                      <Flame className='h-4 w-4 text-indigo-600' />
                      Parameter Investasi Ads
                    </CardTitle>
                    <CardDescription className='text-xs'>
                      Sesuaikan angka sesuai target anggaran dan benchmark industri Anda.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className='space-y-4 text-xs'>
                    {/* 1. Monthly Ad Spend */}
                    <div className='space-y-1.5'>
                      <div className='flex justify-between font-semibold'>
                        <span>Monthly Ad Spend (Budget Iklan):</span>
                        <span className='font-mono text-indigo-600 font-bold'>
                          Rp {monthlyAdSpend.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <input
                        type='range'
                        min='3000000'
                        max='100000000'
                        step='1000000'
                        value={monthlyAdSpend}
                        onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
                        className='w-full accent-indigo-600 cursor-pointer h-11 sm:h-7 py-2 touch-none'
                      />
                      <div className='flex justify-between text-[10px] text-muted-foreground'>
                        <span>Rp 3 Juta (Testing)</span>
                        <span>Rp 100 Juta (Scale)</span>
                      </div>
                    </div>

                    {/* 2. CPM */}
                    <div className='space-y-1.5'>
                      <div className='flex justify-between font-semibold'>
                        <span>Cost Per Mille (CPM):</span>
                        <span className='font-mono text-foreground font-bold'>
                          Rp {simCpm.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <input
                        type='range'
                        min='10000'
                        max='60000'
                        step='1000'
                        value={simCpm}
                        onChange={(e) => setSimCpm(Number(e.target.value))}
                        className='w-full accent-indigo-600 cursor-pointer h-11 sm:h-7 py-2 touch-none'
                      />
                      <div className='flex justify-between text-[10px] text-muted-foreground'>
                        <span>Rp 10.000 (Murah)</span>
                        <span>Rp 60.000 (Jenuh)</span>
                      </div>
                    </div>

                    {/* 3. CTR */}
                    <div className='space-y-1.5'>
                      <div className='flex justify-between font-semibold'>
                        <span>Click-Through Rate (CTR %):</span>
                        <span className='font-mono text-foreground font-bold'>{simCtr.toFixed(1)}%</span>
                      </div>
                      <input
                        type='range'
                        min='0.8'
                        max='6.0'
                        step='0.1'
                        value={simCtr}
                        onChange={(e) => setSimCtr(Number(e.target.value))}
                        className='w-full accent-indigo-600 cursor-pointer h-11 sm:h-7 py-2 touch-none'
                      />
                      <div className='flex justify-between text-[10px] text-muted-foreground'>
                        <span>0.8% (Rendah)</span>
                        <span>6.0% (Viral UGC)</span>
                      </div>
                    </div>

                    {/* 4. WhatsApp Conversion Rate */}
                    <div className='space-y-1.5'>
                      <div className='flex justify-between font-semibold'>
                        <span>Landing / WA Lead CVR:</span>
                        <span className='font-mono text-foreground font-bold'>{simWaCvr.toFixed(1)}%</span>
                      </div>
                      <input
                        type='range'
                        min='3.0'
                        max='25.0'
                        step='0.5'
                        value={simWaCvr}
                        onChange={(e) => setSimWaCvr(Number(e.target.value))}
                        className='w-full accent-indigo-600 cursor-pointer h-11 sm:h-7 py-2 touch-none'
                      />
                      <div className='flex justify-between text-[10px] text-muted-foreground'>
                        <span>3% (Web Biasa)</span>
                        <span>25% (Direct WA Form)</span>
                      </div>
                    </div>

                    {/* 5. Closing Rate */}
                    <div className='space-y-1.5'>
                      <div className='flex justify-between font-semibold'>
                        <span>WA to Order Closing Rate:</span>
                        <span className='font-mono text-foreground font-bold'>{simClosingRate.toFixed(1)}%</span>
                      </div>
                      <input
                        type='range'
                        min='5.0'
                        max='40.0'
                        step='1.0'
                        value={simClosingRate}
                        onChange={(e) => setSimClosingRate(Number(e.target.value))}
                        className='w-full accent-indigo-600 cursor-pointer h-11 sm:h-7 py-2 touch-none'
                      />
                      <div className='flex justify-between text-[10px] text-muted-foreground'>
                        <span>5% (CS Pasif)</span>
                        <span>40% (CS Agronomis Telpon)</span>
                      </div>
                    </div>

                    {/* 6. AOV & COGS */}
                    <div className='grid grid-cols-2 gap-3 pt-2 border-t'>
                      <div className='space-y-1'>
                        <label className='text-[11px] font-semibold text-muted-foreground block'>
                          Average Order Value (AOV):
                        </label>
                        <input
                          type='number'
                          value={simAov}
                          onChange={(e) => setSimAov(Math.max(10000, Number(e.target.value)))}
                          className='w-full text-xs bg-muted/40 border rounded px-2 py-1.5 font-mono'
                        />
                      </div>
                      <div className='space-y-1'>
                        <label className='text-[11px] font-semibold text-muted-foreground block'>
                          HPP / COGS (%):
                        </label>
                        <input
                          type='number'
                          value={simCogsPct}
                          onChange={(e) => setSimCogsPct(Math.min(90, Math.max(5, Number(e.target.value))))}
                          className='w-full text-xs bg-muted/40 border rounded px-2 py-1.5 font-mono'
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Simulator Projected Outputs */}
                <div className='lg:col-span-7 space-y-4'>
                  {/* Top 4 Big Metric Cards */}
                  <div className='grid grid-cols-2 gap-3'>
                    <Card className='p-4 bg-linear-to-br from-indigo-50 to-white dark:from-indigo-950/40 dark:to-card border-indigo-200 dark:border-indigo-800'>
                      <span className='text-xs text-muted-foreground font-medium block'>Projected Gross Revenue</span>
                      <div className='text-xl sm:text-2xl font-bold font-mono text-indigo-700 dark:text-indigo-300 mt-1'>
                        Rp {simResult.gross_revenue_idr.toLocaleString('id-ID')}
                      </div>
                      <span className='text-[11px] text-muted-foreground mt-1 block'>
                        Dari {simResult.paying_customers} Pembeli Produk
                      </span>
                    </Card>

                    <Card className='p-4 bg-linear-to-br from-emerald-50 to-white dark:from-emerald-950/40 dark:to-card border-emerald-200 dark:border-emerald-800'>
                      <span className='text-xs text-muted-foreground font-medium block'>Net Profit Bersih</span>
                      <div className={`text-xl sm:text-2xl font-bold font-mono mt-1 ${simResult.net_profit_after_ad_spend_idr >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        Rp {simResult.net_profit_after_ad_spend_idr.toLocaleString('id-ID')}
                      </div>
                      <span className='text-[11px] text-muted-foreground mt-1 block'>
                        Setelah COGS & Biaya Iklan
                      </span>
                    </Card>

                    <Card className='p-4 border'>
                      <div className='flex items-center justify-between text-xs text-muted-foreground'>
                        <span>Target RoAS Multiplier</span>
                        <TrendingUp className='h-4 w-4 text-indigo-600' />
                      </div>
                      <div className='text-xl sm:text-2xl font-bold font-mono text-foreground mt-1'>
                        {simResult.roas}x
                      </div>
                      <span className='text-[11px] text-muted-foreground mt-1 block'>
                        Net ROI: <strong className={simResult.roi_percentage >= 0 ? 'text-emerald-600' : 'text-rose-600'}>{simResult.roi_percentage}%</strong>
                      </span>
                    </Card>

                    <Card className='p-4 border'>
                      <div className='flex items-center justify-between text-xs text-muted-foreground'>
                        <span>Cost Per Lead (CPL WA)</span>
                        <CreditCard className='h-4 w-4 text-emerald-600' />
                      </div>
                      <div className='text-xl sm:text-2xl font-bold font-mono text-foreground mt-1'>
                        Rp {simResult.cost_per_lead_idr.toLocaleString('id-ID')}
                      </div>
                      <span className='text-[11px] text-muted-foreground mt-1 block'>
                        CAC: Rp {simResult.customer_acquisition_cost_idr.toLocaleString('id-ID')}
                      </span>
                    </Card>
                  </div>

                  {/* Funnel Pipeline Breakdown Table */}
                  <Card>
                    <CardHeader className='pb-2'>
                      <CardTitle className='text-sm font-bold flex items-center gap-1.5'>
                        <Layers className='h-4 w-4 text-indigo-600' />
                        Conversion Funnel Decomposition
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='p-0'>
                      <div className='overflow-x-auto'>
                        <Table>
                          <TableHeader>
                            <TableRow className='text-[11px]'>
                              <TableHead>Funnel Stage</TableHead>
                              <TableHead className='text-right'>Volume</TableHead>
                              <TableHead className='text-right'>Unit Economics</TableHead>
                              <TableHead className='text-right'>Efficiency Verdict</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className='text-xs'>
                            <TableRow>
                              <TableCell className='font-medium'>1. Impressions (Tayangan)</TableCell>
                              <TableCell className='text-right font-mono'>
                                {simResult.impressions.toLocaleString('id-ID')}
                              </TableCell>
                              <TableCell className='text-right font-mono text-muted-foreground'>
                                CPM Rp {simCpm.toLocaleString('id-ID')}
                              </TableCell>
                              <TableCell className='text-right'>
                                <Badge variant='outline' className='text-[10px]'>Top of Funnel</Badge>
                              </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell className='font-medium'>2. Link Clicks (Kunjungan)</TableCell>
                              <TableCell className='text-right font-mono'>
                                {simResult.link_clicks.toLocaleString('id-ID')}
                              </TableCell>
                              <TableCell className='text-right font-mono text-muted-foreground'>
                                CPC Rp {simResult.cost_per_click_idr.toLocaleString('id-ID')}
                              </TableCell>
                              <TableCell className='text-right'>
                                <Badge variant='secondary' className='text-[10px]'>CTR {simCtr}%</Badge>
                              </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell className='font-medium'>3. WhatsApp Leads (Chat Masuk)</TableCell>
                              <TableCell className='text-right font-mono font-bold text-indigo-600'>
                                {simResult.wa_leads.toLocaleString('id-ID')}
                              </TableCell>
                              <TableCell className='text-right font-mono font-semibold text-emerald-600'>
                                CPL Rp {simResult.cost_per_lead_idr.toLocaleString('id-ID')}
                              </TableCell>
                              <TableCell className='text-right'>
                                <Badge variant='outline' className='text-[10px] border-emerald-500 text-emerald-600'>
                                  CVR {simWaCvr}%
                                </Badge>
                              </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell className='font-medium'>4. Paying Customers (Order Closing)</TableCell>
                              <TableCell className='text-right font-mono font-bold text-foreground'>
                                {simResult.paying_customers.toLocaleString('id-ID')}
                              </TableCell>
                              <TableCell className='text-right font-mono text-muted-foreground'>
                                CAC Rp {simResult.customer_acquisition_cost_idr.toLocaleString('id-ID')}
                              </TableCell>
                              <TableCell className='text-right'>
                                <Badge variant='default' className='text-[10px] bg-indigo-600'>
                                  Close {simClosingRate}%
                                </Badge>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Strategic Growth Verdict Banner */}
                  <div
                    className={`p-4 rounded-lg border text-xs leading-relaxed space-y-1 ${
                      simResult.roas >= 3.5
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                        : simResult.roas >= 2.0
                        ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                        : 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    <div className='font-bold flex items-center gap-1.5 text-sm'>
                      <Sparkles className='h-4 w-4' />
                      {simResult.roas >= 3.5
                        ? 'Campaign Scale-Ready (RoAS Sangat Sehat)'
                        : simResult.roas >= 2.0
                        ? 'Campaign Moderate (Perlu Optimasi CS & CVR)'
                        : 'Campaign High Risk (Biaya Iklan Terlalu Berat)'}
                    </div>
                    <p>
                      {simResult.roas >= 3.5
                        ? `Setiap Rp 1 modal iklan menghasilkan Rp ${simResult.roas.toFixed(2)} omzet kotor dengan margin profit bersih Rp ${simResult.net_profit_after_ad_spend_idr.toLocaleString('id-ID')}. Anda berada di zona aman untuk scaling budget hingga 2-3x lipat.`
                        : simResult.roas >= 2.0
                        ? `RoAS ${simResult.roas.toFixed(2)}x sudah menutup biaya, namun profit bersih relatif tipis. Tingkatkan closing rate CS WhatsApp ke minimal 22% atau naikkan AOV dengan penawaran bundling 2 botol.`
                        : `RoAS ${simResult.roas.toFixed(2)}x di bawah batas aman. Segera ganti creative video dengan hook masalah lokal yang lebih tajam untuk menurunkan CPL, dan pastikan CS merespons chat di bawah 3 menit.`}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Main>
    </>
  )
}
