import { useEffect, useMemo, useState } from 'react'
import { Button, Textarea } from 'react-daisyui'
import { useUpdateHistoryMutation } from '@/features/histories/api'
import { useUpdateTodoMutation } from '../api'
import { TodoStatus, TodoWithGraph } from '../types'

type DoingModalProps = {
  inProgressTodo: TodoWithGraph
}

export function DoingModal({ inProgressTodo }: DoingModalProps) {
  const { mutate: updateHistory } = useUpdateHistoryMutation()
  const { mutate: updateTodo } = useUpdateTodoMutation()
  const [note, setNote] = useState('')
  const inProgressHistory = useMemo(
    () => inProgressTodo.histories.slice(-1)[0],
    [inProgressTodo.histories],
  )

  const [counter, setCounter] = useState(3)

  const stop = async () => {
    await updateHistory({
      id: inProgressHistory.id,
      endedAt: new Date().toISOString(),
      body: note,
    })
    await updateTodo({
      id: inProgressTodo.id,
      status: TodoStatus.Done,
    })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((c) => c - 1)
    }, 1000)

    if (counter === 0) {
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [counter])

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gradient-to-tr from-primary to-accent z-10">
      {counter !== 0 ? (
        <span className="countdown font-mono text-6xl">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          <span style={{ '--value': counter }}></span>
        </span>
      ) : (
        <div className="card w-full shadow-xl glass text-primary-content">
          <figure className="px-10 pt-10 text-6xl">
            <p>{inProgressTodo.icon}</p>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{inProgressTodo.title}</h2>

            <div>
              {inProgressTodo.tags.map((tag) => (
                <span
                  className="badge badge-primary badge-outline"
                  key={tag.id}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-4 w-full">
              <p className="text-xs">
                Started at:{' '}
                {new Date(inProgressHistory.startedAt).toLocaleString()}
              </p>

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
      )}
    </div>
  )
}
