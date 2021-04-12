import { Diagnose, Discharge, Entry, Gender, HealthCheckEntry, HealthCheckRating, HospitalEntry, NewPatientEntry, OccupationalHealthcareEntry, SickLeave } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const parseGender = (gender: unknown): Gender => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isGender = (param: any): param is Gender => {
      return Object.values(Gender).includes(param);
    };

    if (!gender || !isGender(gender)) {
      throw new Error('Incorrect of missing gender: ' + gender);
    }

    return gender;
  };

  const newEntry: NewPatientEntry = {
    name: parseField(object.name),
    dateOfBirth: parseField(object.dateOfBirth),
    ssn: parseField(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseField(object.occupation),
    entries: []
  };

  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): Omit<Entry,"id"> => {
  const description = parseField(object.description);
  const date = parseField(object.date);
  const specialist = parseField(object.specialist);
  const diagnosisCodes = object.diagnosisCodes ? parseDiagnosisCodes(object.diagnosisCodes)
    : undefined;

  const baseEntry = { description, date, specialist, diagnosisCodes };

  switch(object.type as Entry["type"]) {
    case "Hospital":
      const discharge = object.discharge
        ? parseDischarge(object.discharge) : undefined;
      return {
        ...baseEntry, discharge, type: "Hospital"
      } as Omit<HospitalEntry, "id">;
    case "OccupationalHealthcare":
      const employerName = parseField(object.employerName);
      const sickLeave = object.sickLeave
        ? parseSickleave(object.sickLeave) : undefined;
      return {
        ...baseEntry, employerName, sickLeave, type: "OccupationalHealthcare"
      } as Omit<OccupationalHealthcareEntry, "id">;
    case "HealthCheck":
      const healthCheckRating = parseHealthCheckRating(object.healthCheckRating);
      return {
        ...baseEntry, healthCheckRating, type: "HealthCheck"
      } as Omit<HealthCheckEntry, "id">;
    default:
      throw new Error('Wrong type');
  }
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseField = (field: unknown): string => {
  if(!field || !isString(field)) {
    throw new Error('Incorrect of missing field: ' + field);
  }

  return field;
};


const parseDiagnosisCodes = (field: unknown): Array<Diagnose['code']> => {
  const isDiagnose = (object: unknown): object is Diagnose => {
    return (object as Diagnose).code !== undefined;
  };

  if (!field) throw new Error('Missing field');
  if (!(field instanceof Array)) throw new Error('Not an array');
  field.forEach(x => {
    if (!isDiagnose(x)) throw new Error(`${x} is not a diagnose`);
  });
  return field as Array<Diagnose['code']>;
};

const parseDischarge = (field: unknown): Discharge => {
  const isDischarge = (object: unknown): object is Discharge => {
    return (object as Discharge).criteria !== undefined;
  };
  if(!field || !isDischarge(field)) throw new Error('Incorrect field: ' + field);
  return field;
};

const parseSickleave = (field: unknown): SickLeave => {
  const leave = field as SickLeave;
  if(leave.startDate === undefined || leave.endDate === undefined)
    throw new Error('Incorrect fields for SickLeave');
  return leave; 
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHealthCheckRating = (field: any): HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isHRating = (object: any): object is HealthCheckRating => {
    return (object in HealthCheckRating);
  };
  if(isHRating(field))
    return field;
  else throw new Error(`${field} is not a HealthCheckRating`);
};
