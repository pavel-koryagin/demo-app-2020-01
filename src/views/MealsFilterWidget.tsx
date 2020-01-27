import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Meal } from '../model/Meal.model';

interface Props {
  meal: Meal,
}

const MealsFilterWidget: React.FC<Props> = ({ meal }: Props) => {
  return (
    <form noValidate>
      <TextField
        label="Date From"
      />
      <TextField
        label="Date To"
      />
      <TextField
        label="Time From"
      />
      <TextField
        label="Time To"
      />
    </form>
  );
};

export default MealsFilterWidget;
