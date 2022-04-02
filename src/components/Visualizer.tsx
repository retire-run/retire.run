import { clamp } from "@/utilities";
import { useLiveTime, useSaveData, useStatistics } from "@/utilities/hooks";
import { getTotalHours, timeUtilities } from "@/utilities/time";
import { Progress, Space, Title } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { FunctionComponent, useMemo } from "react";
import { useTranslation } from "react-i18next";

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
  const estimatedPercentage = clamp(estimatedHours / workingHours, 0, 1);
  const percentStr = `${(estimatedPercentage * 100).toFixed(4)}%`;

  const { t } = useTranslation("visualizer");

  const moneyAvailable = estimatedPercentage >= 1.0;

  useDocumentTitle(
    `💰 ${(estimatedPercentage * salaryPerDay).toFixed(2)} ${
      moneyAvailable ? t("available") : "-UNIT-"
    }`
  );

  return (
    <div>
      <Title order={3}>{t("title")}</Title>
      <Space h="xl"></Space>
      <Progress
        label={percentStr}
        size="lg"
        striped={!moneyAvailable}
        animate={!moneyAvailable}
        value={estimatedPercentage * 100.0}
      ></Progress>
      <Space h="xl"></Space>
      <span>
        {t("estimated-salary-desc")} {salaryPerDay} -UNIT-
      </span>
    </div>
  );
};

export default Visualizer;
