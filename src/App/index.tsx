import Editor from "@/components/Editor";
import { Button, createStyles, Group, Title } from "@mantine/core";
import { FunctionComponent } from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    margin: "1.2rem",
  },
}));

const App: FunctionComponent = () => {
  const { classes } = useStyles();

  return (
    <>
      <Title>retire.run</Title>
      <div className={classes.wrapper}>
        <Editor></Editor>
      </div>
      <Group>
        <Button>Run</Button>
        <Button>I'm Feeling Lucky</Button>
      </Group>
    </>
  );
};

export default App;
