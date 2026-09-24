import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'
import { AgroClimateExplorer } from './index'

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-router')>()
  return {
    ...actual,
    Link: ({ children, className, to }: { children?: React.ReactNode; className?: string; to?: string }) => (
      <a href={to} className={className}>{children}</a>
    ),
    useLocation: () => ({ href: '/climate', pathname: '/climate' }),
  }
})

describe('AgroClimateExplorer Component (Browser Mode)', () => {
  it('renders macro climate telemetry cards, tabs, and 2026 status', async () => {
    const { getByText } = await render(<AgroClimateExplorer />)

    // Heading
    await expect.element(getByText(/Dinamika Cuaca Riil 2026 & Proyeksi Iklim 2027/i)).toBeInTheDocument()
    await expect.element(getByText(/BMKG ZOM9120 • SI Katam Terpadu/i)).toBeInTheDocument()

    // Telemetry KPIs
    await expect.element(getByText(/\+1.68°C/i)).toBeInTheDocument()
    await expect.element(getByText(/\+0.76°C/i)).toBeInTheDocument()
    await expect.element(getByText(/427 dari 699 ZOM/i)).toBeInTheDocument()
    await expect.element(getByText('Monsun Australia', { exact: true })).toBeInTheDocument()

    // 2026 Content
    await expect.element(getByText(/Peringatan Agroklimat 2026: Anomali El Niño Kuat/i)).toBeInTheDocument()
    await expect.element(getByText(/Sebaran Prediksi Awal Musim Hujan 2026\/2027/i)).toBeInTheDocument()
  })

  it('switches to 2027 outlook tab and renders ENSO probability section', async () => {
    const { getByText, getByRole } = await render(<AgroClimateExplorer />)

    const tab2027 = getByRole('button', { name: /Tahun Depan: Proyeksi Iklim 2027/i })
    await userEvent.click(tab2027)

    await expect.element(getByText(/Prakiraan Iklim 2027: Transisi El Niño Meluruh/i)).toBeInTheDocument()
    await expect.element(getByText(/Model Probabilitas Siklus ENSO 2026 – 2027/i)).toBeInTheDocument()
    await expect.element(getByText(/Peluang Agronomis & Panen Raya Padi 2027/i)).toBeInTheDocument()
  })

  it('switches to commodities matrix tab and filters commodities', async () => {
    const { getByText, getByRole } = await render(<AgroClimateExplorer />)

    const tabMatrix = getByRole('button', { name: /Matriks 13 Komoditas & Dampak Ekstrem/i })
    await userEvent.click(tabMatrix)

    await expect.element(getByText(/Padi \(Rice\)/i)).toBeInTheDocument()
    await expect.element(getByText(/Kelapa Sawit \(Oil Palm\)/i)).toBeInTheDocument()

    // Filter by sector: Perkebunan
    const perkebunanBtn = getByRole('button', { name: /^Perkebunan$/i })
    await userEvent.click(perkebunanBtn)

    await expect.element(getByText(/Kelapa Sawit \(Oil Palm\)/i)).toBeInTheDocument()
    await expect.element(getByText(/Tembakau \(Tobacco\)/i)).toBeInTheDocument()
  })

  it('switches to Katam SOP tab and renders operational protocols', async () => {
    const { getByText, getByRole } = await render(<AgroClimateExplorer />)

    const tabSop = getByRole('button', { name: /SOP Katam Terpadu Lapang/i })
    await userEvent.click(tabSop)

    await expect.element(getByText(/KATAM-01/i)).toBeInTheDocument()
    await expect.element(getByText(/SOP Penyesuaian Dinamis Awal Waktu Tanam/i)).toBeInTheDocument()
    await expect.element(getByText(/KATAM-02/i)).toBeInTheDocument()
    await expect.element(getByText(/SOP Manajemen Irigasi Hemat Air \(AWD/i)).toBeInTheDocument()
  })
})
