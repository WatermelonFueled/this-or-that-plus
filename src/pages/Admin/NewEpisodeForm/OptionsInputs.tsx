import { PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { useFieldArray } from "react-hook-form";

const OptionsInputs = ({ index, control, register }): JSX.Element => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options`
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
            className="input pr-8"
          />
          <button
            type="button"
            onClick={() => remove(optionIndex)}
            className="block absolute right-1 inset-y-0 my-auto"
          >
            <TrashIcon className="w-7 h-7 p-1 stroke-current text-gray-400 transition hover:text-red-500" />
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

export default OptionsInputs

export const defaultValues = [{ text: '' }, { text: '' }]
