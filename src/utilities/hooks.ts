import { RetireRefreshRate, RetireVersion } from "@/constants";
import { useInterval, useLocalStorage } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { getTotalHours, timeUtilities } from "./time";

export function useSaveData() {
  return useLocalStorage<SaveData>({
    key: "retire-save-data",
    defaultValue: {
      version: RetireVersion,
      edited: false,
      workTime: {
        start: timeUtilities.serialize({ hour: 9, minute: 0, second: 0 }),
        end: timeUtilities.serialize({ hour: 18, minute: 0, second: 0 }),
      },
      enabled_break: false,
      breakTime: {
        start: timeUtilities.serialize({ hour: 12, minute: 0, second: 0 }),
        end: timeUtilities.serialize({ hour: 13, minute: 0, second: 0 }),
      },
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
    const { workTime, breakTime, enabled_break, salary, working_days } =
      saveData;

    const salaryPerDay = salary / working_days;

    const workingHours = getTotalHours(
      timeUtilities.deserialize(workTime.start),
      timeUtilities.deserialize(workTime.end)
    );

    const breakHours = getTotalHours(
      timeUtilities.deserialize(breakTime.start),
      timeUtilities.deserialize(breakTime.end)
    );

    const effectiveWorkingHours =
      workingHours - (enabled_break ? breakHours : 0.0);

    return {
      salaryPerDay,
      workingHours,
      effectiveWorkingHours,
      breakHours,
    };
  }, [saveData]);
}
