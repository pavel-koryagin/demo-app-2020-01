import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Meal, mealMetaModel } from '../model/Meal.model';
import Form, { FormTextField } from '../elements/Form';

interface Props {
  meal: Meal,
}

const MealEdit: React.FC<Props> = ({ meal }: Props) => {
  return (
    <Form
      form="mealEdit"
      handleSubmit={() => {}}
      initialValues={meal}
    >
      <FormTextField
        name="date"
        metaField={mealMetaModel.fields.date}
      />
      <TextField
        label="Date"
      />
      <TextField
        label="Time"
      />
      <TextField
        type="number"
        label="Calories"
        fullWidth
      />
      <TextField
        multiline
        label="Contents and Notes"
        fullWidth
      />
    </Form>
  );
};

export default MealEdit;
