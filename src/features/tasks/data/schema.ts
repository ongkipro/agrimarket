import { z } from 'zod'

export const taskSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    status: z.string(),
    label: z.string(),
    priority: z.string(),
    createdAt: z.union([z.date(), z.string()]).optional(),
    updatedAt: z.union([z.date(), z.string()]).optional(),
    assignee: z.string().optional(),
    assigneeRole: z.string().optional(),
    location: z.string().optional(),
    commodity: z.string().optional(),
    description: z.string().optional(),
    dueDate: z.union([z.date(), z.string()]).optional(),
  })

export type Task = z.infer<typeof taskSchema>

