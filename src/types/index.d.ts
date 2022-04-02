interface Time {
  hour: number;
  minute: number;
  second: number;
}

interface SaveData {
  version: string;
  edited: boolean;
  workTime: {
    start: number;
    end: number;
  };
  enabled_break: boolean;
  breakTime: {
    start: number;
    end: number;
  };
  salary: number;
  working_days: number;
}
