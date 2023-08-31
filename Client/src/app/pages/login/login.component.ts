import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { onAuthStateChanged } from '@firebase/auth';
import { Store } from '@ngrx/store';
import { Subscription, mergeMap } from 'rxjs';
import { UserInfo } from 'src/app/models/User.model';
import * as LoginAction from 'src/app/ngrx/actions/login.action';
import * as UserAction from 'src/app/ngrx/actions/user.action';
import { LoginState } from 'src/app/ngrx/states/login.state';
import { UserState } from 'src/app/ngrx/states/user.state';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit, OnDestroy {
  testForm = new FormGroup({
    testValue1: new FormControl(null),
    testValue2: new FormControl(null),
    testValue3: new FormControl({ value: false, disabled: true }),
  });

  idToken$ = this.store.select('login', 'idToken');
  isSuccessful$ = this.store.select('login', 'isSuccessful');
  user$ = this.store.select('user', 'user');
  isGetSuccess$ = this.store.select('user', 'isGetSuccess');
  isCreateSuccess$ = this.store.select('user', 'isSuccess');
  errorMessage$ = this.store.select('user', 'errorMessage');

  uid: string = '';
  isToken: string = '';
  subscriptions: Subscription[] = [];

  user: UserInfo = <UserInfo>{};
  userFirebase: any = null;

  constructor(
    private auth: Auth,
    private router: Router,
    private store: Store<{ login: LoginState; user: UserState }>
  ) {
    onAuthStateChanged(this.auth, async (user) =>{
      console.log(user + 'User firebase');
      if(user) {
        this.userFirebase = user;
        let idToken = await user!.getIdToken(true);
        this.isToken = idToken;
        this.store.dispatch(LoginAction.storedIdToken(idToken));
        this.store.dispatch(UserAction.getUser({uid: user.uid, idToken: idToken}));
      } else {
        this.store.dispatch(LoginAction.storedIdToken(''));
        this.router.navigate(['/login']);
      }
    });

    this.subscriptions.push(
      this.store
        .select('user', 'isGetSuccess')
        .pipe(
          mergeMap((isGetSuccess) => {
            if (isGetSuccess) {
              return this.user$;
            } else {
              return [];
            }
          })
        )
        .subscribe((user) => {
          if (user && this.userFirebase) {
            console.log('user data', user);

            if (user.profile === null) {
              this.router.navigate(['/loading']);
            } else if (user.profile) {
              this.router.navigate(['/loading']);
            }
          } else {
            // this.store.dispatch(
            //   UserAction.createUser({ idToken: this.isToken })
            // );
          }
        }),

       this.idToken$.subscribe((idToken) => {
        if (idToken && this.userFirebase) {
          this.isToken = idToken;
          console.log(idToken);
          this.store.dispatch(UserAction.createUser({ idToken: idToken }));
        }
      }),
 

      this.isCreateSuccess$.subscribe((isCreateSuccess) => {
        if (isCreateSuccess && this.userFirebase) {
          this.router.navigate(['/loading']);
        }
      }),
      
      this.errorMessage$.subscribe((errorMessage) => {
        if (errorMessage && this.userFirebase) {
          console.log(errorMessage);
          this.router.navigate(['/loading']);
        }
      })
    );
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  
  ngOnInit(): void {}

  loginWithGoogle() {
    this.store.dispatch(LoginAction.login());
    
  }
}
