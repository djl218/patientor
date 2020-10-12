import React from "react";
//import axios from "axios";
import { Container } from "semantic-ui-react";

import { Patient, MatchParams } from "../types";
//import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useRouteMatch } from 'react-router-dom';
//import PatientListPage from "../PatientListPage";

const IndividualPatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();

  const match: MatchParams | null = useRouteMatch('/patients/:id');
  console.log(match)
  const patient: Patient | null | undefined = match
    ? Object.values(patients).find((patient: Patient) => patient.id === match.params.id)
    : null;

  /*const genderIcon = () => {
    if (patient!.gender === "male") {
      return (
        <Icon class="mars"></Icon>
      )
    } else if(patient!.gender === "female") {
      return (
        <Icon class="venus"></Icon>
      )
    } else {
      return (
        <Icon class="genderless"></Icon>
      )
    }
  };*/

  return (
    <div className="App">
      <Container textAlign="left">
        <h3>{patient!.name}</h3>
        <div><b>ssn: {patient!.ssn}</b></div>
        <div><b>occupation: {patient!.occupation}</b></div>
      </Container>
    </div>
  );
};

export default IndividualPatientPage;