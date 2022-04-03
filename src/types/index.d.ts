interface Time {
  hour: number;
  minute: number;
  second: number;
}

interface TimeRange {
  start: Time;
  end: Time;
}

interface SaveData {
  version: string;
  edited: boolean;
  soul_mode: boolean;
  workTime: TimeRange;
  breaks: TimeRange[];
  salary: number;
  working_days: number;
  currency: string;
}
