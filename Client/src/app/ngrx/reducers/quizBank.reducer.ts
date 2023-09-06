import * as QuizBankActions from '../actions/quizBank.actions';
import { createReducer, on } from '@ngrx/store';
import { quizBankState } from '../states/quizBank.state';

export const initialState: quizBankState = {
  newQuizBank: null,
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

export const quizBankReducer = createReducer(
  initialState,
  on(QuizBankActions.add, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isCreateLoading: true,
      isCreateSuccess: false,
      createMessError: '',
      newQuizBank: null,
    };
  }),
  on(QuizBankActions.addSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isCreateLoading: false,
      isCreateSuccess: true,
      newQuizBank: action.newQuizBank,
    };
  }),
  on(QuizBankActions.addFailure, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isCreateLoading: false,
      isCreateSuccess: false,
      createMessError: action.error,
    };
  }),

  on(QuizBankActions.update, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isUpdateLoading: true,
      isUpdateSuccess: false,
      updateMessError: '',
    };
  }),
  on(QuizBankActions.updateSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isUpdateLoading: false,
      isUpdateSuccess: true,
    };
  }),
  on(QuizBankActions.updateFailure, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isUpdateLoading: false,
      isUpdateSuccess: false,
      updateMessError: action.error,
    };
  }),
  on(QuizBankActions.clearState, (state, action) => {
    console.log(action.type);
    return <quizBankState>{
      ...state,
      isCreateLoading: false,
      isCreateSuccess: false,
      createMessError: '',
      isUpdateLoading: false,
      isUpdateSuccess: false,
      updateMessError: '',
      newQuizBank: null,
    };
  })
);
