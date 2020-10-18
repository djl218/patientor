import React from "react";
import axios from "axios";
import { Container, Button } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, setDiagnosisList, addEntry } from "../state";
import { useRouteMatch, useParams } from 'react-router-dom';
import {
  Patient,
  MatchParams,
  Entry,
  Diagnosis
} from "../types";
import { AddHospitalEntryModal, AddOccupationalEntryModal, AddHealthyCheckEntryModal } from '../AddEntryModal'
import { HospitalEntryFormValues } from "../AddEntryModal/AddHospitalEntryForm";
import { OccupationalEntryFormValues } from "../AddEntryModal/AddOccupationalEntryForm";
import { HealthyCheckEntryFormValues } from "../AddEntryModal/AddHealthyCheckEntryForm";

const NoEntryHelper: React.FC = () => {
  return (
    <div>no entries for patient</div>
  )
};

const EntryHelper: React.FC<{ code: string, diagnoses: Diagnosis[] }> = ({ code, diagnoses }) => {
  return (
    <li>
      {code}
      &nbsp;
      {
        Object.values(diagnoses)
        .filter((diagnosis: Diagnosis) => diagnosis.code === code)
        .map((diagnosis: Diagnosis) => diagnosis.name)
      }
    </li>
  )
};

const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  };

  switch (entry.type) {
    case "Hospital":
      break;
    case "OccupationalHealthcare":
      break;
    case "HealthCheck":
      break;
    default:
      return assertNever(entry);
  }

  const entryTypeIcon = () => {
    if (entry!.type === "Hospital") {
      return (
        <i className="hospital icon" style={{ fontSize: 30 }}></i>
      );
    } else if(entry!.type === "OccupationalHealthcare") {
      return (
        <i className="stethoscope icon" style={{ fontSize: 30 }}></i>
      );
    } else if(entry!.type === "HealthCheck") {
      return (
        <i className="doctor icon" style={{ fontSize: 30 }}></i>
      );
    }
  };

  const entryHeartIcon = () => {
    if (entry!.type === "Hospital") {
      return (
        <i className="heart icon" style={{ fontSize: 25, color: 'orange' }}></i>
      );
    } else if(entry!.type === "OccupationalHealthcare") {
      return (
        <i className="heart icon" style={{ fontSize: 25, color: 'blue' }}></i>
      );
    } else if(entry!.type === "HealthCheck") {
      return (
        <i className="heart icon" style={{ fontSize: 25, color: 'green' }}></i>
      );
    }
  };

  return (
    <div key={entry.id} style={{ border: '1px solid', margin: 10, padding: 10, borderRadius: 10 }}>
    {
      entry.type === "OccupationalHealthcare"
      ? <div><h3><b>{entry.date} {entryTypeIcon()} {entry.employerName}</b></h3></div>
      : <div><h3><b>{entry.date} {entryTypeIcon()}</b></h3></div>
    }
    <div><i>{entry.description}</i></div>
    <br></br>
    <div>{entryHeartIcon()}</div>
    <ul>
      {
        entry.diagnosisCodes === undefined
        ? null
        : entry.diagnosisCodes
          .map((code: string) =>
            <EntryHelper
              key={code}
              code={code}
              diagnoses={Object.values(diagnoses)}
            />  
          )    
      }
    </ul>
    </div>
  );
};

const IndividualPatientPage: React.FC = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
  const [occupationalModalOpen, setOccupationalModalOpen] = React.useState<boolean>(false);
  const [healthyCheckModalOpen, setHealthyCheckModalOpen] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string | undefined>();

  const openHospitalModal = (): void => setHospitalModalOpen(true);
  const openOccupationalModal = (): void => setOccupationalModalOpen(true);
  const openHealthyCheckModal = (): void => setHealthyCheckModalOpen(true);

  const closeHospitalModal = (): void => {
    setHospitalModalOpen(false);
    setError(undefined);
  };
  const closeOccupationalModal = (): void => {
    setOccupationalModalOpen(false);
    setError(undefined);
  };
  const closeHealthyCheckModal = (): void => {
    setHealthyCheckModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();

  const submitNewHospitalEntry = async (values: HospitalEntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/api/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeHospitalModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const submitNewOccupationalEntry = async (values: OccupationalEntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/api/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeOccupationalModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const submitNewHealthyCheckEntry = async (values: HealthyCheckEntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/api/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeHealthyCheckModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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

  React.useEffect(() => {
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/api/diagnoses/`
        );
        dispatch(setDiagnosisList(diagnosisFromApi));
      } catch (e) {
        console.error(e.response.data);
      }
    };
    fetchDiagnosisList();
  }, [dispatch]);

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
          <AddHospitalEntryModal
            hospitalModalOpen={hospitalModalOpen}
            onHospitalSubmit={submitNewHospitalEntry}
            error={error}
            onClose={closeHospitalModal}
          />
          <AddOccupationalEntryModal
            occupationalModalOpen={occupationalModalOpen}
            onOccupationalSubmit={submitNewOccupationalEntry}
            error={error}
            onClose={closeOccupationalModal}
          />
          <AddHealthyCheckEntryModal
            healthyCheckModalOpen={healthyCheckModalOpen}
            onHealthyCheckSubmit={submitNewHealthyCheckEntry}
            error={error}
            onClose={closeHealthyCheckModal}
          />
          <Button onClick={() => openHospitalModal()}>Add New Hospital Entry</Button>
          <Button onClick={() => openOccupationalModal()}>Add New Occupational Healthcare Entry</Button>
          <Button onClick={() => openHealthyCheckModal()}>Add New Healthy Check Entry</Button>
          <h3>entries</h3>
          {
            patient.entries === undefined || patient.entries.length === 0 
            ? <NoEntryHelper />
            : patient.entries.map((entry: Entry) => (
              <EntryDetails
                key={entry.id}
                entry={entry}
                diagnoses={Object.values(diagnoses)}
              />
          ))}
        </Container>
      </div>
    );
  }
};

export default IndividualPatientPage;