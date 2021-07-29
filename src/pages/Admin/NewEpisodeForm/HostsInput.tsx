import { PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { useFieldArray } from "react-hook-form";
import HOSTS from '../../../hosts.json';

const HostsInputs = ({ control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "hosts"
  });

  const roster = Object.values(HOSTS)

  return (
    <div className="flex flex-row gap-3">
      {fields.map((item, index) => (
        <div key={item.id} className="relative">
          <select
            {...register(`hosts.${index}`, { required: true })}
            className="input pl-8"
          >
            {roster.map((host) => (
              <option key={host.name} value={host.name}>
                {host.name}
              </option>
            ))}
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
      {fields.length < roster.length && (
        <button
          type="button"
          onClick={() => append(roster[fields.length].name)}
        >
          <PlusIcon className="menu-icon" />
        </button>
      )}
    </div>
  )
}

export default HostsInputs
