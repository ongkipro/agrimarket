import { useEffect, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import {
  ListTodo,
  Columns3,
  Calendar,
  ShieldAlert,
  Sprout,
  Store,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Send,
  Eye,
} from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { TasksDialogs } from './components/tasks-dialogs'
import { TasksPrimaryButtons } from './components/tasks-primary-buttons'
import { TasksProvider, useTasks } from './components/tasks-provider'
import { TasksTable } from './components/tasks-table'
import { tasks as initialTasks, type TaskItem } from './data/tasks'

const route = getRouteApi('/_authenticated/tasks/')

function TasksContent() {
  const search = route.useSearch()
  const { setOpen, currentRow, setCurrentRow } = useTasks()
  const [taskList, setTaskList] = useState<TaskItem[]>(initialTasks)
  const [selectedView, setSelectedView] = useState<string>('table')
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL')

  // Deep-link to specific task if taskId is provided in search params
  useEffect(() => {
    if (search.taskId) {
      const found = taskList.find(
        (t) => t.id.toLowerCase() === search.taskId?.toLowerCase()
      )
      if (found) {
        setCurrentRow(found)
        setOpen('detail')
      }
    }
  }, [search.taskId, taskList, setCurrentRow, setOpen])

  // KPI calculations
  const totalTasks = taskList.length
  const demoplotCount = taskList.filter((t) => t.label === 'demoplot').length
  const kplCount = taskList.filter((t) => t.label === 'kios_kpl').length
  const criticalOptCount = taskList.filter((t) => t.priority === 'critical' || t.label === 'opt_hama').length
  const doneCount = taskList.filter((t) => t.status === 'done').length
  const inProgressCount = taskList.filter((t) => t.status === 'in progress').length
  const completionRate = Math.round((doneCount / totalTasks) * 100)

  // Filtered tasks by category for table / kanban
  const filteredTasks = taskList.filter((t) => {
    if (categoryFilter === 'ALL') return true
    return t.label === categoryFilter
  })

  // Kanban groups
  const kanbanColumns = [
    { id: 'backlog', title: 'Backlog (Usulan Lapangan)', color: 'border-l-slate-400' },
    { id: 'todo', title: 'Todo (Terjadwal Minggu Ini)', color: 'border-l-blue-500' },
    { id: 'in progress', title: 'In Progress (Sedang Berjalan)', color: 'border-l-amber-500' },
    { id: 'done', title: 'Done (Selesai & Terverifikasi)', color: 'border-l-emerald-500' },
  ] as const

  // Dispatch Calendar 7-Day Agenda
  const dispatchSchedule = [
    {
      taskId: 'TASK-1008',
      day: 'Senin, 15 Sep',
      target: 'Audit Kios KPL & Verifikasi Stok Saprotan',
      location: 'Kab. Nganjuk & Klaten',
      agronomist: 'Rahmat Effendi & Tri Hartono',
      crop: 'Bawang Merah & Padi',
      type: 'Audit KPL',
      status: 'Terjadwal 08:30 WIB',
    },
    {
      taskId: 'TASK-1001',
      day: 'Selasa, 16 Sep',
      target: 'Aplikasi Fungisida Translaminar Demoplot Cabai',
      location: 'Parakan, Kab. Temanggung',
      agronomist: 'Budi Santoso, S.P.',
      crop: 'Cabai Rawit',
      type: 'Demoplot Lapangan',
      status: 'Terjadwal 06:30 WIB (Pagi)',
    },
    {
      taskId: 'TASK-1002',
      day: 'Rabu, 17 Sep',
      target: 'Temu Lapang (Field Day) Ubinan Bersama Poktan',
      location: 'Wanasari, Kab. Brebes',
      agronomist: 'Ahmad Fauzi & Tim Jateng',
      crop: 'Bawang Merah',
      type: 'Temu Lapang',
      status: 'Konfirmasi 45 Petani Hadir',
    },
    {
      taskId: 'TASK-1004',
      day: 'Kamis, 18 Sep',
      target: 'Inspeksi Tajuk Sawit & Uji Nutrisi Pelepah Boron',
      location: 'Tapung Hilir, Kab. Kampar, Riau',
      agronomist: 'Ir. Hendra Siregar',
      crop: 'Kelapa Sawit',
      type: 'Perkebunan Plasma',
      status: 'Koordinasi Mandor Kebun',
    },
    {
      taskId: 'TASK-1024',
      day: 'Jumat, 19 Sep',
      target: 'Follow-up 35 Prospek Petani Cabai Hasil Meta Ads',
      location: 'Blitar & Tulungagung',
      agronomist: 'Nurul Hidayati & CS Team',
      crop: 'Cabai Rawit',
      type: 'Digital Leads Closing',
      status: '14 Paket Siap Kirim COD',
    },
    {
      taskId: 'TASK-1014',
      day: 'Sabtu, 20 Sep',
      target: 'Gerakan Pengendalian Massal (Gerdal) Wereng Coklat',
      location: 'Rawamerta, Kab. Karawang',
      agronomist: 'Dr. Tatang Subarna & BPP',
      crop: 'Padi Sawah',
      type: 'Tanggap Darurat OPT',
      status: 'Alokasi 60 Botol Insektisida',
    },
    {
      taskId: 'TASK-1007',
      day: 'Minggu, 21 Sep',
      target: 'Konsolidasi Mingguan & Perencanaan Rute Minggu Depan',
      location: 'Head Office & Agronomist Zoom Desk',
      agronomist: 'Seluruh Koordinator Wilayah',
      crop: 'Multi-Crop',
      type: 'Review Operasional',
      status: 'Rekapitulasi Laporan Uji',
    },
  ]

  // OPT Outbreak Incident Log
  const optIncidents = [
    {
      id: 'INC-OPT-01',
      taskId: 'TASK-1014',
      pest: 'Wereng Batang Coklat (WBC) Biotipe 4',
      commodity: 'Padi Sawah',
      location: 'Kec. Rawamerta, Kab. Karawang',
      area_affected: '45 Hektar',
      severity: 'Critical / Merusak Rumpun',
      reported_by: 'Kios Tani Subur & Poktan Sri Rejeki',
      action_status: 'Gerdal Serentak Sedang Berjalan',
    },
    {
      id: 'INC-OPT-02',
      taskId: 'TASK-1015',
      pest: 'Antraknosa / Patek Kering Buah',
      commodity: 'Cabai Rawit',
      location: 'Kec. Wongsorejo, Kab. Banyuwangi',
      area_affected: '28 Hektar',
      severity: 'High / Pasca Hujan Lebat',
      reported_by: 'Agronomis Banyuwangi',
      action_status: 'Dropping 200 Botol Fungisida Sistemik',
    },
    {
      id: 'INC-OPT-03',
      taskId: 'TASK-1016',
      pest: 'Ulat Grayak (Spodoptera exigua) Resisten',
      commodity: 'Bawang Merah',
      location: 'Kec. Bulakamba, Kab. Brebes',
      area_affected: '35 Hektar',
      severity: 'Critical / Kebal Piretroid',
      reported_by: 'Koordinator Lapangan Brebes',
      action_status: 'Rotasi ke Emamektin Benzoat + Silikon',
    },
    {
      id: 'INC-OPT-04',
      taskId: 'TASK-1017',
      pest: 'Ulat Api (Setothosea asigna) Pelepah',
      commodity: 'Kelapa Sawit',
      location: 'Kec. Bilah Hilir, Kab. Labuhanbatu, Sumut',
      area_affected: '80 Hektar',
      severity: 'High / Tajuk Pelepah Bolong',
      reported_by: 'Mandor Afdeling IV',
      action_status: 'Persiapan Fogging & Injeksi Batang',
    },
    {
      id: 'INC-OPT-05',
      taskId: 'TASK-1018',
      pest: 'Layu Bakteri Hijau (Ralstonia solanacearum)',
      commodity: 'Tomat Dataran Tinggi',
      location: 'Kec. Samarang, Kab. Garut',
      area_affected: '12 Hektar',
      severity: 'Medium / Gejala Awal',
      reported_by: 'Kios Mitra Garut',
      action_status: 'Sterilisasi Parit & Pengapuran Tanah',
    },
  ]

  const handleDispatchAction = (incidentId: string, actionName: string) => {
    toast.success(`Aksi "${actionName}" untuk ${incidentId} berhasil dikirim ke tim agronomis lapangan!`)
  }

  const handleViewTaskDetail = (task: TaskItem) => {
    setCurrentRow(task)
    setOpen('detail')
  }

  const handleTaskStatusChange = (taskId: string, newStatus: string) => {
    setTaskList((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: newStatus as TaskItem['status'], updatedAt: new Date() }
          : t
      )
    )
    if (currentRow && currentRow.id === taskId) {
      setCurrentRow({ ...currentRow, status: newStatus as TaskItem['status'] })
    }
  }

  const handleMoveKanbanStatus = (
    taskId: string,
    newStatus: TaskItem['status']
  ) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus, updatedAt: new Date() } : t))
    )
    toast.success(`Status tugas ${taskId} diperbarui menjadi "${newStatus.toUpperCase()}"`)
  }

  return (
    <>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-5 sm:gap-6 pb-12'>
        {/* Page Header Title & Primary Action Buttons */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4'>
          <div>
            <div className='flex items-center gap-2'>
              <Badge variant='outline' className='bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300'>
                Field Operations OS
              </Badge>
              <Badge variant='secondary' className='text-xs'>
                Execution & Agronomy Desk
              </Badge>
            </div>
            <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1'>
              Field Operations & Agronomist Tasks
            </h1>
            <p className='text-xs sm:text-sm text-muted-foreground mt-0.5'>
              Pusat kendali eksekusi lapangan: manajemen demoplot, audit kios KPL & plafon tempo yarnen, tanggap darurat OPT, serta konversi leads digital.
            </p>
          </div>
          <TasksPrimaryButtons />
        </div>

        {/* Operational KPI Summary Cards */}
        <div className='grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4'>
          <Card className='p-3.5 sm:p-4 border-l-4 border-l-blue-500'>
            <div className='flex items-center justify-between text-muted-foreground text-xs'>
              <span>Total Tugas Lapangan</span>
              <ListTodo className='h-4 w-4 text-blue-500' />
            </div>
            <div className='text-xl sm:text-2xl font-bold font-mono text-foreground mt-1'>
              {totalTasks}
            </div>
            <div className='text-[11px] text-muted-foreground mt-1'>
              {inProgressCount} sedang aktif di lapangan
            </div>
          </Card>

          <Card className='p-3.5 sm:p-4 border-l-4 border-l-emerald-500'>
            <div className='flex items-center justify-between text-muted-foreground text-xs'>
              <span>Demoplot & Riset</span>
              <Sprout className='h-4 w-4 text-emerald-500' />
            </div>
            <div className='text-xl sm:text-2xl font-bold font-mono text-foreground mt-1'>
              {demoplotCount}
            </div>
            <div className='text-[11px] text-muted-foreground mt-1'>
              Uji efikasi & pertemuan Poktan
            </div>
          </Card>

          <Card className='p-3.5 sm:p-4 border-l-4 border-l-indigo-500'>
            <div className='flex items-center justify-between text-muted-foreground text-xs'>
              <span>Kios KPL & Audit</span>
              <Store className='h-4 w-4 text-indigo-500' />
            </div>
            <div className='text-xl sm:text-2xl font-bold font-mono text-foreground mt-1'>
              {kplCount}
            </div>
            <div className='text-[11px] text-muted-foreground mt-1'>
              Pengecer & tempo yarnen
            </div>
          </Card>

          <Card className='p-3.5 sm:p-4 border-l-4 border-l-rose-500'>
            <div className='flex items-center justify-between text-muted-foreground text-xs'>
              <span>Peringatan OPT Kritis</span>
              <ShieldAlert className='h-4 w-4 text-rose-500' />
            </div>
            <div className='text-xl sm:text-2xl font-bold font-mono text-foreground mt-1 text-rose-600'>
              {criticalOptCount}
            </div>
            <div className='text-[11px] text-muted-foreground mt-1'>
              Respons darurat &lt;24 jam
            </div>
          </Card>

          <Card className='p-3.5 sm:p-4 border-l-4 border-l-amber-500 col-span-2 lg:col-span-1'>
            <div className='flex items-center justify-between text-muted-foreground text-xs'>
              <span>Tingkat Penyelesaian</span>
              <CheckCircle2 className='h-4 w-4 text-amber-500' />
            </div>
            <div className='text-xl sm:text-2xl font-bold font-mono text-foreground mt-1'>
              {completionRate}%
            </div>
            <div className='text-[11px] text-muted-foreground mt-1'>
              {doneCount} tugas selesai diverifikasi
            </div>
          </Card>
        </div>

        {/* Multi-View Tabs Navigation */}
        <Tabs value={selectedView} onValueChange={setSelectedView} className='w-full space-y-4 min-w-0'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-w-0'>
            <div className='w-full sm:w-auto overflow-x-auto no-scrollbar pb-1'>
              <TabsList className='inline-flex w-max justify-start h-10'>
                <TabsTrigger value='table' className='text-xs sm:text-sm px-3 sm:px-4 py-2 shrink-0'>
                  <ListTodo className='h-3.5 w-3.5 mr-1.5' />
                  Daftar Operasi (Table)
                </TabsTrigger>
                <TabsTrigger value='kanban' className='text-xs sm:text-sm px-3 sm:px-4 py-2 shrink-0'>
                  <Columns3 className='h-3.5 w-3.5 mr-1.5' />
                  Papan Alur Kerja (Kanban)
                </TabsTrigger>
                <TabsTrigger value='calendar' className='text-xs sm:text-sm px-3 sm:px-4 py-2 shrink-0'>
                  <Calendar className='h-3.5 w-3.5 mr-1.5' />
                  Jadwal Kunjungan (7 Hari)
                </TabsTrigger>
                <TabsTrigger value='opt_desk' className='text-xs sm:text-sm px-3 sm:px-4 py-2 shrink-0'>
                  <ShieldAlert className='h-3.5 w-3.5 mr-1.5 text-rose-500' />
                  Meja Tanggap Darurat OPT
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Quick Category Filter Pills */}
            <div className='w-full sm:w-auto overflow-x-auto no-scrollbar pb-1'>
              <div className='flex items-center gap-1.5 min-w-max sm:flex-wrap'>
                <span className='text-xs text-muted-foreground mr-1'>Pilar:</span>
                {[
                  { key: 'ALL', label: 'Semua' },
                  { key: 'demoplot', label: 'Demoplot' },
                  { key: 'kios_kpl', label: 'Kios KPL' },
                  { key: 'opt_hama', label: 'OPT Hama' },
                  { key: 'distribusi', label: 'Distribusi' },
                  { key: 'ads_leads', label: 'Leads Ads' },
                ].map((p) => (
                  <Button
                    key={p.key}
                    size='sm'
                    variant={categoryFilter === p.key ? 'default' : 'outline'}
                    className='h-7 text-[11px] px-2.5'
                    onClick={() => setCategoryFilter(p.key)}
                  >
                    {p.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* TAB 1: TABLE VIEW */}
          <TabsContent value='table' className='m-0 space-y-4'>
            <div className='rounded-lg border bg-card'>
              <TasksTable data={filteredTasks} />
            </div>
          </TabsContent>

          {/* TAB 2: KANBAN BOARD VIEW */}
          <TabsContent value='kanban' className='m-0 space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
              {kanbanColumns.map((col) => {
                const columnTasks = filteredTasks.filter((t) => t.status === col.id)
                return (
                  <div
                    key={col.id}
                    className={`flex flex-col bg-muted/40 rounded-xl p-3 border border-border border-l-4 ${col.color}`}
                  >
                    <div className='flex items-center justify-between pb-3 border-b'>
                      <div className='font-bold text-xs sm:text-sm text-foreground'>
                        {col.title}
                      </div>
                      <Badge variant='secondary' className='font-mono text-xs'>
                        {columnTasks.length}
                      </Badge>
                    </div>

                    <div className='space-y-2.5 mt-3 overflow-y-auto max-h-[620px] no-scrollbar pr-0.5'>
                      {columnTasks.length === 0 ? (
                        <div className='p-6 text-center text-xs text-muted-foreground border border-dashed rounded-lg'>
                          Tidak ada tugas di kolom ini.
                        </div>
                      ) : (
                        columnTasks.map((t) => (
                          <div
                            key={t.id}
                            className='p-3 bg-card rounded-lg border shadow-xs hover:border-indigo-400 transition-all space-y-2 cursor-pointer'
                            onClick={() => handleViewTaskDetail(t)}
                          >
                            <div className='flex items-center justify-between'>
                              <span className='font-mono text-[10px] text-muted-foreground'>
                                {t.id}
                              </span>
                              <Badge
                                variant='outline'
                                className={`text-[10px] ${
                                  t.priority === 'critical'
                                    ? 'border-rose-500 text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
                                    : t.priority === 'high'
                                    ? 'border-amber-500 text-amber-700 dark:text-amber-400'
                                    : 'border-slate-300'
                                }`}
                              >
                                {t.priority}
                              </Badge>
                            </div>

                            <div className='font-semibold text-xs text-foreground leading-snug'>
                              {t.title}
                            </div>

                            <div className='text-[11px] text-muted-foreground line-clamp-2 leading-relaxed'>
                              {t.description}
                            </div>

                            <div className='flex items-center gap-1.5 text-[10px] text-muted-foreground pt-1 border-t'>
                              <MapPin className='h-3 w-3 shrink-0 text-indigo-500' />
                              <span className='truncate'>{t.location}</span>
                            </div>

                            <div className='flex items-center justify-between pt-1 text-[10px] text-muted-foreground'>
                              <div className='flex items-center gap-1'>
                                <User className='h-3 w-3 text-muted-foreground' />
                                <span className='truncate max-w-[110px]'>{t.assignee}</span>
                              </div>
                              <div className='flex items-center gap-1 font-mono'>
                                <Clock className='h-3 w-3 text-muted-foreground' />
                                <span>{new Date(t.dueDate).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}</span>
                              </div>
                            </div>

                            {/* Quick Move Action Buttons */}
                            <div className='flex items-center justify-end gap-1 pt-2 border-t' onClick={(e) => e.stopPropagation()}>
                              {col.id !== 'todo' && (
                                <Button
                                  size='sm'
                                  variant='ghost'
                                  className='h-6 text-[10px] px-1.5 text-blue-600'
                                  onClick={() => handleMoveKanbanStatus(t.id, 'todo')}
                                >
                                  → Todo
                                </Button>
                              )}
                              {col.id !== 'in progress' && (
                                <Button
                                  size='sm'
                                  variant='ghost'
                                  className='h-6 text-[10px] px-1.5 text-amber-600'
                                  onClick={() => handleMoveKanbanStatus(t.id, 'in progress')}
                                >
                                  → In Progress
                                </Button>
                              )}
                              {col.id !== 'done' && (
                                <Button
                                  size='sm'
                                  variant='ghost'
                                  className='h-6 text-[10px] px-1.5 text-emerald-600'
                                  onClick={() => handleMoveKanbanStatus(t.id, 'done')}
                                >
                                  ✓ Done
                                </Button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>

          {/* TAB 3: DISPATCH CALENDAR */}
          <TabsContent value='calendar' className='m-0 space-y-4'>
            <Card>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <div>
                    <CardTitle className='text-base flex items-center gap-2'>
                      <Calendar className='h-4 w-4 text-indigo-600' />
                      7-Day Regional Agronomist Dispatch Schedule
                    </CardTitle>
                    <CardDescription className='text-xs'>
                      Jadwal operasional harian tim agronomis lapangan mencakup temu lapang Poktan, audit kios penyalur, dan demoplot sentra.
                    </CardDescription>
                  </div>
                  <Button
                    size='sm'
                    variant='outline'
                    className='h-8 text-xs'
                    onClick={() => toast.info('Ekspor Jadwal Mingguan PDF siap diunduh')}
                  >
                    Ekspor Agenda Mingguan
                  </Button>
                </div>
              </CardHeader>

              <CardContent className='p-0'>
                <div className='divide-y'>
                  {dispatchSchedule.map((item, idx) => (
                    <div
                      key={idx}
                      className='p-4 hover:bg-muted/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer group'
                      onClick={() => {
                        const found = taskList.find((t) => t.id === item.taskId)
                        if (found) handleViewTaskDetail(found)
                      }}
                    >
                      <div className='flex items-start gap-3 min-w-0'>
                        <div className='w-28 shrink-0'>
                          <Badge variant='outline' className='font-bold text-xs bg-muted/60'>
                            {item.day}
                          </Badge>
                          <div className='text-[10px] text-muted-foreground mt-1 font-mono'>
                            {item.status}
                          </div>
                        </div>

                        <div className='space-y-1 min-w-0'>
                          <div className='font-semibold text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-2 flex-wrap'>
                            <span>{item.target}</span>
                            <Badge variant='secondary' className='text-[10px]'>
                              {item.type}
                            </Badge>
                          </div>
                          <div className='flex items-center gap-4 text-xs text-muted-foreground flex-wrap'>
                            <span className='flex items-center gap-1'>
                              <MapPin className='h-3.5 w-3.5 text-indigo-500' />
                              {item.location}
                            </span>
                            <span className='flex items-center gap-1'>
                              <User className='h-3.5 w-3.5 text-muted-foreground' />
                              {item.agronomist}
                            </span>
                            <span className='flex items-center gap-1'>
                              <Sprout className='h-3.5 w-3.5 text-emerald-500' />
                              {item.crop}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='flex items-center gap-2 self-end md:self-center shrink-0'>
                        <Button
                          size='sm'
                          variant='secondary'
                          className='h-8 text-xs font-semibold'
                          onClick={(e) => {
                            e.stopPropagation()
                            const found = taskList.find((t) => t.id === item.taskId)
                            if (found) handleViewTaskDetail(found)
                          }}
                        >
                          <Eye className='h-3.5 w-3.5 mr-1.5 text-primary' />
                          Detail Tugas
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          className='h-8 text-xs'
                          onClick={(e) => {
                            e.stopPropagation()
                            toast.success(`Reminder WA dikirim ke ${item.agronomist}`)
                          }}
                        >
                          <Send className='h-3 w-3 mr-1' />
                          Kirim Pengingat
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: OPT OUTBREAK INCIDENT DESK */}
          <TabsContent value='opt_desk' className='m-0 space-y-4'>
            <Card className='border-rose-200 dark:border-rose-900/50 shadow-sm'>
              <CardHeader className='pb-3'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                  <div>
                    <CardTitle className='text-base flex items-center gap-2 text-rose-800 dark:text-rose-400'>
                      <ShieldAlert className='h-4 w-4' />
                      Meja Tanggap Darurat Serangan Hama & Penyakit (OPT Incident Desk)
                    </CardTitle>
                    <CardDescription className='text-xs'>
                      Eskalasi darurat laporan lapangan dari kios KPL dan petani untuk respons cepat dropping produk dan bimbingan teknis agronomis.
                    </CardDescription>
                  </div>
                  <Badge variant='outline' className='border-rose-500 text-rose-700 dark:text-rose-400 self-start sm:self-auto text-xs'>
                    SLA Respons: &lt; 24 Jam
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className='p-0'>
                <div className='w-full overflow-x-auto rounded-md border'>
                  <table className='w-full min-w-[680px] text-xs'>
                    <thead>
                      <tr className='border-b bg-muted/40 text-muted-foreground text-[11px]'>
                        <th className='text-left py-2.5 px-4 font-semibold'>ID & Hama Sasaran</th>
                        <th className='text-left py-2.5 px-4 font-semibold'>Komoditas & Wilayah</th>
                        <th className='text-right py-2.5 px-4 font-semibold'>Luas Terdampak</th>
                        <th className='text-left py-2.5 px-4 font-semibold'>Tingkat Keparahan</th>
                        <th className='text-left py-2.5 px-4 font-semibold'>Pelapor & Status</th>
                        <th className='text-right py-2.5 px-4 font-semibold'>Aksi Cepat</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y'>
                      {optIncidents.map((inc) => (
                        <tr
                          key={inc.id}
                          className='hover:bg-muted/30 transition-colors cursor-pointer group'
                          onClick={() => {
                            const found = taskList.find((t) => t.id === inc.taskId)
                            if (found) handleViewTaskDetail(found)
                          }}
                        >
                          <td className='py-3 px-4'>
                            <div className='font-mono text-[10px] text-muted-foreground flex items-center gap-1'>
                              <span>{inc.id}</span>
                              <span className='text-primary/70 font-semibold'>({inc.taskId})</span>
                            </div>
                            <div className='font-bold text-foreground group-hover:text-primary transition-colors mt-0.5'>{inc.pest}</div>
                          </td>
                          <td className='py-3 px-4'>
                            <Badge variant='outline' className='text-[10px] mb-1'>
                              {inc.commodity}
                            </Badge>
                            <div className='text-muted-foreground flex items-center gap-1'>
                              <MapPin className='h-3 w-3 text-indigo-500' />
                              {inc.location}
                            </div>
                          </td>
                          <td className='py-3 px-4 text-right font-mono font-bold text-foreground'>
                            {inc.area_affected}
                          </td>
                          <td className='py-3 px-4'>
                            <Badge
                              variant='secondary'
                              className={`text-[10px] ${
                                inc.severity.includes('Critical')
                                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                              }`}
                            >
                              {inc.severity}
                            </Badge>
                          </td>
                          <td className='py-3 px-4'>
                            <div className='font-medium text-foreground'>{inc.action_status}</div>
                            <div className='text-[10px] text-muted-foreground mt-0.5'>
                              Oleh: {inc.reported_by}
                            </div>
                          </td>
                          <td className='py-3 px-4 text-right'>
                            <div className='flex items-center justify-end gap-1.5'>
                              <Button
                                size='sm'
                                variant='outline'
                                className='h-7 text-[11px] px-2 text-primary border-primary/30 hover:bg-primary/10'
                                onClick={(e) => {
                                  e.stopPropagation()
                                  const found = taskList.find((t) => t.id === inc.taskId)
                                  if (found) handleViewTaskDetail(found)
                                }}
                              >
                                <Eye className='h-3 w-3 mr-1' />
                                Detail Tugas
                              </Button>
                              <Button
                                size='sm'
                                variant='outline'
                                className='h-7 text-[11px] px-2 text-rose-700 border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDispatchAction(inc.id, 'Dispatch Agronomis Lapangan')
                                }}
                              >
                                Dispatch Tim
                              </Button>
                              <Button
                                size='sm'
                                variant='default'
                                className='h-7 text-[11px] px-2 bg-emerald-600 hover:bg-emerald-700 text-white'
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDispatchAction(inc.id, 'Alokasi Stok Darurat Kios')
                                }}
                              >
                                Alokasi Stok
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>

      <TasksDialogs onStatusChange={handleTaskStatusChange} />
    </>
  )
}

export function Tasks() {
  return (
    <TasksProvider>
      <TasksContent />
    </TasksProvider>
  )
}
