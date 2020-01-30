import React from 'react';
import UsersList from '../views/UsersList';
import { usersSample } from '../qa/samples/User.samples';

const UsersListPage: React.FC = () => {
  return (
    <UsersList
      users={usersSample}
      onDelete={() => {}}
    />
  );
};

export default UsersListPage;
