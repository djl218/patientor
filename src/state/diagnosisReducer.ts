import { DiagnosisState } from "./diagnosisState";
import { Diagnosis } from "../types";

export type DiagnosisAction = 
  {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  };

export const diagnosisReducer = (state: DiagnosisState, action: DiagnosisAction): DiagnosisState => {
  switch (action.type) {
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};

export const setDiagnosisList = (diagnoses: Diagnosis[]): DiagnosisAction => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnoses
  }
};