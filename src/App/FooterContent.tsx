import { RetireGithubRepo, RetireVersion } from "@/constants";
import Privacy from "@/pages/Privacy";
import { Anchor, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheckCircle, FiGithub } from "react-icons/fi";

const FooterContent: FunctionComponent = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const { t } = useTranslation("app");
  return (
    <Stack spacing={6} m="sm" align="center">
      <Group spacing="xs">
        <Anchor href={RetireGithubRepo} target="_blank">
          <Button
            leftIcon={<FiGithub />}
            styles={{ leftIcon: { marginRight: "0.4rem" } }}
            size="xs"
            variant="subtle"
            color="gray"
            compact
          >
            Github
          </Button>
        </Anchor>
        <Button
          leftIcon={<FiCheckCircle />}
          styles={{ leftIcon: { marginRight: "0.4rem" } }}
          size="xs"
          variant="subtle"
          color="gray"
          compact
          onClick={() => setPrivacyModalOpen(true)}
        >
          Privacy
        </Button>
      </Group>
      <Text size="xs">{t("disclaimer", { version: `v${RetireVersion}` })}</Text>
      <Modal
        title="Privacy"
        opened={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        centered
      >
        <Privacy></Privacy>
      </Modal>
    </Stack>
  );
};

export default FooterContent;
