import { createReducer, on } from '@ngrx/store';
import { ProfileState } from '../states/profile.state';
import * as ProfileAction from 'src/app/ngrx/actions/profile.actions';
import { Profile } from 'src/app/models/profile.model';
import { initualState } from './user.reducer';

export const initialState: ProfileState = {
  profile: <Profile>{},
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  isGetLoading: false,
  isGetSuccess: false,
  getErrorMessage: '',
  isUpdating: false,
  isUpdateSuccess: false,
  updateErrorMessage: '',
};

export const profileReducer = createReducer(
  initualState,
  on(ProfileAction.create, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: '',
    };
  }),

  on(ProfileAction.createSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      errorMessage: '',
    };
  }),

  on(ProfileAction.createFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      errorMessage,
    };
  }),

  on(ProfileAction.get, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrorMessage: '',
    };
  }),

  on(ProfileAction.getSuccess, (state, { type, profile }) => {
    console.log(type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      getErrorMessage: '',
      profile,
    };
  }),

  on(ProfileAction.getFailure, (state, { type, errorMessage }) => {
    console.log(type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrorMessage: errorMessage,
    };
  }),
  on(ProfileAction.clearState, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      errorMessage: '',
      isGetLoading: false,
      isGetSuccess: false,
      getErrorMessage: '',
      isUpdating: false,
      isUpdateSuccess: false,
      updateErrorMessage: '',
    };
  }),
  on(ProfileAction.updateProfile, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isUpdating: true,
      isUpdateSuccess: false,
      updateErrorMessage: '',
    };
  }),

  on(ProfileAction.updateProfileSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isUpdating: false,
      isUpdateSuccess: true,
    };
  }),

  on(ProfileAction.updateProfileFailure, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isUpdating: false,
      isUpdateSuccess: false,
      updateErrorMessage: action.errorMessage,
    };
  })
);
