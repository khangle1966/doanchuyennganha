import { createReducer, on } from '@ngrx/store';
import * as LoginAction from '../actions/login.action';
import { LoginState } from '../states/login.state';

export const initialState: LoginState = {
  idToken: '',
  isLoading: false,
  isSuccessful: false,
  errorMessage: '',

};

export const loginReducer = createReducer(
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
      errorMessage:'',
    };
}),

on(LoginAction.storedIdToken, (state, { idToken, type }) => {
    console.log(type);
    return {
      ...state,
      idToken,
    };
})
);
