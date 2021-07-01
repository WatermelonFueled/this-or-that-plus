import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { episodeType } from "../schema"

const Episodes = ():JSX.Element => {
  const episodesRef = useFirestore().collection('episodes')
  const episodesCollection = useFirestoreCollectionData(episodesRef, { idField: 'id' })

  let { data, status } = episodesCollection

  useEffect(() => {
    console.debug(episodesCollection)
  }, [status])

  return (
    <div>
      Episodes
      <ol className="grid gap-4">
        {data && data.map((episode) => {
          let ep = episode as unknown as episodeType
          return (
            <EpisodeLink key={ep.id} {...ep} />
          )
        })}
      </ol>
    </div>
  )
}

export default Episodes


const EpisodeLink = (props: episodeType) => {

  return (
    <li
      className=""
    >
      <Link
        to={`/${encodeURIComponent(props.title)}`}
        className="group block transition-transform hover:scale-105"
      >
        <div className="w-64 h-36 rounded-lg bg-purple-900">

        </div>
        <div className="font-bold transition group-hover:text-purple-700">
          {props.title}
        </div>
      </Link>
    </li>
  )
}
