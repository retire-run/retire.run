import {
  RetireCurrencyList,
  RetireDefaultSaveData,
  RetireFallbackCurrency,
  RetireVersion,
} from "@/constants";
import { clamp } from "@/utilities";
import { useSaveData, useSaveDataMutation } from "@/utilities/hooks";
import { timeUtilities } from "@/utilities/time";
import {
  ActionIcon,
  Button,
  DefaultMantineColor,
  Divider,
  Grid,
  Group,
  Modal,
  NativeSelect,
  NumberInput,
  RangeSlider,
  Space,
  Stack,
  Switch,
  Text,
} from "@mantine/core";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEyeOff, FiTrash, FiUserPlus } from "react-icons/fi";
import SalarySelector from "./SalarySelector";
import TimeRangeInput from "./TimeRangeInput";

const SoulModeColor: DefaultMantineColor = "dark";

interface Props {
  onCommit: VoidFunction;
}

const Editor: FunctionComponent<Props> = ({ onCommit }) => {
  const saveData = useSaveData();
  const setSaveData = useSaveDataMutation();

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
  // Soul mode only
  const [salaryModalOpened, setSalaryModalOpened] = useState(false);

  const showSoulSwitch = boringCount > 10 || saveData.soul_mode;

  const { t } = useTranslation("editor");

  return (
    <>
      <Stack>
        <TimeRangeInput
          label={t("work-time-label")}
          icon={<FiUserPlus />}
          value={{ start: workStart, end: workEnd }}
          onChange={({ start, end }) => {
            setWorkStart(start);
            setWorkEnd(end);
          }}
        ></TimeRangeInput>
        <RangeSlider
          color={soulMode ? SoulModeColor : undefined}
          min={0}
          max={24 * 60}
          value={[
            timeUtilities.serialize(workStart),
            timeUtilities.serialize(workEnd),
          ]}
          onChange={(value) => {
            const [start, end] = value;
            const padding = 60;
            setWorkStart(
              timeUtilities.deserialize(clamp(start, 0, end - padding))
            );
            setWorkEnd(
              timeUtilities.deserialize(clamp(end, start + padding, 24 * 60))
            );
          }}
          showLabelOnHover={false}
          label={null}
        ></RangeSlider>
      </Stack>
      <Divider my="xl"></Divider>
      <Stack>
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
            <Grid grow align="center">
              <Grid.Col md={11} span={10}>
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
              </Grid.Col>
              <Grid.Col span={1}>
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
              </Grid.Col>
            </Grid>
          </div>
        ))}
      </Stack>
      <Divider my="xl"></Divider>
      <Grid grow align="end">
        <Grid.Col span={6}>
          {soulMode ? (
            <div>
              <Text size="sm" weight="bold">
                {salary} {currency}
              </Text>
              <Group grow>
                <Button
                  color={soulMode ? SoulModeColor : undefined}
                  onClick={() => setSalaryModalOpened(true)}
                >
                  {t("soul-mode-set-salary-btn")}
                </Button>
              </Group>
            </div>
          ) : (
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
          )}
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            value={workDays}
            min={0}
            max={31}
            label={t("work-days-label")}
            onChange={(value) => setWorkDays(value ?? 0)}
          ></NumberInput>
        </Grid.Col>
      </Grid>
      <Space h="xl"></Space>
      <Grid align="center">
        <Grid.Col span={4} md={2}>
          <Button fullWidth color={soulMode ? "red" : "green"} onClick={commit}>
            {t("run-button")}
          </Button>
        </Grid.Col>
        <Grid.Col span={8} md={5} hidden={showSoulSwitch}>
          <Button
            fullWidth
            color="gray"
            variant="light"
            onClick={() => setBoringCount((v) => v + 1)}
          >
            {t("feeling-boring-button")}
          </Button>
        </Grid.Col>
        <Grid.Col offset={2} span={6} md={8} hidden={!showSoulSwitch}>
          <Group position="right">
            <Switch
              color="red"
              label={t("sell-soul-switch")}
              checked={soulMode}
              onChange={({ currentTarget: { checked } }) =>
                setSoulMode(checked)
              }
            ></Switch>
          </Group>
        </Grid.Col>
      </Grid>
      <Modal
        title={`${t("salary-selector-title", { ns: "app", currency })}`}
        size="xl"
        opened={salaryModalOpened}
        onClose={() => {
          setSalaryModalOpened(false);
        }}
      >
        <SalarySelector
          onChange={(value) => {
            setSalaryModalOpened(false);
            setSalary(value);
          }}
        ></SalarySelector>
      </Modal>
    </>
  );
};

export default Editor;
