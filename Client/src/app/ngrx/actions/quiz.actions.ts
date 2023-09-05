import { createAction, props } from '@ngrx/store';
import { Quiz } from 'src/app/models/quiz.model';

//get quiz by id
export const get = createAction(
  '[Quiz] get by id',
  props<{ idToken: string; id: string }>()
);
export const getSuccess = createAction(
  '[Quiz] get by id success',
  props<{ quiz: Quiz }>()
);
export const getFailure = createAction(
  '[Quiz] get by id failure',
  props<{ error: string }>()
);
//create new quiz
export const create = createAction(
  '[Quiz] create ',
  props<{ idToken: string; quiz: Quiz }>()
);
export const createSuccess = createAction(
  '[Quiz] create success',
  props<{ newQuiz: Quiz }>()
);
export const createFailure = createAction(
  '[Quiz] create failure',
  props<{ error: string }>()
);
//update  quiz
export const update = createAction(
  '[Quiz] update ',
  props<{ idToken: string; quiz: Quiz }>()
);
export const updateSuccess = createAction(
  '[Quiz] update success',
  props<{ updatedQuiz: Quiz }>()
);
export const updateFailure = createAction(
  '[Quiz] update failure',
  props<{ error: string }>()
);
