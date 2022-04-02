interface Time {
  hour: number;
  minute: number;
}

interface SaveData {
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
