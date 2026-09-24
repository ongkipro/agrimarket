import { describe, it, expect } from 'vitest'
import {
  getProductsCatalog,
  getProductById,
  getMixMatchRules,
  getMonthlyProductCampaigns,
  getProductMindmapDiagram,
} from './data-provider'

describe('Products Catalog Intelligence & Climate-Commercial Engine', () => {
  it('validates 4 strategic product dossiers completeness', () => {
    const products = getProductsCatalog()
    expect(products).toHaveLength(4)

    const expectedIds = ['aussie', 'bensu', 'saratoga', 'kojien']
    expect(products.map((p) => p.id)).toEqual(expectedIds)

    products.forEach((prod) => {
      // Identity & Classification
      expect(prod.id).toBeTruthy()
      expect(prod.name).toBeTruthy()
      expect(prod.shortTitle).toBeTruthy()
      expect(prod.categoryLabel).toBeTruthy()
      expect(prod.badgeVariant).toMatch(/^(rose|amber|indigo|emerald)$/)
      expect(prod.targetCommodityLabels.length).toBeGreaterThan(0)

      // Formula & Biological Mechanism
      expect(prod.formulaConcept).toBeTruthy()
      expect(prod.brandMechanism.length).toBeGreaterThan(30)
      expect(prod.composition.length).toBeGreaterThanOrEqual(3)
      prod.composition.forEach((ing) => {
        expect(ing.item).toBeTruthy()
        expect(ing.value).toBeTruthy()
        expect(ing.function).toBeTruthy()
      })

      // Severity Levels & Damage Scale (Stage 1-4)
      expect(prod.severityLevels.length).toBeGreaterThanOrEqual(3)
      prod.severityLevels.forEach((lvl) => {
        expect(lvl.stage).toBeTruthy()
        expect(lvl.title).toBeTruthy()
        expect(lvl.symptoms).toBeTruthy()
        expect(lvl.prognosis).toBeTruthy()
        expect(lvl.recommendedDosage).toBeTruthy()
        expect(lvl.actionProtocol).toBeTruthy()
      })

      // Dosage & Application Matrix
      expect(prod.dosageMatrix.length).toBeGreaterThanOrEqual(2)
      prod.dosageMatrix.forEach((d) => {
        expect(d.cropOrPhase).toBeTruthy()
        expect(d.timing).toBeTruthy()
        expect(d.dosagePerLiter).toBeTruthy()
        expect(d.applicationMethod).toMatch(
          /^(FOLIAR_SPRAY|SOIL_DRENCH|TRUNK_DRENCH|PASTE_COATING)$/
        )
        expect(d.intervalDays).toBeGreaterThan(0)
        expect(d.keyNotes).toBeTruthy()
      })

      // Demographics & BPS Production Baselines
      expect(prod.demographics.persona.roleTitle).toBeTruthy()
      expect(prod.demographics.persona.acreageProfile).toBeTruthy()
      expect(prod.demographics.persona.buyingMotivator).toBeTruthy()
      expect(prod.demographics.persona.coreFear).toBeTruthy()
      expect(prod.demographics.sentraHubs.length).toBeGreaterThanOrEqual(3)
      prod.demographics.sentraHubs.forEach((hub) => {
        expect(hub.province).toBeTruthy()
        expect(hub.regencies.length).toBeGreaterThan(0)
        expect(hub.soilAndClimateNote).toBeTruthy()
      })

      // Commercial & Customer Support Decision Tree
      expect(prod.commercialPillars.heroOffers.length).toBeGreaterThan(0)
      expect(prod.commercialPillars.pricingStrategy).toBeTruthy()
      expect(
        prod.commercialPillars.csDecisionTree.length
      ).toBeGreaterThanOrEqual(2)
      expect(
        prod.commercialPillars.objectionHandling.length
      ).toBeGreaterThanOrEqual(2)
      prod.commercialPillars.objectionHandling.forEach((o) => {
        expect(o.objection).toBeTruthy()
        expect(o.rebuttle).toBeTruthy()
      })

      // Climate Calibration (2026 El Nino vs 2027 La Nina)
      expect(prod.climateIntegration.elNino2026Role).toBeTruthy()
      expect(prod.climateIntegration.laNina2027Role).toBeTruthy()
      expect(prod.climateIntegration.goldenApplicationWindows).toBeTruthy()

      // Meta Ads Playbook
      expect(prod.metaAdsPlaybook.coreHooks.length).toBeGreaterThanOrEqual(1)
      expect(
        prod.metaAdsPlaybook.targetingInterests.length
      ).toBeGreaterThanOrEqual(2)
      expect(prod.metaAdsPlaybook.exclusions.length).toBeGreaterThanOrEqual(1)
      prod.metaAdsPlaybook.coreHooks.forEach((hook) => {
        expect(hook.angleId).toBeTruthy()
        expect(hook.angleName).toBeTruthy()
        expect(hook.primaryHeadline).toBeTruthy()
        expect(hook.hookQuestion).toBeTruthy()
        expect(hook.bodyCopy).toBeTruthy()
        expect(hook.callToAction).toBeTruthy()
      })

      // FAQs
      expect(prod.faqs.length).toBeGreaterThanOrEqual(2)
      prod.faqs.forEach((faq) => {
        expect(faq.question).toBeTruthy()
        expect(faq.answer).toBeTruthy()
        expect(faq.category).toMatch(
          /^(APPLICATION|INGREDIENTS|COMPATIBILITY|COMMERCIAL)$/
        )
      })
    })
  })

  it('retrieves single product by id correctly', () => {
    const aussie = getProductById('aussie')
    expect(aussie).toBeDefined()
    expect(aussie?.name).toContain('AUSSIE Sawit')
    expect(aussie?.badgeVariant).toBe('rose')

    const bensu = getProductById('bensu')
    expect(bensu).toBeDefined()
    expect(bensu?.name).toContain('BENSU')
    expect(bensu?.badgeVariant).toBe('amber')

    const saratoga = getProductById('saratoga')
    expect(saratoga).toBeDefined()
    expect(saratoga?.name).toContain('SARATOGA')
    expect(saratoga?.badgeVariant).toBe('indigo')

    const kojien = getProductById('kojien')
    expect(kojien).toBeDefined()
    expect(kojien?.name).toContain('KOJIEN')
    expect(kojien?.badgeVariant).toBe('emerald')

    const invalid = getProductById('non-existent')
    expect(invalid).toBeUndefined()
  })

  it('validates 5 field-tested mix & match synergy protocols', () => {
    const rules = getMixMatchRules()
    expect(rules.length).toBeGreaterThanOrEqual(5)

    rules.forEach((rule) => {
      expect(rule.id).toMatch(/^MM-/)
      expect(rule.cropCategory).toBeTruthy()
      expect(rule.cropNames.length).toBeGreaterThan(0)
      expect(rule.growthStage).toBeTruthy()
      expect(['aussie', 'bensu', 'saratoga', 'kojien']).toContain(
        rule.primaryProduct
      )
      expect(rule.synergyDescription).toBeTruthy()
      expect(rule.sequenceProtocol).toBeTruthy()
      expect(rule.tankMixSafety).toMatch(
        /^(COMPATIBLE|APPLY_SEPARATELY|DO_NOT_MIX)$/
      )
      expect(rule.tankMixGuidelines).toBeTruthy()
    })

    // Specifically test Vegetable synergy rule (Bensu + Saratoga)
    const hortiRule = rules.find((r) => r.id === 'MM-HORTI-01')
    expect(hortiRule).toBeDefined()
    expect(hortiRule?.primaryProduct).toBe('bensu')
    expect(hortiRule?.partnerProduct).toBe('saratoga')

    // Specifically test Paddy synergy rule (Kojien + Saratoga)
    const paddyRule = rules.find((r) => r.id === 'MM-PADI-02')
    expect(paddyRule).toBeDefined()
    expect(paddyRule?.primaryProduct).toBe('kojien')
    expect(paddyRule?.partnerProduct).toBe('saratoga')

    // Specifically test Oil Palm synergy rule (Aussie)
    const palmRule = rules.find((r) => r.id === 'MM-SAWIT-03')
    expect(palmRule).toBeDefined()
    expect(palmRule?.primaryProduct).toBe('aussie')

    // Specifically test Corn synergy rule (Kojien + Bensu)
    const cornRule = rules.find((r) => r.id === 'MM-JAGUNG-04')
    expect(cornRule).toBeDefined()
    expect(cornRule?.primaryProduct).toBe('kojien')
    expect(cornRule?.partnerProduct).toBe('bensu')

    // Specifically test Shallots synergy rule (Bensu + Saratoga)
    const shallotRule = rules.find((r) => r.id === 'MM-BAWANG-05')
    expect(shallotRule).toBeDefined()
    expect(shallotRule?.primaryProduct).toBe('bensu')
    expect(shallotRule?.partnerProduct).toBe('saratoga')
  })

  it('validates 15-month dynamic climate-synchronized campaign roadmap', () => {
    const campaigns = getMonthlyProductCampaigns()
    expect(campaigns).toHaveLength(15)

    // Month index sequence from 1 to 15
    campaigns.forEach((camp, idx) => {
      expect(camp.monthIndex).toBe(idx + 1)
      expect(camp.year).toBeGreaterThanOrEqual(2026)
      expect(camp.year).toBeLessThanOrEqual(2027)
      expect(camp.monthName).toBeTruthy()
      expect(camp.quarterLabel).toContain(camp.year.toString())
      expect(camp.climatePhenomenon).toBeTruthy()
      expect(['aussie', 'bensu', 'saratoga', 'kojien']).toContain(
        camp.heroProduct
      )
      if (camp.secondaryProduct) {
        expect(['aussie', 'bensu', 'saratoga', 'kojien']).toContain(
          camp.secondaryProduct
        )
      }
      expect(camp.campaignTheme).toBeTruthy()
      expect(camp.headlineHook).toBeTruthy()
      expect(camp.estimatedDemandIndex).toBeGreaterThanOrEqual(50)
      expect(camp.estimatedDemandIndex).toBeLessThanOrEqual(100)
      expect(camp.targetSentraProvinces.length).toBeGreaterThan(0)
      expect(camp.commercialActionKios).toBeTruthy()
      expect(camp.fieldAgronomistAction).toBeTruthy()
    })

    // Year distribution: Oct-Dec 2026 (3 months) and Jan-Dec 2027 (12 months)
    const c2026 = campaigns.filter((c) => c.year === 2026)
    const c2027 = campaigns.filter((c) => c.year === 2027)
    expect(c2026).toHaveLength(3)
    expect(c2027).toHaveLength(12)
  })

  it('validates Mermaid mindmap diagram architecture', () => {
    const mindmap = getProductMindmapDiagram()
    expect(mindmap).toBeTruthy()
    expect(mindmap).toContain('mindmap')
    expect(mindmap).toContain('Ekosistem Produk Agrimarket')
    expect(mindmap).toContain('AUSSIE')
    expect(mindmap).toContain('BENSU')
    expect(mindmap).toContain('SARATOGA')
    expect(mindmap).toContain('KOJIEN')
  })
})
