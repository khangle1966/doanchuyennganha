import { createAction, props } from '@ngrx/store';
import { Lesson } from '../../models/Lesson.model';
import { idToken } from '@angular/fire/auth';


// export const create = createAction(
//   '[lesson] create lesson',
//   props<{ lesson: Lesson; idToken: string }>()
// );

// export const createSuccess = createAction(
//   '[lesson] Create Success',

// );

// export const createFailure = createAction(
//   '[lesson] Create Failure',
//   props<{ error: any }>()
// );

export const getLesson = createAction(
  '[lesson] get lesson',
  props<{idToken: string, courseId: string}>()
  
);

export const getLessonSuccess = createAction(
  '[lesson] get lesson success',
  props<{ lessons: Lesson }>()
);

export const getLessonFailure = createAction(
  '[lesson] get lesson failure',
  props<{ error: any }>()
);







