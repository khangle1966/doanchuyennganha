import * as QuestionActions from '../actions/question.actions';
import { createReducer, on } from '@ngrx/store';
import { QuestionState } from '../states/question.state';

export const initialState: QuestionState = {
  questions: [],
  isGetLoading: false,
  isGetSuccess: false,
  getMessError: '',
  isCreateLoading: false,
  isCreateSuccess: false,
  createMessError: '',
};

export const questionReducer = createReducer(
  initialState,
  on(QuestionActions.getAllByQuizId, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getMessError: '',
      question: [],
    };
  }),
  on(QuestionActions.getAllByQuizIdSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      questions: action.questions,
      isGetLoading: false,
      isGetSuccess: true,
    };
  }),
  on(QuestionActions.getAllByQuizIdFailure, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getMessError: action.error,
    };
  }),

  on(QuestionActions.create, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isCreateLoading: true,
      isCreateSuccess: false,
      createMessError: '',
    };
  }),
  on(QuestionActions.createSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isCreateLoading: false,
      isCreateSuccess: true,
    };
  }),
  on(QuestionActions.createFailure, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isCreateLoading: false,
      isCreateSuccess: false,
      createMessError: action.error,
    };
  })
);
