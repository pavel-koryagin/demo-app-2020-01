import React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form/lib/Field';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';

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

const TextFieldBinding: React.FC<TextFieldProps & WrappedFieldProps> = ({
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    error={touched && invalid}
    helperText={touched && error}
    margin="normal"
    fullWidth
    {...input}
    {...custom}
  />
);

interface FieldProps {
  name: string,
  metaField: any,
}

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

// const renderSelectField = ({
//   input,
//   label,
//   meta: { touched, error },
//   children,
//   ...custom
// }) => (
//   <FormControl error={touched && error}>
//     <InputLabel htmlFor="age-native-simple">Age</InputLabel>
//     <Select
//       native
//       {...input}
//       {...custom}
//       inputProps={{
//         name: 'age',
//         id: 'age-native-simple'
//       }}
//     >
//       {children}
//     </Select>
//     {renderFromHelper({ touched, error })}
//   </FormControl>
// )

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

