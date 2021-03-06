import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Button, Grid } from 'semantic-ui-react';
import { DiagnosisSelection, NumberField, TextField } from '../../components/FormField';
import { Type, NewEntry } from '../../types';
import { useStateValue } from '../../state';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: Type.HealthCheck 
      } as NewEntry}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string} = {};
        if (!values.description) errors.description = requiredError;
        if (!values.date) errors.date = requiredError;
        if (!values.specialist) errors.specialist = requiredError;
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => { // eslint-disable-this-line no-unused-vars
        return (
          <Form className="form ui">
            <Field
             label="Description"
             placeholder="Description"
             name="description"
             component={TextField}
            />
            <Field
             label="Date"
             placeholder="Date"
             name="date"
             component={TextField}
            />
            <Field
             label="Specialist"
             placeholder="Specialist"
             name="specialist"
             component={TextField}
            />
            <Field
             label="Health check rating"
             name="healthCheckRating"
             component={NumberField}
             min={0}
             max={3}
            />
            <DiagnosisSelection
             setFieldValue={setFieldValue}
             setFieldTouched={setFieldTouched}
             diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >Add</Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;