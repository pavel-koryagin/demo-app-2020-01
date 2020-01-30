import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import UserEdit from '../views/UserEdit';
import { requireId } from '../utils/routingUtils';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUser,
  loadUserToEdit,
  resetUserToEdit,
  selectUserToEdit,
  setNewUserToEdit, updateUser,
} from '../redux/users.redux';
import ErrorCapsule from '../errors/ErrorCapsule';
import LoaderWidget from '../widgets/LoaderWidget';
import PageLoadFailedWidget from '../widgets/PageLoadFailedWidget';

function useUserEditParams() {
  const { id } = useParams();
  return {
    id: id === 'new' ? null : requireId(id),
  };
}

const UserEditPage: React.FC = () => {
  const { id } = useUserEditParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // Query state
  const user = useSelector(selectUserToEdit);

  // Require users
  useEffect(() => {
    if (id == null) {
      dispatch(setNewUserToEdit());
    } else if (!user || user instanceof ErrorCapsule || user.id !== id) {
      dispatch(loadUserToEdit(id));
    }
    return () => { dispatch(resetUserToEdit()) };
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Render loading and errors
  if (!user) return <LoaderWidget />;
  if (user instanceof ErrorCapsule) return <PageLoadFailedWidget error={user} />;

  // Render
  return (
    <UserEdit
      user={user}
      onSave={async user => {
        if (user.id == null) {
          await dispatch(createUser(user));
        } else {
          const { id, ...values } = user;
          await dispatch(updateUser(id, values));
        }
        history.push('/users/');
      }}
    />
  );
};

export default UserEditPage;
