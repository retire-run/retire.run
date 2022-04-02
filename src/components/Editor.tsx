import { RetireVersion } from "@/constants";
import { useSaveData } from "@/utilities/hooks";
import { timeUtilities, toMinutes } from "@/utilities/time";
import {
  Button,
  Collapse,
  Divider,
  Group,
  NumberInput,
  RangeSlider,
  Space,
  Switch,
  Title,
} from "@mantine/core";
import { FunctionComponent, useState } from "react";
import TimeInput from "./TimeInput";

interface Props {
  onCommit: VoidFunction;
}

const Editor: FunctionComponent<Props> = ({ onCommit }) => {
  const [saveData, setSaveData] = useSaveData();

  const [workStart, setWorkStart] = useState(saveData.workTime.start);
  const [workEnd, setWorkEnd] = useState(saveData.workTime.end);

  const [enableBreak, setEnableBreak] = useState(saveData.enabled_break);
  const [breakStart, setBreakStart] = useState(saveData.breakTime.start);
  const [breakEnd, setBreakEnd] = useState(saveData.breakTime.end);

  const [salary, setSalary] = useState(saveData.salary);
  const [workDays, setWorkDays] = useState(saveData.working_days);

  const commit = () => {
    setSaveData({
      version: RetireVersion,
      edited: true,
      workTime: {
        start: workStart,
        end: workEnd,
      },
      enabled_break: enableBreak,
      breakTime: {
        start: breakStart,
        end: breakEnd,
      },
      salary,
      working_days: workDays,
    });

    onCommit();
  };

  return (
    <>
      <Title order={3}>你正在成功</Title>
      <Space h="xl"></Space>
      <div>
        <RangeSlider
          min={0}
          max={1440}
          value={[workStart, workEnd]}
          onChange={(value) => {
            setWorkStart(value[0]);
            setWorkEnd(value[1]);
          }}
          showLabelOnHover={false}
          label={null}
        ></RangeSlider>
        <Space h="lg"></Space>
        <Group>
          <TimeInput
            value={timeUtilities.deserialize(workStart)}
            onChange={(value) => setWorkStart(toMinutes(value))}
          ></TimeInput>
          <TimeInput
            value={timeUtilities.deserialize(workEnd)}
            onChange={(value) => setWorkEnd(toMinutes(value))}
          ></TimeInput>
        </Group>
      </div>
      <Divider my="xl"></Divider>
      <div>
        <Switch
          checked={enableBreak}
          onChange={(event) => setEnableBreak(event.currentTarget.checked)}
          label="Launch Break"
        ></Switch>
        <Space h="lg"></Space>
        <Collapse in={enableBreak}>
          <Group>
            <TimeInput
              value={timeUtilities.deserialize(breakStart)}
              onChange={(value) => setBreakStart(toMinutes(value))}
            ></TimeInput>
            <TimeInput
              value={timeUtilities.deserialize(breakEnd)}
              onChange={(value) => setBreakEnd(toMinutes(value))}
            ></TimeInput>
          </Group>
        </Collapse>
      </div>
      <Divider my="xl"></Divider>
      <div>
        <Group>
          <NumberInput
            value={salary}
            label="Monthly Salary"
            hideControls
            onChange={(value) => setSalary(value ?? 0)}
          ></NumberInput>
          <NumberInput
            value={workDays}
            label="Work Days Per Month"
            onChange={(value) => setWorkDays(value ?? 0)}
          ></NumberInput>
        </Group>
      </div>
      <Space h="xl"></Space>
      <Group>
        <Button onClick={commit}>Run</Button>
        <Button onClick={commit}>I'm Feeling Boring</Button>
      </Group>
    </>
  );
};

export default Editor;
