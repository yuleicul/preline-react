import { useLocalStorage } from '@uidotdev/usehooks'
import { useState } from 'react'
import { Button, Textarea } from 'react-daisyui'
import { todoListDefaultValue } from '../const'
import { InProgressTodo, Todo } from '../types'

type DoingModalProps = {
  rolledTodo?: Todo
  setIsRolledResultCardVisible: (visible: boolean) => void
}

export function DoingModal({
  rolledTodo,
  setIsRolledResultCardVisible,
}: DoingModalProps) {
  const [todoList, saveTodoList] = useLocalStorage(
    'todoList',
    todoListDefaultValue,
  )
  const [inProgressTodo, saveInProgressTodo] =
    useLocalStorage<InProgressTodo | null>(
      'inProgressTodo',
      rolledTodo ? { ...rolledTodo, startedAt: '' } : null,
    )
  const [note, setNote] = useState('')

  const stop = () => {
    const id = inProgressTodo?.id
    const todoIndex = todoList.findIndex((todo) => todo.id === id)
    const todo = todoList[todoIndex]
    todo.histories.push({
      startedAt: inProgressTodo?.startedAt,
      endedAt: new Date().toLocaleTimeString(),
      note,
    })
    saveTodoList(todoList)
    saveInProgressTodo(null)
    setIsRolledResultCardVisible(false)
  }

  if (!inProgressTodo) {
    setIsRolledResultCardVisible(false)
    return null
  }

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-tr from-primary to-accent z-10">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10 text-6xl">
          <p>{inProgressTodo.icon}</p>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{inProgressTodo.title}</h2>
          {inProgressTodo?.startedAt && (
            <>
              <p>Started at: {inProgressTodo.startedAt}</p>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </>
          )}
          <div className="card-actions">
            {inProgressTodo.startedAt ? (
              <Button className="btn-accent" onClick={stop}>
                Stop
              </Button>
            ) : (
              <Button
                className="btn-primary"
                onClick={() => {
                  saveInProgressTodo({
                    ...inProgressTodo,
                    startedAt: new Date().toLocaleTimeString(),
                  })
                }}
              >
                Start Now!
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
