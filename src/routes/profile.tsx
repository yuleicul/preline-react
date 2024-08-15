import { SettingsIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WithBottomNav } from '@/common/layout/with-bottom-nav'
import { Histories } from '@/features/histories/components/histories'

export function Profile() {
  return (
    <WithBottomNav>
      <>
        <header className="fixed inset-x-0 top-0 h-16 z-10 flex items-center justify-between px-6 bg-base-100">
          <h1 className="text-2xl font-bold">PROFILE</h1>
          <Link to={'/settings'}>
            <button className="btn btn-outline btn-sm shadow">
              <SettingsIcon />
            </button>
          </Link>
        </header>

        <div className="pt-16">
          <Histories />
        </div>
      </>
    </WithBottomNav>
  )
}
