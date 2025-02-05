import { createReducer, on } from '@ngrx/store';
import { UserState } from '../states/user.state';
import * as UserAction from 'src/app/ngrx/actions/user.actions';
import { state } from '@angular/animations';
import { UserInfo } from 'src/app/models/user.model';

export const initualState: UserState = {
  user: <UserInfo>{},
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  isGetLoading: false,
  isGetSuccess: false,
  getErrorMessage: '',
};
export const userReducer = createReducer(
  initualState,
  on(UserAction.createUser, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: '',
    };
  }),
  on(UserAction.createUserSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      errorMessage: '',
    };
  }),
  on(UserAction.createUserFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      errorMessage,
    };
  }),
  on(UserAction.getUser, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrorMessage: '',
      user: <UserInfo>{},
    };
  }),
  on(UserAction.getUserSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      getErrorMessage: '',
      user: action.user,
    };
  }),
  on(UserAction.getUserFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrorMessage: errorMessage,
    };
  }),
  on(UserAction.clearUserInfo, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      user: <UserInfo>{},
    };
  })
);
