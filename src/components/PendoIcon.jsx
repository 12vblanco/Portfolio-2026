const PendoIcon = ({
  size = 25,
  color = '#EC1F5B',
  className = '',
  style = {},
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    {...props}
  >
    <path d="M18 0L0 18H18V35L35 18V0H18Z" fill={color} />
  </svg>
);

export default PendoIcon;