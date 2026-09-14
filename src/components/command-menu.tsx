import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  ArrowRight,
  ChevronRight,
  Laptop,
  Moon,
  Sun,
  Sprout,
  Download,
  FileSpreadsheet,
  Megaphone,
  Calculator,
} from 'lucide-react'
import { toast } from 'sonner'
import { useSearch } from '@/context/search-provider'
import { useTheme } from '@/context/theme-provider'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { sidebarData } from './layout/data/sidebar-data'
import { getCommodities, formatHa, getDataset } from '@/features/agri/data-provider'

export function CommandMenu() {
  const navigate = useNavigate()
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()
  const commodities = getCommodities()
  const dataset = getDataset()

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataset, null, 2))
    const a = document.createElement('a')
    a.href = dataStr
    a.download = `agrimarket-master-dataset-${dataset.metadata.reference_year}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    toast.success('Master Dataset JSON berhasil diunduh!')
  }

  const handleExportNationalCSV = () => {
    const headers = [
      'Crop ID',
      'Name',
      'Sector',
      'TAM Area (Ha)',
      'TAM Production (Ton)',
      'SAM Area (Ha)',
      'Total Input Market (Trillion IDR)',
    ]
    const rows = commodities.map((c) => [
      c.id,
      `"${c.name}"`,
      `"${c.sector}"`,
      c.tam.harvest_area_ha,
      c.tam.production_ton,
      c.sam.eligible_area_ha,
      c.sam.total_input_market_value_trillion_idr,
    ])
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `agrimarket-13-commodities-national-summary.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Ringkasan 13 Komoditas CSV berhasil diunduh!')
  }

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <ScrollArea type='hover' className='h-84 pe-1'>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* 13 Strategic Commodities */}
          <CommandGroup heading='13 Komoditas Strategis'>
            {commodities.map((crop) => (
              <CommandItem
                key={crop.id}
                value={`${crop.name} ${crop.english_name} ${crop.scientific_name} ${crop.sector}`}
                onSelect={() => {
                  runCommand(() => {
                    navigate({
                      to: '/commodities',
                      search: { crop: crop.id },
                    })
                    toast.success(`Membuka profil komoditas ${crop.name}`)
                  })
                }}
                className='flex items-center justify-between py-2 cursor-pointer'
              >
                <div className='flex items-center gap-2 min-w-0'>
                  <div className='flex size-6 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'>
                    <Sprout className='size-3.5' />
                  </div>
                  <div className='flex flex-col min-w-0'>
                    <div className='flex items-center gap-1.5'>
                      <span className='font-semibold text-sm text-foreground'>{crop.name}</span>
                      <span className='text-xs text-muted-foreground hidden sm:inline'>
                        ({crop.english_name})
                      </span>
                    </div>
                    <span className='text-[11px] text-muted-foreground truncate'>
                      TAM: {formatHa(crop.tam.harvest_area_ha)} • {crop.scientific_name}
                    </span>
                  </div>
                </div>
                <Badge variant='outline' className='text-[10px] shrink-0 font-normal ms-2'>
                  {crop.sector}
                </Badge>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Platform Navigation from Sidebar */}
          {sidebarData.navGroups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem, i) => {
                if (navItem.url)
                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={navItem.title}
                      onSelect={() => {
                        runCommand(() => navigate({ to: navItem.url }))
                      }}
                      className='cursor-pointer py-1.5'
                    >
                      <div className='flex size-5 items-center justify-center rounded bg-muted text-muted-foreground mr-2'>
                        {navItem.icon ? <navItem.icon className='size-3.5' /> : <ArrowRight className='size-3' />}
                      </div>
                      <span className='font-medium text-xs sm:text-sm'>{navItem.title}</span>
                    </CommandItem>
                  )

                return navItem.items?.map((subItem, j) => (
                  <CommandItem
                    key={`${navItem.title}-${subItem.url}-${j}`}
                    value={`${navItem.title}-${subItem.url}`}
                    onSelect={() => {
                      runCommand(() => navigate({ to: subItem.url }))
                    }}
                    className='cursor-pointer py-1.5'
                  >
                    <div className='flex size-5 items-center justify-center rounded bg-muted text-muted-foreground mr-2'>
                      {subItem.icon ? <subItem.icon className='size-3.5' /> : <ArrowRight className='size-3' />}
                    </div>
                    <span className='font-medium text-xs sm:text-sm'>
                      {navItem.title} <ChevronRight className='inline size-3 text-muted-foreground mx-0.5' /> {subItem.title}
                    </span>
                  </CommandItem>
                ))
              })}
            </CommandGroup>
          ))}

          <CommandSeparator />

          {/* Quick Actions & Data Export */}
          <CommandGroup heading='Aksi Cepat & Ekspor Data'>
            <CommandItem
              value='Meta Ads Google Ads Riset Kompetitor Copywriting'
              onSelect={() => runCommand(() => navigate({ to: '/ads' }))}
              className='cursor-pointer py-1.5'
            >
              <div className='flex size-5 items-center justify-center rounded bg-indigo-500/10 text-indigo-600 mr-2'>
                <Megaphone className='size-3.5' />
              </div>
              <span className='text-xs sm:text-sm'>Ads Intel & Copywriting Playbook</span>
            </CommandItem>
            <CommandItem
              value='Simulator RoAS Kalkulator Budget Iklan Pertanian'
              onSelect={() => runCommand(() => navigate({ to: '/ads' }))}
              className='cursor-pointer py-1.5'
            >
              <div className='flex size-5 items-center justify-center rounded bg-purple-500/10 text-purple-600 mr-2'>
                <Calculator className='size-3.5' />
              </div>
              <span className='text-xs sm:text-sm'>Simulator Budget & RoAS Ads</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(handleExportJSON)}
              className='cursor-pointer py-1.5'
            >
              <div className='flex size-5 items-center justify-center rounded bg-emerald-500/10 text-emerald-600 mr-2'>
                <Download className='size-3.5' />
              </div>
              <span className='text-xs sm:text-sm'>Unduh Master Dataset BPS (JSON)</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(handleExportNationalCSV)}
              className='cursor-pointer py-1.5'
            >
              <div className='flex size-5 items-center justify-center rounded bg-blue-500/10 text-blue-600 mr-2'>
                <FileSpreadsheet className='size-3.5' />
              </div>
              <span className='text-xs sm:text-sm'>Ekspor Ringkasan 13 Komoditas (CSV)</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Theme Preferences */}
          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))} className='cursor-pointer'>
              <Sun className='mr-2 size-4 text-amber-500' /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))} className='cursor-pointer'>
              <Moon className='mr-2 size-4 text-blue-400' /> <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))} className='cursor-pointer'>
              <Laptop className='mr-2 size-4 text-muted-foreground' /> <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
      {/* Keyboard Shortcuts Hint Bar */}
      <div className='flex items-center justify-between border-t px-3 py-2 text-[11px] text-muted-foreground bg-muted/20'>
        <div className='flex items-center gap-3'>
          <span><kbd className='rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] border'>↑</kbd> <kbd className='rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] border'>↓</kbd> Navigasi</span>
          <span><kbd className='rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] border'>↵</kbd> Buka</span>
          <span><kbd className='rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] border'>ESC</kbd> Tutup</span>
        </div>
        <span className='hidden sm:inline font-medium text-emerald-600 dark:text-emerald-400'>
          Agrimarket Search OS
        </span>
      </div>
    </CommandDialog>
  )
}
