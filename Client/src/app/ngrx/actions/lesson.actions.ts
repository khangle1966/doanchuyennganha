import { createAction, props } from '@ngrx/store';
import { Lesson } from './../../models/Lesson.model';

export const getLesson = createAction(
  '[lesson] get lesson',
  props<{ _id: string; idToken: string }>()
);

export const getLessonSuccess = createAction(
  '[lesson] get lesson success',
  props<{ lessons: Lesson[] }>()
);

export const getLessonFailure = createAction(
  '[lesson] get lesson failure',
  props<{ error: any }>()
);







