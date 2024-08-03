import { z } from 'zod'

export const todoSchema = z.object({
  title: z.string(),
})

export type TodoSchema = z.infer<typeof todoSchema>
