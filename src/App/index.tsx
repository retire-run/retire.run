import Editor from "@/components/Editor";
import Visualizer from "@/pages/Visualizer";
import WelcomeView from "@/pages/WelcomeView";
import { useSaveData } from "@/utilities/hooks";
import {
  ActionIcon,
  AppShell,
  Container,
  Footer,
  Group,
  Header,
  Menu,
  Modal,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMenu, FiMoon, FiSettings, FiSun } from "react-icons/fi";
import FooterContent from "./FooterContent";

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
          <FooterContent></FooterContent>
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
