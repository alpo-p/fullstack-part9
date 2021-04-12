import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { NewEntry } from '../../types';
import AddEntryFormHospital from './AddEntryFormHospital';
import AddEntryFormOccupational from './AddEntryFormOccupational';
import AddEntryFormCheck from './AddEntryFormCheck';

interface Props {
  showModal: boolean;
  onSubmit: (values: NewEntry) => void;
  onClose: () => void;
}

const AddNewEntryModal = ({ showModal, onSubmit, onClose }: Props) => {
  const [formToShow, setFormToShow] = useState<string>("Hospital");
  const showForm = () => {
    switch(formToShow) {
      case "Hospital":
        return <AddEntryFormHospital onSubmit={onSubmit} onCancel={onClose} />;
      case "Occupational":
        return <AddEntryFormOccupational onSubmit={onSubmit} onCancel={onClose} />;
      case "Check":
        return <AddEntryFormCheck onSubmit={onSubmit} onCancel={onClose} />;
    }
  };

  return (
    <Modal open={showModal} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry to the patient</Modal.Header>
      <Modal.Content>
        <div>
          <b> Type of entry: </b>
          <Button.Group>
            <Button onClick={() => setFormToShow("Hospital")}>Hospital</Button>
            <Button onClick={() => setFormToShow("Occupational")}>Occupational healthcare</Button>
            <Button onClick={() => setFormToShow("Check")}>Health check</Button>
          </Button.Group>
        </div>
        {showForm()}
      </Modal.Content>
    </Modal>
  );
};

export default AddNewEntryModal;