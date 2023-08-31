import { createReducer, on } from '@ngrx/store';
import * as ProfileAction from '../actions/profile.action';
import { ProfileState } from '../states/profile.state';

export const initialState: ProfileState = {
  idToken: '',
  isLoading: false,
  isSuccessful: false,
  errorMessage: '',

};


export const profileReducer = createReducer(
  initialState,
  on(ProfileAction.updateProfile, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccessful: false,
      errorMessage: '',
    };
  }),
  on(ProfileAction.updateProfileSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccessful: true,
      errorMessage: '',
    };
  }),
  on(ProfileAction.updateProfileFailure, (state, { errorMessage, type }) => {
      console.log(type);
      return {
        ...state,
        isLoading: false,
        isSuccessful: false,
        errorMessage:'',
      };
  }),
);