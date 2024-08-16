import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import {
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} from '@/features/todos/api'
import { TodoForm } from '@/features/todos/components/todo-form'
import { todoDefaultValue, todoSchema } from '@/features/todos/schema'

export function Todos$Id() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: todo } = useGetTodoByIdQuery(id)
  const { mutate: updateTodo } = useUpdateTodoMutation()

  const methods = useForm<z.infer<typeof todoSchema>>({
    defaultValues: todoDefaultValue,
    resolver: zodResolver(todoSchema),
  })

  const onSubmit = async () => {
    await updateTodo({
      ...todo,
      ...methods.getValues(),
    })
    navigate('/')
  }

  const defaultValue = useMemo(() => {
    const value: z.infer<typeof todoSchema> = {
      icon: todo?.icon || todoDefaultValue.icon,
      title: todo?.title || todoDefaultValue.title,
      description: todo?.description || todoDefaultValue.description,
      tags: todo?.tags.map((tag) => tag.id) || todoDefaultValue.tags,
    }
    return value
  }, [todo?.description, todo?.icon, todo?.tags, todo?.title])

  useEffect(() => {
    if (todo) {
      methods.reset(defaultValue)
    }
  }, [defaultValue, methods, todo])

  return (
    <FormProvider {...methods}>
      <TodoForm title="Update Todo" onSubmit={methods.handleSubmit(onSubmit)} />
    </FormProvider>
  )
}
