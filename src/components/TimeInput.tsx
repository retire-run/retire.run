import { timeUtilities, toMinutes } from "@/utilities/time";
import { NumberInput } from "@mantine/core";
import { FunctionComponent } from "react";

interface Props {
  value: Time;
  onChange?: (value: Time) => void;
}

const TimeInput: FunctionComponent<Props> = ({
  value,
  onChange: onChanged,
}) => {
  return (
    <NumberInput
      value={toMinutes(value)}
      parser={(value) => {
        if (value) {
          const [hour, minute] = value.split(":");
          return timeUtilities
            .serialize({
              hour: parseInt(hour),
              minute: parseInt(minute),
              second: 0,
            })
            .toString();
        }
        return value;
      }}
      formatter={(value) => {
        if (value && !isNaN(parseInt(value))) {
          const time = timeUtilities.deserialize(parseInt(value));
          const hourStr = time.hour.toString().padStart(2, "0");
          const minuteStr = time.minute.toString().padStart(2, "0");
          return `${hourStr}:${minuteStr}`;
        }
        return "00:00";
      }}
      onChange={(value) =>
        onChanged && onChanged(timeUtilities.deserialize(value ?? 0))
      }
    ></NumberInput>
  );
};

export default TimeInput;
