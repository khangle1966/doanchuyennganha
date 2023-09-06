import { createReducer, on } from '@ngrx/store';
import * as QuizActions from '../actions/quiz.actions';
import { QuizState } from '../states/quiz.state';

export const initialState: QuizState = {
  quiz: null,
  isGetLoading: false,
  isGetSuccess: false,
  getMessError: '',
  isCreateLoading: false,
  isCreateSuccess: false,
  createMessError: '',
  isUpdateLoading: false,
  isUpdateSuccess: false,
  updateMessError: '',
};

export const quizReducer = createReducer(
  initialState,
  on(QuizActions.get, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getMessError: '',
    };
  }),
  on(QuizActions.getSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      quiz: action.quiz,
      isGetLoading: false,
      isGetSuccess: true,
    };
  }),
  on(QuizActions.getFailure, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getMessError: action.error,
    };
  }),
  on(QuizActions.create, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isCreateLoading: true,
      isCreateSuccess: false,
      createMessError: '',
    };
  }),
  on(QuizActions.createSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      quiz: action.newQuiz,
      isCreateLoading: false,
      isCreateSuccess: true,
    };
  }),
  on(QuizActions.createFailure, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isCreateLoading: false,
      isCreateSuccess: false,
      createMessError: action.error,
    };
  }),
  on(QuizActions.update, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isUpdateLoading: true,
      isUpdateSuccess: false,
      updateMessError: '',
    };
  }),
  on(QuizActions.updateSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      quiz: action.updatedQuiz,
      isUpdateLoading: false,
      isUpdateSuccess: true,
    };
  }),
  on(QuizActions.updateFailure, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isUpdateLoading: false,
      isUpdateSuccess: false,
      updateMessError: action.error,
    };
  }),
  on(QuizActions.clearState, (state, action) => {
    console.log(action.type);
    return <QuizState>{
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getMessError: '',
      isCreateLoading: false,
      isCreateSuccess: false,
      createMessError: '',
      isUpdateLoading: false,
      isUpdateSuccess: false,
      updateMessError: '',
      quiz: null,
    };
  })
);
