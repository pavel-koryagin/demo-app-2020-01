import React from 'react';
import { Meal, mealMetaModel } from '../model/Meal.model';
import {
  defineForm,
  FormSubmit,
  FormTextField,
} from '../elements/Form';
import Typography from '@material-ui/core/Typography';

interface Props {
  meal: Partial<Meal>,
  onSave: (meal: Partial<Meal>) => void,
}

const Form = defineForm<Meal>();

const MealEdit: React.FC<Props> = ({
  meal,
  onSave,
}: Props) => {
  const isCreating = meal.id == null;

  return (
    <Form
      form="mealEdit"
      onSubmit={onSave}
      initialValues={meal || {}}
    >
      <Typography component="h1" variant="h4">
        {isCreating ? 'Add Meal' : 'Update Meal'}
      </Typography>
      <FormTextField
        type="date"
        name="date"
        metaField={mealMetaModel.fields.date}
        fullWidth={false}
      />
      <FormTextField
        type="time"
        name="time"
        metaField={mealMetaModel.fields.time}
        fullWidth={false}
      />
      <FormTextField
        name="calories"
        metaField={mealMetaModel.fields.calories}
        type="number"
        autoFocus={isCreating}
      />
      <FormTextField
        name="contents"
        metaField={mealMetaModel.fields.contents}
        multiline
      />
      <FormSubmit>{isCreating ? 'Add' : 'Update'}</FormSubmit>
    </Form>
  );
};

export default MealEdit;
