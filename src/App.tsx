import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Histories } from './routes/histories'
import { Profile } from './routes/profile'
import { Root } from './routes/root'

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
    path: 'histories/:todoId',
    element: <Histories />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
