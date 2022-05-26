import StatisticsXFuture from "../../base/StatisticsXFuture";

const SLIDER_WIDTH_P = 67;
const HEIGHT = 18;

export default function StatisticalBar({ n, np, color }) {
  if (!n || n < StatisticsXFuture.MIN_STATISTICAL_N) {
    return null;
  }
  const { lower, upper, p } = StatisticsXFuture.getErrorBounds(n, np);
  const styleCommon = {
    height: HEIGHT,
    backgroundColor: color,
    float: "left",
  };

  const bars = [
    { pSpan: lower, opacity: 0.1 },
    { pSpan: p - lower, opacity: 0.5, line: true },
    { pSpan: upper - p, opacity: 0.5 },
    { pSpan: 1 - upper, opacity: 0.01 },
  ];

  return (
    <div>
      {bars.map(function (bar, iBar) {
        const style = {
          ...styleCommon,
          ...{
            width: parseInt(bar.pSpan * SLIDER_WIDTH_P + 0.5) + "%",
            opacity: bar.opacity,
            borderRight: bar.line ? "1px solid black" : "",
          },
        };

        return <span style={style} />;
      })}
    </div>
  );
}