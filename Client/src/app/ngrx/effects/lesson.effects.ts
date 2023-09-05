import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import * as LessonAction from 'src/app/ngrx/actions/lesson.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

@Injectable() 
    export class LessonEffect {
        constructor (private lessonService: LessonService, private action$: Actions) {}

  getLesson$ = createEffect(() => this.action$.pipe(
    ofType(LessonAction.getLesson),
    exhaustMap((action) =>
      this.lessonService.getLesson(action.idToken, action.courseId).pipe(
        map((items) => {
          if (items != undefined || items != null) {
            return LessonAction.getLessonSuccess({ lessons: items });
          } else {
            return LessonAction.getLessonFailure({
              error: 'Course is undefined or null',
            });
          }
        }),
        catchError((error) => of(LessonAction.getLessonFailure({ error })))
      )
    )
  )
);
}