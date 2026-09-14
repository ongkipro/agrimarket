import { describe, it, expect } from 'vitest'
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
  calculateRoAS,
} from './ads-data-provider'

describe('Ads Intelligence Data Provider', () => {
  it('loads national demographics correctly', () => {
    const demo = getNationalDemographics()
    expect(demo.total_digital_farmers_reached).toBeGreaterThan(10000000)
    expect(demo.device_distribution.android_percentage).toBeGreaterThan(90)
    expect(demo.age_distribution.length).toBe(5)
    expect(demo.payment_channel_preferences.length).toBeGreaterThanOrEqual(4)
  })

  it('loads 24-hour activity heatmap with peak hours defined', () => {
    const heatmap = getHourlyActivityHeatmap()
    expect(heatmap.length).toBe(24)
    const peakHours = heatmap.filter((h) => h.is_peak)
    expect(peakHours.length).toBeGreaterThanOrEqual(3)
    // 19:00 - 20:00 should be peak
    const primeTime = heatmap.find((h) => h.hour === 19)
    expect(primeTime?.is_peak).toBe(true)
    expect(primeTime?.activity_score).toBeGreaterThanOrEqual(90)
  })

  it('provides 5 distinct buyer personas with complete profiles', () => {
    const personas = getBuyerPersonas()
    expect(personas.length).toBe(5)
    personas.forEach((p) => {
      expect(p.id).toBeDefined()
      expect(p.name).toBeDefined()
      expect(p.pain_points.length).toBeGreaterThan(0)
      expect(p.buying_triggers.length).toBeGreaterThan(0)
      expect(p.winning_offer_angle).toBeDefined()
      expect(p.recommended_cta).toBeDefined()
    })
  })

  it('provides 8 major agrochemical & seed competitors in spy matrix', () => {
    const competitors = getCompetitorProfiles()
    expect(competitors.length).toBe(8)
    const syngenta = competitors.find((c) => c.id === 'COMP_01')
    expect(syngenta?.brand_name).toContain('Syngenta')
    expect(syngenta?.top_hero_products.length).toBeGreaterThanOrEqual(3)
    expect(syngenta?.active_ad_count_estimate).toBeGreaterThan(100)
  })

  it('provides structured creative teardowns and 5-step copywriting blueprints', () => {
    const teardowns = getCreativeTeardowns()
    expect(teardowns.length).toBeGreaterThanOrEqual(3)
    teardowns.forEach((t) => {
      expect(t.hook_breakdown.visual).toBeDefined()
      expect(t.body_breakdown.talking_points).toBeDefined()
      expect(t.offer_and_cta.cta_text).toBeDefined()
    })

    const blueprints = getCopywritingBlueprints()
    expect(blueprints.length).toBe(5)
    expect(blueprints[0].step_number).toBe(1)
    expect(blueprints[4].step_number).toBe(5)

    const scripts = getAdScripts()
    expect(scripts.length).toBeGreaterThanOrEqual(4)
  })

  it('provides 3-tier Google Ads keywords and negative keywords', () => {
    const tiers = getGoogleKeywordTiers()
    expect(tiers.length).toBe(3)
    const allKeywords = getAllGoogleKeywords()
    expect(allKeywords.length).toBeGreaterThan(15)

    const negatives = getNegativeKeywordGroups()
    expect(negatives.length).toBeGreaterThanOrEqual(4)
    const totalNegatives = negatives.reduce((sum, g) => sum + g.list.length, 0)
    expect(totalNegatives).toBeGreaterThan(20)
  })

  it('calculates RoAS and unit economics accurately', () => {
    const result = calculateRoAS({
      monthly_ad_spend_idr: 10000000,
      cpm_idr: 20000,
      ctr_percent: 3.0,
      wa_conversion_rate_percent: 10.0,
      closing_rate_percent: 20.0,
      average_order_value_idr: 500000,
      cogs_percentage: 30,
    })

    // 10M / 20k * 1000 = 500,000 impressions
    expect(result.impressions).toBe(500000)
    // 500,000 * 3% = 15,000 clicks
    expect(result.link_clicks).toBe(15000)
    // 15,000 * 10% = 1,500 WA leads
    expect(result.wa_leads).toBe(1500)
    // 1,500 * 20% = 300 paying customers
    expect(result.paying_customers).toBe(300)
    // 300 * 500,000 = 150,000,000 gross revenue
    expect(result.gross_revenue_idr).toBe(150000000)
    // RoAS = 150M / 10M = 15x
    expect(result.roas).toBe(15)
    // COGS = 30% of 150M = 45M. Gross profit = 105M. Net profit = 105M - 10M = 95M.
    expect(result.net_profit_after_ad_spend_idr).toBe(95000000)
  })
})
