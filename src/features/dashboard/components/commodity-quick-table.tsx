import { Link } from '@tanstack/react-router'
import { ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getCommodities, formatHa, formatTon, formatPct, formatIDR } from '@/features/agri/data-provider'

export function CommodityQuickTable() {
  const commodities = getCommodities()

  const sectorBadgeColor: Record<string, string> = {
    'Tanaman Pangan': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200',
    'Hortikultura Sayuran': 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200',
    'Hortikultura Buah': 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200',
    'Perkebunan': 'bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200',
    'Florikultura': 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200',
  }

  return (
    <Card className='border shadow-xs'>
      <CardHeader className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
        <div>
          <CardTitle className='text-base font-semibold'>
            13 Strategic Commodities Intelligence Matrix
          </CardTitle>
          <CardDescription>
            TAM harvest footprint, farm-gate output, qualified SAM conversion rate, and input market valuation (BPS 2024 verified)
          </CardDescription>
        </div>
        <Button variant='outline' size='sm' className='self-start sm:self-auto min-h-[36px] sm:min-h-0' asChild>
          <Link to='/commodities'>
            Explore All 13 Crops
            <ChevronRight className='ml-1 h-4 w-4' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className='text-[11px] text-muted-foreground sm:hidden mb-2'>
          ← Geser tabel ke kanan untuk melihat rincian SAM & Audit →
        </div>
        <div className='w-full overflow-x-auto rounded-md border'>
          <Table className='min-w-[850px]'>
            <TableHeader>
              <TableRow className='bg-muted/50 text-xs font-semibold'>
                <TableHead className='w-[180px] min-w-[160px] sticky left-0 bg-background z-20 border-r shadow-xs'>Commodity</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead className='text-right'>TAM Area (Ha)</TableHead>
                <TableHead className='text-right'>TAM Volume (Ton)</TableHead>
                <TableHead className='text-right'>Farm-Gate Value</TableHead>
                <TableHead className='text-right'>SAM Area (Ha)</TableHead>
                <TableHead className='text-right'>SAM %</TableHead>
                <TableHead className='text-right'>Input Spend / Ha</TableHead>
                <TableHead className='text-right'>Input Market</TableHead>
                <TableHead className='text-center'>Audit</TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commodities.map((crop) => {
                return (
                  <TableRow key={crop.id} className='hover:bg-muted/40 transition-colors'>
                    <TableCell className='font-medium sticky left-0 bg-background z-10 border-r shadow-xs py-3 sm:py-2.5'>
                      <Link to='/commodities' search={{ crop: crop.id }} className='hover:underline block'>
                        <div className='font-semibold text-foreground'>{crop.name}</div>
                        <div className='text-[11px] text-muted-foreground italic'>
                          {crop.scientific_name}
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={`text-[11px] font-normal border ${sectorBadgeColor[crop.sector] || ''}`}
                      >
                        {crop.sector}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right font-mono text-xs'>
                      {formatHa(crop.tam.harvest_area_ha)}
                    </TableCell>
                    <TableCell className='text-right font-mono text-xs'>
                      {formatTon(crop.tam.production_ton)}
                    </TableCell>
                    <TableCell className='text-right font-semibold text-xs text-blue-600 dark:text-blue-400'>
                      Rp {crop.tam.gross_output_value_trillion_idr.toLocaleString('id-ID', { minimumFractionDigits: 2 })} T
                    </TableCell>
                    <TableCell className='text-right font-mono text-xs'>
                      {formatHa(crop.sam.eligible_area_ha)}
                    </TableCell>
                    <TableCell className='text-right font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400'>
                      {formatPct(crop.sam.conversion_rate_pct)}
                    </TableCell>
                    <TableCell className='text-right font-mono text-xs text-muted-foreground'>
                      {formatIDR(crop.sam.input_spending_per_ha_idr, 'compact')}/Ha
                    </TableCell>
                    <TableCell className='text-right font-semibold text-xs text-indigo-600 dark:text-indigo-400'>
                      Rp {crop.sam.total_input_market_value_trillion_idr.toLocaleString('id-ID', { minimumFractionDigits: 2 })} T
                    </TableCell>
                    <TableCell className='text-center'>
                      <span className='inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400'>
                        <CheckCircle2 className='h-3.5 w-3.5' />
                        Pass
                      </span>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button variant='ghost' size='sm' className='h-7 w-7 p-0' asChild>
                        <Link to='/commodities' search={{ crop: crop.id }} title={`Buka analisis mendalam ${crop.name}`}>
                          <ArrowUpRight className='h-4 w-4' />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
