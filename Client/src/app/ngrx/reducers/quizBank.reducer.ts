import * as QuizBankActions from '../actions/quizBank.actions';
import { createReducer, on } from '@ngrx/store';
import { quizBankState } from '../states/quizBank.state';

export const initialState: quizBankState = {
  quizBank: [],
  isGetLoading: false,
  isGetSuccess: false,
  getMessError: '',
  isCreateLoading: false,
  isCreateSuccess: false,
  createMessError: '',
  //   isUpdateLoading: false,
  //   isUpdateSuccess: false,
  //   updateMessError: '',
  //   isDeleteLoading: false,
  //   isDeleteSuccess: false,
  //   deleteMessError: '',
};

export const quizBankReducer = createReducer(
  initialState,
  on(QuizBankActions.getquizBankId, (state) => {
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getMessError: '',
      quizBank: [],
    };
  }),
  on(QuizBankActions.getquizBankIdSuccess, (state, action) => {
    return {
      ...state,
      quizBank: action.quizBank,
      isGetLoading: false,
      isGetSuccess: true,
    };
  }),
  on(QuizBankActions.getquizBankIdFailure, (state, action) => {
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getMessError: action.error,
    };
  }),

  on(QuizBankActions.addquizBank, (state) => {
    return {
      ...state,
      isCreateLoading: true,
      isCreateSuccess: false,
      createMessError: '',
    };
  }),
  on(QuizBankActions.addquizBankSuccess, (state) => {
    return {
      ...state,
      isCreateLoading: false,
      isCreateSuccess: true,
    };
  }),
  on(QuizBankActions.addquizBankFailure, (state, action) => {
    return {
      ...state,
      isCreateLoading: false,
      isCreateSuccess: false,
      createMessError: action.error,
    };
  })

  //   on(QuizBankActions.updateQuizBank, (state) => {
  //     return {
  //       ...state,
  //       isUpdateLoading: true,
  //       isUpdateSuccess: false,
  //       updateMessError: '',
  //     };
  //   }),
  //   on(QuizBankActions.updateQuizBankSuccess, (state) => {
  //     return {
  //       ...state,
  //       isUpdateLoading: false,
  //       isUpdateSuccess: true,
  //     };
  //   }),
  //   on(QuizBankActions.updateQuizBankFailure, (state, action) => {
  //     return {
  //       ...state,
  //       isUpdateLoading: false,
  //       isUpdateSuccess: false,
  //       updateMessError: action.error,
  //     };
  //   }),

  //   on(QuizBankActions.deleteQuizBank, (state) => {
  //     return {
  //       ...state,
  //       isDeleteLoading: true,
  //       isDeleteSuccess: false,
  //       deleteMessError: '',
  //     };
  //   }),
  //   on(QuizBankActions.deleteQuizBankSuccess, (state, action) => {
  //     const quizBankId = action.deletedQuizBank._id;
  //     const updatedQuizBanks = state.quizBank.filter(
  //       (quizBank) => quizBank._id !== quizBankId
  //     );
  //     return {
  //       ...state,
  //       quizBanks: updatedQuizBanks,
  //       isDeleteLoading: false,
  //       isDeleteSuccess: true,
  //     };
  //   }),
  //   on(QuizBankActions.deleteQuizBankFailure, (state, action) => {
  //     return {
  //       ...state,
  //       isDeleteLoading: false,
  //       isDeleteSuccess: false,
  //       deleteMessError: action.error,
  //     };
  //   })
);
