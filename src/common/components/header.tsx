import { Check, X } from 'lucide-react'

type Props = {
  title: string
  onClickV: () => void
  onClickX?: () => void
}

export function Header({ title, onClickX, onClickV }: Props) {
  return (
    <header className="flex items-center justify-between h-20">
      <button className="btn btn-outline btn-sm shadow" onClick={onClickX}>
        <X />
      </button>
      <h1 className="text-xl font-semibold">{title}</h1>
      <button
        className="btn btn-outline btn-sm btn-primary shadow"
        onClick={onClickV}
      >
        <Check />
      </button>
    </header>
  )
}
