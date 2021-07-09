import { CubeIcon } from "@heroicons/react/outline"

const Loading = (props) => (
  <CubeIcon
    className="animate-spin w-6 h-6 stroke-current text-gray-700 dark:text-gray-300"
    {...props}
  />
)

export default Loading
