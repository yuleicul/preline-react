import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCreateTodoMutation } from '@/features/todos/api'
import { TodoForm } from '@/features/todos/components/todo-form'
import { todoDefaultValue, todoSchema } from '@/features/todos/schema'
import { TodoStatus } from '@/features/todos/types'

export function TodosCreate() {
  const navigate = useNavigate()
  const { mutate: createTodo } = useCreateTodoMutation()

  const methods = useForm({
    defaultValues: todoDefaultValue,
    resolver: zodResolver(todoSchema),
  })

  const onSubmit = async () => {
    await createTodo({
      ...methods.getValues(),
      id: Date.now() + '',
      status: TodoStatus.Todo,
    })
    navigate('/')
  }

  return (
    <FormProvider {...methods}>
      <TodoForm title="Create Todo" onSubmit={methods.handleSubmit(onSubmit)} />
    </FormProvider>
  )
}
