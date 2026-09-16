import { type TaskItem, tasks } from './tasks'
import { type Task } from './schema'

export interface RecommendedInput {
  name: string
  activeIngredient: string
  dosage: string
  timing: string
}

export interface FieldLog {
  id: string
  date: string
  author: string
  role: string
  note: string
}

export interface TaskDetailFull {
  id: string
  title: string
  status: 'backlog' | 'todo' | 'in progress' | 'done' | 'canceled'
  label: 'demoplot' | 'kios_kpl' | 'opt_hama' | 'distribusi' | 'ads_leads' | 'feature' | 'bug' | 'documentation'
  priority: 'low' | 'medium' | 'high' | 'critical'
  createdAt: Date
  updatedAt: Date
  dueDate: Date
  assignee: string
  assigneeRole: string
  assigneePhone: string
  location: string
  commodity: string
  commodityId: string
  description: string
  budget_idr: number
  targetMetric: string
  farmerGroup: string
  kioskPartner: string
  urgencyRationale: string
  recommendedInputs: RecommendedInput[]
  standardOperatingProcedure: string[]
  fieldLogs: FieldLog[]
  dispatchWhatsAppMessage: string
}

// Map common crop names to Agrimarket commodity IDs
const CROP_ID_MAP: Record<string, string> = {
  Padi: 'COMM_01_PADI',
  Jagung: 'COMM_02_JAGUNG',
  Cabai: 'COMM_03_CABAI',
  'Cabai Rawit': 'COMM_03_CABAI',
  'Cabai Merah': 'COMM_03_CABAI',
  'Bawang Merah': 'COMM_04_BAWANG_MERAH',
  Kentang: 'COMM_05_KENTANG',
  Kubis: 'COMM_06_KUBIS',
  Tomat: 'COMM_07_TOMAT',
  Semangka: 'COMM_08_SEMANGKA',
  Melon: 'COMM_09_MELON',
  'Kelapa Sawit': 'COMM_10_KELAPA_SAWIT',
  Sawit: 'COMM_10_KELAPA_SAWIT',
  Alpukat: 'COMM_11_ALPUKAT',
  Tembakau: 'COMM_12_TEMBAKAU',
  Anggrek: 'COMM_13_ANGGREK',
}

export function getTaskDetailedInfo(taskOrId: TaskItem | Task | string): TaskDetailFull {
  let baseTask: TaskItem | undefined

  if (typeof taskOrId === 'string') {
    baseTask = tasks.find((t) => t.id === taskOrId)
  } else {
    baseTask = tasks.find((t) => t.id === taskOrId.id) || (taskOrId as unknown as TaskItem)
  }

  if (!baseTask) {
    baseTask = tasks[0]
  }

  const commodity = baseTask.commodity || 'Cabai Rawit'
  const commodityId = CROP_ID_MAP[commodity] || 'COMM_03_CABAI'
  const location = baseTask.location || 'Jawa Tengah'
  const assignee = baseTask.assignee || 'Budi Santoso, S.P.'
  const assigneeRole = baseTask.assigneeRole || 'Senior Field Agronomist'

  // Dynamic realistic data based on label & commodity
  let budget: number
  let farmerGroup: string
  let kioskPartner: string
  let targetMetric: string
  let urgencyRationale: string
  let recommendedInputs: RecommendedInput[]
  let standardOperatingProcedure: string[]
  let fieldLogs: FieldLog[]

  switch (baseTask.label) {
    case 'demoplot':
      budget = 5500000
      farmerGroup = `Poktan Subur Sentosa (${location})`
      kioskPartner = `Kios Tani Unggul (${location.split(',')[0] || 'Kecamatan'})`
      targetMetric = 'Peningkatan tonase panen +18% vs petak kontrol tanpa aplikasi berimbang'
      urgencyRationale = 'Demoplot merupakan pembuktian visual paling efektif untuk meyakinkan petani sekitar dan mengunci PO dari kios KPL setempat.'
      recommendedInputs = [
        {
          name: 'Fungisida Sistemik Dual-Action',
          activeIngredient: 'Azoksistrobin 200 g/l + Difenokonazol 125 g/l',
          dosage: '1.25 ml/L air (20 ml per tangki 16L)',
          timing: 'Penyemprotan pagi hari pukul 06.00 - 08.30 WIB saat stomata terbuka',
        },
        {
          name: 'Pupuk Mikro Kalsium-Boron Soluble',
          activeIngredient: 'Ca 16% + B 2.5% Chelate',
          dosage: '2.0 g/L air (32 g per tangki 16L)',
          timing: 'Fase antesis pembungaan aktif untuk mencegah kerontokan pentil',
        },
      ]
      standardOperatingProcedure = [
        'Ukur pH dan konduktivitas (EC) air pelarut; pastikan pH berada di rentang 6.0 - 6.8.',
        'Lakukan pencampuran formulasi dengan metode pre-mix dalam ember kecil sebelum dituangkan ke tangki semprot.',
        'Gunakan nozel kerucut (cone nozzle) dengan tekanan 3.0 bar untuk menghasilkan droplet halus merata.',
        'Semprotkan merata ke seluruh kanopi daun atas, permukaan bawah daun, serta tangkai buah.',
        'Ambil dokumentasi foto time-lapse georeferenced (GPS tag) untuk laporan ubinan Temu Lapang.',
      ]
      fieldLogs = [
        {
          id: 'LOG-1',
          date: '13 Sep 2026',
          author: assignee,
          role: assigneeRole,
          note: 'Aplikasi tahap evaluasi vegetatif selesai dilakukan bersama 8 perwakilan anggota poktan.',
        },
        {
          id: 'LOG-2',
          date: '06 Sep 2026',
          author: 'Sistem Integrasi Lapangan',
          role: 'Audit System',
          note: 'Plot demoplot berhasil dipetakan pada sistem spasial Agrimarket Geospatial Engine.',
        },
      ]
      break

    case 'opt_hama':
      budget = 7800000
      farmerGroup = `Gabungan Kelompok Tani (Gapoktan) Wilayah ${location}`
      kioskPartner = `Kios Mitra Tani Mandiri (${location})`
      targetMetric = 'Penurunan populasi hama/penyakit > 80% dalam 72 jam pasca tanggap darurat'
      urgencyRationale = 'Serangan OPT berpotensi meluas secara eksponensial ke radius 5 km jika tidak dikendalikan dalam jendela kritis 48 jam.'
      recommendedInputs = [
        {
          name: 'Insektisida Translaminar / Ovisida',
          activeIngredient: 'Klorantraniliprol 50 g/l + Tiametoksam 200 g/l',
          dosage: '1.5 ml/L air (24 ml per tangki 16L)',
          timing: 'Aplikasi sore hari pukul 15.30 - 17.30 WIB saat larva aktif bergerak',
        },
        {
          name: 'Surfaktan Penembus Jaringan & Perata',
          activeIngredient: 'Polyalkylene Oxide Organosilicone 100%',
          dosage: '0.5 ml/L air (8 ml per tangki 16L)',
          timing: 'Dicampurkan terakhir setelah semua pestisida terlarut sempurna',
        },
      ]
      standardOperatingProcedure = [
        'Lakukan sweeping petak sampel untuk menghitung ambang batas ekonomi (populasi per rumpun/tanaman).',
        'Pasang perangkap kuning berperekat (yellow trap) dan feromon monitoring di 4 penjuru angin petak sawah/kebun.',
        'Instruksikan penyemprotan massal serentak bersama kelompok tani untuk menghindari efek relokasi hama ke petak sebelah.',
        'Evaluasi mortalitas hama setelah 24, 48, dan 72 jam pasca penyemprotan.',
        'Rilis laporan eskalasi ke Koordinator PBT/POPT Dinas Pertanian setempat.',
      ]
      fieldLogs = [
        {
          id: 'LOG-1',
          date: '14 Sep 2026',
          author: assignee,
          role: assigneeRole,
          note: 'Penyemprotan tanggap darurat blok A dan B seluas 4.5 hektar telah rampung dengan efikasi knockdown cepat.',
        },
        {
          id: 'LOG-2',
          date: '12 Sep 2026',
          author: 'Laporan Petani via Meja Darurat',
          role: 'Incident Ingestion',
          note: 'Insiden serangan dilaporkan dengan intensitas kerusakan 24% pada daun bendera.',
        },
      ]
      break

    case 'kios_kpl':
      budget = 3200000
      farmerGroup = `Jaringan Pelanggan Kios (${location})`
      kioskPartner = `Kios Resmi KPL #${baseTask.id.replace('TASK-', '')} (${location})`
      targetMetric = 'Kepatuhan tempo kredit 100%, serapan produk prioritas min. 15 ton / bulan'
      urgencyRationale = 'Kios KPL merupakan ujung tombak perputaran modal dan penyalur pupuk/saprodi langsung ke tangan petani akar rumput.'
      recommendedInputs = [
        {
          name: 'Paket Stok Pupuk NPK Kalium Tinggi',
          activeIngredient: 'NPK 12-12-17 + 2MgO + TE',
          dosage: 'Alokasi stok 10 - 25 Ton / Musim',
          timing: 'Pengiriman sebelum minggu ke-2 bulan puncak aplikasi pupuk dasar',
        },
        {
          name: 'Insektisida Fast-Moving Display Banner',
          activeIngredient: 'Emamektin Benzoat 50 g/kg + Abamektin',
          dosage: 'Display etalase toko 5 karton (250 botol)',
          timing: 'Restocking berkala setiap tanggal 1 dan 15 tiap bulan',
        },
      ]
      standardOperatingProcedure = [
        'Cek fisik gudang kios: pastikan ventilasi baik, palet kayu terpasang, dan tidak ada kemasan bocor.',
        'Verifikasi buku besar piutang tempo petani (skema yarnen bayar panen) untuk mitigasi risiko gagal bayar.',
        'Pasang materi promosi PoP (Point of Purchase): spanduk, banner rekomendasi dosis, dan poster kalender tanam.',
        'Input pesanan restock ke aplikasi distributor resmi dengan konfirmasi tanda terima digital.',
      ]
      fieldLogs = [
        {
          id: 'LOG-1',
          date: '11 Sep 2026',
          author: assignee,
          role: assigneeRole,
          note: 'Audit stok fisik dan penyesuaian plafon kredit tempo 45 hari disepakati pemilik kios.',
        },
      ]
      break

    default:
      budget = 4000000
      farmerGroup = `Kelompok Sasaran Komersial (${location})`
      kioskPartner = `Kios Pertanian Terdekat (${location})`
      targetMetric = 'Penyelesaian agenda tepat waktu dengan tingkat kepatuhan SOP 100%'
      urgencyRationale = 'Mendukung kelancaran rantai pasok dan adopsi produk saprodi komersial di tingkat regional.'
      recommendedInputs = [
        {
          name: 'Formulasi Unggulan Spesifik Komoditas',
          activeIngredient: 'Bahan Aktif Terdaftar Kementan RI',
          dosage: 'Sesuai petunjuk label kemasan resmi',
          timing: 'Fase vegetatif / generatif tanaman',
        },
      ]
      standardOperatingProcedure = [
        'Koordinasi awal dengan kepala desa, ketua poktan, atau distributor lokal.',
        'Pelaksanaan inspeksi lapangan sesuai formulir standar Agrimarket.',
        'Pencatatan data numerik dan upload dokumentasi foto ke sistem.',
        'Pelaporan status kepada koordinator regional.',
      ]
      fieldLogs = [
        {
          id: 'LOG-1',
          date: '12 Sep 2026',
          author: assignee,
          role: assigneeRole,
          note: 'Tugas telah dikoordinasikan dan dijadwalkan sesuai alur kerja operasional.',
        },
      ]
  }

  const dispatchWhatsAppMessage = encodeURIComponent(
    `*DISPOSISI TUGAS LAPANGAN AGRIMARKET*\n` +
    `ID Tugas: ${baseTask.id}\n` +
    `Judul: ${baseTask.title}\n` +
    `Komoditas: ${commodity}\n` +
    `Lokasi: ${location}\n` +
    `Petugas: ${assignee} (${assigneeRole})\n` +
    `Target Selesai: ${new Date(baseTask.dueDate).toLocaleDateString('id-ID', { dateStyle: 'full' })}\n` +
    `Prioritas: ${baseTask.priority.toUpperCase()}\n\n` +
    `Mohon segera ditindaklanjuti dan input laporan perkembangan langsung di portal Agrimarket.`
  )

  return {
    id: baseTask.id,
    title: baseTask.title,
    status: baseTask.status,
    label: baseTask.label,
    priority: baseTask.priority,
    createdAt: baseTask.createdAt ? new Date(baseTask.createdAt) : new Date(),
    updatedAt: baseTask.updatedAt ? new Date(baseTask.updatedAt) : new Date(),
    dueDate: baseTask.dueDate ? new Date(baseTask.dueDate) : new Date(Date.now() + 5 * 86400000),
    assignee,
    assigneeRole,
    assigneePhone: '+6281234567890',
    location,
    commodity,
    commodityId,
    description: baseTask.description || 'Instruksi operasional lapangan terjadwal.',
    budget_idr: budget,
    targetMetric,
    farmerGroup,
    kioskPartner,
    urgencyRationale,
    recommendedInputs,
    standardOperatingProcedure,
    fieldLogs,
    dispatchWhatsAppMessage,
  }
}
