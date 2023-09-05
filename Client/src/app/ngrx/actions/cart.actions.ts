import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';
import { Profile } from 'src/app/models/profile.model';

export const addCourseToCart = createAction(
  '[Cart] add course to cart',
  props<{ course: Course }>()
);
export const removeCourseFromCart = createAction(
  '[Cart] remove course from cart',
  props<{ course: Course }>()
);
export const clearAllCart = createAction('[Cart] clear all cart');

export function addCourseToStock(arg0: { course: Course }): any {
  throw new Error('Function not implemented.');
}

export const buyCourse = createAction(
  '[Cart] buy course',
  props<{ courseId: string; userId: string; idToken: string }>()
);
export const buyCourseSuccess = createAction(
  '[Cart] buy course success',
  props<{ profile: Profile }>()
);
export const buyCourseFailure = createAction(
  '[Cart] buy course failure',
  props<{ buyErrorMessage: any }>()
);
