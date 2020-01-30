import React from 'react';
import AuthRegister from '../views/AuthRegister';
import { register } from '../redux/auth.redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AuthRegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <AuthRegister
      register={{
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={async value => {
        await dispatch(register(value));
        history.push('/');
      }}
    />
  );
};

export default AuthRegisterPage;
