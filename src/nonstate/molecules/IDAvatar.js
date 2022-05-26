import Avatar from "@mui/material/Avatar";
import { DataStructures } from "@nuuuwan/utils-js-dev";
import EquilateralPolygon from "../../nonstate/atoms/EquilateralPolygon";

const N = 3;
const BITS_PER_COLOR = 3;
const COLOR_BLANK = "#888";
const P_RADIUS = 0.9;

export default function IDAvatar({ size, id }) {
  const cellSize = (size * 0.7) / N;
  const width = N * cellSize;
  const height = width;

  const colorMatrix = DataStructures.range(0, N).map(function (iRow) {
    return DataStructures.range(0, N).map(function (iCol) {
      const iStart = (iRow * N + iCol) * BITS_PER_COLOR;
      if (iStart >= id.length) {
        return null;
      }
      return id.substring(iStart, iStart + 3);
    });
  });

  return (
    <Avatar
      variant="circular"
      sx={{
        width: size,
        height: size,
        background: "white",
        border: "3px solid lightgray",
      }}
    >
      <svg width={width} height={height}>
        {colorMatrix.map(function (colorRow, iRow) {
          return colorRow.map(function (idSubstring, iCol) {
            const color = idSubstring ? "#" + idSubstring : COLOR_BLANK;
            const idSubstringInt = parseInt(idSubstring, 16);
            const n = (idSubstringInt % 3) + 3;
            return (
              <EquilateralPolygon
                key={"cell-shape-" + iRow + "-" + iCol}
                n={n}
                cx={(iCol + 0.5) * cellSize}
                cy={(iRow + 0.5) * cellSize}
                r={(P_RADIUS * cellSize) / 2}
                color={color}
              />
            );
          });
        })}
      </svg>
    </Avatar>
  );
}
