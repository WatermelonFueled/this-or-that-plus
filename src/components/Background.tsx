const Background = () => (
  <div
    className="fixed inset-0 w-screen h-screen flex flex-row flex-nowrap overflow-hidden pointer-events-none dark:bg-gray-900 z-0"
  >
    <BackgroundColumn
      animate={false}
      className="w-72 xl:w-1/3 h-full flex-shrink-0 xl:flex-shrink"
    />
    <BackgroundColumn
      animate={false}
      className="w-56 xl:w-1/5 h-full flex-shrink-0 xl:flex-shrink transform rotate-180"
    />
    <BackgroundColumn
      animate={false}
      className="w-64 xl:w-1/4 h-full flex-shrink-0 xl:flex-shrink"
    />
    <BackgroundColumn
      animate={false}
      className="w-128 xl:w-2/5 h-full flex-shrink-0 xl:flex-shrink transform rotate-180"
    />
  </div>
)

// should match tailwind.config.js > keyframes > bg-arrow > 100%: translate y
const gap = 6

const BackgroundColumn = (props) => (
  <svg
    viewBox="0 0 12 24"
    preserveAspectRatio="none"
    {...props}
  >
    <polyline
      id="angle"
      stroke="currentColor"
      strokeWidth="2"
      stroke-linejoin="miter"
      stroke-linecap="square"
      fill="none"
      points="0,1 6,-5 12,1"
      transform-origin="6 -5"
      className={`${props.animate ? 'motion-safe:animate-bg-arrow' : ''} text-gray-100 dark:text-gray-800`}
    />
    {['a','b','c','d','e'].map((v, i) => (
      <use
        key={v}
        href="#angle"
        y={i*gap + gap}
      />
    ))}
  </svg>
)

export default Background
