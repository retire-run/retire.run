import { RetireVersion } from "@/constants";
import { useSaveData } from "@/utilities/hooks";
import { timeUtilities } from "@/utilities/time";
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  NumberInput,
  RangeSlider,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiTrash } from "react-icons/fi";
import TimeRangeInput from "./TimeRangeInput";

interface Props {
  onCommit: VoidFunction;
}

const Editor: FunctionComponent<Props> = ({ onCommit }) => {
  const [saveData, setSaveData] = useSaveData();

  const [workStart, setWorkStart] = useState(saveData.workTime.start);
  const [workEnd, setWorkEnd] = useState(saveData.workTime.end);

  const [breaks, setBreaks] = useState(saveData.breaks);

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
      breaks,
      salary,
      working_days: workDays,
    });

    onCommit();
  };

  const { t } = useTranslation("editor");

  return (
    <>
      <Title order={3}>{t("title")}</Title>
      <Space h="xl"></Space>
      <div>
        <RangeSlider
          min={0}
          max={1440}
          value={[
            timeUtilities.serialize(workStart),
            timeUtilities.serialize(workEnd),
          ]}
          onChange={(value) => {
            const [start, end] = value;
            setWorkStart(timeUtilities.deserialize(start));
            setWorkEnd(timeUtilities.deserialize(end));
          }}
          showLabelOnHover={false}
          label={null}
        ></RangeSlider>
        <Space h="lg"></Space>
        <TimeRangeInput
          value={{ start: workStart, end: workEnd }}
          onChange={({ start, end }) => {
            setWorkStart(start);
            setWorkEnd(end);
          }}
        ></TimeRangeInput>
      </div>
      <Divider my="xl"></Divider>
      <div>
        <Button
          size="sm"
          fullWidth
          variant="light"
          onClick={() =>
            setBreaks((s) => {
              const hour = s.length > 0 ? s[s.length - 1].end.hour : 12;
              return [
                ...s,
                {
                  start: {
                    hour,
                    minute: 0,
                    second: 0,
                  },
                  end: {
                    hour: hour + 1,
                    minute: 0,
                    second: 0,
                  },
                },
              ];
            })
          }
        >
          <Text>{t("break-button")}</Text>
        </Button>
        {breaks.map((value, i) => (
          <div key={`break-time-${i}-${value.start}-${value.end}`}>
            <Space h="sm"></Space>
            <Group position="center">
              <TimeRangeInput
                value={value}
                onChange={(val) => {
                  setBreaks((s) => {
                    const list = [...s];
                    list[i] = val;
                    return list;
                  });
                }}
              ></TimeRangeInput>
              <ActionIcon
                color="red"
                onClick={() => {
                  setBreaks((s) => {
                    const list = [...s];
                    list.splice(i, 1);
                    return list;
                  });
                }}
              >
                <FiTrash></FiTrash>
              </ActionIcon>
            </Group>
          </div>
        ))}
      </div>
      <Divider my="xl"></Divider>
      <div>
        <Group grow>
          <NumberInput
            value={salary}
            label={t("salary-label")}
            hideControls
            onChange={(value) => setSalary(value ?? 0)}
          ></NumberInput>
          <NumberInput
            value={workDays}
            label={t("work-days-label")}
            onChange={(value) => setWorkDays(value ?? 0)}
          ></NumberInput>
        </Group>
      </div>
      <Space h="xl"></Space>
      <Group>
        <Button onClick={commit}>{t("run-button")}</Button>
        <Button onClick={commit}>{t("feeling-boring-button")}</Button>
      </Group>
    </>
  );
};

export default Editor;
