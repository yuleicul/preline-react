import HeatMap from '@uiw/react-heat-map'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { useGetHistoriesQuery } from '@/features/histories/api'
import { HistoryWithGraph } from '@/features/histories/types'

const oneYearAgo = DateTime.now().minus({ year: 1 }).toISO()

function countHistoryByDate(histories: HistoryWithGraph[]) {
  const record: Record<string, number> = {}

  histories.forEach((history) => {
    const startedAt = DateTime.fromISO(history.startedAt)
    const startedDate = startedAt.toFormat('yyyy/LL/dd')
    if (record[startedDate]) {
      record[startedDate] += 1
    } else {
      record[startedDate] = 1
    }
  })

  return Object.entries(record).map(([key, value]) => ({
    date: key,
    count: value,
  }))
}
export function Heatmap() {
  const { data: histories } = useGetHistoriesQuery()
  const heatmapData = useMemo(
    () => countHistoryByDate(histories || []),
    [histories],
  )

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body overflow-auto">
        <HeatMap
          width={730}
          value={heatmapData}
          weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
          startDate={new Date(oneYearAgo)}
          endDate={new Date()}
        />
      </div>
    </div>
  )
}
