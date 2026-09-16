import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Calendar,
  Clock,
  MapPin,
  Sprout,
  Target,
  FileText,
  Package,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageSquare,
  Send,
  Sparkles,
  Edit,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getTaskDetailedInfo } from '../data/task-details'
import { type Task } from '../data/schema'
import { useTasks } from './tasks-provider'

type TasksDetailDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task | null
  onStatusChange?: (taskId: string, newStatus: string) => void
}

export function TasksDetailDrawer({
  open,
  onOpenChange,
  task,
  onStatusChange,
}: TasksDetailDrawerProps) {
  const { setOpen, setCurrentRow } = useTasks()
  const [newLogText, setNewLogText] = useState('')
  const [extraLogs, setExtraLogs] = useState<
    Array<{
      id: string
      date: string
      author: string
      role: string
      note: string
    }>
  >([])

  if (!task) return null

  const detail = getTaskDetailedInfo(task)
  const allLogs = [...extraLogs, ...detail.fieldLogs]

  const handleCopyLink = () => {
    const url = `${window.location.origin}/tasks?taskId=${detail.id}`
    navigator.clipboard.writeText(url)
    toast.success(`Tautan tugas ${detail.id} berhasil disalin!`)
  }

  const handleSendWhatsApp = () => {
    const waUrl = `https://wa.me/${detail.assigneePhone.replace(/[^0-9]/g, '')}?text=${detail.dispatchWhatsAppMessage}`
    window.open(waUrl, '_blank')
    toast.success(`Membuka WhatsApp untuk mengirim disposisi ke ${detail.assignee}...`)
  }

  const handleQuickStatus = (newStatus: Task['status']) => {
    if (task) {
      setCurrentRow({ ...task, status: newStatus })
    }
    onStatusChange?.(detail.id, newStatus)
    toast.success(`Status ${detail.id} diubah menjadi "${newStatus.toUpperCase()}"`)
  }

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLogText.trim()) return

    setExtraLogs((prev) => [
      {
        id: `LOG-USER-${prev.length + 1}`,
        date: 'Hari ini',
        author: 'Anda (Agrimarket Lead)',
        role: 'Operations Desk',
        note: newLogText.trim(),
      },
      ...prev,
    ])
    setNewLogText('')
    toast.success('Catatan lapangan berhasil ditambahkan ke riwayat aktivitas!')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      case 'high':
        return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      case 'in progress':
        return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      case 'todo':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side='right'
        className='w-full sm:max-w-xl md:max-w-2xl p-0 flex flex-col h-full bg-background border-s shadow-2xl'
      >
        {/* Drawer Header Banner */}
        <div className='border-b p-4 sm:p-6 bg-muted/20 relative shrink-0'>
          <div className='flex flex-wrap items-center justify-between gap-2 mb-2.5 pr-8'>
            <div className='flex items-center gap-2'>
              <button
                onClick={handleCopyLink}
                className='inline-flex items-center gap-1 font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-background border hover:bg-accent transition-colors shadow-2xs cursor-pointer'
                title='Klik untuk salin tautan tugas'
              >
                <span>{detail.id}</span>
                <Copy className='h-3 w-3 text-muted-foreground' />
              </button>
              <Badge variant='outline' className={`text-[10px] font-bold uppercase ${getPriorityColor(detail.priority)}`}>
                {detail.priority}
              </Badge>
              <Badge variant='outline' className={`text-[10px] font-bold uppercase ${getStatusBadge(detail.status)}`}>
                {detail.status}
              </Badge>
              <Badge variant='secondary' className='text-[10px] uppercase font-mono'>
                {detail.label.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          <SheetTitle className='text-lg sm:text-xl font-bold tracking-tight text-foreground leading-snug'>
            {detail.title}
          </SheetTitle>

          <SheetDescription className='text-xs text-muted-foreground mt-1.5 flex flex-wrap items-center gap-y-1 gap-x-3'>
            <span className='inline-flex items-center gap-1'>
              <Clock className='h-3.5 w-3.5 text-muted-foreground' />
              Dibuat: {detail.createdAt.toLocaleDateString('id-ID', { dateStyle: 'medium' })}
            </span>
            <span className='inline-flex items-center gap-1 font-semibold text-foreground'>
              <Calendar className='h-3.5 w-3.5 text-primary' />
              Jatuh Tempo: {detail.dueDate.toLocaleDateString('id-ID', { dateStyle: 'medium' })}
            </span>
          </SheetDescription>

          {/* Quick Cross-Module Shortcuts */}
          <div className='flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border/60'>
            <Link
              to='/commodities'
              search={{ crop: detail.commodityId }}
              className='inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-md bg-background border hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-2xs'
            >
              <Sprout className='h-3 w-3 text-emerald-600' />
              <span>Komoditas: <strong>{detail.commodity}</strong></span>
              <ExternalLink className='h-2.5 w-2.5 ml-0.5 opacity-60' />
            </Link>

            <Link
              to='/map'
              className='inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-md bg-background border hover:border-blue-500 hover:text-blue-600 transition-colors shadow-2xs'
            >
              <MapPin className='h-3 w-3 text-blue-600' />
              <span>Sentra: <strong>{detail.location}</strong></span>
              <ExternalLink className='h-2.5 w-2.5 ml-0.5 opacity-60' />
            </Link>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className='flex-1 overflow-y-auto p-4 sm:p-6 space-y-6'>
          {/* 4 Core Telemetry Cards */}
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-2.5'>
            <div className='rounded-lg border bg-card p-2.5 shadow-2xs'>
              <div className='text-[10px] text-muted-foreground font-medium uppercase'>Petugas Lapangan</div>
              <div className='text-xs font-bold text-foreground mt-0.5 truncate' title={detail.assignee}>
                {detail.assignee}
              </div>
              <div className='text-[10px] text-muted-foreground truncate'>{detail.assigneeRole}</div>
            </div>

            <div className='rounded-lg border bg-card p-2.5 shadow-2xs'>
              <div className='text-[10px] text-muted-foreground font-medium uppercase'>Anggaran Biaya</div>
              <div className='text-xs font-bold text-foreground mt-0.5 font-mono text-emerald-600 dark:text-emerald-400'>
                Rp {detail.budget_idr.toLocaleString('id-ID')}
              </div>
              <div className='text-[10px] text-muted-foreground'>Operasional & Sarana</div>
            </div>

            <div className='rounded-lg border bg-card p-2.5 shadow-2xs'>
              <div className='text-[10px] text-muted-foreground font-medium uppercase'>Kelompok Tani</div>
              <div className='text-xs font-bold text-foreground mt-0.5 truncate' title={detail.farmerGroup}>
                {detail.farmerGroup.split('(')[0]}
              </div>
              <div className='text-[10px] text-muted-foreground'>Mitra Komersial</div>
            </div>

            <div className='rounded-lg border bg-card p-2.5 shadow-2xs'>
              <div className='text-[10px] text-muted-foreground font-medium uppercase'>Kios KPL Terkait</div>
              <div className='text-xs font-bold text-foreground mt-0.5 truncate' title={detail.kioskPartner}>
                {detail.kioskPartner.split('(')[0]}
              </div>
              <div className='text-[10px] text-muted-foreground'>Pusat Distribusi</div>
            </div>
          </div>

          {/* Technical Tabs: Brief, SOP, Saprotan, Logs */}
          <Tabs defaultValue='brief' className='space-y-4'>
            <div className='w-full overflow-x-auto no-scrollbar pb-1'>
              <TabsList className='inline-flex w-max min-w-full justify-start h-9 p-1 bg-muted/60'>
                <TabsTrigger value='brief' className='text-xs px-3 py-1.5'>
                  <FileText className='mr-1.5 h-3.5 w-3.5' /> Brief & Urgensi
                </TabsTrigger>
                <TabsTrigger value='sop' className='text-xs px-3 py-1.5'>
                  <CheckCircle2 className='mr-1.5 h-3.5 w-3.5 text-emerald-500' /> SOP Lapangan
                </TabsTrigger>
                <TabsTrigger value='inputs' className='text-xs px-3 py-1.5'>
                  <Package className='mr-1.5 h-3.5 w-3.5 text-indigo-500' /> Rekomendasi Input
                </TabsTrigger>
                <TabsTrigger value='logs' className='text-xs px-3 py-1.5'>
                  <Clock className='mr-1.5 h-3.5 w-3.5 text-amber-500' /> Log Aktivitas ({allLogs.length})
                </TabsTrigger>
              </TabsList>
            </div>

            {/* TAB 1: BRIEF & URGENSI */}
            <TabsContent value='brief' className='space-y-4 m-0'>
              <div className='rounded-lg border bg-card p-4 space-y-3 shadow-2xs'>
                <h4 className='text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5'>
                  <FileText className='h-3.5 w-3.5 text-primary' />
                  Deskripsi Lengkap Instruksi Kerja Lapangan
                </h4>
                <p className='text-xs sm:text-sm text-foreground leading-relaxed'>
                  {detail.description}
                </p>
              </div>

              {/* Target Metric Card */}
              <div className='rounded-lg border bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 p-3.5 space-y-1'>
                <div className='text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5'>
                  <Target className='h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400' />
                  Target Metrik & Kriteria Keberhasilan:
                </div>
                <p className='text-xs text-emerald-700 dark:text-emerald-400/90 font-medium leading-relaxed'>
                  {detail.targetMetric}
                </p>
              </div>

              {/* Urgency Rationale Card */}
              <div className='rounded-lg border bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 p-3.5 space-y-1'>
                <div className='text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5'>
                  <Sparkles className='h-3.5 w-3.5 text-amber-600 dark:text-amber-400' />
                  Rasionalitas Komersial & Urgensi Fenologi:
                </div>
                <p className='text-xs text-amber-700 dark:text-amber-400/90 leading-relaxed'>
                  {detail.urgencyRationale}
                </p>
              </div>
            </TabsContent>

            {/* TAB 2: STANDAR OPERASIONAL PROSEDUR (SOP) */}
            <TabsContent value='sop' className='space-y-3 m-0'>
              <div className='text-xs text-muted-foreground font-medium'>
                Protokol wajib yang harus dijalankan agronomist di petak lahan untuk menjamin validitas hasil:
              </div>
              <div className='space-y-2.5'>
                {detail.standardOperatingProcedure.map((step, idx) => (
                  <div key={idx} className='flex items-start gap-3 p-3 rounded-lg border bg-card shadow-2xs'>
                    <span className='flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5'>
                      {idx + 1}
                    </span>
                    <span className='text-xs text-foreground leading-relaxed'>{step}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* TAB 3: REKOMENDASI INPUT & DOSIS TANGKI */}
            <TabsContent value='inputs' className='space-y-3 m-0'>
              <div className='text-xs text-muted-foreground font-medium'>
                Spesifikasi formulasi bahan aktif dan takaran aplikasi per tangki semprot standar 16 Liter:
              </div>
              <div className='grid gap-3'>
                {detail.recommendedInputs.map((item, idx) => (
                  <div key={idx} className='rounded-lg border bg-card p-3.5 space-y-2 shadow-2xs'>
                    <div className='flex items-start justify-between gap-2'>
                      <div>
                        <div className='font-bold text-xs sm:text-sm text-foreground'>{item.name}</div>
                        <div className='text-[11px] text-muted-foreground font-mono mt-0.5'>
                          {item.activeIngredient}
                        </div>
                      </div>
                      <Badge variant='outline' className='text-[10px] font-mono text-indigo-600 border-indigo-200 shrink-0'>
                        Rekomendasi Resmi
                      </Badge>
                    </div>

                    <div className='rounded-md bg-muted/40 p-2.5 border text-xs space-y-1'>
                      <div className='flex items-center justify-between'>
                        <span className='text-muted-foreground text-[11px] font-medium'>Konsentrasi & Dosis:</span>
                        <span className='font-mono font-bold text-foreground text-xs'>{item.dosage}</span>
                      </div>
                      <div className='flex items-center justify-between pt-1 border-t border-border/50'>
                        <span className='text-muted-foreground text-[11px] font-medium'>Waktu Aplikasi:</span>
                        <span className='text-[11px] text-foreground text-right'>{item.timing}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* TAB 4: LOG AKTIVITAS & RIWAYAT CATATAN */}
            <TabsContent value='logs' className='space-y-4 m-0'>
              {/* Form Tambah Catatan Cepat */}
              <form onSubmit={handleAddLog} className='rounded-lg border p-3 bg-muted/20 space-y-2'>
                <div className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
                  <MessageSquare className='h-3.5 w-3.5 text-primary' />
                  Tambah Catatan Lapangan / Progress Report
                </div>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={newLogText}
                    onChange={(e) => setNewLogText(e.target.value)}
                    placeholder='Tulis catatan evaluasi atau perkembangan terbaru...'
                    className='flex-1 text-xs px-3 py-2 rounded-md border bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary'
                  />
                  <Button type='submit' size='sm' className='h-8 text-xs shrink-0'>
                    Simpan
                  </Button>
                </div>
              </form>

              {/* Timeline Log */}
              <div className='space-y-3 pt-1'>
                {allLogs.map((log) => (
                  <div key={log.id} className='relative pl-5 border-l-2 border-primary/40 space-y-1 text-xs'>
                    <div className='absolute -left-[5px] top-1 size-2 rounded-full bg-primary' />
                    <div className='flex items-center justify-between gap-2'>
                      <span className='font-bold text-foreground'>{log.author}</span>
                      <span className='text-[10px] text-muted-foreground font-mono'>{log.date}</span>
                    </div>
                    <div className='text-[10px] text-muted-foreground'>{log.role}</div>
                    <p className='text-xs text-foreground/90 bg-muted/20 p-2 rounded-md border mt-1 leading-relaxed'>
                      {log.note}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Drawer Sticky Footer Toolbar */}
        <div className='border-t p-3 sm:p-4 bg-muted/40 shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5'>
          {/* Quick Status Buttons */}
          <div className='flex items-center gap-1.5 overflow-x-auto no-scrollbar'>
            <span className='text-[11px] text-muted-foreground font-medium mr-1 hidden sm:inline'>Status:</span>
            {(['todo', 'in progress', 'done'] as const).map((s) => (
              <Button
                key={s}
                size='sm'
                variant={detail.status === s ? 'default' : 'outline'}
                className='h-7 text-[10px] px-2 capitalize'
                onClick={() => handleQuickStatus(s)}
              >
                {s}
              </Button>
            ))}
          </div>

          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='h-8 text-xs flex-1 sm:flex-initial'
              onClick={() => {
                onOpenChange(false)
                setTimeout(() => setOpen('update'), 300)
              }}
            >
              <Edit className='h-3.5 w-3.5 mr-1.5' />
              Ubah Data
            </Button>

            <Button
              size='sm'
              className='h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex-1 sm:flex-initial shadow-xs'
              onClick={handleSendWhatsApp}
            >
              <Send className='h-3.5 w-3.5 mr-1.5' />
              Disposisi WhatsApp
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
