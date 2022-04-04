import "@/i18n";
import "@/styles/globals.css";
import { useLocalStorage } from "@mantine/hooks";
import { FunctionComponent } from "react";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { RetireDefaultSaveData, RetireSaveDataKey } from "./constants";
import { SaveDataContext, SaveDataMutationContext } from "./utilities/context";

const Main: FunctionComponent = () => {
  const [saveData, setSaveData] = useLocalStorage<SaveData>({
    key: RetireSaveDataKey,
    defaultValue: RetireDefaultSaveData,
  });
  return (
    <SaveDataContext.Provider value={saveData}>
      <SaveDataMutationContext.Provider value={setSaveData}>
        <ErrorBoundary>
          <App></App>
        </ErrorBoundary>
      </SaveDataMutationContext.Provider>
    </SaveDataContext.Provider>
  );
};

export default Main;
