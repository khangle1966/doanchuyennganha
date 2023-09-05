import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of } from 'rxjs';
import { ProfileState } from '../ngrx/states/profile.state';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(
    private store: Store<{ profile: ProfileState }>,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select('profile', 'profile').pipe(
      map((profile) => {
        if (profile != undefined && profile.role == 'admin') {
          return true;
        } else {
          this.router.navigateByUrl('/no');
          return false;
        }
      }),
      catchError(() => {
        this.router.navigateByUrl('/no');
        return of(false);
      })
    );
  }
}

export const RoleGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(PermissionsService).canActivate(next, state);
};
