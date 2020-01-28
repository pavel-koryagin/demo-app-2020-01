import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from './store';
import ErrorCapsule from '../errors/ErrorCapsule';
import { Meal } from '../model/Meal.model';
import { apiListMeals } from '../api/meals.api';
import { RootState } from './rootReducer';

type MealsState = {
  list: Meal[] | ErrorCapsule | null,
}

const initialState: MealsState = {
  list: null,
};

const issuesDisplaySlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setMeals(state, action: PayloadAction<Meal[] | ErrorCapsule | null>) {
      state.list = action.payload;
    },
  }
});

export const {
  setMeals,
} = issuesDisplaySlice.actions;

export default issuesDisplaySlice.reducer;

export const loadMeals = (
): AppThunk => async dispatch => {
  try {
    const meals = await apiListMeals();

    dispatch(setMeals(meals));
  } catch (err) {
    dispatch(setMeals(new ErrorCapsule(err, () => {
      dispatch(setMeals(initialState.list));
      dispatch(loadMeals());
    })));
  }
};

export const selectAllMeals = (state: RootState): Meal[] | ErrorCapsule | null => state.meals.list;
