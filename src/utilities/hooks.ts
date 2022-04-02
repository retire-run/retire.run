import { useLocalStorage } from "@mantine/hooks";
import { getTimeNum } from "./time";

export function useSaveData() {
  return useLocalStorage<SaveData>({
    key: "retire-save-data",
    defaultValue: {
      work: {
        start: getTimeNum(9, 0),
        end: getTimeNum(18, 0),
      },
      enabled_break: false,
      break: {
        start: getTimeNum(12, 0),
        end: getTimeNum(13, 0),
      },
      salary: 0,
      working_days: 20,
    },
  });
}
