import { useLocalStorage } from '@uidotdev/usehooks'
import { useParams } from 'react-router-dom'
import { WithBottomNav } from '@/components/layout/with-bottom-nav'
import { todoListDefaultValue } from '@/features/todos/const'

export function Histories() {
  const { todoId } = useParams()
  const [todoList] = useLocalStorage('todoList', todoListDefaultValue)

  const todo = todoList.find((todo) => todo.id === todoId)
  return (
    <WithBottomNav>
      <h1>
        {todo?.icon} {todo?.title}
      </h1>

      <ul className="timeline timeline-vertical">
        {todo?.histories.map((history) => (
          <li key={history.startedAt}>
            <div className="timeline-start">
              {history.startedAt} - {history.endedAt}
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box">{history.note}</div>
            <hr />
          </li>
        ))}
      </ul>
    </WithBottomNav>
  )
}
