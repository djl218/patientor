import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHospitalEntryForm, { HospitalEntryFormValues } from './AddHospitalEntryForm';
import AddOccupationalEntryForm, { OccupationalEntryFormValues } from './AddOccupationalEntryForm';
import AddHealthyCheckEntryForm, { HealthyCheckEntryFormValues } from './AddHealthyCheckEntryForm';

interface HospitalProps {
  hospitalModalOpen: boolean;
  onClose: () => void;
  onHospitalSubmit: (values: HospitalEntryFormValues) => void;
  error?: string;
}

interface OccupationalProps {
  occupationalModalOpen: boolean;
  onClose: () => void;
  onOccupationalSubmit: (values: OccupationalEntryFormValues) => void;
  error?: string;
}

interface HealthyCheckProps {
  healthyCheckModalOpen: boolean;
  onClose: () => void;
  onHealthyCheckSubmit: (values: HealthyCheckEntryFormValues) => void;
  error?: string;
}

export const AddHospitalEntryModal = ({ hospitalModalOpen, onClose, onHospitalSubmit, error }: HospitalProps) => (
  <Modal open={hospitalModalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new hospital entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHospitalEntryForm onSubmit={onHospitalSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddOccupationalEntryModal = ({ occupationalModalOpen, onClose, onOccupationalSubmit, error }: OccupationalProps) => (
  <Modal open={occupationalModalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new occupational healthcare entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalEntryForm onSubmit={onOccupationalSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddHealthyCheckEntryModal = ({ healthyCheckModalOpen, onClose, onHealthyCheckSubmit, error }: HealthyCheckProps) => (
  <Modal open={healthyCheckModalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new healthy check entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHealthyCheckEntryForm onSubmit={onHealthyCheckSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);