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
} from "@mantine/core";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";

const App: FunctionComponent = () => {
  const [saveData] = useSaveData();
  const [editMode, setEditMode] = useState(!saveData.edited);

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
      <Container>
        {!editMode && <Visualizer></Visualizer>}
        <Modal
          opened={editMode}
          size="lg"
          onClose={() => setEditMode(false)}
          centered
          withCloseButton={false}
          closeOnClickOutside={modalCloseable}
          closeOnEscape={modalCloseable}
        >
          <Editor onCommit={() => setEditMode(false)}></Editor>
        </Modal>
      </Container>
    </AppShell>
  );
};

export default App;
