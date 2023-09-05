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
        this.lessonService.getLesson(action._id, action.idToken).pipe(
            map((lessonList) => {
                return LessonAction.getLessonSuccess( {lessons: lessonList})
            }),
            catchError((error) => of(LessonAction.getLessonFailure({error: error})))
        )
    )
)
);
}