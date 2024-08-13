import { useMemo, useState } from 'react'
import { Button, Textarea } from 'react-daisyui'
import { useUpdateHistoryMutation } from '@/features/histories/api'
import { useUpdateTodoMutation } from '../api'
import { Todo, TodoStatus } from '../types'

type DoingModalProps = {
  inProgressTodo: Todo
}

export function DoingModal({ inProgressTodo }: DoingModalProps) {
  const { mutate: updateHistory } = useUpdateHistoryMutation()
  const { mutate: updateTodo } = useUpdateTodoMutation()
  const [note, setNote] = useState('')
  const inProgressHistory = useMemo(
    () => inProgressTodo.histories.slice(-1)[0],
    [inProgressTodo.histories],
  )

  const stop = async () => {
    await updateHistory({
      ...inProgressHistory,
      endedAt: new Date().toISOString(),
      body: note,
    })
    await updateTodo({
      ...inProgressTodo,
      status: TodoStatus.Done,
    })
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gradient-to-tr from-primary to-accent z-10">
      <div className="card bg-base-100 w-80 shadow-xl">
        <figure className="px-10 pt-10 text-6xl">
          <p>{inProgressTodo.icon}</p>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">In Progress...</h2>
          <div className="flex flex-col gap-4 w-full">
            <p className="text-xs">
              Started at:{' '}
              {new Date(inProgressHistory.startedAt).toLocaleString()}
            </p>

            <h3>{inProgressTodo.title}</h3>

            <Textarea
              placeholder="Notes"
              value={note}
              className="w-full"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="card-actions w-full">
            <Button className="btn-accent w-full" onClick={stop}>
              Stop
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
