/**
 * BMKG & KATAM Agro-Climatic Intelligence Dataset
 *
 * Sources & Methodological Standards:
 * - Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) - Basis ZOM9120 (Normal 1991-2020)
 * - Sistem Informasi Kalender Tanam Terpadu (SI Katam Terpadu) - Kementerian Pertanian / BSIP
 * - Oceanic Nino Index (ONI) & Nino 3.4 Sea Surface Temperature Anomalies
 * - Indian Ocean Dipole (IOD) Dipole Mode Index (DMI)
 * - Multi-Model Ensemble Climate Projections (BMKG, IRI Columbia, NOAA CPC, BoM Australia)
 */

export type ENSOStatus =
  | 'EL_NINO_KUAT'
  | 'EL_NINO_MODERAT'
  | 'NETRAL'
  | 'LA_NINA_LEMAH'
  | 'LA_NINA_MODERAT'
export type IODStatus = 'POSITIF' | 'NETRAL' | 'NEGATIF'
export type ClimateImpactRisk = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export interface ClimateTelemetry {
  reference_normal: string
  total_zom: number
  enso_nino34_anomaly_celsius: number
  enso_status: ENSOStatus
  enso_label: string
  iod_dmi_anomaly_celsius: number
  iod_status: IODStatus
  iod_label: string
  monsoon_phase: string
  monsoon_description: string
  delayed_rainy_season_zom_pct: number
  normal_rainy_season_zom_pct: number
  advanced_rainy_season_zom_pct: number
  peak_dry_season_window: string
  peak_rainy_season_window: string
  katam_sync_status: 'SYNCED_VERIFIED' | 'ADVISORY_ISSUED'
  last_updated: string
}

export interface RainfallOnsetDistribution {
  month: string
  zom_count: number
  pct_of_total_zom: number
  dominant_regions: string
  agronomic_advisory: string
}

export interface ENSOProbabilityItem {
  period: string
  el_nino_prob_pct: number
  neutral_prob_pct: number
  la_nina_prob_pct: number
  consensus_label: string
}

export interface RegionalCorridorClimate {
  id: string
  name: string
  provinces_covered: string[]
  zom_count: number
  current_2026_status: {
    rain_onset_delay_dasarian: number
    dry_season_severity: 'RINGAN' | 'SEDANG' | 'BERAT' | 'EKSTREM'
    max_consecutive_dry_days: number
    water_reservoir_capacity_pct: number
    key_threat: string
    field_actions: string[]
  }
  projected_2027_outlook: {
    enso_transition: string
    rainy_season_character: 'NORMAL' | 'ATAS_NORMAL (BASAH)' | 'BAWAH_NORMAL'
    flood_inundation_risk: ClimateImpactRisk
    disease_outbreak_risk: ClimateImpactRisk
    agronomic_opportunity: string
    fertilizer_procurement_advice: string
  }
}

export interface CommodityClimateProfile {
  id: string
  name: string
  sector: string
  optimal_temperature_celsius: string
  annual_water_requirement_mm: string
  drought_tolerance_days: number
  flood_tolerance_days: number
  current_2026_el_nino: {
    vulnerability_score: number // 1 - 10
    vulnerability_level: ClimateImpactRisk
    yield_impact_pct: number // e.g. -6.4%
    planting_shift_days: number // e.g. +35 days
    primary_biotic_threats: string[]
    immediate_field_mitigation: string
    recommended_varieties_or_inputs: string[]
  }
  projected_2027_outlook: {
    recovery_potential: 'TINGGI' | 'MODERAT' | 'TERBATAS'
    projected_yield_growth_pct: number
    wet_season_threats: string[]
    recommended_proactive_procurement: string[]
    golden_window_adjustment: string
  }
}

export interface KatamProtocol {
  protocol_id: string
  title: string
  target_ecosystem: string
  urgency: 'DARURAT_EL_NINO' | 'PROAKTIF_2027' | 'RUTIN'
  summary: string
  steps: string[]
  recommended_inputs: string[]
  target_crops: string[]
}

// -------------------------------------------------------------
// DATA CONSTANTS
// -------------------------------------------------------------

export const BMKG_TELEMETRY_2026: ClimateTelemetry = {
  reference_normal: 'ZOM9120 (Normal Klimatologi BMKG 1991–2020)',
  total_zom: 699,
  enso_nino34_anomaly_celsius: 1.68,
  enso_status: 'EL_NINO_KUAT',
  enso_label: 'El Niño Kuat Aktif (+1.68°C)',
  iod_dmi_anomaly_celsius: 0.76,
  iod_status: 'POSITIF',
  iod_label: 'IOD Positif (+0.76°C) — Memperkuat Pengeringan Udara',
  monsoon_phase: 'Monsun Australia Dominan (Timuran Kering)',
  monsoon_description:
    'Arus angin dari Benua Australia menahan pergerakan uap air ekuatorial. Onset Monsun Asia (Baratan Basah) mengalami kemunduran ke akhir November 2026.',
  delayed_rainy_season_zom_pct: 61.08,
  normal_rainy_season_zom_pct: 24.72,
  advanced_rainy_season_zom_pct: 14.2,
  peak_dry_season_window: 'Juli – September 2026',
  peak_rainy_season_window: 'Januari – Februari 2027',
  katam_sync_status: 'SYNCED_VERIFIED',
  last_updated: '24 September 2026 (Analisis Dasarian III)',
}

export const RAINFALL_ONSET_DISTRIBUTION_2026: RainfallOnsetDistribution[] = [
  {
    month: 'September 2026',
    zom_count: 59,
    pct_of_total_zom: 8.44,
    dominant_regions:
      'Sumatera Utara bagian barat, Aceh barat, Papua pegunungan tengah',
    agronomic_advisory:
      'Mulai olah tanah MT 1 untuk varietas padi sawah irigasi pegunungan; pasok pupuk dasar NPK.',
  },
  {
    month: 'Oktober 2026',
    zom_count: 127,
    pct_of_total_zom: 18.17,
    dominant_regions:
      'Sumatera Barat, Jambi barat, Riau daratan, Kalbar, Kalteng utara',
    agronomic_advisory:
      'Penyemaian padi basah & penanaman benih kelapa sawit di pembibitan utama.',
  },
  {
    month: 'November 2026',
    zom_count: 172,
    pct_of_total_zom: 24.61,
    dominant_regions:
      'Sebagian besar Jawa Barat, Jawa Tengah bagian utara & tengah, Kalsel, Sulsel barat',
    agronomic_advisory:
      'Puncak tanam serempak MT 1 rendeng yang mundur 2-3 dasarian. Terapkan pemupukan berimbang & perlakuan benih fungisida.',
  },
  {
    month: 'Desember 2026',
    zom_count: 121,
    pct_of_total_zom: 17.31,
    dominant_regions:
      'Jawa Timur (Pantura & Tapal Kuda), Bali selatan, NTB bagian barat, NTT pesisir utara',
    agronomic_advisory:
      'Tanam padi sawah tadah hujan. Pastikan ketersediaan pompa alsintan jika debit irigasi primer belum stabil.',
  },
  {
    month: 'Januari 2027 / Lewat',
    zom_count: 80,
    pct_of_total_zom: 11.44,
    dominant_regions:
      'Lombok Timur, Sumbawa timur, Sumba timur, Timor barat, Palu & Sulteng pesisir timur',
    agronomic_advisory:
      'Zona iklim kering ekstrem. Prioritaskan penanaman sorgum atau jagung varietas toleran kekeringan sebelum padi.',
  },
  {
    month: 'Non-ZOM (Satu Musim / Ekuatorial)',
    zom_count: 140,
    pct_of_total_zom: 20.03,
    dominant_regions:
      'Riau kepulauan, Kalbar utara, Kaltara, Maluku Utara, Papua pesisir utara',
    agronomic_advisory:
      'Pola hujan sepanjang tahun tanpa batas tegas musim kemarau. Pola tanam ditentukan oleh curah hujan bulanan lokal.',
  },
]

export const ENSO_PROJECTIONS_2026_2027: ENSOProbabilityItem[] = [
  {
    period: 'Q3 2026 (Jul-Sep)',
    el_nino_prob_pct: 94,
    neutral_prob_pct: 6,
    la_nina_prob_pct: 0,
    consensus_label: 'El Niño Kuat (+1.68°C) — Kemarau Panjang',
  },
  {
    period: 'Q4 2026 (Okt-Des)',
    el_nino_prob_pct: 82,
    neutral_prob_pct: 18,
    la_nina_prob_pct: 0,
    consensus_label: 'El Niño Moderat Melemah — Onset Hujan Mundur',
  },
  {
    period: 'Q1 2027 (Jan-Mar)',
    el_nino_prob_pct: 28,
    neutral_prob_pct: 67,
    la_nina_prob_pct: 5,
    consensus_label: 'Transisi Menuju ENSO Netral — Puncak Hujan Nasional',
  },
  {
    period: 'Q2 2027 (Apr-Jun)',
    el_nino_prob_pct: 8,
    neutral_prob_pct: 72,
    la_nina_prob_pct: 20,
    consensus_label: 'ENSO Netral Dominan — Kemarau Normal / Cenderung Basah',
  },
  {
    period: 'Q3 2027 (Jul-Sep)',
    el_nino_prob_pct: 5,
    neutral_prob_pct: 37,
    la_nina_prob_pct: 58,
    consensus_label: 'Potensi La Niña Lemah (-0.7°C) — Kemarau Basah',
  },
  {
    period: 'Q4 2027 (Okt-Des)',
    el_nino_prob_pct: 4,
    neutral_prob_pct: 35,
    la_nina_prob_pct: 61,
    consensus_label: 'La Niña Lemah-Moderat — Onset Musim Hujan Maju',
  },
]

export const REGIONAL_AGRO_CLIMATE_CORRIDORS: RegionalCorridorClimate[] = [
  {
    id: 'CORRIDOR_JAWA',
    name: 'Koridor Jawa (Lumbung Pangan & Sayuran Nasional)',
    provinces_covered: [
      'DKI Jakarta',
      'Banten',
      'Jawa Barat',
      'Jawa Tengah',
      'DI Yogyakarta',
      'Jawa Timur',
    ],
    zom_count: 193,
    current_2026_status: {
      rain_onset_delay_dasarian: 2.5,
      dry_season_severity: 'BERAT',
      max_consecutive_dry_days: 48,
      water_reservoir_capacity_pct: 64.2,
      key_threat:
        'Kemunduran tanam MT 1 padi sebesar 20-30 hari; risiko kegagalan semai pada sawah tadah hujan yang dipaksakan tanam sebelum November.',
      field_actions: [
        'Aktivasi pompanisasi sungai sekunder (Bengawan Solo, Citarum, Brantas) untuk mengairi persemaian MT 1.',
        'Distribusi benih padi umur genjah (<105 hari): Inpari 42 Agritan GSR, Cakrabuana Agritan, Inpago 9.',
        'Kios KPL menggeser buffer stocking pupuk NPK dan herbisida pra-tumbuh ke dasarian II November 2026.',
      ],
    },
    projected_2027_outlook: {
      enso_transition:
        'El Niño mereda di Q1 2027; transisi Netral ke La Niña lemah pada semester 2 2027.',
      rainy_season_character: 'ATAS_NORMAL (BASAH)',
      flood_inundation_risk: 'HIGH',
      disease_outbreak_risk: 'CRITICAL',
      agronomic_opportunity:
        'Panen raya MT 1 (Februari–April 2027) diproyeksikan mencatat lonjakan produksi hingga +4,2% YoY berkat pengisian bulir optimal di musim basah.',
      fertilizer_procurement_advice:
        'Siapkan stok fungisida kuratif azol + strobilurin berkapasitas 2x lipat normal untuk mengantisipasi ledakan jamur blas malai dan hawar pelepah.',
    },
  },
  {
    id: 'CORRIDOR_SUMATERA',
    name: 'Koridor Sumatera (Sentra Perkebunan Sawit & Pangan Barat)',
    provinces_covered: [
      'Aceh',
      'Sumatera Utara',
      'Sumatera Barat',
      'Riau',
      'Kepulauan Riau',
      'Jambi',
      'Sumatera Selatan',
      'Bangka Belitung',
      'Bengkulu',
      'Lampung',
    ],
    zom_count: 156,
    current_2026_status: {
      rain_onset_delay_dasarian: 1.5,
      dry_season_severity: 'SEDANG',
      max_consecutive_dry_days: 35,
      water_reservoir_capacity_pct: 78.5,
      key_threat:
        'Disparitas iklim utara-selatan: Aceh/Sumut mengalami curah hujan cukup, sedangkan Sumsel dan Lampung mengalami kemarau kering dengan ancaman titik api karhutla gambut.',
      field_actions: [
        'Perkebunan sawit Riau dan Sumsel: pembuatan rorak resapan air dan pemadatan sekat kanal di lahan gambut.',
        'Tunda aplikasi pemupukan piringan sawit MOP/KCl hingga curah hujan dasarian mencapai minimal 60 mm.',
        'Percepat tanam padi pasang surut di Musi Banyuasin dan Banyuasin (Sumsel) memanfaatkan pasang air laut.',
      ],
    },
    projected_2027_outlook: {
      enso_transition:
        'Normalisasi curah hujan merata; potensi La Niña meningkatkan pasokan air gambut.',
      rainy_season_character: 'NORMAL',
      flood_inundation_risk: 'MEDIUM',
      disease_outbreak_risk: 'HIGH',
      agronomic_opportunity:
        'Pemulihan diferensiasi bunga betina kelapa sawit setelah cekaman air 2026; produksi TBS diproyeksikan melonjak pada semester 2 2027.',
      fertilizer_procurement_advice:
        'Kios perkebunan wajib mengunci kuota pupuk NPK khusus sawit (13-6-27-4+B) dan Kieserite sejak Januari 2027.',
    },
  },
  {
    id: 'CORRIDOR_BALI_NUSRA',
    name: 'Koridor Bali & Nusa Tenggara (Sentra Jagung & Hortikultura Kering)',
    provinces_covered: ['Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur'],
    zom_count: 68,
    current_2026_status: {
      rain_onset_delay_dasarian: 3.5,
      dry_season_severity: 'EKSTREM',
      max_consecutive_dry_days: 64,
      water_reservoir_capacity_pct: 42.1,
      key_threat:
        'Zona paling terdampak El Niño nasional. HTH ekstrem di Pulau Sumba, Timor, dan Sumbawa Timur memicu gagal panen pada lahan tadah hujan.',
      field_actions: [
        'Fokus total pada komoditas toleran kekeringan: jagung hibrida bisi 18 / NASA 29, sorgum bioguma, dan bawang merah varietas Tajuk/Batu Ijo.',
        'Penyaluran air darurat menggunakan tangki dan sumur bor dangkal tenaga surya.',
        'Manajemen sungkup plastik UV dan mulsa MPHP pada sentra cabai & bawang merah di Bima dan Lombok Timur.',
      ],
    },
    projected_2027_outlook: {
      enso_transition:
        'Curah hujan Q1 2027 diperkirakan melimpah, mengakhiri kemarau ekstrem.',
      rainy_season_character: 'ATAS_NORMAL (BASAH)',
      flood_inundation_risk: 'HIGH',
      disease_outbreak_risk: 'HIGH',
      agronomic_opportunity:
        'Pengisian kembali waduk-waduk NTB (Bendungan Batujai, Pengga, Mila) memungkinkan penanaman MT 2 padi penuh di 2027.',
      fertilizer_procurement_advice:
        'Stok pupuk pembesar umbi (ZK/KNO3) dan fungisida moler untuk sentra bawang merah NTB sebelum curah hujan ekstrem tiba.',
    },
  },
  {
    id: 'CORRIDOR_SULAWESI',
    name: 'Koridor Sulawesi (Lumbung Beras & Kakao Kawasan Timur)',
    provinces_covered: [
      'Sulawesi Utara',
      'Gorontalo',
      'Sulawesi Tengah',
      'Sulawesi Barat',
      'Sulawesi Selatan',
      'Sulawesi Tenggara',
    ],
    zom_count: 105,
    current_2026_status: {
      rain_onset_delay_dasarian: 2.0,
      dry_season_severity: 'BERAT',
      max_consecutive_dry_days: 42,
      water_reservoir_capacity_pct: 69.4,
      key_threat:
        'Sentra padi Sulsel (Sidrap, Pinrang, Bone) mengandalkan irigasi teknis bendungan; zona tadah hujan mengalami kemunduran tanam ke awal Desember 2026.',
      field_actions: [
        'Penggiliran air irigasi teknis dari Bendungan Bili-Bili, Karalloe, dan Salomekko.',
        'Intensifikasi pengendalian ulat FAW (Spodoptera frugiperda) pada pertanaman jagung Gorontalo dan Sulsel.',
        'Sanitasi kebun kakao di Kolaka dan Luwu Utara guna meminimalisir pembusukan buah saat hujan awal tiba.',
      ],
    },
    projected_2027_outlook: {
      enso_transition:
        'Kondisi ENSO netral membawa curah hujan stabil di sepanjang koridor Selat Makassar.',
      rainy_season_character: 'NORMAL',
      flood_inundation_risk: 'MEDIUM',
      disease_outbreak_risk: 'MEDIUM',
      agronomic_opportunity:
        'Peningkatan indeks pertanaman (IP) dari IP 200 ke IP 250 pada sentra padi beririgasi teknis Sulawesi Selatan.',
      fertilizer_procurement_advice:
        'Amankan alokasi pupuk urea dan NPK majemuk sejak Q4 2026 untuk mengantisipasi tanam serempak Januari 2027.',
    },
  },
  {
    id: 'CORRIDOR_KALIMANTAN',
    name: 'Koridor Kalimantan (Sentra Lahan Rawa Lebak & Perkebunan)',
    provinces_covered: [
      'Kalimantan Barat',
      'Kalimantan Tengah',
      'Kalimantan Selatan',
      'Kalimantan Timur',
      'Kalimantan Utara',
    ],
    zom_count: 92,
    current_2026_status: {
      rain_onset_delay_dasarian: 1.5,
      dry_season_severity: 'SEDANG',
      max_consecutive_dry_days: 30,
      water_reservoir_capacity_pct: 82.0,
      key_threat:
        'Penyusutan muka air tanah di lahan gambut Kalteng dan Kalsel meningkatkan potensi kebakaran semak dan stres kekeringan kelapa sawit.',
      field_actions: [
        'Operasionalisasi pintu air tabat di jaringan irigasi rawa lebak dan pasang surut.',
        'Pemanfaatan lahan lebak dangkal di Kalsel (Hulu Sungai Tengah, Barito Kuala) yang surut untuk pertanaman padi surung.',
        'Aplikasi biostimulan asam amino pada kelapa sawit untuk mereduksi gugur buah prematur.',
      ],
    },
    projected_2027_outlook: {
      enso_transition:
        'La Niña lemah berpotensi meningkatkan frekuensi hujan di daerah hulu DAS Barito dan Kapuas.',
      rainy_season_character: 'ATAS_NORMAL (BASAH)',
      flood_inundation_risk: 'HIGH',
      disease_outbreak_risk: 'HIGH',
      agronomic_opportunity:
        'Ketersediaan air tanah tinggi mendukung pembibitan sawit dan perluasan tanam padi rawa pasang surut.',
      fertilizer_procurement_advice:
        'Perkuat pasokan herbisida sistemik dan surfaktan perekat cuci hujan di dealer agrokimia Kalimantan.',
    },
  },
  {
    id: 'CORRIDOR_MALUKU_PAPUA',
    name: 'Koridor Maluku & Papua (Pola Hujan Lokal & Tanaman Dataran Tinggi)',
    provinces_covered: [
      'Maluku',
      'Maluku Utara',
      'Papua',
      'Papua Barat',
      'Papua Selatan',
      'Papua Tengah',
      'Papua Pegunungan',
      'Papua Barat Daya',
    ],
    zom_count: 85,
    current_2026_status: {
      rain_onset_delay_dasarian: 1.0,
      dry_season_severity: 'RINGAN',
      max_consecutive_dry_days: 22,
      water_reservoir_capacity_pct: 88.5,
      key_threat:
        'Pola hujan lokal kepulauan: Maluku beriklim anti-monsun; ancaman suhu beku (frost/embun beku) di distrik tinggi Papua (Lanny Jaya, Puncak).',
      field_actions: [
        'Penyiapan lumbung pangan lokal ubi jalar (hipere) tahan dingin di dataran tinggi Papua.',
        'Perlindungan tanaman rempah pala dan cengkeh di Maluku dari jamur akar pasca hujan lebat lokal.',
        'Penguatan logistik saprotan berbasis maritim sebelum gelombang tinggi akhir tahun.',
      ],
    },
    projected_2027_outlook: {
      enso_transition:
        'Fluktuasi suhu permukaan laut Pasifik Barat membawa curah hujan normal-stabil.',
      rainy_season_character: 'NORMAL',
      flood_inundation_risk: 'LOW',
      disease_outbreak_risk: 'MEDIUM',
      agronomic_opportunity:
        'Stabilisasi produksi sagu dan rempah bernilai ekspor tinggi.',
      fertilizer_procurement_advice:
        'Penyediaan pupuk foliar nutrisi mikro dan fungisida tembaga terstandar.',
    },
  },
]

export const COMMODITY_CLIMATE_PROFILES: CommodityClimateProfile[] = [
  {
    id: 'COMM_01_PADI',
    name: 'Padi (Rice)',
    sector: 'Tanaman Pangan',
    optimal_temperature_celsius: '24°C – 32°C',
    annual_water_requirement_mm: '1.200 – 1.800 mm',
    drought_tolerance_days: 12,
    flood_tolerance_days: 7,
    current_2026_el_nino: {
      vulnerability_score: 9.2,
      vulnerability_level: 'CRITICAL',
      yield_impact_pct: -6.4,
      planting_shift_days: 28,
      primary_biotic_threats: [
        'Penggerek Batang Padi (Scirpophaga)',
        'Wereng Batang Coklat (Nilaparvata lugens)',
        'Tikus Sawah',
      ],
      immediate_field_mitigation:
        'Implementasi pompanisasi bergilir, perlakuan benih insektisida fipronil, tanam serentak saat hujan dasarian >50 mm.',
      recommended_varieties_or_inputs: [
        'Inpari 42 Agritan GSR',
        'Inpago 9',
        'Cakrabuana Agritan',
        'Pupuk Silika Foliar (Pelindung Kekeringan)',
      ],
    },
    projected_2027_outlook: {
      recovery_potential: 'TINGGI',
      projected_yield_growth_pct: 4.8,
      wet_season_threats: [
        'Penyakit Blas Malai (Pyricularia oryzae)',
        'Hawar Daun Bakteri / Xanthomonas',
        'Kresek Daun',
      ],
      recommended_proactive_procurement: [
        'Fungisida Azoksistrobin + Difenokonazol',
        'Bakterisida Oksitetrasiklin',
        'NPK Phonska Plus',
      ],
      golden_window_adjustment:
        'Puncak tanam MT 1 normal kembali ke Oktober 2027; panen raya melimpah di Februari–Maret 2028.',
    },
  },
  {
    id: 'COMM_02_JAGUNG',
    name: 'Jagung (Corn)',
    sector: 'Tanaman Pangan',
    optimal_temperature_celsius: '21°C – 34°C',
    annual_water_requirement_mm: '500 – 800 mm',
    drought_tolerance_days: 25,
    flood_tolerance_days: 3,
    current_2026_el_nino: {
      vulnerability_score: 6.8,
      vulnerability_level: 'HIGH',
      yield_impact_pct: -2.8,
      planting_shift_days: 18,
      primary_biotic_threats: [
        'Ulat Grayak Jagung (Spodoptera frugiperda / FAW)',
        'Bulai (Peronosclerospora)',
        'Penggerek Tongkol',
      ],
      immediate_field_mitigation:
        'Aplikasi insektisida emamektin benzoat tepat ke dalam pucuk daun (titik tumbuh) pada umur 14-28 HST.',
      recommended_varieties_or_inputs: [
        'Bisi 18',
        'Pioneer P32',
        'NASA 29',
        'Insektisida Klorantraniliprol',
      ],
    },
    projected_2027_outlook: {
      recovery_potential: 'TINGGI',
      projected_yield_growth_pct: 5.2,
      wet_season_threats: [
        'Busuk Tongkol (Fusarium)',
        'Busuk Batang Basah',
        'Karat Daun',
      ],
      recommended_proactive_procurement: [
        'Seed Treatment Metalaksil (Cegah Bulai)',
        'Pupuk Kalium Klorida (KCL/MOP) Penguat Batang',
      ],
      golden_window_adjustment:
        'Penanaman gadu palawija 2027 dipercepat memanfaatkan sisa kelengasan tanah pasca panen rendeng.',
    },
  },
  {
    id: 'COMM_03_CABAI',
    name: 'Cabai Agregat (Chili)',
    sector: 'Hortikultura Sayuran',
    optimal_temperature_celsius: '18°C – 28°C',
    annual_water_requirement_mm: '800 – 1.200 mm',
    drought_tolerance_days: 8,
    flood_tolerance_days: 2,
    current_2026_el_nino: {
      vulnerability_score: 4.2,
      vulnerability_level: 'MEDIUM',
      yield_impact_pct: 1.5, // Panen cerah di musim kemarau
      planting_shift_days: 10,
      primary_biotic_threats: [
        'Thrips parvispinus',
        'Kutu Kebul (Bemisia tabaci)',
        'Virus Kuning Geminivirus',
        'Tungau Merah',
      ],
      immediate_field_mitigation:
        'Pemasangan sticky trap kuning di lahan, rotasi bahan aktif insektisida sistemik + akarisida piridaben, mulsa MPHP rapi.',
      recommended_varieties_or_inputs: [
        'Cabai Rawit Ori 212',
        'Cabai Besar Pilar F1',
        'Insektisida Spinetoram',
        'Biostimulan Asam Amino',
      ],
    },
    projected_2027_outlook: {
      recovery_potential: 'MODERAT',
      projected_yield_growth_pct: -3.5, // Penurunan yield saat hujan berlebih
      wet_season_threats: [
        'Patek / Antraknosa (Colletotrichum)',
        'Layu Bakteri (Ralstonia)',
        'Busuk Phytophthora',
      ],
      recommended_proactive_procurement: [
        'Fungisida Klorotalonil + Mankozeb',
        'Tembaga Hidroksida',
        'Kalsium Nitrat Penguat Dinding Sel',
      ],
      golden_window_adjustment:
        'Petani cabai wajib menaikkan bedengan setinggi 40-50 cm sebelum musim hujan lebat Q4 2027.',
    },
  },
  {
    id: 'COMM_04_BAWANG_MERAH',
    name: 'Bawang Merah (Shallot)',
    sector: 'Hortikultura Sayuran',
    optimal_temperature_celsius: '25°C – 32°C',
    annual_water_requirement_mm: '600 – 900 mm',
    drought_tolerance_days: 7,
    flood_tolerance_days: 1,
    current_2026_el_nino: {
      vulnerability_score: 3.8,
      vulnerability_level: 'LOW',
      yield_impact_pct: 3.2, // Umbi padat & merah di musim kering
      planting_shift_days: 7,
      primary_biotic_threats: [
        'Ulat Grayak (Spodoptera exigua)',
        'Ulat Daun',
        'Kekurangan Air Saluran',
      ],
      immediate_field_mitigation:
        'Pengurasan saluran klampangan menggunakan pompa alkon, aplikasi feromon perangkap ngengat, insektisida klorfenapir.',
      recommended_varieties_or_inputs: [
        'Batu Ijo',
        'Tajuk (Nganjuk)',
        'Bauji',
        'Pupuk Mikro Silika & Boron',
      ],
    },
    projected_2027_outlook: {
      recovery_potential: 'TERBATAS',
      projected_yield_growth_pct: -4.2,
      wet_season_threats: [
        'Penyakit Moler / Layu Fusarium',
        'Bercak Ungu (Alternaria porri)',
        'Busuk Umbi Basah',
      ],
      recommended_proactive_procurement: [
        'Trichoderma sp. Perlakuan Tanah',
        'Fungisida Difenokonazol + Propikonazol',
        'Kapur Dolomit',
      ],
      golden_window_adjustment:
        'Hindari tanam di dataran rendah bertanah liat pada puncak hujan Q1 2027; fokus panen musim kemarau Juli–Agustus 2027.',
    },
  },
  {
    id: 'COMM_05_KENTANG',
    name: 'Kentang (Potato)',
    sector: 'Hortikultura Sayuran',
    optimal_temperature_celsius: '15°C – 20°C',
    annual_water_requirement_mm: '1.200 – 1.500 mm',
    drought_tolerance_days: 10,
    flood_tolerance_days: 2,
    current_2026_el_nino: {
      vulnerability_score: 5.5,
      vulnerability_level: 'MEDIUM',
      yield_impact_pct: -1.2,
      planting_shift_days: 14,
      primary_biotic_threats: [
        'Lalat Pengorok Daun (Liriomyza)',
        'Kutu Daun (Aphids)',
        'Embun Upas / Frost Dataran Tinggi',
      ],
      immediate_field_mitigation:
        'Irigasi sprinkler kabut pagi hari untuk mencairkan embun beku di Dieng/Bromo, mulsa plastik hitam perak.',
      recommended_varieties_or_inputs: [
        'Granola L',
        'Atlantik',
        'Insektisida Abamektin',
        'Asam Humat',
      ],
    },
    projected_2027_outlook: {
      recovery_potential: 'MODERAT',
      projected_yield_growth_pct: 2.1,
      wet_season_threats: [
        'Busuk Daun Hawar (Phytophthora infestans)',
        'Layu Bakteri',
        'Nematoda Sista Kuning',
      ],
      recommended_proactive_procurement: [
        'Fungisida Dimetomorf + Mankozeb',
        'Simoksanil',
        'Pupuk Kalsium Boron',
      ],
      golden_window_adjustment:
        'Intensitas penyemprotan fungisida kuratif dinaikkan menjadi 3 hari sekali selama musim hujan 2027.',
    },
  },
  {
    id: 'COMM_06_KUBIS',
    name: 'Kubis (Cabbage)',
    sector: 'Hortikultura Sayuran',
    optimal_temperature_celsius: '15°C – 22°C',
    annual_water_requirement_mm: '1.000 – 1.400 mm',
    drought_tolerance_days: 9,
    flood_tolerance_days: 3,
    current_2026_el_nino: {
      vulnerability_score: 5.0,
      vulnerability_level: 'MEDIUM',
      yield_impact_pct: -0.8,
      planting_shift_days: 12,
      primary_biotic_threats: [
        'Ulat Krop Kubis (Crocidolomia pavonana)',
        'Plutella xylostella',
      ],
      immediate_field_mitigation:
        'Rotasi insektisida Bacillus thuringiensis (Bt) dengan spinetoram, menjaga kelembaban akar dengan mulsa jerami.',
      recommended_varieties_or_inputs: [
        'Green Nova',
        'Sehat 88',
        'Insektisida Flubendiamida',
      ],
    },
    projected_2027_outlook: {
      recovery_potential: 'TINGGI',
      projected_yield_growth_pct: 3.4,
      wet_season_threats: [
        'Busuk Hitam (Xanthomonas campestris)',
        'Akar Gada (Plasmodiophora brassicae)',
      ],
      recommended_proactive_procurement: [
        'Aplikasi Kapur Pertanian (pH > 6.5)',
        'Bakterisida Kasugamisin',
      ],
      golden_window_adjustment:
        'Penanaman kubis dataran tinggi dimulai awal musim hujan untuk mengejar pasar sayuran Tahun Baru.',
    },
  },
  {
    id: 'COMM_07_TOMAT',
    name: 'Tomat (Tomato)',
    sector: 'Hortikultura Sayuran',
    optimal_temperature_celsius: '20°C – 27°C',
    annual_water_requirement_mm: '700 – 1.000 mm',
    drought_tolerance_days: 8,
    flood_tolerance_days: 2,
    current_2026_el_nino: {
      vulnerability_score: 4.5,
      vulnerability_level: 'MEDIUM',
      yield_impact_pct: 0.5,
      planting_shift_days: 10,
      primary_biotic_threats: [
        'Kutu Kebul Vektor Virus Mosaik',
        'Ulat Buah (Helicoverpa armigera)',
        'Tungau',
      ],
      immediate_field_mitigation:
        'Pemasangan sungkup jaring serangga (insect net) di pembibitan, aplikasi kalsium foliar mencegah ujung buah busuk.',
      recommended_varieties_or_inputs: [
        'Servo F1',
        'Tymoti F1',
        'Pupuk Kalsium Organik',
        'Akarisida',
      ],
    },
    projected_2027_outlook: {
      recovery_potential: 'MODERAT',
      projected_yield_growth_pct: -1.8,
      wet_season_threats: [
        'Pecah Buah Akibat Hujan Tiba-tiba',
        'Hawar Daun Phytophthora',
        'Bercak Daun Bakteri',
      ],
      recommended_proactive_procurement: [
        'Kalsium Boron Khusus Buah',
        'Fungisida Translaminar Mankozeb + Mefenoksam',
      ],
      golden_window_adjustment:
        'Perkuat drainase parit dan pemangkasan tunas air untuk sirkulasi udara bedengan.',
    },
  },
  {
    id: 'COMM_08_SEMANGKA',
    name: 'Semangka (Watermelon)',
    sector: 'Hortikultura Buah',
    optimal_temperature_celsius: '25°C – 35°C',
    annual_water_requirement_mm: '400 – 600 mm',
    drought_tolerance_days: 15,
    flood_tolerance_days: 1,
    current_2026_el_nino: {
      vulnerability_score: 2.5,
      vulnerability_level: 'LOW',
      yield_impact_pct: 5.6, // Sangat menyukai kemarau terik (brix gula tinggi)
      planting_shift_days: 0,
      primary_biotic_threats: ['Kutu Daun Melon Aphids', 'Thrips'],
      immediate_field_mitigation:
        'Irigasi tetes / kocoran teratur pada fase pembentukan buah, mulsa perak untuk memantulkan sinar matahari.',
      recommended_varieties_or_inputs: [
        'Semangka Non-Biji Amara F1',
        'Maduri',
        'Pupuk KNO3 Putih',
        'Asam Amino',
      ],
    },
    projected_2027_outlook: {
      recovery_potential: 'TERBATAS',
      projected_yield_growth_pct: -6.0, // Sangat rentan jika hujan di masa panen
      wet_season_threats: [
        'Pecah Buah Massal',
        'Kematian Tanaman Akibat Busuk Batang Berlendir (Gummy Stem Blight)',
      ],
      recommended_proactive_procurement: [
        'Fungisida Difenokonazol',
        'Alas Buah Jerami Kering / Styrofoam',
      ],
      golden_window_adjustment:
        'Batasi jadwal tanam semangka hanya pada jendela kering Mei–Agustus 2027.',
    },
  },
  {
    id: 'COMM_09_MELON',
    name: 'Melon (Melon)',
    sector: 'Hortikultura Buah',
    optimal_temperature_celsius: '25°C – 32°C',
    annual_water_requirement_mm: '400 – 650 mm',
    drought_tolerance_days: 12,
    flood_tolerance_days: 1,
    current_2026_el_nino: {
      vulnerability_score: 2.8,
      vulnerability_level: 'LOW',
      yield_impact_pct: 4.8,
      planting_shift_days: 0,
      primary_biotic_threats: [
        'Kutu Kebul Geminivirus',
        'Embun Tepung (Powdery Mildew)',
      ],
      immediate_field_mitigation:
        'Sanitasi gulma sekitar lanjaran, aplikasi kalium tinggi 2 minggu sebelum panen untuk netting sempurna.',
      recommended_varieties_or_inputs: [
        'Melon Alisha F1',
        'Action 434',
        'Pupuk Kalium Sulfat ZK',
        'Fungisida Heksakonazol',
      ],
    },
    projected_2027_outlook: {
      recovery_potential: 'TERBATAS',
      projected_yield_growth_pct: -5.2,
      wet_season_threats: [
        'Kegagalan Pembentukan Jaring (Netting)',
        'Buah Busuk & Tawar (Brix Turun)',
      ],
      recommended_proactive_procurement: [
        'Plastik Rain Shelter UV',
        'Fungisida Tembaga Protektif',
      ],
      golden_window_adjustment:
        'Dorong budidaya semi-greenhouse atau lanjaran tinggi dengan penutup plastik atap.',
    },
  },
  {
    id: 'COMM_10_KELAPA_SAWIT',
    name: 'Kelapa Sawit (Oil Palm)',
    sector: 'Perkebunan',
    optimal_temperature_celsius: '24°C – 30°C',
    annual_water_requirement_mm: '2.000 – 2.500 mm',
    drought_tolerance_days: 45,
    flood_tolerance_days: 14,
    current_2026_el_nino: {
      vulnerability_score: 8.0,
      vulnerability_level: 'CRITICAL',
      yield_impact_pct: -4.5, // Penurunan TBS tertunda 8-12 bulan ke depan
      planting_shift_days: 30,
      primary_biotic_threats: [
        'Ulat Api (Setothosea asigna)',
        'Kumbang Tanduk (Oryctes rhinoceros)',
        'Karhutla Semak',
      ],
      immediate_field_mitigation:
        'Pembuatan rorak di gawangan mati, penumpukan pelepah untuk mulsa alami, tunda pemupukan anorganik jika tanah retak.',
      recommended_varieties_or_inputs: [
        'Pupuk MOP / KCl Granul',
        'Dolomit Super',
        'Rock Phosphate',
        'Feromon Kumbang Oryctes',
      ],
    },
    projected_2027_outlook: {
      recovery_potential: 'TINGGI',
      projected_yield_growth_pct: 6.2, // Efek pemulihan air pasca El Nino
      wet_season_threats: [
        'Kerusakan Jalan Panen (Koleksi TBS Macet)',
        'Penyakit Busuk Pangkal Batang Ganoderma',
      ],
      recommended_proactive_procurement: [
        'Biofungisida Trichoderma album',
        'Batu Pecah Pengeras Jalan Panen',
        'Borate 48',
      ],
      golden_window_adjustment:
        'Alokasikan pemupukan makro penuh (Semester 1 & 2) di 2027 guna memaksimalkan gelombang High Crop.',
    },
  },
  {
    id: 'COMM_11_ALPUKAT',
    name: 'Alpukat (Avocado)',
    sector: 'Hortikultura Buah',
    optimal_temperature_celsius: '18°C – 28°C',
    annual_water_requirement_mm: '1.200 – 1.600 mm',
    drought_tolerance_days: 30,
    flood_tolerance_days: 3,
    current_2026_el_nino: {
      vulnerability_score: 4.0,
      vulnerability_level: 'MEDIUM',
      yield_impact_pct: 2.1, // Cekaman air ringan justru merangsang pembungaan massal
      planting_shift_days: 0,
      primary_biotic_threats: [
        'Ulat Kipat (Cricula trifenestrata)',
        'Kutu Putih Buah',
        'Kanker Batang Phytophthora',
      ],
      immediate_field_mitigation:
        'Pemberian pupuk kandang matang di piringan pohon, pengocoran ZPT pembungaan kalium fosfat.',
      recommended_varieties_or_inputs: [
        'Alpukat Miki',
        'Alpukat Alligator',
        'Alpukat Kendil',
        'ZPT Paclobutrazol (Terkontrol)',
      ],
    },
    projected_2027_outlook: {
      recovery_potential: 'TINGGI',
      projected_yield_growth_pct: 3.8,
      wet_season_threats: [
        'Gugur Bunga & Pentil Buah Akibat Hujan Deras',
        'Antraknosa Kulit Buah',
      ],
      recommended_proactive_procurement: [
        'Pupuk Kalsium Boron Perekat Bunga',
        'Fungisida Propineb',
      ],
      golden_window_adjustment:
        'Penyemprotan nutrisi kalsium mikro saat inisiasi bunga di awal musim hujan 2027.',
    },
  },
  {
    id: 'COMM_12_TEMBAKAU',
    name: 'Tembakau (Tobacco)',
    sector: 'Perkebunan',
    optimal_temperature_celsius: '21°C – 32°C',
    annual_water_requirement_mm: '500 – 800 mm',
    drought_tolerance_days: 20,
    flood_tolerance_days: 1,
    current_2026_el_nino: {
      vulnerability_score: 1.8,
      vulnerability_level: 'LOW',
      yield_impact_pct: 8.5, // Sangat menguntungkan kualitas aromatik & daya bakar tembakau
      planting_shift_days: 0,
      primary_biotic_threats: [
        'Ulat Grayak Daun (Spodoptera litura)',
        'Kutu Tembakau',
        'Penyakit Lanas',
      ],
      immediate_field_mitigation:
        'Pengendalian ulat pemakan daun tanpa merusak lembaran daun, pemupukan eksklusif kalium bebas klorin (ZK).',
      recommended_varieties_or_inputs: [
        'Tembakau Madura (Prancak 9)',
        'Tembakau Virginia Bojonegoro',
        'Pupuk ZK (Kalium Sulfat)',
        'Insektisida Klorantraniliprol',
      ],
    },
    projected_2027_outlook: {
      recovery_potential: 'TERBATAS',
      projected_yield_growth_pct: -8.0, // Sangat terancam jika 2027 menjadi kemarau basah
      wet_season_threats: [
        'Kehancuran Kualitas Daun Tembakau (Daun Tipis, Daya Bakar Hilang)',
        'Lanas Daun (Phytophthora nicotianae)',
      ],
      recommended_proactive_procurement: [
        'Fungisida Sistemik Mankozeb',
        'Drainase Sawah Ekstra Dalam',
      ],
      golden_window_adjustment:
        'Jangan menanam tembakau melewati bulan Mei di 2027 jika prediksi La Niña terkonfirmasi.',
    },
  },
  {
    id: 'COMM_13_ANGGREK',
    name: 'Anggrek (Orchid)',
    sector: 'Florikultura',
    optimal_temperature_celsius: '20°C – 30°C',
    annual_water_requirement_mm: 'Irigasi Terkontrol Mist (800 – 1.000 mm)',
    drought_tolerance_days: 14,
    flood_tolerance_days: 2,
    current_2026_el_nino: {
      vulnerability_score: 3.0,
      vulnerability_level: 'LOW',
      yield_impact_pct: 0.0, // Terlindungi greenhouse/paranet
      planting_shift_days: 0,
      primary_biotic_threats: [
        'Tungau Merah (Tetranychus)',
        'Thrips Bunga',
        'Kekeringan Media Tanam',
      ],
      immediate_field_mitigation:
        'Peningkatan frekuensi pengabutan mikro (misting) 3x sehari untuk menjaga kelembaban relatif 70-80%.',
      recommended_varieties_or_inputs: [
        'Dendrobium Potong',
        'Phalaenopsis',
        'Pupuk Foliar NPK 20-20-20 Micro',
        'Akarisida',
      ],
    },
    projected_2027_outlook: {
      recovery_potential: 'TINGGI',
      projected_yield_growth_pct: 1.5,
      wet_season_threats: [
        'Busuk Lunak Bakteri (Erwinia)',
        'Busuk Hitam Daun (Pythium)',
      ],
      recommended_proactive_procurement: [
        'Bakterisida Streptomisin Sulfat',
        'Fungisida Al-Fosetil',
        'Kipas Ventilasi Greenhouse',
      ],
      golden_window_adjustment:
        'Perketat sanitasi rumah paranet dan kurangi penyiraman manual di sore hari.',
    },
  },
]

export const KATAM_ACTION_PROTOCOLS: KatamProtocol[] = [
  {
    protocol_id: 'KATAM-01',
    title:
      'SOP Penyesuaian Dinamis Awal Waktu Tanam (Dynamic Sowing Rescheduling)',
    target_ecosystem:
      'Sawah Irigasi Teknis & Tadah Hujan (Jawa, Bali, NTB, Sumsel, Sulsel)',
    urgency: 'DARURAT_EL_NINO',
    summary:
      'Protokol penundaan tebar benih MT 1 2026 sebesar 2-3 dasarian guna menghindari periode kritis mati semai akibat kemarau panjang El Niño.',
    steps: [
      'Pantau akumulasi curah hujan harian dari stasiun BMKG terdekat; jangan memulai olah tanah sebelum hujan mencapai akumulasi 50 mm/dasarian secara konsisten.',
      'Gunakan sistem persemaian kering atau sistem culik benih (dapog) di dekat saluran primer yang memiliki jaminan air pompa.',
      'Perpendek umur bibit saat pindah tanam menjadi 15-18 HSS (Hari Setelah Semai) guna meningkatkan daya tahan perakaran.',
      'Terapkan tanam jajar legowo 2:1 atau 4:1 untuk mempermudah distribusi air macak-macak di petakan sawah.',
    ],
    recommended_inputs: [
      'Benih Padi Inpari 42 GSR',
      'Inpago 9',
      'Pupuk Organik Asam Humat',
      'Herbisida Pra-Tumbuh',
    ],
    target_crops: ['Padi', 'Jagung'],
  },
  {
    protocol_id: 'KATAM-02',
    title: 'SOP Manajemen Irigasi Hemat Air (AWD - Alternate Wetting & Drying)',
    target_ecosystem: 'Lahan Beririgasi Teknis & Semi Teknis',
    urgency: 'DARURAT_EL_NINO',
    summary:
      'Metode pengairan berselang (macak-macak) dengan pipa pantau PVC berlubang. Menghemat konsumsi air irigasi 25-35% tanpa menurunkan hasil gabah.',
    steps: [
      'Tanam pipa paralon PVC diameter 4 inci sepanjang 30 cm ke dalam lumpur sawah (15 cm tertanam, 15 cm di atas permukaan tanah).',
      'Keluarkan lumpur dari dalam pipa paralon hingga terlihat muka air tanah di dalam tabung.',
      'Lakukan penggenangan setinggi 3-5 cm saat aplikasi pupuk dasar dan susulan.',
      'Biarkan air menyusut alami hingga kedalaman 15 cm di bawah permukaan tanah sebelum melakukan penggenangan ulang.',
      'Saat fase bunting dan pembungaan (fase generatif kritis), jaga sawah tetap tergenang tipis 2-3 cm.',
    ],
    recommended_inputs: [
      'Pipa Pantau AWD',
      'Pompa Air Alsintan 3-4 Inci',
      'Pupuk NPK Lambat Lepas (Slow-Release)',
    ],
    target_crops: ['Padi'],
  },
  {
    protocol_id: 'KATAM-03',
    title:
      'SOP Kesiapsiagaan Penyakit Jamur Musim Basah 2027 (Pre-Season Fungicide Stocking)',
    target_ecosystem: 'Semua Sentra Tanaman Pangan & Hortikultura',
    urgency: 'PROAKTIF_2027',
    summary:
      'Rencana aksi distributor dan kios saprodi dalam mengamankan buffer stock fungisida translaminar dan sistemik sebelum La Niña / normalisasi basah Q1 2027 tiba.',
    steps: [
      'Distributor melakukan pre-booking kuota fungisida azol, strobilurin, dan mankozeb pada November 2026.',
      'Kios KPL mengalokasikan 40% plafon modal kerja untuk kategori proteksi penyakit jamur (blas padi dan patek antraknosa).',
      'Tim agronomist lapangan menyelenggarakan demplot aplikasi fungisida protektif 7 hari sebelum inisiasi malai di sentra padi.',
      'Edukasi petani untuk tidak mengaplikasikan pupuk Urea/Nitrogen berlebihan di musim hujan karena memicu kerentanan sel daun.',
    ],
    recommended_inputs: [
      'Fungisida Azoksistrobin + Difenokonazol',
      'Klorotalonil',
      'Pupuk Kalium Silika',
      'Surfaktan Perekat Cuci Hujan',
    ],
    target_crops: ['Padi', 'Cabai', 'Bawang Merah', 'Kentang', 'Tomat'],
  },
  {
    protocol_id: 'KATAM-04',
    title: 'SOP Proteksi Tanaman Perkebunan Kelapa Sawit Pasca Cekaman Air',
    target_ecosystem:
      'Perkebunan Kelapa Sawit Rakyat & Swasta (Sumatera & Kalimantan)',
    urgency: 'PROAKTIF_2027',
    summary:
      'Protokol pemulihan nutrisi hara dan pemadatan kanal tanah gambut pasca musim kemarau panjang El Niño guna mendorong pembentukan tandan buah segar optimal.',
    steps: [
      'Tutup pintu-pintu air kanal primer dan sekunder saat hujan mulai reguler guna menjaga muka air tanah gambut di level 40-50 cm.',
      'Lakukan penaburan pupuk kalsium dolomit untuk menaikkan pH tanah gambut yang asam pasca kemarau.',
      'Aplikasi pupuk MOP/KCl dosis penuh (2,0–2,5 kg/pohon) di piringan pohon yang telah bersih dari gulma.',
      'Monitoring berkala serangan kumbang tanduk Oryctes di areal replanting dengan memasang perangkap feromon Ferotrap.',
    ],
    recommended_inputs: [
      'Pupuk MOP / KCl',
      'Dolomit Super',
      'Rock Phosphate',
      'Feromon Oryctes',
      'Biostimulan Asam Amino',
    ],
    target_crops: ['Kelapa Sawit'],
  },
]

// -------------------------------------------------------------
// DYNAMIC CALENDAR MATRICES PER CLIMATE SCENARIO
// -------------------------------------------------------------

export type CalendarYearMode =
  | '2026_EL_NINO'
  | '2027_PROJECTED'
  | 'CLIMATOLOGICAL_NORMAL'

/**
 * Normal Climatological Baseline Schedule (Standard BPS/Kementan)
 */
export const MATRIX_CLIMATOLOGICAL_NORMAL: Record<string, string[]> = {
  COMM_01_PADI: [
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'VG',
  ],
  COMM_02_JAGUNG: [
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
  ],
  COMM_03_CABAI: [
    'PN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
  ],
  COMM_04_BAWANG_MERAH: [
    'PL',
    'TN',
    'GN',
    'PN',
    'PL',
    'TN',
    'GN',
    'PN',
    'PL',
    'TN',
    'GN',
    'PN',
  ],
  COMM_05_KENTANG: [
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
  ],
  COMM_06_KUBIS: [
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
  ],
  COMM_07_TOMAT: [
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
  ],
  COMM_08_SEMANGKA: [
    'BR',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'BR',
  ],
  COMM_09_MELON: [
    'BR',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'BR',
  ],
  COMM_10_KELAPA_SAWIT: [
    'PN',
    'LC',
    'PF',
    'PF',
    'VG',
    'PN',
    'HC',
    'HC',
    'PF',
    'HC',
    'PF',
    'PN',
  ],
  COMM_11_ALPUKAT: [
    'PN',
    'PN',
    'BR',
    'PL',
    'VG',
    'VG',
    'GN',
    'GN',
    'VG',
    'VG',
    'PN',
    'PN',
  ],
  COMM_12_TEMBAKAU: [
    'BR',
    'BR',
    'SM',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PN',
    'PN',
    'BR',
    'BR',
  ],
  COMM_13_ANGGREK: [
    'PN',
    'PN',
    'PL',
    'VG',
    'VG',
    'GN',
    'PN',
    'VG',
    'VG',
    'GN',
    'GN',
    'PN',
  ],
}

/**
 * 2026 Real Status (Impacted by Strong El Niño & Delayed Monsoon):
 * - Subround 3 MT 1 planting shifts from October into November/December.
 * - Months 8-9 (Aug-Sep) extend fallow / drought stress ('BR' or delayed 'PL').
 * - Thrips & vector pest pressure ('PT') surges in horticulture during dry spells.
 */
export const MATRIX_2026_EL_NINO: Record<string, string[]> = {
  COMM_01_PADI: [
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'BR',
    'PL',
    'TN',
    'VG',
  ], // MT 1 delayed to Nov-Dec
  COMM_02_JAGUNG: [
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'BR',
    'PL',
    'TN',
    'VG',
  ],
  COMM_03_CABAI: [
    'PN',
    'PN',
    'PL',
    'TN',
    'VG',
    'PT',
    'PN',
    'PN',
    'PL',
    'PL',
    'TN',
    'VG',
  ], // Extended dry harvest & thrips in Jun-Jul
  COMM_04_BAWANG_MERAH: [
    'PL',
    'TN',
    'GN',
    'PN',
    'PL',
    'TN',
    'GN',
    'PN',
    'PL',
    'TN',
    'GN',
    'PN',
  ],
  COMM_05_KENTANG: [
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'BR',
    'PL',
    'TN',
    'VG',
    'GN',
  ],
  COMM_06_KUBIS: [
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'BR',
    'PL',
    'TN',
    'VG',
    'GN',
  ],
  COMM_07_TOMAT: [
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'BR',
    'PL',
    'TN',
    'GN',
    'PN',
  ],
  COMM_08_SEMANGKA: [
    'BR',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PN',
    'PN',
    'PL',
    'TN',
    'GN',
    'BR',
  ], // Extended sunny watermelon harvest
  COMM_09_MELON: [
    'BR',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PN',
    'PN',
    'PL',
    'TN',
    'GN',
    'BR',
  ],
  COMM_10_KELAPA_SAWIT: [
    'PN',
    'LC',
    'LC',
    'PF',
    'VG',
    'PN',
    'HC',
    'HC',
    'PF',
    'HC',
    'PF',
    'PN',
  ], // Low crop lengthened
  COMM_11_ALPUKAT: [
    'PN',
    'PN',
    'BR',
    'PL',
    'VG',
    'VG',
    'GN',
    'GN',
    'GN',
    'VG',
    'PN',
    'PN',
  ],
  COMM_12_TEMBAKAU: [
    'BR',
    'BR',
    'SM',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PN',
    'PN',
    'PN',
    'BR',
  ], // Golden dry tobacco window lengthened
  COMM_13_ANGGREK: [
    'PN',
    'PN',
    'PL',
    'VG',
    'VG',
    'GN',
    'PN',
    'VG',
    'VG',
    'GN',
    'GN',
    'PN',
  ],
}

/**
 * 2027 Projected Recovery (ENSO Normalization to Weak La Niña):
 * - Heavy harvest in Jan-Mar from delayed 2026 crop.
 * - Onset of MT 1 2027/2028 normalizes or advances into September-October.
 * - Wet season fungal protection surges.
 */
export const MATRIX_2027_PROJECTED: Record<string, string[]> = {
  COMM_01_PADI: [
    'GN',
    'PN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
  ], // Massive harvest Feb-Mar, normal MT 1 Oct
  COMM_02_JAGUNG: [
    'GN',
    'PN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
  ],
  COMM_03_CABAI: [
    'PT',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PT',
    'PL',
    'TN',
    'VG',
    'PT',
  ], // High fungal risk in rainy months
  COMM_04_BAWANG_MERAH: [
    'PL',
    'TN',
    'GN',
    'PN',
    'PL',
    'TN',
    'GN',
    'PN',
    'PL',
    'TN',
    'GN',
    'PN',
  ],
  COMM_05_KENTANG: [
    'PT',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PT',
  ],
  COMM_06_KUBIS: [
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
  ],
  COMM_07_TOMAT: [
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
  ],
  COMM_08_SEMANGKA: [
    'BR',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'BR',
    'BR',
    'BR',
  ], // Shorter dry season window
  COMM_09_MELON: [
    'BR',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PL',
    'TN',
    'VG',
    'BR',
    'BR',
    'BR',
  ],
  COMM_10_KELAPA_SAWIT: [
    'PN',
    'LC',
    'PF',
    'PF',
    'VG',
    'PN',
    'HC',
    'HC',
    'PF',
    'HC',
    'PF',
    'PN',
  ],
  COMM_11_ALPUKAT: [
    'PN',
    'PN',
    'BR',
    'PL',
    'VG',
    'VG',
    'GN',
    'GN',
    'VG',
    'VG',
    'PN',
    'PN',
  ],
  COMM_12_TEMBAKAU: [
    'BR',
    'BR',
    'SM',
    'PL',
    'TN',
    'VG',
    'GN',
    'PN',
    'PN',
    'BR',
    'BR',
    'BR',
  ], // Tembakau terminates earlier before rain
  COMM_13_ANGGREK: [
    'PN',
    'PN',
    'PL',
    'VG',
    'VG',
    'GN',
    'PN',
    'VG',
    'VG',
    'GN',
    'GN',
    'PN',
  ],
}
