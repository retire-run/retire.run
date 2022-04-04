import Editor from "@/components/Editor";
import Visualizer from "@/components/Visualizer";
import { useSaveData } from "@/utilities/hooks";
import {
  AppShell,
  Container,
  Group,
  Header,
  Menu,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";

const App: FunctionComponent = () => {
  const saveData = useSaveData();
  const [editMode, setEditMode] = useState(!saveData.edited);

  useEffect(() => {
    if (!saveData.edited) {
      setEditMode(true);
    }
  }, [saveData.edited]);

  const { t } = useTranslation("app");

  const modalCloseable = saveData.edited;

  return (
    <AppShell
      header={
        <Header height={50} p="xs">
          <Group position="apart" px={20}>
            <Text>{t("title")}</Text>
            <Menu>
              <Menu.Label>{t("menu-label")}</Menu.Label>
              <Menu.Item
                icon={<FiSettings></FiSettings>}
                onClick={() => setEditMode(true)}
              >
                {t("menu-settings-btn")}
              </Menu.Item>
            </Menu>
          </Group>
        </Header>
      }
    >
      <Container>{saveData.edited && <Visualizer></Visualizer>}</Container>
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
