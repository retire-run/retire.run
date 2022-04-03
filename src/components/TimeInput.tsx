import { timeUtilities } from "@/utilities/time";
import {
  TimeInput as MantineTimeInput,
  TimeInputProps as MantineTimeInputProps,
} from "@mantine/dates";
import { FunctionComponent } from "react";

type Props = Omit<MantineTimeInputProps, "value" | "onChange"> & {
  value: Time;
  onChange?: (value: Time) => void;
};

const TimeInput: FunctionComponent<Props> = ({ value, onChange, ...other }) => {
  return (
    <MantineTimeInput
      value={timeUtilities.toDateTime(value)}
      onChange={(value) =>
        onChange && onChange(timeUtilities.fromDateTime(value))
      }
      {...other}
    ></MantineTimeInput>
  );
};

export default TimeInput;
