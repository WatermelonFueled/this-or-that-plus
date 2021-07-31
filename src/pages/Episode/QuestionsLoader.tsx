import { useEffect } from "react"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { questionType } from "../../schema"

const QuestionsLoader = ({ episodeId, setQuestions }): null => {
  // TODO try to reduce how much this runs?
  const questionsRef = useFirestore().collection('questions')

  const { data: questionsUnknown } = useFirestoreCollectionData(
    questionsRef.where('episodeId', '==', episodeId),
    { initialData: [], idField: 'id' }
  )

  useEffect(() => {
    if (questionsUnknown) {
      setQuestions(
        (questionsUnknown as unknown as questionType[]).reduce(
          (questionsObj, question) => {
            questionsObj[question.id] = question
            return questionsObj
          },
          {}
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsUnknown])

  return null
}

export default QuestionsLoader
