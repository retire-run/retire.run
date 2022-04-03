import {
  RetireCurrencyList,
  RetireDefaultSaveData,
  RetireFallbackCurrency,
  RetireVersion,
} from "@/constants";
import { useSaveData } from "@/utilities/hooks";
import { timeUtilities } from "@/utilities/time";
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  NativeSelect,
  NumberInput,
  RangeSlider,
  Space,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEyeOff, FiTrash, FiUserPlus } from "react-icons/fi";
import TimeRangeInput from "./TimeRangeInput";

interface Props {
  onCommit: VoidFunction;
}

const Editor: FunctionComponent<Props> = ({ onCommit }) => {
  const [saveData, setSaveData] = useSaveData();

  const [soulMode, setSoulModeInternal] = useState(saveData.soul_mode);

  const setSoulMode = useCallback(
    (value: boolean) => {
      setSoulModeInternal(value);
      // Reset everything
      if (value) {
        setSaveData({
          version: RetireVersion,
          edited: false,
          soul_mode: true,
          workTime: {
            start: { hour: 6, minute: 0, second: 0 },
            end: { hour: 23, minute: 0, second: 0 },
          },
          breaks: [],
          salary: 0,
          working_days: 31,
          currency: RetireFallbackCurrency,
        });
      } else {
        setSaveData(RetireDefaultSaveData);
      }
    },
    [setSaveData]
  );

  useEffect(() => {
    setWorkStart(saveData.workTime.start);
    setWorkEnd(saveData.workTime.end);
    setBreaks(saveData.breaks);
    setSalary(saveData.salary);
    setWorkDays(saveData.working_days);
    setSoulModeInternal(saveData.soul_mode);
    setCurrency(saveData.currency);
  }, [saveData]);

  const [workStart, setWorkStart] = useState(saveData.workTime.start);
  const [workEnd, setWorkEnd] = useState(saveData.workTime.end);

  const [breaks, setBreaks] = useState(saveData.breaks);

  const [salary, setSalary] = useState(saveData.salary);
  const [workDays, setWorkDays] = useState(saveData.working_days);
  const [currency, setCurrency] = useState(saveData.currency);

  const commit = () => {
    setSaveData({
      version: RetireVersion,
      edited: true,
      soul_mode: soulMode,
      workTime: {
        start: workStart,
        end: workEnd,
      },
      breaks,
      salary,
      working_days: workDays,
      currency,
    });

    onCommit();
  };

  const [boringCount, setBoringCount] = useState(0);

  const showSoulSwitch = boringCount > 10 || saveData.soul_mode;

  const { t } = useTranslation("editor");

  return (
    <>
      <Title order={3}>{soulMode ? t("title-soul-mode") : t("title")}</Title>
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
          icon={<FiUserPlus />}
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
          disabled={soulMode}
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
            <Group>
              <TimeRangeInput
                icon={<FiEyeOff />}
                withSeconds
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
          <div>
            <NumberInput
              value={salary}
              min={0}
              label={t("salary-label")}
              hideControls
              onChange={(value) => setSalary(value ?? 0)}
              styles={{ rightSection: { width: "3rem" } }}
              rightSection={
                <NativeSelect
                  style={{ width: "100%" }}
                  variant="unstyled"
                  size="xs"
                  data={RetireCurrencyList}
                  value={currency}
                  onChange={({ currentTarget: { value } }) =>
                    setCurrency(value)
                  }
                ></NativeSelect>
              }
            ></NumberInput>
          </div>
          <NumberInput
            value={workDays}
            min={0}
            max={31}
            label={t("work-days-label")}
            onChange={(value) => setWorkDays(value ?? 0)}
          ></NumberInput>
        </Group>
      </div>
      <Space h="xl"></Space>
      <Group position="apart">
        <Group>
          <Button color={soulMode ? "red" : "green"} onClick={commit}>
            {t("run-button")}
          </Button>
          <div hidden={showSoulSwitch}>
            <Button
              color="gray"
              variant="light"
              onClick={() => setBoringCount((v) => v + 1)}
            >
              {t("feeling-boring-button")}
            </Button>
          </div>
        </Group>
        <div hidden={!showSoulSwitch}>
          <Switch
            color="red"
            label={t("sell-soul-switch")}
            checked={soulMode}
            onChange={({ currentTarget: { checked } }) => setSoulMode(checked)}
          ></Switch>
        </div>
      </Group>
    </>
  );
};

export default Editor;
