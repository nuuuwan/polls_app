export default function Circle({cx, cy, r, color}) {
  return (
    <svg>
      <circle cx={cx} cy={cy} r={r} fill={color} stroke="none" />
    </svg>
  );
}
