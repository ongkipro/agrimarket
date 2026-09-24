import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'
import { CroppingCalendar } from './index'

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-router')>()
  return {
    ...actual,
    Link: ({ children, className, to }: { children?: React.ReactNode; className?: string; to?: string }) => (
      <a href={to} className={className}>{children}</a>
    ),
    useLocation: () => ({ href: '/calendar', pathname: '/calendar' }),
  }
})

describe('CroppingCalendar Component (Browser Mode)', () => {
  it('renders calendar title, year mode switcher, and subround analysis', async () => {
    const { getByText, getByRole } = await render(<CroppingCalendar />)

    // Heading and badges
    await expect.element(getByText(/Kalender Tanam & Gelombang Distribusi/i)).toBeInTheDocument()
    await expect.element(getByText(/Katam BPS \/ Kementan/i)).toBeInTheDocument()

    // Year mode switcher buttons
    const btn2026 = getByRole('button', { name: /Tahun Ini: 2026/i })
    const btn2027 = getByRole('button', { name: /Tahun Depan: 2027/i })
    const btnNormal = getByRole('button', { name: /Normal Klimatologis/i })

    await expect.element(btn2026).toBeInTheDocument()
    await expect.element(btn2027).toBeInTheDocument()
    await expect.element(btnNormal).toBeInTheDocument()

    // Default 2026 El Nino content
    await expect.element(getByText(/El Niño Aktif \+1.68°C/i)).toBeInTheDocument()
    await expect.element(getByText(/Subround 1 \(Jan – Apr\)/i)).toBeInTheDocument()
    await expect.element(getByText(/Subround 2 \(Mei – Agu\)/i)).toBeInTheDocument()
    await expect.element(getByText(/Subround 3 \(Sep – Des\)/i)).toBeInTheDocument()
  })

  it('switches year modes and updates matrix context', async () => {
    const { getByText, getByRole } = await render(<CroppingCalendar />)

    const btn2027 = getByRole('button', { name: /Tahun Depan: 2027/i })
    await userEvent.click(btn2027)

    // Check that 2027 context is rendered
    await expect.element(getByText(/Proyeksi Kalender Tanam 2027/i)).toBeInTheDocument()
    await expect.element(getByText(/Panen Raya Massal & Waspada Blas Padi/i)).toBeInTheDocument()

    const btnNormal = getByRole('button', { name: /Normal Klimatologis/i })
    await userEvent.click(btnNormal)

    // Check that normal baseline context is rendered
    await expect.element(getByText(/Acuan Kalender Tanam Rujukan Standar Klimatologis/i)).toBeInTheDocument()
  })

  it('switches month tabs and updates monthly action alert', async () => {
    const { getByText, getByRole } = await render(<CroppingCalendar />)

    // Click October tab (Bulan 10)
    const octBtn = getByRole('button', { name: /Oktober/i })
    await userEvent.click(octBtn)

    await expect.element(getByText(/Fokus Lapangan & Strategi Komersial Bulan Oktober/i)).toBeInTheDocument()
  })
})
