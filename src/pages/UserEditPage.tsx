import React from 'react';
import { useParams } from 'react-router-dom';
import UserEdit from '../views/UserEdit';
import { carolRegularUserSample } from '../qa/samples/User.samples';

const UserEditPage: React.FC = () => {
  const { id } = useParams();
  const user = carolRegularUserSample; // Select by id

  return (
    <UserEdit
      user={user}
    />
  );
};

export default UserEditPage;
