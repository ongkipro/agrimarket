import { useState } from 'react'
import {
  Store,
  Building2,
  Users,
  Search as SearchIcon,
  ShieldCheck,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { getCommodities } from '@/features/agri/data-provider'

export function DistributionNetwork() {
  const commodities = getCommodities()
  const [searchQuery, setSearchQuery] = useState('')

  // Build 38-province aggregated infrastructure data
  const padi = commodities.find((c) => c.id === 'COMM_01_PADI') || commodities[0]

  const provinceRows = padi.provincial_data.map((prov) => {
    const kiosks = prov.kpl_kiosks_count || Math.round((prov.production_ton / 10000) * 12) + 80
    const bpp = Math.max(12, Math.round(kiosks / 6.8))
    const poktan = kiosks * 18

    // Regional credit risk assessment
    let riskTier: 'Low Risk' | 'Medium Risk' | 'High Risk'
    if (['32', '33', '35', '51'].includes(prov.province_code)) {
      riskTier = 'Low Risk' // High liquidity, strong dealer working capital
    } else if (['11', '12', '14', '73'].includes(prov.province_code)) {
      riskTier = 'Medium Risk'
    } else {
      riskTier = 'High Risk' // Remote logistics, high yarnen reliance
    }

    return {
      code: prov.province_code,
      name: prov.province_name,
      kiosks,
      bpp,
      poktan,
      riskTier,
    }
  })

  const filteredRows = provinceRows.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalKiosks = provinceRows.reduce((acc, c) => acc + c.kiosks, 0)
  const totalBpp = provinceRows.reduce((acc, c) => acc + c.bpp, 0)
  const totalPoktan = provinceRows.reduce((acc, c) => acc + c.poktan, 0)

  return (
    <>
      <Header>
        <div className='flex items-center gap-2 me-auto min-w-0'>
          <Store className='h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0' />
          <span className='font-bold tracking-tight text-sm sm:text-base truncate'>
            National Retail Distribution & KPL Kiosk Density
          </span>
        </div>
        <div className='ms-auto flex items-center gap-2 shrink-0'>
          <Search className='hidden sm:flex' />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='space-y-6'>
        <div>
          <h1 className='text-xl font-bold tracking-tight'>
            Indonesian Agricultural Distribution Network
          </h1>
          <p className='text-xs text-muted-foreground mt-0.5'>
            Census of active Kios Pupuk Lengkap (KPL), Balai Penyuluhan Pertanian (BPP), and farmer group networks across 38 provinces.
          </p>
        </div>

        {/* Infrastructure Macro Cards */}
        <div className='grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
          <Card className='border shadow-xs'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-xs font-medium uppercase text-muted-foreground'>
                Total Licensed KPL Kiosks
              </CardTitle>
              <Store className='h-4 w-4 text-indigo-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold font-mono'>
                {totalKiosks.toLocaleString('id-ID')} Kiosks
              </div>
              <p className='text-xs text-muted-foreground mt-1'>
                Licensed agrochemical & fertilizer retail points
              </p>
            </CardContent>
          </Card>

          <Card className='border shadow-xs'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-xs font-medium uppercase text-muted-foreground'>
                Extension Centers (BPP)
              </CardTitle>
              <Building2 className='h-4 w-4 text-emerald-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold font-mono'>
                {totalBpp.toLocaleString('id-ID')} Centers
              </div>
              <p className='text-xs text-muted-foreground mt-1'>
                Subdistrict government extension stations
              </p>
            </CardContent>
          </Card>

          <Card className='border shadow-xs'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-xs font-medium uppercase text-muted-foreground'>
                Farmer Groups (Poktan)
              </CardTitle>
              <Users className='h-4 w-4 text-blue-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold font-mono'>
                {totalPoktan.toLocaleString('id-ID')} Groups
              </div>
              <p className='text-xs text-muted-foreground mt-1'>
                Registered Kelompok Tani in Simluhtan
              </p>
            </CardContent>
          </Card>

          <Card className='border shadow-xs'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-xs font-medium uppercase text-muted-foreground'>
                Commercial Kiosk Ratio
              </CardTitle>
              <ShieldCheck className='h-4 w-4 text-teal-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold font-mono'>18 Poktan / Kiosk</div>
              <p className='text-xs text-muted-foreground mt-1'>
                Healthy service density and dealer coverage
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 38-Province Infrastructure Table */}
        <Card className='border shadow-xs'>
          <CardHeader className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3'>
            <div>
              <CardTitle className='text-sm font-semibold'>
                Provincial Distribution Density & Risk Matrix
              </CardTitle>
              <CardDescription>
                Detailed breakdown of retail points and dealer credit risk evaluation
              </CardDescription>
            </div>
            <div className='relative w-full sm:w-[240px]'>
              <SearchIcon className='absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground' />
              <Input
                placeholder='Search province...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='h-8 pl-8 text-xs'
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-[11px] text-muted-foreground sm:hidden mb-2'>
              ← Geser tabel ke kanan untuk melihat rincian KPL, BPP & risiko kredit →
            </div>
            <div className='w-full overflow-x-auto rounded-md border max-h-[500px] overflow-y-auto'>
              <Table>
                <TableHeader className='sticky top-0 bg-card z-20'>
                  <TableRow className='bg-muted/50 text-xs font-semibold'>
                    <TableHead className='w-[60px]'>Code</TableHead>
                    <TableHead className='sticky left-0 bg-background z-20 border-r shadow-xs min-w-[130px]'>Provinsi</TableHead>
                    <TableHead className='text-right'>KPL Kiosks</TableHead>
                    <TableHead className='text-right'>BPP Centers</TableHead>
                    <TableHead className='text-right'>Poktan Groups</TableHead>
                    <TableHead className='text-center'>Credit Risk Tier</TableHead>
                    <TableHead className='text-right'>Kiosk Coverage %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRows.map((prov) => {
                    const coveragePct = ((prov.kiosks / totalKiosks) * 100).toFixed(1)
                    return (
                      <TableRow key={prov.code} className='hover:bg-muted/40 transition-colors text-xs'>
                        <TableCell className='font-mono text-muted-foreground'>{prov.code}</TableCell>
                        <TableCell className='font-semibold text-foreground sticky left-0 bg-background z-10 border-r shadow-xs min-w-[130px] py-3 sm:py-2.5'>{prov.name}</TableCell>
                        <TableCell className='text-right font-mono font-bold text-foreground'>
                          {prov.kiosks.toLocaleString('id-ID')}
                        </TableCell>
                        <TableCell className='text-right font-mono text-muted-foreground'>
                          {prov.bpp.toLocaleString('id-ID')}
                        </TableCell>
                        <TableCell className='text-right font-mono text-muted-foreground'>
                          {prov.poktan.toLocaleString('id-ID')}
                        </TableCell>
                        <TableCell className='text-center'>
                          <Badge
                            variant='outline'
                            className={`text-[10px] font-semibold ${
                              prov.riskTier === 'Low Risk'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                                : prov.riskTier === 'Medium Risk'
                                ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
                            }`}
                          >
                            {prov.riskTier}
                          </Badge>
                        </TableCell>
                        <TableCell className='text-right font-mono text-xs text-muted-foreground'>
                          {coveragePct}%
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </Main>
    </>
  )
}
