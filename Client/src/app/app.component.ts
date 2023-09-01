import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileState } from './ngrx/states/profile.state';
import { UserState } from './ngrx/states/user.state';
import { Auth, idToken, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as AuthActions from './ngrx/actions/auth.actions';
import * as UserActions from './ngrx/actions/user.actions';
import { AuthState } from './ngrx/states/auth.state';
import { combineLatest, first, forkJoin, merge, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'Gnosis';
  idToken$ = this.store.select('auth', 'idToken');
  uid$ = this.store.select('auth', 'uid');

  constructor(
    private auth: Auth,
    private router: Router,
    private store: Store<{
      profile: ProfileState;
      user: UserState;
      auth: AuthState;
    }>
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        console.log('user UID', user.uid);
        let idToken = await user!.getIdToken(true);
        console.log(' idToken: ', idToken);
        this.store.dispatch(AuthActions.storedIdToken({ idToken }));
        this.store.dispatch(AuthActions.storedUserUid({ uid: user.uid }));
        this.router.navigateByUrl('/loading');
      } else {
        // console.log('user logout');
        this.router.navigateByUrl('/welcome');
      }
    });

    combineLatest([this.idToken$, this.uid$]).subscribe((res) => {
      if (res[0] != '' && res[1] != '') {
        // console.log(res);
        this.store.dispatch(
          UserActions.getUser({ uid: res[1], idToken: res[0] })
        );
      }
    });
  }
  ngOnInit(): void {
    // forkJoin({
    //   idToken: this.idToken$.pipe(take(2)),
    //   uid: this.uid$.pipe(take(2)),
    // }).subscribe((res) => {
    //   console.log(res);
    //   this.store.dispatch(
    //     UserActions.getUser({ uid: res.uid, idToken: res.idToken })
    //   );
    // });
  }
}
