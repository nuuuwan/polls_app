import PollStatisticsSignificance from "../../view/atoms/PollStatisticsSignificance";
import PollStatisticsTotal from "../../view/atoms/PollStatisticsTotal";

export default function PollStatistics({ pollExtended, small }) {
  return (
    <>
      <PollStatisticsTotal pollExtended={pollExtended} small={small} />
      <PollStatisticsSignificance pollExtended={pollExtended} small={small} />
    </>
  );
}
