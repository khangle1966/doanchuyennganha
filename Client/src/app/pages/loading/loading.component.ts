import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest, forkJoin, take } from 'rxjs';
import { UserState } from 'src/app/ngrx/states/user.state';
import * as UserActions from 'src/app/ngrx/actions/user.actions';
import { TuiAlertService } from '@taiga-ui/core';
import { AuthState } from 'src/app/ngrx/states/auth.state';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less'],
})
export class LoadingComponent {
  idToken$ = this.store.select('auth', 'idToken');
  uid$ = this.store.select('auth', 'uid');
  user$ = this.store.select('user', 'user');
  isSuccess$ = this.store.select('user', 'isSuccess');
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private store: Store<{ user: UserState; auth: AuthState }>,
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((val) => {
      val.unsubscribe();
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        forkJoin({
          idToken: this.idToken$.pipe(take(1)),
          user: this.user$.pipe(take(1)),
        }).subscribe((res) => {
          if (res.user.uid) {
            console.log(res.user);
            if (res.user.profile) {
              this.router.navigateByUrl('/base');
            } else {
              this.router.navigateByUrl('/register');
            }
          } else {
            // console.log('alo');
            this.store.dispatch(
              UserActions.createUser({ idToken: res.idToken })
            );
          }
        }),
        forkJoin({
          idToken: this.idToken$.pipe(take(1)),
          uid: this.uid$.pipe(take(1)),
          isSuccess: this.isSuccess$.pipe(take(2)),
        }).subscribe((res) => {
          if (res.isSuccess) {
            // console.log(res.idToken, res.uid);
            this.store.dispatch(
              UserActions.getUser({ uid: res.uid, idToken: res.idToken })
            );
            this.router.navigateByUrl('/register');
          }
        }),
        this.store.select('user', 'isLoading').subscribe((val) => {
          if (val) {
            this.alerts.open('User not found !!!', { status: 'error' });
            this.alerts.open('Creating user info...', { status: 'info' });
          }
        }),
        this.store.select('user', 'isSuccess').subscribe((val) => {
          if (val) {
            this.alerts.open('Create user info success !!!', {
              status: 'success',
            });
          }
        })
      );
    }, 2000);
  }
}
