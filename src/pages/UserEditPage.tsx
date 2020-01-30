import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UserEdit from '../views/UserEdit';
import { requireId } from '../utils/routingUtils';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUser,
  loadUserToEdit,
  resetUserToEdit,
  selectUserToEdit,
  setNewUserToEdit,
  updateUser,
} from '../redux/users.redux';
import ErrorCapsule from '../errors/ErrorCapsule';
import LoaderWidget from '../widgets/LoaderWidget';
import PageLoadFailedWidget from '../widgets/PageLoadFailedWidget';
import { selectAuthUser } from '../redux/auth.redux';
import { User } from '../model/User.model';
import { UserRole } from '../model/UserRole';

function useUserEditParams(authUser: User) {
  const { id } = useParams();

  // Profile
  if (!id) {
    return {
      id: authUser.id,
    }
  }

  // CRUD
  return {
    id: id === 'new' ? null : requireId(id),
  };
}

const UserEditPage: React.FC = () => {
  const authUser = useSelector(selectAuthUser) as User;
  const { id } = useUserEditParams(authUser);
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
  const profileMode = authUser.role === UserRole.Regular;
  return (
    <UserEdit
      profileMode={profileMode}
      user={user}
      onSave={async user => {
        if (user.id == null) {
          await dispatch(createUser(user));
        } else {
          const { id, ...values } = user;
          await dispatch(updateUser(id, values));
        }
        if (profileMode) {
          history.push('/');
        } else {
          history.push('/users/');
        }
      }}
    />
  );
};

export default UserEditPage;
