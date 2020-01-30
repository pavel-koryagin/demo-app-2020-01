import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, AppThunk } from './store';
import { apiLogin, apiRefresh } from '../api/auth.api';
import { User } from '../model/User.model';
import { LoginDto } from '../dto/LoginDto';
import { AuthPayloadDto } from '../dto/AuthPayloadDto';
import { setJwt } from '../api/axios';
import { RootState } from './rootReducer';

export const RESET_USER_STATE_ACTION = 'RESET_USER_STATE';

type AuthState = {
  token: string | null,
  user: User | null,
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthPayloadDto>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    resetUser(state, action: PayloadAction<void>) {
      state.token = null;
      state.user = null;
    },
  }
});

const {
  setUser,
  resetUser,
} = authSlice.actions;

export default authSlice.reducer;

export const selectAuthUser = (state: RootState) => state.auth.user;

function resetUserState() {
  return {
    type: RESET_USER_STATE_ACTION,
  }
}

export const logout = ():AppThunk => dispatch => {
  saveToken(null);
  dispatch(resetUser());
  dispatch(resetUserState());
}

export const login = (
  values: LoginDto
): AppThunk => async dispatch => {
  const payload = await apiLogin(values);
  saveToken(payload.token);
  dispatch(setUser(payload));
  dispatch(resetUserState());
};

function saveToken(token: string | null) {
  setJwt(token);
  localStorage.auth = token;
}

export async function authStateInit(dispatch: AppDispatch): Promise<boolean> {
  // Use saved asap
  const token = localStorage.auth;
  if (token) {
    // Test previous and fresh data
    setJwt(token);
    const payload = await apiRefresh();

    // Init user and report logged in
    if (payload) {
      saveToken(payload.token);
      await dispatch(setUser(payload));
      return true;
    }
  }

  return false;
}
