import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CourseService } from 'src/app/services/course/course.service';
import * as CourseAction from '../actions/course.actions';

@Injectable()
export class CourseEffect {
  constructor(private courseService: CourseService, private action$: Actions) {}
  get$ = createEffect(() =>
    this.action$.pipe(
      ofType(CourseAction.get),
      exhaustMap(() =>
        this.courseService.getCourse().pipe(
          map((courses) => {
            console.log('hello')
            return CourseAction.getSuccess({ courseList: courses });

          }),
          catchError((error) => of(CourseAction.getFailure({ error })))
        )
      )
    )
  );
}
