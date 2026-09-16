import { type ColumnDef, type Row } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { labels, priorities, statuses } from '../data/data'
import { type Task } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'
import { useTasks } from './tasks-provider'

// eslint-disable-next-line react-refresh/only-export-components
function TaskIdCell({ row }: { row: Row<Task> }) {
  const { setOpen, setCurrentRow } = useTasks()
  return (
    <button
      type='button'
      onClick={() => {
        setCurrentRow(row.original)
        setOpen('detail')
      }}
      className='w-20 font-mono text-xs font-semibold text-primary hover:underline text-left cursor-pointer'
      title='Klik untuk melihat detail tugas'
    >
      {row.getValue('id')}
    </button>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
function TaskTitleCell({ row }: { row: Row<Task> }) {
  const { setOpen, setCurrentRow } = useTasks()
  const label = labels.find((label) => label.value === row.original.label)
  const getLabelBadgeClass = (val?: string) => {
    switch (val) {
      case 'demoplot':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300'
      case 'kios_kpl':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300'
      case 'opt_hama':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300'
      case 'distribusi':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300'
      case 'ads_leads':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300'
      default:
        return ''
    }
  }

  return (
    <div
      onClick={() => {
        setCurrentRow(row.original)
        setOpen('detail')
      }}
      className='flex space-x-2 items-center min-w-0 cursor-pointer group'
      title='Klik untuk melihat detail tugas'
    >
      {label && (
        <Badge
          variant='outline'
          className={`shrink-0 text-[10px] font-semibold ${getLabelBadgeClass(row.original.label)}`}
        >
          {label.label}
        </Badge>
      )}
      <span className='truncate font-medium text-xs sm:text-sm group-hover:text-primary group-hover:underline'>
        {row.getValue('title')}
      </span>
    </div>
  )
}

export const tasksColumns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-0.5'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-0.5'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Task' />
    ),
    cell: ({ row }) => <TaskIdCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    meta: {
      className: 'ps-1 max-w-0 w-2/3',
      tdClassName: 'ps-4',
    },
    cell: ({ row }) => <TaskTitleCell row={row} />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }

      return (
        <div className='flex w-25 items-center gap-2'>
          {status.icon && (
            <status.icon className='size-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Priority' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-3' },
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue('priority')
      )

      if (!priority) {
        return null
      }

      return (
        <div className='flex items-center gap-2'>
          {priority.icon && (
            <priority.icon className='size-4 text-muted-foreground' />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
