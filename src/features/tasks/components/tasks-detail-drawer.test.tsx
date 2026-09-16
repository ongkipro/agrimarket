import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'
import { type Task } from '../data/schema'
import { TasksProvider } from './tasks-provider'
import { TasksDetailDrawer } from './tasks-detail-drawer'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
    <a className={className}>{children}</a>
  ),
}))

const MOCK_TASK: Task = {
  id: 'TASK-1001',
  title: 'Demoplot Uji Efikasi Fungisida Translaminar Antraknosa Cabai Rawit di Temanggung',
  status: 'in progress',
  label: 'demoplot',
  priority: 'high',
  location: 'Parakan, Kab. Temanggung',
  assignee: 'Budi Santoso, S.P.',
  assigneeRole: 'Senior Agronomist Hortikultura',
  commodity: 'Cabai Rawit',
  description: 'Aplikasi ke-3 fungisida sistemik translaminar pada blok tanaman umur 65 HST pasca hujan lebat malam hari.',
}

describe('TasksDetailDrawer', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders task title, ID, badges, and briefing sections', async () => {
    const { getByRole, getByText } = await render(
      <TasksProvider>
        <TasksDetailDrawer open onOpenChange={vi.fn()} task={MOCK_TASK} />
      </TasksProvider>
    )

    const heading = getByRole('heading', {
      name: /Demoplot Uji Efikasi Fungisida Translaminar/i,
    })
    await expect.element(heading).toBeInTheDocument()
    await expect.element(getByText(/TASK-1001/i)).toBeInTheDocument()
    await expect.element(getByText(/SOP Lapangan/i)).toBeInTheDocument()
    await expect.element(getByText(/Rekomendasi Input/i)).toBeInTheDocument()
  })

  it('allows quick status changes and triggers onStatusChange callback', async () => {
    const onStatusChange = vi.fn()
    const { getByRole } = await render(
      <TasksProvider>
        <TasksDetailDrawer
          open
          onOpenChange={vi.fn()}
          task={MOCK_TASK}
          onStatusChange={onStatusChange}
        />
      </TasksProvider>
    )

    const doneBtn = getByRole('button', { name: /^done$/i })
    await userEvent.click(doneBtn)
    expect(onStatusChange).toHaveBeenCalledWith('TASK-1001', 'done')
  })
})
