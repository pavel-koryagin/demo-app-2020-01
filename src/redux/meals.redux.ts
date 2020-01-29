import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment';
import _filter from 'lodash/filter';
import _isPlainObject from 'lodash/isPlainObject';
import { AppThunk } from './store';
import ErrorCapsule from '../errors/ErrorCapsule';
import { Meal } from '../model/Meal.model';
import {
  apiCreateMeal,
  apiDeleteMeal,
  apiGetMeal,
  apiListMeals,
  apiUpdateMeal,
} from '../api/meals.api';
import { RootState } from './rootReducer';

type MealsState = {
  deleting: Meal[],
  list: Meal[] | ErrorCapsule | null,
  edit: Partial<Meal> | ErrorCapsule | null,
}

const initialState: MealsState = {
  deleting: [],
  list: null,
  edit: null,
};

const issuesDisplaySlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setMeals(state, action: PayloadAction<Meal[] | ErrorCapsule | null>) {
      state.list = action.payload;
    },
    setMealToEdit(state, action: PayloadAction<Partial<Meal> | ErrorCapsule | null>) {
      state.edit = action.payload;
    },
    onMealCreated(state, action: PayloadAction<Meal>) {
      if (Array.isArray(state.list)) {
        state.list = [...state.list, action.payload];
      }
    },
    onMealUpdated(state, action: PayloadAction<Meal>) {
      if (Array.isArray(state.list)) {
        state.list = state.list.map(item => item.id !== action.payload.id ? item : action.payload);
      }
      if (_isPlainObject(state.edit) && (state.edit as Meal).id === action.payload.id) {
        state.edit = action.payload;
      }
    },
    onMealDeleted(state, action: PayloadAction<number>) {
      if (Array.isArray(state.list)) {
        state.list = _filter(state.list, ({ id }) => id !== action.payload);
      }
    },
  }
});

const {
  setMeals,
  setMealToEdit,
  onMealCreated,
  onMealUpdated,
  onMealDeleted,
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

export const resetMealToEdit = () => setMealToEdit(null);

export const setNewMealToEdit = () => setMealToEdit({
  date: moment().format('YYYY-MM-DD'),
  time: moment().format('HH:mm'),
});

export const loadMealToEdit = (
  id: number
): AppThunk => async dispatch => {
  try {
    dispatch(setMealToEdit(initialState.edit));
    const meal = await apiGetMeal(id);

    dispatch(setMealToEdit(meal));
  } catch (err) {
    dispatch(setMealToEdit(new ErrorCapsule(err, () => {
      dispatch(loadMealToEdit(id));
    })));
  }
};

export const selectMealToEdit = (state: RootState): Partial<Meal> | ErrorCapsule | null => state.meals.edit;

export const createMeal = (
  values: Partial<Meal>
): AppThunk => async dispatch => {
  // TODO: Add action progress and error indication
  const meal = await apiCreateMeal(values);
  dispatch(onMealCreated(meal));
};

export const updateMeal = (
  id: number,
  values: Partial<Meal>
): AppThunk => async dispatch => {
  // TODO: Add action progress and error indication
  const meal = await apiUpdateMeal(id, values);
  dispatch(onMealUpdated(meal));
};

export const deleteMeal = (
  id: number
): AppThunk => async (dispatch) => {
  // TODO: Add action progress and error indication
  await apiDeleteMeal(id);
  dispatch(onMealDeleted(id));
};
