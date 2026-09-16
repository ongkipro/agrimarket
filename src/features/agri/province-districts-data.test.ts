import { describe, it, expect } from 'vitest'
import { getCommodities } from './data-provider'
import {
  getProvinceDistricts,
  getProvinceDistrictSummary,
  PROVINCE_DEFAULT_REGENCIES,
} from './province-districts-data'

describe('Province to District Geospatial Drilldown Engine', () => {
  const commodities = getCommodities()

  it('should load all 13 commodities successfully', () => {
    expect(commodities.length).toBe(13)
  })

  it('should have authentic default regencies defined for all 38 provinces', () => {
    const provinceCodes = Object.keys(PROVINCE_DEFAULT_REGENCIES)
    expect(provinceCodes.length).toBe(38)
    for (const code of provinceCodes) {
      expect(PROVINCE_DEFAULT_REGENCIES[code].length).toBeGreaterThanOrEqual(2)
      PROVINCE_DEFAULT_REGENCIES[code].forEach((name) => {
        expect(name).toBeTruthy()
        expect(typeof name).toBe('string')
      })
    }
  })

  describe('Parallel Validation Matrix: 13 Commodities x 38 Provinces (494 Points)', () => {
    for (const crop of commodities) {
      describe(`Commodity: ${crop.name} (${crop.id})`, () => {
        it(`validates all 38 provinces for ${crop.name} without NaN or crashes`, () => {
          expect(crop.provincial_data.length).toBe(38)

          for (const prov of crop.provincial_data) {
            const districts = getProvinceDistricts(crop.id, prov.province_code)
            const summary = getProvinceDistrictSummary(crop.id, prov.province_code)

            expect(districts).toBeDefined()
            expect(Array.isArray(districts)).toBe(true)

            // If province has production, districts must exist
            if (prov.production_ton > 0) {
              expect(districts.length).toBeGreaterThan(0)

              // Check mathematical reconciliation: sum of district production <= prov production * 1.001
              const sumDistProd = districts.reduce((acc, d) => acc + d.production_ton, 0)
              expect(sumDistProd).toBeLessThanOrEqual(prov.production_ton * 1.001 + 10)

              // Verify each district attributes
              for (const d of districts) {
                expect(d.kabupaten).toBeTruthy()
                expect(typeof d.kabupaten).toBe('string')
                expect(d.province_code).toBe(prov.province_code)
                expect(d.province_name).toBe(prov.province_name)
                expect(d.crop_id).toBe(crop.id)

                // Numeric validity - strictly no NaN or negative numbers
                expect(Number.isNaN(d.harvest_area_ha)).toBe(false)
                expect(Number.isNaN(d.production_ton)).toBe(false)
                expect(Number.isNaN(d.yield_ton_per_ha)).toBe(false)
                expect(Number.isNaN(d.pct_of_province)).toBe(false)
                expect(Number.isNaN(d.pct_of_national)).toBe(false)
                expect(Number.isNaN(d.kpl_kiosks_count)).toBe(false)

                expect(d.harvest_area_ha).toBeGreaterThanOrEqual(0)
                expect(d.production_ton).toBeGreaterThanOrEqual(0)
                expect(d.yield_ton_per_ha).toBeGreaterThanOrEqual(0)
                expect(d.pct_of_province).toBeGreaterThanOrEqual(0)
                expect(d.pct_of_national).toBeGreaterThanOrEqual(0)
                expect(d.kpl_kiosks_count).toBeGreaterThan(0)

                expect(d.status).toBeTruthy()
                expect(d.commercial_action).toBeTruthy()
              }

              // Verify summary object integrity
              expect(summary).not.toBeNull()
              if (summary) {
                expect(summary.total_districts_tracked).toBe(districts.length)
                expect(summary.top3_pareto_pct).toBeGreaterThan(0)
                expect(summary.top3_pareto_pct).toBeLessThanOrEqual(100.1)
                expect(summary.primary_hub_name).toBeTruthy()
                expect(summary.agronomist_allocation_recommendation).toBeTruthy()
              }
            }
          }
        })
      })
    }
  })

  describe('Key Agronomic Benchmark District Hubs Verification', () => {
    it('verifies Padi Jawa Barat benchmark districts (Indramayu, Karawang, Subang)', () => {
      const districts = getProvinceDistricts('COMM_01_PADI', '32')
      const indramayu = districts.find((d) => d.kabupaten.includes('Indramayu'))
      const karawang = districts.find((d) => d.kabupaten.includes('Karawang'))
      const subang = districts.find((d) => d.kabupaten.includes('Subang'))

      expect(indramayu).toBeDefined()
      expect(karawang).toBeDefined()
      expect(subang).toBeDefined()

      expect(indramayu?.harvest_area_ha).toBe(184600)
      expect(indramayu?.production_ton).toBe(1052220)
      expect(indramayu?.is_verified_hub).toBe(true)
      expect(karawang?.harvest_area_ha).toBe(156200)
      expect(subang?.harvest_area_ha).toBe(142800)
    })

    it('verifies Bawang Merah Jawa Tengah benchmark (Brebes)', () => {
      const districts = getProvinceDistricts('COMM_04_BAWANG_MERAH', '33')
      const brebes = districts.find((d) => d.kabupaten.includes('Brebes'))

      expect(brebes).toBeDefined()
      expect(brebes?.harvest_area_ha).toBe(28600)
      expect(brebes?.production_ton).toBe(328900)
      expect(brebes?.status).toBe('SENTRA_UTAMA_1')
      expect(brebes?.is_verified_hub).toBe(true)
    })

    it('verifies Jagung Jawa Timur benchmark (Tuban, Lamongan)', () => {
      const districts = getProvinceDistricts('COMM_02_JAGUNG', '35')
      const tuban = districts.find((d) => d.kabupaten.includes('Tuban'))
      const lamongan = districts.find((d) => d.kabupaten.includes('Lamongan'))

      expect(tuban).toBeDefined()
      expect(lamongan).toBeDefined()
      expect(tuban?.harvest_area_ha).toBe(124500)
      expect(tuban?.production_ton).toBe(809250)
      expect(tuban?.status).toBe('SENTRA_UTAMA_1')
    })

    it('verifies Kelapa Sawit Riau benchmark (Rokan Hulu, Rokan Hilir, Kampar)', () => {
      const districts = getProvinceDistricts('COMM_10_KELAPA_SAWIT', '14')
      const rokanHulu = districts.find((d) => d.kabupaten.includes('Rokan Hulu'))

      expect(rokanHulu).toBeDefined()
      expect(rokanHulu?.harvest_area_ha).toBe(520000)
      expect(rokanHulu?.production_ton).toBe(7384000)
      expect(rokanHulu?.is_verified_hub).toBe(true)
    })

    it('verifies Kentang Jawa Timur benchmark (Pasuruan Bromo)', () => {
      const districts = getProvinceDistricts('COMM_05_KENTANG', '35')
      const pasuruan = districts.find((d) => d.kabupaten.includes('Pasuruan'))

      expect(pasuruan).toBeDefined()
      expect(pasuruan?.harvest_area_ha).toBe(10400)
      expect(pasuruan?.production_ton).toBe(222560)
    })

    it('verifies Alpukat Jawa Timur benchmark (Pasuruan, Malang)', () => {
      const districts = getProvinceDistricts('COMM_11_ALPUKAT', '35')
      const pasuruan = districts.find((d) => d.kabupaten.includes('Pasuruan'))

      expect(pasuruan).toBeDefined()
      expect(pasuruan?.production_ton).toBe(105800)
      expect(pasuruan?.yield_ton_per_ha).toBeCloseTo(21.59, 1)
    })

    it('verifies Tembakau Jawa Timur benchmark (Pamekasan, Sumenep)', () => {
      const districts = getProvinceDistricts('COMM_12_TEMBAKAU', '35')
      const pamekasan = districts.find((d) => d.kabupaten.includes('Pamekasan'))

      expect(pamekasan).toBeDefined()
      expect(pamekasan?.harvest_area_ha).toBe(34500)
      expect(pamekasan?.production_ton).toBe(37605)
    })

    it('verifies Anggrek Banten benchmark (Tangerang Selatan)', () => {
      const districts = getProvinceDistricts('COMM_13_ANGGREK', '36')
      const tangsel = districts.find((d) => d.kabupaten.includes('Tangerang Selatan'))

      expect(tangsel).toBeDefined()
      expect(tangsel?.production_ton).toBe(1005)
      expect(tangsel?.status).toBe('SENTRA_UTAMA_1')
    })
  })
})
