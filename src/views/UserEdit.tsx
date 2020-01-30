import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { User, userMetaModel } from '../model/User.model';
import { getUserRoleTitle, UserRole } from '../model/UserRole';
import { defineForm, FormSelectField, FormSubmit, FormTextField } from '../elements/Form';
import Typography from '@material-ui/core/Typography';

interface Props {
  user: Partial<User>,
  onSave: (meal: Partial<User>) => void,
}

const Form = defineForm<User>();

const UserEdit: React.FC<Props> = ({
  user,
  onSave,
}: Props) => {
  const isCreating = user.id == null;

  return (
    <Form
      form="userEdit"
      onSubmit={onSave}
      initialValues={user || {}}
    >
      <Typography component="h1" variant="h4">
        {isCreating ? 'Add User' : 'Update User'}
      </Typography>
      {isCreating
        ? (
          <FormTextField
            type="email"
            name="email"
            metaField={userMetaModel.fields.email}
          />
        )
        : (
          <Typography variant="body1">
            {user.email} &bull; {getUserRoleTitle(user.role as UserRole)}
          </Typography>
        )
      }
      <FormTextField
        name="firstName"
        metaField={userMetaModel.fields.firstName}
      />
      <FormTextField
        name="lastName"
        metaField={userMetaModel.fields.lastName}
      />
      <FormTextField
        type="password"
        name="password"
        metaField={userMetaModel.fields.password}
      />
      {isCreating && (
        <FormSelectField
          name="role"
          metaField={userMetaModel.fields.role}
        >
          <MenuItem value={UserRole.Regular}>{getUserRoleTitle(UserRole.Regular)}</MenuItem>
          <MenuItem value={UserRole.Manager}>{getUserRoleTitle(UserRole.Manager)}</MenuItem>
          <MenuItem value={UserRole.Admin}>{getUserRoleTitle(UserRole.Admin)}</MenuItem>
        </FormSelectField>
      )}
      {(!isCreating && user.role === UserRole.Regular) && (
        <FormTextField
          type="number"
          name="dailyTarget"
          metaField={userMetaModel.fields.dailyTarget}
        />
      )}
      <FormSubmit>{isCreating ? 'Add' : 'Update'}</FormSubmit>
    </Form>
  );
};

export default UserEdit;
