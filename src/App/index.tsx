import Editor from "@/components/Editor";
import Visualizer from "@/components/Visualizer";
import { RetireDefaultSaveData, RetireSaveDataKey } from "@/constants";
import { SaveDataContext, SaveDataMutationContext } from "@/utilities/context";
import {
  AppShell,
  Container,
  Group,
  Header,
  Menu,
  Modal,
  Text,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";

const App: FunctionComponent = () => {
  const [saveData, setSaveData] = useLocalStorage<SaveData>({
    key: RetireSaveDataKey,
    defaultValue: RetireDefaultSaveData,
  });

  const [editMode, setEditMode] = useState(!saveData.edited);

  useEffect(() => {
    if (!saveData.edited) {
      setEditMode(true);
    }
  }, [saveData.edited]);

  const { t } = useTranslation("app");

  const modalCloseable = saveData.edited;

  return (
    <SaveDataContext.Provider value={saveData}>
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
            <SaveDataMutationContext.Provider value={setSaveData}>
              <Editor onCommit={() => setEditMode(false)}></Editor>
            </SaveDataMutationContext.Provider>
          </Modal>
        </Container>
      </AppShell>
    </SaveDataContext.Provider>
  );
};

export default App;
