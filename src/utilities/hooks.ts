import { useContext } from "react";
import { SaveDataContext, SaveDataMutationContext } from "./context";

export function useSaveData() {
  return useContext(SaveDataContext);
}

export function useSaveDataMutation() {
  return useContext(SaveDataMutationContext);
}
