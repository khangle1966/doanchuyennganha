import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';

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
