interface Time {
  hour: number;
  minute: number;
}

interface SaveData {
  version: string;
  edited: boolean;
  work: {
    start: number;
    end: number;
  };
  enabled_break: boolean;
  break: {
    start: number;
    end: number;
  };
  salary: number;
  working_days: number;
}
