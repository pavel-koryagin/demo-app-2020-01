import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import './views/globals.scss';
import LayoutWidget from './widgets/LayoutWidget';
import { UserRole } from './model/UserRole';
import { selectAuthUser } from './redux/auth.redux';
import LoaderWidget from './widgets/LoaderWidget';
import MealsListPage from './pages/MealsListPage';
import MealEditPage from './pages/MealEditPage';
import UsersListPage from './pages/UsersListPage';
import UserEditPage from './pages/UserEditPage';
import AuthLoginPage from './pages/AuthLoginPage';
import AuthRegisterPage from './pages/AuthRegisterPage';
import AuthRestorePasswordPage from './pages/AuthRestorePasswordPage';
import AuthNewPasswordPage from './pages/AuthNewPasswordPage';

const withLayout = (Component: React.ComponentType) => {
  return (props: any) => (
    <LayoutWidget>
      <Suspense fallback={<LoaderWidget />}>
        <Component {...props} />
      </Suspense>
    </LayoutWidget>
  )
}

const WrappedAuthLoginPage = withLayout(AuthLoginPage);
const WrappedAuthRegisterPage = withLayout(AuthRegisterPage);
const WrappedAuthRestorePasswordPage = withLayout(AuthRestorePasswordPage);
const WrappedAuthNewPasswordPage = withLayout(AuthNewPasswordPage);
const WrappedMealsListPage = withLayout(MealsListPage);
const WrappedMealEditPage = withLayout(MealEditPage);
const WrappedUsersListPage = withLayout(UsersListPage);
const WrappedUserEditPage = withLayout(UserEditPage);

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
      : <Route path={path} exact><Redirect to="/login/" /></Route>;

  return (
    <Switch>
      {/* Public */}
      <Route path="/login/" exact component={WrappedAuthLoginPage} />
      <Route path="/register/" exact component={WrappedAuthRegisterPage} />
      <Route path="/restore-password/" exact component={WrappedAuthRestorePasswordPage} />
      <Route path="/restore-password/new/" exact component={WrappedAuthNewPasswordPage} />

      {/* Meals */}
      {route('/', WrappedMealsListPage, UserRole.Regular, UserRole.Admin)}
      {route('/meals/:id/', WrappedMealEditPage, UserRole.Regular, UserRole.Admin)}

      {/* Users */}
      {route('/users/', WrappedUsersListPage, UserRole.Manager, UserRole.Admin)}
      {route('/users/:id/', WrappedUserEditPage, UserRole.Manager, UserRole.Admin)}
      {route('/profile/', WrappedUserEditPage, UserRole.Regular)}

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
