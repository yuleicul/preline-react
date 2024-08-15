import { useLocalStorage } from '@uidotdev/usehooks'
import _ from 'lodash'
import { WithTopBack } from '@/common/layout/with-top-back'

const Themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
]

export function SettingsTheme() {
  const [storedTheme, setStoredTheme] = useLocalStorage('theme', 'lemonade')

  return (
    <WithTopBack title="THEME">
      <div className="join join-vertical w-full py-2">
        <input
          type="radio"
          name="theme-buttons"
          className="btn theme-controller join-item"
          aria-label="Default"
          value="default"
        />

        {Themes.map((theme) => (
          <input
            type="radio"
            name="theme-buttons"
            className="btn theme-controller join-item"
            aria-label={_.capitalize(theme)}
            value={theme}
            checked={theme === storedTheme}
            onChange={(e) => setStoredTheme(e.target.value)}
          />
        ))}
      </div>
    </WithTopBack>
  )
}
