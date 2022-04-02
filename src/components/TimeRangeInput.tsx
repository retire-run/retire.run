import { timeUtilities } from "@/utilities/time";
import { Group } from "@mantine/core";
import { FunctionComponent } from "react";
import TimeInput from "./TimeInput";

interface Props {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}

const TimeRangeInput: FunctionComponent<Props> = ({ value, onChange }) => {
  const { start, end } = value;
  return (
    <Group position="apart">
      <TimeInput
        value={timeUtilities.deserialize(start)}
        onChange={(val) =>
          onChange({ start: timeUtilities.serialize(val), end })
        }
      ></TimeInput>
      <TimeInput
        value={timeUtilities.deserialize(end)}
        onChange={(val) =>
          onChange({ end: timeUtilities.serialize(val), start })
        }
      ></TimeInput>
    </Group>
  );
};

export default TimeRangeInput;
