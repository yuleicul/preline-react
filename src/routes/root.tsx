import { WithBottomNav } from '@/components/layout/with-bottom-nav'
import { TodoList } from '@/features/todos/components/todo-list'

export function Root() {
  return (
    <WithBottomNav>
      <TodoList />
    </WithBottomNav>
  )
}
