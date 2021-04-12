import {v1 as uuid} from 'uuid';
//import patientData from '../../data/patients.json';
import patients from '../../data/patients';

import { NewPatientEntry, NonSensitivePatientInfo, Patient, Entry } from '../types';

//const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Array<Patient> => {
  return patients.map(({ id, ssn, name, dateOfBirth, gender, occupation, entries }) => {
    const e: Entry[] = entries ?? []; 
    return (
      { id, ssn, name, dateOfBirth, gender, occupation, entries: e }
    );
  });
};

const getPatientById = (id: string): Patient => {
  const patient: Patient | undefined = getPatients()
    .find(p => p.id === id);

  if (!patient) {
    throw new Error('Patient not found');
  }

  return patient;
};

const getNonSensitiveEntries = () : Array<NonSensitivePatientInfo> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
    const e: Entry[] = entries ?? []; 
    return (
      { id, name, dateOfBirth, gender, occupation, entries: e }
    );
  });
};

const addPatient = (entry: NewPatientEntry): Patient => {

  const newEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newEntry);

  return newEntry;
};

const addEntry = (patientId: string, entry: Omit<Entry, "id">): Patient => {
  const newEntry: Entry = { id: uuid(), ...entry} as Entry;
  const patientToModify: Patient = getPatientById(patientId);
  const modifiedEntries: Entry[] = [
    ...patientToModify.entries, newEntry
  ];
  const modifiedPatient = {
    ...patientToModify, entries: modifiedEntries
  };
  const idToChange = patients.findIndex(x => x.id === modifiedPatient.id);
  patients[idToChange] = modifiedPatient;
  return modifiedPatient;
};

export default { getPatients, getPatientById, 
  addPatient, getNonSensitiveEntries, addEntry };