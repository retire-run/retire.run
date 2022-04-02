export const timeUtilities = {
  serialize: (time: Time): number => {
    return toMinutes(time);
  },
  deserialize: (inValue: number): Time => {
    const hour = Math.floor(inValue / 60);
    const minute = inValue % 60;

    return { hour, minute, second: 0 };
  },
};

export function toSeconds(time: Time): number {
  const hourToSec = time.hour * 60 * 60;
  const minuteToSec = time.minute * 60;
  return hourToSec + minuteToSec + time.second;
}

export function toMinutes(time: Time): number {
  const hourToMin = time.hour * 60;
  const secondToMin = time.second / 60;
  return hourToMin + time.minute + secondToMin;
}

export function toHours(time: Time): number {
  const minuteToHour = time.minute / 60;
  const secondToHour = time.second / 60 / 60;
  return time.hour + minuteToHour + secondToHour;
}

export function getTotalSeconds(from: Time, to: Time): number {
  return toSeconds(to) - toSeconds(from);
}

export function getTotalMinutes(from: Time, to: Time): number {
  return toMinutes(to) - toMinutes(from);
}

export function getTotalHours(from: Time, to: Time): number {
  return toHours(to) - toHours(from);
}
