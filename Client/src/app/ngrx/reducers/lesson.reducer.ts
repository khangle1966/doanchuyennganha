import { createReducer, on } from '@ngrx/store';
import * as LessonAction from '../actions/lesson.actions';
import { LessonState } from '../states/lessos.state';
import { Lesson } from 'src/app/models/Lesson.model';



export const initualState: LessonState = {
  lessons: <Lesson>{},
  idToken: '',
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
  on(LessonAction.getLessonSuccess, (state, {type, lessons}) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      getError: '',
      lessons
    };
  }),
  on(LessonAction.getLessonFailure, (state, {type , error }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      getError: error,

    };
  })
);
