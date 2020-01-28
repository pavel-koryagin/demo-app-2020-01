import React from 'react';
import { useParams } from 'react-router-dom';
import LayoutWidget from '../widgets/LayoutWidget';
import UserEdit from '../views/UserEdit';
import { carolRegularUserSample } from '../qa/samples/User.samples';

const UserEditPage: React.FC = () => {
  const { id } = useParams();
  const user = carolRegularUserSample; // Select by id

  return (
    <LayoutWidget>
      <UserEdit
        user={user}
      />
    </LayoutWidget>
  );
};

export default UserEditPage;
