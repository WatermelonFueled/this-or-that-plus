interface propTypes {
  onClick: () => void;
  checked: boolean;
  children?: any;
}

const ResponseButton = (props: propTypes) => (
  <button
    type="button"
    onClick={props.onClick}
    className={`block h-24 rounded ring ring-opacity-60 whitespace-pre-wrap ${props.checked ? 'ring-purple-200 bg-purple-600' : 'ring-gray-200'}`}
  >
    {props.children}
  </button>
)

export default ResponseButton
