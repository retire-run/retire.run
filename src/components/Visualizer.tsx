import { clamp } from "@/utilities";
import {
  useLiveTime,
  useSaveData,
  useStatistics,
  useTotalMoney,
} from "@/utilities/hooks";
import { getTotalHours } from "@/utilities/time";
import { Group, Progress, Space, Text, Title } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

const Visualizer: FunctionComponent = () => {
  const [saveData] = useSaveData();
  const { salaryPerDay, workingHours } = useStatistics();

  const { workTime, currency } = saveData;
  const time = useLiveTime();

  const estimatedHours = getTotalHours(workTime.start, time);
  const estimatedPercentage = clamp(estimatedHours / workingHours, 0, 1);
  const percentStr = `${(estimatedPercentage * 100).toFixed(4)}%`;

  const { t } = useTranslation("visualizer");

  const moneyAvailable = estimatedPercentage >= 1.0;

  const collectedMoney = estimatedPercentage * salaryPerDay;
  const totalCollectedMoney = useTotalMoney(collectedMoney);

  useDocumentTitle(
    `💰 ${collectedMoney.toFixed(2)} ${
      moneyAvailable ? t("available") : currency
    }`
  );

  return (
    <div>
      <Group position="apart">
        <Title order={3}>{t("title")}</Title>
        <Text color="gray">{percentStr}</Text>
      </Group>
      <Space h="xl"></Space>
      <Progress
        size="lg"
        striped={!moneyAvailable}
        animate={!moneyAvailable}
        value={estimatedPercentage * 100.0}
      ></Progress>
      <Space h="xl"></Space>
      <Text>
        {t("estimated-salary-desc")} {salaryPerDay} {currency}
      </Text>
      <Text>
        {t("total-collected-desc")} {totalCollectedMoney.toFixed(2)} {currency}
      </Text>
    </div>
  );
};

export default Visualizer;
