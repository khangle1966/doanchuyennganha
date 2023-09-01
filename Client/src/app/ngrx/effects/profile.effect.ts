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
        return this.profileService.updateProfile(
          action.idToken,
          action.profile,
          action.id
        );
      }),
      map(() => {
        return ProfileAction.updateProfileSuccess();
      }),
      catchError((error) => {
        return of(ProfileAction.updateProfileFailure({ errorMessage: error }));
      })
    )
  );

  get$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileAction.get),
      switchMap((action) => {
        return this.profileService.get(action.idToken, action.id);
      }),
      map((profile) => {
        return ProfileAction.getSuccess({ profile });
      }),
      catchError((error) => {
        return of(ProfileAction.getFailure({ errorMessage: error }));
      })
    )
  );
}
