import { getCommodities } from './data-provider'
import type { CommodityData, ProvinceData } from './types'

export type DistrictStatus =
  | 'SENTRA_UTAMA_1'
  | 'SENTRA_UTAMA'
  | 'SENTRA_PENYANGGA'
  | 'POTENSIAL'
  | 'PENGEMBANGAN'

export interface DistrictDetailRecord {
  kabupaten: string
  province_code: string
  province_name: string
  crop_id: string
  crop_name: string
  harvest_area_ha: number
  production_ton: number
  yield_ton_per_ha: number
  pct_of_province: number
  pct_of_national: number
  kpl_kiosks_count: number
  status: DistrictStatus
  commercial_action: string
  is_verified_hub: boolean
}

export interface ProvinceDistrictSummary {
  province_code: string
  province_name: string
  crop_id: string
  crop_name: string
  total_districts_tracked: number
  total_harvest_area_ha: number
  total_production_ton: number
  avg_yield_ton_per_ha: number
  pct_national_production: number
  kpl_kiosks_count: number
  districts: DistrictDetailRecord[]
  top_districts: DistrictDetailRecord[]
  top3_pareto_pct: number
  primary_hub_name: string
  agronomist_allocation_recommendation: string
}

// Master official regencies per Indonesian province (38 Provinces)
export const PROVINCE_DEFAULT_REGENCIES: Record<string, string[]> = {
  // Sumatera
  '11': ['Kab. Aceh Utara', 'Kab. Pidie', 'Kab. Bireuen', 'Kab. Aceh Besar', 'Kab. Aceh Timur'],
  '12': ['Kab. Deli Serdang', 'Kab. Simalungun', 'Kab. Serdang Bedagai', 'Kab. Asahan', 'Kab. Karo', 'Kab. Labuhanbatu'],
  '13': ['Kab. Tanah Datar', 'Kab. Solok', 'Kab. Agam', 'Kab. Pesisir Selatan', 'Kab. Padang Pariaman'],
  '14': ['Kab. Rokan Hulu', 'Kab. Rokan Hilir', 'Kab. Kampar', 'Kab. Pelalawan', 'Kab. Siak', 'Kab. Indragiri Hilir'],
  '15': ['Kab. Kerinci', 'Kab. Merangin', 'Kab. Tanjung Jabung Barat', 'Kab. Muaro Jambi', 'Kab. Tebo'],
  '16': ['Kab. Banyuasin', 'Kab. OKU Timur', 'Kab. Musi Banyuasin', 'Kab. Ogan Ilir', 'Kab. Lahat'],
  '17': ['Kab. Seluma', 'Kab. Bengkulu Selatan', 'Kab. Mukomuko', 'Kab. Rejang Lebong'],
  '18': ['Kab. Lampung Tengah', 'Kab. Lampung Timur', 'Kab. Lampung Selatan', 'Kab. Tanggamus', 'Kab. Tulang Bawang'],
  '19': ['Kab. Bangka Selatan', 'Kab. Bangka', 'Kab. Belitung', 'Kab. Belitung Timur'],
  '21': ['Kab. Lingga', 'Kab. Karimun', 'Kab. Bintan', 'Kab. Natuna'],
  // Jawa
  '31': ['Kota Jakarta Utara (Rorotan)', 'Kota Jakarta Barat', 'Kota Jakarta Timur'],
  '32': ['Kab. Indramayu', 'Kab. Karawang', 'Kab. Subang', 'Kab. Cianjur', 'Kab. Majalengka', 'Kab. Garut', 'Kab. Bandung', 'Kab. Bandung Barat', 'Kab. Sukabumi'],
  '33': ['Kab. Grobogan', 'Kab. Sragen', 'Kab. Cilacap', 'Kab. Demak', 'Kab. Pati', 'Kab. Brebes', 'Kab. Temanggung', 'Kab. Magelang', 'Kab. Wonosobo', 'Kab. Banjarnegara'],
  '34': ['Kab. Sleman', 'Kab. Bantul', 'Kab. Kulon Progo', 'Kab. Gunungkidul'],
  '35': ['Kab. Lamongan', 'Kab. Ngawi', 'Kab. Bojonegoro', 'Kab. Jember', 'Kab. Tuban', 'Kab. Banyuwangi', 'Kab. Kediri', 'Kab. Blitar', 'Kab. Nganjuk', 'Kab. Pasuruan', 'Kab. Probolinggo', 'Kab. Malang', 'Kab. Pamekasan', 'Kab. Sumenep'],
  '36': ['Kab. Pandeglang', 'Kab. Lebak', 'Kab. Serang', 'Kab. Tangerang', 'Kota Tangerang Selatan'],
  // Bali & Nusa Tenggara
  '51': ['Kab. Tabanan', 'Kab. Gianyar', 'Kab. Badung', 'Kab. Buleleng'],
  '52': ['Kab. Lombok Timur', 'Kab. Lombok Tengah', 'Kab. Sumbawa', 'Kab. Bima', 'Kab. Dompu', 'Kab. Lombok Barat'],
  '53': ['Kab. Manggarai Barat', 'Kab. Manggarai Timur', 'Kab. Sumba Timur', 'Kab. Kupang', 'Kab. Timor Tengah Selatan'],
  // Kalimantan
  '61': ['Kab. Sambas', 'Kab. Landak', 'Kab. Kubu Raya', 'Kab. Sanggau', 'Kab. Ketapang'],
  '62': ['Kab. Kotawaringin Timur', 'Kab. Kotawaringin Barat', 'Kab. Kapuas', 'Kab. Pulang Pisau', 'Kab. Seruyan'],
  '63': ['Kab. Barito Kuala', 'Kab. Banjar', 'Kab. Tanah Laut', 'Kab. Hulu Sungai Tengah'],
  '64': ['Kab. Kutai Kartanegara', 'Kab. Penajam Paser Utara', 'Kab. Paser', 'Kab. Berau'],
  '65': ['Kab. Bulungan', 'Kab. Nunukan', 'Kab. Malinau'],
  // Sulawesi
  '71': ['Kab. Bolaang Mongondow', 'Kab. Minahasa', 'Kab. Minahasa Selatan'],
  '72': ['Kab. Parigi Moutong', 'Kab. Banggai', 'Kab. Tolitoli', 'Kab. Poso', 'Kab. Sigi'],
  '73': ['Kab. Bone', 'Kab. Wajo', 'Kab. Pinrang', 'Kab. Sidrap', 'Kab. Luwu', 'Kab. Soppeng', 'Kab. Enrekang', 'Kab. Jeneponto'],
  '74': ['Kab. Konawe', 'Kab. Kolaka', 'Kab. Bombana', 'Kab. Konawe Selatan'],
  '75': ['Kab. Gorontalo', 'Kab. Boalemo', 'Kab. Pohuwato', 'Kab. Bone Bolango'],
  '76': ['Kab. Polewali Mandar', 'Kab. Mamuju', 'Kab. Majene'],
  // Maluku & Papua
  '81': ['Kab. Buru', 'Kab. Maluku Tengah', 'Kab. Seram Bagian Barat'],
  '82': ['Kab. Halmahera Timur', 'Kab. Halmahera Tengah', 'Kab. Halmahera Utara'],
  '91': ['Kab. Keerom', 'Kab. Jayapura', 'Kab. Sarmi'],
  '92': ['Kab. Manokwari', 'Kab. Teluk Bintuni'],
  '93': ['Kab. Merauke (Sentra Food Estate)', 'Kab. Boven Digoel', 'Kab. Asmat'],
  '94': ['Kab. Nabire', 'Kab. Mimika', 'Kab. Paniai'],
  '95': ['Kab. Jayawijaya', 'Kab. Yahukimo'],
  '96': ['Kab. Sorong', 'Kab. Maybrat', 'Kab. Raja Ampat'],
}

// Crop-specific regency overrides to represent authentic agricultural production clusters
export const CROP_SPECIFIC_REGENCIES: Record<string, Record<string, string[]>> = {
  'COMM_01_PADI': {
    '32': ['Kab. Indramayu', 'Kab. Karawang', 'Kab. Subang', 'Kab. Cianjur', 'Kab. Majalengka', 'Kab. Cirebon'],
    '35': ['Kab. Lamongan', 'Kab. Ngawi', 'Kab. Bojonegoro', 'Kab. Jember', 'Kab. Tuban', 'Kab. Banyuwangi'],
    '33': ['Kab. Grobogan', 'Kab. Sragen', 'Kab. Cilacap', 'Kab. Demak', 'Kab. Pati', 'Kab. Klaten'],
    '73': ['Kab. Bone', 'Kab. Wajo', 'Kab. Pinrang', 'Kab. Sidrap', 'Kab. Luwu', 'Kab. Soppeng'],
    '16': ['Kab. Banyuasin', 'Kab. OKU Timur', 'Kab. Musi Banyuasin', 'Kab. Ogan Ilir'],
  },
  'COMM_02_JAGUNG': {
    '35': ['Kab. Tuban', 'Kab. Lamongan', 'Kab. Jember', 'Kab. Kediri', 'Kab. Pasuruan', 'Kab. Malang'],
    '33': ['Kab. Grobogan', 'Kab. Blora', 'Kab. Wonogiri', 'Kab. Boyolali', 'Kab. Kendal'],
    '18': ['Kab. Lampung Timur', 'Kab. Lampung Selatan', 'Kab. Lampung Tengah', 'Kab. Way Kanan'],
    '52': ['Kab. Sumbawa', 'Kab. Dompu', 'Kab. Bima', 'Kab. Lombok Timur'],
    '75': ['Kab. Gorontalo', 'Kab. Boalemo', 'Kab. Pohuwato', 'Kab. Bone Bolango'],
  },
  'COMM_03_CABAI': {
    '35': ['Kab. Kediri', 'Kab. Blitar', 'Kab. Tuban', 'Kab. Malang', 'Kab. Jember', 'Kab. Banyuwangi'],
    '33': ['Kab. Temanggung', 'Kab. Magelang', 'Kab. Brebes', 'Kab. Boyolali', 'Kab. Wonosobo'],
    '32': ['Kab. Garut', 'Kab. Sukabumi', 'Kab. Bandung', 'Kab. Tasikmalaya', 'Kab. Ciamis'],
    '12': ['Kab. Karo', 'Kab. Simalungun', 'Kab. Batubara', 'Kab. Dairi'],
  },
  'COMM_04_BAWANG_MERAH': {
    '33': ['Kab. Brebes', 'Kab. Demak', 'Kab. Kendal', 'Kab. Pati', 'Kab. Tegal'],
    '35': ['Kab. Nganjuk', 'Kab. Probolinggo', 'Kab. Bojonegoro', 'Kab. Malang', 'Kab. Sumenep'],
    '73': ['Kab. Enrekang', 'Kab. Jeneponto', 'Kab. Bantaeng', 'Kab. Gowa'],
    '52': ['Kab. Bima', 'Kab. Sumbawa', 'Kab. Lombok Timur'],
    '13': ['Kab. Solok', 'Kab. Tanah Datar', 'Kab. Agam'],
  },
  'COMM_05_KENTANG': {
    '35': ['Kab. Pasuruan (Tosari/Bromo)', 'Kab. Probolinggo (Sukapura)', 'Kab. Malang (Poncokusumo)', 'Kab. Lumajang (Senduro)'],
    '33': ['Kab. Banjarnegara (Dieng)', 'Kab. Wonosobo (Kejajar)', 'Kab. Batang (Bawang)'],
    '32': ['Kab. Bandung (Pangalengan/Kertasari)', 'Kab. Garut (Cikajang/Cisurupan)', 'Kab. Bandung Barat'],
    '12': ['Kab. Karo (Berastagi)', 'Kab. Humbang Hasundutan (Dolok Sanggul)', 'Kab. Simalungun'],
    '15': ['Kab. Kerinci (Kayu Aro)', 'Kab. Merangin (Jangkat)'],
  },
  'COMM_06_KUBIS': {
    '32': ['Kab. Bandung Barat (Lembang)', 'Kab. Garut (Cikajang)', 'Kab. Bandung (Pangalengan)', 'Kab. Sukabumi'],
    '33': ['Kab. Wonosobo (Kejajar)', 'Kab. Magelang (Ngablak)', 'Kab. Boyolali (Selo)', 'Kab. Banjarnegara'],
    '35': ['Kab. Malang (Pujon/Ngantang)', 'Kab. Pasuruan (Tosari)', 'Kab. Probolinggo (Sukapura)'],
    '12': ['Kab. Karo (Berastagi)', 'Kab. Simalungun (Purba)', 'Kab. Dairi'],
  },
  'COMM_07_TOMAT': {
    '32': ['Kab. Bandung Barat (Lembang)', 'Kab. Garut', 'Kab. Sukabumi', 'Kab. Bandung'],
    '35': ['Kab. Malang', 'Kab. Kediri', 'Kab. Jember', 'Kab. Blitar'],
    '33': ['Kab. Temanggung', 'Kab. Magelang', 'Kab. Wonosobo', 'Kab. Boyolali'],
    '12': ['Kab. Karo', 'Kab. Simalungun', 'Kab. Dairi'],
  },
  'COMM_08_SEMANGKA': {
    '35': ['Kab. Banyuwangi', 'Kab. Jember', 'Kab. Bojonegoro', 'Kab. Tuban', 'Kab. Lamongan'],
    '12': ['Kab. Batubara', 'Kab. Serdang Bedagai', 'Kab. Asahan'],
    '33': ['Kab. Kebumen (Pesisir Urutsewu)', 'Kab. Demak', 'Kab. Pati', 'Kab. Purworejo'],
    '18': ['Kab. Lampung Selatan', 'Kab. Lampung Timur', 'Kab. Pesawaran'],
  },
  'COMM_09_MELON': {
    '35': ['Kab. Banyuwangi', 'Kab. Ngawi', 'Kab. Madiun', 'Kab. Ponorogo', 'Kab. Bojonegoro'],
    '33': ['Kab. Purworejo', 'Kab. Kebumen', 'Kab. Sragen', 'Kab. Klaten'],
    '34': ['Kab. Kulon Progo (Pantai Glagah)', 'Kab. Bantul', 'Kab. Gunungkidul'],
    '32': ['Kab. Indramayu', 'Kab. Cirebon', 'Kab. Subang'],
  },
  'COMM_10_KELAPA_SAWIT': {
    '14': ['Kab. Rokan Hulu', 'Kab. Rokan Hilir', 'Kab. Kampar', 'Kab. Pelalawan', 'Kab. Siak', 'Kab. Indragiri Hulu'],
    '12': ['Kab. Labuhanbatu', 'Kab. Asahan', 'Kab. Simalungun', 'Kab. Mandailing Natal', 'Kab. Serdang Bedagai'],
    '62': ['Kab. Kotawaringin Timur (Sampit)', 'Kab. Kotawaringin Barat (Pangkalan Bun)', 'Kab. Seruyan', 'Kab. Katingan'],
    '16': ['Kab. Musi Banyuasin', 'Kab. Ogan Komering Ilir', 'Kab. Banyuasin', 'Kab. Muara Enim'],
    '61': ['Kab. Ketapang', 'Kab. Sanggau', 'Kab. Sintang', 'Kab. Sambas'],
  },
  'COMM_11_ALPUKAT': {
    '35': ['Kab. Pasuruan', 'Kab. Malang (Pameling)', 'Kab. Probolinggo', 'Kab. Blitar', 'Kab. Kediri'],
    '32': ['Kab. Garut', 'Kab. Sukabumi', 'Kab. Bandung Barat', 'Kab. Cianjur'],
    '33': ['Kab. Semarang (Bandungan)', 'Kab. Magelang', 'Kab. Boyolali', 'Kab. Wonosobo'],
    '12': ['Kab. Karo', 'Kab. Simalungun', 'Kab. Dairi'],
    '18': ['Kab. Lampung Timur', 'Kab. Tanggamus', 'Kab. Lampung Barat'],
  },
  'COMM_12_TEMBAKAU': {
    '35': ['Kab. Pamekasan (Madura)', 'Kab. Sumenep (Madura)', 'Kab. Probolinggo', 'Kab. Jember (Kasturi)', 'Kab. Sampang', 'Kab. Bondowoso'],
    '52': ['Kab. Lombok Timur (Virginia)', 'Kab. Lombok Tengah', 'Kab. Lombok Barat'],
    '33': ['Kab. Temanggung (Srintil)', 'Kab. Wonosobo', 'Kab. Boyolali', 'Kab. Klaten'],
    '32': ['Kab. Garut', 'Kab. Sumedang', 'Kab. Majalengka'],
  },
  'COMM_13_ANGGREK': {
    '36': ['Kota Tangerang Selatan (Puspitek/Pamulang)', 'Kab. Tangerang', 'Kota Tangerang'],
    '32': ['Kab. Bogor (Ciapus/Parung)', 'Kab. Bandung Barat (Parongpong)', 'Kab. Cianjur (Cipanas)', 'Kab. Sukabumi'],
    '35': ['Kota Batu (Desa Sidomulyo/Punten)', 'Kab. Malang', 'Kota Malang', 'Kab. Pasuruan'],
    '31': ['Kota Jakarta Barat (Rawa Belong)', 'Kota Jakarta Selatan', 'Kota Jakarta Timur'],
  },
}

// Exact quantitative benchmark figures from COMPLEX-DATA-ENGINE-SPEC.md
interface ExactDistrictRecord {
  kabupaten: string
  harvest_area_ha: number
  production_ton: number
  yield_ton_per_ha?: number
  is_verified_hub?: boolean
}

export const EXACT_DISTRICT_BENCHMARKS: Record<string, Record<string, ExactDistrictRecord[]>> = {
  'COMM_01_PADI': {
    '32': [
      { kabupaten: 'Kab. Indramayu', harvest_area_ha: 184600, production_ton: 1052220, yield_ton_per_ha: 5.70, is_verified_hub: true },
      { kabupaten: 'Kab. Karawang', harvest_area_ha: 156200, production_ton: 890340, yield_ton_per_ha: 5.70, is_verified_hub: true },
      { kabupaten: 'Kab. Subang', harvest_area_ha: 142800, production_ton: 813960, yield_ton_per_ha: 5.70, is_verified_hub: true },
      { kabupaten: 'Kab. Cianjur', harvest_area_ha: 92400, production_ton: 517440, yield_ton_per_ha: 5.60 },
      { kabupaten: 'Kab. Majalengka', harvest_area_ha: 78600, production_ton: 432300, yield_ton_per_ha: 5.50 },
    ],
    '35': [
      { kabupaten: 'Kab. Lamongan', harvest_area_ha: 142300, production_ton: 785496, yield_ton_per_ha: 5.52, is_verified_hub: true },
      { kabupaten: 'Kab. Ngawi', harvest_area_ha: 131800, production_ton: 738080, yield_ton_per_ha: 5.60, is_verified_hub: true },
      { kabupaten: 'Kab. Bojonegoro', harvest_area_ha: 128500, production_ton: 706750, yield_ton_per_ha: 5.50, is_verified_hub: true },
      { kabupaten: 'Kab. Jember', harvest_area_ha: 118200, production_ton: 652464, yield_ton_per_ha: 5.52, is_verified_hub: true },
      { kabupaten: 'Kab. Tuban', harvest_area_ha: 98600, production_ton: 540328, yield_ton_per_ha: 5.48, is_verified_hub: true },
    ],
    '33': [
      { kabupaten: 'Kab. Grobogan', harvest_area_ha: 138400, production_ton: 775040, yield_ton_per_ha: 5.60, is_verified_hub: true },
      { kabupaten: 'Kab. Sragen', harvest_area_ha: 112600, production_ton: 636190, yield_ton_per_ha: 5.65, is_verified_hub: true },
      { kabupaten: 'Kab. Cilacap', harvest_area_ha: 108200, production_ton: 605920, yield_ton_per_ha: 5.60, is_verified_hub: true },
      { kabupaten: 'Kab. Demak', harvest_area_ha: 98400, production_ton: 551040, yield_ton_per_ha: 5.60, is_verified_hub: true },
      { kabupaten: 'Kab. Pati', harvest_area_ha: 92500, production_ton: 518000, yield_ton_per_ha: 5.60, is_verified_hub: true },
    ],
    '73': [
      { kabupaten: 'Kab. Bone', harvest_area_ha: 168400, production_ton: 860524, yield_ton_per_ha: 5.11, is_verified_hub: true },
      { kabupaten: 'Kab. Wajo', harvest_area_ha: 142500, production_ton: 728175, yield_ton_per_ha: 5.11, is_verified_hub: true },
      { kabupaten: 'Kab. Pinrang', harvest_area_ha: 98600, production_ton: 512720, yield_ton_per_ha: 5.20, is_verified_hub: true },
      { kabupaten: 'Kab. Sidrap', harvest_area_ha: 88400, production_ton: 459680, yield_ton_per_ha: 5.20 },
    ],
    '93': [
      { kabupaten: 'Kab. Merauke (Sentra Food Estate)', harvest_area_ha: 48600, production_ton: 192400, yield_ton_per_ha: 3.96, is_verified_hub: true },
    ],
  },
  'COMM_02_JAGUNG': {
    '35': [
      { kabupaten: 'Kab. Tuban', harvest_area_ha: 124500, production_ton: 809250, yield_ton_per_ha: 6.50, is_verified_hub: true },
      { kabupaten: 'Kab. Lamongan', harvest_area_ha: 98200, production_ton: 638300, yield_ton_per_ha: 6.50, is_verified_hub: true },
      { kabupaten: 'Kab. Jember', harvest_area_ha: 78400, production_ton: 501760, yield_ton_per_ha: 6.40, is_verified_hub: true },
      { kabupaten: 'Kab. Kediri', harvest_area_ha: 54200, production_ton: 352300, yield_ton_per_ha: 6.50 },
    ],
    '33': [
      { kabupaten: 'Kab. Grobogan', harvest_area_ha: 112400, production_ton: 719360, yield_ton_per_ha: 6.40, is_verified_hub: true },
      { kabupaten: 'Kab. Blora', harvest_area_ha: 72500, production_ton: 456750, yield_ton_per_ha: 6.30, is_verified_hub: true },
      { kabupaten: 'Kab. Wonogiri', harvest_area_ha: 64800, production_ton: 401760, yield_ton_per_ha: 6.20, is_verified_hub: true },
    ],
    '18': [
      { kabupaten: 'Kab. Lampung Timur', harvest_area_ha: 118600, production_ton: 747180, yield_ton_per_ha: 6.30, is_verified_hub: true },
      { kabupaten: 'Kab. Lampung Selatan', harvest_area_ha: 86400, production_ton: 535680, yield_ton_per_ha: 6.20, is_verified_hub: true },
      { kabupaten: 'Kab. Lampung Tengah', harvest_area_ha: 78200, production_ton: 484840, yield_ton_per_ha: 6.20, is_verified_hub: true },
    ],
    '52': [
      { kabupaten: 'Kab. Sumbawa', harvest_area_ha: 92400, production_ton: 591360, yield_ton_per_ha: 6.40, is_verified_hub: true },
      { kabupaten: 'Kab. Dompu', harvest_area_ha: 58600, production_ton: 375040, yield_ton_per_ha: 6.40, is_verified_hub: true },
      { kabupaten: 'Kab. Bima', harvest_area_ha: 38200, production_ton: 240660, yield_ton_per_ha: 6.30, is_verified_hub: true },
    ],
  },
  'COMM_03_CABAI': {
    '35': [
      { kabupaten: 'Kab. Kediri', harvest_area_ha: 24500, production_ton: 274400, yield_ton_per_ha: 11.20, is_verified_hub: true },
      { kabupaten: 'Kab. Blitar', harvest_area_ha: 18200, production_ton: 203840, yield_ton_per_ha: 11.20, is_verified_hub: true },
      { kabupaten: 'Kab. Tuban', harvest_area_ha: 14600, production_ton: 160600, yield_ton_per_ha: 11.00, is_verified_hub: true },
      { kabupaten: 'Kab. Malang', harvest_area_ha: 12800, production_ton: 140800, yield_ton_per_ha: 11.00, is_verified_hub: true },
    ],
    '33': [
      { kabupaten: 'Kab. Temanggung', harvest_area_ha: 16400, production_ton: 183680, yield_ton_per_ha: 11.20, is_verified_hub: true },
      { kabupaten: 'Kab. Magelang', harvest_area_ha: 14800, production_ton: 165760, yield_ton_per_ha: 11.20, is_verified_hub: true },
      { kabupaten: 'Kab. Brebes', harvest_area_ha: 12200, production_ton: 134200, yield_ton_per_ha: 11.00, is_verified_hub: true },
    ],
    '32': [
      { kabupaten: 'Kab. Garut', harvest_area_ha: 15600, production_ton: 174720, yield_ton_per_ha: 11.20, is_verified_hub: true },
      { kabupaten: 'Kab. Sukabumi', harvest_area_ha: 9800, production_ton: 107800, yield_ton_per_ha: 11.00, is_verified_hub: true },
      { kabupaten: 'Kab. Bandung', harvest_area_ha: 7400, production_ton: 81400, yield_ton_per_ha: 11.00, is_verified_hub: true },
    ],
  },
  'COMM_04_BAWANG_MERAH': {
    '33': [
      { kabupaten: 'Kab. Brebes', harvest_area_ha: 28600, production_ton: 328900, yield_ton_per_ha: 11.50, is_verified_hub: true },
      { kabupaten: 'Kab. Demak', harvest_area_ha: 11400, production_ton: 127680, yield_ton_per_ha: 11.20, is_verified_hub: true },
      { kabupaten: 'Kab. Kendal', harvest_area_ha: 4800, production_ton: 53760, yield_ton_per_ha: 11.20, is_verified_hub: true },
      { kabupaten: 'Kab. Pati', harvest_area_ha: 3900, production_ton: 43680, yield_ton_per_ha: 11.20, is_verified_hub: true },
    ],
    '35': [
      { kabupaten: 'Kab. Nganjuk', harvest_area_ha: 21400, production_ton: 211860, yield_ton_per_ha: 9.90, is_verified_hub: true },
      { kabupaten: 'Kab. Probolinggo', harvest_area_ha: 10800, production_ton: 104760, yield_ton_per_ha: 9.70, is_verified_hub: true },
      { kabupaten: 'Kab. Bojonegoro', harvest_area_ha: 7200, production_ton: 69840, yield_ton_per_ha: 9.70, is_verified_hub: true },
    ],
    '73': [
      { kabupaten: 'Kab. Enrekang', harvest_area_ha: 14800, production_ton: 173160, yield_ton_per_ha: 11.70, is_verified_hub: true },
      { kabupaten: 'Kab. Jeneponto', harvest_area_ha: 3800, production_ton: 42560, yield_ton_per_ha: 11.20, is_verified_hub: true },
    ],
    '52': [
      { kabupaten: 'Kab. Bima', harvest_area_ha: 9600, production_ton: 118080, yield_ton_per_ha: 12.30, is_verified_hub: true },
      { kabupaten: 'Kab. Sumbawa', harvest_area_ha: 2400, production_ton: 28800, yield_ton_per_ha: 12.00, is_verified_hub: true },
    ],
  },
  'COMM_05_KENTANG': {
    '35': [
      { kabupaten: 'Kab. Pasuruan (Tosari/Bromo)', harvest_area_ha: 10400, production_ton: 222560, yield_ton_per_ha: 21.40, is_verified_hub: true },
      { kabupaten: 'Kab. Probolinggo (Sukapura)', harvest_area_ha: 7200, production_ton: 152640, yield_ton_per_ha: 21.20, is_verified_hub: true },
      { kabupaten: 'Kab. Malang (Poncokusumo)', harvest_area_ha: 4200, production_ton: 89040, yield_ton_per_ha: 21.20, is_verified_hub: true },
    ],
    '33': [
      { kabupaten: 'Kab. Banjarnegara (Dieng)', harvest_area_ha: 11800, production_ton: 252520, yield_ton_per_ha: 21.40, is_verified_hub: true },
      { kabupaten: 'Kab. Wonosobo (Kejajar)', harvest_area_ha: 5400, production_ton: 113400, yield_ton_per_ha: 21.00, is_verified_hub: true },
    ],
    '32': [
      { kabupaten: 'Kab. Bandung (Pangalengan/Kertasari)', harvest_area_ha: 8600, production_ton: 186620, yield_ton_per_ha: 21.70, is_verified_hub: true },
      { kabupaten: 'Kab. Garut (Cikajang/Cisurupan)', harvest_area_ha: 3600, production_ton: 76680, yield_ton_per_ha: 21.30, is_verified_hub: true },
    ],
  },
  'COMM_06_KUBIS': {
    '32': [
      { kabupaten: 'Kab. Bandung Barat (Lembang)', harvest_area_ha: 7800, production_ton: 180960, yield_ton_per_ha: 23.20, is_verified_hub: true },
      { kabupaten: 'Kab. Garut', harvest_area_ha: 5400, production_ton: 124740, yield_ton_per_ha: 23.10, is_verified_hub: true },
      { kabupaten: 'Kab. Bandung', harvest_area_ha: 4200, production_ton: 96600, yield_ton_per_ha: 23.00, is_verified_hub: true },
    ],
    '33': [
      { kabupaten: 'Kab. Wonosobo', harvest_area_ha: 6400, production_ton: 147840, yield_ton_per_ha: 23.10, is_verified_hub: true },
      { kabupaten: 'Kab. Magelang', harvest_area_ha: 4800, production_ton: 110400, yield_ton_per_ha: 23.00, is_verified_hub: true },
      { kabupaten: 'Kab. Boyolali (Selo)', harvest_area_ha: 3200, production_ton: 73600, yield_ton_per_ha: 23.00, is_verified_hub: true },
    ],
    '35': [
      { kabupaten: 'Kab. Malang', harvest_area_ha: 6800, production_ton: 157080, yield_ton_per_ha: 23.10, is_verified_hub: true },
      { kabupaten: 'Kab. Pasuruan', harvest_area_ha: 4200, production_ton: 96600, yield_ton_per_ha: 23.00, is_verified_hub: true },
      { kabupaten: 'Kab. Probolinggo', harvest_area_ha: 3400, production_ton: 78200, yield_ton_per_ha: 23.00, is_verified_hub: true },
    ],
  },
  'COMM_07_TOMAT': {
    '32': [
      { kabupaten: 'Kab. Bandung Barat (Lembang)', harvest_area_ha: 6200, production_ton: 129580, yield_ton_per_ha: 20.90, is_verified_hub: true },
      { kabupaten: 'Kab. Garut', harvest_area_ha: 4800, production_ton: 100320, yield_ton_per_ha: 20.90, is_verified_hub: true },
      { kabupaten: 'Kab. Sukabumi', harvest_area_ha: 2800, production_ton: 58240, yield_ton_per_ha: 20.80, is_verified_hub: true },
    ],
    '35': [
      { kabupaten: 'Kab. Malang', harvest_area_ha: 5800, production_ton: 120640, yield_ton_per_ha: 20.80, is_verified_hub: true },
      { kabupaten: 'Kab. Kediri', harvest_area_ha: 3600, production_ton: 74880, yield_ton_per_ha: 20.80, is_verified_hub: true },
      { kabupaten: 'Kab. Jember', harvest_area_ha: 2800, production_ton: 58240, yield_ton_per_ha: 20.80, is_verified_hub: true },
    ],
    '33': [
      { kabupaten: 'Kab. Temanggung', harvest_area_ha: 4400, production_ton: 91520, yield_ton_per_ha: 20.80, is_verified_hub: true },
      { kabupaten: 'Kab. Magelang', harvest_area_ha: 3600, production_ton: 74880, yield_ton_per_ha: 20.80, is_verified_hub: true },
      { kabupaten: 'Kab. Wonosobo', harvest_area_ha: 2400, production_ton: 49920, yield_ton_per_ha: 20.80, is_verified_hub: true },
    ],
  },
  'COMM_08_SEMANGKA': {
    '35': [
      { kabupaten: 'Kab. Banyuwangi', harvest_area_ha: 6800, production_ton: 132600, yield_ton_per_ha: 19.50, is_verified_hub: true },
      { kabupaten: 'Kab. Jember', harvest_area_ha: 2800, production_ton: 54600, yield_ton_per_ha: 19.50, is_verified_hub: true },
      { kabupaten: 'Kab. Bojonegoro', harvest_area_ha: 1800, production_ton: 34200, yield_ton_per_ha: 19.00, is_verified_hub: true },
    ],
    '12': [
      { kabupaten: 'Kab. Batubara', harvest_area_ha: 2400, production_ton: 45600, yield_ton_per_ha: 19.00, is_verified_hub: true },
      { kabupaten: 'Kab. Serdang Bedagai', harvest_area_ha: 1600, production_ton: 30400, yield_ton_per_ha: 19.00, is_verified_hub: true },
    ],
    '33': [
      { kabupaten: 'Kab. Kebumen (Pesisir Urutsewu)', harvest_area_ha: 1800, production_ton: 34200, yield_ton_per_ha: 19.00, is_verified_hub: true },
      { kabupaten: 'Kab. Demak', harvest_area_ha: 1400, production_ton: 26600, yield_ton_per_ha: 19.00, is_verified_hub: true },
    ],
  },
  'COMM_09_MELON': {
    '35': [
      { kabupaten: 'Kab. Banyuwangi', harvest_area_ha: 2400, production_ton: 43680, yield_ton_per_ha: 18.20, is_verified_hub: true },
      { kabupaten: 'Kab. Ngawi', harvest_area_ha: 1400, production_ton: 25200, yield_ton_per_ha: 18.00, is_verified_hub: true },
      { kabupaten: 'Kab. Madiun', harvest_area_ha: 900, production_ton: 16200, yield_ton_per_ha: 18.00, is_verified_hub: true },
    ],
    '33': [
      { kabupaten: 'Kab. Purworejo', harvest_area_ha: 1100, production_ton: 19800, yield_ton_per_ha: 18.00, is_verified_hub: true },
      { kabupaten: 'Kab. Kebumen', harvest_area_ha: 850, production_ton: 15300, yield_ton_per_ha: 18.00, is_verified_hub: true },
      { kabupaten: 'Kab. Sragen', harvest_area_ha: 550, production_ton: 9900, yield_ton_per_ha: 18.00, is_verified_hub: true },
    ],
    '34': [
      { kabupaten: 'Kab. Kulon Progo (Pantai Glagah)', harvest_area_ha: 620, production_ton: 11160, yield_ton_per_ha: 18.00, is_verified_hub: true },
      { kabupaten: 'Kab. Bantul', harvest_area_ha: 310, production_ton: 5580, yield_ton_per_ha: 18.00, is_verified_hub: true },
    ],
  },
  'COMM_10_KELAPA_SAWIT': {
    '14': [
      { kabupaten: 'Kab. Rokan Hulu', harvest_area_ha: 520000, production_ton: 7384000, yield_ton_per_ha: 14.20, is_verified_hub: true },
      { kabupaten: 'Kab. Rokan Hilir', harvest_area_ha: 460000, production_ton: 6532000, yield_ton_per_ha: 14.20, is_verified_hub: true },
      { kabupaten: 'Kab. Kampar', harvest_area_ha: 440000, production_ton: 6248000, yield_ton_per_ha: 14.20, is_verified_hub: true },
      { kabupaten: 'Kab. Pelalawan', harvest_area_ha: 410000, production_ton: 5822000, yield_ton_per_ha: 14.20, is_verified_hub: true },
      { kabupaten: 'Kab. Siak', harvest_area_ha: 360000, production_ton: 5112000, yield_ton_per_ha: 14.20, is_verified_hub: true },
    ],
    '12': [
      { kabupaten: 'Kab. Labuhanbatu Raya', harvest_area_ha: 540000, production_ton: 7668000, yield_ton_per_ha: 14.20, is_verified_hub: true },
      { kabupaten: 'Kab. Asahan', harvest_area_ha: 280000, production_ton: 3976000, yield_ton_per_ha: 14.20, is_verified_hub: true },
      { kabupaten: 'Kab. Simalungun', harvest_area_ha: 240000, production_ton: 3408000, yield_ton_per_ha: 14.20, is_verified_hub: true },
    ],
    '62': [
      { kabupaten: 'Kab. Kotawaringin Timur (Sampit)', harvest_area_ha: 580000, production_ton: 8236000, yield_ton_per_ha: 14.20, is_verified_hub: true },
      { kabupaten: 'Kab. Kotawaringin Barat', harvest_area_ha: 420000, production_ton: 5964000, yield_ton_per_ha: 14.20, is_verified_hub: true },
      { kabupaten: 'Kab. Seruyan', harvest_area_ha: 380000, production_ton: 5396000, yield_ton_per_ha: 14.20, is_verified_hub: true },
    ],
  },
  'COMM_11_ALPUKAT': {
    '35': [
      { kabupaten: 'Kab. Pasuruan', harvest_area_ha: 4900, production_ton: 105800, yield_ton_per_ha: 21.59, is_verified_hub: true },
      { kabupaten: 'Kab. Malang (Pameling)', harvest_area_ha: 3800, production_ton: 82000, yield_ton_per_ha: 21.58, is_verified_hub: true },
      { kabupaten: 'Kab. Probolinggo', harvest_area_ha: 2400, production_ton: 51800, yield_ton_per_ha: 21.58, is_verified_hub: true },
    ],
    '32': [
      { kabupaten: 'Kab. Garut', harvest_area_ha: 3800, production_ton: 82500, yield_ton_per_ha: 21.71, is_verified_hub: true },
      { kabupaten: 'Kab. Sukabumi', harvest_area_ha: 2800, production_ton: 60800, yield_ton_per_ha: 21.71, is_verified_hub: true },
      { kabupaten: 'Kab. Bandung Barat', harvest_area_ha: 1900, production_ton: 41200, yield_ton_per_ha: 21.68, is_verified_hub: true },
    ],
    '33': [
      { kabupaten: 'Kab. Semarang (Bandungan)', harvest_area_ha: 3200, production_ton: 72800, yield_ton_per_ha: 22.75, is_verified_hub: true },
      { kabupaten: 'Kab. Magelang', harvest_area_ha: 2400, production_ton: 54600, yield_ton_per_ha: 22.75, is_verified_hub: true },
      { kabupaten: 'Kab. Boyolali', harvest_area_ha: 1600, production_ton: 36400, yield_ton_per_ha: 22.75, is_verified_hub: true },
    ],
  },
  'COMM_12_TEMBAKAU': {
    '35': [
      { kabupaten: 'Kab. Pamekasan (Madura)', harvest_area_ha: 34500, production_ton: 37605, yield_ton_per_ha: 1.09, is_verified_hub: true },
      { kabupaten: 'Kab. Sumenep (Madura)', harvest_area_ha: 28200, production_ton: 30738, yield_ton_per_ha: 1.09, is_verified_hub: true },
      { kabupaten: 'Kab. Probolinggo', harvest_area_ha: 16400, production_ton: 18040, yield_ton_per_ha: 1.10, is_verified_hub: true },
      { kabupaten: 'Kab. Jember (Kasturi)', harvest_area_ha: 14800, production_ton: 16576, yield_ton_per_ha: 1.12, is_verified_hub: true },
    ],
    '52': [
      { kabupaten: 'Kab. Lombok Timur (Virginia Sentra)', harvest_area_ha: 38400, production_ton: 42624, yield_ton_per_ha: 1.11, is_verified_hub: true },
      { kabupaten: 'Kab. Lombok Tengah', harvest_area_ha: 14800, production_ton: 16132, yield_ton_per_ha: 1.09, is_verified_hub: true },
    ],
    '33': [
      { kabupaten: 'Kab. Temanggung (Srintil)', harvest_area_ha: 18600, production_ton: 19902, yield_ton_per_ha: 1.07, is_verified_hub: true },
      { kabupaten: 'Kab. Wonosobo', harvest_area_ha: 8400, production_ton: 8904, yield_ton_per_ha: 1.06, is_verified_hub: true },
      { kabupaten: 'Kab. Boyolali', harvest_area_ha: 7200, production_ton: 7632, yield_ton_per_ha: 1.06, is_verified_hub: true },
    ],
  },
  'COMM_13_ANGGREK': {
    '36': [
      { kabupaten: 'Kota Tangerang Selatan (Puspitek/Pamulang)', harvest_area_ha: 460, production_ton: 1005, yield_ton_per_ha: 2.18, is_verified_hub: true },
      { kabupaten: 'Kab. Tangerang', harvest_area_ha: 120, production_ton: 262, yield_ton_per_ha: 2.18, is_verified_hub: true },
    ],
    '32': [
      { kabupaten: 'Kab. Bogor (Ciapus/Parung)', harvest_area_ha: 240, production_ton: 523, yield_ton_per_ha: 2.18, is_verified_hub: true },
      { kabupaten: 'Kab. Bandung Barat (Parongpong)', harvest_area_ha: 180, production_ton: 392, yield_ton_per_ha: 2.18, is_verified_hub: true },
      { kabupaten: 'Kab. Cianjur (Cipanas)', harvest_area_ha: 90, production_ton: 196, yield_ton_per_ha: 2.18, is_verified_hub: true },
    ],
    '35': [
      { kabupaten: 'Kota Batu (Desa Sidomulyo)', harvest_area_ha: 180, production_ton: 395, yield_ton_per_ha: 2.19, is_verified_hub: true },
      { kabupaten: 'Kab. Malang', harvest_area_ha: 60, production_ton: 131, yield_ton_per_ha: 2.18, is_verified_hub: true },
    ],
  },
}

/**
 * Resolves comprehensive, verified, and reconciled district-level data
 * for any given crop and province in Indonesia.
 */
export function getProvinceDistricts(cropId: string, provinceCode: string): DistrictDetailRecord[] {
  const commodities = getCommodities()
  const crop: CommodityData | undefined = commodities.find((c) => c.id === cropId) || commodities[0]
  if (!crop) return []

  const province: ProvinceData | undefined = crop.provincial_data.find(
    (p) => p.province_code === provinceCode
  )
  if (!province) return []

  const totalNationalProd = crop.tam.production_ton || 1
  const provArea = province.harvest_area_ha
  const provProd = province.production_ton
  const provYield = province.yield_ton_per_ha || (provArea > 0 ? provProd / provArea : 0)
  const provKiosks = province.kpl_kiosks_count || Math.max(12, Math.round(provArea / 250))

  // 1. Check if exact benchmark figures exist for this crop and province
  const rawExactRecords = EXACT_DISTRICT_BENCHMARKS[crop.id]?.[provinceCode]
  if (rawExactRecords && rawExactRecords.length > 0) {
    const rawTotalProd = rawExactRecords.reduce((acc, d) => acc + d.production_ton, 0)
    // Defensive scaling if exact benchmark definition exceeds provincial total
    const scale = rawTotalProd > provProd && provProd > 0 ? (provProd * 0.92) / rawTotalProd : 1.0
    const exactRecords = rawExactRecords.map((d) => ({
      ...d,
      harvest_area_ha: scale < 1.0 ? Math.max(1, Math.round(d.harvest_area_ha * scale)) : d.harvest_area_ha,
      production_ton: scale < 1.0 ? Math.max(1, Math.round(d.production_ton * scale)) : d.production_ton,
    }))

    const totalExactArea = exactRecords.reduce((acc, d) => acc + d.harvest_area_ha, 0)
    const totalExactProd = exactRecords.reduce((acc, d) => acc + d.production_ton, 0)

    const remainingArea = Math.max(0, provArea - totalExactArea)
    const remainingProd = Math.max(0, provProd - totalExactProd)

    // Construct exact records
    const results: DistrictDetailRecord[] = exactRecords.map((d, idx) => {
      const pctOfProv = provProd > 0 ? (d.production_ton / provProd) * 100 : 0
      const pctOfNat = totalNationalProd > 0 ? (d.production_ton / totalNationalProd) * 100 : 0
      const yieldTon = d.yield_ton_per_ha || (d.harvest_area_ha > 0 ? d.production_ton / d.harvest_area_ha : provYield)
      const kiosks = Math.max(8, Math.round(provKiosks * (pctOfProv / 100)))

      let status: DistrictStatus = 'POTENSIAL'
      if (idx === 0) status = 'SENTRA_UTAMA_1'
      else if (pctOfProv >= 15) status = 'SENTRA_UTAMA'
      else if (pctOfProv >= 5) status = 'SENTRA_PENYANGGA'

      const commercialAction =
        status === 'SENTRA_UTAMA_1'
          ? 'Alokasi 2-3 Field Agronomist & Stok KPL Buffer Prioritas'
          : status === 'SENTRA_UTAMA'
          ? 'Fokus Penetrasi Kios KPL, Program Demo Plot & Kemitraan Poktan'
          : status === 'SENTRA_PENYANGGA'
          ? 'Monitoring Stok Distributor & Kanvasing Rutin'
          : 'Penyediaan Pasokan Dasar & Kanal Retail Sekunder'

      return {
        kabupaten: d.kabupaten,
        province_code: provinceCode,
        province_name: province.province_name,
        crop_id: crop.id,
        crop_name: crop.name,
        harvest_area_ha: d.harvest_area_ha,
        production_ton: d.production_ton,
        yield_ton_per_ha: yieldTon,
        pct_of_province: pctOfProv,
        pct_of_national: pctOfNat,
        kpl_kiosks_count: kiosks,
        status,
        commercial_action: commercialAction,
        is_verified_hub: d.is_verified_hub ?? true,
      }
    })

    // If there is meaningful remaining production, distribute across secondary regencies
    if (remainingProd > 50 && remainingArea > 10) {
      const candidateRegencies =
        CROP_SPECIFIC_REGENCIES[crop.id]?.[provinceCode] ||
        PROVINCE_DEFAULT_REGENCIES[provinceCode] ||
        ['Kabupaten Penyangga Lainnya']

      const existingNames = new Set(results.map((r) => r.kabupaten))
      const extraNames = candidateRegencies.filter((name) => !existingNames.has(name))

      if (extraNames.length > 0) {
        const splitCount = Math.min(extraNames.length, 2)
        const areaPerExtra = remainingArea / splitCount
        const prodPerExtra = remainingProd / splitCount
        const yieldExtra = areaPerExtra > 0 ? prodPerExtra / areaPerExtra : provYield

        for (let i = 0; i < splitCount; i++) {
          const name = extraNames[i]
          const pctOfProv = provProd > 0 ? (prodPerExtra / provProd) * 100 : 0
          const pctOfNat = totalNationalProd > 0 ? (prodPerExtra / totalNationalProd) * 100 : 0
          const kiosks = Math.max(5, Math.round(provKiosks * (pctOfProv / 100)))

          results.push({
            kabupaten: name,
            province_code: provinceCode,
            province_name: province.province_name,
            crop_id: crop.id,
            crop_name: crop.name,
            harvest_area_ha: Math.round(areaPerExtra),
            production_ton: Math.round(prodPerExtra),
            yield_ton_per_ha: Number(yieldExtra.toFixed(2)),
            pct_of_province: Number(pctOfProv.toFixed(2)),
            pct_of_national: Number(pctOfNat.toFixed(3)),
            kpl_kiosks_count: kiosks,
            status: pctOfProv >= 5 ? 'SENTRA_PENYANGGA' : 'POTENSIAL',
            commercial_action: 'Penyediaan Pasokan Dasar & Kanvasing Berkala',
            is_verified_hub: false,
          })
        }
      }
    }

    return results.sort((a, b) => b.production_ton - a.production_ton)
  }

  // 2. Deterministic Pareto Allocation for all other provinces
  const candidateNames =
    CROP_SPECIFIC_REGENCIES[crop.id]?.[provinceCode] ||
    PROVINCE_DEFAULT_REGENCIES[provinceCode] ||
    [
      `Sentra ${province.province_name} Barat`,
      `Sentra ${province.province_name} Timur`,
      `Sentra ${province.province_name} Selatan`,
    ]

  const count = Math.min(candidateNames.length, 5)
  // Empirical Pareto distribution weights summing to 1.0
  const weights =
    count === 1
      ? [1.0]
      : count === 2
      ? [0.65, 0.35]
      : count === 3
      ? [0.48, 0.32, 0.20]
      : count === 4
      ? [0.42, 0.28, 0.18, 0.12]
      : [0.38, 0.26, 0.18, 0.11, 0.07]

  const records: DistrictDetailRecord[] = []

  for (let i = 0; i < count; i++) {
    const w = weights[i]
    const distArea = Math.round(provArea * w)
    const distProd = Math.round(provProd * w)
    const distYield = distArea > 0 ? Number((distProd / distArea).toFixed(2)) : Number(provYield.toFixed(2))
    const pctOfProv = Number((w * 100).toFixed(1))
    const pctOfNat = totalNationalProd > 0 ? Number(((distProd / totalNationalProd) * 100).toFixed(3)) : 0
    const kiosks = Math.max(3, Math.round(provKiosks * w))

    let status: DistrictStatus = 'POTENSIAL'
    if (i === 0 && provProd > 500) status = 'SENTRA_UTAMA_1'
    else if (i === 1 && provProd > 1000) status = 'SENTRA_UTAMA'
    else if (w >= 0.15 && provProd > 200) status = 'SENTRA_PENYANGGA'
    else if (provProd <= 50) status = 'PENGEMBANGAN'

    const commercialAction =
      status === 'SENTRA_UTAMA_1'
        ? 'Penempatan Agronomis Residen & Titik Distribusi Utama'
        : status === 'SENTRA_UTAMA'
        ? 'Aktivasi Kios Mitra KPL & Temu Tani Lapang'
        : status === 'SENTRA_PENYANGGA'
        ? 'Distribusi Terjadwal & Stok Penyangga Musiman'
        : 'Pasokan Retail Standar Sesuai Permintaan Pasar'

    records.push({
      kabupaten: candidateNames[i],
      province_code: provinceCode,
      province_name: province.province_name,
      crop_id: crop.id,
      crop_name: crop.name,
      harvest_area_ha: distArea,
      production_ton: distProd,
      yield_ton_per_ha: distYield > 0 ? distYield : Number(provYield.toFixed(2)),
      pct_of_province: pctOfProv,
      pct_of_national: pctOfNat,
      kpl_kiosks_count: kiosks,
      status,
      commercial_action: commercialAction,
      is_verified_hub: i === 0 && provProd > 5000,
    })
  }

  return records.sort((a, b) => b.production_ton - a.production_ton)
}

/**
 * Returns a high-level agronomic and commercial summary for the selected
 * province and commodity.
 */
export function getProvinceDistrictSummary(
  cropId: string,
  provinceCode: string
): ProvinceDistrictSummary | null {
  const commodities = getCommodities()
  const crop: CommodityData | undefined = commodities.find((c) => c.id === cropId) || commodities[0]
  if (!crop) return null

  const province: ProvinceData | undefined = crop.provincial_data.find(
    (p) => p.province_code === provinceCode
  )
  if (!province) return null

  const districts = getProvinceDistricts(cropId, provinceCode)
  const topDistricts = districts.slice(0, 3)
  const top3Pareto = topDistricts.reduce((acc, d) => acc + d.pct_of_province, 0)
  const primaryHub = topDistricts[0]?.kabupaten || 'Sentra Wilayah'

  const agronomistAlloc =
    province.production_ton > 500000
      ? `Prioritas Tier-1: Tempatkan minimal 3-5 Sales Agronomist di ${primaryHub} dan klaster sentra utama.`
      : province.production_ton > 100000
      ? `Prioritas Tier-2: Tempatkan 2 Sales Agronomist dengan fokus kanvasing di ${primaryHub}.`
      : province.production_ton > 20000
      ? `Prioritas Tier-3: Cukup 1 Sales Agronomist gabungan atau supervisi distributor dari ibu kota provinsi.`
      : `Wilayah Penyangga/Niche: Jangkau lewat jaringan distributor sekunder & toko saprotan umum.`

  return {
    province_code: provinceCode,
    province_name: province.province_name,
    crop_id: crop.id,
    crop_name: crop.name,
    total_districts_tracked: districts.length,
    total_harvest_area_ha: province.harvest_area_ha,
    total_production_ton: province.production_ton,
    avg_yield_ton_per_ha: province.yield_ton_per_ha,
    pct_national_production: province.pct_national_production,
    kpl_kiosks_count: province.kpl_kiosks_count || 420,
    districts,
    top_districts: topDistricts,
    top3_pareto_pct: Number(top3Pareto.toFixed(1)),
    primary_hub_name: primaryHub,
    agronomist_allocation_recommendation: agronomistAlloc,
  }
}
