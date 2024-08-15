import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Profile } from './routes/profile'
import { Random } from './routes/random'
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
  {
    path: '/random',
    element: <Random />,
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
