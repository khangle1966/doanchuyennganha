import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from 'src/app/services/profile/profile.service';
import * as ProfileActions from 'src/app/ngrx/actions/profile.actions';
import * as CartActions from 'src/app/ngrx/actions/cart.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { CourseService } from 'src/app/services/course/course.service';
@Injectable()
export class CartEffects {
  constructor(
    private action$: Actions,
    private profileService: ProfileService,
    private courseService: CourseService
  ) {}

  get$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.get),
      switchMap((action) => {
        return this.profileService.get(action.id, action.idToken);
      }),
      map((profile) => {
        return ProfileActions.getSuccess({ profile });
      }),
      catchError((error) => {
        return of(ProfileActions.getFailure({ errorMessage: error }));
      })
    )
  );

  updateProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.updateProfile),
      switchMap((action) => {
        return this.profileService.updateProfile(
          action.idToken,
          action.profile,
          action.id
        );
      }),
      map(() => {
        return ProfileActions.updateProfileSuccess();
      }),
      catchError((error) => {
        return of(ProfileActions.updateProfileFailure({ errorMessage: error }));
      })
    )
  );

  buyCourse$ = createEffect(() =>
    this.action$.pipe(
      ofType(CartActions.buyCourse),
      switchMap((action) => {
        return this.courseService.buyCoure(
          action.idToken,
          action.courseId,
          action.userId
        );
      }),
      map((profile) => {
        return CartActions.buyCourseSuccess({ profile });
      }),
      catchError((error) => {
        return of(CartActions.buyCourseFailure({ buyErrorMessage: error }));
      })
    )
  );
}
