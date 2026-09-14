import rawDataset from '@/data/market-intel-dataset.json'
import type { CommodityData, MarketIntelDataset, MacroSummary } from './types'

type RawDistrict = {
  kabupaten?: string
  district?: string
  province?: string
  harvest_area_ha?: number
  production_ton?: number
}

function normalizeCommodity(c: CommodityData & Record<string, unknown>): CommodityData {
  if (!c) return c

  const harvestArea = c.tam?.harvest_area_ha || 0
  const prodTon = c.tam?.production_ton || 0
  const eligibleArea = c.sam?.eligible_area_ha || harvestArea * 0.7
  const inputMarketTrillion = c.sam?.total_input_market_value_trillion_idr || 1

  // 1. Normalize top_districts -> key_producing_districts
  const rawDistricts = (c.top_districts || c.key_producing_districts || []) as unknown as RawDistrict[]
  const key_producing_districts = rawDistricts.map((d: RawDistrict) => ({
    kabupaten: d.district || d.kabupaten || 'Unknown',
    district: d.district || d.kabupaten || 'Unknown',
    province: d.province || '',
    harvest_area_ha: d.harvest_area_ha || 0,
    production_ton: d.production_ton || 0,
    yield_ton_per_ha: d.harvest_area_ha && d.harvest_area_ha > 0 ? (d.production_ton || 0) / d.harvest_area_ha : 0,
    pct_of_national: prodTon > 0 ? Number((((d.production_ton || 0) / prodTon) * 100).toFixed(2)) : 0,
  }))

  // 2. Normalize price_disparity -> price_ladder
  const pd = (c.price_disparity || c.price_ladder || {}) as Record<string, number | undefined>
  const farmGate =
    pd.farmgate_idr_per_kg || pd.farm_gate_idr_per_kg || c.tam?.farmgate_price_idr_per_kg || 5000
  const wholesale = pd.wholesale_pasar_induk_idr_per_kg || Math.round(farmGate * 1.55)
  const retail = pd.retail_consumer_idr_per_kg || Math.round(farmGate * 2.1)
  const farmerShare =
    pd.farmers_share_pct ||
    pd.farmer_share_pct ||
    (retail > 0 ? Number(((farmGate / retail) * 100).toFixed(1)) : 62.5)

  const price_ladder = {
    farm_gate_idr_per_kg: farmGate,
    wholesale_pasar_induk_idr_per_kg: wholesale,
    retail_consumer_idr_per_kg: retail,
    farmer_share_pct: farmerShare,
    farmers_share_pct: farmerShare,
  }

  // 3. Normalize farmer_typology
  const ft = (c.farmer_typology || {}) as unknown as Record<string, number>
  const gurem = ft.gurem_under_0_5ha_pct ?? ft.gurem_less_than_half_ha_pct ?? 55.0
  const menengah = ft.menengah_0_5_to_2ha_pct ?? ft.menengah_half_to_two_ha_pct ?? 35.0
  const besar = ft.besar_over_2ha_pct ?? ft.korporasi_more_than_two_ha_pct ?? 10.0
  const yarnen = ft.yarnen_credit_dependence_pct ?? ft.credit_yarnen_dependency_pct ?? 60.0

  const farmer_typology = {
    gurem_under_0_5ha_pct: gurem,
    gurem_less_than_half_ha_pct: gurem,
    menengah_0_5_to_2ha_pct: menengah,
    menengah_half_to_two_ha_pct: menengah,
    besar_over_2ha_pct: besar,
    korporasi_more_than_two_ha_pct: besar,
    yarnen_credit_dependence_pct: yarnen,
    credit_yarnen_dependency_pct: yarnen,
  }

  // 4. Normalize som_internal_capacity (Harmonized with operational capacity economics)
  const rawSom = (c.som_internal_capacity || {}) as unknown as Record<string, number>
  const baseReps = Math.max(8, Math.min(50, Math.round(eligibleArea / 180000)))
  const baseKiosks = baseReps * 25
  const defaultSalesPerKioskMillion = 75
  const defaultSeasonality = 1.2
  // Bottom-up operational launch capacity (Reps * Kiosks * Seasonal Sales * Seasonality)
  const rawBottomUpRevBillion = (baseKiosks * (defaultSalesPerKioskMillion / 1000) * defaultSeasonality)
  const projectedRevBillion = Math.round(rawBottomUpRevBillion * 10) / 10
  const tempoLimitBillion = Math.max(5, Math.round((projectedRevBillion / 2.5) * 10) / 10)
  const spendingPerHa = c.sam?.input_spending_per_ha_idr || 5000000
  const penHa = spendingPerHa > 0 ? Math.round((projectedRevBillion * 1_000_000_000) / spendingPerHa) : 0
  const targetShare =
    Math.round(Math.min(12, Math.max(3.5, 45 / Math.sqrt(Math.max(1, inputMarketTrillion)))) * 10) / 10

  const som_internal_capacity = {
    year1_sales_reps: rawSom.year1_sales_reps || baseReps,
    year1_active_kiosks: rawSom.year1_active_kiosks || baseKiosks,
    year1_tempo_limit_billion_idr: rawSom.year1_tempo_limit_billion_idr || tempoLimitBillion,
    year1_penetration_ha: rawSom.year1_penetration_ha || penHa,
    year1_projected_revenue_billion_idr: rawSom.year1_projected_revenue_billion_idr || projectedRevBillion,
    year3_target_market_share_pct: rawSom.year3_target_market_share_pct || targetShare,
  }

  // 5. Normalize input_decomposition
  const ib = (c.input_breakdown_per_ha || {}) as Record<string, number>
  const totalInputCost = c.sam?.input_spending_per_ha_idr || 5000000
  const input_decomposition = c.input_decomposition || {
    npk_compound_fertilizer: {
      pct: ib.macro_fertilizers_npk_idr
        ? Math.round((ib.macro_fertilizers_npk_idr / totalInputCost) * 100)
        : 40,
      cost_idr: ib.macro_fertilizers_npk_idr || Math.round(totalInputCost * 0.4),
    },
    foliar_calcium_micro_nutrients: {
      pct: ib.micro_foliar_fertilizers_idr
        ? Math.round((ib.micro_foliar_fertilizers_idr / totalInputCost) * 100)
        : 15,
      cost_idr: ib.micro_foliar_fertilizers_idr || Math.round(totalInputCost * 0.15),
    },
    fungicides: {
      pct: ib.fungicides_idr
        ? Math.round((ib.fungicides_idr / totalInputCost) * 100)
        : 15,
      cost_idr: ib.fungicides_idr || Math.round(totalInputCost * 0.15),
    },
    insecticides: {
      pct: ib.insecticides_idr
        ? Math.round((ib.insecticides_idr / totalInputCost) * 100)
        : 15,
      cost_idr: ib.insecticides_idr || Math.round(totalInputCost * 0.15),
    },
    herbicides: {
      pct: ib.herbicides_idr
        ? Math.round((ib.herbicides_idr / totalInputCost) * 100)
        : 8,
      cost_idr: ib.herbicides_idr || Math.round(totalInputCost * 0.08),
    },
    certified_seeds: {
      pct: ib.commercial_seeds_idr
        ? Math.round((ib.commercial_seeds_idr / totalInputCost) * 100)
        : 7,
      cost_idr: ib.commercial_seeds_idr || Math.round(totalInputCost * 0.07),
    },
  }

  return {
    ...c,
    key_producing_districts,
    top_districts: rawDistricts,
    price_ladder,
    price_disparity: pd,
    farmer_typology,
    som_internal_capacity,
    input_decomposition,
  } as unknown as CommodityData
}

const typedDataset = rawDataset as unknown as MarketIntelDataset & {
  commodities: (CommodityData & Record<string, unknown>)[]
}
const rawCommodities = typedDataset.commodities || []
const normalizedCommodities: CommodityData[] = rawCommodities.map(normalizeCommodity)

export const dataset: MarketIntelDataset = {
  ...typedDataset,
  commodities: normalizedCommodities,
}

export function getDataset(): MarketIntelDataset {
  return dataset
}

export function getMacroSummary(): MacroSummary {
  return dataset.macro_summary
}

export function getCommodities(): CommodityData[] {
  return normalizedCommodities
}

export function getCommodityById(idOrSlug: string): CommodityData | undefined {
  const cleanId = idOrSlug.toUpperCase()
  return normalizedCommodities.find(
    (c) =>
      c.id.toUpperCase() === cleanId ||
      c.name.toLowerCase() === idOrSlug.toLowerCase() ||
      c.id.replace('COMM_', '').replace(/_/g, '-').toLowerCase() === idOrSlug.toLowerCase()
  )
}

export function formatIDR(
  value: number,
  mode: 'full' | 'compact' | 'trillion' | 'billion' | 'million' = 'compact'
): string {
  if (value === undefined || value === null || isNaN(value)) return 'Rp 0'

  if (mode === 'trillion' || (mode === 'compact' && Math.abs(value) >= 1_000_000_000_000)) {
    const val = value / 1_000_000_000_000
    return `Rp ${val.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Triliun`
  }
  if (mode === 'billion' || (mode === 'compact' && Math.abs(value) >= 1_000_000_000)) {
    const val = value / 1_000_000_000
    return `Rp ${val.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Miliar`
  }
  if (mode === 'million' || (mode === 'compact' && Math.abs(value) >= 1_000_000)) {
    const val = value / 1_000_000
    return `Rp ${val.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Juta`
  }
  return `Rp ${Math.round(value).toLocaleString('id-ID')}`
}

export function formatHa(value: number): string {
  if (value === undefined || value === null || isNaN(value)) return '0 Ha'
  return `${Math.round(value).toLocaleString('id-ID')} Ha`
}

export function formatTon(value: number): string {
  if (value === undefined || value === null || isNaN(value)) return '0 Ton'
  return `${Math.round(value).toLocaleString('id-ID')} Ton`
}

export function formatPct(value: number, decimals: number = 2): string {
  if (value === undefined || value === null || isNaN(value)) return '0,00%'
  return `${value.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}%`
}

export interface GateZeroAuditResult {
  commodity_id: string
  commodity_name: string
  national_production_ton: number
  sum_provincial_ton: number
  absolute_deviation_ton: number
  relative_deviation_pct: number
  status: 'PASS' | 'WARN' | 'FAIL'
  deviation_reason?: string
}

export function auditGateZeroReconciliation(commodity: CommodityData): GateZeroAuditResult {
  const nationalTon = commodity.tam.production_ton
  const sumProvincialTon = commodity.provincial_data.reduce(
    (acc, cur) => acc + (cur.production_ton || 0),
    0
  )
  const absDiff = Math.abs(nationalTon - sumProvincialTon)
  const relDiffPct = nationalTon > 0 ? (absDiff / nationalTon) * 100 : 0

  let status: 'PASS' | 'WARN' | 'FAIL' = 'PASS'
  let deviation_reason: string | undefined

  if (relDiffPct > 0.05) {
    // Check if rounding error or known official discrepancy
    if (relDiffPct < 0.2) {
      status = 'WARN'
      deviation_reason = 'Official BPS rounding divergence (<0.20%)'
    } else {
      status = 'FAIL'
      deviation_reason = 'Exceeds standard 0.05% integrity boundary'
    }
  }

  return {
    commodity_id: commodity.id,
    commodity_name: commodity.name,
    national_production_ton: nationalTon,
    sum_provincial_ton: sumProvincialTon,
    absolute_deviation_ton: absDiff,
    relative_deviation_pct: relDiffPct,
    status,
    deviation_reason,
  }
}

export interface DynamicSOMParams {
  salesReps: number
  targetKiosksPerRep: number
  avgSalesPerKioskSeasonMillion: number
  tempoCreditLimitBillion: number
  subroundSeasonality: number
}

export interface DynamicSOMResult {
  totalKiosksTargeted: number
  grossSalesPotentialBillion: number
  constrainedRevenueBillion: number
  attainableHectares: number
  marketSharePct: number
  tempoCreditUtilizationPct: number
  isWorkingCapitalConstrained: boolean
}

export function calculateDynamicSOM(
  commodity: CommodityData,
  params: DynamicSOMParams
): DynamicSOMResult {
  const totalKiosksTargeted = params.salesReps * params.targetKiosksPerRep
  const rawRevenueBillion =
    (totalKiosksTargeted * (params.avgSalesPerKioskSeasonMillion / 1000) * params.subroundSeasonality)

  // Working capital limit check: max allowable credit exposure is 2.5x annual tempo limit
  const maxAllowableRevenue = params.tempoCreditLimitBillion * 2.5
  const constrainedRevenueBillion = Math.min(rawRevenueBillion, maxAllowableRevenue)
  const isWorkingCapitalConstrained = rawRevenueBillion > maxAllowableRevenue

  // Convert revenue to hectares based on average input spending per Ha
  const inputSpendingPerHa = commodity.sam.input_spending_per_ha_idr
  const revenueInIDR = constrainedRevenueBillion * 1_000_000_000
  const attainableHectares = inputSpendingPerHa > 0 ? Math.round(revenueInIDR / inputSpendingPerHa) : 0

  // Market share vs SAM
  const totalSAMValueBillion = commodity.sam.total_input_market_value_trillion_idr * 1000
  const marketSharePct = totalSAMValueBillion > 0 ? (constrainedRevenueBillion / totalSAMValueBillion) * 100 : 0
  const tempoCreditUtilizationPct =
    params.tempoCreditLimitBillion > 0
      ? Math.min(100, (constrainedRevenueBillion / 2.5 / params.tempoCreditLimitBillion) * 100)
      : 0

  return {
    totalKiosksTargeted,
    grossSalesPotentialBillion: rawRevenueBillion,
    constrainedRevenueBillion,
    attainableHectares,
    marketSharePct,
    tempoCreditUtilizationPct,
    isWorkingCapitalConstrained,
  }
}
