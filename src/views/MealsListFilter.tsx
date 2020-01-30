import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import {
  defineForm,
  FormTextField,
} from '../elements/Form';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { MealsFilterDTO } from '../dto/MealsFilterDTO';

type Props = MealsFilterDTO & {
  onChange: (filter: MealsFilterDTO) => void,
}

function filterChangeEvents(onChange: (filter: MealsFilterDTO) => void) {
  return (values: MealsFilterDTO) => {
    if (!_isEmpty(values)) { // redux form in the end emits an empty object
      onChange(values);
    }
  };
}

const Form = defineForm<MealsFilterDTO>();

const MealsListFilter: React.FC<Props> = ({
  dateStart,
  dateEnd,
  timeStart,
  timeEnd,
  onChange,
}: Props) => {
  return (
    <Form
      form="mealsFilter"
      onChange={filterChangeEvents(onChange)}
      initialValues={{
        dateStart,
        dateEnd,
        timeStart,
        timeEnd,
      }}
    >
      <Box style={{ display: 'inline-block' }}>
        <Typography variant="caption" component="h6">Dates range</Typography>
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
      </Box>
      <Box style={{ display: 'inline-block' }}>
        <Typography variant="caption" component="h6">Day interval</Typography>
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
      </Box>
    </Form>
  );
};

export default MealsListFilter;
