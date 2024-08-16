import { z } from 'zod'

export const todoSchema = z.object({
  title: z.string().min(1),
  icon: z.string().min(1),
  tags: z.array(z.string()),
  description: z.string().optional(),
})

export const todoDefaultValue: z.infer<typeof todoSchema> = {
  title: '',
  icon: '😀',
  tags: [],
  description: '',
}
