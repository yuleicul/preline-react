import { useLocalStorage } from '@uidotdev/usehooks'
import _ from 'lodash'
import {
  CheckCircle,
  DicesIcon,
  Edit2,
  MoreHorizontal,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from 'react-daisyui'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/components/lib/utils'
import { todoDefaultValue, todoListDefaultValue } from '../const'
import { Todo } from '../types'
import { AddTodo } from './add-todo'
import { DoingModal } from './doing-modal'

export function TodoList() {
  const navigate = useNavigate()

  const [todoList] = useLocalStorage('todoList', todoListDefaultValue)
  const [inProgressTodo] = useLocalStorage<Todo | null>('inProgressTodo', null)

  const [rolledNumber, setRolledNumber] = useState(-1)
  const rolledIndex = rolledNumber % todoList.length
  const rolledTodo = todoList[rolledIndex] ?? todoDefaultValue

  const [isRolledResultCardVisible, setIsRolledResultCardVisible] =
    useState(!!inProgressTodo)

  const roll = () => {
    const from = todoList.length
    const to = from * 3 - 1
    const rolledNumber = _.random(from, to)

    let rolling = 0
    function roll() {
      const timer = setTimeout(
        () => {
          setRolledNumber(rolling)
          rolling++
          clearTimeout(timer)
          if (rolling <= rolledNumber) {
            roll()
          } else {
            setTimeout(() => {
              setIsRolledResultCardVisible(true)
            }, 1000)
          }
        },
        200 + 1500 / (rolledNumber - rolling + 1),
      )
    }
    roll()
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {todoList.map((todo, index) => (
          <div
            key={todo.id}
            onClick={() => navigate(`histories/${todo.id}`)}
            className={cn(
              'flex items-center justify-between gap-4 rounded-lg p-6 glass transition-colors duration-500',
              index === rolledIndex && 'bg-accent',
            )}
          >
            <div className="flex justify-between items-center gap-4">
              <div className="text-4xl">{todo.icon}</div>

              <div>
                <label
                  className={cn('text-lg cursor-pointer')}
                  htmlFor={todo.id}
                >
                  {todo.title}
                </label>
              </div>
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

      {isRolledResultCardVisible && (
        <DoingModal
          rolledTodo={rolledTodo}
          setIsRolledResultCardVisible={setIsRolledResultCardVisible}
        />
      )}
    </>
  )
}
