import Editor from "@/components/Editor";
import { RetireGithubRepo, RetireVersion } from "@/constants";
import Visualizer from "@/pages/Visualizer";
import WelcomeView from "@/pages/WelcomeView";
import { useSaveData } from "@/utilities/hooks";
import {
  ActionIcon,
  Anchor,
  AppShell,
  Button,
  Container,
  Footer,
  Group,
  Header,
  Menu,
  Modal,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiGithub, FiMenu, FiMoon, FiSettings, FiSun } from "react-icons/fi";

const App: FunctionComponent = () => {
  const saveData = useSaveData();
  const [editMode, setEditMode] = useState(!saveData.edited);

  useEffect(() => {
    if (!saveData.edited) {
      setEditMode(true);
    }
  }, [saveData.edited]);

  const { t } = useTranslation("app");

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const modalCloseable = saveData.edited;

  return (
    <AppShell
      fixed
      header={
        <Header height={50} p="xs">
          <Group position="apart" px={20}>
            <Text>{t("title")}</Text>
            <Group spacing="xs">
              <ActionIcon
                color={dark ? "yellow" : "indigo"}
                onClick={() => toggleColorScheme()}
              >
                {dark ? <FiSun /> : <FiMoon />}
              </ActionIcon>
              <Menu
                control={
                  <ActionIcon>
                    <FiMenu></FiMenu>
                  </ActionIcon>
                }
              >
                <Menu.Label>{t("menu-label")}</Menu.Label>
                <Menu.Item
                  icon={<FiSettings></FiSettings>}
                  onClick={() => setEditMode(true)}
                >
                  {t("menu-settings-btn")}
                </Menu.Item>
              </Menu>
            </Group>
          </Group>
        </Header>
      }
      footer={
        <Footer height={74}>
          <Stack spacing={4} m="sm" align="center">
            <Group spacing="sm">
              <Anchor href={RetireGithubRepo} target="_blank">
                <Button
                  leftIcon={<FiGithub />}
                  styles={{ leftIcon: { marginRight: "0.3rem" } }}
                  size="xs"
                  variant="subtle"
                  color="gray"
                  compact
                >
                  Github
                </Button>
              </Anchor>
            </Group>
            <Text size="xs">
              {t("disclaimer", { version: `v${RetireVersion}` })}
            </Text>
          </Stack>
        </Footer>
      }
    >
      <Container size="sm">
        {saveData.edited ? (
          <Visualizer></Visualizer>
        ) : (
          <WelcomeView></WelcomeView>
        )}
      </Container>
      <Modal
        opened={editMode}
        size="lg"
        onClose={() => setEditMode(false)}
        centered
        withCloseButton={modalCloseable}
        closeOnClickOutside={modalCloseable}
        closeOnEscape={modalCloseable}
        title={
          <Title order={3}>
            {saveData.soul_mode
              ? t("editor-soul-mode-title")
              : t("editor-title")}
          </Title>
        }
      >
        <Editor onCommit={() => setEditMode(false)}></Editor>
      </Modal>
    </AppShell>
  );
};

export default App;
