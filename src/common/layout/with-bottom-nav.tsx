import { ListTodo } from 'lucide-react'
import { PropsWithChildren } from 'react'
import { BottomNavigation } from 'react-daisyui'
import { useLocation, useNavigate } from 'react-router-dom'

export function WithBottomNav({ children }: PropsWithChildren) {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (route: string) => {
    return location.pathname === route
  }

  return (
    <div className="container mx-auto p-10">
      {children}

      <BottomNavigation>
        <BottomNavigation.Item active={isActive('')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </BottomNavigation.Item>

        <BottomNavigation.Item
          active={isActive('/')}
          onClick={() => navigate('/')}
        >
          <ListTodo />
        </BottomNavigation.Item>

        <BottomNavigation.Item
          active={isActive('/profile')}
          onClick={() => navigate('/profile')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </BottomNavigation.Item>
      </BottomNavigation>
    </div>
  )
}
