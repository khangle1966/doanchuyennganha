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
  }),
  //làm thêm delete
  on(QuestionActions.remove, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isDeleteLoading: true,
      isDeleteSuccess: false,
      deleteMessError: '',
    };
  }),
  on(QuestionActions.removeSuccess, (state, action) => {
    console.log(action.type);
    const questionId = action.removedQuestion._id;
    const updatedQuestions = state.questions.filter(
      (question) => question._id !== questionId
    );
    return {
      ...state,
      questions: updatedQuestions,
      isDeleteLoading: false,
      isDeleteSuccess: true,
    };
  }),
  on(QuestionActions.removeFailure, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isDeleteLoading: false,
      isDeleteSuccess: false,
      deleteMessError: action.error,
    };
  }),
  //làm thêm update
  on(QuestionActions.update, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isUpdateLoading: true,
      isUpdateSuccess: false,
      updateMessError: '',
    };
  }),
  on(QuestionActions.updateSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isUpdateLoading: false,
      isUpdateSuccess: true,
    };
  }),
  on(QuestionActions.updateFailure, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isUpdateLoading: false,
      isUpdateSuccess: false,
      updateMessError: action.error,
    };
  })
);
