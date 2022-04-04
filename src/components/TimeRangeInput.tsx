import { timeUtilities } from "@/utilities/time";
import {
  TimeRangeInput as MantineTimeRangeInput,
  TimeRangeInputProps as MantineTimeRangeInputProps,
} from "@mantine/dates";
import { FunctionComponent, useState } from "react";

type Props = Omit<MantineTimeRangeInputProps, "value" | "onChange"> & {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
};

const TimeRangeInput: FunctionComponent<Props> = ({
  value,
  onChange,
  ...other
}) => {
  const { start, end } = value;

  const [focus, setFocus] = useState(false);

  return (
    <MantineTimeRangeInput
      value={[timeUtilities.toDateTime(start), timeUtilities.toDateTime(end)]}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onChange={(value) => {
        if (focus) {
          const [start, end] = value;
          onChange({
            start: timeUtilities.fromDateTime(start),
            end: timeUtilities.fromDateTime(end),
          });
        }
      }}
      {...other}
    ></MantineTimeRangeInput>
  );
};

export default TimeRangeInput;
