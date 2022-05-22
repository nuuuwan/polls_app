import { DataStructures } from "@nuuuwan/utils-js-dev";

export default function EquilateralPolygon({ cx, cy, r, n, color }) {
  if (n > 4) {
    return (
      <svg>
        <circle cx={cx} cy={cy} r={r} fill={color} stroke="none" />
      </svg>
    );
  }

  const d =
    DataStructures.range(0, n)
      .map(function (i) {
        const theta0 = -Math.PI / 2;
        const theta = theta0 + (Math.PI * 2 * i) / n;
        const x = parseInt(cx + r * Math.cos(theta));
        const y = parseInt(cy + r * Math.sin(theta));
        const label = i === 0 ? "M" : "L";
        return label + x + "," + y;
      })
      .join("") + "Z";
  return (
    <svg>
      <path d={d} fill={color} stroke="none" />
    </svg>
  );
}
