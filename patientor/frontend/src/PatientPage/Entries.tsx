import React, { useState } from 'react';
import { Entry, NewEntry, Patient } from '../types';
import SingleEntry from './SingleEntry';
import { Button } from 'semantic-ui-react';
import AddNewEntryModal from './AddNewEntryModal';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { addEntry, useStateValue } from '../state';
import { useParams } from 'react-router-dom';

const Entries = ({ entries }: { entries: Entry[] | undefined }) => {
  const [{ diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = (): void => setShowModal(true);
  const closeModal = (): void => setShowModal(false);

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: modifiedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`, values
      );
      dispatch(addEntry(modifiedPatient));
      void closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown error!');
    }
  };

  return (
    <div>
      <h3>Entries</h3>

      <Button onClick={() => openModal()}>Add new entry</Button>
      <AddNewEntryModal
        showModal={showModal}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />

      {entries && entries.map((entry, i) => (
        <SingleEntry key={i} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default Entries;