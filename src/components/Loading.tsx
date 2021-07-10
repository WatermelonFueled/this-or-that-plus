import { CubeIcon } from "@heroicons/react/outline"

const Loading = (
  { className, ...rest }: { className?: string, [key: string]: any }
) => (
  <CubeIcon
    className={`animate-spin w-6 h-6 stroke-current text-gray-700 dark:text-gray-300 ${className ?? ''}`}
    {...rest}
  />
)

export default Loading
