import _ from 'lodash'
import {
  CheckCircle,
  DicesIcon,
  Edit2,
  MoreHorizontal,
  Trash2,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from 'react-daisyui'
import { cn } from '@/common/components/lib/utils'
import { useCreateHistoryMutation } from '@/features/histories/api'
import { useGetTodosQuery, useUpdateTodoMutation } from '../api'
import { TodoStatus } from '../types'
import { AddTodo } from './add-todo'
import { DoingModal } from './doing-modal'

export function TodoList() {
  const { data: todoList = [] } = useGetTodosQuery()
  console.log({ todoList })
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
        id: Date.now(),
        todoId: currentTodo.id,
        startedAt: new Date().toISOString(),
      })
      updateTodo({
        ...currentTodo,
        status: TodoStatus.InProgress,
      })
    }
  }, [createHistory, currentIndex, isRolling, todoList, updateTodo])

  return (
    <>
      <div className="flex flex-col gap-4">
        {todoList.map((todo, index) => (
          <div
            key={todo.id}
            className={cn(
              'flex items-center justify-between gap-4 rounded-lg p-6 glass transition-colors duration-500',
              index === currentIndex && 'bg-accent',
            )}
          >
            <div className="flex justify-between items-center gap-4">
              <div className="text-4xl">{todo.icon}</div>

              <label className={cn('text-lg cursor-pointer')}>
                {todo.title} {todo.status === TodoStatus.InProgress && '🔥'}
              </label>
            </div>

            <div className="dropdown dropdown-left dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                <MoreHorizontal />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu flex-row bg-base-100 rounded-box z-[1] w-48 p-2 shadow"
              >
                <li>
                  <a>
                    <CheckCircle />
                  </a>
                </li>
                <li>
                  <a>
                    <Edit2 />
                  </a>
                </li>
                <li>
                  <a>
                    <Trash2 />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute right-10 bottom-32 flex gap-4">
        <Button className="btn-accent btn-circle btn-lg" onClick={roll}>
          <DicesIcon />
        </Button>
        <AddTodo />
      </div>

      {inProgressTodo && <DoingModal inProgressTodo={inProgressTodo} />}
    </>
  )
}
