import React, { ReactNode } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form/lib/Field';

type FormViewProps = {
  handleSubmit: () => void,
  className?: string,
  style?: Object,
  children: ReactNode,
};

export const Form: React.FC<InjectedFormProps & FormViewProps> = ({
  handleSubmit,
  className,
  style,
  children,
}: FormViewProps) => {
  return (
    <form
      onSubmit={() => handleSubmit()}
      className={className}
      style={style}
      noValidate
    >
      {children}
    </form>
  );
};

export default reduxForm<{}, FormViewProps>({})(Form);

// const validate = values => {
//   const errors = {}
//   const requiredFields = [
//     'firstName',
//     'lastName',
//     'email',
//     'favoriteColor',
//     'notes'
//   ]
//   requiredFields.forEach(field => {
//     if (!values[field]) {
//       errors[field] = 'Required'
//     }
//   })
//   if (
//     values.email &&
//     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//   ) {
//     errors.email = 'Invalid email address'
//   }
//   return errors
// }

const TextFieldBinding: React.FC<TextFieldProps & WrappedFieldProps> = ({
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

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
