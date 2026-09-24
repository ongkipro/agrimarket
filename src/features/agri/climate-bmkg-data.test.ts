import { describe, it, expect } from 'vitest'
import {
  getClimateTelemetry,
  getRegionalCorridors,
  getCommodityClimateProfiles,
  getCommodityClimateProfile,
  getKatamProtocols,
  getRainfallOnsetDistribution,
  getENSOProjections,
  getCalendarMatrix,
} from './data-provider'

describe('BMKG Agro-Climate Data Integrity & Katam Engine', () => {
  it('validates BMKG national climate telemetry integrity', () => {
    const tel = getClimateTelemetry()
    expect(tel.total_zom).toBe(699)
    expect(tel.enso_status).toBe('EL_NINO_KUAT')
    expect(tel.enso_nino34_anomaly_celsius).toBeGreaterThan(1.0)
    expect(tel.iod_status).toBe('POSITIF')
    expect(tel.iod_dmi_anomaly_celsius).toBeGreaterThan(0.5)

    // Sum of ZOM delay distribution should equal 100%
    const sumPct =
      tel.delayed_rainy_season_zom_pct +
      tel.normal_rainy_season_zom_pct +
      tel.advanced_rainy_season_zom_pct
    expect(Math.abs(sumPct - 100)).toBeLessThan(0.01)
  })

  it('verifies 6 regional corridors data completeness', () => {
    const corridors = getRegionalCorridors()
    expect(corridors).toHaveLength(6)

    let totalZom = 0
    corridors.forEach((c) => {
      expect(c.id).toBeDefined()
      expect(c.name).toBeTruthy()
      expect(c.provinces_covered.length).toBeGreaterThan(0)
      expect(c.zom_count).toBeGreaterThan(0)
      expect(c.current_2026_status.field_actions.length).toBeGreaterThanOrEqual(
        3
      )
      expect(c.current_2026_status.max_consecutive_dry_days).toBeGreaterThan(0)
      expect(
        c.current_2026_status.water_reservoir_capacity_pct
      ).toBeGreaterThan(0)
      expect(c.projected_2027_outlook.agronomic_opportunity).toBeTruthy()
      totalZom += c.zom_count
    })

    // Sum of all 6 corridors ZOM equals 699
    expect(totalZom).toBe(699)
  })

  it('validates 13 strategic commodities climate sensitivity profiles', () => {
    const profiles = getCommodityClimateProfiles()
    expect(profiles).toHaveLength(13)

    profiles.forEach((p) => {
      expect(p.id).toMatch(/^COMM_\d{2}_/)
      expect(p.name).toBeTruthy()
      expect(p.drought_tolerance_days).toBeGreaterThan(0)
      expect(p.flood_tolerance_days).toBeGreaterThan(0)

      // 2026 El Nino validation
      expect(p.current_2026_el_nino.vulnerability_score).toBeGreaterThanOrEqual(
        1
      )
      expect(p.current_2026_el_nino.vulnerability_score).toBeLessThanOrEqual(10)
      expect(typeof p.current_2026_el_nino.yield_impact_pct).toBe('number')
      expect(isNaN(p.current_2026_el_nino.yield_impact_pct)).toBe(false)
      expect(p.current_2026_el_nino.immediate_field_mitigation).toBeTruthy()
      expect(
        p.current_2026_el_nino.recommended_varieties_or_inputs.length
      ).toBeGreaterThan(0)

      // 2027 Outlook validation
      expect(typeof p.projected_2027_outlook.projected_yield_growth_pct).toBe(
        'number'
      )
      expect(isNaN(p.projected_2027_outlook.projected_yield_growth_pct)).toBe(
        false
      )
      expect(
        p.projected_2027_outlook.wet_season_threats.length
      ).toBeGreaterThan(0)
      expect(
        p.projected_2027_outlook.recommended_proactive_procurement.length
      ).toBeGreaterThan(0)
    })
  })

  it('checks individual commodity retrieval by ID', () => {
    const rice = getCommodityClimateProfile('COMM_01_PADI')
    expect(rice).toBeDefined()
    expect(rice?.name).toBe('Padi (Rice)')
    expect(rice?.current_2026_el_nino.vulnerability_score).toBe(9.2)

    const nonexistent = getCommodityClimateProfile('COMM_99_NONEXISTENT')
    expect(nonexistent).toBeUndefined()
  })

  it('verifies Katam SOP action protocols', () => {
    const protocols = getKatamProtocols()
    expect(protocols.length).toBeGreaterThanOrEqual(4)
    protocols.forEach((proto) => {
      expect(proto.protocol_id).toMatch(/^KATAM-/)
      expect(proto.title).toBeTruthy()
      expect(proto.steps.length).toBeGreaterThanOrEqual(4)
      expect(proto.recommended_inputs.length).toBeGreaterThan(0)
      expect(proto.target_crops.length).toBeGreaterThan(0)
    })
  })

  it('checks rainfall onset ZOM distribution reconciliation', () => {
    const onsets = getRainfallOnsetDistribution()
    expect(onsets.length).toBeGreaterThanOrEqual(5)

    const totalZom = onsets.reduce((sum, item) => sum + item.zom_count, 0)
    expect(totalZom).toBe(699)

    const totalPct = onsets.reduce(
      (sum, item) => sum + item.pct_of_total_zom,
      0
    )
    expect(Math.abs(totalPct - 100)).toBeLessThan(0.05)
  })

  it('validates ENSO multi-model projections probabilities', () => {
    const enso = getENSOProjections()
    expect(enso.length).toBeGreaterThanOrEqual(5)
    enso.forEach((item) => {
      const sumProb =
        item.el_nino_prob_pct + item.neutral_prob_pct + item.la_nina_prob_pct
      expect(sumProb).toBe(100)
    })
  })

  it('ensures calendar matrices for 2026, 2027, and normal contain 12 valid phase codes for all 13 crops', () => {
    const validCodes = new Set([
      'PL',
      'TN',
      'SM',
      'VG',
      'GN',
      'PT',
      'PN',
      'PF',
      'HC',
      'LC',
      'BR',
    ])
    const modes = [
      '2026_EL_NINO',
      '2027_PROJECTED',
      'CLIMATOLOGICAL_NORMAL',
    ] as const

    modes.forEach((mode) => {
      const matrix = getCalendarMatrix(mode)
      expect(Object.keys(matrix)).toHaveLength(13)

      Object.entries(matrix).forEach(([, codes]) => {
        expect(codes).toHaveLength(12)
        codes.forEach((code) => {
          expect(validCodes.has(code)).toBe(true)
        })
      })
    })
  })

  it('ensures 2026 El Nino matrix reflects delayed planting for rice (Subround 3 shift)', () => {
    const normalMatrix = getCalendarMatrix('CLIMATOLOGICAL_NORMAL')
    const elNinoMatrix = getCalendarMatrix('2026_EL_NINO')

    // In normal years, October (index 9) is TN (Tanam Raya)
    expect(normalMatrix['COMM_01_PADI'][9]).toBe('TN')
    // In 2026 El Nino, planting is delayed: October is PL (Pengolahan Lahan / Persiapan Tertunda), and November (index 10) is TN
    expect(elNinoMatrix['COMM_01_PADI'][9]).toBe('PL')
    expect(elNinoMatrix['COMM_01_PADI'][10]).toBe('TN')
  })
})
