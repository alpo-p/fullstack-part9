import React from 'react';
import { Icon, Segment, SemanticCOLORS  } from 'semantic-ui-react';
import { Diagnoses, Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from '../types';

const HospitalEntryDetails = ({ entry, diagnoses }: {entry: HospitalEntry, diagnoses: Diagnoses}) => {
  const discharge = () => (
    <div>
      <h5>Discharge</h5>
      date: {entry.discharge?.date} <br />
      criteria: {entry.discharge?.criteria}
    </div>
  );

  return (
    <Segment raised>
      <h2>{entry.date} <Icon name="hospital" size="big"/> </h2>
      <i>{entry.description}</i> 
      <br />
      {entry.diagnosisCodes && <h5>Diagnoses: </h5> }
      <ul>
      {entry.diagnosisCodes && entry.diagnosisCodes.map((code: string, j) => (
        <li key={j}>
          {code} {diagnoses[code].name}
        </li>
      ))}
      </ul>
      {entry.discharge && discharge()}
    </Segment>
  );
};

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses }: {entry: OccupationalHealthcareEntry, diagnoses: Diagnoses}) => {
  const sickLeave = () => (
    <div>
      <h5>Sick leave</h5>
      start date: {entry.sickLeave.startDate} <br />
      end date: {entry.sickLeave.endDate}
    </div>
  );

  return (
    <Segment raised>
      <h2>{entry.date} <Icon name="hospital outline" size="big"/> </h2>
      <i>{entry.description}</i> 
      <br />
      <br />
      <b>Specialist: </b> {entry.specialist}
      <br />
      <b>Employer name: </b> {entry.employerName}
      {entry.diagnosisCodes && <h5>Diagnoses: </h5> }
      <ul>
      {entry.diagnosisCodes && entry.diagnosisCodes.map((code, j) => (
        <li key={j}>
          {code} {diagnoses[code].name}
        </li>
      ))}
      </ul>
      {entry.sickLeave && sickLeave()}
    </Segment>
  );
};

const HealthCheckEntryDetails = ({ entry, diagnoses }: {entry: HealthCheckEntry, diagnoses: Diagnoses}) => {
  const getIconColor = (healthCheckRating: HealthCheckRating): string => {
    switch(healthCheckRating) {
      case 0:
        return "green";
      case 1:
        return "teal";
      case 2:
        return "yellow";
      default:
        return "red";
    }
  };

  const iconColor: SemanticCOLORS = getIconColor(entry.healthCheckRating) as SemanticCOLORS;

  return (
    <Segment raised>
      <h2>{entry.date} <Icon name="doctor" size="big"/> </h2>
      <i>{entry.description}</i> 
      <br />
      {entry.diagnosisCodes && <h5>Diagnoses: </h5> }
      <ul>
      {entry.diagnosisCodes && entry.diagnosisCodes.map((code, j) => (
        <li key={j}>
          {code} {diagnoses[code].name}
        </li>
      ))}
      </ul>
      <Icon name="heart" color={iconColor} />
    </Segment>
  );
};

const SingleEntry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnoses }) => {

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
  }
};


export default SingleEntry;