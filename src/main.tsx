import "@/i18n";
import "@/styles/globals.css";
import { MantineProvider, TypographyStylesProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { FunctionComponent } from "react";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { RetireDefaultSaveData, RetireSaveDataKey } from "./constants";
import {
  LiveTimeContext,
  SaveDataContext,
  SaveDataMutationContext,
} from "./utilities/context";
import { useTimer } from "./utilities/hooks";

const Main: FunctionComponent = () => {
  const [saveData, setSaveData] = useLocalStorage<SaveData>({
    key: RetireSaveDataKey,
    defaultValue: RetireDefaultSaveData,
  });

  const time = useTimer();

  return (
    <SaveDataContext.Provider value={saveData}>
      <SaveDataMutationContext.Provider value={setSaveData}>
        <LiveTimeContext.Provider value={time}>
          <ErrorBoundary>
            <MantineProvider withNormalizeCSS withGlobalStyles>
              <TypographyStylesProvider>
                <App></App>
              </TypographyStylesProvider>
            </MantineProvider>
          </ErrorBoundary>
        </LiveTimeContext.Provider>
      </SaveDataMutationContext.Provider>
    </SaveDataContext.Provider>
  );
};

export default Main;
