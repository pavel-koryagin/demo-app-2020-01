import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _isPlainObject from 'lodash/isPlainObject';
import { AppThunk } from './store';
import ErrorCapsule from '../errors/ErrorCapsule';
import { User } from '../model/User.model';
import {
  apiCreateUser,
  apiDeleteUser,
  apiGetUser,
  apiListUsers,
  apiUpdateUser,
} from '../api/users.api';
import { RootState } from './rootReducer';
import { PaginationStatusDto } from '../dto/PaginationDto';
import { RESET_USER_STATE_ACTION } from './auth.redux';
import { UserRole } from '../model/UserRole';

type UsersState = {
  pagination: PaginationStatusDto | null,
  list: User[] | ErrorCapsule | null,
  edit: Partial<User> | ErrorCapsule | null,
}

const initialState: UsersState = {
  pagination: null,
  list: null,
  edit: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<{
      items: User[] | ErrorCapsule | null,
      pagination: PaginationStatusDto | null,
    }>) {
      state.list = action.payload.items;
      state.pagination = action.payload.pagination;
    },
    setUserToEdit(state, action: PayloadAction<Partial<User> | ErrorCapsule | null>) {
      state.edit = action.payload;
    },
    onUserUpdated(state, action: PayloadAction<User>) {
      if (Array.isArray(state.list)) {
        const prevUser = _find(state.list, ({ id }) => id === action.payload.id);
        if (prevUser) {
          const newUser = action.payload;
          state.list = state.list.map(item => item !== prevUser ? item : newUser);
        }
      }
      if (_isPlainObject(state.edit) && (state.edit as User).id === action.payload.id) {
        state.edit = action.payload;
      }
    },
    onUserDeleted(state, action: PayloadAction<number>) {
      if (Array.isArray(state.list)) {
        const prevUser = _find(state.list, ({ id }) => id === action.payload)
        if (prevUser) {
          state.list = _filter(state.list, item => item !== prevUser);
        }
      }
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
  setUsers,
  setUserToEdit,
  onUserUpdated,
  onUserDeleted,
  onPageChanged,
} = usersSlice.actions;

export default usersSlice.reducer;

export const loadUsers = (
): AppThunk => async (dispatch, getState) => {
  const { users: { pagination: prevPagination } } = getState();
  try {
    const { items: users, pagination } = await apiListUsers(
      prevPagination ? prevPagination.page : 0
    );

    dispatch(setUsers({ items: users, pagination }));
  } catch (err) {
    dispatch(setUsers({
      items: new ErrorCapsule(err, () => {
        dispatch(setUsers({
          items: null,
          pagination: null,
        }));
        dispatch(loadUsers());
      }),
      pagination: null,
    }));
  }
};

export const selectUsersModule = (state: RootState) => state.users;

export const resetUserToEdit = () => setUserToEdit(null);

export const setNewUserToEdit = () => setUserToEdit({ role: UserRole.Regular });

export const loadUserToEdit = (
  id: number
): AppThunk => async dispatch => {
  try {
    dispatch(setUserToEdit(initialState.edit));
    const user = await apiGetUser(id);

    dispatch(setUserToEdit(user));
  } catch (err) {
    dispatch(setUserToEdit(new ErrorCapsule(err, () => {
      dispatch(loadUserToEdit(id));
    })));
  }
};

export const selectUserToEdit = (state: RootState): Partial<User> | ErrorCapsule | null => state.users.edit;

export const createUser = (
  values: Partial<User>
): AppThunk => async dispatch => {
  // TODO: Add action progress and error indication
  await apiCreateUser(values);
  // It affects pagination, so let's simplify, WAS: // dispatch(onUserCreated(user));
  dispatch(loadUsers());
};

export const updateUser = (
  id: number,
  values: Partial<User>
): AppThunk => async dispatch => {
  // TODO: Add action progress and error indication
  const user = await apiUpdateUser(id, values);
  dispatch(onUserUpdated(user));
};

export const deleteUser = (
  id: number
): AppThunk => async (dispatch) => {
  // TODO: Add action progress and error indication
  await apiDeleteUser(id);
  dispatch(onUserDeleted(id));
};

export const setUsersListPage = (
  value: number,
): AppThunk => async (dispatch, getState) => {
  const { users: { pagination } } = getState();
  if (pagination && pagination.page !== value) {
    dispatch(onPageChanged(value));
    dispatch(loadUsers());
  }
};
