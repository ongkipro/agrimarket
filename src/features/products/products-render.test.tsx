import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { getProductById } from '@/features/agri/data-provider'
import { CampaignsView } from './campaigns-view'
import { ProductsOverviewHub } from './index'
import { MixMatchView } from './mix-match-view'
import { ProductDetailView } from './product-detail-view'

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-router')>()
  return {
    ...actual,
    Link: ({
      children,
      className,
      to,
    }: {
      children?: React.ReactNode
      className?: string
      to?: string
    }) => (
      <a href={to} className={className}>
        {children}
      </a>
    ),
    useLocation: () => ({ href: '/products', pathname: '/products' }),
  }
})

vi.mock('@/components/config-drawer', () => ({
  ConfigDrawer: () => null,
}))
vi.mock('@/components/search', () => ({
  Search: () => null,
}))
vi.mock('@/components/profile-dropdown', () => ({
  ProfileDropdown: () => null,
}))
vi.mock('@/components/theme-switch', () => ({
  ThemeSwitch: () => null,
}))

describe('Products Catalog Views (Browser Mode)', () => {
  it('renders ProductsOverviewHub correctly with 4 product cards and comparison table', async () => {
    const { getByText, getByRole } = await render(
      <SidebarProvider>
        <ProductsOverviewHub />
      </SidebarProvider>
    )

    // Heading & Badges
    await expect
      .element(
        getByRole('heading', {
          name: /Katalog Produk & Ekosistem Agrokimia Presisi/i,
        })
      )
      .toBeInTheDocument()
    await expect
      .element(getByText('4 Strategic SKUs', { exact: true }))
      .toBeInTheDocument()

    // 4 Products Showcase
    await expect.element(getByText(/AUSSIE Sawit/i).first()).toBeInTheDocument()
    await expect
      .element(getByText(/BENSU Hortikultura/i).first())
      .toBeInTheDocument()
    await expect
      .element(getByText(/SARATOGA Plant Serum/i).first())
      .toBeInTheDocument()
    await expect
      .element(getByText(/KOJIEN Activator/i).first())
      .toBeInTheDocument()

    // KPI Metrics
    await expect.element(getByText(/4 Formula/i)).toBeInTheDocument()
    await expect.element(getByText(/5 Kombinasi/i)).toBeInTheDocument()
    await expect
      .element(getByText('15 Bulan', { exact: true }))
      .toBeInTheDocument()
    await expect.element(getByText(/100% Calibrated/i)).toBeInTheDocument()

    // Architecture Mindmap
    await expect
      .element(getByText(/Arsitektur Ekosistem Produk/i))
      .toBeInTheDocument()

    // Comparison Table
    await expect
      .element(getByText(/Matriks Komparasi 4 Strategic SKUs/i))
      .toBeInTheDocument()
  })

  it('renders MixMatchView with synergy matrix and tank-mix safety guidelines', async () => {
    const { getByText } = await render(
      <SidebarProvider>
        <MixMatchView />
      </SidebarProvider>
    )

    // Header
    await expect
      .element(getByText(/Matriks Sinergi & Panduan Mix & Match Antar-Produk/i))
      .toBeInTheDocument()

    // Rules
    await expect
      .element(getByText(/Rotasi Musim Penuh \(Vegetatif ke Generatif\)/i))
      .toBeInTheDocument()
    await expect
      .element(getByText(/Rotasi Anakan Maksimal ke Pengisian Bulir Bernas/i))
      .toBeInTheDocument()
    await expect
      .element(
        getByText(/Sanitasi & Pemulihan Pokok Terpapar Jamur Ganoderma/i)
      )
      .toBeInTheDocument()

    // Universal Tank-Mix Safety Guidelines
    await expect
      .element(getByText(/Standar Operasional Pencampuran Tangki/i))
      .toBeInTheDocument()
  })

  it('renders CampaignsView with 15-month timeline cards and filter toggles', async () => {
    const { getByText } = await render(
      <SidebarProvider>
        <CampaignsView />
      </SidebarProvider>
    )

    // Header
    await expect
      .element(getByText(/Kalender Kampanye Komersial Iklim 15 Bulan/i))
      .toBeInTheDocument()

    // Filter Buttons
    await expect.element(getByText(/Semua \(15 Bln\)/i)).toBeInTheDocument()
    await expect.element(getByText(/2026 \(El Niño\)/i)).toBeInTheDocument()
    await expect
      .element(getByText(/2027 \(Transisi & La Niña\)/i))
      .toBeInTheDocument()

    // Month Cards
    await expect
      .element(getByText(/Bulan #1: Oktober 2026/i))
      .toBeInTheDocument()
    await expect
      .element(getByText(/Headline & Hook Meta Ads:/i).first())
      .toBeInTheDocument()
  })

  it('renders ProductDetailView for AUSSIE Sawit with multi-tab dossiers', async () => {
    const aussie = getProductById('aussie')
    expect(aussie).toBeDefined()
    if (!aussie) return

    const { getByText, getByRole } = await render(
      <SidebarProvider>
        <ProductDetailView product={aussie} />
      </SidebarProvider>
    )

    // Header
    await expect
      .element(getByRole('heading', { name: 'AUSSIE Sawit' }))
      .toBeInTheDocument()
    await expect
      .element(getByText(/Plant Recovery Stimulator/i).first())
      .toBeInTheDocument()

    // Positioning & Commodities
    await expect
      .element(getByText(/Kalimat Internal Wajib:/i))
      .toBeInTheDocument()
    await expect
      .element(getByText(/Komoditas Target Utama/i))
      .toBeInTheDocument()
  })

  it('renders ProductDetailView for SARATOGA Plant Serum', async () => {
    const saratoga = getProductById('saratoga')
    expect(saratoga).toBeDefined()
    if (!saratoga) return

    const { getByText, getByRole } = await render(
      <SidebarProvider>
        <ProductDetailView product={saratoga} />
      </SidebarProvider>
    )

    await expect
      .element(getByRole('heading', { name: 'SARATOGA Plant Serum' }))
      .toBeInTheDocument()
    await expect
      .element(getByText(/Japanese Pro-Plant Complex/i).first())
      .toBeInTheDocument()
  })
})
