import { BotIcon, ListTodo, RabbitIcon } from 'lucide-react'
import { PropsWithChildren } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '../components/lib/utils'

export function WithBottomNav({ children }: PropsWithChildren) {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (route: string) => {
    return location.pathname === route
  }

  return (
    <div className="container mx-auto px-6 pb-28">
      {children}

      <div className="btm-nav h-24 pb-8">
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
