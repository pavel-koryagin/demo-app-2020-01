import React from 'react';
import { mealMetaModel } from '../model/Meal.model';
import {
  defineForm,
  FormTextField,
} from '../elements/Form';

interface FilterModel {
  dateStart: string | null,
  dateEnd: string | null,
  timeStart: string | null,
  timeEnd: string | null,
}

type Props = FilterModel & {
  onChange: (meal: FilterModel) => void,
}

const Form = defineForm<FilterModel>();

const MealsListFilter: React.FC<Props> = ({
  dateStart,
  dateEnd,
  timeStart,
  timeEnd,
  onChange,
}: Props) => {
  return (
    <Form
      form="mealEdit"
      onChange={onChange}
      initialValues={{
        dateStart,
        dateEnd,
        timeStart,
        timeEnd,
      }}
    >
      <FormTextField
        type="date"
        name="dateStart"
        metaField={{}}
        fullWidth={false}
        label=""
        classes={{
          root: 'g__date-field'
        }}
      />
      <FormTextField
        type="date"
        name="dateEnd"
        metaField={{}}
        fullWidth={false}
        label=""
        classes={{
          root: 'g__date-field'
        }}
      />
      <FormTextField
        type="time"
        name="timeStart"
        metaField={{}}
        fullWidth={false}
        label=""
      />
      <FormTextField
        type="time"
        name="timeEnd"
        metaField={{}}
        fullWidth={false}
        label=""
      />
    </Form>
  );
};

export default MealsListFilter;
