import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Profile } from './routes/profile'
import { Root } from './routes/root'
import { TodosCreate } from './routes/todos.create'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/todos/create',
    element: <TodosCreate />,
  },
])

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
