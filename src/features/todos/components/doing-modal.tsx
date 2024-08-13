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

  const stop = () => {
    updateTodo({
      ...inProgressTodo,
      status: TodoStatus.Done,
    })
    updateHistory({
      ...inProgressHistory,
      endedAt: new Date().toISOString(),
      body: note,
    })
  }

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-tr from-primary to-accent z-10">
      <div className="card bg-base-100 w-96 shadow-xl">
        <h1>In Progress!</h1>
        <figure className="px-10 pt-10 text-6xl">
          <p>{inProgressTodo.icon}</p>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{inProgressTodo.title}</h2>
          <>
            <p>Started at: {inProgressHistory.startedAt}</p>
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} />
          </>
          <div className="card-actions">
            <Button className="btn-accent" onClick={stop}>
              Stop
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
