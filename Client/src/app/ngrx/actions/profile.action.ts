import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/Course.model';
import { Profile } from 'src/app/models/Profile.model';

export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ idToken: string; profile: Profile; id: string }>()
);

export const updateProfileSuccess = createAction(
  '[Profile] Update Profile Success'
);

export const updateProfileFailure = createAction(
  '[Profile] Update Profile Failure',
  props<{ errorMessage: any }>()
);

export const get = createAction(
  '[Profile] Get Profile',
  props<{ idToken: string; id: string }>()
);

export const getSuccess = createAction(
  '[Profile] Get Profile Success',
  props<{ profile: Profile }>()
);

export const getFailure = createAction(
  '[Profile] Get Profile Failure',
  props<{ errorMessage: any }>()
);
