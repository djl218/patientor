import React from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

import { Patient, MatchParams } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useRouteMatch } from 'react-router-dom';

const IndividualPatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const match: MatchParams | null = useRouteMatch('/patients/:id');

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/api/patients/${match!.params.id}`
        );
        dispatch({ type: "SET_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e.response.data);
      }
    };
    fetchPatient();
  }, [match, dispatch]);

  const patient: Patient | null | undefined = match
    ? Object.values(patients).find((patient: Patient) => patient.id === match.params.id)
    : null;

  const genderIcon = () => {
    if (patient!.gender === "male") {
      return (
        <i className="mars icon"></i>
      );
    } else if(patient!.gender === "female") {
      return (
        <i className="venus icon"></i>
      );
    } else {
      return (
        <i className="genderless icon"></i>
      );
    }
  };

  if (!patient) {
    return null;
  } else {
    return (
      <div className="App">
        <Container textAlign="left">
          <h3>{patient!.name}{genderIcon()}</h3>
          <div><b>ssn: {patient!.ssn}</b></div>
          <div><b>occupation: {patient!.occupation}</b></div>
        </Container>
      </div>
    );
  }
};

export default IndividualPatientPage;