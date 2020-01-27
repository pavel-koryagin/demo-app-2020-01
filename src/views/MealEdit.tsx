import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Meal } from '../model/Meal.model';

interface Props {
  meal: Meal,
}

const MealEdit: React.FC<Props> = ({ meal }: Props) => {
  return (
    <form noValidate>
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
    </form>
  );
};

export default MealEdit;
