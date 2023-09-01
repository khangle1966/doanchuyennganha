import {ChangeDetectionStrategy ,Component } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, mergeMap } from 'rxjs';
import { UserState } from 'src/app/ngrx/states/user.state';
import * as UserAction from 'src/app/ngrx/actions/user.action';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {

  subscriptions: Subscription[] = [];

  userData$ = this.store.select('user', 'user');

  constructor(
    private auth: Auth,
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {
    setTimeout(()=> {
      onAuthStateChanged(this.auth, async (user) => {
        if(user) {
          console.log('user', user);
          let idToken = await user!.getIdToken(true);
          console.log(idToken)
          this.store.dispatch(UserAction.getUser({uid: user.uid, idToken: idToken}));
        }
        else {
          this.router.navigate(['/login']);
        }
      });

      this.subscriptions.push(
        this.store
          .select('user', 'isGetSuccess')
          .pipe(
            mergeMap((isGetSuccess) => {
              if (isGetSuccess) {
                return this.userData$;
              } else {
                return [];
              }
            })
          )
          .subscribe((user) => {
            if (user) {
              console.log('user data', user);

              if (user.profile === null) {
                console.log('register');
                this.router.navigate(['/register']);

              } else if (user.profile) {
                this.router.navigate(['/base/home']);
              }
            } else {
              console.log('login');
              this.router.navigate(['/login']);
            }
          })
      );
    }, 2000);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {}
}
