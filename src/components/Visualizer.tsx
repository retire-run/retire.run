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
import { Trans, useTranslation } from "react-i18next";

const Visualizer: FunctionComponent = () => {
  const [saveData] = useSaveData();
  const { salaryPerDay, workingHours } = useStatistics();

  const { workTime, currency } = saveData;
  const time = useLiveTime();

  const estimatedHours = getTotalHours(workTime.start, time);
  const estimatedPercentage = clamp(estimatedHours / workingHours, 0, 1);
  const percentStr = `${(estimatedPercentage * 100).toFixed(4)}%`;

  const { t } = useTranslation("visualizer");

  const isBeforeWorkTime = estimatedPercentage <= 0.0;
  const isAfterWorkTime = estimatedPercentage >= 1.0;
  const isWorkTime = !isBeforeWorkTime && !isAfterWorkTime;

  const collectedMoney = estimatedPercentage * salaryPerDay;
  const totalCollectedMoney = useTotalMoney(collectedMoney);

  useDocumentTitle(
    t(isAfterWorkTime ? "after-work-doc-title" : "doc-title", {
      money: collectedMoney.toFixed(2),
      currency,
    })
  );

  // useDocumentTitle(
  //   `💰 ${collectedMoney.toFixed(2)} ${
  //     isAfterWorkTime ? t("after-work-title-suffix") : currency
  //   }`
  // );

  const descriptionKey = isAfterWorkTime
    ? "after-work-salary-desc"
    : "salary-desc";

  return (
    <div>
      <Group position="apart">
        <Title order={3}>{t("title")}</Title>
        <Text color="gray">{percentStr}</Text>
      </Group>
      <Space h="xl"></Space>
      <Progress
        size="lg"
        striped={isWorkTime}
        animate={isWorkTime}
        value={estimatedPercentage * 100.0}
      ></Progress>
      <Space h="xl"></Space>
      <Text>
        <Trans
          t={t}
          i18nKey={descriptionKey}
          values={{ salary: `${salaryPerDay.toFixed(2)} ${currency}` }}
        ></Trans>
      </Text>
      <Text>
        <Trans
          t={t}
          i18nKey="total-collected-desc"
          values={{
            totalSalary: `${totalCollectedMoney.toFixed(2)} ${currency}`,
          }}
        ></Trans>
      </Text>
    </div>
  );
};

export default Visualizer;
