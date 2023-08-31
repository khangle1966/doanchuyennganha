import { createAction, props } from '@ngrx/store';

export const login = createAction('[Login] Login');

export const loginSuccess = createAction('[Login] Login Success');

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ errorMessage: string }>()
);

export const storedIdToken = createAction(
  '[Login] Stored Id Token',
  (idToken: string) => ({ idToken })
);
