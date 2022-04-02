import { getTime, getTimeNum, getTimeNumber } from "@/utility/time";
import { Group, NumberInput, RangeSlider, Space, Switch } from "@mantine/core";
import { FunctionComponent, useState } from "react";
import TimeInput from "./TimeInput";

const Editor: FunctionComponent = () => {
  const [workStart, setWorkStart] = useState(getTimeNum(9, 0));
  const [workEnd, setWorkEnd] = useState(getTimeNum(18, 0));

  const [salary, setSalary] = useState(0);
  const [workDays, setWorkDays] = useState(20);
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
      <Space h="xl"></Space>
      <div>
        <Switch label="Launch Break"></Switch>
      </div>
      <Space h="xl"></Space>
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
    </>
  );
};

export default Editor;
