import "@/i18n";
import "@/styles/globals.css";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  TypographyStylesProvider,
} from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
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

  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);

  // automatically switch dark/light theme
  useEffect(() => {
    setColorScheme(preferredColorScheme);
  }, [preferredColorScheme]);

  const toggleColorScheme = useCallback((value?: ColorScheme) => {
    setColorScheme((scheme) => value || (scheme === "dark" ? "light" : "dark"));
  }, []);

  return (
    <SaveDataContext.Provider value={saveData}>
      <SaveDataMutationContext.Provider value={setSaveData}>
        <LiveTimeContext.Provider value={time}>
          <ErrorBoundary>
            <ColorSchemeProvider
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
            >
              <MantineProvider
                withNormalizeCSS
                withGlobalStyles
                theme={{ colorScheme }}
              >
                <TypographyStylesProvider>
                  <App></App>
                </TypographyStylesProvider>
              </MantineProvider>
            </ColorSchemeProvider>
          </ErrorBoundary>
        </LiveTimeContext.Provider>
      </SaveDataMutationContext.Provider>
    </SaveDataContext.Provider>
  );
};

export default Main;
