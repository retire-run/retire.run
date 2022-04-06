import { Group, Stack, Text, Title } from "@mantine/core";
import { FunctionComponent } from "react";

interface SectionProps {
  title: string;
  children: string;
}

const Section: FunctionComponent<SectionProps> = ({ title, children }) => {
  return (
    <Group direction="column" mt="md" spacing="xs">
      <Title order={4}>{title}</Title>
      <Text weight="normal" size="sm">
        {children}
      </Text>
    </Group>
  );
};

const Privacy: FunctionComponent = () => {
  return (
    <Stack>
      <Section title="Collection of personal information">We don't</Section>
      <Section title="Collection of non-personal information">We don't</Section>
      <Section title="Data processing">
        All of your personal data is processed locally
      </Section>
    </Stack>
  );
};

export default Privacy;
