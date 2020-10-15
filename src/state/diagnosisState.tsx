import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis } from "../types";

import { DiagnosisAction } from "./diagnosisReducer";

export type DiagnosisState = {
  diagnoses: { [code: string]: Diagnosis };
};

const initialState: DiagnosisState = {
  diagnoses: {}
};

export const DiagnosisStateContext = createContext<[DiagnosisState, React.Dispatch<DiagnosisAction>]>([
  initialState,
  () => initialState
]);

type DiagnosisStateProviderProps = {
  diagnosisReducer: React.Reducer<DiagnosisState, DiagnosisAction>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<DiagnosisStateProviderProps> = ({
  diagnosisReducer,
  children
}: DiagnosisStateProviderProps) => {
  const [state, dispatch] = useReducer(diagnosisReducer, initialState);
  return (
    <DiagnosisStateContext.Provider value={[state, dispatch]}>
      {children}
    </DiagnosisStateContext.Provider>
  );
};

export const useDiagnosisStateValue = () => useContext(DiagnosisStateContext);