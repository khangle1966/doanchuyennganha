import { createReducer, on } from '@ngrx/store';
import * as LoginAction from '../actions/auth.actions';
import { AuthState } from '../states/auth.state';
import * as idTokenActions from '../actions/auth.actions';

export const initialState: AuthState = {
  idToken: '',
  isLoading: false,
  isSuccessful: false,
  errorMessage: '',
  uid: '',
  isLogoutSuccess: false,
  logoutErrorMessage: '',
};

export const authReducer = createReducer(
  initialState,
  on(LoginAction.login, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccessful: false,
      errorMessage: '',
    };
  }),
  on(LoginAction.loginSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccessful: true,
      errorMessage: '',
    };
  }),
  on(LoginAction.loginFailure, (state, { errorMessage, type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccessful: false,
      errorMessage,
    };
  }),
  on(LoginAction.logout, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLogoutSuccess: false,
      logoutErrorMessage: '',
    };
  }),
  on(LoginAction.logoutSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLogoutSuccess: true,
      isSuccessful: false,
      idToken: '',
      uid: '',
    };
  }),
  on(LoginAction.logoutFailure, (state, { errorMessage, type }) => {
    console.log(type);
    return {
      ...state,
      isLogoutSuccess: false,
      logoutErrorMessage: errorMessage,
    };
  }),
  on(LoginAction.storedIdToken, (state, { idToken, type }) => {
    console.log(type);
    return {
      ...state,
      idToken,
    };
  }),
  on(LoginAction.storedUserUid, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      uid: action.uid,
    };
  })
);
