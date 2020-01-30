import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _mapValues from 'lodash/mapValues';
import _isPlainObject from 'lodash/isPlainObject';
import _isEqual from 'lodash/isEqual';
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
import { MealsFilterDto, noMealsFilter } from '../dto/MealsFilterDto';
import { PaginationStatusDto } from '../dto/PaginationDto';
import { CaloriesPerDay } from '../dto/MealsListDto';
import { RESET_USER_STATE_ACTION } from './auth.redux';

type MealsState = {
  filter: MealsFilterDto,
  pagination: PaginationStatusDto | null,
  list: Meal[] | ErrorCapsule | null,
  caloriesPerDay: CaloriesPerDay | null,
  edit: Partial<Meal> | ErrorCapsule | null,
}

const initialState: MealsState = {
  filter: noMealsFilter,
  pagination: null,
  caloriesPerDay: null,
  list: null,
  edit: null,
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setMeals(state, action: PayloadAction<{
      items: Meal[] | ErrorCapsule | null,
      pagination: PaginationStatusDto | null,
      caloriesPerDay: CaloriesPerDay | null,
    }>) {
      state.list = action.payload.items;
      state.pagination = action.payload.pagination;
      state.caloriesPerDay = action.payload.caloriesPerDay;
    },
    setMealToEdit(state, action: PayloadAction<Partial<Meal> | ErrorCapsule | null>) {
      state.edit = action.payload;
    },
    onMealUpdated(state, action: PayloadAction<Meal>) {
      if (Array.isArray(state.list)) {
        const prevMeal = _find(state.list, ({ id }) => id === action.payload.id);
        if (prevMeal) {
          const newMeal = action.payload;
          state.list = state.list.map(item => item !== prevMeal ? item : newMeal);
          state.caloriesPerDay = _mapValues(
            state.caloriesPerDay,
            (value, date) => (date === prevMeal.date ? value - prevMeal.calories + newMeal.calories : value),
          );
        }
      }
      if (_isPlainObject(state.edit) && (state.edit as Meal).id === action.payload.id) {
        state.edit = action.payload;
      }
    },
    onMealDeleted(state, action: PayloadAction<number>) {
      if (Array.isArray(state.list)) {
        const prevMeal = _find(state.list, ({ id }) => id === action.payload)
        if (prevMeal) {
          state.list = _filter(state.list, item => item !== prevMeal);
          state.caloriesPerDay = _mapValues(
            state.caloriesPerDay,
            (value, date) => (date === prevMeal.date ? value - prevMeal.calories : value),
          );
        }
      }
    },
    onFilterChanged(state, action: PayloadAction<MealsFilterDto>) {
      state.filter = action.payload;
    },
    onPageChanged(state, action: PayloadAction<number>) {
      if (
        state.pagination
        && action.payload * state.pagination.pageSize <= state.pagination.totalSize
      ) {
        state.pagination.page = action.payload;
      }
    },
  },
  extraReducers: {
    [RESET_USER_STATE_ACTION](state, action) {
      Object.assign(state, initialState);
    }
  },
});

const {
  setMeals,
  setMealToEdit,
  onMealUpdated,
  onMealDeleted,
  onFilterChanged,
  onPageChanged,
} = mealsSlice.actions;

export default mealsSlice.reducer;

export const loadMeals = (
): AppThunk => async (dispatch, getState) => {
  const { meals: { filter, pagination: prevPagination } } = getState();
  try {
    const { items: meals, pagination, caloriesPerDay } = await apiListMeals(
      filter,
      prevPagination ? prevPagination.page : 0
    );

    dispatch(setMeals({ items: meals, pagination, caloriesPerDay }));
  } catch (err) {
    dispatch(setMeals({
      items: new ErrorCapsule(err, () => {
        dispatch(setMeals({
          items: null,
          pagination: null,
          caloriesPerDay: null,
        }));
        dispatch(loadMeals());
      }),
      pagination: null,
      caloriesPerDay: null,
    }));
  }
};

export const selectMealsModule = (state: RootState) => state.meals;

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
  await apiCreateMeal(values);
  // It affects pagination, so let's simplify, WAS: // dispatch(onMealCreated(meal));
  dispatch(loadMeals());
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

export const setFilter = (
  value: MealsFilterDto,
): AppThunk => async (dispatch, getState) => {
  const { meals: { filter } } = getState();
  if (!_isEqual(filter, value)) {
    dispatch(onFilterChanged(value));
    dispatch(loadMeals());
  }
};

export const setPage = (
  value: number,
): AppThunk => async (dispatch, getState) => {
  const { meals: { pagination } } = getState();
  if (pagination && pagination.page !== value) {
    dispatch(onPageChanged(value));
    dispatch(loadMeals());
  }
};
