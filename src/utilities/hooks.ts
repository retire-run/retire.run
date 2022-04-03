import {
  RetireRefreshRate,
  RetireSaveDataKey,
  RetireVersion,
} from "@/constants";
import { useInterval, useLocalStorage } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { getTotalHours } from "./time";

export function useSaveData() {
  return useLocalStorage<SaveData>({
    key: RetireSaveDataKey,
    defaultValue: {
      version: RetireVersion,
      edited: false,
      workTime: {
        start: { hour: 9, minute: 0, second: 0 },
        end: { hour: 18, minute: 0, second: 0 },
      },
      breaks: [],
      salary: 0,
      working_days: 20,
    },
  });
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
  const [saveData] = useSaveData();

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
