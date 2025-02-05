import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UserService } from 'src/app/services/user/user.service';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import * as UserAction from 'src/app/ngrx/actions/user.actions';

@Injectable()
export class UserEffects {
  constructor(private action$: Actions, private userService: UserService) {}

  create$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserAction.createUser),
      switchMap((action) => {
        // console.log('id token: '+ action.idToken)
        return this.userService.createUser(action.idToken);
      }),
      map(() => {
        return UserAction.createUserSuccess();
      }),
      catchError((e) => {
        return of(
          UserAction.createUserFailure({ errorMessage: e.error.message })
        );
      })
    )
  );

  getUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserAction.getUser),
      exhaustMap((action) => {
        return this.userService.getUser(action.uid, action.idToken).pipe(
          map((user) => {
            return UserAction.getUserSuccess({ user: user });
          }),
          catchError((e) => {
            return of(
              UserAction.getUserFailure({ errorMessage: e.error.message })
            );
          })
        );
      })
    )
  );
}
