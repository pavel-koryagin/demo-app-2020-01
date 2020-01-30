import React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select, { SelectProps } from '@material-ui/core/Select/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import { BaseFieldProps, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form/lib/Field';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      marginTop: theme.spacing(2),
      textAlign: 'right',
    },
  }),
);

type FormViewProps = {
  className?: string,
  style?: Object,
};

export function defineForm<FormData>() {
  const InnerForm: React.FC<InjectedFormProps<FormData> & FormViewProps> = ({
    handleSubmit,
    className,
    style,
    children,
  }) => {
    return (
      <form
        onSubmit={handleSubmit}
        className={className}
        style={style}
        noValidate
      >
        {children}
      </form>
    );
  };

  return reduxForm<FormData, FormViewProps>({})(InnerForm);
}

interface FieldProps {
  name: string,
  metaField: any,
}

const TextFieldBinding: React.FC<TextFieldProps & WrappedFieldProps> = ({
  input,
  meta: { touched, invalid, error, form },
  ...custom
}) => (
  <TextField
    error={touched && invalid}
    helperText={touched && error}
    id={`form-${form}-${input.name}`}
    margin="normal"
    fullWidth
    {...input}
    {...custom}
  />
);

export const FormTextField: React.FC<TextFieldProps & FieldProps> = ({
  metaField: { visualProps, rules },
  name,
  ...props
}) => {
  return (
    <Field<BaseFieldProps<TextFieldProps>>
      name={name}
      component={TextFieldBinding}
      props={{...visualProps, ...props}}
      validate={rules}
    />
  );
};

const SelectFieldBinding: React.FC<SelectProps & WrappedFieldProps> = ({
  input,
  meta: { touched, invalid, error, form },
  children,
  ...custom
}) => (
  <FormControl
    error={touched && error}
    fullWidth
    margin="normal"
  >
    <InputLabel htmlFor={`form-${form}-${input.name}`}>{custom.label}</InputLabel>
    <Select
      {...input as WrappedFieldInputProps}
      {...custom}
      inputProps={{
        name: input.name,
        id: `form-${form}-${input.name}`
      }}
    >
      {children}
    </Select>
    {(touched || error) && <FormHelperText>{touched && error}</FormHelperText>}
  </FormControl>
);

export const FormSelectField: React.FC<SelectProps & FieldProps> = ({
  metaField: { visualProps, rules },
  name,
  ...props
}) => {
  return (
    <Field<BaseFieldProps<SelectProps>>
      name={name}
      component={SelectFieldBinding}
      props={{...visualProps, ...props}}
      validate={rules}
    />
  );
};

export const FormSubmit: React.FC<ButtonProps> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.buttons}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        {...props}
      />
    </div>
  );
};

