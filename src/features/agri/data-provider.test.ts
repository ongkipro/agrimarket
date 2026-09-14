import { describe, it, expect } from 'vitest'
import {
  getDataset,
  getMacroSummary,
  getCommodities,
  getCommodityById,
  auditGateZeroReconciliation,
  calculateDynamicSOM,
  formatIDR,
  formatHa,
  formatTon,
  formatPct,
} from './data-provider'

describe('Agrimarket Data Engine', () => {
  it('loads valid dataset metadata and macro summary', () => {
    const dataset = getDataset()
    expect(dataset.metadata.total_commodities).toBe(13)
    expect(dataset.metadata.reference_year).toBe(2024)

    const macro = getMacroSummary()
    expect(macro.total_tam_ha).toBe(30_451_874)
    expect(macro.total_sam_ha).toBe(21_185_714)
    expect(macro.total_gross_farmgate_value_idr).toBeGreaterThan(1_000_000_000_000_000)
    expect(macro.overall_tam_to_sam_conversion_pct).toBeCloseTo(69.57, 1)
  })

  it('validates Level 1 Macro Aggregate Reconciliation (Zero Deviation)', () => {
    const macro = getMacroSummary()
    const crops = getCommodities()

    const sumTamHa = crops.reduce((acc, c) => acc + c.tam.harvest_area_ha, 0)
    expect(sumTamHa).toBe(macro.total_tam_ha)
    expect(macro.total_tam_ha - sumTamHa).toBe(0)

    const sumSamHa = Math.round(crops.reduce((acc, c) => acc + c.sam.eligible_area_ha, 0))
    expect(sumSamHa).toBe(macro.total_sam_ha)
    expect(macro.total_sam_ha - sumSamHa).toBe(0)

    const sawit = crops.find((c) => c.id === 'COMM_10_KELAPA_SAWIT')!
    expect(sawit).toBeDefined()
    expect(sawit.tam.harvest_area_ha).toBe(16_835_000)
    expect(sawit.tam.production_ton).toBe(238_450_000) // Fresh Fruit Bunches (TBS)
    expect(sawit.tam.farmgate_price_idr_per_kg).toBe(2650)
    expect(sawit.tam.gross_output_value_trillion_idr).toBe(631.89)
  })

  it('contains exactly 13 strategic commodities', () => {
    const crops = getCommodities()
    expect(crops).toHaveLength(13)

    const names = crops.map((c) => c.name)
    expect(names).toContain('Padi')
    expect(names).toContain('Jagung')
    expect(names).toContain('Cabai')
    expect(names).toContain('Bawang Merah')
    expect(names).toContain('Kentang')
    expect(names).toContain('Kubis')
    expect(names).toContain('Tomat')
    expect(names).toContain('Semangka')
    expect(names).toContain('Melon')
    expect(names).toContain('Kelapa Sawit')
    expect(names).toContain('Alpukat')
    expect(names).toContain('Tembakau')
    expect(names).toContain('Anggrek')
  })

  it('retrieves commodities by ID or slug', () => {
    const padi = getCommodityById('COMM_01_PADI')
    expect(padi).toBeDefined()
    expect(padi?.name).toBe('Padi')

    const cabai = getCommodityById('cabai')
    expect(cabai).toBeDefined()
    expect(cabai?.name).toBe('Cabai')
  })

  it('passes Gate-0 macro-micro mathematical reconciliation for all 13 crops', () => {
    const crops = getCommodities()

    crops.forEach((crop) => {
      const audit = auditGateZeroReconciliation(crop)
      expect(['PASS', 'WARN']).toContain(audit.status)
      // Deviation must be strictly less than 0.05%
      expect(audit.relative_deviation_pct).toBeLessThanOrEqual(0.05)
      expect(crop.provincial_data).toHaveLength(38)
    })
  })

  it('calculates dynamic SOM with realistic operational constraints', () => {
    const bawangMerah = getCommodityById('COMM_04_BAWANG_MERAH')!
    expect(bawangMerah).toBeDefined()

    const result = calculateDynamicSOM(bawangMerah, {
      salesReps: 10,
      targetKiosksPerRep: 20,
      avgSalesPerKioskSeasonMillion: 50,
      tempoCreditLimitBillion: 10,
      subroundSeasonality: 1.0,
    })

    expect(result.totalKiosksTargeted).toBe(200)
    // 200 kiosks * 50M = 10B
    expect(result.grossSalesPotentialBillion).toBe(10)
    expect(result.constrainedRevenueBillion).toBe(10)
    expect(result.isWorkingCapitalConstrained).toBe(false)
    expect(result.attainableHectares).toBeGreaterThan(0)
  })

  it('flags working capital constraints when demand exceeds tempo credit limit', () => {
    const cabai = getCommodityById('COMM_03_CABAI')!
    const constrainedResult = calculateDynamicSOM(cabai, {
      salesReps: 50,
      targetKiosksPerRep: 30,
      avgSalesPerKioskSeasonMillion: 100, // 1500 kiosks * 100M = 150B
      tempoCreditLimitBillion: 10, // Max allowable is 2.5 * 10 = 25B
      subroundSeasonality: 1.0,
    })

    expect(constrainedResult.grossSalesPotentialBillion).toBe(150)
    expect(constrainedResult.constrainedRevenueBillion).toBe(25)
    expect(constrainedResult.isWorkingCapitalConstrained).toBe(true)
    expect(constrainedResult.tempoCreditUtilizationPct).toBe(100)
  })

  it('formats Indonesian agricultural metrics correctly', () => {
    expect(formatIDR(1_276_456_000_000_000, 'trillion')).toContain('Triliun')
    expect(formatIDR(41_080_000_000, 'billion')).toContain('Miliar')
    expect(formatHa(10_051_780)).toContain('Ha')
    expect(formatTon(52_660_000)).toContain('Ton')
    expect(formatPct(68.912)).toBe('68,91%')
  })
})
