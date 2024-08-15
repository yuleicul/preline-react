import { Link } from 'react-router-dom'
import { WithTopBack } from '@/common/layout/with-top-back'

export function Settings() {
  return (
    <WithTopBack title="SETTINGS">
      <ul className="menu menu-lg w-full">
        <li>
          <Link to="/settings/theme">Theme</Link>
        </li>
        <hr />
        <li>
          <a>About</a>
        </li>
      </ul>
    </WithTopBack>
  )
}
