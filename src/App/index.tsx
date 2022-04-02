import Editor from "@/components/Editor";
import Visualizer from "@/components/Visualizer";
import { useSaveData } from "@/utilities/hooks";
import { Container, Space, Title } from "@mantine/core";
import { FunctionComponent, useState } from "react";

const App: FunctionComponent = () => {
  const [editMode] = useState(false);
  const [saveData] = useSaveData();

  const isInEditMode = editMode || saveData.edited === false;

  return (
    <Container>
      <Title>retire.run</Title>
      <Space h="xl"></Space>
      {isInEditMode ? <Editor></Editor> : <Visualizer></Visualizer>}
    </Container>
  );
};

export default App;
