import express from 'express';
import diagnoseService from '../services/diagnoseService';
import { Diagnose } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses: Array<Diagnose> = diagnoseService.getEntries();
  res.send(diagnoses);
});

router.post('/', (_req,res) => {
  res.send('Saving diagnoses');
});

export default router;