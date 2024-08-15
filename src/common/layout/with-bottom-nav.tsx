import { BotIcon, ListTodo, RabbitIcon } from 'lucide-react'
import { PropsWithChildren } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '../components/lib/utils'

const BOTTOM_NAV_HEIGHT = '5rem'

export function WithBottomNav({ children }: PropsWithChildren) {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (route: string) => {
    return location.pathname === route
  }

  return (
    <div
      className="container mx-auto px-6"
      style={{ paddingBottom: BOTTOM_NAV_HEIGHT }}
    >
      {children}

      <div className="btm-nav pb-6 glass" style={{ height: BOTTOM_NAV_HEIGHT }}>
        <button
          className={cn(isActive('/') && 'text-primary')}
          onClick={() => navigate('/')}
        >
          <ListTodo />
        </button>
        <button className={cn(isActive('') && 'text-primary')}>
          <RabbitIcon />
        </button>
        <button
          className={cn(isActive('/profile') && 'text-primary')}
          onClick={() => navigate('/profile')}
        >
          <BotIcon />
        </button>
      </div>
    </div>
  )
}
