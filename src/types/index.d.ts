interface Time {
  hour: number;
  minute: number;
  second: number;
}

interface TimeRange {
  start: number;
  end: number;
}

interface SaveData {
  version: string;
  edited: boolean;
  workTime: TimeRange;
  breaks: TimeRange[];
  salary: number;
  working_days: number;
}
