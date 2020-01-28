import React from 'react';
import LayoutWidget from '../widgets/LayoutWidget';
import UsersList from '../views/UsersList';
import { usersSample } from '../qa/samples/User.samples';

const UsersListPage: React.FC = () => {
  return (
    <LayoutWidget>
      <UsersList
        users={usersSample}
        onDelete={() => {}}
      />
    </LayoutWidget>
  );
};

export default UsersListPage;
