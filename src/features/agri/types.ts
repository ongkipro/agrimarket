export type DataIntegrityStatus = 'VERIFIED_VALUE' | 'CALCULATED' | 'ESTIMATED' | 'NOT_REPORTED'

export interface DatasetMetadata {
  title: string
  version: string
  reference_year: number
  comparison_year: number
  authorities: string[]
  reconciliation_status: 'PASS' | 'WARN' | 'FAIL'
  total_commodities: number
  generated_at: string
}

export interface MacroSummary {
  total_tam_ha: number
  total_sam_ha: number
  total_gross_farmgate_value_idr: number
  total_agri_input_market_value_idr: number
  overall_tam_to_sam_conversion_pct: number
}

export interface Drivers {
  r1_commercial_orientation: number
  r2_purchased_input_addressability: number
  r3_economic_affordability: number
  r4_channel_serviceability: number
}

export interface TAMData {
  harvest_area_ha: number
  production_ton: number
  production_milled_rice_ton?: number
  yield_ton_per_ha: number
  farmgate_price_idr_per_kg: number
  gross_output_value_trillion_idr: number
  yoy_area_growth_pct: number
  yoy_prod_growth_pct: number
}

export interface SAMData {
  eligible_area_ha: number
  conversion_rate_pct: number
  drivers: Drivers
  input_spending_per_ha_idr: number
  total_input_market_value_trillion_idr: number
}

export interface SubroundsData {
  sr1_jan_apr_pct: number
  sr2_may_aug_pct: number
  sr3_sep_dec_pct: number
  peak_planting_window: string
  peak_harvest_window: string
  critical_pest_window: string
}

export interface FarmerTypology {
  gurem_less_than_half_ha_pct: number
  menengah_half_to_two_ha_pct: number
  korporasi_more_than_two_ha_pct: number
  credit_yarnen_dependency_pct: number
}

export interface InputDecompositionItem {
  pct: number
  cost_idr: number
}

export interface InputDecomposition {
  npk_compound_fertilizer: InputDecompositionItem
  foliar_calcium_micro_nutrients: InputDecompositionItem
  fungicides: InputDecompositionItem
  insecticides: InputDecompositionItem
  herbicides: InputDecompositionItem
  certified_seeds: InputDecompositionItem
}

export interface PriceLadder {
  farm_gate_idr_per_kg: number
  wholesale_pasar_induk_idr_per_kg: number
  retail_consumer_idr_per_kg: number
  farmer_share_pct: number
}

export interface SOMInternalCapacity {
  year1_sales_reps: number
  year1_active_kiosks: number
  year1_tempo_limit_billion_idr: number
  year1_penetration_ha: number
  year1_projected_revenue_billion_idr: number
  year3_target_market_share_pct: number
}

export interface ClimateVulnerability {
  irrigated_pct: number
  rainfed_pct: number
  el_nino_sensitivity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  la_nina_flood_risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
}

export interface DistrictData {
  kabupaten: string
  district?: string
  province?: string
  harvest_area_ha: number
  production_ton: number
  yield_ton_per_ha: number
  pct_of_national: number
}

export interface ProvinceData {
  province_code: string
  province_name: string
  harvest_area_ha: number
  production_ton: number
  yield_ton_per_ha: number
  pct_national_production: number
  data_status: DataIntegrityStatus
  kpl_kiosks_count?: number
}

export interface CommodityData {
  id: string
  name: string
  english_name: string
  scientific_name: string
  sector: 'Tanaman Pangan' | 'Hortikultura Sayuran' | 'Hortikultura Buah' | 'Perkebunan' | 'Florikultura'
  tam: TAMData
  sam: SAMData
  subrounds: SubroundsData
  farmer_typology: FarmerTypology
  input_decomposition: InputDecomposition
  price_ladder: PriceLadder
  som_internal_capacity: SOMInternalCapacity
  climate_vulnerability: ClimateVulnerability
  key_producing_districts: DistrictData[]
  provincial_data: ProvinceData[]
}

export interface MarketIntelDataset {
  metadata: DatasetMetadata
  macro_summary: MacroSummary
  commodities: CommodityData[]
}

export * from './ads-types'
export * from './commercial-selling-data'

