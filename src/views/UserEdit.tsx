import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { User } from '../model/User.model';
import { getUserRoleTitle, UserRole } from '../model/UserRole';

interface Props {
  user: User,
}

const UserEdit: React.FC<Props> = ({ user }: Props) => {
  return (
    <form noValidate>
      <TextField
        label="Email"
        fullWidth
      />
      <TextField
        label="First Name"
        fullWidth
      />
      <TextField
        label="Last Name"
        fullWidth
      />
      <TextField
        type="number"
        label="Daily Calories Target"
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          // onChange={handleChange}
        >
          <MenuItem value={UserRole.Regular}>{getUserRoleTitle(UserRole.Regular)}</MenuItem>
          <MenuItem value={UserRole.Manager}>{getUserRoleTitle(UserRole.Manager)}</MenuItem>
          <MenuItem value={UserRole.Admin}>{getUserRoleTitle(UserRole.Admin)}</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
};

export default UserEdit;
