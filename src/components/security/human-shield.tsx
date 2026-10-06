import { useState } from 'react'
import { ShieldCheck, ShieldAlert, Lock, UserCheck, Sparkles, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface HumanShieldProps {
  children: React.ReactNode
}

const STORAGE_KEY = 'agri_human_gate_v1'

function detectBotEnvironment(): { isBot: boolean; reason: string } {
  if (typeof window === 'undefined') return { isBot: false, reason: '' }
  if (import.meta.env.MODE === 'test' || window.location.search.includes('__test=true')) {
    return { isBot: false, reason: '' }
  }

  const isWebDriver = navigator.webdriver === true
  const userAgent = navigator.userAgent.toLowerCase()
  const isBotUA = /(bot|spider|crawl|scraper|curl|wget|python|postman|node-fetch|axios|headless|selenium|puppeteer|phantomjs)/i.test(userAgent)

  const hasAutomationGlobals = Boolean(
    // @ts-expect-error automation globals inspection
    window.__puppeteer_eval || window.cdc_adoQpoasnfa76pfcZLmcfl_ || window.__webdriver_evaluate || window._phantom || window.callPhantom
  )

  if (isWebDriver) return { isBot: true, reason: 'Automated WebDriver environment terdeteksi.' }
  if (isBotUA) return { isBot: true, reason: 'User-Agent scraper/bot otomatis terdeteksi.' }
  if (hasAutomationGlobals) return { isBot: true, reason: 'Automation execution hooks terdeteksi.' }

  return { isBot: false, reason: '' }
}

export function HumanShield({ children }: HumanShieldProps) {
  // Allow test environments to bypass for CI/unit tests
  const isTest = typeof window !== 'undefined' && (import.meta.env.MODE === 'test' || window.location.search.includes('__test=true'))
  const [isVerified, setIsVerified] = useState<boolean>(() => {
    if (isTest) return true
    if (typeof window === 'undefined') return false
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'verified'
    } catch {
      return false
    }
  })

  const [botDetection, setBotDetection] = useState(() => detectBotEnvironment())
  const [verifying, setVerifying] = useState<boolean>(false)

  const handleVerify = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Check event.isTrusted (Must be dispatched by real user interaction, not script)
    if (!e.isTrusted) {
      setBotDetection({
        isBot: true,
        reason: 'Synthetic / scripted click event terdeteksi. Hanya interaksi manusia yang diizinkan.',
      })
      return
    }

    // 2. Strict WebDriver check
    if (navigator.webdriver) {
      setBotDetection({
        isBot: true,
        reason: 'Akses ditolak: browser dijalankan oleh otomasi headless.',
      })
      return
    }

    setVerifying(true)

    // Short natural human transition (300ms)
    setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'verified')
      } catch {
        // ignore storage errors
      }
      setIsVerified(true)
      setVerifying(false)
    }, 350)
  }

  // If already verified or in test mode, render full data
  if (isVerified) {
    return <>{children}</>
  }

  // If flagged as bot/automated scraper, block completely
  if (botDetection.isBot) {
    return (
      <div className='flex min-h-screen w-full items-center justify-center bg-background p-4 text-foreground'>
        <Card className='max-w-md border-destructive/50 bg-destructive/5 shadow-lg text-center'>
          <CardHeader className='pb-3'>
            <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-2'>
              <ShieldAlert className='h-8 w-8' />
            </div>
            <Badge variant='destructive' className='mx-auto text-xs'>
              403 • ACCESS RESTRICTED
            </Badge>
            <CardTitle className='text-lg font-bold text-destructive mt-2'>
              Akses Scraper &amp; Bot Ditolak
            </CardTitle>
            <CardDescription className='text-xs'>
              Sistem AgriMarket mendeteksi perangkat lunak otomatis atau crawler yang melanggar kebijakan akses manusia.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4 text-xs text-muted-foreground'>
            <div className='rounded-lg bg-background/80 p-3 font-mono text-[11px] text-destructive border border-destructive/20'>
              {botDetection.reason || 'Automated client / scraper signature detected.'}
            </div>
            <p>
              Data agribisnis dan intelijen pasar ini dilindungi dan hanya dapat diakses langsung oleh manusia melalui peramban resmi.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Human Verification Gate for real humans
  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-background/95 p-4 text-foreground relative overflow-hidden backdrop-blur-sm'>
      {/* Background ambient pattern */}
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-background to-background' />
      <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]' />

      <Card className='relative z-10 w-full max-w-md border-emerald-500/30 bg-card shadow-2xl'>
        <CardHeader className='text-center pb-4'>
          <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-2 border border-emerald-500/20'>
            <ShieldCheck className='h-7 w-7' />
          </div>
          <div className='flex items-center justify-center gap-1.5'>
            <Badge variant='outline' className='border-emerald-600/40 text-emerald-600 dark:text-emerald-400 text-[10px] uppercase font-mono'>
              Human-Only Verification Shield
            </Badge>
          </div>
          <CardTitle className='text-xl font-bold tracking-tight text-foreground mt-2'>
            Verifikasi Pengguna Manusia
          </CardTitle>
          <CardDescription className='text-xs text-muted-foreground'>
            Data intelijen komoditas pangan dan agribisnis AgriMarket dilindungi dari AI scraper, automated bot, dan pencurian data.
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-4 pt-1'>
          <div className='rounded-xl border border-muted bg-muted/30 p-3.5 space-y-2 text-xs text-muted-foreground'>
            <div className='flex items-start gap-2 text-foreground font-medium text-xs'>
              <Lock className='h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5' />
              <span>Proteksi Integritas Data Agribisnis</span>
            </div>
            <p className='text-[11px] leading-relaxed'>
              Konfirmasi kehadiran Anda sebagai pengguna manusia untuk membuka akses ke telemetri 13 komoditas strategis, 38 provinsi BPS, dan jaringan distribusi nasional.
            </p>
          </div>

          <Button
            onClick={handleVerify}
            disabled={verifying}
            className='w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer shadow-md transition-all active:scale-[0.98]'
          >
            {verifying ? (
              <span className='flex items-center gap-2'>
                <Sparkles className='h-4 w-4 animate-spin' />
                Memverifikasi...
              </span>
            ) : (
              <span className='flex items-center gap-2'>
                <UserCheck className='h-4 w-4' />
                Saya Manusia — Buka Dashboard
              </span>
            )}
          </Button>

          <div className='flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground'>
            <AlertCircle className='h-3.5 w-3.5' />
            <span>Verifikasi berlaku untuk sesi tab peramban ini.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
