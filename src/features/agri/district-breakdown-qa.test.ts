import { describe, it, expect } from 'vitest'
import { getCommodities } from './data-provider'
import {
  getProvinceDistricts,
  getProvinceDistrictSummary,
  PROVINCE_DEFAULT_REGENCIES,
  VERIFIED_SUBDISTRICT_CLUSTERS,
} from './province-districts-data'

describe('Comprehensive QA Audit: District-Level Geospatial Breakdown & Census Data Engine', () => {
  const commodities = getCommodities()

  describe('National Administrative Census & Roster Completeness', () => {
    it('should cover all 38 Indonesian provinces in PROVINCE_DEFAULT_REGENCIES', () => {
      const provinceCodes = Object.keys(PROVINCE_DEFAULT_REGENCIES)
      expect(provinceCodes.length).toBe(38)
    })

    it('should total exactly 514 official Kabupaten & Kota across all 38 provinces', () => {
      const allRegencies = Object.values(PROVINCE_DEFAULT_REGENCIES).flat()
      expect(allRegencies.length).toBe(514)

      // Ensure no empty or whitespace-only names
      allRegencies.forEach((r) => {
        expect(r.trim().length).toBeGreaterThan(2)
      })
    })

    it('should have exact official regency counts for key benchmark provinces', () => {
      expect(PROVINCE_DEFAULT_REGENCIES['32'].length).toBe(27) // Jawa Barat (18 Kab + 9 Kota)
      expect(PROVINCE_DEFAULT_REGENCIES['33'].length).toBe(35) // Jawa Tengah (29 Kab + 6 Kota)
      expect(PROVINCE_DEFAULT_REGENCIES['35'].length).toBe(38) // Jawa Timur (29 Kab + 9 Kota)
      expect(PROVINCE_DEFAULT_REGENCIES['12'].length).toBe(33) // Sumatera Utara (25 Kab + 8 Kota)
      expect(PROVINCE_DEFAULT_REGENCIES['73'].length).toBe(24) // Sulawesi Selatan (21 Kab + 3 Kota)
      expect(PROVINCE_DEFAULT_REGENCIES['11'].length).toBe(23) // Aceh (18 Kab + 5 Kota)
      expect(PROVINCE_DEFAULT_REGENCIES['53'].length).toBe(22) // NTT (21 Kab + 1 Kota)
      expect(PROVINCE_DEFAULT_REGENCIES['16'].length).toBe(17) // Sumatera Selatan (13 Kab + 4 Kota)
      expect(PROVINCE_DEFAULT_REGENCIES['18'].length).toBe(15) // Lampung (13 Kab + 2 Kota)
      expect(PROVINCE_DEFAULT_REGENCIES['14'].length).toBe(12) // Riau (10 Kab + 2 Kota)
      expect(PROVINCE_DEFAULT_REGENCIES['52'].length).toBe(10) // NTB (8 Kab + 2 Kota)
      expect(PROVINCE_DEFAULT_REGENCIES['51'].length).toBe(9)  // Bali (8 Kab + 1 Kota)
      expect(PROVINCE_DEFAULT_REGENCIES['31'].length).toBe(6)  // DKI Jakarta (1 Kab + 5 Kota)
      expect(PROVINCE_DEFAULT_REGENCIES['34'].length).toBe(5)  // DI Yogyakarta (4 Kab + 1 Kota)
    })
  })

  describe('Gate-0 Mathematical Balancing: Zero-Delta Reconciliation', () => {
    it('guarantees district production sums exactly equal provincial production (delta <= 1 ton)', () => {
      for (const crop of commodities) {
        for (const prov of crop.provincial_data) {
          if (prov.production_ton <= 0) continue

          const districts = getProvinceDistricts(crop.id, prov.province_code)
          const sumProduction = districts.reduce((acc, d) => acc + d.production_ton, 0)
          const diff = Math.abs(sumProduction - prov.production_ton)

          expect(diff).toBeLessThanOrEqual(1)
        }
      }
    })

    it('guarantees district harvest area sums exactly equal provincial harvest area (delta <= 1 ha)', () => {
      for (const crop of commodities) {
        for (const prov of crop.provincial_data) {
          if (prov.harvest_area_ha <= 0) continue

          const districts = getProvinceDistricts(crop.id, prov.province_code)
          const sumArea = districts.reduce((acc, d) => acc + d.harvest_area_ha, 0)
          const diff = Math.abs(sumArea - prov.harvest_area_ha)

          expect(diff).toBeLessThanOrEqual(1)
        }
      }
    })

    it('guarantees district percentage shares sum to exactly 100% (+/- 0.2% due to rounding display)', () => {
      for (const crop of commodities) {
        for (const prov of crop.provincial_data) {
          if (prov.production_ton <= 0) continue

          const districts = getProvinceDistricts(crop.id, prov.province_code)
          const sumPct = districts.reduce((acc, d) => acc + d.pct_of_province, 0)

          expect(sumPct).toBeGreaterThanOrEqual(99.8)
          expect(sumPct).toBeLessThanOrEqual(100.2)
        }
      }
    })
  })

  describe('Sub-District Clusters (Kecamatan Sentra) Verification', () => {
    it('has verified subdistrict cluster annotations for critical hubs', () => {
      const keys = Object.keys(VERIFIED_SUBDISTRICT_CLUSTERS)
      expect(keys.length).toBeGreaterThanOrEqual(20)

      // Check Brebes Bawang Merah
      expect(VERIFIED_SUBDISTRICT_CLUSTERS['Kab. Brebes']).toContain('Larangan')
      expect(VERIFIED_SUBDISTRICT_CLUSTERS['Kab. Brebes']).toContain('Wanasari')

      // Check Indramayu Padi
      expect(VERIFIED_SUBDISTRICT_CLUSTERS['Kab. Indramayu']).toContain('Kandanghaur')

      // Check Grobogan Jagung
      expect(VERIFIED_SUBDISTRICT_CLUSTERS['Kab. Grobogan']).toContain('Toroh')

      // Check Banjarnegara Kentang (Dieng)
      expect(VERIFIED_SUBDISTRICT_CLUSTERS['Kab. Banjarnegara (Dieng)']).toContain('Batur')

      // Check Pasuruan Bromo Kentang
      expect(VERIFIED_SUBDISTRICT_CLUSTERS['Kab. Pasuruan (Tosari/Bromo)']).toContain('Tosari')

      // Check Kediri Cabai Rawit
      expect(VERIFIED_SUBDISTRICT_CLUSTERS['Kab. Kediri']).toContain('Pare')

      // Check Pamekasan Tembakau
      expect(VERIFIED_SUBDISTRICT_CLUSTERS['Kab. Pamekasan (Madura)']).toContain('Waru')
    })

    it('injects subdistrict clusters into district records during retrieval', () => {
      const brebesDistricts = getProvinceDistricts('COMM_04_BAWANG_MERAH', '33')
      const brebes = brebesDistricts.find((d) => d.kabupaten.includes('Brebes'))
      expect(brebes?.subdistrict_clusters).toBeDefined()
      expect(brebes?.subdistrict_clusters).toContain('Larangan')

      const indramayuDistricts = getProvinceDistricts('COMM_01_PADI', '32')
      const indramayu = indramayuDistricts.find((d) => d.kabupaten.includes('Indramayu'))
      expect(indramayu?.subdistrict_clusters).toBeDefined()
      expect(indramayu?.subdistrict_clusters).toContain('Kandanghaur')
    })
  })

  describe('Data Hygiene: Strict Non-Negative, Finite, and Safe Types', () => {
    it('ensures zero NaN, zero Infinity, and all positive counts across 494 points', () => {
      for (const crop of commodities) {
        for (const prov of crop.provincial_data) {
          const districts = getProvinceDistricts(crop.id, prov.province_code)
          for (const d of districts) {
            expect(Number.isFinite(d.harvest_area_ha)).toBe(true)
            expect(Number.isFinite(d.production_ton)).toBe(true)
            expect(Number.isFinite(d.yield_ton_per_ha)).toBe(true)
            expect(Number.isFinite(d.pct_of_province)).toBe(true)
            expect(Number.isFinite(d.pct_of_national)).toBe(true)
            expect(Number.isFinite(d.kpl_kiosks_count)).toBe(true)

            expect(d.harvest_area_ha).toBeGreaterThanOrEqual(0)
            expect(d.production_ton).toBeGreaterThanOrEqual(0)
            expect(d.yield_ton_per_ha).toBeGreaterThanOrEqual(0)
            expect(d.pct_of_province).toBeGreaterThanOrEqual(0)
            expect(d.pct_of_national).toBeGreaterThanOrEqual(0)
            expect(d.kpl_kiosks_count).toBeGreaterThanOrEqual(1)
          }

          const summary = getProvinceDistrictSummary(crop.id, prov.province_code)
          if (summary) {
            expect(Number.isFinite(summary.total_districts_tracked)).toBe(true)
            expect(Number.isFinite(summary.top3_pareto_pct)).toBe(true)
            expect(summary.total_districts_tracked).toBe(districts.length)
            expect(summary.top3_pareto_pct).toBeGreaterThanOrEqual(0)
            expect(summary.top3_pareto_pct).toBeLessThanOrEqual(100.1)
          }
        }
      }
    })
  })
})
