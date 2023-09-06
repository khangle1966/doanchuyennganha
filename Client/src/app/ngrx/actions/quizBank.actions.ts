import { createAction, props } from '@ngrx/store';
import { quizBank } from 'src/app/models/quizBank.model';

export const add = createAction(
  '[quizBank] Add quizBank',
  props<{ idToken: string; quizBank: quizBank }>()
);
export const addSuccess = createAction(
  '[quizBank] Add quizBank Success',
  props<{ newQuizBank: quizBank }>()
);
export const addFailure = createAction(
  '[quizBank] Add quizBank Failure',
  props<{ error: string }>()
);

export const update = createAction(
  '[quizBank] Update quizBank',
  props<{ idToken: string; quizBank: quizBank }>()
);
export const updateSuccess = createAction(
  '[quizBank] Update quizBank Success',
  props<{ quizBank: quizBank }>()
);
export const updateFailure = createAction(
  '[quizBank] Update quizBank Failure',
  props<{ error: string }>()
);
export const clearState = createAction('[quizBank] Clear State');
