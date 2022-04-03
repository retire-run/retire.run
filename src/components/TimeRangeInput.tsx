import { timeUtilities } from "@/utilities/time";
import {
  TimeRangeInput as MantineTimeRangeInput,
  TimeRangeInputProps as MantineTimeRangeInputProps,
} from "@mantine/dates";
import { FunctionComponent } from "react";

type Props = Omit<MantineTimeRangeInputProps, "value" | "onChange"> & {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
};

const TimeRangeInput: FunctionComponent<Props> = ({ value, onChange }) => {
  const { start, end } = value;
  return (
    <MantineTimeRangeInput
      value={[timeUtilities.toDateTime(start), timeUtilities.toDateTime(end)]}
      onChange={(value) => {
        const [start, end] = value;
        onChange &&
          onChange({
            start: timeUtilities.fromDateTime(start),
            end: timeUtilities.fromDateTime(end),
          });
      }}
    ></MantineTimeRangeInput>
  );
};

export default TimeRangeInput;
