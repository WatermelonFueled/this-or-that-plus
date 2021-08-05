import { PlusIcon, TrashIcon } from "@heroicons/react/outline"
import { useFieldArray } from "react-hook-form"
import { RESPONSE } from "../../../schema"

const HostResponsesInputs = (
  { index, control, register, hosts }
): JSX.Element => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.hostResponses`
  })

  return (
    <div className="flex flex-col gap-3">
      {fields.map((item, responseIndex) => (
        <div key={item.id} className="flex flex-row flex-wrap gap-3">
          <select
            {...register(`questions.${index}.hostResponses.${responseIndex}.host`, { required: true })}
            className="input"
          >
            {hosts.map(({ name }) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <select
            {...register(
              `questions.${index}.hostResponses.${responseIndex}.option`,
              { required: true, valueAsNumber: true }
            )}
            className="input"
          >
            <option value={RESPONSE.THIS}>THIS</option>
            <option value={RESPONSE.THAT}>THAT</option>
            <option value={RESPONSE.OTHER}>OTHER</option>
            <option value={RESPONSE.OTHEROTHER}>OTHER OTHER</option>
          </select>
          <input
            {...register(
              `questions.${index}.hostResponses.${responseIndex}.time`,
              { required: true, valueAsNumber: true }
            )}
            type="number"
            className="input"
          />
          <label className="input flex flex-row flex-nowrap items-center p-3 gap-3">
            <input
              {...register(`questions.${index}.hostResponses.${responseIndex}.final`)}
              type="checkbox"
            />
            <span>
              Final
            </span>
          </label>
          <button
            type="button"
            onClick={() => remove(responseIndex)}
          >
            <TrashIcon className="w-7 h-7 p-1 stroke-current text-gray-500 transition hover:text-red-500" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append(defaultValues[0])}
      >
        <PlusIcon className="menu-icon" />
      </button>
    </div>
  )
}

export default HostResponsesInputs

export const defaultValues = [{
  host: '',
  option: RESPONSE.THIS,
  time: 0,
  final: true,
}]
