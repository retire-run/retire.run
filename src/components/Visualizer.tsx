import { RetireRefreshRate, RetireTotalMoneyKey } from "@/constants";
import { clamp } from "@/utilities";
import { useSaveData } from "@/utilities/hooks";
import { getTotalHours } from "@/utilities/time";
import { Group, Progress, Space, Text, Title } from "@mantine/core";
import { useDocumentTitle, useInterval, useLocalStorage } from "@mantine/hooks";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

export function useTotalMoney(salary: number, currentPercent: number) {
  const [percent, setPercent] = useState(currentPercent);

  const [total, setTotal] = useLocalStorage<number>({
    key: RetireTotalMoneyKey,
    defaultValue: 0,
  });

  useEffect(() => {
    if (currentPercent !== percent) {
      const delta = clamp(
        currentPercent - percent,
        0,
        Number.POSITIVE_INFINITY
      );
      setPercent(currentPercent);
      setTotal((v) => v + delta * salary);
    }
  }, [currentPercent, percent, salary, setTotal]);

  return total;
}

export function useLiveTime() {
  const [time, setTime] = useState<Time>(() => {
    const date = new Date();
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    };
  });

  const interval = useInterval(() => {
    // TODO: optimize this
    const date = new Date();
    setTime({
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    });
  }, RetireRefreshRate);

  useEffect(() => {
    interval.start();
    return interval.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return time;
}

export function useStatistics() {
  const saveData = useSaveData();

  return useMemo(() => {
    const { workTime, breaks, salary, working_days } = saveData;

    const salaryPerDay = salary / working_days;

    const workingHours = getTotalHours(workTime.start, workTime.end);

    const totalBreakHours = breaks.reduce(
      (total, b) => total + getTotalHours(b.start, b.end),
      0
    );

    const effectiveWorkingHours = workingHours - totalBreakHours;

    return {
      salaryPerDay,
      workingHours,
      effectiveWorkingHours,
      totalBreakHours,
    };
  }, [saveData]);
}

const Visualizer: FunctionComponent = () => {
  const saveData = useSaveData();
  const { salaryPerDay, workingHours } = useStatistics();

  const { workTime, currency } = saveData;
  const time = useLiveTime();

  const estimatedHours = getTotalHours(workTime.start, time);
  const percentage = clamp(estimatedHours / workingHours, 0, 1);
  const percentStr = `${(percentage * 100).toFixed(4)}%`;

  const { t } = useTranslation("visualizer");

  const isBeforeWorkTime = percentage <= 0.0;
  const isAfterWorkTime = percentage >= 1.0;
  const isWorkTime = !isBeforeWorkTime && !isAfterWorkTime;

  const collectedMoney = percentage * salaryPerDay;

  // TODO: Convert to Context if we want to access this from other components
  const totalCollectedMoney = useTotalMoney(salaryPerDay, percentage);

  useDocumentTitle(
    t(isAfterWorkTime ? "after-work-doc-title" : "doc-title", {
      money: collectedMoney.toFixed(2),
      currency,
    })
  );

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
        value={percentage * 100.0}
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
