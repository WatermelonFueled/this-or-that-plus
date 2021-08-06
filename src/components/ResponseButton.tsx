interface propTypes {
  onClick: () => void;
  text: string;
  checked: boolean;
  count: number | undefined;
  countTotal: number;
  showCount: boolean;
  children?: any;
}

const ResponseButton = (
  {
    onClick,
    text,
    checked,
    count,
    countTotal,
    showCount,
    children
  }: propTypes
) => {
  const rawCountPercent = countTotal ? 100 * (count ?? 0) / countTotal : 0
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={checked}
      className={`relative block h-32 outline-none rounded-xl p-4 transition bg-purple-500 bg-opacity-20 hover:bg-opacity-30 focus:bg-opacity-30 whitespace-pre-wrap ${checked ? 'ring-4 ring-opacity-70 ring-purple-900 dark:ring-purple-300' : ''}`}
    >
      <div
        className="absolute rounded-xl overflow-hidden inset-0 w-full h-full"
      >
        <div
          className="w-full h-full bg-purple-500 transition-transform duration-500 ease-out transform origin-left"
          style={{
            transform: `scaleX(${showCount && count && countTotal ? rawCountPercent : 0}%)`
          }}
        />
      </div>
      {children}
      <div
        className="relative text-lg md:text-2xl"
      >
        <p>
          {text}
        </p>
        {showCount && countTotal && (
          <p className="font-bold">
            {rawCountPercent.toFixed(1)}%
          </p>
        )}
      </div>
    </button>
  )
}

export default ResponseButton
