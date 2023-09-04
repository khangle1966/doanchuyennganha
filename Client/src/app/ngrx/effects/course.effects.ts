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
      exhaustMap((action) =>
        this.courseService.getCourse(action.idToken).pipe(
          map((items) => {
            return CourseAction.getSuccess({ courseList: items });
          }),
          catchError((error) => of(CourseAction.getFailure({ error })))
        )
      )
    )
  );

  getCourseDetail$ = createEffect(() =>
    this.action$.pipe(
      ofType(CourseAction.getCourseDetail),
      exhaustMap((action) =>
        this.courseService.getCourseById(action.idToken, action.id).pipe(
          map((items) => {
            console.log(items);
            return CourseAction.getCourseDetailSuccess({ courseDetail: items });
          }),
          catchError((error) =>
            of(CourseAction.getCourseDetailFailure({ error }))
          )
        )
      )
    )
  );
}
