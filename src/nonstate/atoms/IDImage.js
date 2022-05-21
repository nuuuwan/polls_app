import Paper from "@mui/material/Paper";
import { DataStructures } from "@nuuuwan/utils-js-dev";
import EquilateralPolygon from "../../nonstate/atoms/EquilateralPolygon";

const CELL_SIZE = 40;
const N = 3;
const WIDTH = N * CELL_SIZE;
const HEIGHT = (N + 1) * CELL_SIZE;
const BITS_PER_COLOR = 3;
const COLOR_BLANK = "#888";
const ID_SIZE = 32;
const NON_IMAGE_BITS = ID_SIZE - BITS_PER_COLOR * N * N;

export default function IDImage({ id }) {
  const colorMatrix = DataStructures.range(0, N).map(function (iRow) {
    return DataStructures.range(0, N).map(function (iCol) {
      const iStart = (iRow * N + iCol) * BITS_PER_COLOR;
      if (iStart >= id.length) {
        return null;
      }
      return id.substring(iStart, iStart + 3);
    });
  });

  const nonImageID = id.substring(ID_SIZE - NON_IMAGE_BITS, ID_SIZE);

  return (
    <Paper sx={{ p: 1 }}>
      <svg width={WIDTH} height={HEIGHT}>
        {colorMatrix.map(function (colorRow, iRow) {
          return colorRow.map(function (idSubstring, iCol) {
            const color = idSubstring ? "#" + idSubstring : COLOR_BLANK;
            const idSubstringInt = parseInt(idSubstring, 16);
            const n = (idSubstringInt % 6) + 3;
            return (
              <EquilateralPolygon
                key={"cell-shape-" + iRow + "-" + iCol}
                n={n}
                cx={(iCol + 0.5) * CELL_SIZE}
                cy={(iRow + 0.5) * CELL_SIZE}
                r={CELL_SIZE / 2}
                color={color}
              />
            );
          });
        })}
        <text
          x={WIDTH / 2}
          y={(N + 0.5) * CELL_SIZE}
          fill="gray"
          stroke="none"
          textAnchor="middle"
          dominantBaseline="hanging"
          fontSize={WIDTH / 5}
        >
          {nonImageID}
        </text>
      </svg>
    </Paper>
  );
}
