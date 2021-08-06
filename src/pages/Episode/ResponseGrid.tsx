import { useEffect, useState } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import ResponseButton from "../../components/ResponseButton";
import { hostResponseType, questionType, responseType } from "../../schema";
import CONFIG from '../../config.json'
import HOSTS from '../../hosts.json'
import { AnimatePresence, motion } from "framer-motion";

const ResponseGrid = (
  {
    episodeId,
    question,
    hostResponses,
  }: {
    episodeId: string;
    question: questionType;
    hostResponses: hostResponseType[];
  }
): JSX.Element => {
  const { data: user } = useUser()

  const serverIncrement = useFirestore.FieldValue.increment;
  const firestore = useFirestore()

  const responsesRef = firestore.collection('responses')
  const { data: responsesUnknown } = useFirestoreCollectionData(
    responsesRef.where('episodeId', '==', episodeId).where('uid', '==', user.uid),
    { initialData: [], idField: 'id' }
  )
  const responses = responsesUnknown as unknown as responseType[]
  const currentResponse = responses.find(({ questionId }) => questionId === question?.id)

  const questionsRef = firestore.collection('questions')

  const [counts, setCounts] = useState({ total: 0 })
  useEffect(() => {
    questionsRef.doc(question.id).collection('shards').get().then((snapshot) => {
      const aggregated = { total: 0 };
      snapshot.forEach(shard => {
        for (const [option, count] of Object.entries(shard.data())) {
          aggregated[option] = (aggregated?.[option] ?? 0) + count
          aggregated.total += count
        }
      });
      setCounts(aggregated)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id])

  return (
    <div
      className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:auto-cols-fr 2xl:grid-cols-1 gap-4"
    >
      {question && question.options.map(
        ({ text }, option) => (
          <ResponseButton
            key={text}
            text={text}
            checked={option === currentResponse?.option}
            count={counts[option]}
            countTotal={counts.total}
            showCount={!!currentResponse}
            onClick={() => {
              const batch = firestore.batch()

              const shardId = Math.floor(Math.random() * CONFIG.firestoreQuestionsNumShards).toString();
              const shardRef = questionsRef.doc(question.id).collection('shards').doc(shardId)

              if (currentResponse) { // update existing response
                batch.update(responsesRef.doc(currentResponse.id), {
                  option,
                  date: new Date()
                })
                batch.update(shardRef, {
                  [option.toString()]: serverIncrement(1),
                  [currentResponse.option.toString()]: serverIncrement(-1),
                })
              } else { // new response by user
                batch.set(responsesRef.doc(), {
                  episodeId,
                  questionId: question.id,
                  uid: user.uid,
                  option,
                  date: new Date()
                })
                batch.update(shardRef, {
                  [option.toString()]: serverIncrement(1),
                })
              }

              batch.commit().then(() => {
                setCounts(prev => (currentResponse ? {
                  ...prev,
                  [option]: prev[option] + 1,
                  [currentResponse.option]: prev[currentResponse.option] - 1,
                } : {
                  ...prev,
                  [option]: prev[option] + 1,
                  total: prev.total + 1,
                }))
              })
            }}
          >
            <div className="absolute -top-2 left-3 flex flex-row gap-3">
              <AnimatePresence>
                {hostResponses.filter(
                  hostResponse => hostResponse.option === option
                ).map(hostResponse => (
                  <motion.img
                    key={hostResponse.host}
                    src={HOSTS?.[hostResponse.host]?.img}
                    alt={hostResponse.host}
                    className="rounded-full w-12 h-12"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  />
                ))}
              </AnimatePresence>
            </div>
          </ResponseButton>
        )
      )}
    </div>
  )
}

export default ResponseGrid
