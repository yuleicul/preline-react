// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */

import _ from 'lodash'
import {
  CheckCircle,
  DicesIcon,
  Edit2,
  MoreHorizontal,
  Plus,
  Trash2,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from 'react-daisyui'
import { Link } from 'react-router-dom'
import { cn } from '@/common/components/lib/utils'
import { useCreateHistoryMutation } from '@/features/histories/api'
import { useGetTodosQuery, useUpdateTodoMutation } from '../api'
import { TodoStatus } from '../types'
import { DoingModal } from './doing-modal'
import { TodoOperations } from './todo-operations'

export function TodoList() {
  const { data: todoList = [] } = useGetTodosQuery()
  const inProgressTodo = todoList.find(
    (todo) => todo.status === TodoStatus.InProgress,
  )
  const { mutate: updateTodo } = useUpdateTodoMutation()
  const { mutate: createHistory } = useCreateHistoryMutation()

  const [currentNumber, setCurrentNumber] = useState(NaN)
  const currentIndex = currentNumber % todoList.length
  const [isRolling, setIsRolling] = useState(false)

  const roll = () => {
    setIsRolling(true)

    const from = todoList.length
    const to = from * 3 - 1
    const rolledNumber = _.random(from, to)

    let rolling = 0
    function next() {
      const timer = setTimeout(
        () => {
          setCurrentNumber(rolling)
          rolling++
          clearTimeout(timer)
          if (rolling <= rolledNumber) {
            next()
          } else {
            setTimeout(async () => {
              setIsRolling(false)
            }, 1000)
          }
        },
        200 + 1500 / (rolledNumber - rolling + 1),
      )
    }
    next()
  }

  useEffect(() => {
    const currentTodo = todoList[currentIndex]
    if (!isRolling && currentTodo) {
      setCurrentNumber(NaN)
      createHistory({
        id: Date.now() + '',
        todoId: currentTodo.id,
        startedAt: new Date().toISOString(),
      })
      updateTodo({
        id: currentTodo.id,
        status: TodoStatus.InProgress,
      })
    }
  }, [createHistory, currentIndex, isRolling, todoList, updateTodo])

  return (
    <>
      <header className="fixed inset-x-0 top-0 h-16 z-10 flex items-center justify-between px-6 bg-base-100">
        <h1 className="text-2xl font-bold">TODO</h1>
        <Link to={'/todos/create'}>
          <button className="btn btn-outline btn-primary btn-sm border-2 shadow">
            <Plus />
          </button>
        </Link>
      </header>
      <div className="flex flex-col gap-2 pt-20">
        {todoList.map((todo, index) => (
          <div
            key={todo.id}
            className={cn(
              'rounded-[--rounded-box] p-2 bg-primary/20 shadow-sm flex justify-between items-center',
              'transition-colors duration-500',
              index === currentIndex && 'bg-accent',
            )}
          >
            <Link
              to={`/todos/${todo.id}/edit`}
              className="flex items-center gap-4 w-full"
            >
              <div className="text-4xl bg-base-100 py-3 px-4 rounded-[--rounded-box]">
                {todo.icon}
              </div>

              <div>
                <label className={cn('cursor-pointer')}>
                  {todo.title}{' '}
                  {todo.status === TodoStatus.InProgress && (
                    <span className="badge badge-warning">In progress</span>
                  )}
                </label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {todo.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="badge badge-primary badge-outline badge-sm"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            <div className="dropdown dropdown-left dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                <MoreHorizontal className="size-5" />
              </div>
              <TodoOperations todo={todo} />
            </div>
          </div>
        ))}
      </div>

      {/* <div className="fixed right-6 bottom-28 flex gap-4">
        <Button className="btn-accent btn-circle btn-lg shadow" onClick={roll}>
          <DicesIcon />
        </Button>
      </div> */}

      {/* {inProgressTodo && <DoingModal inProgressTodo={inProgressTodo} />} */}
    </>
  )
}
