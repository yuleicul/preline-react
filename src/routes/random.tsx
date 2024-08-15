import { WithBottomNav } from '@/common/layout/with-bottom-nav'

export function Random() {
  return (
    <WithBottomNav>
      <header className="fixed inset-x-0 top-0 h-16 z-10 flex items-center justify-center px-6 glass">
        <h1 className="text-2xl font-bold">RANDOM</h1>
      </header>

      <div className="pt-20">
        <label className="swap swap-flip">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          <div className="swap-on">
            <div className="card bg-base-100 w-40 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
              </div>
            </div>
          </div>
          <div className="swap-off">
            <div className="card bg-base-100 w-40 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">?</h2>
              </div>
            </div>
          </div>
        </label>
      </div>
    </WithBottomNav>
  )
}
