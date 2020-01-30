import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth.redux';
import mealsReducer from './meals.redux';
import usersReducer from './users.redux';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  meals: mealsReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
