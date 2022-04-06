import { RetireDefaultSaveData } from "@/constants";
import { createContext } from "react";

export const SaveDataContext = createContext<SaveData>(RetireDefaultSaveData);
export const SaveDataMutationContext = createContext<
  (val: SaveData | ((prevState: SaveData) => SaveData)) => void
>(() => {
  throw new Error("SaveDataMutationContext is not available");
});

export const LiveTimeContext = createContext<Time | null>(null);
