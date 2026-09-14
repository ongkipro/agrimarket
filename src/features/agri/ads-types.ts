export interface DemographicAgeBracket {
  range: string
  percentage: number
  label: string
}

export interface PaymentChannelPreference {
  channel: string
  percentage: number
  trust_driver: string
}

export interface NationalDemographicsProfile {
  total_digital_farmers_reached: number
  age_distribution: DemographicAgeBracket[]
  gender_split: {
    male_percentage: number
    female_percentage: number
    female_roles: string
  }
  device_distribution: {
    android_percentage: number
    ios_percentage: number
    top_android_brands: string[]
    screen_resolution_note: string
  }
  connectivity: {
    mobile_data_4g_percentage: number
    rural_wifi_percentage: number
    bandwidth_constraint_note: string
  }
  payment_channel_preferences: PaymentChannelPreference[]
}

export interface HourlyActivityHeatmapItem {
  hour: number
  label: string
  activity_score: number
  is_peak: boolean
  notes: string
}

export interface BuyerPersona {
  id: string
  name: string
  segment: string
  role: string
  demographics: {
    age_range: string
    education: string
    location: string
    land_size: string
    primary_crops: string[]
  }
  pain_points: string[]
  buying_triggers: string[]
  objections: string[]
  preferred_platforms: string[]
  winning_offer_angle: string
  recommended_cta: string
  price_sensitivity: string
}

export interface HeroProduct {
  name: string
  active_ingredient: string
  target: string
}

export interface CompetitorProfile {
  id: string
  brand_name: string
  origin: string
  market_share_category: string
  active_ad_count_estimate: number
  primary_channels: string[]
  top_hero_products: HeroProduct[]
  dominant_creative_formats: string[]
  key_angles_and_hooks: string[]
  target_crops: string[]
  strengths: string
  vulnerabilities: string
  typical_cta_destination: string
}

export interface CreativeTeardown {
  id: string
  concept_title: string
  format: string
  target_crops: string[]
  objective: string
  hook_breakdown: {
    visual: string
    audio_opening: string
    hook_duration_seconds: number
  }
  body_breakdown: {
    visual_flow: string
    talking_points: string
    duration_seconds: number
  }
  offer_and_cta: {
    offer_text: string
    cta_text: string
  }
  performance_benchmarks: {
    avg_ctr: string
    avg_cpl_idr: string
    conversion_to_wa_rate: string
  }
}

export interface CopywritingBlueprintStep {
  step_number: number
  step_name: string
  objective: string
  example_phrase: string
}

export interface AdScript {
  commodity_id: string
  crop_name: string
  pest_target: string
  platform: string
  script_content: string
}

export interface GoogleAdKeyword {
  keyword: string
  crop: string
  monthly_volume: number
  avg_cpc_idr: number
  competition: 'Low' | 'Medium' | 'High'
  match_type: 'Exact Match' | 'Phrase Match' | 'Broad Match' | 'Broad Match Modifier'
}

export interface GoogleAdKeywordTier {
  tier: string
  intent_description: string
  keywords: GoogleAdKeyword[]
}

export interface NegativeKeywordGroup {
  category: string
  list: string[]
}

export interface RoASBenchmarkCropCategory {
  typical_cpm_idr: number
  avg_ctr_percent: number
  cpl_wa_idr: number
  wa_to_order_closing_rate_percent: number
  average_order_value_idr: number
  target_roas: number
}

export interface AdsIntelligenceDataset {
  last_updated: string
  data_version: string
  demographics: {
    national_profile: NationalDemographicsProfile
    hourly_activity_heatmap: HourlyActivityHeatmapItem[]
  }
  buyer_personas: BuyerPersona[]
  competitor_spy_matrix: CompetitorProfile[]
  creative_teardowns: CreativeTeardown[]
  copywriting_blueprints: CopywritingBlueprintStep[]
  ad_scripts: AdScript[]
  google_ads_keywords: GoogleAdKeywordTier[]
  negative_keywords: NegativeKeywordGroup[]
  budget_and_roas_benchmarks: Record<string, RoASBenchmarkCropCategory>
}
