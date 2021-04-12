import express from 'express';
import patientService from '../services/patientService';
import { Entry, NewPatientEntry, NonSensitivePatientInfo, Patient } from '../types';
import { toNewEntry, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: Array<NonSensitivePatientInfo> = patientService.getNonSensitiveEntries();
  res.send(patients);
});

router.get('/all', (_req, res) => {
  const patients : Array<Patient> = patientService.getPatients();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  try {
    const patient: Patient = patientService.getPatientById(req.params.id);
    res.json(patient);
  } catch(e) {
    res.status(400).send({ error: `${e}` });
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patientId: string = req.params.id;
    const newEntry: Omit<Entry, "id"> = toNewEntry(req.body);
    const modifiedPatient: Patient = patientService.addEntry(patientId, newEntry);
    res.json(modifiedPatient);
  } catch(e) {
    res.status(400).send({ error: `${e}` });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient: NewPatientEntry = toNewPatientEntry(req.body);
    const addedPatient: Patient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch(e) {
    res.status(400).send(e.message);
  }
});


export default router;