type propTypes = {
  left: { [key: string]: any };
  right: { [key: string]: any };
  duration?: string;
  repeat?: number | 'indefinite';
  [key: string]: any;
}

const Logo = (
  { left, right, duration, repeat, ...rest }: propTypes
): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...left}
    {...rest}
  >
    <path id="arrow" stroke="none">
      <animate
        attributeName="d"
        dur={duration ?? '3000ms'}
        repeatCount={repeat ?? 'indefinite'}
        keyTimes="0;
                  .05;
                  .17;
                  .2;
                  .23;
                  .26;
                  .3;
                  1"
        values="
          M 12,2 L 12,2 L 12,2 L 12,2  L 12,2  L 12,2 L 12,2 L 12,2 z;
          M 9,2  L 9,2  L 9,2  L 12,5  L 12,5  L 15,2 L 15,2 L 15,2 z;
          M 9,2  L 9,9  L 9,9  L 12,12 L 12,12 L 15,9 L 15,9 L 15,2 z;
          M 9,2  L 9,9  L 9,15 L 9,15  L 9,15  L 9,15 L 15,9 L 15,2 z;
          M 9,2  L 9,9  L 9,12 L 9,12  L 9,12  L 9,15 L 15,9 L 15,2 z;
          M 9,2  L 9,9  L 9,9  L 6,12  L 9,15  L 9,15 L 15,9 L 15,2 z;
          M 9,2  L 9,9  L 3,9  L 0,12  L 3,15  L 9,15 L 15,9 L 15,2 z;
          M 9,2  L 9,9  L 3,9  L 0,12  L 3,15  L 9,15 L 15,9 L 15,2 z;
        "
      />
    </path>
    <use
      href="#arrow"
      transform="rotate(180,12,12)"
      {...right}
    />
  </svg>
)

export default Logo
