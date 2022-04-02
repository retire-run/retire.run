import { RetireVersion } from "@/constants";
import { useSaveData } from "@/utilities/hooks";
import { getTime, getTimeNumber } from "@/utilities/time";
import {
  Button,
  Collapse,
  Divider,
  Group,
  NumberInput,
  RangeSlider,
  Space,
  Switch,
} from "@mantine/core";
import { FunctionComponent, useState } from "react";
import TimeInput from "./TimeInput";

const Editor: FunctionComponent = () => {
  const [saveData, setSaveData] = useSaveData();

  const [workStart, setWorkStart] = useState(saveData.work.start);
  const [workEnd, setWorkEnd] = useState(saveData.work.end);

  const [enableBreak, setEnableBreak] = useState(saveData.enabled_break);
  const [breakStart, setBreakStart] = useState(saveData.break.start);
  const [breakEnd, setBreakEnd] = useState(saveData.break.end);

  const [salary, setSalary] = useState(saveData.salary);
  const [workDays, setWorkDays] = useState(saveData.working_days);

  const commit = () => {
    setSaveData({
      version: RetireVersion,
      edited: true,
      work: {
        start: workStart,
        end: workEnd,
      },
      enabled_break: enableBreak,
      break: {
        start: breakStart,
        end: breakEnd,
      },
      salary,
      working_days: workDays,
    });
  };
  return (
    <>
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
            value={getTime(workStart)}
            onChange={(value) => setWorkStart(getTimeNumber(value))}
          ></TimeInput>
          <TimeInput
            value={getTime(workEnd)}
            onChange={(value) => setWorkEnd(getTimeNumber(value))}
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
              value={getTime(breakStart)}
              onChange={(value) => setBreakStart(getTimeNumber(value))}
            ></TimeInput>
            <TimeInput
              value={getTime(breakEnd)}
              onChange={(value) => setBreakEnd(getTimeNumber(value))}
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
