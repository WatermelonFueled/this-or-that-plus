import { PlusIcon, TrashIcon } from "@heroicons/react/outline";
import HOSTS from '../../../hosts.json';
const roster = Object.values(HOSTS)

const HostsInputs = ({ register, controlledHostsFields, remove, append }) => {

  return (
    <div className="flex flex-row gap-3">
      {controlledHostsFields.map((item, index) => (
        <div key={item.id} className="relative">
          <select
            {...register(`hosts.${index}.name`, { required: true })}
            className="input pl-8"
          >
            {!controlledHostsFields.some(
              ({ name }, i) => name === 'kobe' && index !== i
            ) && (
              <option value="kobe">Kobe</option>
            )}
            {!controlledHostsFields.some(
              ({ name }, i) => name === 'dash' && index !== i
            ) && (
              <option value="dash">Dash</option>
            )}
            {!controlledHostsFields.some(
              ({ name }, i) => name === 'raz' && index !== i
            ) && (
              <option value="raz">Raz</option>
            )}
            {/* below doesn't allow for default values to set in properly */}
            {/* {roster.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))} */}
          </select>
          <button
            type="button"
            onClick={() => remove(index)}
            className="block absolute left-1 inset-y-0 my-auto"
          >
            <TrashIcon className="w-7 h-7 p-1 stroke-current text-gray-400 transition hover:text-red-500" />
          </button>
        </div>
      ))}
      {controlledHostsFields.length < roster.length && (
        <button
          type="button"
          onClick={() => append({ name: roster[controlledHostsFields.length].name })}
        >
          <PlusIcon className="menu-icon" />
        </button>
      )}
    </div>
  )
}

export default HostsInputs

export const defaultValues = [{ name: 'kobe' }, { name: 'dash' }]



