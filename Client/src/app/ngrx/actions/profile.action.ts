import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/Course.model';

export const updateProfile = createAction(
    '[Profile] Update Profile',
    props<{ idToken: string, course: Course }>()
  );

 export const updateProfileSuccess = createAction('[Profile] Update Profile Success');

 export const updateProfileFailure = createAction(
    '[Profile] Update Profile Failure',
    props<{ errorMessage: any }>()
);




