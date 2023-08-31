import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ProfileService } from 'src/app/services/profile/profile.service';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import * as ProfileAction from 'src/app/ngrx/actions/profile.action';

@Injectable()
export class ProfileEffects {
  constructor(
    private action$: Actions,
    private profileService: ProfileService
  ) {}

  updateProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileAction.updateProfile),
      switchMap((action) => {
        return this.profileService.updateProfile(action.idToken, action.course);
      }),
      map(() => {
        return ProfileAction.updateProfileSuccess();
      }),
      catchError((error) => {
        return of(ProfileAction.updateProfileFailure({ errorMessage: error }));
      })
    )
  );
}