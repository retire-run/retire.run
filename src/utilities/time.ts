export function getTime(num: number): Time {
  const hour = num % 60;
  const minute = Math.floor(num / 60);

  return { hour, minute };
}

export function getTimeNumber(time: Time): number {
  return time.hour * 60 + time.minute;
}

export function getTimeNum(hour: number, minute: number): number {
  return getTimeNumber({ hour, minute });
}
