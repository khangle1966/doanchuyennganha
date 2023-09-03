import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/Course.model';

export const get = createAction(
  '[course] get course',
  props<{ idToken: string }>()
);
export const getSuccess = createAction(
  '[course] get course success',
  props<{ courseList: Course[] }>()
);
export const getFailure = createAction(
  '[course] get course failure',
  props<{ error: any }>()
);
//detail
export const getCourseDetail = createAction(
  '[course] get course detail',
  props<{ idToken: string; id: string }>()
);
export const getCourseDetailSuccess = createAction(
  '[course] get course detail success',
  props<{ courseDetail: Course }>()
);
export const getCourseDetailFailure = createAction(
  '[course] get course detail failure',
  props<{ error: any }>()
);
