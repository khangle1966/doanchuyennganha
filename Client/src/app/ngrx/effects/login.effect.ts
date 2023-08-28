import { Injectable } from '@angular/core';
import * as LoginAction from '../actions/login.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable()
export class LoginEffect {
  constructor(private action$: Actions, private loginService: LoginService) {}

  login$ = createEffect(()=> {
    return this.action$.pipe(
        ofType(LoginAction.login),
        switchMap(()=> {
            return this.loginService.loginWithGoogle();
        }),
        map(()=> {
            return LoginAction.loginSuccess();
        }),
        catchError((error) => {
            return of(LoginAction.loginFailure({ errorMessage: error }));
        })
    );
  });
}
