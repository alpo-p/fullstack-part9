import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Icon, SemanticICONS } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Gender, Patient } from '../types';
import { parsePatient } from '../utils';
import Entries from './Entries';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, ] = useStateValue();
  const patient: Patient = parsePatient(
    Object.values(patients).find(p => p.id === id));
  
  const getIconName = (gender: Gender): string => {
    switch (gender) {
      case "male":
        return "mars";
      case "female":
        return "venus";
      default:
        return "genderless";
    }
  };
  const iconName = getIconName(patient.gender) as SemanticICONS;

  return (
    <div className="PatientPage">
      <Container>
        <h3>{patient.name} <Icon size="big" name={iconName} /></h3>
        <p>
          ssn: {patient.ssn} <br />
          occupation: {patient.occupation}
        </p>
        <br />
        <Entries entries={patient.entries} />
      </Container>
    </div>
  );
};

export default PatientPage;