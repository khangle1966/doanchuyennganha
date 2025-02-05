import * as QuestionActions from '../actions/question.actions';
import { createReducer, on } from '@ngrx/store';
import { QuestionState } from '../states/question.state';

export const initialState: QuestionState = {
  questions: [],
  isGetLoading: false,
  isGetSuccess: false,
  getMessError: '',
  isCreatedSuccess: false,
  isCreating: false,
  createMessError: '',
  isDeleting: false,
  isDeleteSuccess: false,
  deleteMessError: '',
};

export const questionReducer = createReducer(
  initialState,
  on(QuestionActions.getAllByQuizId, (state, action) => {
    console.log(action.type);
    return <QuestionState>{
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getMessError: '',
      question: [],
    };
  }),
  on(QuestionActions.getAllByQuizIdSuccess, (state, action) => {
    console.log(action.type);
    return <QuestionState>{
      ...state,
      questions: action.questions,
      isGetLoading: false,
      isGetSuccess: true,
    };
  }),
  on(QuestionActions.getAllByQuizIdFailure, (state, action) => {
    console.log(action.type);
    return <QuestionState>{
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getMessError: action.error,
    };
  }),

  on(QuestionActions.create, (state, action) => {
    console.log(action.type);
    return <QuestionState>{
      ...state,
      isCreatedSuccess: false,
      isCreating: true,
      createMessError: '',
    };
  }),
  on(QuestionActions.createSuccess, (state, action) => {
    console.log(action.type);
    return <QuestionState>{
      ...state,
      isCreating: false,
      isCreatedSuccess: true,
    };
  }),
  on(QuestionActions.createFailure, (state, action) => {
    console.log(action.type);
    return <QuestionState>{
      ...state,
      isCreating: false,
      isCreatedSuccess: false,
      createMessError: action.error,
    };
  }),
  //làm thêm delete
  on(QuestionActions.remove, (state, action) => {
    console.log(action.type);
    return <QuestionState>{
      ...state,
      isDeleting: true,
      isDeleteSuccess: false,
      deleteMessError: '',
    };
  }),
  on(QuestionActions.removeSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isDeleting: false,
      isDeleteSuccess: true,
    };
  }),
  on(QuestionActions.removeFailure, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isDeleting: false,
      isDeleteSuccess: false,
      deleteMessError: action.error,
    };
  }),
  on(QuestionActions.clearState, (state, action) => {
    console.log(action.type);
    return <QuestionState>{
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getMessError: '',
      isCreatedSuccess: false,
      isCreating: false,
      createMessError: '',
      isDeleting: false,
      isDeleteSuccess: false,
      deleteMessError: '',
      questions: [],
    };
  })
);
