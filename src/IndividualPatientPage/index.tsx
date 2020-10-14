import React from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

import { Patient, MatchParams, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { useRouteMatch, useParams } from 'react-router-dom';

const EntryHelper: React.FC<{ code: string }> = ({code}) => {
  return (
    <li>{code}</li>
  )
};

const NoEntryHelper: React.FC = () => {
  return (
    <div>no entries for patient</div>
  )
};

const IndividualPatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/api/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e.response.data);
      }
    };
    fetchPatient();
  }, [dispatch, id]);

  const match: MatchParams | null = useRouteMatch('/patients/:id');
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
          <h2>{patient!.name}{genderIcon()}</h2>
          <div><b>ssn: {patient!.ssn}</b></div>
          <div><b>occupation: {patient!.occupation}</b></div>
          <h3>entries</h3>
          {
            patient.entries === undefined || patient.entries.length === 0 
            ? <NoEntryHelper />
            : patient.entries.map((entry: Entry) => (
              <div key={entry.id}>
              <div>{entry.date} <i>{entry.description}</i></div>
              <ul>
                {
                  entry.diagnosisCodes === undefined
                  ? null
                  : entry.diagnosisCodes
                    .map((code: string) =>
                      <EntryHelper
                        key={code}
                        code={code}
                      />  
                    )    
                }
              </ul>
              </div>
          ))}
        </Container>
      </div>
    );
  }
};

export default IndividualPatientPage;