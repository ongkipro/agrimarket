/**
 * Master Data Engine: Agrochemical & Crop Performance Product Catalog
 * Authoritative ingestion of Notion product knowledge dossiers:
 * 1. AUSSIE Sawit (Recovery & Anti-Kulat Sawit)
 * 2. BENSU Hortikultura (Horticulture Recovery & Growth Restart)
 * 3. SARATOGA Plant Serum (Strategic Generative Serum / Japanese Pro-Plant Complex™)
 * 4. KOJIEN Activator (Crop Stability & Yield Support System)
 *
 * Synchronized with:
 * - BMKG 699 ZOM & ENSO Dynamics (2026 El Niño Kuat -> 2027 La Niña Lemah)
 * - 13 Strategic Commodities & BPS Geospatial Production Hubs
 * - Meta Ads Creative Playbook & 15-Month Commercial Campaign Matrix
 */

export interface ProductCompositionItem {
  item: string
  value: string
  function: string
}

export interface ProductSeverityLevel {
  stage: string
  title: string
  symptoms: string
  prognosis: string
  recommendedDosage: string
  actionProtocol: string
}

export interface ProductDosageStep {
  cropOrPhase: string
  timing: string
  dosagePerLiter: string
  applicationMethod:
    | 'FOLIAR_SPRAY'
    | 'SOIL_DRENCH'
    | 'TRUNK_DRENCH'
    | 'PASTE_COATING'
  intervalDays: number
  keyNotes: string
}

export interface RegionalSentraHub {
  province: string
  regencies: string[]
  soilAndClimateNote: string
}

export interface ProductBuyerPersona {
  roleTitle: string
  acreageProfile: string
  primaryCrops: string[]
  coreFear: string
  coreAspiration: string
  awarenessStage: 'PROBLEM_AWARE' | 'SOLUTION_AWARE' | 'PRODUCT_AWARE'
  buyingMotivator: string
}

export interface MetaAdsHookItem {
  angleId: string
  angleName: string
  targetProblem: string
  primaryHeadline: string
  hookQuestion: string
  bodyCopy: string
  callToAction: string
  suggestedCreative: string
  seasonalFit: string
}

export interface ProductCSDecisionNode {
  farmerSymptomTrigger: string
  csQuestion: string
  recommendation: string
  suggestedBundle: string
}

export interface ProductFAQItem {
  question: string
  answer: string
  category: 'APPLICATION' | 'INGREDIENTS' | 'COMPATIBILITY' | 'COMMERCIAL'
}

export interface ProductPhysicalSpecification {
  formulationType: string
  colorAndAroma: string
  density: string
  solutionPh: string
  solubility: string
  shelfLife: string
  safetyClass: string
}

export interface ProductModeOfActionStep {
  timeframe: string
  phaseName: string
  biologicalProcess: string
  farmerVisibleResult: string
}

export interface ProductDetail {
  id: 'aussie' | 'bensu' | 'saratoga' | 'kojien'
  name: string
  shortTitle: string
  subtitle: string
  categoryLabel: string
  badgeVariant: 'rose' | 'amber' | 'emerald' | 'indigo'
  targetCommodityLabels: string[]
  corePositioning: {
    en: string
    id: string
    my?: string
  }
  coreAngle: string
  internalMantra: string
  whatItIs: string[]
  whatItIsNot: string[]
  formulaConcept: string
  brandMechanism: string
  physicalSpecifications: ProductPhysicalSpecification
  modeOfActionTimeline: ProductModeOfActionStep[]
  composition: ProductCompositionItem[]
  claimGuardrails: {
    allowedPhrasing: string[]
    prohibitedPhrasing: string[]
  }
  severityLevels: ProductSeverityLevel[]
  dosageMatrix: ProductDosageStep[]
  demographics: {
    persona: ProductBuyerPersona
    sentraHubs: RegionalSentraHub[]
    malaysiaSentraHubs?: string[]
    indonesiaExpansionHubs: string[]
  }
  commercialPillars: {
    pricingStrategy: string
    heroOffers: {
      name: string
      volume: string
      priceIdr: number
      targetFarmer: string
    }[]
    proofAssets: string[]
    objectionHandling: { objection: string; rebuttle: string }[]
    csDecisionTree: ProductCSDecisionNode[]
  }
  climateIntegration: {
    elNino2026Role: string
    laNina2027Role: string
    goldenApplicationWindows: string
  }
  metaAdsPlaybook: {
    coreHooks: MetaAdsHookItem[]
    targetingInterests: string[]
    exclusions: string[]
  }
  faqs: ProductFAQItem[]
}

export interface MixMatchRule {
  id: string
  cropCategory: string
  cropNames: string[]
  growthStage: string
  primaryProduct: 'aussie' | 'bensu' | 'saratoga' | 'kojien'
  partnerProduct?: 'aussie' | 'bensu' | 'saratoga' | 'kojien'
  synergyDescription: string
  sequenceProtocol: string
  tankMixSafety: 'COMPATIBLE' | 'APPLY_SEPARATELY' | 'DO_NOT_MIX'
  tankMixGuidelines: string
}

export interface MonthlyProductCampaign {
  monthIndex: number // 1 to 15 (Oct 2026 to Dec 2027)
  year: number
  monthNumber: number
  monthName: string
  quarterLabel: string
  climatePhenomenon: string
  agroClimateImpact: string
  heroProduct: 'aussie' | 'bensu' | 'saratoga' | 'kojien'
  secondaryProduct?: 'aussie' | 'bensu' | 'saratoga' | 'kojien'
  campaignTheme: string
  headlineHook: string
  commercialActionKios: string
  fieldAgronomistAction: string
  targetSentraProvinces: string[]
  estimatedDemandIndex: number // 1-100 scale
}

export interface FieldPlaybookItem {
  id: string
  problemName: string
  problemCategory:
    | 'STRESS_CUACA'
    | 'PENYAKIT_JAMUR'
    | 'NUTRISI_GENERATIF'
    | 'PERTUMBUHAN_MANDEK'
    | 'KUALITAS_PANEN'
  categoryLabel: string
  cropCategory: string
  crops: string[]
  severityLevel: 'RINGAN' | 'SEDANG' | 'KRITIS'
  visualSymptoms: string
  rootCause: string
  peakMonths: string[]
  seasonContext: 'RENDENG_HUJAN' | 'GADU_KEMARAU' | 'PANCAROBA' | 'SEPANJANG_TAHUN'
  seasonLabel: string
  climateTrigger: string
  productPairing: {
    heroProduct: 'aussie' | 'bensu' | 'saratoga' | 'kojien'
    partnerProduct?: 'aussie' | 'bensu' | 'saratoga' | 'kojien'
    rotationProduct?: 'aussie' | 'bensu' | 'saratoga' | 'kojien'
    pairingType: 'DUO_ROTASI' | 'DUO_TANK_MIX' | 'TRIO_PROTOKOL' | 'TUNGGAL_DARURAT'
    pairingLabel: string
    synergyMechanism: string
  }
  prescription: {
    dosagePer16L: string
    dosagePerHa: string
    applicationMethod:
      | 'SEMPROT_KABUT_PAGI'
      | 'KOCOR_PERAKARAN'
      | 'OLES_PASTA_MURNI'
      | 'KOMBINASI_SEMPROT_KOCOR'
    applicationMethodLabel: string
    bestTime: string
    intervalDays: number
    roundsNeeded: number
    recoverySlaDays: string
  }
  tankMixSafety: {
    status: 'COMPATIBLE' | 'APPLY_SEPARATELY' | 'JAR_TEST_REQUIRED' | 'STRICTLY_PROHIBITED'
    guideline: string
    prohibitedMixes: string[]
  }
  commercialMetaAdsHook: {
    headline: string
    kiosAdviceScript: string
  }
}

// ==========================================
// 1. MASTER PRODUCTS CATALOG (4 SKUs)
// ==========================================

export const PRODUCTS_CATALOG: ProductDetail[] = [
  // ----------------------------------------
  // 1. AUSSIE Sawit
  // ----------------------------------------
  {
    id: 'aussie',
    name: 'AUSSIE Sawit',
    shortTitle: 'AUSSIE Sawit',
    subtitle:
      'Plant Stimulator & Bio-Recovery Khusus Kelapa Sawit (Anti-Kulat Ganoderma & Pemulihan Pokok Lemah)',
    categoryLabel: 'Plant Recovery Stimulator',
    badgeVariant: 'rose',
    targetCommodityLabels: ['Kelapa Sawit (TM & TBM)'],
    corePositioning: {
      en: 'Oil Palm Bio-Recovery System for Vascular Stem Rot & Soil Biological Rehabilitation',
      id: 'Formula terapi pemulihan biologis kelapa sawit untuk menghentikan pembusukan batang Ganoderma, mengaktifkan kembali akar serap, dan memulihkan pokok kuning lemah agar kembali produktif',
    },
    coreAngle:
      'Jangan tunggu pokok sawit tumbang mati baru dirawat. Recovery dulu akarnya, baru hasil panen TBS kembali normal.',
    internalMantra:
      'AUSSIE bukan pupuk kimia NPK biasa. Ini formula terapi pemulihan biologis untuk pokok sawit yang mulai menguning, pelepah sengkleh patah pinggang, busuk pangkal batang, atau terpapar jamur Ganoderma.',
    whatItIs: [
      'Plant stimulator recovery khusus tanaman kelapa sawit fase TM (Tanaman Menghasilkan) & TBM',
      'Terapi biologis pemulihan pembuluh vaskular xilem-floem yang tersumbat miselium jamur Ganoderma',
      'Bio-fungistatik konsentrat tinggi penghenti pembusukan basah pada pangkal batang sawit',
      'Bio-rehabilitator tanah gambut dan mineral masam untuk mengembalikan aktivitas mikroba baik',
      'Dapat diaplikasikan lewat oles pasta murni pada luka batang, siram piringan pokok, maupun kocor lubang tanam',
    ],
    whatItIsNot: [
      'Bukan pupuk NPK makro kimia butiran biasa pengganti pupuk dasar',
      'Bukan booster pemacu buah instan tanpa memperbaiki kesehatan akar',
      'Bukan racun kontak pestisida kimia sintetis keras yang mematikan cacing tanah',
      'Bukan insektisida pembasmi ulat api atau kumbang tanduk Oryctes',
      'Bukan formula ajaib yang bisa menghidupkan kembali pokok yang sudah tumbang membusuk 100%',
    ],
    formulaConcept: 'Organic Bio-Defense & Vascular Restorer System',
    brandMechanism:
      'Dual-Action Vascular Restorer & Root Cell Activator — Bekerja secara sistemik lokal menembus jaringan korteks batang untuk mengisolasi hifa jamur Ganoderma boninense, meregenerasi pembuluh tapis yang rusak, dan merangsang pertumbuhan ratusan serabut akar adventif baru dalam 14-21 hari.',
    physicalSpecifications: {
      formulationType: 'Cairan Pekat Larut Air (Soluble Liquid / SL)',
      colorAndAroma: 'Hitam kecokelatan pekat, aroma khas ekstrak gambut & bio-asam organik',
      density: '1.18 - 1.22 g/cm³',
      solutionPh: '6.0 - 7.0 (Netral terkelat, ramah mikroba tanah)',
      solubility: '100% larut sempurna dalam air tawar tanpa endapan ampas',
      shelfLife: '24 Bulan pada suhu ruang teduh tertutup rapat',
      safetyClass: 'Kelas IV (Label Hijau - Aman & Ramah Lingkungan)',
    },
    modeOfActionTimeline: [
      {
        timeframe: 'Jam 0 - 4',
        phaseName: 'Penetrasi Jaringan Kambium & Korteks',
        biologicalProcess:
          'Formula aktif menembus serat sabut pangkal batang dan dinding sel akar melalui bantuan penetran organik alami tanpa merusak jaringan pelindung.',
        farmerVisibleResult:
          'Cairan meresap merata ke dasar luka batang yang dikikis; bau busuk asam pada luka mulai berkurang.',
      },
      {
        timeframe: 'Hari 3 - 7',
        phaseName: 'Inhibisi Hifa Jamur & Penurunan Toksin',
        biologicalProcess:
          'Senyawa fenolik bio-fungistatik mengikat membran hifa Ganoderma, memblokir sekresi enzim selulase jamur yang memakan jaringan kayu.',
        farmerVisibleResult:
          'Luka basah di pangkal batang mengering, lendir pembusukan berhenti, dan tepi luka mulai membentuk kalus kering.',
      },
      {
        timeframe: 'Hari 14 - 21',
        phaseName: 'Regenerasi Akar Adventif & Translokasi Hara',
        biologicalProcess:
          'Asam humat dan fito-aktivator memicu diferensiasi sel perisikel akar, membentuk jaringan akar lateral baru yang aktif menyerap air dan hara.',
        farmerVisibleResult:
          'Di piringan pohon mulai muncul akar rambut putih segar; pelepah bawah berhenti layu patah.',
      },
      {
        timeframe: 'Hari 28 - 45',
        phaseName: 'Pembukaan Daun Tombak & Pemulihan Tajuk',
        biologicalProcess:
          'Aliran fotosintat dan translokasi air dari akar pulih maksimal; klorofil daun tua kembali aktif dan meristem pucuk aktif membelah.',
        farmerVisibleResult:
          'Daun tombak muda (spear leaf) yang semula macet mulai terdorong naik dan membuka hijau segar kokoh.',
      },
    ],
    composition: [
      {
        item: 'Asam Humat & Fulvat Bio-Grade Terfraksinasi',
        value: '22.5%',
        function:
          'Meningkatkan Kapasitas Tukar Kation (KTK) tanah gambut/mineral, mengikat unsur hara makro agar tidak tercuci, dan menstabilkan pH perakaran sawit.',
      },
      {
        item: 'Senyawa Fenolik Bio-Fungistatik & Metabolit Sekunder',
        value: '15.0%',
        function:
          'Menghambat perkecambahan spora dan mematikan hifa jamur patogen vaskular (Ganoderma boninense, Marasmius palmivorus, Thielaviopsis).',
      },
      {
        item: 'Silika Bio-Available & Kalium Terionisasi',
        value: '10.0%',
        function:
          'Mempertebal dan mengeraskan dinding sel korteks batang sawit sehingga tidak mudah ditembus kembali oleh spora jamur dari tanah.',
      },
      {
        item: 'Kelat Unsur Mikro Esensial (Zn, Cu, B, Fe, Mn)',
        value: '8.5%',
        function:
          'Memulihkan defisiensi unsur hara mikro penyebab klorosis pelepah, daun bintik oranye (orange spotting), dan daun tombak patah pinggang.',
      },
      {
        item: 'Bio-Aktivator Perakaran Adventif Alami',
        value: '6.0%',
        function:
          'Merangsang perbanyakan sel meristem akar serap serabut baru untuk memompa air saat kekeringan tajam El Niño.',
      },
      {
        item: 'Natural Surfactant & Wood-Penetrating Carrier',
        value: 'q.s to 100%',
        function:
          'Memastikan larutan mampu meresap ke dalam pori-pori sabut kayu batang sawit tua yang mengeras.',
      },
    ],
    claimGuardrails: {
      allowedPhrasing: [
        'Membantu mendukung pemulihan pokok sawit yang lemah, menguning, dan stres pelepah patah',
        'Membantu merawat pangkal batang yang terserang busuk jamur Ganoderma stadium awal hingga sedang',
        'Membantu merangsang pertumbuhan akar rambut baru pada piringan pokok sawit',
        'Membantu memblokir penularan spora jamur Ganoderma ke pokok sehat sekitarnya',
        'Formula organik aman untuk tanah gambut maupun tanah mineral masam',
      ],
      prohibitedPhrasing: [
        'Obat dewa 100% mematikan jamur Ganoderma dalam 1 hari',
        'Menjamin pokok sawit yang batangnya sudah patah roboh bisa hidup kembali',
        'Menggantikan seluruh kebutuhan pupuk NPK kebun selamanya',
        'Membunuh hama ulat api dan babi hutan secara instan',
        'Pemberantas total jamur tanpa perlu sanitasi kebun',
      ],
    },
    severityLevels: [
      {
        stage: 'Level 1',
        title: 'Stres Awal & Pelepah Bawah Kusam Menguning',
        symptoms:
          '1 pelepah bagian bawah menguning kusam dan terkulai lemas; daun tombak muda sedikit lambat membuka namun batang masih sangat kokoh tanpa bekas jamur.',
        prognosis: 'Peluang pemulihan 95-100% dalam 14 - 21 hari dengan aplikasi siram piringan akar.',
        recommendedDosage: '100 - 150 ml AUSSIE dilarutkan dalam 3-5 liter air tawar per pokok.',
        actionProtocol:
          'Bersihkan piringan dari gulma tebal, siramkan larutan melingkar pada radius 1 meter dari pangkal batang. Ulangi aplikasi 14 hari kemudian.',
      },
      {
        stage: 'Level 2',
        title: 'Pelepah Sengkleh Menggantung Seperti Payung Terbalik',
        symptoms:
          '2 hingga 4 pelepah bawah patah di bagian tengah pelepah (sengkleh) dan menggantung mengering; daun pucuk berwarna hijau pucat kekuningan.',
        prognosis: 'Peluang pemulihan 80-90% dalam 21 - 30 hari; membutuhkan kombinasi oles dan siram akar.',
        recommendedDosage: '150 - 200 ml AUSSIE per pokok (konsentrasi larutan siram 1:20 air).',
        actionProtocol:
          'Kikis pelepah kering yang membusuk di pangkal, kuaskan 50 ml AUSSIE murni pada pangkal pelepah, lalu siramkan 150 ml sisanya yang dilarutkan air ke piringan.',
      },
      {
        stage: 'Level 3',
        title: 'Muncul Tubuh Buah Ganoderma (Kulat Tapal Kuda)',
        symptoms:
          'Terlihat tubuh buah jamur Ganoderma berwarna cokelat mengkilap seperti tapal kuda di pangkal batang (diameter < 15 cm); jaringan kayu pangkal mulai melunak basah.',
        prognosis: 'Peluang penyelamatan 65-75% jika batang pokok belum goyang dan busuk melingkar < 40%.',
        recommendedDosage: '200 - 250 ml AUSSIE murni untuk oles luka + 200 ml larutan kocor piringan.',
        actionProtocol:
          'Kikis dan buang seluruh tubuh buah jamur beserta jaringan busuk sampai terlihat kayu keras yang bersih. Oleskan AUSSIE murni tanpa encer menggunakan kuas secara tebal. Kocor piringan pokok dan pokok tetangganya.',
      },
      {
        stage: 'Level 4',
        title: 'Busuk Melingkar Berat & Batang Goyang (Stadium Kritis)',
        symptoms:
          'Pembusukan melingkari pangkal batang > 50%; pokok bergoyang saat didorong; daun tombak kering kecokelatan tidak membuka sama sekali.',
        prognosis: 'Pokok tidak ekonomis dipertahankan; prioritas tindakan dialihkan ke karantina blok pencegahan.',
        recommendedDosage: '300 ml AUSSIE untuk sanitasi tunggul tebang + 150 ml kocor pada 4 pokok sehat sekelilingnya.',
        actionProtocol:
          'Tebang dan bakar pokok yang sudah lapuk agar spora tidak terbang terbawa angin. Oleskan AUSSIE murni pada bekas tunggul, dan segera kocor 4 pokok sehat di sekitarnya dalam radius 12 meter.',
      },
    ],
    dosageMatrix: [
      {
        cropOrPhase: 'Pokok Sawit Menghasilkan (TM) Sakit Sedang-Berat',
        timing: 'Kapan saja saat gejala ditemukan (diutamakan pagi/sore hari)',
        dosagePerLiter: '50 - 100 ml / Liter air (atau murni untuk luka batang)',
        applicationMethod: 'TRUNK_DRENCH',
        intervalDays: 14,
        keyNotes:
          'Kikis kulat jamur sampai bersih, oleskan AUSSIE murni pada luka batang, lalu kocor 200 ml dilarutkan dalam 4-5 liter air di sekeliling piringan.',
      },
      {
        cropOrPhase: 'Pokok Sawit Belum Menghasilkan (TBM) & Bibit Main Nursery',
        timing: 'Fase pindah tanam ke lapangan atau saat bibit stres menguning',
        dosagePerLiter: '10 - 20 ml / Liter air',
        applicationMethod: 'SOIL_DRENCH',
        intervalDays: 21,
        keyNotes:
          'Siramkan 500 ml larutan per polibeg bibit atau 1-2 liter larutan pada lubang tanam sebelum bibit dimasukkan ke tanah.',
      },
      {
        cropOrPhase: 'Karantina Blok / Pencegahan Pokok Sehat Sekitar Serangan',
        timing: 'Bersamaan dengan perawatan pokok sakit Ganoderma',
        dosagePerLiter: '20 - 30 ml / Liter air',
        applicationMethod: 'SOIL_DRENCH',
        intervalDays: 30,
        keyNotes:
          'Kocor 100 ml AUSSIE dalam 5 liter air per pokok pada pokok sehat dalam radius 12 meter (blok karantina) untuk memblokir penularan spora jamur melalui kontak akar tanah.',
      },
      {
        cropOrPhase: 'Perawatan Pencegahan Pasca Banjir / Genangan Gambut',
        timing: 'Saat air genangan mulai surut dan tanah masih lembab',
        dosagePerLiter: '25 ml / Liter air',
        applicationMethod: 'SOIL_DRENCH',
        intervalDays: 30,
        keyNotes:
          'Kocor piringan pokok untuk menetralisir keasaman air rendaman dan mencegah infeksi jamur busuk akar sekunder.',
      },
      {
        cropOrPhase: 'Pemeliharaan Rutin Kekeringan Ekstrem El Niño 2026',
        timing: 'Awal kemarau (Mei - Juni) dan puncak kemarau (Agustus)',
        dosagePerLiter: '20 ml / Liter air',
        applicationMethod: 'SOIL_DRENCH',
        intervalDays: 60,
        keyNotes:
          'Asam humat dan osmoprotektan menjaga kelembaban mikro perakaran sawit agar akar rambut tidak mati terbakar terik matahari.',
      },
    ],
    demographics: {
      persona: {
        roleTitle: 'Pekebun Sawit Swadaya Mandiri / Petani Plasma',
        acreageProfile: 'Memiliki kebun kelapa sawit pribadi seluas 8 - 35 Hektar (umur tanaman 7 - 18 tahun)',
        primaryCrops: ['Kelapa Sawit Varietas Marihat, Dumpy, PPKS Simalungun/Yangambi'],
        coreFear:
          'Ketakutan terbesar: Pokok sawit mati bertumbangan satu per satu karena jamur Ganoderma, kehilangan penghasilan bulanan puluhan juta rupiah, dan terpaksa keluar biaya replanting ratusan juta.',
        coreAspiration:
          'Ingin pokok sawit yang sakit bisa disembuhkan kembali hijau dan produktif menghasilkan tandan buah segar (TBS) berat tanpa perlu dibongkar kebunnya.',
        awarenessStage: 'PROBLEM_AWARE',
        buyingMotivator:
          'Efisiensi biaya nyata: Biaya pemulihan AUSSIE hanya sekitar Rp 50.000 - Rp 100.000 per pokok, jauh lebih murah dibanding rugi kehilangan 1 pokok produktif bernilai Rp 1.500.000/tahun.',
      },
      sentraHubs: [
        {
          province: 'Riau',
          regencies: ['Kampar', 'Rokan Hulu', 'Rokan Hilir', 'Siak', 'Pelalawan', 'Indragiri Hulu'],
          soilAndClimateNote:
            'Sentra kelapa sawit terbesar di Indonesia (lahan gambut tebal dan mineral masam berpasir pH 3.8 - 4.8); endemik Ganoderma boninense tertinggi pada kebun generasi kedua.',
        },
        {
          province: 'Sumatera Utara',
          regencies: ['Labuhanbatu', 'Labuhanbatu Utara', 'Asahan', 'Simalungun', 'Deli Serdang'],
          soilAndClimateNote:
            'Kebun sawit rakyat dan swasta tertua di Indonesia; tanah ultisol/latosol masam; serangan jamur vaskular mencapai > 25% pada blok tanaman tua.',
        },
        {
          province: 'Sumatera Selatan',
          regencies: ['Banyuasin', 'Musi Banyuasin', 'Ogan Komering Ilir (OKI)', 'Muara Enim'],
          soilAndClimateNote:
            'Kawasan pasang surut dan gambut pedalaman; fluktuasi air ekstrem antara banjir rendaman musim hujan dan kekeringan mudah terbakar saat El Niño.',
        },
        {
          province: 'Kalimantan Barat',
          regencies: ['Ketapang', 'Sanggau', 'Landak', 'Sekadau', 'Kubu Raya'],
          soilAndClimateNote:
            'Ekspansi perkebunan kelapa sawit rakyat terluas di Kalimantan; tanah podsolik merah kuning dengan defisiensi unsur hara mikro magnesium dan boron tinggi.',
        },
        {
          province: 'Kalimantan Tengah',
          regencies: ['Kotawaringin Barat', 'Kotawaringin Timur', 'Seruyan', 'Katingan'],
          soilAndClimateNote:
            'Sentra produksi CPO utama Kalimantan; tanah pasir kuarsa dan gambut dangkal yang mengalami penurunan muka air tanah drastis saat kemarau kering.',
        },
      ],
      indonesiaExpansionHubs: [
        'Jambi (Muaro Jambi, Tanjung Jabung Barat, Merangin)',
        'Aceh (Nagan Raya, Aceh Tamiang, Aceh Timur)',
        'Kalimantan Timur (Paser, Kutai Kartanegara, Kutai Timur)',
        'Kalimantan Selatan (Tanah Bumbu, Kotabaru)',
        'Sulawesi Barat (Pasangkayu, Mamuju Tengah)',
        'Sumatera Barat (Dharmasraya, Pasaman Barat)',
        'Papua Barat (Manokwari, Sorong)',
      ],
    },
    commercialPillars: {
      pricingStrategy:
        'Value-based insurance pricing. Memposisikan AUSSIE sebagai asuransi aset bernilai tinggi: satu jerigen AUSSIE 4 Liter seharga Rp 480.000 mampu mengkarantina dan menyelamatkan 20-30 pokok sawit bernilai puluhan juta rupiah.',
      heroOffers: [
        {
          name: 'Paket Emergency Cek Pokok (Trial 1 Liter)',
          volume: '1.000 ml Botol Segel',
          priceIdr: 135000,
          targetFarmer: 'Petani sawit pemula yang ingin menguji coba pada 5-7 pokok sakit di kebunnya.',
        },
        {
          name: 'Paket Karantina Blok Kebun (Jerigen 4 Liter)',
          volume: '4.000 ml Jerigen Segel Hemat',
          priceIdr: 480000,
          targetFarmer: 'Pekebun sawit pemilik lahan 2-10 Ha untuk perawatan intensif 20-30 pokok sakit.',
        },
        {
          name: 'Paket Kemitraan Kios & Kelompok Tani (Karton 4x4L)',
          volume: '16.000 ml (4 Jerigen @ 4 Liter)',
          priceIdr: 1750000,
          targetFarmer: 'Kios saprotan daerah sentra sawit dan koperasi unit desa (KUD) perkebunan.',
        },
      ],
      proofAssets: [
        'Dokumentasi foto perbandingan pokok sawit di Kampar Riau: Hari 0 (pelepah sengkleh) vs Hari 21 (pucuk tombak membuka hijau tegap)',
        'Video tutorial cara mengikis jamur kulat batang dan menguaskan AUSSIE murni tanpa encer',
        'Laporan uji laboratorium daya hambat miselium Ganoderma boninense pada cawan petri',
        'Testimoni video ketua kelompok tani plasma Labuhanbatu Sumut',
        'Kalkulator interaktif simulasi kerugian replanting vs biaya recovery AUSSIE',
      ],
      objectionHandling: [
        {
          objection: 'Sawit saya sudah ada jamur tapal kudanya, bukannya kata PPL kalau kena Ganoderma harus langsung ditebang?',
          rebuttle:
            'Betul jika dibiarkan tanpa diobati, pokok pasti roboh dan menulari pokok sebelahnya lewat akar tanah. Tapi jika batangnya masih kokoh, Ganoderma baru merusak bagian luar korteks. Segera kikis bersih jamurnya sampai kayu bersih, kuaskan AUSSIE murni untuk mematikan hifa yang tersisa, lalu kocor akarnya agar tumbuh akar serap baru. Sudah ratusan pokok tertolong sebelum terlanjur roboh.',
        },
        {
          objection: 'Apakah AUSSIE bisa menggantikan pupuk NPK kebun saya?',
          rebuttle:
            'Bukan pengganti pupuk NPK Pak. AUSSIE adalah obat pemulihan (hospital treatment). Ibarat tanaman sedang sakit demam dan luka dalam, jika langsung dijejali pupuk kimia dosis tinggi, akarnya malah gosong keracunan. Gunakan AUSSIE dulu untuk memulihkan perakaran dan pembuluh batangnya. Setelah 3 minggu akar baru putih sudah banyak, pupuk NPK yang Bapak tabur justru akan diserap 2x lebih efektif!',
        },
        {
          objection: 'Kebun saya di lahan gambut dalam, apakah formula ini tidak hilang tercuci air masam?',
          rebuttle:
            'Justru AUSSIE diformulasikan khusus dengan asam humat dan fulvat organik tinggi yang mengikat kuat partikel gambut dan menaikkan pH mikro di sekitar perakaran. Senyawanya tidak mudah tercuci dan langsung diserap oleh pori-pori akar sawit di lahan gambut.',
        },
        {
          objection: 'Bisa tidak dicampur sekalian dengan racun rumput glifosat biar hemat ongkos semprot?',
          rebuttle:
            'DILARANG KERAS Pak! Herbisida racun rumput bekerja dengan merusak dan mematikan sel tanaman. Jika dicampur dengan AUSSIE, fungsi pemulihan sel akan rusak dan tanaman sawit Bapak malah bisa keracunan. Semprot rumput harus diberi jeda minimal 7 hari dari aplikasi AUSSIE.',
        },
      ],
      csDecisionTree: [
        {
          farmerSymptomTrigger:
            'Petani lapor daun pelepah sawit mulai menguning dan pucuk macet tidak mau membuka',
          csQuestion:
            'Sudah berapa lama menguning Pak? Coba cek di pangkal batang dekat tanah, apakah ada jamur cokelat nempel atau batangnya lembek?',
          recommendation:
            'Jika belum ada jamur luar, kondisi masuk Level 1-2. Segera kocor AUSSIE 150 ml per pokok dilarutkan air 3-4 liter sekarang juga sebelum terlambat merusak pembuluh dalam.',
          suggestedBundle: 'Paket 1 Liter untuk uji 5 pokok atau Jerigen 4 Liter untuk 25 pokok.',
        },
        {
          farmerSymptomTrigger:
            'Petani kirim foto ada jamur bentuk tapal kuda menempel di pangkal batang sawit',
          csQuestion:
            'Apakah batangnya masih kokoh saat didorong kuat Pak? Dan apakah jamurnya baru di satu sisi atau sudah melingkari batang?',
          recommendation:
            'Kondisi masuk Level 3. Selama batangnya masih kokoh, segera kikis kulatnya sampai bersih terlihat kayu keras, oleskan AUSSIE murni pakai kuas cat tanpa campur air, lalu siramkan 200 ml larutan di tanah sekelilingnya.',
          suggestedBundle: 'Paket Jerigen 4 Liter Hemat + Panduan Kuas Aplikasi.',
        },
        {
          farmerSymptomTrigger:
            'Petani panik karena ada pokok sawit tetangga kebun tumbang karena Ganoderma',
          csQuestion:
            'Jarak pokok yang tumbang dengan kebun Bapak berapa meter? Apakah berada di blok yang sama?',
          recommendation:
            'Lakukan karantina blok pencegahan segera! Spora Ganoderma menular lewat kontak akar tanah. Kocor 100 ml AUSSIE pada seluruh pokok sehat dalam radius 12 meter dari pokok yang tumbang.',
          suggestedBundle: 'Paket Kemitraan Jerigen 4L (2 Jerigen) untuk blok karantina.',
        },
      ],
    },
    climateIntegration: {
      elNino2026Role:
        'Kekeringan ekstrem El Niño 2026 menurunkan kelembaban tanah gambut dan memicu defisit air vaskular sawit. AUSSIE menjaga agar akar rambut tidak mati terbakar terik matahari dan mencegah kematian mendadak pokok lemah.',
      laNina2027Role:
        'Kemarau basah dan curah hujan tinggi La Niña 2027 menciptakan kelembaban udara jenuh (>85% RH) yang merupakan lingkungan ideal penyebaran spora Ganoderma boninense. AUSSIE diaplikasikan secara preventif untuk memblokir penularan spora antar-pokok.',
      goldenApplicationWindows:
        'Puncak kebutuhan: November-Desember (awal hujan rendeng) dan April-Juli 2027 (fase transisi hidrologis musim hujan ke kemarau basah).',
    },
    metaAdsPlaybook: {
      coreHooks: [
        {
          angleId: 'aussie-hook-01',
          angleName: 'Fear of Loss / Ganoderma Alert',
          targetProblem: 'Pokok sawit tiba-tiba menguning, pelepah sengkleh, dan mati bertumbangan',
          primaryHeadline:
            'Pokok Sawit Mulai Kuning & Pelepah Bawah Sengkleh Patah Pinggang? Jangan Dibiarkan Sampai Tumbang!',
          hookQuestion:
            'Pernah perhatikan pelepah sawit bawah patah menggantung seperti payung terbalik di kebun Anda?',
          bodyCopy:
            'Banyak pekebun mengira cuma kurang pupuk NPK, padahal jamur kulat batang dan Ganoderma sudah menggerogoti pembuluh kayu di dalam batang. Kalau dibiarkan, pokok bisa tumbang mendadak dalam hitungan bulan! Selamatkan pokok produktif Anda dengan AUSSIE Sawit: formula bio-recovery organik konsentrat tinggi yang menghentikan pembusukan batang dan merangsang perakaran baru.',
          callToAction: 'Pesan Paket Recovery Sawit Sekarang',
          suggestedCreative:
            'Video split screen: Kiri (pelepah sengkleh menguning dan jamur tapal kuda) vs Kanan (21 hari pasca kocor AUSSIE pucuk tombak membuka hijau tegap)',
          seasonalFit: 'Sepanjang Tahun (All Seasons Sentra Sawit Indonesia)',
        },
        {
          angleId: 'aussie-hook-02',
          angleName: 'Kalkulasi Replanting vs Bio-Recovery Mandiri',
          targetProblem: 'Biaya tanam ulang (replanting) mahal & hilang pendapatan TBS selama 4 tahun',
          primaryHeadline:
            'Hitung Rugi Replanting Sawit: Biaya Rp 50 Juta per Ha vs Selamatkan Pokok Produktif Pakai AUSSIE!',
          hookQuestion:
            'Pernah hitung berapa kerugian saat 1 hektar kebun sawit terpaksa dibongkar karena jamur Ganoderma?',
          bodyCopy:
            'Tanam ulang (replanting) butuh biaya Rp 40-60 juta per hektar dan menunggu 4 tahun tanpa penghasilan. Jangan buru-buru tebang! Rawat pokok produktif Anda dengan AUSSIE Sawit: formula bio-recovery konsentrat tinggi yang menghentikan pembusukan batang, merangsang akar rambut baru, dan memblokir penularan spora jamur ke pokok sehat sekelilingnya.',
          callToAction: 'Hitung Kebutuhan Recovery Kebun Anda',
          suggestedCreative:
            'Infografis kalkulator perbandingan biaya: Replanting Rp 50 Juta vs Paket Recovery AUSSIE Rp 3.5 Juta per Blok',
          seasonalFit: 'Musim Hujan Rendeng & Transisi Panen Raya',
        },
        {
          angleId: 'aussie-hook-03',
          angleName: 'Penyelamat Gambut & Musim Hujan Rendeng',
          targetProblem: 'Tanah gambut asam dan kelembaban tinggi memicu jamur Ganoderma cepat menjalar',
          primaryHeadline:
            'Tanah Gambut Asam Bikin Jamur Ganoderma Cepat Menjalar? Kunci Daya Tahan Akar Sawit Anda Sebelum Terlambat!',
          hookQuestion:
            'Pusing menghadapi tanah gambut yang asam dan gampang menularkan jamur busuk akar ke pokok tetangga?',
          bodyCopy:
            'Asam humat dan fenolik bio-fungistatik dalam AUSSIE Sawit menstabilkan pH perakaran di tanah gambut masam. Jamur Ganoderma diisolasi dan dihentikan penyebarannya sehingga pokok tetap kokoh berakar kuat dan menghasilkan buah lebat.',
          callToAction: 'Konsultasi Gratis Dokter Kebun Sawit',
          suggestedCreative:
            'Foto close-up perakaran sawit di tanah gambut yang pulih dengan serabut akar baru berwarna putih kemerahan',
          seasonalFit: 'Oktober - Februari (Musim Hujan Rendeng Sentra Riau & Kalbar)',
        },
        {
          angleId: 'aussie-hook-04',
          angleName: 'Edukasi Kios / Rekomendasi Pemilik Toko Pertanian',
          targetProblem: 'Petani bingung memilih obat jamur sawit yang benar-benar manjur',
          primaryHeadline:
            'Kios Saprotan Sentra Riau & Sumut Selalu Rekomendasikan AUSSIE untuk Atasi Pelepah Sengkleh & Ganoderma!',
          hookQuestion:
            'Kenapa ratusan kelompok tani sawit di Riau dan Sumatera Utara rutin menyediakan jerigen AUSSIE 4 Liter?',
          bodyCopy:
            'Karena formula bio-organiknya terbukti di lapangan menyelamatkan pokok sawit produktif dari ancaman tebang dini. Hubungi customer support kami untuk pemesanan langsung dengan pengiriman cepat ke kebun Anda.',
          callToAction: 'Pesan Jerigen 4 Liter Langsung',
          suggestedCreative:
            'Foto kemasan jerigen AUSSIE 4 Liter di depan deretan pokok sawit sehat di Riau',
          seasonalFit: 'Sepanjang Tahun (All Seasons)',
        },
      ],
      targetingInterests: [
        'Kelapa sawit',
        'Perkebunan kelapa sawit',
        'Petani sawit Indonesia',
        'Gabungan Pengusaha Kelapa Sawit Indonesia',
        'Pekanbaru',
        'Rokan Hulu',
        'Medan',
        'Palembang',
        'Ketapang',
        'Sampit',
        'Pontianak',
      ],
      exclusions: ['Pekerja kantoran tanpa lahan', 'Usia di bawah 25 tahun'],
    },
    faqs: [
      {
        question: 'Berapa hari setelah kocor AUSSIE terlihat tanda pemulihan pada sawit?',
        answer:
          'Pada tingkat keparahan ringan-sedang (Level 1-2), tanda visual awal terlihat pada hari ke-14 sampai 21: daun pucuk tombak muda yang semula macet mulai terdorong naik dan membuka hijau segar, getah pembusukan di pangkal batang mengering, dan muncul serabut akar rambut baru.',
        category: 'APPLICATION',
      },
      {
        question: 'Apakah tanah gambut cocok menggunakan AUSSIE Sawit?',
        answer:
          'Sangat cocok. Tanah gambut umumnya memiliki pH masam (3.5 - 4.5) yang memicu jamur berkembang pesat. Kandungan asam humat dan fulvat bio-grade pada AUSSIE menaikkan kapasitas tukar kation dan menstabilkan zona rizosfer perakaran di tanah gambut.',
        category: 'APPLICATION',
      },
      {
        question: 'Apakah AUSSIE bisa dicampur dengan herbisida pembasmi rumput (glifosat/parakuat)?',
        answer:
          'TIDAK BOLEH. Herbisida bersifat meracuni dan merusak sel tanaman. Campurkan AUSSIE hanya dengan air tawar bersih, dan berikan jeda minimal 7 hari sebelum atau sesudah penyemprotan herbisida di piringan pokok.',
        category: 'COMPATIBILITY',
      },
      {
        question: 'Bagaimana cara pengaplikasian pada pokok yang sudah ada jamur tapal kudanya?',
        answer:
          'Kikis bersih tubuh buah jamur Ganoderma menggunakan dodos atau parang sampai ke dasar kayu keras. Oleskan AUSSIE murni tanpa encer menggunakan kuas pada area luka (150-200 ml), lalu kocor 200 ml larutan AUSSIE (konsentrasi 1:20 air) di sekeliling tanah piringan akar.',
        category: 'APPLICATION',
      },
      {
        question: 'Berapa lama masa simpan (shelf life) produk AUSSIE setelah segel dibuka?',
        answer:
          'Masa simpan produk adalah 24 bulan dalam kondisi tertutup rapat di tempat teduh. Jika segel sudah dibuka, produk tetap stabil hingga 12 bulan asalkan botol/jerigen ditutup kembali dengan rapat dan tidak terkontaminasi air kotor.',
        category: 'INGREDIENTS',
      },
      {
        question: 'Berapa pokok sawit yang bisa dirawat dengan 1 Jerigen 4 Liter?',
        answer:
          'Satu Jerigen 4 Liter (4.000 ml) dapat digunakan untuk merawat 20 - 25 pokok sawit sakit intensif (dosis 150-200 ml/pokok) atau hingga 40 pokok sawit untuk pencegahan karantina blok (dosis 100 ml/pokok).',
        category: 'COMMERCIAL',
      },
    ],
  },

  // ----------------------------------------
  // 2. BENSU Hortikultura
  // ----------------------------------------
  {
    id: 'bensu',
    name: 'BENSU Hortikultura',
    shortTitle: 'BENSU',
    subtitle:
      'Stimulator Pemulihan Seluler & Growth-Restart Tanaman Sayur (Anti-Stres Cuaca, Daun Kuning & Mandek Tumbuh)',
    categoryLabel: 'Growth Restart Stimulator',
    badgeVariant: 'amber',
    targetCommodityLabels: [
      'Cabai Merah & Rawit',
      'Tomat',
      'Bawang Merah',
      'Melon & Semangka',
      'Terong & Sayuran Buah',
    ],
    corePositioning: {
      en: 'Cellular Osmoprotectant & Rapid Growth-Restart Stimulator for Weather-Stressed Vegetables',
      id: 'Stimulator pemulihan seluler tanaman sayuran untuk mengatasi tanaman yang lemah, kuning, layu terik, keracunan obat, dan mandek tumbuh agar cepat tancap gas bertunas lebat',
    },
    coreAngle:
      'Tanaman mandek jangan cuma ditambah urea atau pupuk kimia. Bangunkan dulu akarnya dan buka stomatanya agar nutrisi bisa diserap!',
    internalMantra:
      'BENSU bukan pupuk daun biasa. Ini formula pemulihan seluler untuk tanaman hortikultura yang stres cuaca ekstrem, kaget air pasca kemarau, keracunan pestisida, atau macet tumbuh pasca pindah tanam.',
    whatItIs: [
      'Biostimulan pemulihan aktif khusus tanaman hortikultura sayuran dan buah cepat panen',
      'Formula osmoprotektan penangkal dehidrasi sel akibat sengatan panas terik El Niño > 35°C',
      'Akselerator pembelahan sel meristem pucuk pemicu tunas cabang produktif baru',
      'Stimulator pemanjangan serabut bulu akar halus untuk memaksimalkan serapan hara dasar',
      'Dapat diaplikasikan lewat semprot kabut daun pagi hari maupun kocor lubang tanam bedengan',
    ],
    whatItIsNot: [
      'Bukan pupuk dasar pengganti NPK makro atau kompos kandang',
      'Bukan racun insektisida kimia pembunuh hama kutu kebul atau thrips',
      'Bukan fungisida racun kimia murni pembasmi patek antraknosa buah',
      'Bukan serum pemadatan bobot generatif akhir (itu peran khusus Saratoga)',
      'Bukan formula ajaib yang bisa memulihkan tanaman yang akarnya sudah putus busuk 100%',
    ],
    formulaConcept: 'Cellular Stress Reliever & Root Re-Activator',
    brandMechanism:
      'Cytokinin-Auxin Natural Trigger & Osmoprotectant Complex — Menurunkan akumulasi hormon asam absisat (ABA) penyebab tanaman macet tumbuh, membuka kembali stomata daun untuk fotosintesis aktif, dan memicu diferensiasi sel akar rambut baru dalam tempo 72 jam.',
    physicalSpecifications: {
      formulationType: 'Cairan Konsentrat Hijau Larut Air (Liquid Biostimulant / SL)',
      colorAndAroma: 'Cokelat kehijauan tua, aroma fermentasi rumput laut segar alami',
      density: '1.12 - 1.15 g/cm³',
      solutionPh: '5.5 - 6.8 (Rentang optimal absorpsi daun hortikultura)',
      solubility: '100% larut sempurna dalam air tawar tanpa menyumbat spuyer semprot',
      shelfLife: '24 Bulan pada suhu sejuk terhindar dari sinar matahari langsung',
      safetyClass: 'Kelas IV (Label Hijau - Non-Toksik & Ramah Lingkungan)',
    },
    modeOfActionTimeline: [
      {
        timeframe: 'Jam 0 - 2',
        phaseName: 'Absorpsi Cepat Kutikula & Daun',
        biologicalProcess:
          'Molekul asam amino L-isomer dan glisin betain berukuran mikro menembus kutikula daun dalam 90 menit; formula tahan hujan (rainfast) setelah 2 jam.',
        farmerVisibleResult:
          'Permukaan daun tampak lebih segar, tidak kusam, dan turgor sel mulai tegak.',
      },
      {
        timeframe: 'Hari 1 - 2',
        phaseName: 'Penurunan Asam Absisat & Netralisasi Stres',
        biologicalProcess:
          'Kadar hormon stres ABA turun drastis; stomata daun kembali membuka normal sehingga laju fotosintesis meningkat 40%.',
        farmerVisibleResult:
          'Tanaman yang semula layu lunglai di siang terik mulai bertahan tegap kaku tanpa terkulai.',
      },
      {
        timeframe: 'Hari 3 - 5',
        phaseName: 'Reaktivasi Titik Tumbuh Pucuk',
        biologicalProcess:
          'Prekursor sitokinin dan auksin alami memicu pembelahan sel meristem apikal di ujung cabang.',
        farmerVisibleResult:
          'Pucuk daun baru yang runcing hijau segar mulai menjulur keluar dari ketiak daun yang semula macet keriting.',
      },
      {
        timeframe: 'Hari 7 - 10',
        phaseName: 'Ledakan Bulu Akar Serap Baru',
        biologicalProcess:
          'Korteks akar lateral membentuk ratusan bulu serap baru, memperluas area jangkauan serapan hara di dalam bedengan.',
        farmerVisibleResult:
          'Tanaman tancap gas tumbuh lebat, batang utama membesar, dan siap menyerap pupuk susulan secara maksimal.',
      },
    ],
    composition: [
      {
        item: 'Asam Amino Vegetatif Bebas L-Isomer Terstandar',
        value: '22.5%',
        function:
          'Menyuplai energi protein siap pakai langsung ke jaringan daun tanpa membebani proses fotosintesis tanaman yang sedang lemah.',
      },
      {
        item: 'Senyawa Osmoprotektan Murni (Glisin Betain & Prolin)',
        value: '15.0%',
        function:
          'Menjaga tekanan turgor sel dinding tanaman agar daun tidak lemas layu saat suhu udara bedengan mencapai > 36°C.',
      },
      {
        item: 'Fito-Aktivator Tunas & Perakaran (Prekursor Sitokinin & Auksin)',
        value: '12.0%',
        function:
          'Merangsang keluarnya tunas pucuk baru dan pembentukan cabang produktif lateral pada tanaman cabai, tomat, dan sayuran buah.',
      },
      {
        item: 'Ekstrak Alga Cokelat Dingin (Ascophyllum nodosum)',
        value: '10.0%',
        function:
          'Kaya manitol, alginat, dan mineral kelautan alami pemicu ketahanan sistemik tanaman dari cekaman lingkungan ekstrem.',
      },
      {
        item: 'Kelat Mikronutrien Bio-Available (Mg, Fe, Zn, Mn)',
        value: '7.5%',
        function:
          'Mengoreksi klorosis (daun kuning urat hijau) dan meregenerasi butir-butir kloroplas untuk fotosintesis maksimal.',
      },
      {
        item: 'Bio-Penetran & Surfaktan Nabati Ramah Lapisan Lilin',
        value: 'q.s to 100%',
        function:
          'Membantu butiran semprotan kabut merata dan menempel kuat di permukaan daun berbulu atau berlilin.',
      },
    ],
    claimGuardrails: {
      allowedPhrasing: [
        'Membantu memulihkan tanaman sayur yang stres cuaca panas atau kaget air',
        'Membantu merangsang pertumbuhan tunas pucuk baru dan akar rambut aktif',
        'Membantu mengatasi tanaman yang mandek tumbuh dan daun menguning kusam',
        'Membantu meredakan stres keracunan overdosis pestisida atau herbisida selektif',
        'Membantu mengurangi angka kematian bibit pada saat pindah tanam ke bedengan mulsa',
      ],
      prohibitedPhrasing: [
        'Pemberantas total keriting daun thrips tanpa perlu insektisida',
        'Pupuk instan sekali semprot langsung berbuah lebat dalam semalam',
        'Pengganti pupuk dasar NPK dan kalsium tanah',
        'Pembasmi tuntas jamur antraknosa patek dan layu fusarium',
        'Menjamin hasil panen naik 500% tanpa perawatan kebun',
      ],
    },
    severityLevels: [
      {
        stage: 'Level 1',
        title: 'Mandek Tumbuh Ringan & Klorosis Awal',
        symptoms:
          'Tanaman berhenti memanjang selama 5-7 hari pasca hujan lebat atau cuaca terik; daun muda tampak pucat kekuningan.',
        prognosis: 'Pulih 100% dalam 3 - 5 hari setelah 1-2 kali semprot kabut pagi.',
        recommendedDosage: '1.5 - 2.0 ml BENSU per Liter air (25 - 30 ml per tangki 16L).',
        actionProtocol:
          'Semprot kabut halus pada daun pagi hari pukul 06.00 - 08.30 WIB sebelum matahari terik. Pastikan merata ke bagian bawah daun.',
      },
      {
        stage: 'Level 2',
        title: 'Daun Keriting Kaku & Stres Panas Terik El Niño',
        symptoms:
          'Daun mengerut melengkung ke atas seperti mangkok terbalik; tepi daun kaku; tanaman layu terkulai setiap jam 11 siang hingga 2 siang.',
        prognosis: 'Pulih 85-90% dalam 5 - 7 hari; turgor sel kembali normal dan daun kembali lentur segar.',
        recommendedDosage: '2.0 ml BENSU per Liter air (semprot) + kocor 50 ml per lubang tanam.',
        actionProtocol:
          'Lakukan kombinasi semprot daun pagi hari dan kocor lubang tanam di sore hari agar perakaran dingin dan aktif kembali.',
      },
      {
        stage: 'Level 3',
        title: 'Keracunan Overdosis Pestisida / Herbisida (Daun Terbakar)',
        symptoms:
          'Pucuk daun gosong kecokelatan seperti terbakar api 24 jam pasca semprot racun kimia pekat; tepi daun mengering keriput.',
        prognosis: 'Penyelamatan 75-85%; pucuk mati akan gugur dan digantikan tunas samping baru dalam 5-7 hari.',
        recommendedDosage: '3.0 ml BENSU per Liter air (TUNGGAL murni tanpa campuran obat lain).',
        actionProtocol:
          'Segera semprot dan kocor tanaman dengan air bersih ditambah BENSU dosis 40 ml per tangki. DILARANG mencampur pestisida kimia apa pun selama 7 hari.',
      },
      {
        stage: 'Level 4',
        title: 'Stres Genangan Air & Pembusukan Akar Halus',
        symptoms:
          'Tanaman terendam banjir bedengan selama > 12 jam; daun bawah menguning rontok masal; serabut akar cokelat berbau busuk air.',
        prognosis: 'Peluang hidup 60-75% jika saluran drainase bedengan segera dibuka kering.',
        recommendedDosage: 'Kocor 2.5 ml BENSU per Liter air langsung ke lubang tanam (100 ml larutan per tanaman).',
        actionProtocol:
          'Tiriskan air bedengan, taburkan dolomit/kalsium kering di sela tanaman, lalu kocor BENSU untuk meregenerasi serabut akar baru.',
      },
    ],
    dosageMatrix: [
      {
        cropOrPhase: 'Cabai Merah & Rawit (Vegetatif Awal 7 - 30 HST)',
        timing: 'Mulai umur 7 HST, diulang tiap 7 hari sekali',
        dosagePerLiter: '1.5 - 2.0 ml / Liter air (25 - 30 ml per tangki 16L)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 7,
        keyNotes:
          'Semprot kabut halus pada daun pagi hari sebelum stomata menutup. Memicu pembentukan 10-15 cabang lateral produktif.',
      },
      {
        cropOrPhase: 'Tomat & Terong (Pemulihan Stres Pindah Tanam 3 - 14 HST)',
        timing: 'Hari ke-3 setelah pindah tanam dari baki tray ke bedengan mulsa',
        dosagePerLiter: '2.0 ml / Liter air (atau kocor 100 ml per lubang)',
        applicationMethod: 'SOIL_DRENCH',
        intervalDays: 5,
        keyNotes:
          'Mencegah bibit layu mati kena pantulan panas mulsa plastik perak. Bibit langsung tegap berdiri dalam 24 jam.',
      },
      {
        cropOrPhase: 'Bawang Merah (Fase Pertumbuhan Daun 10 - 25 HST)',
        timing: 'Umur 10 HST dan 18 HST',
        dosagePerLiter: '1.5 ml / Liter air (20 - 25 ml per tangki 16L)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 7,
        keyNotes:
          'Mencegah pucuk daun kuning (moler awal) akibat asam hujan malam hari; daun bawang tumbuh hijau tebal dan kaku.',
      },
      {
        cropOrPhase: 'Melon & Semangka (Fase Penjalaran Sulur 12 - 28 HST)',
        timing: 'Saat sulur mulai merambat cepat di bedengan',
        dosagePerLiter: '1.5 - 2.0 ml / Liter air',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 7,
        keyNotes:
          'Merangsang pemanjangan ruas sulur secara proporsional dan daun melebar tebal sebelum inisiasi bunga.',
      },
      {
        cropOrPhase: 'Celup Bibit Sebelum Pindah Tanam (Semua Tanaman)',
        timing: '15 menit sebelum bibit dicabut dari tray semai',
        dosagePerLiter: '2.0 ml / Liter air dalam bak celup',
        applicationMethod: 'SOIL_DRENCH',
        intervalDays: 1,
        keyNotes:
          'Celupkan baki bibit selama 1 menit ke dalam larutan BENSU. Melindungi bulu akar dari kerusakan mekanis dan shock pindah tanam.',
      },
    ],
    demographics: {
      persona: {
        roleTitle: 'Petani Sayur & Hortikultura Komersial Intensif',
        acreageProfile: 'Mengelola lahan sewa / milik sendiri seluas 0.5 - 3 Hektar dengan mulsa plastik dan irigasi tetes/kocor',
        primaryCrops: ['Cabai Rawit Merah, Cabai Keriting, Tomat Servo/Optima, Bawang Merah Bima Brebes'],
        coreFear:
          'Modal tanam sudah keluar puluhan juta untuk benih, mulsa, dan pupuk dasar; sangat takut tanaman mandek keriting, daun kuning, atau layu massal terkena anomali cuaca ekstrem.',
        coreAspiration:
          'Ingin tanaman tumbuh seragam tegap, cabang produktif rimbun, dan cepat pulih saat dihantam cuaca buruk agar panen perdana tepat waktu dengan harga jual tinggi.',
        awarenessStage: 'SOLUTION_AWARE',
        buyingMotivator:
          'Kecepatan hasil visual (3-5 hari pucuk baru terlihat) dan kepraktisan penggunaan yang bisa dicampur dengan fungisida protektif sehari-hari.',
      },
      sentraHubs: [
        {
          province: 'Jawa Timur',
          regencies: ['Kediri', 'Malang', 'Banyuwangi', 'Blitar', 'Nganjuk', 'Probolinggo'],
          soilAndClimateNote:
            'Sentra cabai rawit dan sayuran buah terbesar di Indonesia; tanah vulkanik andosol dan regosol subur dengan intensitas tanam tinggi sepanjang tahun.',
        },
        {
          province: 'Jawa Tengah',
          regencies: ['Brebes', 'Magelang', 'Temanggung', 'Boyolali', 'Wonosobo'],
          soilAndClimateNote:
            'Sentra bawang merah nasional dan sayuran dataran tinggi lereng gunung Merbabu-Sumbing; rentan embun upas dingin malam hari dan fluktuasi cuaca ekstrem.',
        },
        {
          province: 'Jawa Barat',
          regencies: ['Garut', 'Bandung Barat', 'Cianjur', 'Majalengka', 'Sukabumi'],
          soilAndClimateNote:
            'Sentra cabai keriting dan hortikultura daun Priangan; tanah latosol dengan curah hujan rendeng tinggi yang rentan memicu tanaman kaget air.',
        },
        {
          province: 'Sumatera Utara',
          regencies: ['Karo (Berastagi)', 'Simalungun', 'Dairi'],
          soilAndClimateNote:
            'Kawasan dataran tinggi hortikultura utama Sumatera; kelembaban udara malam > 90% yang memicu pembusukan daun jika tanaman stres.',
        },
        {
          province: 'Nusa Tenggara Barat',
          regencies: ['Lombok Timur', 'Lombok Tengah', 'Sumbawa'],
          soilAndClimateNote:
            'Sentra cabai rawit nasional musim kemarau gadu; suhu siang hari mencapai > 36°C yang membutuhkan perlindungan osmoprotektan seluler tinggi.',
        },
      ],
      indonesiaExpansionHubs: [
        'Sulawesi Selatan (Enrekang, Gowa)',
        'Sumatera Barat (Tanah Datar, Agam)',
        'Bali (Tabanan, Bangli)',
        'Lampung (Tanggamus, Lampung Barat)',
        'Jambi (Kerinci)',
        'Sulawesi Utara (Minahasa)',
      ],
    },
    commercialPillars: {
      pricingStrategy:
        'Fast-mover accessible pricing. Dipatok dengan harga terjangkau bagi petani hortikultura: Rp 65.000 (500 ml) dan Rp 115.000 (1 Liter) yang setara dengan biaya 2 kali semprot tangki namun melindungi investasi puluhan juta.',
      heroOffers: [
        {
          name: 'Botol Praktis 500 ml (Trial Petani 0.25 Ha)',
          volume: '500 ml Botol Segel',
          priceIdr: 65000,
          targetFarmer: 'Petani cabai/sayur pemula untuk aplikasi 15-20 tangki semprot.',
        },
        {
          name: 'Botol Reguler 1.000 ml (Standard Petani 1 Ha)',
          volume: '1.000 ml Botol Segel',
          priceIdr: 115000,
          targetFarmer: 'Petani hortikultura intensif luas lahan 0.5 - 1 Hektar untuk 1 siklus vegetatif penuh.',
        },
        {
          name: 'Paket Hemat Jerigen 4 Liter (Kelompok Tani / Kios)',
          volume: '4.000 ml Jerigen Segel',
          priceIdr: 420000,
          targetFarmer: 'Petani hortikultura skala luas 2-5 Ha atau kios saprotan penyedia paket kocor.',
        },
      ],
      proofAssets: [
        'Foto split perbandingan kebun cabai di Kediri: Hari 0 (daun kaku keriting) vs Hari 4 (pucuk baru hijau melesat)',
        'Video testimoni petani cabai Pare Kediri tentang penyelamatan tanaman mandek pasca hujan malam',
        'Dokumentasi perbandingan bibit tomat servo yang dicelup BENSU vs tanpa celup saat pindah tanam mulsa',
        'Uji laboratorium kadar klorofil daun pasca aplikasi BENSU',
        'Panduan aplikasi infografis dosis tangki 16L yang siap dipajang di etalase kios saprotan',
      ],
      objectionHandling: [
        {
          objection: 'Tanaman saya sudah dikasih pupuk NPK dan mutiara banyak kok tetap kerdil kuning ya?',
          rebuttle:
            'Justru itu Pak! Tanaman yang sedang stres akarnya tidak bisa makan pupuk kimia keras. Kalau terus ditambah NPK, tanah makin asam dan akar malah gosong keracunan. Semprot BENSU dulu untuk menetralkan asam absisat di daun dan bangunkan bulu akar baru. Dalam 4 hari tanaman segar kembali, baru pupuk NPK-nya diserap dengan lahap!',
        },
        {
          objection: 'Apakah BENSU bisa dicampur dengan fungisida mankozeb atau insektisida ulat?',
          rebuttle:
            'Sangat bisa dan dianjurkan Pak! BENSU kompatibel dicampur dengan fungisida protektif (mankozeb, propineb) dan insektisida kutu (abamektin, emamektin). Bahkan senyawa surfaktan alaminya membantu obat ulat menempel lebih merata di daun. Yang dilarang hanya dicampur dengan tembaga hidroksida pekat atau herbisida.',
        },
        {
          objection: 'Berapa hari efeknya kelihatan setelah disemprot?',
          rebuttle:
            'Tanda awal terlihat pada hari ke-3 sampai hari ke-5 Pak: perhatikan titik tumbuh pucuk daun paling atas, warnanya akan berubah dari kusam menjadi hijau segar mengkilap dan tunas baru mulai menjulur keluar.',
        },
        {
          objection: 'Apakah aman disemprotkan saat tanaman sudah mulai keluar bunga?',
          rebuttle:
            'Aman sekali, namun saat bunga sudah mekar penuh, kami sarankan mulai dirotasikan dengan SARATOGA Plant Serum yang kaya protein bunga dan chitosan agar bunga tidak rontok dan pentil buah mengunci kuat.',
        },
      ],
      csDecisionTree: [
        {
          farmerSymptomTrigger:
            'Petani lapor tanaman cabai umur 20 HST tidak mau nambah tinggi dan daun menguning kusam',
          csQuestion:
            'Apakah kemarin baru kena hujan lebat setelah beberapa hari panas terik Pak? Dan sudah dicoba pupuk apa saja?',
          recommendation:
            'Tanaman mengalami shock osmotik perakaran dan mandek tumbuh. Segera semprot BENSU 30 ml per tangki 16L besok pagi sebelum jam 9. Tunggu 4 hari, pucuk baru akan langsung melesat keluar.',
          suggestedBundle: 'Botol 1 Liter BENSU Hortikultura.',
        },
        {
          farmerSymptomTrigger:
            'Petani panik daun cabai gosong keriting terbakar setelah salah takar semprot pestisida',
          csQuestion:
            'Pestisida apa yang disemprotkan kemarin Pak? Dan apakah dicampur lebih dari 3 jenis obat?',
          recommendation:
            'Pertolongan darurat keracunan pestisida: Segera cuci tanaman dengan semprotan air tawar bersih dicampur BENSU dosis 40 ml per tangki sore ini juga tanpa campuran obat lain. Jangan biarkan racun meresap ke pembuluh akar.',
          suggestedBundle: 'Botol 1 Liter BENSU + Kocor lubang tanam.',
        },
        {
          farmerSymptomTrigger:
            'Petani mau pindah tanam bibit cabai dari tray semai ke bedengan mulsa',
          csQuestion:
            'Berapa jumlah populasi bibit yang mau dipindah tanam Pak?',
          recommendation:
            'Gunakan metode celup baki bibit ke larutan BENSU 2 ml/L selama 1 menit sebelum dicabut dan ditanam. Bibit dijamin 0% layu mati terpanggang panas mulsa dan langsung tancap gas berakar kuat.',
          suggestedBundle: 'Paket Hemat 1 Liter atau 500 ml.',
        },
      ],
    },
    climateIntegration: {
      elNino2026Role:
        'Kekeringan terik El Niño 2026 dengan suhu bedengan > 36°C menyebabkan dehidrasi sel dan stomata daun menutup permanen. BENSU menyuplai osmoprotektan alami (glisin betain & prolin) untuk menjaga turgor sel daun agar tanaman tidak layu terkulai.',
      laNina2027Role:
        'Curah hujan tinggi La Niña 2027 memicu kejenuhan air tanah di bedengan yang mematikan bulu akar serap. BENSU diaplikasikan untuk meregenerasi serabut akar baru dan menetralkan keasaman tanah rendaman.',
      goldenApplicationWindows:
        'Puncak kebutuhan: Oktober-Desember (awal tanam rendeng MT 1) dan April-Juni 2027 (fase vegetatif gadu MT 2).',
    },
    metaAdsPlaybook: {
      coreHooks: [
        {
          angleId: 'bensu-hook-01',
          angleName: 'Panic Recovery / Tanaman Mandek',
          targetProblem: 'Tanaman cabai dan sayuran mandek tidak mau tumbuh pasca cuaca ekstrem',
          primaryHeadline:
            'Tanaman Cabai Mandek Daun Menguning Pasca Hujan Pertama? Jangan Ditambah Urea, Bangunkan Dulu Akarnya!',
          hookQuestion:
            'Pusing lihat tanaman cabai sudah dipupuk mahal-mahal tapi tetap kerdil dan pucuknya macet?',
          bodyCopy:
            'Tanaman yang mandek bukan kurang pupuk kimia, tapi sel akarnya kaget cuaca ekstrem dan kelebihan asam absisat! Bangunkan tanaman Anda dengan BENSU Hortikultura: formula stimulator pemulihan seluler yang meredakan stres tanaman, membuka kembali stomata daun, dan memicu pucuk tunas baru dalam tempo 72 jam.',
          callToAction: 'Pesan BENSU Sekarang - Bayar di Tempat (COD)',
          suggestedCreative:
            'Video perbandingan: Kiri (cabai mandek kerdil kuning) vs Kanan (hari ke-4 disemprot BENSU pucuk menjulur hijau segar)',
          seasonalFit: 'Oktober - Januari (Musim Tanam Rendeng MT 1)',
        },
        {
          angleId: 'bensu-hook-02',
          angleName: 'Heat Stress Defense / El Niño Alert',
          targetProblem: 'Tanaman sayuran layu terkulai di siang terik matahari > 35°C',
          primaryHeadline:
            'Panas Terik El Niño Bikin Tanaman Cabai & Tomat Layu Siang Hari? Lindungi Sel Daun dengan Anti-Stres BENSU!',
          hookQuestion:
            'Tiap jam 11 siang kebun cabai Anda tampak lemas lunglai seperti mau mati terpanggang mulsa plastik?',
          bodyCopy:
            'Sengatan panas ekstrem menguras cairan sel tanaman dan mematikan titik tumbuh. Semprotkan BENSU dengan kandungan Glisin Betain dan Prolin murni: menjaga turgor sel daun tetap tegak, hijau, dan tahan terik matahari seharian penuh tanpa stres.',
          callToAction: 'Dapatkan Perlindungan Tanaman Anda',
          suggestedCreative:
            'Foto close-up daun cabai berembun tegak segar di bawah terik matahari siang dengan termometer menunjukkan 37°C',
          seasonalFit: 'Mei - September (Puncak Kemarau El Niño)',
        },
        {
          angleId: 'bensu-hook-03',
          angleName: 'Keracunan Obat / Pertolongan Pertama',
          targetProblem: 'Daun tanaman gosong melepuh akibat salah dosis semprot pestisida',
          primaryHeadline:
            'Salah Campur Obat Daun Tanaman Langsung Gosong Melepuh? Jangan Pasrah, Selamatkan Kebun Anda dalam 48 Jam!',
          hookQuestion:
            'Pernah salah takar racun kimia sampai pucuk tanaman cabai terbakar kering keriput?',
          bodyCopy:
            'Jangan buru-buru cabut bedengan! Segera cuci tanaman dengan kocor dan semprot BENSU Hortikultura dosis 40 ml per tangki. Formula asam amino bebasnya menetralkan racun kimia dan memacu tumbuhnya cabang produktif baru dalam hitungan hari.',
          callToAction: 'Simpan Kontak Darurat Dokter Tanaman',
          suggestedCreative:
            'Foto transformasi daun cabai terbakar kimia yang disemprot BENSU mengeluarkan tunas baru hijau royo-royo',
          seasonalFit: 'Sepanjang Tahun (All Seasons)',
        },
        {
          angleId: 'bensu-hook-04',
          angleName: 'Kunci Sukses Pindah Tanam Mulsa',
          targetProblem: 'Bibit layu mati massal saat dipindah dari tray semai ke bedengan',
          primaryHeadline:
            'Bibit Cabai & Melon Sering Layu Mati Kena Panas Mulsa Pasca Pindah Tanam? Kunci 100% Bibit Hidup Tegap!',
          hookQuestion:
            'Bosan menyulam bibit mati setiap habis pindah tanam ke bedengan mulsa plastik?',
          bodyCopy:
            'Celupkan baki bibit ke larutan BENSU 15 menit sebelum tanam. Bulu akar serap terlindungi dari kerusakan dan bibit langsung tancap gas berdiri tegak tanpa stres layu sama sekali. Hemat waktu, hemat tenaga, 100% bibit tumbuh serempak!',
          callToAction: 'Pesan Botol 1 Liter untuk Bibit Anda',
          suggestedCreative:
            'Video demo petani mencelupkan tray semai ke ember larutan BENSU lalu menancapkannya ke mulsa dengan tegap',
          seasonalFit: 'Awal Musim Tanam (Oktober, November, April, Mei)',
        },
      ],
      targetingInterests: [
        'Petani cabai',
        'Budidaya cabai',
        'Bawang merah',
        'Hortikultura',
        'Pertanian Indonesia',
        'Kediri',
        'Brebes',
        'Malang',
        'Garut',
        'Lombok Timur',
        'Temanggung',
      ],
      exclusions: ['Pekerja kantoran tanpa lahan', 'Usia di bawah 22 tahun'],
    },
    faqs: [
      {
        question: 'Apakah BENSU bisa dicampur dengan fungisida dan insektisida?',
        answer:
          'Sangat bisa dan aman. BENSU kompatibel dicampur dengan fungisida protektif (mankozeb, propineb, azoksistrobin) dan insektisida kutu/ulat (abamektin, emamektin). Dilarang dicampur hanya dengan tembaga hidroksida pekat dan herbisida pembasmi rumput.',
        category: 'COMPATIBILITY',
      },
      {
        question: 'Kapan waktu terbaik menyemprotkan BENSU pada tanaman sayuran?',
        answer:
          'Pagi hari pukul 06.00 - 08.30 WIB saat stomata daun membuka maksimal dan sinar matahari belum terlalu terik. Jika pagi hari hujan, semprot sore hari pukul 15.30 - 17.30 WIB.',
        category: 'APPLICATION',
      },
      {
        question: 'Berapa tangki semprot yang dihasilkan dari 1 botol BENSU 1 Liter?',
        answer:
          'Dengan dosis anjuran 25-30 ml per tangki 16 Liter, 1 botol BENSU 1.000 ml dapat digunakan untuk 33 hingga 40 tangki semprot (cukup untuk lahan seluas 1.5 - 2 Hektar sekali aplikasi).',
        category: 'APPLICATION',
      },
      {
        question: 'Apakah BENSU aman jika terkena bunga tanaman yang baru mekar?',
        answer:
          'Aman dan tidak membakar bunga. Namun pada fase bunga mekar penuh, kami sarankan menggunakan SARATOGA Plant Serum yang diformulasikan khusus dengan asam amino bebas 47.5% dan chitosan untuk mengikat kuntum bunga agar tidak rontok.',
        category: 'APPLICATION',
      },
      {
        question: 'Apakah BENSU bisa digunakan untuk kocor lubang tanam?',
        answer:
          'Bisa sekali. Dosis kocor adalah 2-3 ml per Liter air (sekitar 50-100 ml larutan per lubang tanam). Sangat efektif untuk mengatasi perakaran tanaman yang kerdil atau rusak pasca genangan air.',
        category: 'APPLICATION',
      },
      {
        question: 'Apakah produk ini organik atau kimia sintetis keras?',
        answer:
          'BENSU berbasis bahan biostimulan organik aktif (asam amino L-isomer, ekstrak alga cokelat, glisin betain, dan kelat mikro alami). Formula ini ramah lingkungan, tidak meninggalkan residu kimia berbahaya, dan aman bagi musuh alami kebun.',
        category: 'INGREDIENTS',
      },
    ],
  },

  // ----------------------------------------
  // 3. SARATOGA Plant Serum
  // ----------------------------------------
  {
    id: 'saratoga',
    name: 'SARATOGA Plant Serum',
    shortTitle: 'SARATOGA',
    subtitle:
      'Strategic Generative Serum / Japanese Pro-Plant Complex™ (Asam Amino 47.5% + Chitosan Bio-Fungisida)',
    categoryLabel: 'Strategic Plant Serum',
    badgeVariant: 'indigo',
    targetCommodityLabels: [
      'Padi Sawah (Inbrida & Hibrida)',
      'Bawang Merah',
      'Melon & Semangka',
      'Cabai & Tomat',
      'Jeruk & Buah Hortikultura',
    ],
    corePositioning: {
      en: 'High-Density Strategic Plant Serum with Japanese Pro-Plant Complex™ for Fruit Firmness & Yield Weight',
      id: 'Serum tanaman generatif konsentrat tinggi berbasis Japanese Pro-Plant Complex™ untuk mengunci bunga agar tidak rontok, menebalkan kulit buah tahan patek, dan memadatkan bobot panen Grade A',
    },
    coreAngle:
      'Rahasia panen tembus timbangan berat dan lolos Grade A: Beri tanaman energi asam amino siap serap saat fase kritis pembungaan dan pengisian!',
    internalMantra:
      'SARATOGA bukan pupuk buah kalium biasa. Ini serum tanaman berteknologi tinggi dengan 17 asam amino bebas konsentrat 47.5% dan chitosan bio-fungisida untuk menghasilkan panen padat berbobot.',
    whatItIs: [
      'Serum tanaman konsentrat tinggi khusus fase pembungaan, pembentukan buah, dan pengisian bulir',
      'Formula Japanese Pro-Plant Complex™ dengan bio-availability penyerapan jaringan mencapai 98%',
      'Anti-rontok bunga dan pentil buah akibat cuaca mendung, hujan malam, atau defisit karbohidrat',
      'Bio-fungisida protektif alami (chitosan) penebal kutikula kulit buah penangkal jamur patek antraknosa',
      'Pemicu akumulasi padatan terlarut (Brix) dan bobot timbangan gabah padi serta umbi bawang merah',
    ],
    whatItIsNot: [
      'Bukan pupuk daun berkadar Nitrogen tinggi yang memicu tanaman rebah atau rentan penyakit',
      'Bukan hormon giberelin sintetik pemacu buah air yang bikin buah cepat busuk lembek',
      'Bukan fungisida racun kimia sintetik keras berbau menyengat',
      'Bukan pupuk starter fase vegetatif awal bibit (itu peran Bensu)',
      'Bukan pemanis buatan kimiawi yang merusak cita rasa asli buah',
    ],
    formulaConcept: 'Japanese Pro-Plant Complex™ & Bio-Chitosan Fortifier',
    brandMechanism:
      'Bio-Available Amino-Peptide & Cuticle Shield — Menyediakan 17 asam amino bebas L-isomer yang diserap langsung oleh jaringan pembuluh floem kuntum bunga dalam tempo 2 jam tanpa perlu energi fotosintesis penuh, memperkuat zona pemisah tangkai buah (abscission zone), dan menstimulasi lapisan kitin pelindung buah.',
    physicalSpecifications: {
      formulationType: 'Serum Cair Konsentrat Tinggi (High-Density Liquid Serum)',
      colorAndAroma: 'Kuning keemasan jernih transparan, aroma khas protein laut steril',
      density: '1.24 - 1.28 g/cm³ (Sangat padat nutrisi terionisasi)',
      solutionPh: '5.0 - 6.2 (Presisi untuk stabilitas asam amino L-isomer)',
      solubility: '100% larut sempurna dalam air dingin maupun hangat tanpa endapan kristal',
      shelfLife: '24 Bulan tertutup rapat terhindar dari panas langsung',
      safetyClass: 'Kelas IV (Food Grade Compatible - 0 Hari Pre-Harvest Interval / PHI)',
    },
    modeOfActionTimeline: [
      {
        timeframe: 'Jam 0 - 2',
        phaseName: 'Penyerapan Vaskular Instan',
        biologicalProcess:
          'Molekul asam amino bebas berukuran nano (< 1.000 Dalton) menembus jaringan kelopak bunga dan tangkai buah muda tanpa membutuhkan energi fotosintesis.',
        farmerVisibleResult:
          'Kuntum bunga yang lemas tampak segar kaku dan mencengkeram kuat pada tangkai tandan.',
      },
      {
        timeframe: 'Hari 1 - 3',
        phaseName: 'Penguatan Dinding Tangkai Bunga',
        biologicalProcess:
          'Asam amino prolin dan glutamat memperkuat lapisan absisi tangkai buah, mencegah terbentuknya enzim pemisah sel saat terjadi fluktuasi cuaca dingin malam hari.',
        farmerVisibleResult:
          'Gugur bunga dan pentil buah berhenti drastis > 85% meskipun malam hari diguyur hujan.',
      },
      {
        timeframe: 'Hari 5 - 10',
        phaseName: 'Penebalan Kulit Buah oleh Bio-Chitosan',
        biologicalProcess:
          'Chitosan menginduksi fitoaleksin dan penebalan lapisan kutikula sel kulit buah, membuat dinding buah kenyal liat dan tahan pecah.',
        farmerVisibleResult:
          'Kulit buah melon, semangka, dan cabai tampak berkilap mulus, bebas bintik luka antraknosa.',
      },
      {
        timeframe: 'Hari 14 - 21',
        phaseName: 'Pengisian Padat Bobot & Peningkatan Brix',
        biologicalProcess:
          'Translokasi pati dan gula aktif memadatkan rongga gabah padi dan daging buah; kadar kemanisan melon/semangka naik 2-3 derajat Brix.',
        farmerVisibleResult:
          'Timbangan panen melonjak berat padat; gabah bernas sampai pangkal malai tanpa gabah hampa.',
      },
    ],
    composition: [
      {
        item: 'Japanese Pro-Plant Complex™ (17 Asam Amino L-Isomer Murni)',
        value: '47.5%',
        function:
          'Sumber energi instan pembentuk protein bunga dan buah: kaya Asam Glutamat, Prolin, Glisin, Arginin, dan Alanin dengan penyerapan sel 98%.',
      },
      {
        item: 'Bio-Chitosan Oligosakarida Penebal Kulit Buah',
        value: '5.5%',
        function:
          'Menginduksi fitoaleksin alami tanaman dan mempertebal lapisan kutikula buah agar kebal terhadap penetrasi jamur patek Colletotrichum.',
      },
      {
        item: 'Kalium Terionisasi & Prekursor Fosfat Enzimatik',
        value: '12.0%',
        function:
          'Mendorong translokasi karbohidrat dari daun ke bulir gabah padi, umbi bawang, dan daging buah melon/cabai.',
      },
      {
        item: 'Ekstrak Lipid Kelautan & Asam Lemak Omega Bio-Aktif',
        value: '8.0%',
        function:
          'Membantu retensi kelembaban sel dan memberikan efek kilau mengkilap alami pada kulit buah panen Grade A.',
      },
      {
        item: 'Boron Organik & Kalsium Terkelat Instan',
        value: '6.0%',
        function:
          'Mencegah pecah buah (fruit cracking) pada melon/semangka dan mencegah busuk pantat buah (blossom end rot) pada tomat/cabai.',
      },
      {
        item: 'Stabilizer & Micro-Droplet Spreader',
        value: 'q.s to 100%',
        function:
          'Memastikan serum menyebar rata dan tidak mudah menguap sebelum diserap sempurna oleh jaringan tanaman.',
      },
    ],
    claimGuardrails: {
      allowedPhrasing: [
        'Membantu mengikat bunga dan pentil buah agar tidak mudah rontok',
        'Membantu mempertebal kulit buah cabai, melon, dan semangka sehingga tahan simpan dan tahan patek',
        'Membantu meningkatkan bobot timbangan gabah padi bernas sampai pangkal',
        'Membantu meningkatkan kualitas buah panen Grade A dengan kilau mulus',
        'Formula ramah lingkungan food-grade yang aman diaplikasikan menjelang panen (0 hari PHI)',
      ],
      prohibitedPhrasing: [
        'Zat pengatur tumbuh kimia pembesar buah air yang bikin buah pecah',
        'Menjamin melon manis 20 Brix tanpa pemupukan dasar berimbang',
        'Pengganti fungisida kuratif jika buah sudah busuk berulat',
        'Menaikkan hasil panen 10 kali lipat tanpa perawatan tanaman',
        'Obat kimia pembasmi thrips atau lalat buah',
      ],
    },
    severityLevels: [
      {
        stage: 'Level 1',
        title: 'Kuntum Bunga Menguning & Rontok Ringan (< 15%)',
        symptoms:
          'Tangkai kuntum bunga pertama menguning pucat dan gugur saat tersentuh angin kencang atau pasca hujan rintik.',
        prognosis: 'Rontok berhenti 90% dalam 48 jam setelah semprotan pertama.',
        recommendedDosage: '1.5 ml SARATOGA per Liter air (20 - 25 ml per tangki 16L).',
        actionProtocol:
          'Semprot kabut halus merata pada tajuk bunga dan pentil buah muda pada pagi hari pukul 06.30 - 09.00 WIB.',
      },
      {
        stage: 'Level 2',
        title: 'Rontok Bunga Massal Pasca Hujan Malam (> 30%)',
        symptoms:
          'Kuntum bunga dan pentil buah muda berceceran di atas mulsa plastik setelah hujan deras malam hari disusul terik siang mendadak.',
        prognosis: 'Penyelamatan 80-85%; bunga yang tersisa dan kuncup bunga susulan akan mengunci kuat.',
        recommendedDosage: '2.0 ml SARATOGA per Liter air (30 ml per tangki 16L).',
        actionProtocol:
          'Semprot kabut merata dengan interval 5 hari sekali sebanyak 2 putaran. Campurkan kalsium murni bebas boron tinggi.',
      },
      {
        stage: 'Level 3',
        title: 'Kulit Buah Tipis, Mudah Pecah & Rentan Patek Antraknosa',
        symptoms:
          'Kulit buah melon/semangka retak rambut saat pengisian; kulit cabai lembek berair dan mudah ditembus spora patek musim rendeng.',
        prognosis: 'Penebalan kulit buah tercapai dalam 5-7 hari; buah baru terlindungi dari pecah dan antraknosa.',
        recommendedDosage: '2.0 ml SARATOGA per Liter air dikombinasikan dengan KOJIEN Activator (15 ml/16L).',
        actionProtocol:
          'Sinergi Saratoga (chitosan) + Kojien (silika fitoaleksin) membentuk perlindungan ganda pada kulit buah.',
      },
      {
        stage: 'Level 4',
        title: 'Pengisian Gabah Hampa & Daun Bendera Kering Dini (Padi)',
        symptoms:
          'Padi fase bunting hingga keluar malai mengalami kekeringan daun bendera; bulir padi 30% hampa dan kusam berjamur.',
        prognosis: 'Pengisian bulir padi terisi padat bernas hingga pangkal malai; rendemen beras giling meningkat tajam.',
        recommendedDosage: '25 ml SARATOGA per tangki 16L disemprotkan pada umur 45 HST dan 65 HST.',
        actionProtocol:
          'Aplikasi saat fase bunting tua (sebelum malai keluar) dan saat pengisian bulir padi 70% menguning.',
      },
    ],
    dosageMatrix: [
      {
        cropOrPhase: 'Cabai & Tomat (Fase Bunga & Pembesaran Buah 35 - 80 HST)',
        timing: 'Mulai saat kuntum bunga pertama muncul, diulang tiap 7 hari',
        dosagePerLiter: '1.5 - 2.0 ml / Liter air (25 ml per tangki 16L)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 7,
        keyNotes:
          'Semprot kabut halus merata pada bunga dan pentil buah. Mencegah rontok bunga dan membuat buah padat mengkilap tebal daging.',
      },
      {
        cropOrPhase: 'Padi Sawah (Fase Bunting 45 HST & Pengisian Bulir 65 HST)',
        timing: 'Aplikasi 1: Umur 45-50 HST (bunting tua), Aplikasi 2: Umur 65 HST (bulir susu)',
        dosagePerLiter: '1.5 ml / Liter air (25 ml per tangki 16L / 1.0 L per Hektar)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 15,
        keyNotes:
          'Mempertahankan daun bendera tetap hijau tegak dan memaksimalkan pengisian gabah bernas sampai bulir paling pangkal malai.',
      },
      {
        cropOrPhase: 'Melon & Semangka (Fase Pembesaran Buah & Pembentukan Jaring Net)',
        timing: 'Mulai umur 30 HST hingga 55 HST',
        dosagePerLiter: '2.0 ml / Liter air (30 ml per tangki 16L)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 7,
        keyNotes:
          'Chitosan dan boron organik mempertebal kulit buah melon tahan pecah, jaring net terbentuk rapat sempurna Grade A, dan rasa manis naik.',
      },
      {
        cropOrPhase: 'Bawang Merah (Fase Pembentukan & Pemadatan Umbi 30 - 50 HST)',
        timing: 'Umur 30 HST, 38 HST, dan 46 HST',
        dosagePerLiter: '2.0 ml / Liter air (30 ml per tangki 16L)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 8,
        keyNotes:
          'Memadatkan umbi bawang merah, warna umbi merah mengkilap menyala, dan kadar air seimbang sehingga tidak gampang susut di gudang simpan.',
      },
      {
        cropOrPhase: 'Jeruk & Tanaman Buah Tahunan (Fase Pentil Buah Sebesar Kelereng)',
        timing: 'Saat pentil buah terbentuk merata pasca bunga gugur',
        dosagePerLiter: '2.0 ml / Liter air',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 14,
        keyNotes:
          'Mencegah rontok pentil buah muda akibat hujan malam dan meningkatkan kadar sari buah manis segar.',
      },
    ],
    demographics: {
      persona: {
        roleTitle: 'Petani Padi Unggul, Melon Green House & Cabai Komersial',
        acreageProfile: 'Memiliki/menyewa lahan 1 - 5 Hektar sawah irigasi teknis atau sentra hortikultura buah bernilai tinggi',
        primaryCrops: ['Padi Ciherang/Inpari 32, Bawang Merah Brebes/Nganjuk, Melon Golden/Rock Melon, Cabai Besar'],
        coreFear:
          'Bunga rontok massal pasca hujan malam, gabah banyak yang kopong hampa, kulit melon retak pecah, atau hasil panen disortir tengkulak menjadi Grade C dengan harga jatuh.',
        coreAspiration:
          'Ingin panen berbobot timbangan berat maksimal, buah mulus mengkilap lolos seleksi Grade A pasar induk Kramat Jati / supermarket dengan harga premium.',
        awarenessStage: 'PRODUCT_AWARE',
        buyingMotivator:
          'Return on Investment (ROI) sangat tinggi: Tambahan biaya serum Rp 150.000/Ha menghasilkan lonjakan timbangan 500 kg - 1 Ton gabah/buah senilai jutaan rupiah.',
      },
      sentraHubs: [
        {
          province: 'Jawa Timur',
          regencies: ['Banyuwangi', 'Nganjuk', 'Ngawi', 'Jember', 'Lamongan'],
          soilAndClimateNote:
            'Sentra melon eksport, semangka, bawang merah, dan lumbung beras nasional; tanah alluvial subur dan grumosol yang membutuhkan kalium-asam amino untuk pengisian bobot.',
        },
        {
          province: 'Jawa Barat',
          regencies: ['Karawang', 'Subang', 'Indramayu', 'Majalengka'],
          soilAndClimateNote:
            'Sentra jalur pantura padi sawah utama Jawa Barat; fase bunting padi sering terancam cuaca ekstrem mendung yang memicu gabah hampa dan blast.',
        },
        {
          province: 'Jawa Tengah',
          regencies: ['Demak', 'Grobogan', 'Sragen', 'Brebes', 'Pati'],
          soilAndClimateNote:
            'Kawasan lumbung padi sawah dan bawang merah pengisian umbi padat; rentan kekurangan asam amino saat musim rendeng basah.',
        },
        {
          province: 'Sulawesi Selatan',
          regencies: ['Sidrap', 'Pinrang', 'Wajo', 'Bone'],
          soilAndClimateNote:
            'Lumbung pangan padi sawah terbesar di Indonesia Timur; mengandalkan pengisian malai bernas saat musim panen gadu kemarau.',
        },
        {
          province: 'Sumatera Selatan',
          regencies: ['Banyuasin (Sawah Pasang Surut)', 'Ogan Ilir', 'Belitang (OKU Timur)'],
          soilAndClimateNote:
            'Sentra persawahan pasang surut dan irigasi komersial Sumatera; butuh suplemen asam amino untuk mengatasi keasaman tanah sawit/padi.',
        },
      ],
      indonesiaExpansionHubs: [
        'Lampung (Pringsewu, Lampung Tengah)',
        'Kalimantan Selatan (Barito Kuala - Sawah Pasang Surut)',
        'Bali (Buleleng, Tabanan - Buah Horti)',
        'Nusa Tenggara Barat (Lombok Barat - Melon/Padi)',
        'Sumatera Utara (Serdang Bedagai - Padi)',
        'Sulawesi Tengah (Parigi Moutong)',
      ],
    },
    commercialPillars: {
      pricingStrategy:
        'Premium performance-driven pricing. Diposisikan sebagai investasi kualitas: Rp 85.000 (500 ml) dan Rp 155.000 (1 Liter). Kios saprotan mendapatkan margin sehat 20-25% dan kepuasan petani repeat-order tinggi berkat lonjakan timbangan panen.',
      heroOffers: [
        {
          name: 'Botol Kritis Bunga 500 ml (Trial Petani 0.5 Ha)',
          volume: '500 ml Botol Segel',
          priceIdr: 85000,
          targetFarmer: 'Petani cabai, tomat, atau melon pemula untuk mengunci fase pembungaan.',
        },
        {
          name: 'Botol Juara Panen 1.000 ml (Standard Petani 1 Ha)',
          volume: '1.000 ml Botol Segel Emas',
          priceIdr: 155000,
          targetFarmer: 'Petani padi sawah dan hortikultura komersial untuk 2 kali aplikasi fase bunting dan pengisian.',
        },
        {
          name: 'Paket Demplot Timbangan Juara (Karton 12 Botol @ 1L)',
          volume: '12.000 ml Karton Segel',
          priceIdr: 1680000,
          targetFarmer: 'Kios saprotan sentra padi/horti dan juragan tengkulak melon/cabai.',
        },
      ],
      proofAssets: [
        'Foto timbangan riil: Perbandingan 1000 butir gabah padi (bobot bernas naik 18-22% dibanding kontrol)',
        'Dokumentasi uji brix buah melon golden di Banyuwangi: Hasil rata-rata tembus 14.5 Brix dengan jaring net rapat Grade A',
        'Video testimoni petani cabai di Nganjuk: Gugur bunga cabai langsung terhenti 2 hari pasca aplikasi Saratoga',
        'Uji rendemen beras giling laboratorium: Beras kepala utuh naik dari 68% menjadi 82% (butir patah berkurang drastis)',
        'Brosur tabel panduan aplikasi fase bunting padi untuk etalase kios pertanian',
      ],
      objectionHandling: [
        {
          objection: 'Harganya lebih mahal dibanding pupuk daun gandasil atau NPK buah biasa di toko?',
          rebuttle:
            'Pupuk NPK buah biasa isinya garam kimia sintetis yang butuh cuaca panas dan fotosintesis lama untuk diproses tanaman. Sedangkan SARATOGA isinya 17 asam amino murni 47.5% standar Jepang dan chitosan. Begitu disemprot, dalam 2 jam langsung diserap oleh bunga dan pentil buah tanpa butuh matahari terik. Satu botol 1 Liter seharga Rp 155.000 menghasilkan lonjakan timbangan panen senilai jutaan rupiah. Ini bukan biaya, tapi investasi pelipat ganda omzet panen Bapak!',
        },
        {
          objection: 'Apakah bisa dicampur dengan perekat dan insektisida ulat?',
          rebuttle:
            'Sangat bisa! SARATOGA kompatibel dengan insektisida ulat/kutu dan fungisida azoksistrobin/difenokonazol. Namun tidak perlu perekat dosis tinggi karena formula Saratoga sudah mengandung bio-lipid kelautan alami yang merekat kuat di daun.',
        },
        {
          objection: 'Kalau bunga cabai sudah rontok banyak, apakah masih bisa terselamatkan?',
          rebuttle:
            'Bisa sekali Pak. Bunga yang masih ada kuncupnya akan langsung mencengkeram kuat dan batal rontok, sedangkan kuncup bunga baru yang sedang terbentuk akan keluar lebih serempak dengan tangkai bunga yang kokoh tebal.',
        },
        {
          objection: 'Apakah aman jika disemprotkan 3 hari sebelum panen?',
          rebuttle:
            'Sangat aman (0 hari Pre-Harvest Interval / PHI). Kandungan asam amino dan chitosan adalah bahan organik food-grade ramah pangan, tidak meninggalkan residu racun berbahaya pada buah cabai, tomat, atau melon yang siap dikonsumsi.',
        },
      ],
      csDecisionTree: [
        {
          farmerSymptomTrigger:
            'Petani cabai atau melon mengeluh bunga rontok berguguran setiap habis hujan malam',
          csQuestion:
            'Sudah berapa persen bunga yang rontok Pak? Dan saat ini cuaca di kebun apakah sering mendung siang hari?',
          recommendation:
            'Tanaman mengalami defisit energi instan akibat minim fotosintesis ditambah kelembaban tinggi. Jangan beri pupuk Nitrogen kimia! Langsung semprotkan SARATOGA 25 ml per tangki 16L besok pagi untuk mengunci tangkai bunga secara permanen.',
          suggestedBundle: 'Botol 1 Liter SARATOGA Plant Serum.',
        },
        {
          farmerSymptomTrigger:
            'Petani padi sawah ingin gabahnya bernas padat sampai pangkal dan tidak banyak gabah hampa',
          csQuestion:
            'Sekarang umur padi berapa HST Pak? Apakah buntingnya sudah mulai keluar malai?',
          recommendation:
            'Momen emas aplikasi adalah saat padi bunting tua (45-50 HST) dan saat bulir mulai mengisi 70% (65 HST). Semprotkan SARATOGA 25 ml per tangki (1 Liter per Hektar) untuk menjaga daun bendera hijau tegak dan gabah terisi padat berbobot.',
          suggestedBundle: 'Paket 2 Botol 1 Liter SARATOGA per Hektar.',
        },
        {
          farmerSymptomTrigger:
            'Petani melon/semangka takut kulit buahnya retak pecah saat mendekati masa panen',
          csQuestion:
            'Berapa HST melon Bapak sekarang? Apakah curah hujan di daerah kebun sedang tinggi?',
          recommendation:
            'Kombinasikan SARATOGA (chitosan penguat kulit) dan KOJIEN (silika penebal dinding sel) dengan dosis masing-masing 20 ml per tangki. Kulit buah akan kenyal liat, jaring net terbentuk sempurna Grade A, dan rasa manis melon naik maksimal.',
          suggestedBundle: 'Paket Combo Saratoga 1L + Kojien 1L.',
        },
      ],
    },
    climateIntegration: {
      elNino2026Role:
        'Kemarau kering El Niño 2026 menyebabkan suhu udara ekstrem yang mematikan serbuk sari bunga (pollen desiccation). SARATOGA menyuplai asam amino prolin untuk melindungi viabilitas serbuk sari sehingga penyerbukan bunga berhasil menjadi buah padat.',
      laNina2027Role:
        'Curah hujan tinggi La Niña 2027 menciptakan kelembaban udara jenuh yang melunakkan kulit buah sehingga rentan pecah dan busuk patek antraknosa. Bio-chitosan dalam SARATOGA mempertebal kutikula pelindung buah.',
      goldenApplicationWindows:
        'Puncak kebutuhan: Desember-Februari (pengisian padi rendeng & cabai) serta Juni-Agustus 2027 (buah melon, semangka, dan padi gadu MT 2).',
    },
    metaAdsPlaybook: {
      coreHooks: [
        {
          angleId: 'saratoga-hook-01',
          angleName: 'Anti-Rontok Bunga Kritis',
          targetProblem: 'Bunga cabai, tomat, dan melon berguguran massal pasca hujan malam',
          primaryHeadline:
            'Bunga Cabai & Melon Berguguran Tiap Habis Hujan Malam? Ikat Pentil Buah dengan Asam Amino Siap Serap!',
          hookQuestion:
            'Pusing lihat kuntum bunga cabai rontok berceceran di atas mulsa tiap habis hujan malam?',
          bodyCopy:
            'Bunga rontok bukan karena kurang pupuk buah biasa, tapi tangkai bunga kehabisan energi akibat mendung tebal! Kunci kuntum bunga Anda dengan SARATOGA Plant Serum: formula Japanese Pro-Plant Complex™ (asam amino bebas 47.5% + chitosan) yang diserap langsung dalam 2 jam untuk merekatkan tangkai bunga dan pentil buah agar tidak mudah gugur.',
          callToAction: 'Pesan SARATOGA Pengikat Bunga Sekarang',
          suggestedCreative:
            'Video demonstrasi: Kiri (bunga rontok saat disentuh jari) vs Kanan (pasca semprot Saratoga, tangkai bunga lentur kaku mencengkeram kuat)',
          seasonalFit: 'Musim Hujan Rendeng & Pancaroba Lembab',
        },
        {
          angleId: 'saratoga-hook-02',
          angleName: 'Grade A Pride / Rahasia Timbangan Berat',
          targetProblem: 'Hasil panen melon/semangka/cabai berkulit tipis, gampang pecah, dan timbangan enteng',
          primaryHeadline:
            'Rahasia Panen Melon & Cabai Grade A Tembus Timbangan Berat: Kulit Buah Tebal Mengkilap Tahan Pecah!',
          hookQuestion:
            'Mau hasil panen Anda selalu diserbu tengkulak dan lolos seleksi Grade A pasar induk dengan harga tertinggi?',
          bodyCopy:
            'Gunakan SARATOGA Plant Serum pada fase pengisian buah! Chitosan bio-fungisida mempertebal kulit buah tahan patek antraknosa, asam glutamat memadatkan daging buah, dan derajat kemanisan (Brix) naik maksimal. Timbangan berat, cuan panen melimpah!',
          callToAction: 'Konsultasi Resep Panen Grade A',
          suggestedCreative:
            'Foto perbandingan timbangan buah melon: Buah yang disemprot Saratoga tampak jaring net rapat sempurna dan timbangan lebih berat 300-500 gram per buah',
          seasonalFit: 'Sepanjang Tahun (Fase Generatif Buah Hortikultura)',
        },
        {
          angleId: 'saratoga-hook-03',
          angleName: 'Padi Sawah Bulir Bernas Sampai Pangkal',
          targetProblem: 'Bulir padi bunting banyak yang hampa, gabah kusam, dan daun bendera kering dini',
          primaryHeadline:
            'Bulir Padi Bunting Sering Hampa & Daun Bendera Mengering Dini? Beri Nutrisi Siap Serap Tanpa Menunggu Panas!',
          hookQuestion:
            'Ingin malai padi Anda merunduk padat bernas dari ujung sampai ke butir paling pangkal?',
          bodyCopy:
            'Semprotkan SARATOGA pada umur 45 HST dan 65 HST. 17 asam amino esensial menjaga daun bendera tetap hijau tegak untuk memompa pati ke seluruh bulir gabah. Rendemen beras giling meningkat, bulir kuning bersih mengkilap tanpa gabah hampa!',
          callToAction: 'Pesan Paket Padi Bernas 1 Liter',
          suggestedCreative:
            'Foto close-up malai padi merunduk kuning keemasan penuh bulir bernas berdampingan dengan botol Saratoga',
          seasonalFit: 'Fase Bunting Padi MT 1 (Januari-Februari) & MT 2 (Juni-Juli)',
        },
        {
          angleId: 'saratoga-hook-04',
          angleName: 'Bawang Merah Padat Merah Mengkilap',
          targetProblem: 'Umbi bawang merah kecil, lembek, dan susut bobot tajam saat disimpan di gudang',
          primaryHeadline:
            'Bawang Merah Umbi Besar Merah Menyala & Tahan Susut Simpan di Gudang Berkat Formulasi Saratoga!',
          hookQuestion:
            'Petani bawang merah Brebes & Nganjuk sudah buktikan: Bobot timbangan naik dan umbi tahan simpan berbulan-bulan!',
          bodyCopy:
            'Aplikasi SARATOGA pada umur 30-45 HST memadatkan dinding sel umbi bawang merah. Hasil panen berwarna merah cerah mengkilap, padat keras berisi, dan bobot timbangan tidak susut drastis saat dikeringkan di gudang simpan.',
          callToAction: 'Dapatkan Paket Khusus Bawang Merah',
          suggestedCreative:
            'Foto ikatan bawang merah Brebes berumbi besar merah menyala dipadukan dengan testimoni petani',
          seasonalFit: 'Musim Tanam Bawang Merah (April - Agustus)',
        },
      ],
      targetingInterests: [
        'Pertanian padi',
        'Petani padi',
        'Melon',
        'Semangka',
        'Bawang merah',
        'Pupuk buah',
        'Karawang',
        'Indramayu',
        'Banyuwangi',
        'Nganjuk',
        'Demak',
        'Sidrap',
      ],
      exclusions: ['Pekerja kantoran tanpa lahan', 'Usia di bawah 22 tahun'],
    },
    faqs: [
      {
        question: 'Apakah SARATOGA bisa dicampur dengan fungisida kimia patek (difenokonazol/azoksistrobin)?',
        answer:
          'Sangat kompatibel. Chitosan dalam Saratoga justru bersinergi memperkuat penetrasi fungisida sistemik ke dalam jaringan kulit buah cabai atau melon, sehingga proteksi terhadap jamur patek antraknosa menjadi 2x lebih tahan lama.',
        category: 'COMPATIBILITY',
      },
      {
        question: 'Berapa kali aplikasi yang disarankan pada tanaman cabai dan padi?',
        answer:
          'Pada cabai: disemprotkan tiap 7-10 hari sekali mulai saat kuntum bunga pertama mekar hingga petik panen ke-15. Pada padi sawah: cukup 2 kali aplikasi, yaitu pada fase bunting tua (45-50 HST) dan saat bulir padi mengisi 70% (65 HST).',
        category: 'APPLICATION',
      },
      {
        question: 'Apakah formula Japanese Pro-Plant Complex™ ini aman jika tertelan atau terkena kulit?',
        answer:
          'Sangat aman. Formulanya berbasis 17 asam amino murni food-grade dan chitosan alami yang biodegradable. Produk ini tidak beracun dan memiliki masa tunggu panen (Pre-Harvest Interval) 0 hari.',
        category: 'INGREDIENTS',
      },
      {
        question: 'Kenapa harga SARATOGA lebih tinggi dibanding pupuk kalium cair biasa?',
        answer:
          'Pupuk kalium cair biasa umumnya hanya garam anorganik encer yang membutuhkan fotosintesis lama. SARATOGA mengandung 47.5% asam amino bebas L-isomer murni yang diserap langsung dalam 2 jam tanpa perlu energi tanaman, dilengkapi bio-chitosan oligosakarida berteknologi tinggi.',
        category: 'COMMERCIAL',
      },
      {
        question: 'Apakah bisa diaplikasikan dengan cara kocor lubang tanam?',
        answer:
          'Bisa, namun lebih efektif dan ekonomis diaplikasikan lewat semprot kabut daun (foliar spray) karena target utamanya adalah jaringan kuntum bunga, pentil buah, dan daun bendera.',
        category: 'APPLICATION',
      },
      {
        question: 'Bagaimana cara membedakan produk SARATOGA asli dengan tiruan?',
        answer:
          'SARATOGA asli memiliki cairan berwarna kuning keemasan jernih transparan (tidak keruh berkabut), beraroma khas asam amino laut steril, dan tutup botol berlabel segel hologram resmi Agrimarket.',
        category: 'INGREDIENTS',
      },
    ],
  },

  // ----------------------------------------
  // 4. KOJIEN Activator
  // ----------------------------------------
  {
    id: 'kojien',
    name: 'KOJIEN Activator',
    shortTitle: 'KOJIEN',
    subtitle:
      'Crop Stability & Yield Support System (Silika Bioaktif Orthosilicic Acid 18% + Fitoaleksin + Zinc Chelate)',
    categoryLabel: 'Crop Stability & Yield Support',
    badgeVariant: 'emerald',
    targetCommodityLabels: [
      'Jagung Hibrida & Pipil',
      'Padi Sawah',
      'Kedelai & Kacang Hijau',
      'Bawang Merah',
      'Tebu',
    ],
    corePositioning: {
      en: 'Bioactive Orthosilicic Acid & Phytoalexin Fortifier for Crop Stand Stability & Fungal Blast/Downy Defense',
      id: 'Aktivator ketahanan tanaman berbasis silika bioaktif larut air 18% dan bio-fitoaleksin untuk memperkokoh batang tahan rebah, mencegah serangan bulai jagung & blast padi, serta memangkas penguapan air saat kemarau',
    },
    coreAngle:
      'Tanaman jagung dan padi tak stabil di awal, hasil panen akhir pasti anjlok! Perkokoh batang dan pertebal perisai daun sejak dini.',
    internalMantra:
      'KOJIEN bukan pupuk silika gilingan abu biasa. Ini silika bioaktif terlarut Orthosilicic Acid (OSA 18%) berukuran molekul nano yang diserap tanaman 100% untuk membentuk perisai silika ganda pada batang dan daun.',
    whatItIs: [
      'Aktivator stabilitas dan perisai mekanik biologis tanaman pangan jagung hibrida dan padi sawah',
      'Sumber silika bioaktif siap serap (Orthosilicic Acid H4SiO4 18%) berukuran molekul monomer mikro',
      'Penginduksi sistem imun tanaman (Systemic Acquired Resistance) pemicu fitoaleksin alami',
      'Anti-rebah terpaan angin badai hujan berkat penguatan serat lignin dan pembuluh vaskular batang',
      'Penahan transpirasi penguapan air hingga 35% saat cuaca kemarau terik panjang El Niño 2026',
    ],
    whatItIsNot: [
      'Bukan silika padat atau abu sekam giling yang mengendap menyumbat nozzle sprayer',
      'Bukan pupuk Urea pemicu rebah yang bikin tanaman terlalu rimbun basah',
      'Bukan racun insektisida kimia sintetik kontak',
      'Bukan stimulator fase pemulihan stres akar (itu peran Bensu)',
      'Bukan fungisida racun sistemik berbahan aktif triazol',
    ],
    formulaConcept: 'Bioactive Orthosilicic Shield & Phytoalexin Engine',
    brandMechanism:
      'Double Silica Layer & Phytoalexin Shield — Molekul asam ortosilikat terlarut masuk melalui stomata daun dan jaringan xilem, mengalami polimerisasi membentuk perisai silika ganda (double silica layer) di bawah kutikula epidermis batang dan daun. Dinding sel mengeras liat sehingga haustorium jamur bulai jagung (Peronosclerospora maydis) dan blast leher padi (Pyricularia oryzae) gagal menembus jaringan sel.',
    physicalSpecifications: {
      formulationType: 'Cairan Silika Bioaktif Larut Air (Stabilized Orthosilicic Acid / OSA)',
      colorAndAroma: 'Cairan putih kebiruan opalescent jernih, tidak berbau menyengat',
      density: '1.20 - 1.25 g/cm³',
      solutionPh: '7.0 - 8.2 (Stabilisasi bio-silika anti-penggumpalan)',
      solubility: '100% larut sempurna dalam air tawar tanpa membentuk endapan gel silika',
      shelfLife: '24 Bulan tertutup rapat terhindar dari udara terbuka lama',
      safetyClass: 'Kelas IV (Label Hijau - Ramah Lingkungan & Tidak Korosif)',
    },
    modeOfActionTimeline: [
      {
        timeframe: 'Jam 0 - 3',
        phaseName: 'Penyerapan Orthosilicic Acid ke Xilem',
        biologicalProcess:
          'Asam ortosilikat monomer (H4SiO4) diserap melalui kutikula daun dan pembuluh xilem tanpa membutuhkan energi metabolik tinggi.',
        farmerVisibleResult:
          'Larutan merata sempurna di permukaan daun; tidak ada bercak putih kapur di daun.',
      },
      {
        timeframe: 'Hari 2 - 4',
        phaseName: 'Pembentukan Perisai Silika Ganda',
        biologicalProcess:
          'Silika berpolimerisasi di dinding sel epidermis daun dan pelepah, membentuk lapisan perisai ganda setebal 2-3 mikron.',
        farmerVisibleResult:
          'Daun tanaman berdiri lebih tegak kaku (erect leaf angle) menghadap sinar matahari; daun kasar berisik saat diusap.',
      },
      {
        timeframe: 'Hari 7 - 12',
        phaseName: 'Pengurangan Transpirasi & Hambatan Jamur',
        biologicalProcess:
          'Perisai silika memangkas penguapan air kutikula hingga 35%; hifa jamur bulai jagung dan blast padi tidak mampu menembus sel yang telah mengeras.',
        farmerVisibleResult:
          'Tanaman jagung tahan terik siang hari tanpa daun menggulung; tidak muncul bercak putih bulai pada daun muda.',
      },
      {
        timeframe: 'Hari 15 - 30',
        phaseName: 'Batang Kokoh Anti-Rebah & Tongkol Padat',
        biologicalProcess:
          'Penguatan jaringan sklerenkim batang utama dan akar jangkar (brace roots) pada jagung hibrida.',
        farmerVisibleResult:
          'Batang jagung kokoh besar berkayu tahan terpaan angin kencang; tongkol terisi penuh sampai ujung rambut.',
      },
    ],
    composition: [
      {
        item: 'Silika Bioaktif Bio-Available (Orthosilicic Acid H4SiO4)',
        value: '18.0%',
        function:
          'Membentuk perisai kristal silika ganda pada dinding sel epidermis, memperkokoh batang tahan rebah, dan menghambat penetrasi hifa jamur patogen.',
      },
      {
        item: 'Bio-Fitoaleksin Inducer & Ekstrak Botani Ketahanan',
        value: '10.0%',
        function:
          'Memicu respon kekebalan alami tanaman (SAR) untuk memproduksi fitoaleksin penangkal infeksi bulai jagung dan blas padi.',
      },
      {
        item: 'Zinc Chelate Bio-Grade (Zn-EDTA Kualitas Tinggi)',
        value: '3.5%',
        function:
          'Mencegah klorosis garis putih pada daun jagung muda, merangsang sintesis hormon auksin internal untuk pertumbuhan anakan padi.',
      },
      {
        item: 'Kalium Terionisasi Larut Air Bebas Klorida',
        value: '12.0%',
        function:
          'Mengatur pembukaan stomata dan memperkuat translokasi fotosintat ke bulir padi dan tongkol jagung.',
      },
      {
        item: 'Mineral Penguat Lignin Batang (Cu, B, Mn)',
        value: '5.0%',
        function:
          'Mengkatalisis enzim pembentukan lignin dan selulosa pada pembuluh kayu batang agar tidak rapuh patah.',
      },
      {
        item: 'Stabilizer Polimer Anti-Gelling & Water Conditioner',
        value: 'q.s to 100%',
        function:
          'Mencegah penggumpalan silika dalam larutan tangki semprot dan menstabilkan air semprot berkapur.',
      },
    ],
    claimGuardrails: {
      allowedPhrasing: [
        'Membantu memperkokoh batang tanaman jagung dan padi agar tidak mudah roboh terpaan angin',
        'Membantu meningkatkan ketahanan tanaman dari serangan penyakit bulai jagung dan blast padi',
        'Membantu membuat daun tanaman tegak sehingga penangkapan sinar matahari fotosintesis lebih optimal',
        'Membantu mengurangi penguapan air saat kemarau terik panjang El Niño',
        'Membantu pengisian tongkol jagung penuh sampai ujung tanpa kopong',
      ],
      prohibitedPhrasing: [
        'Racun kimia pembasmi bulai jagung yang sudah stadium mati kering',
        'Menjamin jagung 100% tidak akan roboh dihantam angin puting beliung',
        'Pengganti benih jagung hibrida tahan bulai',
        'Insektisida pembunuh ulat grayak jagung Spodoptera frugiperda',
        'Obat kimia pembasmi wereng coklat padi',
      ],
    },
    severityLevels: [
      {
        stage: 'Level 1',
        title: 'Gejala Awal Garis Daun Pucat & Batang Lembek',
        symptoms:
          'Muncul garis kuning keputihan tipis pada daun muda jagung umur 12-18 HST; batang padi tampak lemas terkulai kurang tegak.',
        prognosis: 'Pencegahan 95% berhasil jika segera disemprot sebelum sporulasi jamur meluas.',
        recommendedDosage: '1.0 - 1.5 ml KOJIEN per Liter air (15 - 25 ml per tangki 16L).',
        actionProtocol:
          'Semprot kabut halus merata pada seluruh daun jagung/padi pagi hari pukul 06.30 - 09.00 WIB. Ulangi 10 hari kemudian.',
      },
      {
        stage: 'Level 2',
        title: 'Daun Bergaris Putih Bulai Meluas & Anakan Padi Sedikit',
        symptoms:
          'Daun jagung muda 20-30 HST bergaris putih tebal khas bulai (Downy Mildew); anakan padi sawah sedikit (< 15 batang per rumpun).',
        prognosis: 'Penyelamatan 80-85%; tanaman yang sehat terlindungi dan batang mengeras kokoh.',
        recommendedDosage: '1.5 - 2.0 ml KOJIEN per Liter air (25 - 30 ml per tangki 16L).',
        actionProtocol:
          'Semprot merata pada seluruh permukaan tanaman dengan interval 7 hari sekali sebanyak 2 putaran.',
      },
      {
        stage: 'Level 3',
        title: 'Batang Rapuh Rentan Rebah & Serangan Blast Padi',
        symptoms:
          'Batang jagung/padi mudah patah saat ditiup angin kencang; bercak belah ketupat jamur blast muncul pada daun padi sawah.',
        prognosis: 'Pengerasan dinding batang tercapai dalam 5-7 hari; risiko rebah turun drastis > 75%.',
        recommendedDosage: '2.0 ml KOJIEN per Liter air dikombinasikan dengan SARATOGA Plant Serum (20 ml/16L).',
        actionProtocol:
          'Sinergi Kojien (silika fitoaleksin) + Saratoga (chitosan asam amino) memperkokoh buku batang dan menghentikan infeksi blast.',
      },
      {
        stage: 'Level 4',
        title: 'Cekaman Kekeringan Kering Ekstrem El Niño 2026',
        symptoms:
          'Tanah hamparan jagung/sawah retak-retak; daun jagung menggulung kaku seperti jarum sejak jam 9 pagi akibat dehidrasi parah.',
        prognosis: 'Menekan kematian sel tanaman dan mempertahankan pengisian tongkol/bulir tetap berlangsung.',
        recommendedDosage: '2.0 ml KOJIEN per Liter air disemprotkan rutin tiap 10 hari saat kemarau kering.',
        actionProtocol:
          'Semprot pagi hari sedini mungkin (pukul 06.00 - 08.00 WIB) agar silika melapisi stomata sebelum suhu udara naik > 35°C.',
      },
    ],
    dosageMatrix: [
      {
        cropOrPhase: 'Jagung Hibrida & Pipil (Fase Awal Pencegahan Bulai 15 - 20 HST)',
        timing: 'Umur 15-18 HST saat tanaman berdaun 4-6 helai',
        dosagePerLiter: '1.0 - 1.5 ml / Liter air (15 - 25 ml per tangki 16L)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 10,
        keyNotes:
          'Aplikasi paling kritis untuk memblokir infeksi jamur bulai (Peronosclerospora maydis) sejak dini. Daun jagung langsung tegak kaku.',
      },
      {
        cropOrPhase: 'Jagung Hibrida (Fase Penguatan Batang & Bunga 35 - 45 HST)',
        timing: 'Umur 35-40 HST sebelum malai bunga jantan muncul',
        dosagePerLiter: '1.5 - 2.0 ml / Liter air (25 - 30 ml per tangki 16L)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 12,
        keyNotes:
          'Memperkokoh batang utama dan memperbesar diameter pangkal batang agar tahan terpaan angin kencang serta tongkol terisi penuh sampai ujung.',
      },
      {
        cropOrPhase: 'Padi Sawah (Fase Pembentukan Anakan Aktif 15 - 25 HST)',
        timing: 'Umur 15 HST dan 25 HST',
        dosagePerLiter: '1.0 - 1.5 ml / Liter air (20 - 25 ml per tangki 16L)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 10,
        keyNotes:
          'Zinc chelate dan silika merangsang keluarnya anakan produktif > 25 batang per rumpun dan membuat daun bendera tegak menghadap matahari.',
      },
      {
        cropOrPhase: 'Padi Sawah (Fase Bunting & Proteksi Patah Leher Blast 45 - 60 HST)',
        timing: 'Umur 45 HST dan 55 HST',
        dosagePerLiter: '1.5 ml / Liter air (25 ml per tangki 16L)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 10,
        keyNotes:
          'Mengeraskan buku malai padi sehingga kebal terhadap jamur blast patah leher (Pyricularia oryzae) di musim hujan rendeng.',
      },
      {
        cropOrPhase: 'Bawang Merah & Kedelai (Fase Pertumbuhan Batang 15 - 35 HST)',
        timing: 'Umur 15 HST dan 28 HST',
        dosagePerLiter: '1.0 - 1.5 ml / Liter air',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 12,
        keyNotes:
          'Daun bawang merah berdiri kaku tebal tahan terpaan hujan angin dan tidak mudah rebah terkulai di atas bedengan.',
      },
    ],
    demographics: {
      persona: {
        roleTitle: 'Petani Jagung Hibrida & Sawah Hamparan',
        acreageProfile: 'Mengelola lahan hamparan jagung / sawah seluas 1.5 - 6 Hektar di sentra jagung nasional',
        primaryCrops: ['Jagung Pioneer P35/P27, NK Perkasa/Sumo, Dekalb DK771, Padi Ciherang/Inpari'],
        coreFear:
          'Paling takut tanaman jagung muda terkena bulai putih yang membuat tanaman mandek kerdil tanpa tongkol, serta tanaman roboh rebah rata dengan tanah menjelang panen akibat terpaan badai angin kencang.',
        coreAspiration:
          'Ingin batang jagung besar kokoh berkayu, daun hijau tegak menyerap matahari maksimal, dan tongkol terisi padat bernas sampai ke ujung dengan bobot panen tembus > 9 Ton per Hektar.',
        awarenessStage: 'PROBLEM_AWARE',
        buyingMotivator:
          'Perlindungan hasil panen nyata (yield insurance): Biaya sebotol KOJIEN Rp 120.000 melindungi puluhan juta rupiah investasi jagung dari bahaya rebah dan serangan bulai.',
      },
      sentraHubs: [
        {
          province: 'Jawa Timur',
          regencies: ['Tuban', 'Lamongan', 'Jombang', 'Kediri', 'Pasuruan'],
          soilAndClimateNote:
            'Sentra jagung hibrida terbesar di Indonesia; tanah kapur mediteran dan alluvial; endemik bulai putih tinggi pada musim tanam rendeng awal.',
        },
        {
          province: 'Jawa Tengah',
          regencies: ['Grobogan', 'Blora', 'Wonogiri', 'Sragen', 'Pati'],
          soilAndClimateNote:
            'Kawasan sentra jagung hamparan tadah hujan terluas di Jawa Tengah; defisit air tinggi saat kemarau El Niño dan ancaman angin kencang saat hujan.',
        },
        {
          province: 'Nusa Tenggara Barat',
          regencies: ['Bima', 'Dompu', 'Sumbawa'],
          soilAndClimateNote:
            'Sentra hamparan jagung lereng bukit nasional; suhu terik kemarau gadu > 36°C yang membutuhkan silika pelindung penguapan air ekstrem.',
        },
        {
          province: 'Lampung',
          regencies: ['Lampung Tengah', 'Lampung Timur', 'Lampung Selatan'],
          soilAndClimateNote:
            'Sentra jagung pipil pakan ternak utama Sumatera; tanah podsolik merah kuning dengan defisiensi unsur hara mikro seng (Zn).',
        },
        {
          province: 'Sulawesi Selatan',
          regencies: ['Jeneponto', 'Takalar', 'Gowa', 'Bantaeng'],
          soilAndClimateNote:
            'Sentra jagung pantai selatan Sulawesi; terpaan angin muson kencang yang sering merebahkan batang jagung menjelang masa panen.',
        },
      ],
      indonesiaExpansionHubs: [
        'Gorontalo (Boalemo, Pohuwato - Jagung Nasional)',
        'Sumatera Utara (Karo - Jagung Pipil Dataran Tinggi)',
        'Kalimantan Selatan (Tanah Laut)',
        'Nusa Tenggara Timur (Belu, Timor Tengah Utara)',
        'Sulawesi Tenggara (Konawe Selatan)',
        'Sumatera Barat (Pasaman Barat)',
      ],
    },
    commercialPillars: {
      pricingStrategy:
        'Volume-driven high-penetration pricing. Dipatok dengan harga bersahabat untuk petani hamparan: Rp 70.000 (500 ml) dan Rp 120.000 (1 Liter). Sangat menarik bagi kios saprotan daerah jagung dan padi untuk program bundling benih hibrida.',
      heroOffers: [
        {
          name: 'Botol Starter 500 ml (Trial Petani 0.5 Ha)',
          volume: '500 ml Botol Segel',
          priceIdr: 70000,
          targetFarmer: 'Petani jagung/padi pemula untuk aplikasi pencegahan bulai fase 15-20 HST.',
        },
        {
          name: 'Botol Batang Kokoh 1.000 ml (Standard Petani 1 Ha)',
          volume: '1.000 ml Botol Segel',
          priceIdr: 120000,
          targetFarmer: 'Petani jagung hibrida komersial untuk 2 kali aplikasi fase vegetatif dan bunga.',
        },
        {
          name: 'Paket Hamparan Jagung Makmur (Karton 12 Botol @ 1L)',
          volume: '12.000 ml Karton Segel',
          priceIdr: 1320000,
          targetFarmer: 'Kelompok tani hamparan jagung, kios saprotan sentra Tuban/Grobogan/Bima.',
        },
      ],
      proofAssets: [
        'Foto perbandingan batang jagung: Batang yang disemprot Kojien berdiameter 25% lebih tebal dan akar jangkar (brace root) mencengkeram kokoh ke tanah',
        'Video dokumentasi terpaan angin badai di Tuban: Blok jagung aplikasi Kojien tetap berdiri tegap, sementara blok kontrol rebah rata dengan tanah',
        'Uji laboratorium ketebalan perisai silika ganda (double silica layer) pada daun jagung',
        'Foto tongkol jagung berbaris rapi terisi penuh bernas sampai ujung rambut tanpa kopong',
        'Tabel kalkulasi selisih tonase panen: Blok Kojien menghasilkan 9.8 Ton/Ha vs Kontrol 7.6 Ton/Ha',
      ],
      objectionHandling: [
        {
          objection: 'Benih jagung saya sudah ada perlakuan obat bulai pabrikan, apakah masih perlu KOJIEN?',
          rebuttle:
            'Perlakuan benih (seed treatment) racun kimia pabrikan hanya bertahan efektif selama 10-14 hari pertama Pak. Padahal spora jamur bulai di udara paling ganas menyerang pada umur 15-30 HST saat daun muda sedang mekar. Semprotkan KOJIEN pada umur 15 HST untuk mempertebal dinding sel daun dengan silika bioaktif dan mengaktifkan fitoaleksin alami tanaman. Ini perlindungan ganda yang bikin tanaman kebal sampai panen!',
        },
        {
          objection: 'Apakah silika cair ini tidak bikin spuyer nozzle semprot mampet atau berkerak?',
          rebuttle:
            'Dijamin 100% tidak mampet Pak! KOJIEN bukan silika abu sekam atau kuarsa gilingan kasar, melainkan silika bioaktif Orthosilicic Acid (OSA) terlarut sempurna berukuran molekul nano. Cairannya jernih opalescent dan larut tuntas dalam air tanpa ampas sedikit pun.',
        },
        {
          objection: 'Apakah bisa dicampur dengan herbisida selektif jagung (seperti calaris/kayabas)?',
          rebuttle:
            'Bisa, namun untuk hasil terbaik dan keamanan optimal, lakukan uji jar-test botol 15 menit terlebih dahulu. Atau lebih dianjurkan disemprotkan tersendiri selang 3 hari setelah semprot herbisida selektif agar silika membantu mempercepat pemulihan tanaman jagung dari stres herbisida.',
        },
        {
          objection: 'Apakah KOJIEN cocok untuk tanaman padi sawah juga?',
          rebuttle:
            'Sangat cocok dan sangat disukai petani padi! Pada padi sawah, silika bioaktif KOJIEN memperbanyak anakan produktif, membuat daun bendera tegak kaku menghadap matahari, dan mengeraskan leher malai agar kebal dari jamur blast patah leher.',
        },
      ],
      csDecisionTree: [
        {
          farmerSymptomTrigger:
            'Petani jagung umur 18 HST lapor daun muda mulai bergaris putih pucat gejala bulai',
          csQuestion:
            'Berapa luas lahan jagung Bapak? Dan apakah di kebun sekitar sudah ada jagung yang terkena bulai?',
          recommendation:
            'Penyakit bulai sedang mulai menginfeksi! Segera semprotkan KOJIEN dosis 25 ml per tangki 16L besok pagi merata ke seluruh daun jagung. Silika bioaktif dan fitoaleksin akan mempertebal sel daun sebelum hifa jamur merusak titik tumbuh.',
          suggestedBundle: 'Botol 1 Liter KOJIEN Activator.',
        },
        {
          farmerSymptomTrigger:
            'Petani khawatir tanaman jagungnya umur 40 HST roboh karena musim hujan berangin kencang',
          csQuestion:
            'Berapa populasi tanaman jagung Bapak? Dan apakah batangnya saat ini tampak langsing kurus?',
          recommendation:
            'Segera semprotkan KOJIEN 30 ml per tangki 16L pada batang dan daun. Silika bioaktif mempercepat pengerasan serat kayu lignin dan merangsang akar jangkar kokoh mencengkeram tanah agar tahan terpaan angin badai.',
          suggestedBundle: 'Paket 2 Botol 1 Liter KOJIEN per Hektar.',
        },
        {
          farmerSymptomTrigger:
            'Petani padi sawah mengeluh anakan padinya sedikit dan daunnya terkulai lemas',
          csQuestion:
            'Sekarang umur padi berapa HST Pak? Apakah air irigasi sawah lancar?',
          recommendation:
            'Kombinasikan KOJIEN (20 ml) + BENSU (20 ml) per tangki 16L disemprotkan pada umur 15-20 HST. Sinergi ini akan memicu ledakan anakan produktif hingga > 25 batang per rumpun dan membuat daun tegak menyerap sinar matahari.',
          suggestedBundle: 'Paket Sinergi Padi Rumpun (Kojien 1L + Bensu 1L).',
        },
      ],
    },
    climateIntegration: {
      elNino2026Role:
        'Kekeringan panjang El Niño 2026 dengan indeks suhu tinggi memicu penguapan air tanaman secara liar. Silika bioaktif KOJIEN membentuk perisai silika ganda yang memangkas laju transpirasi berlebih hingga 30-35%, menjaga tanaman jagung dan padi tetap segar tanpa layu kekeringan.',
      laNina2027Role:
        'Musim hujan lebat dan angin kencang La Niña 2027 sering merebahkan hamparan padi dan jagung yang siap panen. KOJIEN memperkuat serat lignin batang utama dan merangsang akar jangkar kokoh penahan rebah.',
      goldenApplicationWindows:
        'Puncak kebutuhan: November-Januari (tanam rendeng jagung hibrida & anakan padi MT 1) serta Mei-Juli 2027 (fase generatif gadu MT 2).',
    },
    metaAdsPlaybook: {
      coreHooks: [
        {
          angleId: 'kojien-hook-01',
          angleName: 'Anti-Bulai Alert / Penyelamat Jagung Muda',
          targetProblem: 'Jagung muda 15-30 HST terancam daun putih bergaris bulai yang bikin kerdil',
          primaryHeadline:
            'Jagung Muda Terancam Daun Putih Bergaris Bulai? Kunci Dinding Sel Batang Sebelum Hifa Jamur Masuk!',
          hookQuestion:
            'Pusing tiap musim tanam jagung selalu dihantui penyakit bulai yang bikin tanaman kerdil tanpa tongkol?',
          bodyCopy:
            'Obat bulai biasa cuma racun kimia yang gampang resisten! Lindungi tanaman jagung Anda dengan KOJIEN Activator: formula silika bioaktif Orthosilicic Acid 18% dan bio-fitoaleksin yang mempertebal dinding sel daun menjadi perisai ganda. Haustorium jamur bulai tidak bisa menembus sel daun, jagung tumbuh sehat hijau tegap!',
          callToAction: 'Pesan KOJIEN Pelindung Jagung Sekarang',
          suggestedCreative:
            'Foto perbandingan: Daun jagung bergaris bulai putih rusak vs Daun jagung sehat hijau kaku tegap pasca aplikasi KOJIEN',
          seasonalFit: 'Awal Musim Tanam Jagung (November - Januari & April - Mei)',
        },
        {
          angleId: 'kojien-hook-02',
          angleName: 'Batang Kokoh Anti-Rebah Angin Badai',
          targetProblem: 'Batang padi dan jagung rapuh roboh rebah menjelang masa panen',
          primaryHeadline:
            'Hujan Badai Bikin Batang Padi & Jagung Roboh Rebah Rata Tanah? Perkokoh Batang dengan Silika Bioaktif!',
          hookQuestion:
            'Pernah menangis lihat hamparan jagung atau padi yang tinggal hitungan hari panen tiba-tiba roboh diterjang angin badai?',
          bodyCopy:
            'Jagung yang roboh bikin tongkol busuk terendam air dan biaya panen membengkak! Semprotkan KOJIEN pada umur 35 HST: silika bioaktifnya memperbesar diameter batang, memperkuat serat lignin kayu, dan menumbuhkan akar jangkar yang mencengkeram tanah kokoh tahan badai!',
          callToAction: 'Amankan Tanaman dari Bahaya Rebah',
          suggestedCreative:
            'Video testimoni petani di Tuban: Hamparan jagung aplikasi Kojien tetap berdiri tegap di tengah kebun tetangga yang rebah rata tanah',
          seasonalFit: 'Musim Hujan Rendeng & Pancaroba Angin Kencang',
        },
        {
          angleId: 'kojien-hook-03',
          angleName: 'Anti-Dehidrasi Kemarau Kering El Niño',
          targetProblem: 'Tanaman jagung layu menggulung saat kemarau terik panjang',
          primaryHeadline:
            'Terik El Niño Bikin Tanah Sawah Retak & Daun Jagung Menggulung? Pangkas Penguapan 30% Tanpa Khawatir Panas!',
          hookQuestion:
            'Khawatir jagung Anda gagal panen karena kekurangan air irigasi di musim kemarau?',
          bodyCopy:
            'Silika bioaktif KOJIEN melapisi stomata daun dan menurunkan laju transpirasi penguapan air hingga 35%. Tanaman jagung tetap segar, daun tegak menghadap matahari, dan tongkol terisi padat bernas meski di lahan tadah hujan kering!',
          callToAction: 'Konsultasi Perawatan Kemarau Kering',
          suggestedCreative:
            'Foto tanaman jagung hijau segar di lahan tanah retak kemarau dengan tongkol berisi penuh',
          seasonalFit: 'Mei - September (Puncak Kemarau El Niño Sentra Jagung NTB & Jawa)',
        },
        {
          angleId: 'kojien-hook-04',
          angleName: 'Tongkol Padat Berisi Sampai Ujung',
          targetProblem: 'Tongkol jagung kopong di ujung (tidak terisi penuh) dan bobot timbangan ringan',
          primaryHeadline:
            'Tongkol Jagung Berisi Penuh Sampai Ujung Tanpa Kopong: Rahasia Panen Tembus 10 Ton per Hektar!',
          hookQuestion:
            'Mau tongkol jagung Anda panjang, besar, padat berbiji kuning mengkilap sampai ke pucuk rambut?',
          bodyCopy:
            'Sinergi Zinc Chelate dan silika bioaktif KOJIEN memaksimalkan translokasi hara ke tongkol buah. Biji jagung berbaris rapat, bobot timbangan pipil melonjak tajam, hasil panen tembus rekor tonase baru!',
          callToAction: 'Pesan Paket Juara Tonase Jagung',
          suggestedCreative:
            'Foto close-up tongkol jagung hibrida yang dibuka kulitnya memperlihatkan biji kuning padat penuh sampai pucuk',
          seasonalFit: 'Fase Generatif Jagung (Sepanjang Tahun)',
        },
      ],
      targetingInterests: [
        'Petani jagung',
        'Budidaya jagung',
        'Padi sawah',
        'Jagung hibrida',
        'Pertanian Indonesia',
        'Tuban',
        'Grobogan',
        'Bima',
        'Lampung Tengah',
        'Jeneponto',
        'Lamongan',
      ],
      exclusions: ['Pekerja kantoran tanpa lahan', 'Usia di bawah 22 tahun'],
    },
    faqs: [
      {
        question: 'Apa bedanya silika bioaktif KOJIEN dengan abu sekam atau silika tambang gilingan?',
        answer:
          'Silika tambang atau abu sekam adalah silika polimer kristalin kasar yang tidak larut air dan sulit diserap tanaman (bisa menyumbat nozzle sprayer). KOJIEN adalah silika bioaktif larut air terstabilisasi dalam bentuk Orthosilicic Acid (H4SiO4) berukuran molekul nano yang 100% larut dan langsung diserap jaringan tanaman.',
        category: 'INGREDIENTS',
      },
      {
        question: 'Kapan waktu terbaik menyemprotkan KOJIEN pada tanaman jagung?',
        answer:
          'Aplikasi pertama sangat penting pada umur 15-20 HST (fase pencegahan bulai dan penguatan daun tegak). Aplikasi kedua pada umur 35-40 HST (fase penguatan batang tahan rebah dan pembentukan tongkol).',
        category: 'APPLICATION',
      },
      {
        question: 'Apakah KOJIEN bisa dicampur dengan herbisida selektif jagung?',
        answer:
          'Bisa, namun lakukan uji jar-test 15 menit terlebih dahulu. Atau lebih disarankan diaplikasikan tersendiri selang 3 hari setelah herbisida agar tanaman jagung cepat pulih dari stres herbisida.',
        category: 'COMPATIBILITY',
      },
      {
        question: 'Apakah KOJIEN efektif mencegah penyakit blast pada padi sawah?',
        answer:
          'Sangat efektif. Silika yang mengeras di dinding sel pelepah dan leher malai padi menghalangi hifa jamur Pyricularia oryzae menembus jaringan sel, sehingga malai padi tidak patah leher saat musim hujan rendeng.',
        category: 'APPLICATION',
      },
      {
        question: 'Berapa dosis KOJIEN untuk satu tangki semprot 16 Liter?',
        answer:
          'Dosis standar adalah 20 - 25 ml per tangki 16 Liter (sekitar 1.0 - 1.5 ml per Liter air). Satu botol 1 Liter KOJIEN cukup untuk 40-50 tangki semprot.',
        category: 'APPLICATION',
      },
      {
        question: 'Apakah aman digunakan pada tanaman sayuran hortikultura seperti bawang merah dan cabai?',
        answer:
          'Sangat aman dan direkomendasikan. Pada bawang merah dan cabai, silika bioaktif KOJIEN mempertebal dinding daun sehingga tidak mudah diserang thrips dan tidak gampang rebah terkulai saat hujan lebat.',
        category: 'APPLICATION',
      },
    ],
  },
];

// ==========================================
// 2. MIX & MATCH CROSS-PRODUCT SYNERGY RULES
// ==========================================

export const MIX_MATCH_RULES: MixMatchRule[] = [
  {
    id: 'MM-HORTI-01',
    cropCategory: 'Hortikultura Buah & Sayuran',
    cropNames: ['Cabai', 'Tomat', 'Melon', 'Semangka'],
    growthStage: 'Rotasi Musim Penuh (Vegetatif ke Generatif)',
    primaryProduct: 'bensu',
    partnerProduct: 'saratoga',
    synergyDescription:
      'Kombinasi Emas Hortikultura: Gunakan BENSU pada fase vegetatif (10-35 HST) untuk memacu pertumbuhan tunas, perakaran aktif, dan pemulihan stres cuaca. Saat masuk fase inisiasi bunga (40+ HST), beralih ke SARATOGA untuk mengunci pembungaan, pembesaran pentil buah, dan pembentukan Grade A.',
    sequenceProtocol:
      'Aplikasi 1-2 (Umur 15 & 25 HST): BENSU 2.0 ml/L -> Aplikasi 3-5 (Umur 40, 55, 70 HST): SARATOGA 1.5 ml/L.',
    tankMixSafety: 'APPLY_SEPARATELY',
    tankMixGuidelines:
      'Aplikasikan secara bergantian sesuai fase fenologi tanaman. Hindari mencampur BENSU dan Saratoga dalam satu tangki semprot yang sama pada hari yang sama agar tanaman tidak mengalami kelebihan beban auksin-sitokinin dan asam amino berlebih.',
  },
  {
    id: 'MM-PADI-02',
    cropCategory: 'Tanaman Pangan Sawah',
    cropNames: ['Padi Sawah (Inpari, Ciherang, Ketan)'],
    growthStage: 'Rotasi Anakan Maksimal ke Pengisian Bulir Bernas',
    primaryProduct: 'kojien',
    partnerProduct: 'saratoga',
    synergyDescription:
      'Protokol Panen Raya Padi Super: KOJIEN diaplikasikan pada umur 15-20 HST untuk merangsang anakan produktif seragam (28-32 anakan) dan batang silika kokoh. Lalu SARATOGA diaplikasikan saat bunting tua (50 HST) dan malai keluar 70% (68 HST) untuk memastikan gabah terisi padat bernas sampai ke butir paling pangkal.',
    sequenceProtocol:
      'Fase Anakan: KOJIEN 2.0 ml/L -> Fase Bunting: SARATOGA 1.5 ml/L -> Fase Malai Merunduk: SARATOGA 1.5 ml/L.',
    tankMixSafety: 'APPLY_SEPARATELY',
    tankMixGuidelines:
      'Masing-masing produk diaplikasikan pada fase kritis yang berbeda. Sinergi ini terbukti menaikkan hasil panen padi riil dari 6.2 ton menjadi 8.4 ton per hektar.',
  },
  {
    id: 'MM-SAWIT-03',
    cropCategory: 'Perkebunan',
    cropNames: ['Kelapa Sawit (TM & TBM)'],
    growthStage: 'Sanitasi & Pemulihan Pokok Terpapar Jamur Ganoderma',
    primaryProduct: 'aussie',
    synergyDescription:
      'Protokol Penyelamatan Blok Sawit: Pada pokok yang terdeteksi menguning pelepah atau ada kulat di pangkal batang, kikis jamur dan oleskan AUSSIE murni pada luka batang, lalu kocor 200 ml larutan AUSSIE ke perakaran. Pada pokok sehat di radius 10 meter sekelilingnya, kocor preventif 150 ml AUSSIE untuk memutus rantai penularan spora.',
    sequenceProtocol:
      'Hari ke-0 (Kikis & Oles AUSSIE murni + Kocor 200 ml) -> Hari ke-14 (Kocor putaran ke-2 200 ml) -> Hari ke-30 (Evaluasi pucuk daun membuka).',
    tankMixSafety: 'APPLY_SEPARATELY',
    tankMixGuidelines:
      'Jangan mencampur AUSSIE dengan herbisida glifosat/parakuat atau fungisida tembaga pekat dalam tangki yang sama.',
  },
  {
    id: 'MM-JAGUNG-04',
    cropCategory: 'Tanaman Pangan Hamparan',
    cropNames: ['Jagung Hibrida'],
    growthStage: 'Proteksi Bulai & Kunci Tongkol Ganda',
    primaryProduct: 'kojien',
    partnerProduct: 'bensu',
    synergyDescription:
      'Pertolongan Darurat Jagung Mandek / Stres Terbakar Terik: Jika tanaman jagung muda mengalami keracunan herbisida selektif atau stres kekeringan ekstrem, semprotkan BENSU 2 ml/L untuk membuka kembali stomata daun. Setelah tanaman kembali segar (umur 25 HST), lanjutkan dengan KOJIEN 2.5 ml/L untuk memperkokoh batang dan membesarkan tongkol.',
    sequenceProtocol:
      'Darurat Mandek: Semprot BENSU 2 ml/L -> Fase Normal: KOJIEN 2.5 ml/L di umur 35 HST.',
    tankMixSafety: 'APPLY_SEPARATELY',
    tankMixGuidelines:
      'BENSU untuk restart vegetatif darurat; KOJIEN untuk ketahanan struktural batang dan pengisian tongkol.',
  },
  {
    id: 'MM-BAWANG-05',
    cropCategory: 'Hortikultura Umbi',
    cropNames: ['Bawang Merah (Allium ascalonicum)'],
    growthStage: 'Dari Daun Hijau Tegak ke Umbi Super Mengkilap',
    primaryProduct: 'bensu',
    partnerProduct: 'saratoga',
    synergyDescription:
      'Protokol Bawang Merah Brebes/Nganjuk: Umur 15-25 HST semprot BENSU untuk mencegah pucuk kuning dan memperbanyak anakan daun kaku tegap. Umur 35 & 45 HST semprot SARATOGA untuk mengalirkan seluruh cadangan makanan daun menjadi umbi super besar, padat, beraroma tajam, dan merah menyala.',
    sequenceProtocol:
      'Umur 15 & 22 HST: BENSU 1.5 ml/L -> Umur 35 & 45 HST: SARATOGA 1.5 ml/L.',
    tankMixSafety: 'APPLY_SEPARATELY',
    tankMixGuidelines:
      'Dapat dicampur dengan fungisida mankozeb protektif dosis normal. Sangat efektif menekan susut bobot saat proses penjemuran askip.',
  },
]

// ==========================================
// 3. 15-MONTH CLIMATE CAMPAIGN PLAYBOOK (OCT 2026 - DEC 2027)
// ==========================================

export const MONTHLY_PRODUCT_CAMPAIGNS_2026_2027: MonthlyProductCampaign[] = [
  {
    monthIndex: 1,
    year: 2026,
    monthNumber: 10,
    monthName: 'Oktober 2026',
    quarterLabel: 'Q4 2026 (Subround 3)',
    climatePhenomenon:
      'El Niño Kuat Aktif (+1.68°C) & Kemunduran Awal Musim Hujan',
    agroClimateImpact:
      '61.08% ZOM mengalami kemunduran hujan 1-3 dasarian. Lahan sawah masih bera kering; petani jagung mulai olah tanah dengan pasokan air terbatas.',
    heroProduct: 'kojien',
    secondaryProduct: 'bensu',
    campaignTheme: 'Persiapan Tanam Awal & Anti-Stres Kekeringan Benih',
    headlineHook:
      'Hujan Terlambat Bikin Jadwal Tanam Mepet? Kunci Pertumbuhan Jagung & Padi Tumbuh Rata Sejak Awal!',
    commercialActionKios:
      'Salurkan stok awal KOJIEN ke kios sentra jagung (Tuban, Grobogan, Lampung) dan pasok BENSU untuk persemaian cabai/tomat yang kepanasan.',
    fieldAgronomistAction:
      'Edukasi petani tentang perlakuan bibit hemat air dan penyemprotan KOJIEN umur 15 HST untuk mencegah kerdil.',
    targetSentraProvinces: [
      'Jawa Timur',
      'Jawa Tengah',
      'Lampung',
      'Sulawesi Selatan',
    ],
    estimatedDemandIndex: 78,
  },
  {
    monthIndex: 2,
    year: 2026,
    monthNumber: 11,
    monthName: 'November 2026',
    quarterLabel: 'Q4 2026 (Subround 3)',
    climatePhenomenon: 'Awal Musim Hujan Tiba Serentak di 40.49% ZOM',
    agroClimateImpact:
      'Hujan deras pertama mengguyur Sumatera, Jawa, dan Kalimantan. Risiko tinggi tanaman sayuran kaget air (transplanting shock) dan ledakan jamur.',
    heroProduct: 'bensu',
    secondaryProduct: 'kojien',
    campaignTheme: 'Penyelamatan Pindah Tanam Hortikultura & Tanam Raya Jagung',
    headlineHook:
      'Musim Hujan Tiba Serentak! Hindari Tanaman Cabai Kaget Air, Busuk Akar & Mandek Tumbuh.',
    commercialActionKios:
      'Puncak perputaran BENSU 500 ml dan 1 Liter di kios horti (Brebes, Garut, Kediri). Permintaan KOJIEN melonjak seiring tanam raya jagung.',
    fieldAgronomistAction:
      'Kawal drainase bedengan dan pandu petani aplikasi kocor BENSU 2 ml/L pada tanaman cabai umur 7-14 HST.',
    targetSentraProvinces: [
      'Jawa Barat',
      'Jawa Tengah',
      'Jawa Timur',
      'Sumatera Utara',
    ],
    estimatedDemandIndex: 94,
  },
  {
    monthIndex: 3,
    year: 2026,
    monthNumber: 12,
    monthName: 'Desember 2026',
    quarterLabel: 'Q4 2026 (Subround 3)',
    climatePhenomenon: 'Puncak Tanam Rendeng MT 1 & Kelembaban Udara Naik',
    agroClimateImpact:
      'Pertanaman jagung umur 20-35 HST rawan serangan bulai. Padi sawah umur anakan aktif butuh penguat batang.',
    heroProduct: 'kojien',
    secondaryProduct: 'saratoga',
    campaignTheme: 'Kekebalan Batang Tanaman Pangan & Persiapan Bunga Horti',
    headlineHook:
      'Amankan Jagung dari Bulai & Batang Roboh! Kunci Anakan Padi Maksimal Sebelum Akhir Tahun.',
    commercialActionKios:
      'Stok jerigen KOJIEN 1 Liter & 5 Liter di distributor utama. Mulai perkenalkan SARATOGA untuk petani bawang merah umur 30 HST.',
    fieldAgronomistAction:
      'Demplot perbandingan anakan padi KOJIEN (28 anakan) vs kontrol (16 anakan) di Indramayu dan Sragen.',
    targetSentraProvinces: ['Jawa Timur', 'Jawa Tengah', 'Lampung', 'NTB'],
    estimatedDemandIndex: 90,
  },
  {
    monthIndex: 4,
    year: 2027,
    monthNumber: 1,
    monthName: 'Januari 2027',
    quarterLabel: 'Q1 2027 (Subround 1)',
    climatePhenomenon:
      'Puncak Musim Hujan Rendeng & Peluruhan El Niño (+0.42°C)',
    agroClimateImpact:
      'Curah hujan ekstrem di koridor Jawa dan Sumatera. Padi masuk fase bunting; kebun sawit basah jenuh memicu pembusukan kulat Ganoderma.',
    heroProduct: 'aussie',
    secondaryProduct: 'saratoga',
    campaignTheme: 'Proteksi Darurat Ganoderma Sawit & Pengisian Bunting Padi',
    headlineHook:
      'Hujan Rendeng Deras Bikin Kulat Sawit Cepat Merebak! Lindungi Pangkal Batang Sebelum Pokok Tumbang.',
    commercialActionKios:
      'Pengiriman massal AUSSIE Sawit ke sentra Riau (Kampar, Rohul) dan Sumut. Pasok SARATOGA ke sentra padi bunting.',
    fieldAgronomistAction:
      'Sosialisasi SOP sanitasi kulat batang sawit dan aplikasi pasta AUSSIE pada luka pokok.',
    targetSentraProvinces: [
      'Riau',
      'Sumatera Utara',
      'Sumatera Selatan',
      'Kalimantan Barat',
    ],
    estimatedDemandIndex: 88,
  },
  {
    monthIndex: 5,
    year: 2027,
    monthNumber: 2,
    monthName: 'Februari 2027',
    quarterLabel: 'Q1 2027 (Subround 1)',
    climatePhenomenon:
      'Transisi Menuju ENSO Netral & Panen Padi Dataran Rendah',
    agroClimateImpact:
      'Cabai dan melon masuk fase pembentukan buah akhir menyambut momentum harga Imlek dan menjelang Ramadhan.',
    heroProduct: 'saratoga',
    secondaryProduct: 'bensu',
    campaignTheme: 'Kunci Panen Raya Hortikultura Grade A & Bobot Timbangan',
    headlineHook:
      'Panen Cabai & Melon Harga Puncak! Kunci Kualitas Grade A, Buah Padat & Tahan Simpan Berhari-hari.',
    commercialActionKios:
      'Display botol SARATOGA di etalase depan kios horti. Uji petik timbangan buah di kios tani Kediri dan Banyuwangi.',
    fieldAgronomistAction:
      'Dampingi petani aplikasi SARATOGA 10 hari sebelum panen untuk memadatkan daging buah.',
    targetSentraProvinces: ['Jawa Timur', 'Jawa Tengah', 'Jawa Barat', 'NTB'],
    estimatedDemandIndex: 96,
  },
  {
    monthIndex: 6,
    year: 2027,
    monthNumber: 3,
    monthName: 'Maret 2027',
    quarterLabel: 'Q1 2027 (Subround 1)',
    climatePhenomenon:
      'Puncak Panen Raya Padi Nasional & Likuiditas Kas Melimpah',
    agroClimateImpact:
      '45-50% produksi padi nasional dipanen. Likuiditas kas petani tertinggi; persiapan perputaran Musim Tanam Gadu (MT 2).',
    heroProduct: 'kojien',
    secondaryProduct: 'bensu',
    campaignTheme: 'Reinvestasi Kas Panen & Persiapan Saprodi Musim Gadu',
    headlineHook:
      'Uang Panen Sudah di Tangan! Amankan Kestabilan Tanam Gadu 2027 Tanpa Kaget Cuaca.',
    commercialActionKios:
      'Distributor mengunci pesanan paket bundling KOJIEN + BENSU untuk alokasi musim tanam April-Mei.',
    fieldAgronomistAction:
      'Penagihan kredit yarnen lancar dan edukasi pengolahan lahan cepat pasca panen padi.',
    targetSentraProvinces: [
      'Jawa Timur',
      'Jawa Tengah',
      'Jawa Barat',
      'Sulawesi Selatan',
    ],
    estimatedDemandIndex: 85,
  },
  {
    monthIndex: 7,
    year: 2027,
    monthNumber: 4,
    monthName: 'April 2027',
    quarterLabel: 'Q2 2027 (Subround 2)',
    climatePhenomenon:
      'ENSO Netral Stabil (72% Probabilitas) & Awal Musim Kemarau',
    agroClimateImpact:
      'Tanam raya palawija (jagung) dan hortikultura sayuran (bawang merah Brebes, semangka Banyuwangi).',
    heroProduct: 'bensu',
    secondaryProduct: 'kojien',
    campaignTheme: 'Penyelamatan Bibit Gadu dari Stres Suhu Panas Awal',
    headlineHook:
      'Tanam Gadu di Awal Kemarau? Jaga Akar Tetap Dingin & Tunas Tumbuh Cepat dengan BENSU.',
    commercialActionKios:
      'Penyaluran massal BENSU ke Brebes, Nganjuk, dan sentra semangka Banyuwangi.',
    fieldAgronomistAction:
      'Pandu aplikasi kocor BENSU pada lubang tanam bibit semangka dan bawang merah.',
    targetSentraProvinces: ['Jawa Tengah', 'Jawa Timur', 'NTB', 'Lampung'],
    estimatedDemandIndex: 92,
  },
  {
    monthIndex: 8,
    year: 2027,
    monthNumber: 5,
    monthName: 'Mei 2027',
    quarterLabel: 'Q2 2027 (Subround 2)',
    climatePhenomenon:
      'Pertumbuhan Vegetatif Hortikultura Gadu & Kemarau Basah Ringan',
    agroClimateImpact:
      'Tanaman hortikultura masuk fase pembungaan serempak. Petani tembakau mulai tanam lapangan.',
    heroProduct: 'saratoga',
    secondaryProduct: 'bensu',
    campaignTheme: 'Kunci Bunga Tidak Rontok & Pembesaran Buah Hortikultura',
    headlineHook:
      'Bunga Cabai & Melon Rawan Rontok Diterpa Panas? Ikat Pentil Buah dengan Serum Asam Amino 47.5%.',
    commercialActionKios:
      'Fokus penjualan SARATOGA 500 ml dan 1 Liter untuk kios hortikultura dataran rendah dan menengah.',
    fieldAgronomistAction:
      'Edukasi petani tentang bahaya defisiensi boron dan pentingnya Chitosan pada pembentukan dinding sel buah.',
    targetSentraProvinces: ['Jawa Timur', 'Jawa Tengah', 'Jawa Barat'],
    estimatedDemandIndex: 95,
  },
  {
    monthIndex: 9,
    year: 2027,
    monthNumber: 6,
    monthName: 'Juni 2027',
    quarterLabel: 'Q2 2027 (Subround 2)',
    climatePhenomenon:
      'Kemarau Basah Dimulai (Hujan Masih Turun di Sentra Pangan)',
    agroClimateImpact:
      'Indeks Pertanaman (IP) sawah meningkat; petani menanam padi MT 2 dan MT 3 tanpa defisit air. Pokok sawit menyerap hara maksimal.',
    heroProduct: 'aussie',
    secondaryProduct: 'saratoga',
    campaignTheme: 'Pemulihan Pokok Sawit & Pengisian Umbi Bawang Merah',
    headlineHook:
      'Pelepah Sawit Kuning & Hasil Janjang Turun? Rawat Perakaran Sekarang Sebelum Masa Panen Puncak.',
    commercialActionKios:
      'Kios perkebunan Sumatera dan Kalimantan memacu penjualan paket AUSSIE Jerigen 4 Liter.',
    fieldAgronomistAction:
      'Kunjungan kebun kelompok tani sawit mandiri untuk evaluasi pokok pasca stres kekeringan tahun lalu.',
    targetSentraProvinces: [
      'Riau',
      'Sumatera Utara',
      'Kalimantan Tengah',
      'Jawa Tengah',
    ],
    estimatedDemandIndex: 82,
  },
  {
    monthIndex: 10,
    year: 2027,
    monthNumber: 7,
    monthName: 'Juli 2027',
    quarterLabel: 'Q3 2027 (Subround 2)',
    climatePhenomenon:
      'Potensi La Niña Lemah Mulai Terbentuk (58% Probabilitas)',
    agroClimateImpact:
      'Kelembaban udara tinggi (>80% RH) memicu infeksi jamur daun dan antraknosa pada cabai musim kemarau basah.',
    heroProduct: 'saratoga',
    secondaryProduct: 'bensu',
    campaignTheme: 'Perisai Chitosan Alami Penangkal Antraknosa & Buah Busuk',
    headlineHook:
      'Kemarau Basah Rawan Bikin Buah Cabai Busuk Patek? Pertebal Kulit Buah dengan Formula Japanese Complex.',
    commercialActionKios:
      'Pasok SARATOGA ke kios sentra cabai Magelang, Temanggung, dan Malang.',
    fieldAgronomistAction:
      'Uji visual ketahanan buah cabai berselimut Chitosan Saratoga saat hujan malam hari.',
    targetSentraProvinces: ['Jawa Tengah', 'Jawa Timur', 'Sumatera Barat'],
    estimatedDemandIndex: 91,
  },
  {
    monthIndex: 11,
    year: 2027,
    monthNumber: 8,
    monthName: 'Agustus 2027',
    quarterLabel: 'Q3 2027 (Subround 2)',
    climatePhenomenon: 'Fase La Niña Lemah Aktif & Musim Tanam Padi MT 3',
    agroClimateImpact:
      'Air tanah berlimpah memungkinkan rotasi tanam padi ketiga (IP 300). Kebutuhan penguat batang jagung dan anakan padi tinggi.',
    heroProduct: 'kojien',
    secondaryProduct: 'bensu',
    campaignTheme: 'Maksimalkan IP 300 Padi Sawah & Jagung Bebas Rebah',
    headlineHook:
      'Bisa Tanam Padi Tiga Kali Setahun? Pastikan Batang Kokoh Tahan Rebah Angin dengan KOJIEN.',
    commercialActionKios:
      'Promosi paket panen berkelanjutan KOJIEN di kios lumbung padi irigasi teknis Pantura.',
    fieldAgronomistAction:
      'Sosialisasi manajemen pemupukan silika bioaktif di lahan sawah intensif.',
    targetSentraProvinces: [
      'Jawa Barat',
      'Jawa Tengah',
      'Jawa Timur',
      'Sulawesi Selatan',
    ],
    estimatedDemandIndex: 84,
  },
  {
    monthIndex: 12,
    year: 2027,
    monthNumber: 9,
    monthName: 'September 2027',
    quarterLabel: 'Q3 2027 (Subround 3)',
    climatePhenomenon:
      'Awal Musim Hujan 2027/2028 Tepat Waktu Tanpa Keterlambatan',
    agroClimateImpact:
      'Distribusi hujan normal; persiapan lahan serentak untuk Musim Tanam Utama MT 1 2027/2028.',
    heroProduct: 'kojien',
    secondaryProduct: 'aussie',
    campaignTheme: 'Stok Awal Musim Tanam Utama 2027/2028 & Perawatan Sawit',
    headlineHook:
      'Musim Hujan Datang Tepat Waktu! Amankan Stok Stimulator Tanam Raya Sebelum Harga Kios Naik.',
    commercialActionKios:
      'Pre-order massal saprotan di distributor dan kios lini 3.',
    fieldAgronomistAction:
      'Penyusunan jadwal semprot massal poktan jagung dan padi di sentra pangan.',
    targetSentraProvinces: ['Jawa Timur', 'Lampung', 'Jawa Tengah', 'Riau'],
    estimatedDemandIndex: 89,
  },
  {
    monthIndex: 13,
    year: 2027,
    monthNumber: 10,
    monthName: 'Oktober 2027',
    quarterLabel: 'Q4 2027 (Subround 3)',
    climatePhenomenon: 'Musim Rendeng Serempak Normal di Seluruh Indonesia',
    agroClimateImpact:
      'Tanam raya serempak padi dan jagung. Tanaman sayuran cabai masuk fase vegetatif awal.',
    heroProduct: 'bensu',
    secondaryProduct: 'kojien',
    campaignTheme: 'Akselerasi Tunas Serentak & Perlindungan Akar Hujan',
    headlineHook:
      'Tanam Raya Serentak Dimulai! Pastikan Bibit Sayur Bebas Stres & Cepat Mengakar dengan BENSU.',
    commercialActionKios:
      'Penjualan puncak BENSU 250 ml dan 500 ml di seluruh kios sentra hortikultura nasional.',
    fieldAgronomistAction:
      'Kawal aplikasi perendaman bibit dan semprot vegetatif pertama umur 10 HST.',
    targetSentraProvinces: [
      'Jawa Barat',
      'Jawa Tengah',
      'Jawa Timur',
      'Sumatera Utara',
    ],
    estimatedDemandIndex: 98,
  },
  {
    monthIndex: 14,
    year: 2027,
    monthNumber: 11,
    monthName: 'November 2027',
    quarterLabel: 'Q4 2027 (Subround 3)',
    climatePhenomenon: 'La Niña Lemah Puncak (Curah Hujan di Atas Normal)',
    agroClimateImpact:
      'Curah hujan lebat meningkatkan kelembaban. Ancaman busuk pucuk sawit dan blast daun padi sangat tinggi.',
    heroProduct: 'aussie',
    secondaryProduct: 'saratoga',
    campaignTheme: 'Benteng Pertahanan Tanaman dari Jamur & Kualitas Buah',
    headlineHook:
      'Hujan Terus Menerus Rawan Bikin Pokok Sawit & Buah Membusuk! Bentengi dengan Formula Bio-Organik.',
    commercialActionKios:
      'Alokasi darurat AUSSIE Sawit ke sentra perkebunan Riau, Sumut, dan Kalbar.',
    fieldAgronomistAction:
      'Inspeksi lapangan deteksi dini jamur dan pandu aplikasi semprot Chitosan Saratoga pada horti buah.',
    targetSentraProvinces: [
      'Riau',
      'Sumatera Utara',
      'Kalimantan Barat',
      'Jawa Tengah',
    ],
    estimatedDemandIndex: 93,
  },
  {
    monthIndex: 15,
    year: 2027,
    monthNumber: 12,
    monthName: 'Desember 2027',
    quarterLabel: 'Q4 2027 (Subround 3)',
    climatePhenomenon: 'Fase Padi Bunting Raya & Pengisian Tongkol Jagung',
    agroClimateImpact:
      'Pertanaman pangan dan hortikultura menyongsong panen raya awal 2028.',
    heroProduct: 'saratoga',
    secondaryProduct: 'kojien',
    campaignTheme: 'Kunci Pengisian Bobot Panen Akhir Tahun & Grade A',
    headlineHook:
      'Kunci Bobot Gabah Bernas & Buah Padat Maksimal Menyongsong Panen Raya 2028!',
    commercialActionKios:
      'Tutup buku akhir tahun dengan program bundling reward Saratoga + Kojien untuk distributor berprestasi.',
    fieldAgronomistAction:
      'Dokumentasi hasil demplot panen dan testimoni kepuasan petani.',
    targetSentraProvinces: [
      'Jawa Timur',
      'Jawa Tengah',
      'Jawa Barat',
      'Sulawesi Selatan',
    ],
    estimatedDemandIndex: 92,
  },
]

// ==========================================
// 4. MERMAID MINDMAP DIAGRAM DATA
// ==========================================

export const PRODUCTS_ECOSYSTEM_MINDMAP_MERMAID = `mindmap
  root((Ekosistem Produk Agrimarket))
    AUSSIE Sawit
      Kategori: Plant Recovery Stimulator
      Target: Kelapa Sawit (TM & TBM)
      Fokus Utama: Recovery Pokok Lemah & Jamur Ganoderma
      Aplikasi: Siram Pangkal Batang & Oles Pasta Murni
      Sentra: Riau, Sumut, Sumsel, Jambi, Kalbar, Kalteng, Kaltim
      Dampak Iklim:
        El Nino 2026: Cegah Kematian Pokok Akibat Defisit Air
        La Nina 2027: Hambat Penularan Spora Jamur Lembab
      Meta Ads Angle: Fear of Tree Loss / Jangan Tunggu Sawit Mati
    BENSU Hortikultura
      Kategori: Growth Restart Stimulator
      Target: Cabai, Tomat, Bawang Merah, Sayuran
      Fokus Utama: Anti-Stres Cuaca, Daun Kuning, Mandek Tumbuh
      Aplikasi: Semprot Daun Pagi 2 ml/L & Kocor Lubang Tanam
      Sentra: Brebes, Kediri, Garut, Malang, Karo
      Dampak Iklim:
        El Nino 2026: Osmoprotektan Anti-Layu Terik > 36C
        La Nina 2027: Revitalisasi Akar Busuk Rendaman Air
      Meta Ads Angle: Panic Recovery / Tanaman Mandek Jangan Cuma Ditambah Pupuk
    SARATOGA Plant Serum
      Kategori: Strategic Plant Serum
      Target: Buah Horti, Padi Bunting, Bawang Merah
      Fokus Utama: Kualitas Panen, Bobot Timbangan, Grade A
      Formula: Japanese Pro-Plant Complex Asam Amino 47.5% + Chitosan + Omega 3
      Aplikasi: Semprot Kritis Bunga, Pentil Buah, Pengisian
      Sentra: Banyuwangi, Nganjuk, Indramayu, Demak
      Dampak Iklim:
        El Nino 2026: Suplai Energi Cepat Hindari Rontok Bunga
        La Nina 2027: Chitosan Pertebal Kulit Tahan Patek Antraknosa
      Meta Ads Angle: Grade A Pride / Rahasia Timbangan Panen Berbobot Padat
    KOJIEN Activator
      Kategori: Crop Stability & Yield Support
      Target: Jagung Hibrida, Padi Sawah, Palawija
      Fokus Utama: Anti-Bulai, Batang Kokoh Tahan Rebah, Tongkol Penuh
      Formula: Silika Bioaktif 18% + Bio-Fitoaleksin + Kalium Seng
      Aplikasi: Semprot 15 HST & 35 HST Jagung
      Sentra: Tuban, Grobogan, Lampung, Bima, Sulsel
      Dampak Iklim:
        El Nino 2026: Silika Kurangi Transpirasi Penguapan 30%
        La Nina 2027: Perkuat Akar Jangkar Tahan Tanah Lembek
      Meta Ads Angle: Yield Insurance / Jagung Tak Stabil Awal Hasil Akhir Anjlok
    Sinergi Mix and Match
      Hortikultura: BENSU Vegetatif -> SARATOGA Generatif Bunga Buah
      Padi Sawah: KOJIEN Anakan Rumpun -> SARATOGA Bunting Bulir Bernas
      Sawit: AUSSIE Kocor Batang -> Sanitasi Blok Ganoderma
      Larangan: Jangan Campur Tembaga Pekat / Herbisida Keras
`

// ==========================================
// 5. FIELD PLAYBOOK DICTIONARY (KAMUS MASALAH & RESEP LAPANGAN)
// ==========================================

export const FIELD_PLAYBOOK_DICTIONARY: FieldPlaybookItem[] = [
  {
    id: 'PB-HORTI-01',
    problemName: 'Daun Keriting, Mandek & Klorosis Kuning Pasca Cuaca Ekstrem',
    problemCategory: 'PERTUMBUHAN_MANDEK',
    categoryLabel: 'Pertumbuhan Mandek',
    cropCategory: 'Hortikultura Buah & Sayuran',
    crops: ['Cabai Merah', 'Cabai Rawit', 'Tomat', 'Terong'],
    severityLevel: 'SEDANG',
    visualSymptoms:
      'Pucuk daun mengkerut, kaku seperti mangkok terbalik, urat daun menguning (klorosis), dan tanaman berhenti memanjang (mandek) selama lebih dari 10 hari.',
    rootCause:
      'Perakaran kaget akibat fluktuasi suhu tanah ekstrem pasca hujan deras mendadak setelah terik berkepanjangan. Penyerapan seng (Zn) dan magnesium (Mg) terblokir akibat asam tanah naik, memicu akumulasi asam absisat (ABA) yang mengunci pembelahan sel pucuk.',
    peakMonths: ['Oktober', 'November', 'Desember', 'Januari'],
    seasonContext: 'RENDENG_HUJAN',
    seasonLabel: 'Awal Musim Hujan Rendeng (MT 1)',
    climateTrigger:
      'Curah hujan mendadak > 100 mm/dasarian setelah periode kemarau terik El Niño panjang, memicu shock osmotik perakaran.',
    productPairing: {
      heroProduct: 'bensu',
      partnerProduct: 'saratoga',
      pairingType: 'DUO_ROTASI',
      pairingLabel: 'Duo Growth Restart & Regenerasi Sel Pucuk',
      synergyMechanism:
        'BENSU (Fase 1) menetralisir stres osmotik dan merangsang pemanjangan bulu akar baru dengan auksin-sitokinin alami. Diikuti SARATOGA (Fase 2) menyuplai 47.5% asam amino esensial untuk sintesis klorofil instan tanpa membebani fotosintesis tanaman yang masih lemah.',
    },
    prescription: {
      dosagePer16L: 'Aplikasi 1: BENSU 30 ml / 16L -> Aplikasi 2 (5 hari kemudian): SARATOGA 20 ml / 16L',
      dosagePerHa: '1.5 Liter BENSU + 1.0 Liter SARATOGA',
      applicationMethod: 'KOMBINASI_SEMPROT_KOCOR',
      applicationMethodLabel: 'Kocor 100 ml/lubang tanam di awal, lalu semprot kabut daun',
      bestTime: 'Pukul 06.00 - 08.30 WIB (saat stomata membuka maksimal sebelum terik)',
      intervalDays: 5,
      roundsNeeded: 2,
      recoverySlaDays: '3 - 5 Hari (pucuk baru hijau segar mulai menjulur)',
    },
    tankMixSafety: {
      status: 'COMPATIBLE',
      guideline:
        'Aman dicampur dengan fungisida protektif mankozeb atau insektisida abamektin kutu daun. DILARANG dicampur dengan tembaga hidroksida pekat.',
      prohibitedMixes: ['Tembaga Hidroksida Pekat', 'Herbisida Selektif', 'Belerang Kental (Sulfur pH < 3)'],
    },
    commercialMetaAdsHook: {
      headline:
        'Tanaman Cabai Mandek Daun Menguning Pasca Hujan Pertama? Jangan Ditambah Urea, Bangunkan Dulu Akarnya!',
      kiosAdviceScript:
        'Edukasi petani bahwa daun kuning bukan kekurangan pupuk kimia, tapi stres akar kaget air. Kocor BENSU 2 tutup per tangki, tunggu 4 hari lalu semprot SARATOGA agar pucuk baru langsung melonjak hijau tegap.',
    },
  },
  {
    id: 'PB-HORTI-02',
    problemName: 'Rontok Massal Bunga & Pentil Buah saat Pancaroba / Hujan Malam',
    problemCategory: 'NUTRISI_GENERATIF',
    categoryLabel: 'Nutrisi Bunga & Buah',
    cropCategory: 'Hortikultura Buah & Sayuran',
    crops: ['Cabai', 'Tomat', 'Melon', 'Semangka'],
    severityLevel: 'KRITIS',
    visualSymptoms:
      'Bunga menguning pada tangkai kuntum lalu rontok berguguran saat disentuh. Pentil buah muda menguning di ujung kelopak dan lepas sebelum membesar.',
    rootCause:
      'Defisit energi karbohidrat cepat akibat minim sinar matahari (overcast cloudy sky) ditambah kelembaban udara malam > 90%. Tangkai bunga kekurangan pasokan asam amino prolin dan glutamat untuk memperkuat dinding tangkai bunga (*abscission zone*).',
    peakMonths: ['Desember', 'Januari', 'Februari', 'Mei'],
    seasonContext: 'PANCAROBA',
    seasonLabel: 'Puncak Musim Hujan & Pancaroba Basah',
    climateTrigger:
      'Hujan malam hari terus-menerus disusul siang hari terik mendadak, mengacaukan regulasi transpirasi tanaman.',
    productPairing: {
      heroProduct: 'saratoga',
      partnerProduct: 'bensu',
      pairingType: 'DUO_ROTASI',
      pairingLabel: 'Duo Pengikat Bunga & Anti-Rontok Generatif',
      synergyMechanism:
        'SARATOGA menyuplai energi siap pakai dari Japanese Pro-Plant Complex™ (asam amino bebas 47.5% + chitosan) yang diserap langsung oleh jaringan bunga dalam 2 jam tanpa perlu energi fotosintesis penuh, merekatkan tangkai pentil buah secara permanen.',
    },
    prescription: {
      dosagePer16L: 'SARATOGA 25 ml / Tangki 16 Liter (disemprot kabut halus merata ke kuntum bunga)',
      dosagePerHa: '1.0 - 1.5 Liter SARATOGA per Hektar',
      applicationMethod: 'SEMPROT_KABUT_PAGI',
      applicationMethodLabel: 'Semprot kabut halus merata pada bunga dan pentil',
      bestTime: 'Pukul 06.30 - 09.00 WIB atau sore 15.30 - 17.30 WIB (hindari saat hujan rintik)',
      intervalDays: 7,
      roundsNeeded: 2,
      recoverySlaDays: '48 - 72 Jam (gugur bunga berhenti drastis, pentil buah mencengkeram kuat)',
    },
    tankMixSafety: {
      status: 'COMPATIBLE',
      guideline:
        'Sangat kompatibel dicampur dengan kalsium nitrat murni bebas boron tinggi dan fungisida azoksistrobin/difenokonazol.',
      prohibitedMixes: ['Insektisida Golongan Klorpirifos Bau Menyengat', 'Perekat Silikon Dosis Berlebih'],
    },
    commercialMetaAdsHook: {
      headline:
        'Bunga Cabai & Melon Berguguran Tiap Habis Hujan Malam? Ikat Pentil Buah dengan Asam Amino Siap Serap!',
      kiosAdviceScript:
        'Jika petani panik bunga rontok, jangan beri pupuk daun ber-Nitrogen tinggi. Langsung berikan SARATOGA 25 ml/tangki agar energi tanaman langsung difokuskan mengikat bunga jadi pentil padat.',
    },
  },
  {
    id: 'PB-HORTI-03',
    problemName: 'Patek Antraknosa Buah Busuk & Kulit Lembek Musim Rendeng',
    problemCategory: 'PENYAKIT_JAMUR',
    categoryLabel: 'Penyakit & Jamur Patogen',
    cropCategory: 'Hortikultura Buah & Sayuran',
    crops: ['Cabai Merah', 'Cabai Rawit', 'Tomat', 'Terong'],
    severityLevel: 'KRITIS',
    visualSymptoms:
      'Bercak cekung melingkar kehitaman pada kulit buah cabai (lingkaran konsentris spora oranye), buah mengkerut busuk basah dan gugur massal sebelum matang sempurna.',
    rootCause:
      'Spora jamur *Colletotrichum capsici* meluap di udara lembab (>85%) dan menembus kutikula kulit buah yang tipis dan berair akibat serapan air berlebih saat musim hujan.',
    peakMonths: ['Januari', 'Februari', 'Maret'],
    seasonContext: 'RENDENG_HUJAN',
    seasonLabel: 'Puncak Musim Hujan Rendeng',
    climateTrigger:
      'Curah hujan tinggi berturut-turut > 5 hari dengan genangan parit bedengan lambat meresap.',
    productPairing: {
      heroProduct: 'saratoga',
      partnerProduct: 'kojien',
      pairingType: 'DUO_TANK_MIX',
      pairingLabel: 'Duo Penebal Kutikula Buah & Penguat Sel Antraknosa',
      synergyMechanism:
        'Chitosan alami pada SARATOGA membentuk lapisan biopolimer pelindung di atas kulit buah yang mematikan perkecambahan spora jamur, sementara Silika Bioaktif KOJIEN mengeraskan epidermis kulit buah hingga 2x lipat agar tidak mudah ditembus hifa jamur.',
    },
    prescription: {
      dosagePer16L: 'SARATOGA 20 ml + KOJIEN 20 ml per Tangki 16 Liter (campur merata)',
      dosagePerHa: '1 Liter SARATOGA + 1 Liter KOJIEN',
      applicationMethod: 'SEMPROT_KABUT_PAGI',
      applicationMethodLabel: 'Semprot kabut basah merata pada buah dan seluruh tajuk tanaman',
      bestTime: 'Pagi hari segera setelah embun daun menguap (07.00 - 09.30 WIB)',
      intervalDays: 4,
      roundsNeeded: 3,
      recoverySlaDays: '4 - 6 Hari (bercak patek kering menghitam, buah baru tumbuh mulus bebas bopeng)',
    },
    tankMixSafety: {
      status: 'COMPATIBLE',
      guideline:
        'Dapat dicampur dengan fungisida mankozeb protektif. Lakukan uji jar-test jika dicampur dengan fungisida tembaga.',
      prohibitedMixes: ['Minyak Pertanian Berkepekatan Tinggi', 'Herbisida Pembakar'],
    },
    commercialMetaAdsHook: {
      headline:
        'Cabai Mengkilap Rusak Kena Patek Busuk Hitam? Tebalkan Kulit Buah Sebelum Spora Jamur Menembus!',
      kiosAdviceScript:
        'Saran kios: Fungisida kimia hanya membunuh jamur di luar. Untuk mencegah buah busuk berulang, tebalkan kulitnya dengan duet SARATOGA + KOJIEN agar hifa jamur tidak bisa menembus kulit cabai.',
    },
  },
  {
    id: 'PB-HORTI-04',
    problemName: 'Layu Terik Siang Hari / Stres Dehidrasi El Niño Suhu > 35°C',
    problemCategory: 'STRESS_CUACA',
    categoryLabel: 'Stres Cuaca & Dehidrasi',
    cropCategory: 'Hortikultura Buah & Sayuran',
    crops: ['Cabai', 'Tomat', 'Melon', 'Bawang Merah'],
    severityLevel: 'SEDANG',
    visualSymptoms:
      'Daun lunglai terkulai pada pukul 11.00 - 14.00 WIB, pucuk mengering terbakar (scorch), tanah bedengan cepat retak, dan bunga rontok sebelum mekar.',
    rootCause:
      'Laju transpirasi penguapan daun melampaui kemampuan akar menyerap air tanah. Sel xilem tanaman mengalami tekanan kavitas negatif, memicu dehidrasi seluler parah dan penutupan stomata total.',
    peakMonths: ['Juli', 'Agustus', 'September', 'Oktober'],
    seasonContext: 'GADU_KEMARAU',
    seasonLabel: 'Puncak Kemarau El Niño Gadu (MT 2)',
    climateTrigger:
      'Suhu udara siang hari > 35°C, radiasi UV ekstrem, dan Hari Tanpa Hujan (HTH) > 30 hari berturut-turut.',
    productPairing: {
      heroProduct: 'bensu',
      partnerProduct: 'kojien',
      pairingType: 'DUO_TANK_MIX',
      pairingLabel: 'Duo Osmoprotektan & Penghalang Evaporasi Silika',
      synergyMechanism:
        'BENSU bertindak sebagai osmoprotektan seluler yang mempertahankan turgor sel tanaman meski kekurangan air, sementara KOJIEN membentuk lapisan silika kutikula ganda yang mengurangi transpirasi penguapan air hingga 30%.',
    },
    prescription: {
      dosagePer16L: 'BENSU 25 ml + KOJIEN 20 ml per Tangki 16 Liter',
      dosagePerHa: '1.25 Liter BENSU + 1.0 Liter KOJIEN',
      applicationMethod: 'KOMBINASI_SEMPROT_KOCOR',
      applicationMethodLabel: 'Semprot kabut daun pagi hari + kocor perakaran 150 ml/lubang',
      bestTime: 'Pagi hari sebelum pukul 08.00 WIB atau sore setelah pukul 16.00 WIB',
      intervalDays: 7,
      roundsNeeded: 2,
      recoverySlaDays: '24 - 48 Jam (tanaman tetap tegak segar di bawah terik siang tanpa layu)',
    },
    tankMixSafety: {
      status: 'COMPATIBLE',
      guideline: 'Sangat aman dicampur dengan larutan pupuk NPK kocor berimbang dan insektisida sistemik.',
      prohibitedMixes: ['Herbisida Kontak', 'Bahan Berpelarut Xylene Pekat'],
    },
    commercialMetaAdsHook: {
      headline:
        'Kemarau Terik Bikin Tanaman Cabai & Tomat Loyo Layu Siang Hari? Lindungi Sel Daun dengan Anti-Penguapan Alami!',
      kiosAdviceScript:
        'Ingatkan petani jangan menyemprot kimia di siang bolong. Semprot pagi-pagi kombinasi BENSU + KOJIEN agar tanaman memiliki lapisan pelindung penguapan air seharian.',
    },
  },
  {
    id: 'PB-PADI-05',
    problemName: 'Anakan Padi Sedikit, Kerdil & Batang Rapuh Musim Tanam Rendeng',
    problemCategory: 'PERTUMBUHAN_MANDEK',
    categoryLabel: 'Pertumbuhan Mandek',
    cropCategory: 'Tanaman Pangan Sawah',
    crops: ['Padi Sawah (Inpari, Ciherang, Mekongga, Ketan)'],
    severityLevel: 'SEDANG',
    visualSymptoms:
      'Rumpun padi umur 20-30 HST hanya memiliki 10-14 anakan, tanaman kerdil tampak menguning di daun bawah, dan batang lemas mudah rebah jika tergenang air dalam.',
    rootCause:
      'Kelebihan aplikasi Urea murni tanpa diimbangi silika dan kalium terkelat, menyebabkan sel memanjang tanpa dinding sel yang kuat. Suhu air sawah dingin saat mendung berkepanjangan menghambat diferensiasi tunas anakan sekunder.',
    peakMonths: ['November', 'Desember', 'Januari'],
    seasonContext: 'RENDENG_HUJAN',
    seasonLabel: 'Fase Anakan Aktif Musim Rendeng (MT 1)',
    climateTrigger:
      'Hujan terus-menerus tanpa sinar matahari langsung selama 7 hari berturut-turut di lahan sawah irigasi.',
    productPairing: {
      heroProduct: 'kojien',
      partnerProduct: 'bensu',
      pairingType: 'DUO_ROTASI',
      pairingLabel: 'Duo Pemacu 28-32 Anakan Produktif & Batang Silika Baja',
      synergyMechanism:
        'KOJIEN menyuplai Silika Bioaktif 18% dan Zinc (Zn) terkelat untuk memperkokoh buku batang padi, merangsang pembelahan tunas anakan produktif seragam hingga 28-32 anakan per rumpun. BENSU mendukung pemanjangan akar ke dalam lapisan lumpur subur.',
    },
    prescription: {
      dosagePer16L: 'KOJIEN 30 ml / Tangki 16 Liter (Umur 15 HST & 28 HST)',
      dosagePerHa: '1.5 Liter KOJIEN per Hektar',
      applicationMethod: 'SEMPROT_KABUT_PAGI',
      applicationMethodLabel: 'Semprot kabut merata ke pangkal rumpun padi',
      bestTime: 'Pukul 06.30 - 09.00 WIB (saat embun pagi mulai terangkat)',
      intervalDays: 14,
      roundsNeeded: 2,
      recoverySlaDays: '5 - 7 Hari (tunas anakan baru bermunculan rapat, rumpun padat mekar)',
    },
    tankMixSafety: {
      status: 'COMPATIBLE',
      guideline:
        'Dapat dicampur dengan insektisida penggerek batang (fipronil/klorantraniliprol) dan herbisida purna-tumbuh selektif padi.',
      prohibitedMixes: ['Herbisida Non-Selektif (Glifosat/Parakuat)'],
    },
    commercialMetaAdsHook: {
      headline:
        'Padi Umur 20 HST Tapi Anakan Cuma Belasan? Lipatgandakan Jadi 30 Anakan Produktif dengan Batang Silika Kokoh!',
      kiosAdviceScript:
        'Petani padi sering boros Urea tapi anakannya sedikit. Arahkan mereka semprot KOJIEN 30 ml/tangki di umur 15 HST. Hasil anakan bertambah 8-12 batang per rumpun dan batangnya kokoh tahan angin.',
    },
  },
  {
    id: 'PB-PADI-06',
    problemName: 'Padi Rebah Roboh & Gabah Hampa Pangkal Malai Terpaan Hujan Angin',
    problemCategory: 'KUALITAS_PANEN',
    categoryLabel: 'Kualitas & Bobot Panen',
    cropCategory: 'Tanaman Pangan Sawah',
    crops: ['Padi Sawah (Inpari 32, Ciherang, Varietas Lokal)'],
    severityLevel: 'KRITIS',
    visualSymptoms:
      'Hamparan padi bunting/keluar malai rebah tidur di atas lumpur basah setelah diterpa hujan deras berangin. Butir gabah di pangkal malai putih hampa, kusam bernoda kehitaman, dan tumbuh kecambah di lahan.',
    rootCause:
      'Dinding sel batang padi lunak akibat rasio N:K tidak seimbang, dan translokasi fotosintat dari daun bendera ke bulir gabah terhenti total akibat robohnya tanaman.',
    peakMonths: ['Januari', 'Februari', 'Maret'],
    seasonContext: 'RENDENG_HUJAN',
    seasonLabel: 'Fase Bunting & Pengisian Bulir Rendeng',
    climateTrigger:
      'Angin kencang muson barat disertai curah hujan lebat saat malai padi sedang terisi cairan susu.',
    productPairing: {
      heroProduct: 'saratoga',
      partnerProduct: 'kojien',
      pairingType: 'DUO_ROTASI',
      pairingLabel: 'Duo Anti-Rebah & Pengisi Gabah Bernas Berbobot Padat',
      synergyMechanism:
        'KOJIEN diaplikasikan di fase bunting muda untuk mengeraskan batang bawah dengan kristal silika fitolit. Dilanjutkan SARATOGA di fase malai keluar 70% untuk mengalirkan 47.5% asam amino murni, memadatkan gabah hingga butir paling pangkal tanpa menyisakan gabah hampa.',
    },
    prescription: {
      dosagePer16L: 'Fase Bunting (45 HST): KOJIEN 30 ml -> Fase Malai Merunduk (65 HST): SARATOGA 25 ml',
      dosagePerHa: '1 Liter KOJIEN + 1 Liter SARATOGA',
      applicationMethod: 'SEMPROT_KABUT_PAGI',
      applicationMethodLabel: 'Semprot kabut daun bendera dan malai padi merata',
      bestTime: 'Pukul 07.00 - 09.30 WIB',
      intervalDays: 20,
      roundsNeeded: 2,
      recoverySlaDays: 'Batang tetap tegap berdiri tegak diterpa angin kencang; gabah terisi padat menguning seragam',
    },
    tankMixSafety: {
      status: 'COMPATIBLE',
      guideline: 'Sangat kompatibel dicampur dengan fungisida blast padi (trisiklazol/isoprotiolan).',
      prohibitedMixes: ['Pupuk Nitrogen Murni Dosis Tinggi di Fase Generatif Akhir'],
    },
    commercialMetaAdsHook: {
      headline:
        'Hati Hancur Liat Padi Bunting Rebah Diterpa Hujan Angin? Kunci Batang Baja & Gabah Padat Menguning Sempurna!',
      kiosAdviceScript:
        'Padi rebah rugi hingga 50%! Kombinasi KOJIEN (fase bunting) dan SARATOGA (fase malai) adalah asuransi hasil panen paling murah untuk menjamin gabah padat bernas dan batang tegak sampai mesin kombi panen datang.',
    },
  },
  {
    id: 'PB-PADI-07',
    problemName: 'Daun Bendera Mengering Dini & Bulir Gabah Kusam Beras Patah',
    problemCategory: 'NUTRISI_GENERATIF',
    categoryLabel: 'Nutrisi Bunga & Buah',
    cropCategory: 'Tanaman Pangan Sawah',
    crops: ['Padi Beras Premium', 'Beras Merah', 'Ketan'],
    severityLevel: 'RINGAN',
    visualSymptoms:
      'Daun bendera yang seharusnya hijau segar menguning dan kering sebelum gabah terisi penuh (penuaan dini/senesens prematur). Beras hasil giling banyak yang retak (patah) dan berwarna kusam berkapur.',
    rootCause:
      'Kekurangan pasokan asam amino fungsional di masa akhir pengisian bulir. Tanaman terpaksa merombak protein daun bendera untuk mengisi gabah, menyebabkan daun bendera mati prematur sebelum gabah terisi padat.',
    peakMonths: ['Februari', 'Maret', 'April', 'Agustus'],
    seasonContext: 'SEPANJANG_TAHUN',
    seasonLabel: 'Fase Pengisian Akhir (MT 1 & MT 2)',
    climateTrigger:
      'Kombinasi radiasi matahari tinggi di akhir musim dengan penurunan suplai air irigasi.',
    productPairing: {
      heroProduct: 'saratoga',
      pairingType: 'TUNGGAL_DARURAT',
      pairingLabel: 'Injeksi Nutrisi Asam Amino Japanese Pro-Plant Complex™',
      synergyMechanism:
        'SARATOGA mempertahankan kehijauan daun bendera (efek *stay-green*) hingga masa panen, memaksimalkan fotosintesis cadangan, dan mengikat protein gluten beras agar tidak rapuh dan bening berkilau.',
    },
    prescription: {
      dosagePer16L: 'SARATOGA 25 ml / Tangki 16 Liter (disemprotkan saat padi bunting tua dan malai 80% keluar)',
      dosagePerHa: '1.0 Liter SARATOGA per Hektar',
      applicationMethod: 'SEMPROT_KABUT_PAGI',
      applicationMethodLabel: 'Semprot kabut halus pada tajuk atas dan daun bendera',
      bestTime: 'Pagi hari pukul 06.30 - 08.30 WIB',
      intervalDays: 12,
      roundsNeeded: 2,
      recoverySlaDays: 'Daun bendera hijau tegap hingga panen; rendemen beras giling naik 3-5%, beras utuh bening',
    },
    tankMixSafety: {
      status: 'COMPATIBLE',
      guideline: 'Dapat dicampur dengan fungisida bercak daun coklat dan insektisida walang sangit.',
      prohibitedMixes: ['Herbisida', 'ZPT Sintetik Berlebih'],
    },
    commercialMetaAdsHook: {
      headline:
        'Rendemen Beras Rendah & Banyak yang Patah saat Digiling? Pertahankan Daun Bendera Hijau Sampai Panen!',
      kiosAdviceScript:
        'Tawarkan SARATOGA untuk petani yang mengejar harga beras premium. Cukup 1 botol per hektar saat bunting, gabah bening mengkilap dan pedagang beras berani beli dengan harga termahal.',
    },
  },
  {
    id: 'PB-JAGUNG-08',
    problemName: 'Serangan Bulai Putih & Pertumbuhan Belang Kerdil Jagung Muda',
    problemCategory: 'PENYAKIT_JAMUR',
    categoryLabel: 'Penyakit & Jamur Patogen',
    cropCategory: 'Tanaman Pangan Hamparan',
    crops: ['Jagung Hibrida (Semua Varietas)'],
    severityLevel: 'KRITIS',
    visualSymptoms:
      'Daun muda jagung umur 12-25 HST bergaris-garis putih kuning sejajar tulang daun, terdapat serbuk spora putih di permukaan bawah daun saat pagi hari, dan tanaman kerdil tidak mau membentuk tongkol.',
    rootCause:
      'Infeksi jamur sistemik *Peronosclerospora maydis*. Benih hibrida kehilangan perlindungan perlakuan benih (*seed treatment chemical*) setelah 12 HST, sementara cuaca lembab memicu germinasi spora yang terbawa angin malam.',
    peakMonths: ['Oktober', 'November', 'Desember', 'Januari'],
    seasonContext: 'RENDENG_HUJAN',
    seasonLabel: 'Awal Musim Hujan Rendeng Tanam Jagung',
    climateTrigger:
      'Kelembaban udara malam hari > 90% dengan embun tebal di daun jagung muda.',
    productPairing: {
      heroProduct: 'kojien',
      partnerProduct: 'bensu',
      pairingType: 'DUO_ROTASI',
      pairingLabel: 'Benteng Bio-Silika Fitoaleksin & Pengaktif Kekebalan Sistemik',
      synergyMechanism:
        'KOJIEN memicu produksi fitoaleksin tanaman jagung sendiri untuk melokalisir jamur bulai dan mengeraskan dinding sel stomata dengan silika aktif agar spora baru tidak bisa menembus. BENSU membantu pemulihan tanaman tetangga yang mulai klorosis.',
    },
    prescription: {
      dosagePer16L: 'KOJIEN 35 ml / Tangki 16 Liter (Segera setelah cabut tanaman sakit parah)',
      dosagePerHa: '1.5 Liter KOJIEN per Hektar',
      applicationMethod: 'SEMPROT_KABUT_PAGI',
      applicationMethodLabel: 'Semprot basah merata pada daun atas dan bawah serta pangkal batang',
      bestTime: 'Pukul 06.00 - 08.30 WIB sebelum angin kencang berhembus',
      intervalDays: 7,
      roundsNeeded: 2,
      recoverySlaDays: '3 - 5 Hari (penularan bulai berhenti total, daun baru tumbuh hijau gelap tebal)',
    },
    tankMixSafety: {
      status: 'COMPATIBLE',
      guideline: 'Kompatibel dengan fungisida dimetomorf atau metalaksil untuk kuratif ganda.',
      prohibitedMixes: ['Herbisida Pembakar Parakuat', 'Dosis Urea Kocor Berlebih'],
    },
    commercialMetaAdsHook: {
      headline:
        'Jagung Hibrida Mulai Ada yang Bergaris Putih Bulai? Cabut yang Parah, Kunci Hamparan Sehat Sekarang!',
      kiosAdviceScript:
        'SOP Kios ke petani jagung: Tanaman yang sudah putih kerdil wajib dicabut dan dibakar. Lalu segera semprot KOJIEN 35 ml/tangki ke seluruh hamparan untuk membentengi tanaman sehat agar spora jamur tidak menular.',
    },
  },
  {
    id: 'PB-JAGUNG-09',
    problemName: 'Batang Jagung Gampang Roboh Diterpa Angin & Tongkol Kopong Ujung',
    problemCategory: 'KUALITAS_PANEN',
    categoryLabel: 'Kualitas & Bobot Panen',
    cropCategory: 'Tanaman Pangan Hamparan',
    crops: ['Jagung Hibrida (Pangan & Pakan Ternak)'],
    severityLevel: 'SEDANG',
    visualSymptoms:
      'Batang jagung tinggi langsing mudah patah pada ruas bawah saat angin kencang. Biji tongkol tidak terisi penuh sampai ke ujung kelobot (tongkol ompong/kopong hingga 3-5 cm).',
    rootCause:
      'Kekurangan kalium terkelat dan silika di fase pembentukan organ batang, serta defisiensi seng (Zn) dan asam amino pembawa energi saat penyerbukan malai jantan (*tasseling*).',
    peakMonths: ['Desember', 'Januari', 'Mei', 'Juni'],
    seasonContext: 'SEPANJANG_TAHUN',
    seasonLabel: 'Fase Vegetatif Akhir & Generatif Jagung',
    climateTrigger:
      'Hujan lebat disertai tiupan angin kencang pada fase pengisian biji jagung.',
    productPairing: {
      heroProduct: 'kojien',
      partnerProduct: 'saratoga',
      pairingType: 'DUO_ROTASI',
      pairingLabel: 'Duo Batang Baja & Pengunci Tongkol Terisi Rapat Penuh',
      synergyMechanism:
        'KOJIEN (fase 30 HST) memperkokoh akar jangkar dan memperbesar diameter batang bawah. SARATOGA (fase 50 HST keluar rambut tongkol) memastikan polinasi sempurna dan memacu translokasi pati hingga biji paling ujung kelobot terisi penuh padat.',
    },
    prescription: {
      dosagePer16L: 'Umur 30-35 HST: KOJIEN 30 ml -> Umur 50 HST: SARATOGA 25 ml',
      dosagePerHa: '1 Liter KOJIEN + 1 Liter SARATOGA',
      applicationMethod: 'SEMPROT_KABUT_PAGI',
      applicationMethodLabel: 'Semprot kabut daun dan kelobot buah jagung',
      bestTime: 'Pukul 07.00 - 09.30 WIB',
      intervalDays: 15,
      roundsNeeded: 2,
      recoverySlaDays: 'Batang tegap kaku kokoh; tongkol terisi penuh berbiji kuning emas berkilau hingga ujung',
    },
    tankMixSafety: {
      status: 'COMPATIBLE',
      guideline: 'Dapat dicampur dengan insektisida ulat grayak (spinetoram/klorantraniliprol).',
      prohibitedMixes: ['Herbisida Glifosat'],
    },
    commercialMetaAdsHook: {
      headline:
        'Tongkol Jagung Ompong di Ujung Bikin Tonase Panen Jeblok? Kunci Biji Penuh Padat Sampai Pucuk Kelobot!',
      kiosAdviceScript:
        'Jagung yang batangnya kokoh dan tongkolnya penuh terisi sampai ujung bisa menaikkan hasil panen hingga 1.5 - 2 Ton per hektar. Edukasi petani gunakan KOJIEN umur 30 HST dan SARATOGA saat berbunga.',
    },
  },
  {
    id: 'PB-SAWIT-10',
    problemName: 'Pelepah Sengkleh Patah Pinggang & Busuk Pangkal Batang Ganoderma',
    problemCategory: 'PENYAKIT_JAMUR',
    categoryLabel: 'Penyakit & Jamur Patogen',
    cropCategory: 'Perkebunan',
    crops: ['Kelapa Sawit (TM & TBM)'],
    severityLevel: 'KRITIS',
    visualSymptoms:
      'Pelepah daun tua patah menggantung di sekeliling batang (sengkleh seperti payung patah), daun tombak tidak mau membuka (tegak kuncup), dan muncul tubuh buah jamur putih kecoklatan (braket Ganoderma) di pangkal batang.',
    rootCause:
      'Jamur patogen tular tanah *Ganoderma boninense* mendegradasi lignin dan selulosa di jaringan vaskular xilem pangkal batang bawah, memutus suplai air dan nutrisi ke tajuk mahkota.',
    peakMonths: ['Januari', 'Februari', 'September', 'Oktober'],
    seasonContext: 'SEPANJANG_TAHUN',
    seasonLabel: 'Sepanjang Tahun (Meningkat Pesat di Musim Lembab)',
    climateTrigger:
      'Kelembaban tanah tinggi pada lahan gambut atau tanah mineral bekas replanting sawat generasi 2 ke atas.',
    productPairing: {
      heroProduct: 'aussie',
      partnerProduct: 'saratoga',
      pairingType: 'DUO_ROTASI',
      pairingLabel: 'Protokol Penyelamatan Pokok Sawit & Sanitasi Ganoderma',
      synergyMechanism:
        'AUSSIE Sawit mengandung bio-agen pemulih perakaran dan anti-kulat yang menekan laju perkembangan miselium jamur di pangkal batang serta merangsang kalus penutup luka. Dilanjutkan aplikasi SARATOGA untuk memasok asam amino esensial mempercepat pembukaan pucuk daun tombak.',
    },
    prescription: {
      dosagePer16L:
        'Kikis jamur pada batang -> Oles AUSSIE murni tanpa encer pada luka -> Kocor 200 ml larutan AUSSIE (konsentrasi 1:20 air) di piringan akar pokok sakit dan 100 ml pada pokok sehat radius 10 meter',
      dosagePerHa: '4 - 6 Liter AUSSIE untuk blok karantina 1 Hektar',
      applicationMethod: 'KOMBINASI_SEMPROT_KOCOR',
      applicationMethodLabel: 'Oles pasta murni pada luka batang + Kocor perakaran pokok',
      bestTime: 'Pagi hari atau sore hari saat tanah lembab basah',
      intervalDays: 14,
      roundsNeeded: 3,
      recoverySlaDays: '14 - 30 Hari (tubuh buah jamur mengering hitam rontok, daun tombak baru mulai membuka segar)',
    },
    tankMixSafety: {
      status: 'APPLY_SEPARATELY',
      guideline: 'Aplikasikan secara tunggal pada pokok sawit. Hindari pencampuran dengan herbisida pembersih piringan.',
      prohibitedMixes: ['Herbisida Kontak/Sistemik', 'Bahan Berpelarut Organik Keras'],
    },
    commercialMetaAdsHook: {
      headline:
        'Jangan Tunggu Pokok Sawit Tumbang Mati Gara-Gara Ganoderma! Selamatkan Pohon Penghasil Cuan Anda Sekarang.',
      kiosAdviceScript:
        'Biaya menanam ulang pokok sawit dan menunggu panen 4 tahun butuh jutaan rupiah per pokok. Penyelamatan dengan AUSSIE Sawit hanya ratusan ribu per pokok. Wajib sedia untuk kebun sawit tua.',
    },
  },
  {
    id: 'PB-SAWIT-11',
    problemName: 'Kematian Bibit & Pokok Kuning Kering Stres Defisit Air El Niño',
    problemCategory: 'STRESS_CUACA',
    categoryLabel: 'Stres Cuaca & Dehidrasi',
    cropCategory: 'Perkebunan',
    crops: ['Kelapa Sawit (TBM & Main Nursery Bibitan)'],
    severityLevel: 'KRITIS',
    visualSymptoms:
      'Ujung pelepah daun mengering coklat terbakar, pertumbuhan terhenti kerdil, daun tombak patah, dan kematian tanaman muda di areal replanting mencapai lebih dari 15%.',
    rootCause:
      'Defisit air berkepanjangan (dry spell) > 60 hari pada musim kemarau El Niño ekstrem. Tanah piringan kehilangan kelembaban, menyebabkan deplesi akar lateral dan kematian jaringan kambium perakaran muda.',
    peakMonths: ['Juli', 'Agustus', 'September', 'Oktober'],
    seasonContext: 'GADU_KEMARAU',
    seasonLabel: 'Kemarau Kering El Niño Ekstrem',
    climateTrigger:
      'Hari Tanpa Hujan (HTH) panjang dan kelembaban udara rendah di sentra Sumatera dan Kalimantan.',
    productPairing: {
      heroProduct: 'aussie',
      partnerProduct: 'bensu',
      pairingType: 'DUO_ROTASI',
      pairingLabel: 'Protokol Pertolongan Darurat Hidrasi & Anti-Kematian Bibit',
      synergyMechanism:
        'AUSSIE Sawit merangsang regenerasi korteks akar yang mengering agar tetap mampu menyerap sisa air kapiler tanah terdalam, didukung BENSU sebagai stimulator seluler anti-stres terik.',
    },
    prescription: {
      dosagePer16L: 'Kocor 200 ml larutan AUSSIE per pokok kelapa sawit TBM (atau 50 ml per polibag bibitan)',
      dosagePerHa: '3 - 5 Liter AUSSIE per Hektar',
      applicationMethod: 'KOCOR_PERAKARAN',
      applicationMethodLabel: 'Kocor lingkar piringan perakaran pokok sedalam 15 cm',
      bestTime: 'Sore hari pukul 16.00 - 18.00 WIB untuk menahan kelembaban malam hari',
      intervalDays: 14,
      roundsNeeded: 2,
      recoverySlaDays: '7 - 10 Hari (daun tidak bertambah kering, pelepah tegak lentur, pupus baru menghijau)',
    },
    tankMixSafety: {
      status: 'COMPATIBLE',
      guideline: 'Dapat dicampur dengan pupuk organik cair kocor atau trichoderma.',
      prohibitedMixes: ['Herbisida Kimia'],
    },
    commercialMetaAdsHook: {
      headline:
        'El Niño Panas Ekstrem Bikin Bibit & TBM Sawit Terancam Mati Kering? Segera Kocor Penyelamat Perakaran!',
      kiosAdviceScript:
        'Jangan biarkan investasi bibit bersertifikat jutaan rupiah mati sia-sia di musim kemarau. Kocor AUSSIE di piringan untuk mengamankan perakaran bibit dari kematian dehidrasi.',
    },
  },
  {
    id: 'PB-BAWANG-12',
    problemName: 'Pucuk Daun Bawang Menguning Kering & Umbi Kecil Susut Bobot Simpan',
    problemCategory: 'KUALITAS_PANEN',
    categoryLabel: 'Kualitas & Bobot Panen',
    cropCategory: 'Hortikultura Umbi',
    crops: ['Bawang Merah (Bima Brebes, Tajuk, Bauji)'],
    severityLevel: 'SEDANG',
    visualSymptoms:
      'Pucuk daun bawang mengering kuning seperti terbakar (mati pucuk), daun rebah lembek, umbi tidak membelah sempurna, dan saat disimpan di gudang susut bobot mencapai > 25%.',
    rootCause:
      'Ketidakseimbangan asupan hara mikro dan pembentukan klorofil daun di umur 20 HST, diikuti kegagalan translokasi karbohidrat dari daun ke umbi di umur 40 HST karena kekurangan asam amino triptofan dan kalium terkelat.',
    peakMonths: ['April', 'Mei', 'Juni', 'Juli', 'Agustus'],
    seasonContext: 'GADU_KEMARAU',
    seasonLabel: 'Musim Tanam Bawang Merah Gadu Brebes & Nganjuk',
    climateTrigger:
      'Angin kering kencang (angin kumbang) dengan radiasi panas tinggi mempercepat penguapan daun bawang.',
    productPairing: {
      heroProduct: 'bensu',
      partnerProduct: 'saratoga',
      pairingType: 'DUO_ROTASI',
      pairingLabel: 'Duo Daun Kaku Tegak & Umbi Merah Padat Berbobot',
      synergyMechanism:
        'BENSU (15 & 22 HST) menekan pucuk kuning dan memperbanyak anakan daun kaku tegap bebas layu. SARATOGA (35 & 45 HST) mengalirkan seluruh cadangan makanan daun menjadi umbi super besar, padat, beraroma tajam, dan merah mengkilap tahan susut.',
    },
    prescription: {
      dosagePer16L: 'Umur 15-20 HST: BENSU 25 ml -> Umur 35 & 45 HST: SARATOGA 25 ml',
      dosagePerHa: '1.5 Liter BENSU + 1.5 Liter SARATOGA',
      applicationMethod: 'SEMPROT_KABUT_PAGI',
      applicationMethodLabel: 'Semprot kabut halus merata pada tajuk daun bawang merah',
      bestTime: 'Pukul 06.00 - 08.00 WIB pagi hari',
      intervalDays: 10,
      roundsNeeded: 3,
      recoverySlaDays: 'Daun kembali kaku tegap hijau kebiruan; umbi merah menyala besar seragam, susut askip turun di bawah 12%',
    },
    tankMixSafety: {
      status: 'COMPATIBLE',
      guideline: 'Sangat kompatibel dicampur dengan fungisida mankozeb atau klorotalonil.',
      prohibitedMixes: ['Insektisida Golongan Klorpirifos Pekat', 'Tembaga Pekat'],
    },
    commercialMetaAdsHook: {
      headline:
        'Petani Bawang Brebes & Nganjuk: Mau Umbi Bawang Merah Merah Menyala, Padat Berbobot & Tahan Simpan Gudang?',
      kiosAdviceScript:
        'Pakai duet BENSU di awal untuk bikin daun tegap kaku tidak pucuk kuning, lalu kunci pembentukan umbi dengan SARATOGA di umur 35 HST ke atas. Timbangan naik 20-30 kg per kuintal saat dijual!',
    },
  },
  {
    id: 'PB-BUAH-13',
    problemName: 'Melon / Semangka Kurang Manis, Kulit Pecah & Gagal Tembus Grade A',
    problemCategory: 'KUALITAS_PANEN',
    categoryLabel: 'Kualitas & Bobot Panen',
    cropCategory: 'Hortikultura Buah & Sayuran',
    crops: ['Melon Golden', 'Melon Action', 'Semangka Non-Biji'],
    severityLevel: 'SEDANG',
    visualSymptoms:
      'Kulit buah melon retak pecah saat mendekati panen (fruit cracking), net jaring tidak rata, kadar kemanisan (Brix) di bawah 11%, dan daging buah lembek berair.',
    rootCause:
      'Dinding sel kulit buah kehilangan elastisitas akibat kekurangan kalsium-asam amino terkelat dan kelebihan air mendadak pasca periode kering. Fotosintesis terganggu sehingga akumulasi gula sukrosa di ruang buah terhambat.',
    peakMonths: ['Februari', 'Maret', 'Juni', 'Juli', 'Oktober'],
    seasonContext: 'SEPANJANG_TAHUN',
    seasonLabel: 'Fase Pembesaran Buah & Pematangan',
    climateTrigger:
      'Fluktuasi kelembaban tanah ekstrem saat fase pembesaran buah akhir (10-15 hari sebelum panen).',
    productPairing: {
      heroProduct: 'saratoga',
      partnerProduct: 'kojien',
      pairingType: 'DUO_ROTASI',
      pairingLabel: 'Duo Grade A Ekspor: Manis Tinggi & Kulit Elastis Anti-Pecah',
      synergyMechanism:
        'SARATOGA mendongkrak akumulasi gula dan aroma khas buah melon melalui asam amino glutamat dan glisin, sementara silika KOJIEN memperkuat elastisitas dinding sel kulit agar tidak meledak retak saat buah membesar maksimal.',
    },
    prescription: {
      dosagePer16L: 'SARATOGA 25 ml + KOJIEN 15 ml per Tangki 16 Liter (disemprotkan umur 45 HST & 55 HST)',
      dosagePerHa: '1.25 Liter SARATOGA + 1.0 Liter KOJIEN',
      applicationMethod: 'SEMPROT_KABUT_PAGI',
      applicationMethodLabel: 'Semprot kabut halus merata pada tajuk daun dan permukaan buah',
      bestTime: 'Pukul 06.30 - 09.00 WIB',
      intervalDays: 10,
      roundsNeeded: 2,
      recoverySlaDays: 'Brix melon tembus 13-14%, net terbentuk sempurna rapat tebal, 85-90% panen lolos Grade A',
    },
    tankMixSafety: {
      status: 'COMPATIBLE',
      guideline: 'Dapat dicampur dengan kalsium nitrat cair dan kalium hidroksida food-grade.',
      prohibitedMixes: ['Pestisida Kimia Berbau Kuat Menjelang Panen', 'ZPT Sintetik Berlebih'],
    },
    commercialMetaAdsHook: {
      headline:
        'Buah Melon Retak Pecah Menjelang Panen? Kunci Net Sempurna, Manis Tinggi & Tembus Standar Supermarket!',
      kiosAdviceScript:
        'Petani melon paling takut buah retak dan tidak manis karena dihargai murah. Tawarkan paket SARATOGA 10 hari sebelum panen untuk memadatkan daging buah dan mengunci rasa manis lezat.',
    },
  },
  {
    id: 'PB-RECOVERY-14',
    problemName: 'Keracunan Overdosis Pestisida / Herbisida Selektif Daun Terbakar',
    problemCategory: 'PERTUMBUHAN_MANDEK',
    categoryLabel: 'Pertumbuhan Mandek',
    cropCategory: 'Semua Komoditas',
    crops: ['Cabai', 'Padi', 'Jagung', 'Tomat', 'Bawang Merah'],
    severityLevel: 'KRITIS',
    visualSymptoms:
      'Daun melepuh kecoklatan dalam 24 jam pasca semprot pestisida (fitotoksisitas), tepi daun mengering keriting ke atas, pucuk lemas layu terkulai, dan tanaman mogok tumbuh total.',
    rootCause:
      'Pencampuran terlalu banyak jenis pestisida secara serampangan (*cocktail spray overload*) atau penggunaan herbisida selektif dengan dosis berlebih saat cuaca terlalu terik, merusak kloroplas dan membran sel daun.',
    peakMonths: ['Sepanjang Tahun'],
    seasonContext: 'SEPANJANG_TAHUN',
    seasonLabel: 'Kondisi Darurat Kapan Saja Terjadi',
    climateTrigger:
      'Penyemprotan pestisida pekat di atas jam 10.00 WIB saat matahari sangat terik dan angin kencang.',
    productPairing: {
      heroProduct: 'bensu',
      pairingType: 'TUNGGAL_DARURAT',
      pairingLabel: 'Penawar Racun Jaringan & Pemacu Enzim Pembuka Stomata',
      synergyMechanism:
        'BENSU mengandung senyawa fitoremediator organik dan asam organik rantai pendek yang mengikat residu racun kimia di dalam sitoplasma sel, merangsang pembentukan enzim antioksidan peroksidase, dan membuka kembali stomata daun yang kolaps.',
    },
    prescription: {
      dosagePer16L: 'BENSU 35 ml / Tangki 16 Liter (Segera aplikasikan hari itu juga atau maksimal 24 jam setelah kejadian)',
      dosagePerHa: '1.5 - 2.0 Liter BENSU per Hektar',
      applicationMethod: 'KOMBINASI_SEMPROT_KOCOR',
      applicationMethodLabel: 'Kocor pangkal akar 150 ml/pohon + semprot kabut basah kuyup ke seluruh daun terbakar',
      bestTime: 'Sore hari pukul 16.00 - 18.00 WIB (agar larutan bertahan lama basah di daun sepanjang malam)',
      intervalDays: 4,
      roundsNeeded: 2,
      recoverySlaDays: '48 - 72 Jam (tanaman tidak mati, pucuk baru mulai hijau membuka menembus daun terbakar)',
    },
    tankMixSafety: {
      status: 'STRICTLY_PROHIBITED',
      guideline:
        'Wajib diaplikasikan TUNGGAL murni dengan air tawar bersih. DILARANG KERAS dicampur bahan kimia apa pun.',
      prohibitedMixes: ['SEMUA JENIS PESTISIDA KIMIA', 'PUPUK DAUN KIMIA', 'PEREKAT SINTETIK'],
    },
    commercialMetaAdsHook: {
      headline:
        'Salah Campur Obat Daun Tanaman Langsung Gosong Melepuh? Jangan Pasrah, Selamatkan Kebun Anda dalam 48 Jam!',
      kiosAdviceScript:
        'Pertolongan pertama keracunan pestisida: Segera cuci tanaman dengan kocor dan semprot BENSU dosis 3 tutup per tangki sore ini juga tanpa campuran obat lain. Jangan biarkan racun meresap ke akar.',
    },
  },
  {
    id: 'PB-TRANSPLANT-15',
    problemName: 'Stres Layu Pindah Tanam Bibit Tray ke Bedengan (Transplanting Shock)',
    problemCategory: 'STRESS_CUACA',
    categoryLabel: 'Stres Cuaca & Dehidrasi',
    cropCategory: 'Hortikultura Buah & Sayuran',
    crops: ['Cabai', 'Tomat', 'Melon', 'Semangka', 'Terong'],
    severityLevel: 'RINGAN',
    visualSymptoms:
      'Bibit muda yang baru dipindah dari baki semai (tray) ke bedengan terkulai rebah di atas mulsa plastik panas, akar lateral terputus, dan daun bawah menguning rontok dalam 3 hari pertama.',
    rootCause:
      'Kerusakan mekanis bulu akar saat pencabutan bibit dari baki semai, ditambah kejutan suhu mulsa plastik perak yang dapat mencapai > 40°C saat terik matahari siang.',
    peakMonths: ['Oktober', 'November', 'Desember', 'April', 'Mei'],
    seasonContext: 'SEPANJANG_TAHUN',
    seasonLabel: 'Fase Awal Tanam Tiap Musim (0 - 7 HST)',
    climateTrigger:
      'Panas terik pantulan mulsa plastik hitam perak pada bedengan baru.',
    productPairing: {
      heroProduct: 'bensu',
      partnerProduct: 'kojien',
      pairingType: 'DUO_TANK_MIX',
      pairingLabel: 'Duo Larutan Celup Akar & Pemicu Bulu Akar Cepat',
      synergyMechanism:
        'BENSU merangsang pembentukan ratusan bulu akar serap baru dalam 48 jam, sementara KOJIEN mempertebal kutikula batang bibit agar tidak lemas terpanggang panas mulsa plastik.',
    },
    prescription: {
      dosagePer16L: 'BENSU 20 ml + KOJIEN 15 ml per Tangki 16 Liter (sebagai larutan celup tray dan kocor lubang tanam)',
      dosagePerHa: '1 Liter BENSU + 1 Liter KOJIEN',
      applicationMethod: 'KOMBINASI_SEMPROT_KOCOR',
      applicationMethodLabel: 'Celup baki tray bibit 1 menit sebelum tanam, lalu kocor 100 ml per lubang setelah tanam',
      bestTime: 'Sore hari pukul 15.30 - 17.30 WIB saat bedengan mulai teduh',
      intervalDays: 7,
      roundsNeeded: 2,
      recoverySlaDays: '24 Jam bibit langsung tegap berdiri kaku, 0% kematian bibit di bedengan',
    },
    tankMixSafety: {
      status: 'COMPATIBLE',
      guideline: 'Dapat dicampur dengan fungisida perlakuan bibit atau agen hayati Trichoderma.',
      prohibitedMixes: ['Herbisida Bedengan', 'Pupuk Kimia Butiran Konsentrasi Tinggi'],
    },
    commercialMetaAdsHook: {
      headline:
        'Bibit Cabai & Melon Sering Layu Mati Kena Panas Mulsa Pasca Pindah Tanam? Kunci 100% Bibit Hidup Tegap!',
      kiosAdviceScript:
        'Edukasi petani untuk mencelupkan tray bibit ke larutan BENSU sebelum bibit dicabut dan ditanam. Bibit tidak akan mengalami stres layu dan langsung tancap gas tumbuh tanpa sulam ulang.',
    },
  },
]
