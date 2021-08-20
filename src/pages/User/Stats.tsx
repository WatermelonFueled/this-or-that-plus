import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"
import { PieChart } from 'react-minimal-pie-chart';
import { responseType, RESPONSE } from "../../schema"

const Stats = () => {
  const { data: user } = useUser()

  const { data: responsesUnknown } = useFirestoreCollectionData(
    useFirestore().collection('responses').where('uid', '==', user.uid),
    { initialData: [], idField: 'id' }
  )
  const responses = (responsesUnknown as unknown as responseType[]).filter(
    ({ option }) => option !== RESPONSE.BLANK
  )

  const {
    counts,
    episodeList,
  } = responses.reduce((acc, resp) => {
    const { counts: updatedCounts, episodeList: updatedEpisodeList } = acc
    updatedCounts[resp.option].value += 1
    updatedEpisodeList.add(resp.episodeId)
    return { counts: updatedCounts, episodeList: updatedEpisodeList }
  }, {
    counts: [
      { value: 0, title: 'THIS', color: '#c4b5fd' },
      { value: 0, title: 'THAT', color: '#8a5cf6' },
      { value: 0, title: 'OTHER', color: '#6d28d9' },
      { value: 0, title: 'OTHER OTHER', color: '#4c1d95' },
    ],
    episodeList: new Set(),
  })

  const countsFiltered = counts.filter(({ value }) => value > 0)

  return (
    <section className="flex flex-col gap-16 p-6 sm:p-7 md:p-8 lg:p-9 xl:p-10">
      <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center">
        You have responded to&nbsp;
        <NumberStat>
          {responses.length}
        </NumberStat>
        &nbsp;prompts from&nbsp;
        <NumberStat>
          {episodeList.size}
        </NumberStat>
        &nbsp;episodes.
      </div>
      <div
        className="max-w-xl fill-current self-center"
        style={{ fontSize: '.35rem' }}
      >
        <PieChart
          data={countsFiltered}
          startAngle={-90}
          lineWidth={20}
          paddingAngle={20}
          rounded
          label={({ dataEntry }) => `${dataEntry.title} · ${dataEntry.value}`}
          labelPosition={67}
        />
      </div>
    </section>
  )
}

export default Stats


const NumberStat = ({ children }) => (
  <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-purple-700 dark:text-purple-300">
    {children}
  </span>
)
