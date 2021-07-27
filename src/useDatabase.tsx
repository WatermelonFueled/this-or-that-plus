import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { episodeType } from "./schema"

export const useEpisodesList = () => {
  const episodesRef = useFirestore().collection('episodes').orderBy('date', 'desc')

  const { data: episodes } = useFirestoreCollectionData(episodesRef, { idField: 'id' })

  return episodes as unknown as episodeType[]
}

