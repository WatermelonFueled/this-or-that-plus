type propTypes = {
  left?: { [key: string]: any };
  right?: { [key: string]: any };
  duration?: string;
  repeat?: number | 'indefinite';
  delay?: number;
  [key: string]: any;
}

const Logo = (
  { left, right, duration, repeat, delay, ...rest }: propTypes
): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-purple-900 dark:text-purple-100"
    {...left}
    {...rest}
  >
    <path id="arrow" stroke="none">
      <animate
        attributeName="d"
        dur={duration ?? '3000ms'}
        repeatCount={repeat ?? 'indefinite'}
        fill="freeze"
        keyTimes={`
          0;
          ${0 + (delay ?? 0)};
          ${.1 + (delay ?? 0)};
          ${.21 + (delay ?? 0)};
          ${.26 + (delay ?? 0)};
          ${.3 + (delay ?? 0)};
          ${.34 + (delay ?? 0)};
          ${.4 + (delay ?? 0)};
          1
        `}
        values="
          M 12,2 L 12,2 L 12,2 L 12,2  L 12,2  L 12,2 L 12,2 L 12,2 z;
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
      className="text-purple-500"
      {...right}
    />
  </svg>
)

export default Logo

export const LogoNoAnim = (
  { left, right, ...rest }: {
    left?: { [key: string]: any };
    right?: { [key: string]: any };
    [key: string]: any;
  }
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-purple-900 dark:text-purple-100"
    {...left}
    {...rest}
  >
    <path id="arrow" stroke="none" d="M 9,2  L 9,9  L 3,9  L 0,12  L 3,15  L 9,15 L 15,9 L 15,2 z" />
    <use
      href="#arrow"
      transform="rotate(180,12,12)"
      className="text-purple-500"
      {...right}
    />
  </svg>
)
