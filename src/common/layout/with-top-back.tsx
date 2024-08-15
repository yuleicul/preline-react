import { ArrowLeft } from 'lucide-react'
import { PropsWithChildren } from 'react'

const TOP_NAV_HEIGHT = 64

type Props = {
  title: string
}

export function WithTopBack({ children, title }: PropsWithChildren<Props>) {
  return (
    <div className="container mx-auto px-4">
      <header
        className="fixed inset-x-0 top-0 z-10 flex items-center justify-center px-6 glass"
        style={{ height: TOP_NAV_HEIGHT }}
      >
        <button
          className="btn btn-outline btn-sm shadow absolute left-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">{title}</h1>
      </header>

      <div style={{ paddingTop: TOP_NAV_HEIGHT }}>{children}</div>
    </div>
  )
}
