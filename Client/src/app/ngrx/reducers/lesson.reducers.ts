import { createReducer, on } from '@ngrx/store';
import * as LessonAction from '../actions/lesson.actions';
import { LessonState } from '../states/lessos.state';



export const initualState: LessonState = {
  lessons: [],
  isLoading: false,
  isSuccess: false,
  isGetLoading: false,
  isGetSuccess: false,
  error: '',
  getError: ''
};



export const LessonReducer = createReducer(
  initualState,

  on(LessonAction.getLesson, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      getError: '',

    };
  }),
  on(LessonAction.getLessonSuccess, (state, action) => {
    console.log('success');
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      getError: '',
      lessons: action.lessons
    };
  }),
  on(LessonAction.getLessonFailure, (state, {type , error }) => {
    console.log(' get faild');
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      getError: error,

    };
  })
);
