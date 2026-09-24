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
      'Plant Stimulator & Recovery Anti-Kulat Sawit Berbasis Bahan Organik Tinggi',
    categoryLabel: 'Plant Recovery Stimulator',
    badgeVariant: 'rose',
    targetCommodityLabels: ['Kelapa Sawit (Oil Palm)'],
    corePositioning: {
      en: 'Oil Palm Recovery Treatment for Fungal Stress & Weak Trees',
      id: 'Treatment recovery sawit untuk pokok lemah, busuk, kuning, dan serangan jamur berat Ganoderma',
      my: 'Rawatan pemulihan sawit untuk pokok lemah, kuning, reput akar/batang dan serangan kulat Ganoderma',
    },
    coreAngle:
      'Jangan tunggu pokok sawit mati baru rawat. Recovery dulu, baru hasil.',
    internalMantra:
      'AUSSIE bukan baja biasa. Ini rawatan recovery untuk pokok sawit yang mulai lemah, kuning, busuk, atau ada tanda kulat.',
    whatItIs: [
      'Plant stimulator recovery khusus tanaman kelapa sawit',
      'Treatment pemulihan perakaran, pangkal batang, dan pelepah pucuk yang rusak',
      'Support pertahanan biologis terhadap tekanan jamur vaskular berat (Ganoderma boninense, Marasmius)',
      'Kombinasi sistem spray pelepah muda dan kocor/siram perakaran aktif',
      'Formula organik ramah tanah untuk perawatan intensif maupun kuratif berkelanjutan',
    ],
    whatItIsNot: [
      'Bukan pupuk NPK / baja makro biasa',
      'Bukan booster pemacu buah instan',
      'Bukan fungisida racun kimia sintetik murni',
      'Bukan insektisida pembunuh ulat api / kumbang badak',
      'Bukan solusi ajaib sekali semprot selesai tanpa disiplin rawat kebun',
    ],
    formulaConcept: 'Organic Bio-Defense & Vascular Restorer System',
    brandMechanism:
      'Bio-Fungistatic Organic Restorer — Mengisolasi penetrasi hifa jamur, meregenerasi jaringan korteks akar yang membusuk, dan mengaktifkan kembali translokasi nutrisi ke pelepah pucuk.',
    composition: [
      {
        item: 'Bahan Organik Aktif Terseleksi',
        value: '≥ 45.0%',
        function:
          'Meregenerasi struktur biologi perakaran dan merangsang mikrobioma antagonis tanah',
      },
      {
        item: 'Asam Humat & Fulvat Bio-Grade',
        value: '18.5%',
        function:
          'Meningkatkan KTK tanah gambut/mineral dan mengikat kation hara agar cepat diserap akar sawit',
      },
      {
        item: 'Senyawa Fenolik Organik Anti-Kulat',
        value: '12.0%',
        function:
          'Menghambat perkecambahan spora Ganoderma dan menghentikan pembusukan jaringan lunak',
      },
      {
        item: 'Unsur Makro & Mikro Pelindung (K, Mg, B, Fe)',
        value: '8.5%',
        function:
          'Mempertebal dinding sel pelepah sawit dan memicu fotosintesis klorofil daun tua',
      },
      {
        item: 'Carrier & Penetrating Agent Alami',
        value: 'q.s to 100%',
        function:
          'Mempercepat peresapan larutan menembus sabut pangkal batang dan pori akar rambut',
      },
    ],
    claimGuardrails: {
      allowedPhrasing: [
        'Membantu mendukung pemulihan pokok sawit yang lemah dan menguning',
        'Membantu merawat perakaran dari ancaman pembusukan jamur tanah',
        'Mendukung pokok sawit tetap produktif dan tidak cepat tumbang',
        'Membantu memperpanjang usia produktif tanaman kelapa sawit',
        'Membantu mengurangi keparahan gejala kulat pada pangkal batang',
      ],
      prohibitedPhrasing: [
        'Menjamin 100% Ganoderma mati seketika',
        'Menyembuhkan total pokok sawit yang sudah keropos roboh',
        'Obat racun pembunuh semua jenis jamur',
        'Pupuk pengganti seluruh kebutuhan NPK kebun',
      ],
    },
    severityLevels: [
      {
        stage: 'Level 1: Gejala Dini (Early Stress)',
        title: 'Daun Tombak Tidak Membuka & Pelepah Bawah Kuning',
        symptoms:
          'Daun tombak tegak lebih dari 2 pucuk belum membuka, pelepah tertua menguning kusam tidak wajar, daun menguncup.',
        prognosis:
          'Peluang Recovery: 90% - 95%. Jaringan vaskular kambium masih utuh.',
        recommendedDosage: '150 ml per pokok dilarutkan dalam 3 liter air.',
        actionProtocol:
          'Kocor merata di lingkar piringan perakaran aktif (radius 1 meter dari batang). Ulangi aplikasi 30 hari sekali sebanyak 2 putaran.',
      },
      {
        stage: 'Level 2: Gejala Sedang (Moderate Stress)',
        title: 'Pelepah Patah Menggantung & Pangkal Batang Lembek',
        symptoms:
          'Pelepah bawah patah di pangkal membentuk piramida terbalik (*skirt-like fronds*), daun pucat layu, lingkar batang mulai berbau masam.',
        prognosis:
          'Peluang Recovery: 70% - 80%. Pembusukan akar rambut sudah 25-40%.',
        recommendedDosage: '200 ml per pokok dilarutkan dalam 4 liter air.',
        actionProtocol:
          'Siramkan 3 liter ke piringan akar dan 1 liter basahi merata pangkal batang. Lakukan sanitasi pelepah kering. Ulangi interval 14 hari sebanyak 3 kali.',
      },
      {
        stage: 'Level 3: Gejala Berat (Severe Ganoderma / Kulat)',
        title: 'Muncul Badan Buah Jamur (Basidioma) di Pangkal Batang',
        symptoms:
          'Badan buah jamur Ganoderma berbentuk tapal kuda cokelat mengkilap menempel di pangkal batang, jaringan kayu pangkal rapuh berlubang.',
        prognosis:
          'Peluang Stabilisasi: 40% - 55%. Fokus menahan agar tidak roboh dan tidak menular ke pokok sebelah.',
        recommendedDosage:
          '250 ml per pokok (200 ml kocor perakaran + 50 ml kuas pasta murni).',
        actionProtocol:
          'Kikis badan buah jamur sampai dasar jaringan kayu, oleskan AUSSIE murni tanpa air pada luka kupasan. Kocor 4 liter larutan ke perakaran. Buat parit isolasi 4x4 meter.',
      },
      {
        stage: 'Level 4: Stadium Akhir (Terminal)',
        title: 'Batang Berongga Keropos > 60% & Pokok Condong Miring',
        symptoms:
          'Pangkal batang berongga parah, tanah di bawah pohon amblas, pokok condong > 30 derajat.',
        prognosis:
          'Peluang Ekonomi: < 15%. Risiko tinggi patah diterpa angin monsun.',
        recommendedDosage: 'Tidak disarankan pengobatan ekonomis.',
        actionProtocol:
          'Eradikasi / tumbang pokok, cincang bonggol sawit, sanitasi lubang tanam dengan kapur pertanian dan agen hayati sebelum replanting.',
      },
    ],
    dosageMatrix: [
      {
        cropOrPhase: 'Sawit TBM (Tanaman Belum Menghasilkan 1-3 Thn)',
        timing: 'Fase Pembentukan Tajuk & Perakaran Awal',
        dosagePerLiter: '15 - 20 ml / Liter Air (75 - 100 ml / Pokok)',
        applicationMethod: 'SOIL_DRENCH',
        intervalDays: 45,
        keyNotes:
          'Kocor di piringan bersih bebas gulma tebal agar terserap akar rambut baru.',
      },
      {
        cropOrPhase: 'Sawit TM (Tanaman Menghasilkan 4-15 Thn)',
        timing: 'Perawatan Rutin Pencegahan Bulanan',
        dosagePerLiter: '25 - 30 ml / Liter Air (150 ml / Pokok)',
        applicationMethod: 'SOIL_DRENCH',
        intervalDays: 60,
        keyNotes:
          'Aplikasi saat tanah lembab di awal atau akhir musim hujan. Sangat efektif menjaga kestabilan TBS.',
      },
      {
        cropOrPhase: 'Sawit Gejala Kulat / Pelepah Kuning Masif',
        timing: 'Kuratif Intensif Segera Setelah Terdeteksi',
        dosagePerLiter: '40 - 50 ml / Liter Air (200 ml / Pokok)',
        applicationMethod: 'TRUNK_DRENCH',
        intervalDays: 14,
        keyNotes:
          'Aplikasi 3 putaran berturut-turut pada hari ke-0, 14, dan 28. Hindari aplikasi saat hujan lebat deras.',
      },
      {
        cropOrPhase: 'Luka Batang Pasca Pembuangan Kulat Jamur',
        timing: 'Segera Pasca Pengikisan Badan Buah Jamur',
        dosagePerLiter: 'Murni Tanpa Enceran (100% Pasta AUSSIE)',
        applicationMethod: 'PASTE_COATING',
        intervalDays: 21,
        keyNotes:
          'Oleskan menggunakan kuas cat tebal pada seluruh permukaan kayu yang telah dibersihkan dari spora.',
      },
    ],
    demographics: {
      persona: {
        roleTitle: 'Pekebun Sawit Swadaya Mandiri',
        acreageProfile:
          'Lahan sawit 4 - 25 Hektar (400 - 3.200 pokok produktif)',
        primaryCrops: ['Kelapa Sawit'],
        coreFear:
          'Pokok sawit mati satu per satu, kebun tertular Ganoderma, panen TBS anjlok drastis dan modal replanting tidak ada.',
        coreAspiration:
          'Pokok sawit tetap segar hijau tegap, pelepah tidak sengkleh, TBS berbobot berat, dan investasi kebun terselamatkan.',
        awarenessStage: 'PROBLEM_AWARE',
        buyingMotivator:
          'Takut kehilangan aset pohon produktif yang butuh waktu 5 tahun untuk tumbuh kembali.',
      },
      sentraHubs: [
        {
          province: 'Riau',
          regencies: [
            'Rokan Hulu',
            'Kampar',
            'Pelalawan',
            'Siak',
            'Indragiri Hulu',
          ],
          soilAndClimateNote:
            'Sentra sawit terbesar nasional, banyak hamparan tanah gambut dan mineral masam rentan Ganoderma.',
        },
        {
          province: 'Sumatera Utara',
          regencies: ['Labuhanbatu', 'Asahan', 'Simalungun', 'Deli Serdang'],
          soilAndClimateNote:
            'Kebun generasi ke-2 dan ke-3 dengan tingkat inokulum spora jamur tanah yang sangat tinggi.',
        },
        {
          province: 'Sumatera Selatan',
          regencies: ['Musi Banyuasin', 'Banyuasin', 'Ogan Komering Ilir'],
          soilAndClimateNote:
            'Areal pasang surut dan gambut dangkal yang mengalami stres air fluktuatif.',
        },
        {
          province: 'Kalimantan Barat',
          regencies: ['Ketapang', 'Sanggau', 'Landak'],
          soilAndClimateNote:
            'Ekspansi kebun sawit rakyat intensif dengan keterbatasan akses fungisida vaskular presisi.',
        },
        {
          province: 'Kalimantan Tengah',
          regencies: ['Kotawaringin Timur', 'Kotawaringin Barat', 'Seruyan'],
          soilAndClimateNote:
            'Stres kekeringan El Niño panjang mempercepat mortalitas pohon bergejala infeksi jamur.',
        },
      ],
      malaysiaSentraHubs: [
        'Johor (Batu Pahat, Kluang, Pontian)',
        'Perak (Teluk Intan, Hilir Perak)',
        'Pahang (Temerloh, Rompin)',
        'Sabah (Lahad Datu, Sandakan)',
        'Sarawak (Miri, Bintulu)',
      ],
    },
    commercialPillars: {
      pricingStrategy:
        'Value-Based Emergency Asset Protection: Biaya 1 botol AUSSIE jauh lebih murah dibanding kehilangan 1 pokok sawit produktif bernilai puluhan juta rupiah.',
      heroOffers: [
        {
          name: 'Paket Emergency Recovery (3 Pokok Parah)',
          volume: '1 Liter Botol',
          priceIdr: 185000,
          targetFarmer:
            'Petani yang baru pertama kali mencoba pada 3-5 pokok sawit yang bergejala kuning/kulat',
        },
        {
          name: 'Paket Rawat Blok Sentra (10-15 Pokok)',
          volume: '4 Liter Jerigen',
          priceIdr: 680000,
          targetFarmer:
            'Pekebun dengan 1 barisan pohon sawit yang mulai tertular Ganoderma',
        },
        {
          name: 'Paket Perlindungan Hamparan 1 Hektar (130 Pokok)',
          volume: '20 Liter Pail Drum',
          priceIdr: 2950000,
          targetFarmer:
            'Pekebun sawit mandiri profesional untuk sanitasi dan recovery blok kebun terpapar',
        },
      ],
      proofAssets: [
        'Dokumentasi timelapse foto pucuk sawit membuka kembali hijau segar dalam 21 hari pasca kocor',
        'Foto penampang bekas pengikisan kulat yang mengering keras tanpa muncul spora baru',
        'Video wawancara pekebun sawit Rokan Hulu & Labuhanbatu yang berhasil membatalkan rencana tebang pokok',
      ],
      objectionHandling: [
        {
          objection:
            'Sawit saya sudah ada kulat jamurnya, apa masih bisa hidup?',
          rebuttle:
            'Kalau pokoknya belum condong roboh dan batang tengah belum berlubang habis, AUSSIE berfungsi menyetop penyebaran jamur ke vaskular sehat dan memacu akar rambut baru. Ribuan pokok berhasil diselamatkan kalau ditangani saat level 1 sampai 3.',
        },
        {
          objection: 'Kenapa harganya beda dengan pupuk biasa?',
          rebuttle:
            'Karena AUSSIE bukan pupuk harian pengisi tanah biasa. AUSSIE adalah formula konsentrat recovery anti-kulat vaskular. Kalau pokok mati, biaya tanam ulang dan waktu tunggu 4 tahun ruginya puluhan juta rupiah per pokok.',
        },
      ],
      csDecisionTree: [
        {
          farmerSymptomTrigger:
            'Petani lapor daun sawit mulai kuning dan pucuk tidak membuka',
          csQuestion:
            'Sudah berapa lama menguning Pak? Apakah di pangkal batangnya ada jamur seperti tapal kuda atau bekas luka?',
          recommendation:
            'Jika belum ada jamur, tanaman masuk Level 1-2. Wajib kocor AUSSIE 150-200 ml per pokok dilarutkan air 3-4 liter sekarang juga sebelum terlambat.',
          suggestedBundle:
            'Paket 1 Liter (untuk 5 pokok) atau Jerigen 4 Liter (untuk 20 pokok).',
        },
        {
          farmerSymptomTrigger: 'Petani lapor ada jamur nempel di batang sawit',
          csQuestion:
            'Apakah batangnya sudah goyang bila didorong dan jamurnya sudah banyak mengelilingi batang?',
          recommendation:
            'Jika masih kokoh, segera kikis kulatnya sampai dasar kayu, kuaskan AUSSIE murni tanpa air pada luka, lalu kocor 200 ml di tanah sekelilingnya.',
          suggestedBundle: 'Paket Jerigen 4 Liter + kuas aplikasi.',
        },
      ],
    },
    climateIntegration: {
      elNino2026Role:
        'Kekeringan ekstrem El Niño 2026 menurunkan kelembaban tanah dan melemahkan pembuluh xilem sawit. AUSSIE menjaga agar akar rambut tidak mati terbakar terik matahari dan mencegah kematian mendadak pokok lemah.',
      laNina2027Role:
        'Kemarau basah dan curah hujan tinggi 2027 menciptakan kelembaban udara jenuh (>85% RH) yang merupakan surga perkembangbiakan spora Ganoderma boninense. AUSSIE diaplikasikan secara preventif untuk memblokir penularan spora jamur antar pokok.',
      goldenApplicationWindows:
        'Puncak kebutuhan: November-Desember (awal hujan 2026) dan April-Juli 2027 (fase transisi hidrologis kemarau basah).',
    },
    metaAdsPlaybook: {
      coreHooks: [
        {
          angleId: 'aussie-hook-01',
          angleName: 'Fear of Loss / Ganoderma Alert',
          targetProblem: 'Pokok sawit tiba-tiba menguning dan mati',
          primaryHeadline:
            'Pokok Sawit Mula Kuning & Pucuk Lembek? Jangan Tunggu Sampai Mati Baru Rawat!',
          hookQuestion:
            'Pernah perhatikan pelepah sawit bawah patah menggantung seperti payung terbalik?',
          bodyCopy:
            'Banyak pekebun mengira cuma kurang pupuk, padahal jamur kulat batang dan Ganoderma sudah memakan akar di dalam tanah. Kalau dibiarkan, pokok bisa tumbang mendadak! Selamatkan pokok produktif Anda dengan AUSSIE Sawit: formula bio-recovery organik konsentrat tinggi yang merangsang akar baru dan menghentikan pembusukan batang.',
          callToAction: 'Pesan Paket Recovery Sawit Sekarang',
          suggestedCreative:
            'Video split screen: Kiri (pelepah sengkleh menguning) vs Kanan (21 hari pasca kocor AUSSIE pucuk membuka hijau kokoh)',
          seasonalFit: 'Oktober 2026 - Desember 2027 (All Seasons)',
        },
        {
          angleId: 'aussie-hook-02',
          angleName: 'Malay Market Special (Riau & Semenanjung)',
          targetProblem: 'Kulat batang Ganoderma sawit',
          primaryHeadline:
            'Rawatan Pemulihan Sawit: Pulihkan Pokok Lemah Sebelum Ganoderma Merebak Ke Seluruh Kebun!',
          hookQuestion:
            'Pokok sawit ada tanda kulat tapal kuda di pangkal batang?',
          bodyCopy:
            'Jangan tunggu pokok mati baru nak pening kepala tanam semula. AUSSIE Sawit adalah rawatan pemulihan yang dirumus khas untuk pulihkan akar yang reput, bantu pokok kembali hijau, dan sekat kulat daripada terus makan tisu batang. Rawat segera sebelum satu blok kebun terjangkit!',
          callToAction: 'Dapatkan Konsultasi CS Kebun Sawit',
          suggestedCreative:
            'Foto close-up badan buah Ganoderma yang dikikis lalu dioles AUSSIE dan perbandingan akar rambut baru',
          seasonalFit: 'Musim Hujan Rendeng & Kemarau Basah 2027',
        },
      ],
      targetingInterests: [
        'Kelapa sawit',
        'Pertanian kelapa sawit di Indonesia',
        'Oil palm',
        'Gabungan Pengusaha Kelapa Sawit Indonesia',
        'Pekanbaru',
        'Medan',
        'Palembang',
        'Ketapang',
        'Sampit',
      ],
      exclusions: ['Pekerja kantoran tanpa lahan', 'Usia di bawah 25 tahun'],
    },
    faqs: [
      {
        question: 'Berapa hari setelah kocor AUSSIE terlihat tanda pemulihan?',
        answer:
          'Pada tingkat keparahan ringan-sedang (Level 1-2), tanda visual awal terlihat pada hari ke-14 sampai 21: daun pucuk muda yang semula macet mulai terdorong naik dan membuka hijau segar, serta pembusukan di pangkal batang mengering.',
        category: 'APPLICATION',
      },
      {
        question:
          'Apakah AUSSIE bisa dicampur dengan herbisida pembasmi rumput?',
        answer:
          'TIDAK DISARANKAN. Herbisida bersifat meracuni sel tanaman. Campurkan AUSSIE hanya dengan air bersih atau pupuk hayati non-kimia keras, dan jangan diaplikasikan bersamaan dengan herbisida glifosat/parakuat pada hari yang sama.',
        category: 'COMPATIBILITY',
      },
      {
        question: 'Apakah tanah gambut cocok menggunakan AUSSIE?',
        answer:
          'Sangat cocok. Tanah gambut umumnya memiliki pH rendah (3.5 - 4.5) yang memicu jamur berkembang cepat. Kandungan asam humat dan fulvat pada AUSSIE membantu menstabilkan zona perakaran di tanah gambut.',
        category: 'APPLICATION',
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
      'Stimulator Pemulihan Tanaman Sayur Lemah, Kuning, Layu & Stres Cuaca Ekstrem',
    categoryLabel: 'Growth Restart Stimulator',
    badgeVariant: 'amber',
    targetCommodityLabels: [
      'Cabai',
      'Tomat',
      'Bawang Merah',
      'Melon',
      'Semangka',
      'Kentang',
      'Kubis',
    ],
    corePositioning: {
      en: 'Horticulture Recovery & Growth-Restart Stimulator for Stressed Vegetable Crops',
      id: 'Stimulator pemulihan tanaman hortikultura untuk membantu tanaman sayur yang lemah, kuning, layu, stres, dan mandek tumbuh agar kembali aktif',
    },
    coreAngle:
      'Tanaman lemah jangan cuma ditambah pupuk. Pulihkan dulu kondisinya sebelum gagal panen.',
    internalMantra:
      'BENSU bukan pupuk biasa. Ini recovery stimulator untuk bantu tanaman hortikultura yang stres cuaca, keracunan pestisida, atau mandek tumbuh supaya kembali aktif segar.',
    whatItIs: [
      'Stimulator pemulihan tanaman hortikultura sayuran dan buah cepat panen',
      'Peremaja titik tumbuh pucuk, daun baru, dan serabut akar halus',
      'Anti-stres osmotik pasca terik matahari kemarau ekstrem, banjir genangan, atau overdosis semprotan pestisida',
      'Akselerator fase vegetatif agar tanaman siap masuk fase pembungaan dan pembuahan',
      'Dapat diaplikasikan lewat semprot kabut daun maupun kocor lubang tanam',
    ],
    whatItIsNot: [
      'Bukan pupuk dasar pengganti NPK atau kompos kandang',
      'Bukan racun pembunuh ulat, thrips, atau kutu kebul',
      'Bukan fungisida kimia murni pembasmi patek antraknosa',
      'Bukan serum pengisi bobot buah generatif premium (itu peran Saratoga)',
      'Bukan produk ajaib instan dalam 1 jam',
    ],
    formulaConcept: 'Cellular Stress Reliever & Root Re-Activator',
    brandMechanism:
      'Cytokinin-Auxin Natural Trigger & Osmoprotectant Complex — Menurunkan hormon asam absisat (ABA) penyebab tanaman layu stres, membuka kembali stomata daun untuk fotosintesis, dan memicu diferensiasi sel akar rambut baru dalam 72 jam.',
    composition: [
      {
        item: 'Senyawa Osmoprotektan (Prolin & Betain Alami)',
        value: '15.0%',
        function:
          'Menjaga turgor sel tanaman agar tidak layu mengering saat suhu udara siang hari mencapai > 36°C',
      },
      {
        item: 'Fito-Aktivator Tunas & Akar (Prekursor Sitokinin)',
        value: '10.5%',
        function:
          'Merangsang keluarnya pucuk tunas samping dan cabang produktif baru pada tanaman cabai/tomat',
      },
      {
        item: 'Kompleks Asam Amino Vegetatif Bebas',
        value: '22.0%',
        function:
          'Sumber energi instan siap serap tanpa membebani proses fotosintesis tanaman yang sedang sakit',
      },
      {
        item: 'Kelat Mikronutrien Bio-Available (Mg, Fe, Zn, Mn)',
        value: '6.5%',
        function:
          'Mengoreksi gejala klorosis (daun kuning urat hijau) dan mengembalikan pigmen klorofil aktif',
      },
      {
        item: 'Surfaktan & Penembus Jaringan Alami',
        value: 'q.s to 100%',
        function:
          'Memastikan cairan formula menempel kuat pada lapisan lilin daun hortikultura',
      },
    ],
    claimGuardrails: {
      allowedPhrasing: [
        'Membantu memulihkan tanaman sayur yang stres cuaca atau keracunan obat',
        'Membantu merangsang pertumbuhan tunas baru dan akar rambut aktif',
        'Mendukung daun yang pucat menguning kembali segar hijau royo-royo',
        'Membantu tanaman cabai dan tomat keluar dari fase stagnan/mandek',
        'Mendukung ketahanan tanaman menghadapi perubahan cuaca mendadak',
      ],
      prohibitedPhrasing: [
        'Menyembuhkan 100% layu fusarium stadium busuk batang basah',
        'Membuat tanaman kebal dari semua serangan virus gemini',
        'Pengganti total seluruh pemupukan tanah',
        'Jaminan panen melimpah tanpa perawatan lain',
      ],
    },
    severityLevels: [
      {
        stage: 'Level 1: Stres Ringan (Mild Stress)',
        title: 'Kaget Pindah Tanam (Transplanting Shock) / Kusam',
        symptoms:
          'Bibit baru pindah tanam layu kusam di siang hari, pucuk muda berhenti tumbuh 3-5 hari pasca tanam.',
        prognosis: 'Peluang Recovery: 98% pulih aktif dalam 3 hari.',
        recommendedDosage: '1.0 - 1.5 ml / Liter Air.',
        actionProtocol:
          'Kocorkan 150 ml larutan ke pangkal bibit pada pagi/sore hari. Tanaman langsung menyerap nutrisi tanpa stres perakaran.',
      },
      {
        stage: 'Level 2: Stres Sedang (Chemical Burn / Stres Suhu)',
        title: 'Daun Kuning Klorosis, Terbakar Obat, Mandek Vegetatif',
        symptoms:
          'Daun menguning mulai dari daun tua, ujung daun menggulung mengering akibat overdosis pestisida/pupuk kimia pekat, akar cokelat kaku.',
        prognosis:
          'Peluang Recovery: 85% - 90% keluar tunas baru dalam 5-7 hari.',
        recommendedDosage: '2.0 ml / Liter Air (30 ml per tangki 16L).',
        actionProtocol:
          'Semprot kabut merata ke seluruh daun pada pukul 06.30 - 08.30 pagi. Kocorkan 200 ml ke perakaran. Ulangi interval 5 hari sekali sebanyak 2 kali.',
      },
      {
        stage: 'Level 3: Stres Berat (Severe Drought / Waterlogging)',
        title: 'Layu Siang Hari, Daun Gugur, Akar Rambut Rusak',
        symptoms:
          'Tanaman cabai/tomat terkulai lemas di siang hari terik El Niño atau pasca terendam air hujan berlebih, batang masih elastis tapi tidak segar.',
        prognosis:
          'Peluang Recovery: 65% - 75% jika pembuluh vaskular xilem belum berlendir cokelat.',
        recommendedDosage: '2.5 ml / Liter Air.',
        actionProtocol:
          'Perbaiki parit drainase bedengan, lalu kocorkan 250 ml larutan BENSU tepat di zona perakaran. Semprot halus daun dengan dosis ringan 1.5 ml/L.',
      },
      {
        stage: 'Level 4: Busuk Pangkal Basah (Terminal Bacterial Wilt)',
        title: 'Batang Berlendir Hitam / Layu Bakteri Stadium Akhir',
        symptoms:
          'Batang bawah berlendir bau masam, bila dipotong dicelup air keluar lendir kabut putih (uji vaskular bakteri positif), tanaman mati kering.',
        prognosis:
          'Peluang: < 10%. Tanaman sudah mengalami kerusakan vaskular permanen.',
        recommendedDosage: 'Tidak disarankan disemprot.',
        actionProtocol:
          'Cabut tanaman yang terinfeksi bakteri, bakar di luar kebun, dan taburkan kapur pertanian pada bekas lubang tanam agar tidak menular ke tanaman tetangga.',
      },
    ],
    dosageMatrix: [
      {
        cropOrPhase: 'Cabai & Tomat (Fase Persemaian / Bibit)',
        timing: '7 Hari Sebelum Pindah Tanam',
        dosagePerLiter: '1.0 ml / Liter Air',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 5,
        keyNotes: 'Mempertebal daun semai dan memperbanyak calon serabut akar.',
      },
      {
        cropOrPhase: 'Cabai & Tomat (Vegetatif Mandek 15-35 HST)',
        timing: 'Saat Tanaman Terlihat Kusam / Kuning Mandek',
        dosagePerLiter: '2.0 ml / Liter Air (30 ml / Tangki 16L)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 7,
        keyNotes:
          'Semprot pagi hari saat embun kering. Fokus pada bagian bawah daun di mana stomata terbuka lebar.',
      },
      {
        cropOrPhase: 'Bawang Merah (Fase 10 - 25 HST)',
        timing: 'Mencegah Pucuk Kuning & Merangsang Jumlah Anakan',
        dosagePerLiter: '1.5 - 2.0 ml / Liter Air',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 5,
        keyNotes:
          'Membuat daun bawang kaku tegap hijau royo-royo dan tahan terpaan angin kemarau.',
      },
      {
        cropOrPhase: 'Melon & Semangka (Fase Awal Merambat 14-28 HST)',
        timing: 'Pacu Cabang Utama & Pembentukan Daun Lebar',
        dosagePerLiter: '2.0 ml / Liter Air',
        applicationMethod: 'SOIL_DRENCH',
        intervalDays: 7,
        keyNotes:
          'Kocorkan 200 ml per lubang tanam setelah aplikasi pupuk susulan NPK.',
      },
    ],
    demographics: {
      persona: {
        roleTitle: 'Petani Sayur Komersial Intensif',
        acreageProfile:
          'Lahan 0.25 - 2 Hektar (populasi 4.000 - 35.000 batang cabai/tomat/bawang)',
        primaryCrops: [
          'Cabai Rawit',
          'Cabai Merah Keriting',
          'Bawang Merah',
          'Tomat',
          'Melon',
        ],
        coreFear:
          'Tanaman menguning layu di tengah jalan, modal benih hibrida & mulsa jutaan rupiah hangus, dan gagal panen sebelum musim harga tinggi.',
        coreAspiration:
          'Tanaman kembali hijau segar lebat, tunas samping bermunculan serentak, dan tanaman siap menyangga bunga/buah lebat.',
        awarenessStage: 'SOLUTION_AWARE',
        buyingMotivator:
          'Panic recovery: butuh produk cepat reaksi yang mampu menyelamatkan tanaman dari stres cuaca ekstrem.',
      },
      sentraHubs: [
        {
          province: 'Jawa Tengah',
          regencies: [
            'Brebes',
            'Temanggung',
            'Magelang',
            'Wonosobo',
            'Boyolali',
          ],
          soilAndClimateNote:
            'Sentra cabai, tembakau, dan bawang merah dengan intensitas pemupukan kimia sangat tinggi.',
        },
        {
          province: 'Jawa Timur',
          regencies: ['Kediri', 'Malang', 'Banyuwangi', 'Nganjuk', 'Blitar'],
          soilAndClimateNote:
            'Sentra cabai rawit dan tomat intensif dengan suhu panas kemarau terik El Niño.',
        },
        {
          province: 'Jawa Barat',
          regencies: [
            'Garut',
            'Bandung Barat (Lembang)',
            'Cianjur',
            'Sukabumi',
          ],
          soilAndClimateNote:
            'Dataran tinggi hortikultura sayuran dengan kelembaban fluktuatif.',
        },
        {
          province: 'Sumatera Utara',
          regencies: ['Karo', 'Simalungun', 'Dairi'],
          soilAndClimateNote:
            'Sentra hortikultura dataran tinggi Berastagi yang sering mengalami stres cuaca dingin kabut basah.',
        },
      ],
    },
    commercialPillars: {
      pricingStrategy:
        'Fast Visual ROI: Biaya 1 botol BENSU mengembalikan investasi ribuan batang tanaman cabai bernilai puluhan juta rupiah dalam 5 hari.',
      heroOffers: [
        {
          name: 'Botol Praktis 250 ml (Uji Coba Lahan Sayur)',
          volume: '250 ml',
          priceIdr: 65000,
          targetFarmer:
            'Petani sayur lahan petak 1.000 m2 / kebun polybag pekarangan',
        },
        {
          name: 'Botol Standar 500 ml (Lahan 0.5 Ha)',
          volume: '500 ml',
          priceIdr: 115000,
          targetFarmer:
            'Petani cabai/tomat skala menengah yang butuh 3-4 kali semprot tangki rutin',
        },
        {
          name: 'Jerigen Hemat 1 Liter (Lahan 1-2 Ha Hamparan)',
          volume: '1 Liter',
          priceIdr: 210000,
          targetFarmer:
            'Petani komersial Brebes/Kediri/Malang untuk semprot dan kocor massal',
        },
      ],
      proofAssets: [
        'Foto perbandingan bedengan cabai hari ke-0 (kuning kusam) vs hari ke-5 pasca semprot BENSU (tunas hijau segar menyembul)',
        'Video testimoni petani cabai Kediri yang tanamannya mandek pasca semprot fungisida pekat lalu aktif kembali',
        'Uji rendam akar semai bawang merah: akar putih memanjang 2x lipat dibanding kontrol air biasa dalam 48 jam',
      ],
      objectionHandling: [
        {
          objection:
            'Tanaman saya sudah pakai NPK dan pupuk daun, kenapa masih kuning?',
          rebuttle:
            'Karena saat tanaman stres cuaca panas atau tanah jenuh, akarnya sedang mandek dan stomata daun menutup. Menambah pupuk kimia malah bikin akar terbakar! BENSU memulihkan dulu sel tanaman dan mengaktifkan kembali mulut daun agar pupuk yang sudah ada di tanah bisa diserap normal.',
        },
        {
          objection:
            'Apakah bisa menyembuhkan cabai keriting akibat virus gemini?',
          rebuttle:
            'Virus gemini tidak bisa dibunuh oleh produk apapun. Tapi BENSU memicu tanaman mengeluarkan tunas baru yang segar dan sehat, sehingga tanaman tetap bisa berbunga dan berbuah normal meskipun ada riwayat serangan.',
        },
      ],
      csDecisionTree: [
        {
          farmerSymptomTrigger:
            'Petani mengeluh tanaman cabai umur 25 HST daunnya kaku kuning dan tidak mau tinggi',
          csQuestion:
            'Apakah tanahnya kering terik atau kemarin sempat kena semprot obat hama berdosis tinggi?',
          recommendation:
            'Tanaman mengalami stagnasi fisiologis akibat stres kimia/suhu. Semprotkan BENSU 2 ml/L (30 ml/tangki) di pagi hari, ulangi 5 hari kemudian.',
          suggestedBundle: 'Botol 500 ml untuk 16 tangki semprot.',
        },
        {
          farmerSymptomTrigger:
            'Petani bawang merah lapor pucuk daun menguning kering (pucuk kuning/gajah)',
          csQuestion:
            'Bawang umur berapa hari Pak? Apakah akarnya saat dicabut berwarna putih aktif atau kecokelatan?',
          recommendation:
            'Jika akar kecokelatan, segera semprot BENSU dipadu kocor pangkal bedengan untuk meregenerasi sel perakaran dan mengembalikan klorofil hijau daun.',
          suggestedBundle: 'Jerigen 1 Liter untuk hamparan bawang merah.',
        },
      ],
    },
    climateIntegration: {
      elNino2026Role:
        'Terik matahari ekstrem dan Hari Tanpa Hujan (HTH) panjang pada kemarau 2026 membuat suhu daun melonjak > 38°C dan stomata menutup total. Kandungan prolin dan betain pada BENSU bertindak sebagai tabir pelindung sel tanaman agar tidak dehidrasi dan layu permanen.',
      laNina2027Role:
        'Kemarau basah 2027 membawa genangan air di parit bedengan yang memicu hipoksia (akar kehabisan oksigen) dan daun menguning layu basah. BENSU merevitalisasi serabut akar yang membusuk akibat rendaman air.',
      goldenApplicationWindows:
        'Puncak penjualan: Mei - Agustus 2026 (Musim Gadu Terik El Niño) dan April - Juni 2027 (Kemarau Basah La Niña).',
    },
    metaAdsPlaybook: {
      coreHooks: [
        {
          angleId: 'bensu-hook-01',
          angleName: 'Tanaman Mandek / Panic Restart',
          targetProblem:
            'Cabai dan sayuran mandek tidak mau tumbuh pasca pindah tanam',
          primaryHeadline:
            'Cabai Anda Mandek, Kuning & Susah Keluar Tunas Baru? Pulihkan Sebelum Terlambat!',
          hookQuestion:
            'Sudah dipupuk NPK mahal-mahal tapi tanaman sayur masih kusam dan gak mau ngangkat?',
          bodyCopy:
            'Jangan dipaksa pupuk kimia terus, akarnya bisa gosong terbakar! Tanaman Anda sedang stres cuaca. Cukup semprot BENSU Hortikultura: formula bio-stimulator pemulih sel tanaman yang merangsang akar aktif dan memicu semburan tunas hijau segar dalam hitungan hari.',
          callToAction: 'Beli BENSU Sekarang (Bisa COD)',
          suggestedCreative:
            'Visual perbandingan pot/bedengan cabai: Sebelum (kuning kerdil) vs Sesudah 5 hari (hijau rimbun pucuk baru bermunculan)',
          seasonalFit: 'Subround 2 Musim Gadu Kemarau & Pancaroba',
        },
      ],
      targetingInterests: [
        'Petani cabai',
        'Pertanian hortikultura',
        'Bawang merah Brebes',
        'Budidaya tanaman sayuran',
        'Kediri',
        'Brebes',
        'Garut',
        'Malang',
      ],
      exclusions: ['Usia di bawah 23 tahun'],
    },
    faqs: [
      {
        question:
          'Apakah BENSU bisa dicampur bersamaan dengan fungisida atau insektisida?',
        answer:
          'BISA, untuk sebagian besar insektisida dan fungisida protektif non-tembaga pekat. Hindari mencampur dengan fungisida tembaga pekat (copper sulfate/hydroxide) dalam tangki yang sama agar kelat asam amino tidak mengendap.',
        category: 'COMPATIBILITY',
      },
      {
        question: 'Kapan waktu terbaik menyemprotkan BENSU?',
        answer:
          'Pagi hari antara pukul 06.00 hingga 09.00 saat embun daun mulai kering dan stomata daun sedang membuka lebar untuk menyerap nutrisi.',
        category: 'APPLICATION',
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
      'Strategic Generative Plant Serum Powered by Japanese Pro-Plant Complex™',
    categoryLabel: 'Strategic Plant Serum',
    badgeVariant: 'indigo',
    targetCommodityLabels: [
      'Cabai',
      'Tomat',
      'Melon',
      'Semangka',
      'Bawang Merah',
      'Padi',
      'Alpukat',
    ],
    corePositioning: {
      en: 'Premium Strategic Plant Serum powered by Japanese Pro-Plant Complex™ for Harvest Quality, Density & Grade A Value',
      id: 'Serum tanaman premium berbasis asam amino tinggi dan Japanese Pro-Plant Complex™ untuk fase penting pembungaan, pembuahan, dan pengisian bobot panen',
    },
    coreAngle:
      'Tanaman tidak cukup hanya terlihat hijau. Saat masuk fase bunga dan buah, tanaman butuh serum presisi agar hasil padat, bobot berat, dan berkelas Grade A.',
    internalMantra:
      'Ini serum yang digunakan di fase penting, bukan input rutin harian. Bukan produk komoditas perang harga, ini investasi kualitas hasil panen premium.',
    whatItIs: [
      'Serum tanaman strategis konsentrat tinggi berbasis Asam Amino esensial ±47.5%',
      'Diperkuat teknologi formulasi Japanese Pro-Plant Complex™ (Omega 3, Chitosan, Vitamin B1, Trace Minerals)',
      'Dipakai secara presisi pada fase transisi generatif: pembungaan, pembentukan pentil buah, dan pengisian umbi/bulir',
      'Fokus utama pada kualitas fisik panen: ketebalan daging buah, kepadatan serat, kilau warna, rasa manis (Brix), dan bobot timbangan',
      'Pelindung alami dari kerontokan bunga dan pembusukan buah pasca panen saat penyimpanan logistik',
    ],
    whatItIsNot: [
      'Bukan pupuk dasar atau nutrisi harian murah',
      'Bukan booster instan abal-abal yang membuat buah besar berisi air rapuh',
      'Bukan produk komoditas perang harga murah',
      'Bukan recovery tanaman sawit berjamur (itu peran AUSSIE)',
      'Bukan sekadar asam amino pakan biasa tanpa kelat bioaktif',
    ],
    formulaConcept: 'Japanese Pro-Plant Complex™ Generative Activator',
    brandMechanism:
      'Chitosan-Amino Polymeric Matrix & Boron Chelated Complex — Meningkatkan laju translokasi karbohidrat dari daun bendera ke wadah buah/bulir, memperkuat dinding pektin kulit buah dengan polimer kitosan, dan mencegah abortus bunga saat fluktuasi kelembaban.',
    composition: [
      {
        item: 'Total Asam Amino Bebas Terseleksi',
        value: '47.5%',
        function:
          'Bahan baku primer pembentuk protein enzim pengisian sel buah dan bulir biji',
      },
      {
        item: 'Omega 3 Organik & Karbon Rantai Pendek',
        value: '12.0%',
        function:
          'Mempertebal membran sel pelindung buah agar tidak pecah/retak saat hujan lebat',
      },
      {
        item: 'Chitosan Oligosakarida Alami',
        value: '8.5%',
        function:
          'Memicu fitoaleksin alami kulit buah yang tahan serangan spora jamur patek antraknosa',
      },
      {
        item: 'Vitamin B1 (Tiamin Hidroklorida)',
        value: '3.0%',
        function:
          'Meredam stres respirasi generatif saat suhu malam hari terlalu tinggi',
      },
      {
        item: 'Unsur Mikro Presisi (Boron 0.8%, Zn, Fe kelat)',
        value: '4.5%',
        function:
          'Kunci mutlak keberhasilan penyerbukan benang sari dan translokasi gula buah',
      },
      {
        item: 'pH Larutan Formula Stabil',
        value: '± 4.1',
        function:
          'Tingkat keasaman optimal untuk penyerapan cepat menembus stomata dan kutikula',
      },
    ],
    claimGuardrails: {
      allowedPhrasing: [
        'Membantu mendukung fase pembungaan dan pembentukan pentil buah lebih optimal',
        'Membantu menjaga kepadatan, ketebalan daging buah, dan bobot timbangan panen',
        'Membantu mengurangi risiko rontok bunga dan buah pecah saat cuaca ekstrem',
        'Mendukung hasil panen lebih tahan simpan dan tidak mudah membusuk saat pengiriman',
        'Membantu meningkatkan proporsi hasil panen berkelas Grade A',
      ],
      prohibitedPhrasing: [
        'Menjamin semua bunga pasti 100% jadi buah tanpa ada yang gugur',
        'Membuat buah membesar raksasa seketika dalam semalam',
        'Obat kimia pembasmi lalat buah',
        'Jaminan panen meledak tanpa pemupukan dasar berimbang',
      ],
    },
    severityLevels: [
      {
        stage: 'Level Kritis 1: Inisiasi Bunga (Flower Bud Induction)',
        title: 'Bunga Bermunculan tapi Rawan Rontok Diterpa Hujan/Panas',
        symptoms:
          'Kuntum bunga cabai/tomat/melon mulai keluar, tangkai bunga terlihat rapuh pucat, mahkota bunga menguning gugur sebelum mekar sempurna.',
        prognosis:
          'Peluang Lonjakan Fruit Set: +35% hingga +50% jika diaplikasikan tepat waktu.',
        recommendedDosage:
          '1.0 - 1.5 ml / Liter Air (15 - 25 ml per tangki 16L).',
        actionProtocol:
          'Semprot halus kabut tepat pada kuntum bunga dan daun penyangga pada pagi hari sebelum pukul 09.00. Cukup 1 kali semprot saat awal bunga mekar serempak.',
      },
      {
        stage: 'Level Kritis 2: Pembentukan Pentil Buah (Fruit Setting)',
        title: 'Pentil Buah Terbentuk tapi Gugur Menghitam (Fruit Drop)',
        symptoms:
          'Bakal buah melon/cabai/tomat menguning pada pangkal kelopak lalu rontok berjatuhan di mulsa, buah muda kerdil tidak berkembang.',
        prognosis:
          'Efektivitas Mengunci Pentil Buah: > 80% bertahan hingga masa pembesaran.',
        recommendedDosage: '1.5 ml / Liter Air.',
        actionProtocol:
          'Semprot kabut merata di zona tajuk buah. Kombinasikan dengan pemupukan kalium dan kalsium tanah.',
      },
      {
        stage:
          'Level Kritis 3: Pengisian Bobot & Pemadatan (Fruit Sizing & Bulking)',
        title: 'Pengisian Buah / Umbi / Bulir Padi Fase Akhir',
        symptoms:
          'Buah cabai kurus ringan, umbi bawang tidak padat, bulir padi hampa di bagian bawah malai, buah semangka/melon tidak berbobot.',
        prognosis:
          'Peningkatan Berat Panen (Density Gain): +15% sampai +28% bobot riil per kilogram.',
        recommendedDosage: '1.5 - 2.0 ml / Liter Air.',
        actionProtocol:
          'Semprot 10-14 hari menjelang panen. Asam amino 47.5% dan Chitosan memadat sel daging buah dan mengeraskan kulit buah luar.',
      },
      {
        stage:
          'Level Kritis 4: Ketahanan Simpan Pasca Panen (Post-Harvest Shelf Life)',
        title:
          'Buah Cepat Busuk dan Berair Saat Ditumpuk di Keranjang Logistik',
        symptoms:
          'Cabai cepat lembek berair dalam 2 hari pengiriman ke pasar induk Kramat Jati/Porong, tomat retak pecah saat pengangkutan truk.',
        prognosis: 'Daya Simpan Bertambah 4 - 7 hari lebih awet tanpa keriput.',
        recommendedDosage:
          '1.5 ml / Liter Air diaplikasikan pada 7 hari sebelum petik panen.',
        actionProtocol:
          'Lapisan Chitosan mempertebal dinding pektin kulit sehingga tahan gesekan dan tahan tumpuk di peti kayu/keranjang pedagang.',
      },
    ],
    dosageMatrix: [
      {
        cropOrPhase: 'Cabai & Tomat (Fase Muncul Bunga & Pentil Buah)',
        timing: 'Umur 40, 55, dan 70 HST',
        dosagePerLiter: '1.5 ml / Liter Air (25 ml / Tangki 16L)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 14,
        keyNotes:
          'Mencegah abortus bunga dan memicu pentil buah berukuran seragam lurus berkilau.',
      },
      {
        cropOrPhase: 'Bawang Merah (Fase Pengisian & Pewarnaan Umbi)',
        timing: 'Umur 35 HST dan 48 HST',
        dosagePerLiter: '1.5 ml / Liter Air',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 12,
        keyNotes:
          'Membuat umbi bawang merah berkilau merah menyala, padat keras, dan rendemen susut bobot saat jemur sangat kecil.',
      },
      {
        cropOrPhase: 'Melon & Semangka (Fase Pembesaran Buah & Netting)',
        timing: 'Umur 45 HST dan 60 HST',
        dosagePerLiter: '1.5 - 2.0 ml / Liter Air',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 14,
        keyNotes:
          'Menaikkan brix kemanisan 1.5 - 2.0 derajat Brix dan mencegah buah pecah kulit saat hujan mendadak.',
      },
      {
        cropOrPhase: 'Padi Sawah (Fase Bunting & Pengisian Bulir)',
        timing: 'Fase Bunting (45-50 HST) & Malai Keluar 70% (65-70 HST)',
        dosagePerLiter: '1.5 ml / Liter Air (25 ml / Tangki 16L)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 15,
        keyNotes:
          'Mengisi gabah penuh montok bernas hingga pangkal tangkai malai, menekan persentase gabah hampa di bawah 5%.',
      },
    ],
    demographics: {
      persona: {
        roleTitle: 'Petani Komersial Berorientasi Grade A & Pedagang Pengumpul',
        acreageProfile:
          'Lahan hortikultura 0.5 - 5 Hektar atau sawah padi produktif 1 - 10 Hektar',
        primaryCrops: [
          'Melon Golden / Action',
          'Cabai Merah Keriting',
          'Bawang Merah Super',
          'Semangka Non-Biji',
          'Padi Beras Premium',
        ],
        coreFear:
          'Hasil panen masuk sortiran Grade B atau C karena ukuran kecil, kulit buram, atau buah cepat membusuk sehingga dihargai murah oleh tengkulak.',
        coreAspiration:
          'Mendominasi sortiran Grade A dengan harga jual tertinggi di pasar lelang, bobot timbangan berat, dan pedagang berebut membeli hasil kebunnya.',
        awarenessStage: 'PRODUCT_AWARE',
        buyingMotivator:
          'Ambition & Pride of Harvest Quality: Petani bangga saat hasil panennya dipuji pedagang dan menghasilkan margin keuntungan maksimal.',
      },
      sentraHubs: [
        {
          province: 'Jawa Timur',
          regencies: ['Banyuwangi', 'Nganjuk', 'Kediri', 'Ngawi', 'Jember'],
          soilAndClimateNote:
            'Sentra melon, semangka, bawang merah, dan lumbung padi dengan orientasi pasar modern dan lelang.',
        },
        {
          province: 'Jawa Tengah',
          regencies: ['Brebes', 'Demak', 'Klaten', 'Sragen', 'Kudus'],
          soilAndClimateNote:
            'Sentra bawang merah super dan padi sawah dengan persaingan kualitas gabah tinggi.',
        },
        {
          province: 'Jawa Barat',
          regencies: ['Indramayu', 'Karawang', 'Subang', 'Majalengka'],
          soilAndClimateNote:
            'Lumbung padi Pantura dan sentra horti mangga/sayur berorientasi pasokan Jabodetabek.',
        },
        {
          province: 'Nusa Tenggara Barat',
          regencies: ['Lombok Timur', 'Sumbawa'],
          soilAndClimateNote:
            'Sentra bawang merah dan jagung bernilai ekonomi tinggi dengan intensitas radiasi matahari prima.',
        },
      ],
    },
    commercialPillars: {
      pricingStrategy:
        'Premium Investment Framing: Peningkatan bobot 15% pada 10 ton panen melon/cabai bernilai tambahan omset jutaan rupiah, berkali-kali lipat dari harga 1 botol Saratoga.',
      heroOffers: [
        {
          name: 'Saratoga Serum 250 ml (Fase Kritis Bunga Horti)',
          volume: '250 ml',
          priceIdr: 95000,
          targetFarmer:
            'Petani melon/cabai 1.500 pohon untuk 10 tangki semprot fase pembungaan',
        },
        {
          name: 'Saratoga Serum 500 ml (Fase Bunga & Pengisian Buah)',
          volume: '500 ml',
          priceIdr: 175000,
          targetFarmer:
            'Petani horti 0.5 Ha untuk 20 tangki semprot pengisian bobot maksimal',
        },
        {
          name: 'Saratoga Serum 1 Liter (Paket Panen Raya Hamparan)',
          volume: '1 Liter',
          priceIdr: 325000,
          targetFarmer:
            'Petani bawang merah/padi 1-2 Ha untuk jaminan Grade A dan bobot timbangan berlebih',
        },
      ],
      proofAssets: [
        'Uji Refraktometer Brix: Buah melon semprot Saratoga mencapai 13.8° Brix vs Kontrol 11.5° Brix',
        'Foto timbangan digital: 10 butir cabai rawit Saratoga berbobot 38 gram vs kontrol 31 gram (unggul +22.5% bobot riil)',
        'Uji simpan keranjang: Cabai Saratoga tetap mulus segar di hari ke-9 penyimpanan suhu ruang vs kontrol busuk basah berair di hari ke-4',
      ],
      objectionHandling: [
        {
          objection:
            'Apakah Saratoga sama dengan asam amino pakan ternak atau asam amino murah lainnya?',
          rebuttle:
            'Sangat berbeda. Asam amino curah biasa tidak memiliki formulasi Japanese Pro-Plant Complex™ yang memadukan Omega 3, Chitosan, dan Boron terkelat dengan pH asam stabil 4.1. Saratoga didesain khusus agar molekulnya langsung menembus jaringan kutikula buah tanpa merusak stomata.',
        },
        {
          objection:
            'Tanaman saya sudah lebat buahnya, apakah masih perlu Saratoga?',
          rebuttle:
            'Justru di saat buah banyak, tanaman paling butuh Saratoga! Tanaman sering kehabisan energi saat menyuplai puluhan buah sekaligus sehingga buah atas kerdil dan mudah rontok. Saratoga mengunci semua pentil buah agar membesar rata dan padat sampai petik terakhir.',
        },
      ],
      csDecisionTree: [
        {
          farmerSymptomTrigger:
            'Petani lapor bunga cabai/tomat mulai mekar dan takut rontok',
          csQuestion:
            'Berapa persen bunga yang sudah mekar Pak? Apakah di daerah Bapak sedang sering turun hujan mendadak?',
          recommendation:
            'Segera aplikasikan Saratoga dengan dosis 1.5 ml/Liter air (25 ml per tangki 16L). Kombinasi Boron dan Asam Amino 47.5% akan mengikat tangkai bunga dan memastikan penyerbukan sempurna jadi pentil buah.',
          suggestedBundle:
            'Botol 500 ml (untuk 20 tangki semprot bunga & buah).',
        },
        {
          farmerSymptomTrigger:
            'Petani padi umur 50 HST mau masuk fase bunting',
          csQuestion:
            'Apakah varietas padinya Inpari 32, Ciherang, atau beras wangi Pak? Mau target rendemen gabah bernas?',
          recommendation:
            'Semprotkan Saratoga saat bunting tua (45-50 HST) dan ulangi saat malai merunduk 70% (65 HST). Bulir padi akan terisi padat mengkilap sampai ke bulir paling pangkal.',
          suggestedBundle: 'Jerigen 1 Liter untuk lahan padi 1-1.5 Hektar.',
        },
      ],
    },
    climateIntegration: {
      elNino2026Role:
        'Di tengah El Niño terik kemarau 2026, respirasi tanaman di malam hari melonjak tinggi membakar cadangan gula buah. Saratoga memasok asam amino bebas siap pakai dan vitamin B1 sehingga tanaman tidak kelelahan dan buah tidak rontok.',
      laNina2027Role:
        'Saat kemarau basah La Niña 2027 dengan curah hujan tinggi, dinding sel buah rentan pecah (*fruit splitting*) dan terinfeksi jamur antraknosa patek. Polimer Chitosan dan Omega 3 pada Saratoga mempertebal lapisan kutikula buah sehingga air hujan tidak merobek kulit buah.',
      goldenApplicationWindows:
        'Puncak momentum: Januari-April 2027 (Padi Rendeng & Panen Raya) dan Mei-Agustus 2027 (Hortikultura Kemarau Basah).',
    },
    metaAdsPlaybook: {
      coreHooks: [
        {
          angleId: 'saratoga-hook-01',
          angleName: 'Grade A Pride / Kualitas Bobot Panen',
          targetProblem:
            'Buah cabai/tomat/melon berbobot ringan dan masuk sortiran murah',
          primaryHeadline:
            'Ingin Hasil Panen Borongan Masuk Grade A & Timbangan Berbobot Padat? Ini Kuncinya!',
          hookQuestion:
            'Pernah kecewa saat timbangan panen jeblok karena buah kopong dan cepat lembek di pasar?',
          bodyCopy:
            'Tanaman subur daun hijau belum tentu buahnya berbobot! Di fase bunga dan pengisian buah, berikan Saratoga Plant Serum: formula premium Japanese Pro-Plant Complex™ dengan Asam Amino ±47.5% + Chitosan + Omega 3. Mengunci bunga jadi pentil buah, mempertebal daging buah, menaikkan kadar manis brix, dan bikin hasil panen tahan simpan berhari-hari.',
          callToAction: 'Pesan Saratoga Serum Grade A Sekarang',
          suggestedCreative:
            'Foto close-up cabai merah keriting padat berkilau di atas timbangan digital dengan angka bobot spektakuler',
          seasonalFit: 'Sepanjang Musim Pembungaan & Pengisian Buah',
        },
      ],
      targetingInterests: [
        'Pertanian melon',
        'Budidaya cabai merah',
        'Bawang merah super',
        'Padi sawah',
        'Banyuwangi',
        'Nganjuk',
        'Demak',
        'Indramayu',
      ],
      exclusions: ['Usia di bawah 25 tahun'],
    },
    faqs: [
      {
        question:
          'Apakah Saratoga bisa dicampur dengan pupuk kalsium atau kalium nitrat?',
        answer:
          'SANGAT BISA DAN DIANJURKAN. Saratoga bersinergi kuat dengan pupuk kalsium bebas boron dan kalium sulfat (KNO3/ZK), menghasilkan pembesaran buah dengan struktur dinding sel yang luar biasa kokoh.',
        category: 'COMPATIBILITY',
      },
      {
        question:
          'Berapa kali pemakaian Saratoga yang ideal dalam satu musim tanam?',
        answer:
          'Untuk tanaman hortikultura semusim (cabai, tomat, melon), cukup 3 hingga 4 kali aplikasi pada fase kritis: (1) Muncul bunga pertama, (2) Pembentukan pentil buah, (3) Pembesaran buah, dan (4) 10 hari menjelang petik panen.',
        category: 'APPLICATION',
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
      'Crop Performance Activator & Stability Support System untuk Pangan Massal',
    categoryLabel: 'Crop Stability & Yield Support System',
    badgeVariant: 'emerald',
    targetCommodityLabels: [
      'Jagung',
      'Padi',
      'Kedelai',
      'Kacang Tanah',
      'Singkong',
    ],
    corePositioning: {
      en: 'Crop Stability & Yield Support System for Mass Field Crops (Corn, Rice, Grain Legumes)',
      id: 'Stimulator pendukung kestabilan dan pertumbuhan tanaman pangan untuk membantu tanaman tetap aktif, kokoh, dan siap berproduksi tinggi di hamparan luas',
    },
    coreAngle:
      'Tanaman pangan harus stabil dari awal sampai panen. Jagung yang tidak stabil dari awal, hasil akhirnya ikut anjlok. Amankan kestabilan tumbuh sebelum terlambat.',
    internalMantra:
      'KOJIEN bukan recovery jamur ekstrem seperti BENSU, dan bukan serum generatif mahal seperti Saratoga. KOJIEN adalah pelindung stabilitas pertumbuhan jagung dan padi hamparan agar kokoh, rata, tahan stres, dan hasil per hektar terkunci aman.',
    whatItIs: [
      'Crop performance activator khusus tanaman pangan hamparan luas (Jagung Hibrida, Padi Sawah, Palawija)',
      'Stabilizer pertumbuhan vegetatif agar tegakan tanaman serempak rata tanpa ada yang kerdil tertinggal',
      'Penguat batang dan perakaran jangkar penahan rebah angin kencang monsun',
      'Peningkat kekebalan sistemik tanaman (SAR) terhadap ancaman penyakit bulai jagung dan blas padi',
      'Pendorong pengisian biji tongkol jagung penuh sampai ke pucuk (*tip filling*)',
    ],
    whatItIsNot: [
      'Bukan fungisida racun kimia tunggal pembunuh jamur bulai',
      'Bukan racun insektisida pembasmi ulat FAW grayak jagung',
      'Bukan pupuk dasar pengganti subsidi Urea dan NPK Phonska',
      'Bukan serum buah hortikultura premium (itu peran Saratoga)',
      'Bukan produk sekali pakai instan tanpa rawatan dasar',
    ],
    formulaConcept: 'Crop Stability & Yield Locking Matrix',
    brandMechanism:
      'Bio-Silica Induction & Phytoalexin Elicitor — Menginduksi akumulasi silika amorf pada jaringan epidermis batang agar tegak tahan rebah, merangsang sintesis fitoaleksin pelawan infeksi jamur bulai (Peronosclerospora), dan memaksimalkan translokasi hara ke tongkol dan malai.',
    composition: [
      {
        item: 'Silika Bioaktif Bio-Available (SiO2 Terkelat)',
        value: '18.0%',
        function:
          'Memperkeras dinding sel batang dan daun, menciptakan perisai fisik penahan penetrasi spora bulai dan gigitan hama',
      },
      {
        item: 'Bio-Aktivator Fitoaleksin Elicitor',
        value: '12.5%',
        function:
          'Mengaktifkan kekebalan alami tanaman pangan (SAR) sebelum serangan patogen merajalela',
      },
      {
        item: 'Kompleks Kalium & Seng Organik (K-Zn Chelate)',
        value: '14.0%',
        function:
          'Kunci pembentukan tongkol jagung besar padat dan pengisian biji sampai ke pucuk tanpa ompong',
      },
      {
        item: 'Asam Amino Vegetatif Spesifik Serealia',
        value: '16.5%',
        function:
          'Memicu pembentukan klorofil daun lebar tebal dan memperbanyak anakan produktif padi',
      },
      {
        item: 'Sticker & Deposition Aid Ramah Lingkungan',
        value: 'q.s to 100%',
        function:
          'Mencegah larutan tercuci hujan saat aplikasi di hamparan lahan terbuka',
      },
    ],
    claimGuardrails: {
      allowedPhrasing: [
        'Membantu menjaga pertumbuhan jagung dan padi tetap rata, kokoh, dan stabil',
        'Membantu memperkuat batang tanaman pangan agar tidak mudah roboh diterpa angin',
        'Mendukung ketahanan tanaman menghadapi ancaman bulai dan stres cuaca',
        'Membantu pengisian biji tongkol jagung lebih penuh dan padat sampai ke ujung',
        'Mendukung kestabilan hasil panen per hektar agar tidak anjlok',
      ],
      prohibitedPhrasing: [
        'Obat 100% pembunuh bulai jagung stadium parah',
        'Menjamin tidak akan ada batang jagung yang rebah oleh badai',
        'Menggantikan seluruh kebutuhan pupuk Urea dan NPK subsidi',
        'Pupuk kimia pembesar tongkol raksasa instan',
      ],
    },
    severityLevels: [
      {
        stage:
          'Fase Kritis 1: Vegetatif Awal Jagung (V2 - V4 / Umur 10-18 HST)',
        title: 'Ancaman Bulai Daun (Downy Mildew) & Pertumbuhan Belang',
        symptoms:
          'Daun muda bergaris putih klorotik memanjang, tanaman kerdil tertinggal dari barisan lain, spora putih seperti tepung di balik daun.',
        prognosis:
          'Peluang Proteksi Hamparan: 85% - 92% tanaman sekitar terproteksi dari penularan spora.',
        recommendedDosage: '2.0 ml / Liter Air (30 ml per tangki 16L).',
        actionProtocol:
          'Semprot merata di seluruh permukaan daun jagung pada pagi hari. Tanaman yang sudah terlanjur putih kerdil dicabut, lalu semprot KOJIEN pada barisan tanaman sehat di sekelilingnya.',
      },
      {
        stage:
          'Fase Kritis 2: Pembentukan Tongkol & Batang Kokoh (V6 - V8 / Umur 30-40 HST)',
        title: 'Batang Ramping Mudah Rebah & Calon Tongkol Mini',
        symptoms:
          'Ruas batang jagung tipis memanjang lemah, daun pucat karena kekeringan air terik kemarau, calon tongkol lambat mengembang.',
        prognosis:
          'Penguatan Batang Tahan Rebah: Meningkatkan kekuatan mekanis batang hingga +40%.',
        recommendedDosage: '2.5 ml / Liter Air (40 ml per tangki 16L).',
        actionProtocol:
          'Semprot kabut basah mengarah ke batang bawah dan perakaran jangkar. Silika bioaktif akan terserap mengokohkan lingkar batang.',
      },
      {
        stage:
          'Fase Kritis 3: Pengisian Biji Tongkol (R1 - R3 / Umur 55-70 HST)',
        title: 'Ujung Tongkol Jagung Ompong (Tip Blanks / Unfilled Ears)',
        symptoms:
          'Tongkol jagung hanya terisi setengah atau 3/4 panjang tongkol, ujung tongkol tidak berbiji, bobot pipilan kering KA 14% rendah.',
        prognosis:
          'Pengisian Biji Sempurna (*Full Tip Fill*): Mengisi 95-98% panjang tongkol.',
        recommendedDosage: '2.0 ml / Liter Air.',
        actionProtocol:
          'Aplikasi saat rambut tongkol mulai keluar cokelat. Kalium-Seng terkelat mendorong translokasi pati hingga ke butir ujung paling puncak.',
      },
      {
        stage: 'Fase Padi: Anakan Produktif Maksimum (Umur 15-25 HST)',
        title: 'Jumlah Anakan Padi Kurang (< 15 batang per rumpun)',
        symptoms:
          'Rumpun padi kurus jarang, anakan lambat keluar akibat cuaca kemarau dingin atau tanah kekurangan serapan hara aktif.',
        prognosis:
          'Peningkatan Anakan Produktif: Menjadi 25 - 32 anakan bernas per rumpun.',
        recommendedDosage: '2.0 ml / Liter Air.',
        actionProtocol:
          'Semprot saat sawah dalam kondisi macak-macak (irigasi AWD). Anakan samping akan serempak bertunas kuat.',
      },
    ],
    dosageMatrix: [
      {
        cropOrPhase: 'Jagung Hibrida (Aplikasi 1: Umur 15 - 20 HST)',
        timing: 'Fase Vegetatif Awal V4 - V6',
        dosagePerLiter: '2.0 ml / Liter Air (30 ml / Tangki 16L)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 14,
        keyNotes:
          'Mencegah bulai daun dini, merangsang akar jangkar kokoh, dan memastikan tegakan tanaman tumbuh rata.',
      },
      {
        cropOrPhase: 'Jagung Hibrida (Aplikasi 2: Umur 35 - 45 HST)',
        timing: 'Fase Menjelang Muncul Malai Jantan (VT)',
        dosagePerLiter: '2.5 ml / Liter Air (40 ml / Tangki 16L)',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 14,
        keyNotes:
          'Mempertebal lingkar batang penahan roboh dan membesarkan ukuran kelobot calon tongkol.',
      },
      {
        cropOrPhase: 'Padi Sawah (Aplikasi 1: Umur 14 - 21 HST)',
        timing: 'Fase Awal Pembentukan Anakan Aktif',
        dosagePerLiter: '2.0 ml / Liter Air',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 14,
        keyNotes:
          'Merangsang keluarnya anakan produktif seragam dan memperkokoh perakaran di tanah lumpur.',
      },
      {
        cropOrPhase: 'Padi Sawah (Aplikasi 2: Umur 40 - 45 HST)',
        timing: 'Fase Primordia / Menjelang Bunting Muda',
        dosagePerLiter: '2.0 ml / Liter Air',
        applicationMethod: 'FOLIAR_SPRAY',
        intervalDays: 15,
        keyNotes:
          'Menyiapkan cadangan pati batang yang kokoh agar tidak rebah saat malai gabah mulai menguning berat.',
      },
    ],
    demographics: {
      persona: {
        roleTitle: 'Petani Jagung & Padi Hamparan Luas',
        acreageProfile:
          'Lahan pangan 1 - 10 Hektar hamparan (tadah hujan maupun irigasi teknis)',
        primaryCrops: [
          'Jagung Hibrida (NK, Pioneer, Dekalb, Advanta)',
          'Padi Sawah (Inpari, Ciherang)',
          'Kedelai',
        ],
        coreFear:
          'Jagung terserang bulai putih kerdil, tanaman rebah roboh disapu angin kencang, tongkol ompong kecil, dan modal benih hibrida/pupuk tidak balik modal.',
        coreAspiration:
          'Tegakan jagung rata tinggi hijau pekat bak pagar besi, tongkol besar terisi penuh sampai ujung, dan panen pipil tembus > 9-10 ton per hektar.',
        awarenessStage: 'PROBLEM_AWARE',
        buyingMotivator:
          'Yield Stability & Crop Insurance: Petani tidak mau spekulasi pada lahan hektaran; mereka butuh jaminan kestabilan pertumbuhan.',
      },
      sentraHubs: [
        {
          province: 'Jawa Timur',
          regencies: ['Tuban', 'Lamongan', 'Bojonegoro', 'Jombang', 'Pasuruan'],
          soilAndClimateNote:
            'Sentra jagung terbesar di Jawa dengan areal tadah hujan dan tegalan yang sangat luas.',
        },
        {
          province: 'Jawa Tengah',
          regencies: ['Grobogan', 'Blora', 'Wonogiri', 'Kendal'],
          soilAndClimateNote:
            'Lumbung jagung dan kedelai dengan tingkat kerentanan bulai tinggi di awal musim tanam.',
        },
        {
          province: 'Lampung',
          regencies: ['Lampung Tengah', 'Lampung Timur', 'Lampung Selatan'],
          soilAndClimateNote:
            'Sentra jagung pasokan industri pakan ternak nasional dengan hamparan tanah podsolik merah kuning.',
        },
        {
          province: 'Sulawesi Selatan',
          regencies: ['Bone', 'Takalar', 'Gowa', 'Wajo'],
          soilAndClimateNote:
            'Sentra produksi jagung dan beras andalan Indonesia Timur.',
        },
        {
          province: 'Nusa Tenggara Barat',
          regencies: ['Dompu', 'Bima', 'Sumbawa'],
          soilAndClimateNote:
            'Areal jagung lereng bukit dengan terpaan angin monsun kencang dan kebutuhan penguat batang tinggi.',
        },
      ],
    },
    commercialPillars: {
      pricingStrategy:
        'Scale-Economies Mass Protection: Harga terjangkau per hektar yang mudah masuk ke dalam perhitungan modal kerja petani pangan hamparan.',
      heroOffers: [
        {
          name: 'Botol 500 ml (Lahan Jagung 0.5 Ha)',
          volume: '500 ml',
          priceIdr: 75000,
          targetFarmer:
            'Petani jagung skala kecil untuk 2 kali aplikasi semprot 10-12 tangki',
        },
        {
          name: 'Jerigen 1 Liter (Lahan Hamparan 1 Ha)',
          volume: '1 Liter',
          priceIdr: 135000,
          targetFarmer:
            'Petani jagung dan padi hamparan 1 hektar untuk proteksi penuh umur 15 & 35 HST',
        },
        {
          name: 'Paket Hamparan 5 Liter (Lahan Poktan 4-5 Ha)',
          volume: '5 Liter Jerigen',
          priceIdr: 625000,
          targetFarmer:
            'Ketua kelompok tani (Gapoktan) dan juragan jagung untuk blok areal terintegrasi',
        },
      ],
      proofAssets: [
        'Foto hamparan jagung semprot KOJIEN: tinggi tanaman rata lurus hijau gelap tanpa bercak bulai vs lahan tetangga belang kerdil',
        'Foto kupasan kelobot jagung: Biji tongkol tersusun rapi penuh kuning mengkilap hingga ujung kelobot paling runcing',
        'Video wawancara petani Tuban & Grobogan tentang ketahanan jagung diterpa angin kencang tanpa rebah roboh',
      ],
      objectionHandling: [
        {
          objection:
            'Apakah benih jagung hibrida saya yang sudah ada perlakuan benih masih butuh KOJIEN?',
          rebuttle:
            'Pestisida perlakuan benih (*seed treatment*) hanya melindungi benih sampai umur 10-12 HST. Setelah itu, perlindungannya habis! KOJIEN diaplikasikan di umur 15-20 HST untuk memperkuat sistem kekebalan tanaman sendiri dari dalam dan merangsang akar jangkar batang.',
        },
        {
          objection:
            'Jagung saya sudah dipupuk Urea banyak, kenapa batangnya masih gampang patah?',
          rebuttle:
            'Urea (Nitrogen) yang terlalu banyak justru membuat dinding sel tanaman berair dan lembek sehingga empuk dimakan ulat dan gampang patah diterpa angin. KOJIEN memasok silika bioaktif dan kalium terkelat untuk mengeraskan batang seperti bambu kokoh.',
        },
      ],
      csDecisionTree: [
        {
          farmerSymptomTrigger:
            'Petani jagung umur 18 HST lapor ada 2-3 pohon daunnya mulai bergaris putih kerdil',
          csQuestion:
            'Apakah putihnya bertepung di bawah daun Pak? Berapa baris tanaman jagung yang sudah ditanam?',
          recommendation:
            'Itu gejala awal bulai jamur! Cabut segera tanaman yang sudah putih kerdil agar sporanya tidak terbang ditiup angin, lalu semprot seluruh hamparan dengan KOJIEN 2 ml/L (30 ml/tangki) untuk mengaktifkan kekebalan tanaman sehat sekitarnya.',
          suggestedBundle: 'Jerigen 1 Liter untuk hamparan 1 Hektar.',
        },
        {
          farmerSymptomTrigger:
            'Petani jagung umur 35 HST mengeluh tanaman kurus dan takut tongkolnya kecil',
          csQuestion:
            'Kapan jadwal pupuk susulan kedua Pak? Apakah tanah sering kekeringan?',
          recommendation:
            'Semprotkan KOJIEN 2.5 ml/L sekarang sebelum malai jantan keluar. Kandungan Kalium-Seng dan Silika akan memperbesar diameter batang dan memicu pembentukan tongkol ganda besar terisi penuh.',
          suggestedBundle: 'Jerigen 1 Liter atau Paket 5 Liter.',
        },
      ],
    },
    climateIntegration: {
      elNino2026Role:
        'Kemarau panjang El Niño 2026 membuat tanaman jagung musim gadu mengalami kekeringan xilem dan stomata mengkerut. Silika bioaktif pada KOJIEN membentuk lapisan kutikula ganda yang mengurangi penguapan transpirasi air hingga 30%, menjaga jagung tetap tegak segar.',
      laNina2027Role:
        'Kemarau basah 2027 memicu kelembaban tanah tinggi yang sangat disukai jamur bulai (*Peronosclerospora*) dan rebah akar akibat tanah gembur lembek. KOJIEN memperkokoh perakaran jangkar dan memicu fitoaleksin penolak spora jamur.',
      goldenApplicationWindows:
        'Puncak perputaran omset: Oktober - Desember 2026 (Musim Tanam 1 Padi/Jagung) dan April - Juni 2027 (Musim Tanam Gadu Palawija).',
    },
    metaAdsPlaybook: {
      coreHooks: [
        {
          angleId: 'kojien-hook-01',
          angleName: 'Anti-Bulai & Tegakan Rata Jagung',
          targetProblem:
            'Jagung kerdil, bulai putih, dan pertumbuhan tidak rata',
          primaryHeadline:
            'Jagung Belang, Kerdil & Mulai Ada Gejala Bulai? Amankan Hamparan Anda Sebelum Terlambat!',
          hookQuestion:
            'Takut modal benih hibrida jutaan rupiah amblas gara-gara bulai dan batang kurus gampang roboh?',
          bodyCopy:
            'Jangan tunggu satu petak putih semua! KOJIEN Activator mengaktifkan kekebalan alami tanaman jagung, memperkokoh batang dengan silika bioaktif, dan mengunci pertumbuhan vegetatif rata sejak umur 15 HST. Hasilnya? Tanaman tegap kokoh, bebas bulai, dan tongkol terisi penuh sampai pucuk!',
          callToAction: 'Pesan KOJIEN Pelindung Jagung Sekarang',
          suggestedCreative:
            'Visual perbandingan hamparan: Kiri (jagung kurus belang terserang bulai) vs Kanan (jagung KOJIEN hijau pekat rata rapat)',
          seasonalFit: 'Oktober - Desember (Awal Musim Hujan Rendeng)',
        },
      ],
      targetingInterests: [
        'Petani jagung',
        'Budidaya jagung hibrida',
        'Pioneer Seeds',
        'Petani padi',
        'Tuban',
        'Lampung Tengah',
        'Grobogan',
        'Bima',
      ],
      exclusions: ['Usia di bawah 25 tahun'],
    },
    faqs: [
      {
        question:
          'Apakah KOJIEN bisa disemprotkan bersamaan dengan pupuk Urea cair atau NPK kocor?',
        answer:
          'BISA. KOJIEN sangat sinergis bila dicampurkan dengan larutan pupuk makro kocor. Silika dan seng terkelat akan mengawal penyerapan nitrogen agar batang tidak lemas.',
        category: 'COMPATIBILITY',
      },
      {
        question: 'Apakah aman digunakan untuk tanaman padi sawah?',
        answer:
          'Sangat aman dan sangat dianjurkan. Pada padi, KOJIEN memperbanyak anakan produktif menjadi 25-30 anakan per rumpun dan mengeraskan batang padi agar tidak mudah rebah saat musim hujan lebat.',
        category: 'APPLICATION',
      },
    ],
  },
]

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
      Sentra: Riau, Sumut, Sumsel, Kalbar, Kalteng, Malaysia
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
