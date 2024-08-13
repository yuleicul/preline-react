import { WithBottomNav } from '@/common/layout/with-bottom-nav'
import { useGetHistoriesQuery } from '../api'

export function Histories() {
  const { data } = useGetHistoriesQuery()
  return (
    <WithBottomNav>
      <ul className="timeline timeline-vertical">
        {data?.map((history) => (
          <li key={history.startedAt}>
            <div className="timeline-start text-right">
              {new Date(history.startedAt).toLocaleString()} -{' '}
              {history.endedAt
                ? new Date(history.endedAt).toLocaleString()
                : 'Now'}
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-primary"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box">{history.body}</div>
            <hr />
          </li>
        ))}
      </ul>
    </WithBottomNav>
  )
}
