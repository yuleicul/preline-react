import _ from 'lodash'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { cn } from '@/common/components/lib/utils'
import { WithBottomNav } from '@/common/layout/with-bottom-nav'
import { useCreateHistoryMutation } from '@/features/histories/api'
import { useGetTagsQuery } from '@/features/tags/api'
import { useGetTodosQuery, useUpdateTodoMutation } from '@/features/todos/api'
import { DoingModal } from '@/features/todos/components/doing-modal'
import { TodoStatus } from '@/features/todos/types'

export function Random() {
  const { register, watch } = useForm({
    defaultValues: { tags: [] as string[] },
  })
  const selectedTags = watch('tags')

  const { data: todoList = [] } = useGetTodosQuery({ tags: selectedTags })
  const inProgressTodo = todoList.find(
    (todo) => todo.status === TodoStatus.InProgress,
  )
  const { data: tags = [] } = useGetTagsQuery()
  const shuffled = useMemo(() => _.shuffle(todoList), [todoList])
  const { mutate: updateTodo } = useUpdateTodoMutation()
  const { mutate: createHistory } = useCreateHistoryMutation()

  return (
    <>
      <WithBottomNav>
        <header className="fixed inset-x-0 top-0 h-16 z-10 flex items-center justify-center px-6 bg-base-100">
          <h1 className="text-2xl font-bold">RANDOM</h1>
        </header>

        <div className="h-16" />

        <div className="w-full flex flex-wrap items-center gap-2 align-middle mb-2">
          {tags?.map((tag) => (
            <label
              key={tag.id}
              htmlFor={tag.id}
              className={cn(
                'badge cursor-pointer',
                selectedTags.includes(tag.id) ? 'badge-primary' : 'badge-ghost',
              )}
            >
              <input
                type="checkbox"
                {...register('tags')}
                value={tag.id}
                id={tag.id}
                className="hidden"
              />
              <span>#{tag.name}</span>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {shuffled.map((todo) => (
            <label className="swap swap-flip justify-stretch" key={todo.id}>
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setTimeout(async () => {
                      await createHistory({
                        id: Date.now() + '',
                        todoId: todo.id,
                        startedAt: new Date().toISOString(),
                      })
                      await updateTodo({
                        id: todo.id,
                        status: TodoStatus.InProgress,
                      })
                    }, 1000)
                  }
                }}
              />

              <div className="swap-on bg-accent text-accent-content h-40 flex flex-col gap-1 py-4 px-2 justify-center items-center rounded-2xl">
                <p className="text-4xl">{todo.icon}</p>
                <h2 className="card-title">{todo.title}</h2>
                <div className="flex flex-wrap gap-1">
                  {todo.tags.map((tag) => (
                    <div key={tag.id} className="badge badge-outline">
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="swap-off bg-primary/20 flex justify-center items-center rounded-2xl">
                <h2 className="text-4xl text-primary-content/20">?</h2>
              </div>
            </label>
          ))}
        </div>
      </WithBottomNav>

      {inProgressTodo && <DoingModal inProgressTodo={inProgressTodo} />}
    </>
  )
}
