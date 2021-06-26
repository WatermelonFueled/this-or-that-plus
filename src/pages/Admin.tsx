import { useUser } from "reactfire"
import { Redirect } from 'react-router-dom'
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { PlusIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/outline';


const ADMIN_UID = 'IU7cEMs76pScUPdwq7N6lY1dYOp1'

export const useIsAdmin = () => {
  const { data: user } = useUser()
  return user.uid === ADMIN_UID;
}

const Admin = ():JSX.Element => {
  const isAdmin = useIsAdmin()

  return isAdmin ? (
    <div
      className=""
    >
      <NewEpisodeForm />
    </div>
  ) : (
    <Redirect to="/" />
  )
}

export default Admin

/* --------------------------------------------------- */

type Inputs = {
  videoId: string,
  questions: {
    time: number,
    prompt: string,
    options: {
      text: string,
    }[],
  }[],
}

const defaultOption = { text: '' }
const defaultQuestion = {
  time: 0,
  prompt: '',
  options: [{ ...defaultOption }, { ...defaultOption }]
}
const defaultValues = {
  videoId: '',
  questions: [{ ...defaultQuestion }]
}


const NewEpisodeForm = ():JSX.Element => {
  const { register, handleSubmit, control } = useForm<Inputs>({ defaultValues })
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  }
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "questions"
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <div>
          Video ID
        </div>
        <input
          {...register("videoId", { required: true })}
          type="text"
        />
      </label>
      <ol className="divide-y divide-purple-700">
        <div className="pt-3">
          Questions
        </div>
        {fields.map((item, index) => (
          <li
            key={item.id}
            className="py-3 flex flex-row flex-nowrap gap-3"
          >
            <div className="flex flex-col flex-nowrap justify-center">
              {index > 0 ? (
                <button
                  type="button"
                  onClick={() => swap(index, index - 1)}
                >
                  <ChevronUpIcon className="w-7 h-7 p-1 stroke-current text-gray-500 transition hover:text-purple-500" />
                </button>
              ) : <div className="h-7" />}
              <button
                type="button"
                onClick={() => remove(index)}
              >
                <TrashIcon className="w-7 h-7 p-1 stroke-current text-gray-500 transition hover:text-red-500" />
              </button>
              {index < fields.length - 1 ? (
                <button
                  type="button"
                  onClick={() => swap(index, index + 1)}
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
                    type="text"
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
                  />
                </label>
              </div>
              <div className="pt-3">
                Options
              </div>
              <NewEpisodeOptions {...{ index, control, register }} />
            </div>
          </li>
        ))}
        <div className="py-3">
          <button
            type="button"
            onClick={() => append(defaultQuestion)}
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

const NewEpisodeOptions = ({ index, control, register }):JSX.Element => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options"
  });

  return (
    <div className="flex flex-row flex-wrap gap-3">
      {fields.map((item, optionIndex) => (
        <div key={item.id} className="relative">
          <input
            {...register(`questions.${index}.options.${optionIndex}.text`, {
              required: true,
            })}
            type="text"
            className="pr-8"
          />
          <button
            type="button"
            onClick={() => remove(optionIndex)}
            className="block absolute right-1 inset-y-0 my-auto"
          >
            <TrashIcon className="w-7 h-7 p-1 stroke-current text-gray-500 transition hover:text-red-500" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append(defaultOption)}
      >
        <PlusIcon className="menu-icon" />
      </button>
    </div>
  )
}
