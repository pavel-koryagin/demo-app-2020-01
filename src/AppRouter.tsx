import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import './views/globals.scss';
import LayoutWidget from './widgets/LayoutWidget';
import MealsListPage from './pages/MealsListPage';
import MealEditPage from './pages/MealEditPage';
import UsersListPage from './pages/UsersListPage';
import UserEditPage from './pages/UserEditPage';
import AuthLoginPage from './pages/AuthLoginPage';
import AuthRegisterPage from './pages/AuthRegisterPage';
import AuthRestorePasswordPage from './pages/AuthRestorePasswordPage';
import AuthNewPasswordPage from './pages/AuthNewPasswordPage';
import { UserRole } from './model/UserRole';
import { selectAuthUser } from './redux/auth.redux';

const AppRouter: React.FC = () => {
  const user = useSelector(selectAuthUser);
  const userRole = user ? user.role : null;

  const route = (
    path: string | string[],
    component:  React.ComponentType,
    ...roles: (UserRole | null)[]
  ) =>
    roles.indexOf(userRole) !== -1
      ? <Route path={path} exact component={component} />
      : <Redirect to="/login/" />;

  return (
    <Switch>
      {/* Public */}
      <Route path="/login/" exact component={AuthLoginPage} />
      <Route path="/register/" exact component={AuthRegisterPage} />
      <Route path="/restore-password/" exact component={AuthRestorePasswordPage} />
      <Route path="/restore-password/new/" exact component={AuthNewPasswordPage} />

      {/* Meals */}
      {route('/', MealsListPage, UserRole.Regular, UserRole.Admin)}
      {route('/meals/:id/', MealEditPage, UserRole.Regular, UserRole.Admin)}

      {/* Users */}
      {route('/users/', UsersListPage, UserRole.Manager, UserRole.Admin)}
      {route('/users/:id/', UserEditPage, UserRole.Manager, UserRole.Admin)}

      {/* 404 */}
      <Route
        path="/"
        render={() => (
          <LayoutWidget>
            TODO: Show 404
          </LayoutWidget>
        )}
      />
    </Switch>
  );
}

export default AppRouter;
