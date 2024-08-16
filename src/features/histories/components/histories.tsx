import { DateTime } from 'luxon'
import { useGetHistoriesQuery } from '../api'

export function Histories() {
  const { data } = useGetHistoriesQuery()
  return (
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
      {data?.map((history) => (
        <li key={history.id}>
          <div className="timeline-middle text-xl">{history.todo.icon}</div>
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
  )
}
