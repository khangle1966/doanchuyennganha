import { createAction, props } from '@ngrx/store';
import { quizBank } from 'src/app/models/quizBank.model';

export const getquizBankId = createAction(
  '[quizBank] Get quizBank',
  props<{ idToken: string; id: string }>()
);
export const getquizBankIdSuccess = createAction(
  '[quizBank] Get quizBank Success',
  props<{ quizBank: quizBank[] }>()
);
export const getquizBankIdFailure = createAction(
  '[quizBank] Get quizBank Failure',
  props<{ error: string }>()
);

export const addquizBank = createAction(
  '[quizBank] Add quizBank',
  props<{ idToken: string; quizBank: quizBank }>()
);
export const addquizBankSuccess = createAction(
  '[quizBank] Add quizBank Success'
);
export const addquizBankFailure = createAction(
  '[quizBank] Add quizBank Failure',
  props<{ error: string }>()
);
