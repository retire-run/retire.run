import Editor from "@/components/Editor";
import { createStyles, Title } from "@mantine/core";
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
    </>
  );
};

export default App;
