import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import queryString from 'query-string';
import { useQuery } from "react-query";
import { useFirestore } from "reactfire";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";

import CONFIG from '../../../config.json';
import { RESPONSE } from "../../../schema";
import { getYoutubeData } from "../../../api";
import { extractTitle } from "../../../util";
import HostsInputs, { defaultValues as hostsDefault } from "./HostsInput";
import OptionsInputs, { defaultValues as optionsDefault } from "./OptionsInputs";
import HostResponsesInputs, { defaultValues as hostResponsesDefault } from "./HostResponsesInputs";

type Inputs = {
  url?: string;
  videoId: string;
  title: string;
  date: Date;
  thumbHigh?: string;
  hosts: { name: string; }[];
  questions: {
    time: number;
    prompt: string;
    options: {
      text: string;
    }[];
    hostResponses: {
      host: string;
      option: RESPONSE;
      time: number;
      final: boolean;
    }[]
  }[];
}

const defaultValues = {
  url: '',
  title: '',
  hosts: hostsDefault,
  questions: [{
    time: 0,
    prompt: '',
    options: optionsDefault,
    hostResponses: hostResponsesDefault,
  }]
}

const NewEpisodeForm = (): JSX.Element => {
  const {
    register, watch, setValue, handleSubmit, control, reset
  } = useForm<Inputs>({ defaultValues })

  const questions = useFieldArray({
    control,
    name: "questions"
  });

  const hosts = useFieldArray({
    control,
    name: "hosts"
  });
  const watchHosts = watch('hosts')
  const controlledHostsFields = hosts.fields.map((field, index) => ({
    ...field,
    ...watchHosts[index]
  }))


  // fetch youtube video data when link is inputted ---------------------
  const watchUrl = watch('url', '')

  useEffect(() => {
    if (watchUrl) {
      const parsedUrl = queryString.parseUrl(watchUrl)
      const videoId = parsedUrl?.query?.v
      if (videoId) {
        if (typeof videoId === 'string') {
          setValue('videoId', videoId)
        } else {
          setValue('videoId', videoId[0])
        }
      }
    }
  }, [watchUrl, setValue])

  const watchVideoId = watch('videoId', '')

  const youtubeData = useQuery(
    ['youtubeData', { videoId: watchVideoId }],
    () => getYoutubeData(watchVideoId, 'snippet(title,publishedAt,thumbnails/high)'),
    { enabled: false }
  )

  useEffect(() => {
    if (watchVideoId && !youtubeData.isLoading) {
      youtubeData.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchVideoId])

  useEffect(() => {
    if (youtubeData.isSuccess && youtubeData.data) {
      const snippet = youtubeData.data?.items?.[0]?.snippet
      if (snippet) {
        if (snippet.title) setValue('title', extractTitle(snippet.title))
        if (snippet.publishedAt) setValue('date', new Date(snippet.publishedAt))
        if (snippet.thumbnails?.high) setValue('thumbHigh', snippet.thumbnails.high.url)
      }
    }
  }, [youtubeData.isSuccess, youtubeData.data, setValue])
  // ------------------------------------------------------------------------


  const firestore = useFirestore()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    delete data.url
    const { questions, hosts, ...episodeData } = data

    const batch = firestore.batch()

    const episodeRef = firestore.collection('episodes').doc()

    const questionIds = questions.map((questionData) => {
      const questionRef = firestore.collection('questions').doc()
      batch.set(questionRef, {
        episodeId: episodeRef.id,
        numShards: CONFIG.firestoreQuestionsNumShards,
        ...questionData
      })
      // shards for response counters per option
      for (let i = 0; i < CONFIG.firestoreQuestionsNumShards; i++) {
        const shardRef = questionRef.collection('shards').doc(i.toString());
        batch.set(shardRef, questionData.options.reduce(
          (acc, opt, optIndex) => ({ [optIndex.toString()]: 0, ...acc }),
          {}
        ));
      }
      // store host responses
      questionData.hostResponses.filter(({ final }) => final).forEach(({ host, option }) => {
        const responseRef = firestore.collection('responses').doc()
        batch.set(responseRef, {
          episodeId: episodeRef.id,
          questionId: questionRef.id,
          uid: host,
          option,
          date: episodeData.date,
        })
      })
      return questionRef.id
    })

    batch.set(episodeRef, {
      questions: questionIds,
      hosts: hosts.map(({ name }) => name),
      ...episodeData
    })

    batch.commit().then((result) => {
      reset()
    })
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <label>
        <div>
          URL
        </div>
        <input
          {...register("url", { required: true })}
          type="text"
          className="input"
        />
      </label>

      <label>
        <div>
          Title
        </div>
        <input
          {...register("title", { required: true })}
          type="text"
          className="input"
        />
      </label>

      <div>
        Hosts
      </div>
      <HostsInputs {...{ register, controlledHostsFields }} {...hosts} />

      <ol className="divide-y divide-purple-700">
        <div className="pt-3">
          Questions
        </div>
        {questions.fields.map((item, index) => (
          <li
            key={item.id}
            className="py-3 flex flex-row flex-nowrap gap-3"
          >
            <div className="flex flex-col flex-nowrap justify-center">
              {index > 0 ? (
                <button
                  type="button"
                  onClick={() => questions.swap(index, index - 1)}
                >
                  <ChevronUpIcon className="w-7 h-7 p-1 stroke-current text-gray-500 transition hover:text-purple-500" />
                </button>
              ) : <div className="h-7" />}
              <button
                type="button"
                onClick={() => questions.remove(index)}
              >
                <TrashIcon className="w-7 h-7 p-1 stroke-current text-gray-500 transition hover:text-red-500" />
              </button>
              {index < questions.fields.length - 1 ? (
                <button
                  type="button"
                  onClick={() => questions.swap(index, index + 1)}
                >
                  <ChevronDownIcon className="w-7 h-7 p-1 stroke-current text-gray-500 transition hover:text-purple-500" />
                </button>
              ) : <div className="h-7" />}
            </div>

            <div>
              <div className="flex flex-row flex-wrap gap-3">

                <label>
                  <div>
                    Time (s)
                  </div>
                  <input
                    {...register(`questions.${index}.time`, {
                      required: true,
                      valueAsNumber: true,
                    })}
                    type="number"
                    className="input"
                  />
                </label>

                <label>
                  <div>
                    Prompt
                  </div>
                  <input
                    {...register(`questions.${index}.prompt`, {
                      required: true,
                    })}
                    type="text"
                    className="input"
                  />
                </label>

              </div>

              <div className="pt-3">
                Options
              </div>
              <OptionsInputs {...{ index, control, register }} />

              <div className="pt-3">
                Host Responses
              </div>
              <HostResponsesInputs {...{ index, control, register }} hosts={controlledHostsFields} />

            </div>
          </li>
        ))}
        <div className="py-3">
          <button
            type="button"
            onClick={() => questions.append(defaultValues.questions[0])}
          >
            <PlusIcon className="menu-icon" />
          </button>
        </div>
      </ol>

      <button
        type="submit"
        className="text-2xl text-purple-700 transition hover:text-purple-500 focus:text-purple-500"
      >
        Submit
      </button>

    </form>
  )
}

export default NewEpisodeForm
