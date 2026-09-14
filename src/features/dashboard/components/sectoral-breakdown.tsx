import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  Pie,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getCommodities } from '@/features/agri/data-provider'

export function SectoralBreakdown() {
  const commodities = getCommodities()

  // Aggregate by sector
  const sectorMap: Record<
    string,
    {
      sector: string
      totalTamHa: number
      totalSamHa: number
      totalGrossValueTrillion: number
      totalInputMarketTrillion: number
      commoditiesCount: number
    }
  > = {}

  commodities.forEach((c) => {
    if (!sectorMap[c.sector]) {
      sectorMap[c.sector] = {
        sector: c.sector,
        totalTamHa: 0,
        totalSamHa: 0,
        totalGrossValueTrillion: 0,
        totalInputMarketTrillion: 0,
        commoditiesCount: 0,
      }
    }
    sectorMap[c.sector].totalTamHa += c.tam.harvest_area_ha
    sectorMap[c.sector].totalSamHa += c.sam.eligible_area_ha
    sectorMap[c.sector].totalGrossValueTrillion += c.tam.gross_output_value_trillion_idr
    sectorMap[c.sector].totalInputMarketTrillion += c.sam.total_input_market_value_trillion_idr
    sectorMap[c.sector].commoditiesCount += 1
  })

  const sectorData = Object.values(sectorMap).map((s) => ({
    name: s.sector.replace('Hortikultura ', 'Horti. '),
    fullName: s.sector,
    tamMha: Number((s.totalTamHa / 1_000_000).toFixed(2)),
    samMha: Number((s.totalSamHa / 1_000_000).toFixed(2)),
    grossValueTrillion: Number(s.totalGrossValueTrillion.toFixed(1)),
    inputMarketTrillion: Number(s.totalInputMarketTrillion.toFixed(1)),
    crops: s.commoditiesCount,
  }))

  const pieColors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899']

  const pieData = sectorData.map((s, idx) => ({
    name: s.name,
    value: s.inputMarketTrillion,
    color: pieColors[idx % pieColors.length],
  }))

  return (
    <div className='grid gap-4 lg:grid-cols-3'>
      <Card className='lg:col-span-2 border shadow-xs'>
        <CardHeader>
          <CardTitle className='text-base font-semibold'>
            Agronomic Footprint by Sector (TAM vs SAM)
          </CardTitle>
          <CardDescription>
            Comparison of total harvest area (TAM) and qualified addressable area (SAM) in Million Hectares
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='h-[320px] w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={sectorData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                <XAxis
                  dataKey='name'
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val}M Ha`}
                />
                <Tooltip
                  formatter={(val: unknown, name: unknown) => [
                    `${String(val)} Million Ha`,
                    name === 'tamMha' ? 'Total TAM' : 'Qualified SAM',
                  ]}
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                    borderRadius: '8px',
                    color: 'var(--foreground)',
                  }}
                />
                <Legend
                  formatter={(value) => (value === 'tamMha' ? 'Total TAM (M Ha)' : 'Qualified SAM (M Ha)')}
                />
                <Bar dataKey='tamMha' fill='#10b981' radius={[4, 4, 0, 0]} />
                <Bar dataKey='samMha' fill='#3b82f6' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className='border shadow-xs'>
        <CardHeader>
          <CardTitle className='text-base font-semibold'>Input Market Share</CardTitle>
          <CardDescription>
            Annual addressable fertilizer & pesticide potential (Trillion IDR)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='h-[240px] w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={pieData}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey='value'
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: unknown) => [`Rp ${String(val)} Triliun`, 'Input Market']}
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className='mt-2 space-y-1.5'>
            {pieData.map((entry) => (
              <div key={entry.name} className='flex items-center justify-between text-xs'>
                <div className='flex items-center gap-2'>
                  <span className='h-2.5 w-2.5 rounded-full' style={{ backgroundColor: entry.color }} />
                  <span className='text-muted-foreground'>{entry.name}</span>
                </div>
                <span className='font-semibold'>Rp {entry.value} T</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
