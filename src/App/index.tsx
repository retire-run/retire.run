import Editor from "@/components/Editor";
import Visualizer from "@/components/Visualizer";
import { useSaveData } from "@/utilities/hooks";
import { Container, Modal, Space, Title } from "@mantine/core";
import { FunctionComponent, useState } from "react";

const App: FunctionComponent = () => {
  const [saveData] = useSaveData();
  const [editMode, setEditMode] = useState(!saveData.edited);

  return (
    <Container>
      <Title>retire.run</Title>
      <Space h="xl"></Space>
      {!editMode && <Visualizer></Visualizer>}
      <Modal
        opened={editMode}
        size="lg"
        onClose={() => setEditMode(false)}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
        closeOnEscape={false}
      >
        <Editor onCommit={() => setEditMode(false)}></Editor>
      </Modal>
    </Container>
  );
};

export default App;
