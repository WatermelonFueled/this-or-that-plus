const FatButton = ({ children, className, ...rest }) => (
  <button
    className={`p-4 text-2xl transition font-bold bg-opacity-50 hover:bg-opacity-100 rounded-lg ${className}`}
    {...rest}
  >
    {children}
  </button>
)

export default FatButton
