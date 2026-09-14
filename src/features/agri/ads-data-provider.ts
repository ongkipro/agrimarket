import rawAdsDataset from '@/data/ads-intelligence-dataset.json'
import type {
  AdsIntelligenceDataset,
  NationalDemographicsProfile,
  HourlyActivityHeatmapItem,
  BuyerPersona,
  CompetitorProfile,
  CreativeTeardown,
  CopywritingBlueprintStep,
  AdScript,
  GoogleAdKeywordTier,
  NegativeKeywordGroup,
  RoASBenchmarkCropCategory,
} from './ads-types'

const adsDataset = rawAdsDataset as unknown as AdsIntelligenceDataset

export function getAdsDataset(): AdsIntelligenceDataset {
  return adsDataset
}

export function getNationalDemographics(): NationalDemographicsProfile {
  return adsDataset.demographics.national_profile
}

export function getHourlyActivityHeatmap(): HourlyActivityHeatmapItem[] {
  return adsDataset.demographics.hourly_activity_heatmap
}

export function getBuyerPersonas(): BuyerPersona[] {
  return adsDataset.buyer_personas
}

export function getBuyerPersonaById(id: string): BuyerPersona | undefined {
  return adsDataset.buyer_personas.find((p) => p.id === id)
}

export function getCompetitorProfiles(): CompetitorProfile[] {
  return adsDataset.competitor_spy_matrix
}

export function getCompetitorById(id: string): CompetitorProfile | undefined {
  return adsDataset.competitor_spy_matrix.find((c) => c.id === id)
}

export function getCreativeTeardowns(): CreativeTeardown[] {
  return adsDataset.creative_teardowns
}

export function getCopywritingBlueprints(): CopywritingBlueprintStep[] {
  return adsDataset.copywriting_blueprints
}

export function getAdScripts(): AdScript[] {
  return adsDataset.ad_scripts
}

export function getGoogleKeywordTiers(): GoogleAdKeywordTier[] {
  return adsDataset.google_ads_keywords
}

export function getAllGoogleKeywords() {
  return adsDataset.google_ads_keywords.flatMap((tier) =>
    tier.keywords.map((k) => ({
      ...k,
      tier_name: tier.tier,
    }))
  )
}

export function getNegativeKeywordGroups(): NegativeKeywordGroup[] {
  return adsDataset.negative_keywords
}

export function getRoASBenchmarks(): Record<string, RoASBenchmarkCropCategory> {
  return adsDataset.budget_and_roas_benchmarks
}

export interface RoASSimulationInput {
  monthly_ad_spend_idr: number
  cpm_idr: number
  ctr_percent: number
  wa_conversion_rate_percent: number
  closing_rate_percent: number
  average_order_value_idr: number
  cogs_percentage: number
}

export interface RoASSimulationResult {
  impressions: number
  link_clicks: number
  cost_per_click_idr: number
  wa_leads: number
  cost_per_lead_idr: number
  paying_customers: number
  customer_acquisition_cost_idr: number
  gross_revenue_idr: number
  cogs_idr: number
  gross_profit_idr: number
  net_profit_after_ad_spend_idr: number
  roas: number
  roi_percentage: number
}

export function calculateRoAS(input: RoASSimulationInput): RoASSimulationResult {
  const {
    monthly_ad_spend_idr,
    cpm_idr,
    ctr_percent,
    wa_conversion_rate_percent,
    closing_rate_percent,
    average_order_value_idr,
    cogs_percentage,
  } = input

  const safeCpm = Math.max(cpm_idr, 1000)
  const impressions = Math.round((monthly_ad_spend_idr / safeCpm) * 1000)
  const link_clicks = Math.round(impressions * (ctr_percent / 100))
  const cost_per_click_idr = link_clicks > 0 ? Math.round(monthly_ad_spend_idr / link_clicks) : 0

  const wa_leads = Math.round(link_clicks * (wa_conversion_rate_percent / 100))
  const cost_per_lead_idr = wa_leads > 0 ? Math.round(monthly_ad_spend_idr / wa_leads) : 0

  const paying_customers = Math.round(wa_leads * (closing_rate_percent / 100))
  const customer_acquisition_cost_idr =
    paying_customers > 0 ? Math.round(monthly_ad_spend_idr / paying_customers) : 0

  const gross_revenue_idr = paying_customers * average_order_value_idr
  const cogs_idr = Math.round(gross_revenue_idr * (cogs_percentage / 100))
  const gross_profit_idr = gross_revenue_idr - cogs_idr
  const net_profit_after_ad_spend_idr = gross_profit_idr - monthly_ad_spend_idr

  const roas = monthly_ad_spend_idr > 0 ? Number((gross_revenue_idr / monthly_ad_spend_idr).toFixed(2)) : 0
  const total_cost = monthly_ad_spend_idr + cogs_idr
  const roi_percentage =
    total_cost > 0 ? Number(((net_profit_after_ad_spend_idr / total_cost) * 100).toFixed(1)) : 0

  return {
    impressions,
    link_clicks,
    cost_per_click_idr,
    wa_leads,
    cost_per_lead_idr,
    paying_customers,
    customer_acquisition_cost_idr,
    gross_revenue_idr,
    cogs_idr,
    gross_profit_idr,
    net_profit_after_ad_spend_idr,
    roas,
    roi_percentage,
  }
}
