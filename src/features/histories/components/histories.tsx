import { DateTime } from 'luxon'
import { useGetHistoriesQuery } from '../api'

export function Histories() {
  const { data } = useGetHistoriesQuery()
  return (
    <>
      <header className="fixed inset-x-0 top-0 h-16 z-10 flex items-center justify-center px-6 glass">
        <h1 className="text-2xl font-bold">RECORDS</h1>
      </header>

      <div className="pt-16">
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          {data?.map((history) => (
            <li key={history.id}>
              <div className="timeline-middle text-3xl">
                {history.todo.icon}
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <time className="font-mono capitalize text-xs">
                  {DateTime.fromISO(history.startedAt).toRelativeCalendar()}:{' '}
                  {DateTime.fromISO(history.startedAt).toLocaleString(
                    DateTime.TIME_24_SIMPLE,
                  )}{' '}
                  -{' '}
                  {DateTime.fromISO(history.endedAt || '').toLocaleString(
                    DateTime.TIME_24_SIMPLE,
                  )}
                </time>
                <div className="text-lg font-medium">{history.todo.title}</div>
                {history.body}
              </div>
              <hr className="pb-10" />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
