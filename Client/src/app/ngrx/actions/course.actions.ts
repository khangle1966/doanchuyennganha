import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';

export const get = createAction(
  '[Course] get all',
  props<{ idToken: string }>()
);
export const getSuccess = createAction(
  '[Course] get all success',
  props<{ courseList: Course[] }>()
);
export const getFailure = createAction(
  '[Course] get all failure',
  props<{ error: string }>()
);
//detail
export const getCourseDetail = createAction(
  '[Course] get  detail',
  props<{ idToken: string; id: string }>()
);
export const getCourseDetailSuccess = createAction(
  '[Course] get  detail success',
  props<{ courseDetail: Course }>()
);
export const getCourseDetailFailure = createAction(
  '[Course] get  detail failure',
  props<{ error: string }>()
);
//create new course
export const create = createAction(
  '[Course] create ',
  props<{ idToken: string; course: Course }>()
);
export const createSuccess = createAction(
  '[Course] create success',
  props<{ newCourse: Course }>()
);
export const createFailure = createAction(
  '[Course] create failure',
  props<{ error: string }>()
);
//update  course
export const update = createAction(
  '[Course] update ',
  props<{ idToken: string; course: Course }>()
);
export const updateSuccess = createAction(
  '[Course] update success',
  props<{ updatedCourse: Course }>()
);
export const updateFailure = createAction(
  '[Course] update failure',
  props<{ error: string }>()
);
//delete  course
export const remove = createAction(
  '[Course] remove ',
  props<{ idToken: string; id: string }>()
);
export const removeSuccess = createAction(
  '[Course] remove success',
  props<{ course: Course }>()
);
export const removeFailure = createAction(
  '[Course] remove failure',
  props<{ error: string }>()
);

//getbyUser
export const getByUser = createAction(
  '[Course] get by user',
  props<{ idToken: string; userId: string }>()
);
export const getByUserSuccess = createAction(
  '[Course] get by user success',
  props<{ courseList: Course[] }>()
);
export const getByUserFailure = createAction(
  '[Course] get by user failure',
  props<{ getErrMess: string }>()
);

export const clearState = createAction('[Course] Clear State');
