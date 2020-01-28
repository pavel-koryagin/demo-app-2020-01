import { combineReducers } from '@reduxjs/toolkit';
import mealsReducer from './meals.redux';

const rootReducer = combineReducers({
  meals: mealsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
