import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import store from './redux/store'
import LayoutWidget from './widgets/LayoutWidget';
import MealsListPage from './pages/MealsListPage';
import MealEditPage from './pages/MealEditPage';
import UsersListPage from './pages/UsersListPage';
import UserEditPage from './pages/UserEditPage';
import AuthLoginPage from './pages/AuthLoginPage';
import AuthRegisterPage from './pages/AuthRegisterPage';
import AuthRestorePasswordPage from './pages/AuthRestorePasswordPage';
import AuthNewPasswordPage from './pages/AuthNewPasswordPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {/* Meals */}
          <Route path="/" exact component={MealsListPage} />
          <Route path="/meals/:id/" exact component={MealEditPage} />

          {/* Users */}
          <Route path="/users/" exact component={UsersListPage} />
          <Route path="/users/:id/" exact component={UserEditPage} />

          {/* Meals */}
          <Route path="/login/" exact component={AuthLoginPage} />
          <Route path="/register/" exact component={AuthRegisterPage} />
          <Route path="/restore-password/" exact component={AuthRestorePasswordPage} />
          <Route path="/restore-password/new/" exact component={AuthNewPasswordPage} />

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
      </BrowserRouter>
    </Provider>
  );
}

export default App;
