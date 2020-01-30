import React, { useEffect } from 'react';
import UsersList from '../views/UsersList';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ErrorCapsule from '../errors/ErrorCapsule';
import LoaderWidget from '../widgets/LoaderWidget';
import PageLoadFailedWidget from '../widgets/PageLoadFailedWidget';
import UnexpectedCaseException from '../errors/UnexpectedCaseException';
import { deleteUser, loadUsers, selectUsersModule, setUsersListPage } from '../redux/users.redux';

const UsersListPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Query state
  const { list: users, pagination } = useSelector(selectUsersModule);

  // Require meals
  useEffect(() => {
    if (!users || users instanceof ErrorCapsule) {
      dispatch(loadUsers());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Render loading and errors
  if (!users) return <LoaderWidget />;
  if (users instanceof ErrorCapsule) return <PageLoadFailedWidget error={users} />;

  if (!pagination) {
    throw new UnexpectedCaseException();
  }
  return (
    <UsersList
      pagination={pagination}
      users={users}
      onSetPage={value => dispatch(setUsersListPage(value))}
      onCreate={() => history.push('/users/new/')}
      onDelete={id => dispatch(deleteUser(id))}
    />
  );
};

export default UsersListPage;
