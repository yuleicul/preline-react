import { WithBottomNav } from '@/common/layout/with-bottom-nav'
import { Histories } from '@/features/histories/components/histories'

export function Profile() {
  return (
    <WithBottomNav>
      <Histories />
    </WithBottomNav>
  )
}
