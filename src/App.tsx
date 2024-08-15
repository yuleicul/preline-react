import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useLocalStorage } from '@uidotdev/usehooks'
import _ from 'lodash'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Profile } from './routes/profile'
import { Random } from './routes/random'
import { Root } from './routes/root'
import { Settings } from './routes/settings'
import { SettingsTheme } from './routes/settings.theme'
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
  {
    path: '/settings',
    children: [
      {
        path: '',
        element: <Settings />,
      },
      {
        path: 'theme',
        element: <SettingsTheme />,
      },
    ],
  },
])

const queryClient = new QueryClient()

function App() {
  const [storedTheme] = useLocalStorage('theme', 'lemonade')

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <input
        type="radio"
        name="theme-button"
        className="theme-controller hidden"
        aria-label={_.capitalize(storedTheme)}
        checked={true}
        value={storedTheme}
      />
    </QueryClientProvider>
  )
}

export default App
