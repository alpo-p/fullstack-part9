import { Patient } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isPatient = (object: any): object is Patient => {
  return (object.name) !== undefined;
};

export const parsePatient = (object: unknown): Patient => {
  if (!object || !isPatient(object)) {
    throw new Error('Patient not found');
  }

  return object;
};
