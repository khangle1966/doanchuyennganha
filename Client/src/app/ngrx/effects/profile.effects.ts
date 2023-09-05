import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ProfileService } from 'src/app/services/profile/profile.service';
import { catchError, map, of, switchMap } from 'rxjs';

import * as ProfileActions from 'src/app/ngrx/actions/profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(
    private action$: Actions,
    private profileService: ProfileService
  ) {}

  create$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.create),
      switchMap((action) => {
        return this.profileService.create(action.profile, action.idToken);
      }),
      map((res) => {
        console.log(res);
        if (res.message) {
          return ProfileActions.createFailure({ errorMessage: res.message });
        }
        return ProfileActions.createSuccess();
      }),
      catchError((error) => {
        return of(ProfileActions.createFailure({ errorMessage: error }));
      })
    )
  );

  get$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.get),
      switchMap((action) => {
        return this.profileService.getById(action.id, action.idToken);
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
}
