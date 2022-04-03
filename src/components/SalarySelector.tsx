import { Button, Chip, Chips, Group } from "@mantine/core";
import { FunctionComponent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiRefreshCw } from "react-icons/fi";

const minSalary = 10000;
const maxSalary = 1000000;
const salaryCount = 100;

function generateSalary(): number {
  return Math.floor(Math.random() * (maxSalary - minSalary)) + minSalary;
}

interface Props {
  onChange: (value: number) => void;
}

const SalarySelector: FunctionComponent<Props> = ({ onChange }) => {
  const [salaryList, setSalaryList] = useState<number[]>(() =>
    Array(salaryCount).fill(0).map(generateSalary)
  );

  const regenerate = useCallback(() => {
    setSalaryList(Array(salaryCount).fill(0).map(generateSalary));
  }, []);

  const { t } = useTranslation("salary-selector");

  return (
    <Group grow direction="column">
      <Button onClick={regenerate} leftIcon={<FiRefreshCw></FiRefreshCw>}>
        {t("regenerate-btn")}
      </Button>
      <Chips
        size="xs"
        radius="sm"
        position="center"
        styles={{
          label: { width: "5rem", textAlign: "center" },
        }}
        onChange={(value: unknown) => {
          if (typeof value === "number") {
            onChange(value);
          }
        }}
      >
        {salaryList.map((salary, index) => (
          <Chip value={salary} key={`salary-chip-${index}-${salary}`}>
            {salary}
          </Chip>
        ))}
      </Chips>
    </Group>
  );
};

export default SalarySelector;
