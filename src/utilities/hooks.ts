import { RetireRefreshRate } from "@/constants";
import { useContext, useEffect, useState } from "react";
import * as workerTimers from "worker-timers";
import {
  LiveTimeContext,
  SaveDataContext,
  SaveDataMutationContext,
} from "./context";
import { getCurrentTime } from "./time";

export function useSaveData() {
  return useContext(SaveDataContext);
}

export function useSaveDataMutation() {
  return useContext(SaveDataMutationContext);
}

export function useTimer() {
  const [time, setTime] = useState<Time>(getCurrentTime);

  useEffect(() => {
    const handle = workerTimers.setInterval(() => {
      setTime(getCurrentTime);
    }, RetireRefreshRate);

    return () => {
      workerTimers.clearInterval(handle);
    };
  }, []);

  return time;
}

export function useTime() {
  const time = useContext(LiveTimeContext);

  if (time === null) {
    throw new Error("useTime is used outside of LiveTimeContext");
  }

  return time;
}
