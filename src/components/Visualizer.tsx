import { useLiveTime, useSaveData, useStatistics } from "@/utilities/hooks";
import { getTotalHours, timeUtilities } from "@/utilities/time";
import { Progress, Space } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { FunctionComponent, useMemo } from "react";

const Visualizer: FunctionComponent = () => {
  const [saveData] = useSaveData();
  const { salaryPerDay, workingHours } = useStatistics();

  const { workTime } = saveData;
  const time = useLiveTime();
  const startWorkTime = useMemo(
    () => timeUtilities.deserialize(workTime.start),
    [workTime.start]
  );

  const estimatedHours = getTotalHours(startWorkTime, time);
  const estimatedPercentage = estimatedHours / workingHours;
  const percentStr = `${(estimatedPercentage * 100).toFixed(4)}%`;

  useDocumentTitle(
    `💰 ${(estimatedPercentage * salaryPerDay).toFixed(2)} -UNIT-`
  );

  return (
    <div>
      <Progress
        label={percentStr}
        size="lg"
        striped
        animate
        value={estimatedPercentage * 100.0}
      ></Progress>
      <Space h="xl"></Space>
      <span>
        Estimated to make a total of today's money {salaryPerDay} -UNIT-
      </span>
    </div>
  );
};

export default Visualizer;
