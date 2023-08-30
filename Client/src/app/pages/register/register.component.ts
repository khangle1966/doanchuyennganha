import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Auth, idToken, onAuthStateChanged } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as UserAction from'src/app/ngrx/actions/user.action';
import { UserInfo } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user/user.service';
import { UserState } from 'src/app/ngrx/states/user.state';
import { ProfileState } from 'src/app/ngrx/states/profile.state';
import { Profile } from 'src/app/models/Profile.model';
import { Subscription, mergeMap } from 'rxjs';
import * as ProfileAction from 'src/app/ngrx/actions/profile.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  readonly testForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)]),
    age: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    avatar: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    cover: new FormControl(null, Validators.required),

  });
  readonly items = ['Male', 'Female'];
  readonly form = new FormGroup({
    date: new FormControl(null, Validators.required),
    color: new FormControl(null, Validators.required),
  });

  user$ = this.store.select('user', 'user');
  isGetSuccess$ = this.store.select('user', 'isGetSuccess');

  isCreateSuccess$ = this.store.select('profile', 'isSuccess');
  errorMessage$ = this.store.select('profile', 'errorMessage');


  subscriptions: Subscription[] = [];

  id: string = '';
  email: string = '';
  displayName: string = '';
  avatar: string = '';

  regisForm = new FormGroup({
    id: new FormControl(''),
    email: new FormControl(''),
    userName: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    avatar : new FormGroup(''),
  });
  
  regisData = {
    id: '',
    email: '',
    displayName: '',
    userName: '',
    avatar: '',
  };

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store <{ user: UserState, profile: ProfileState }>
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        console.log('user', user.uid);
        let idToken = await user!.getIdToken(true)
        this.regisForm.patchValue({
          id: user!.uid,
          email: user!.email,
          displayName: user!.displayName!,
          avatar: user!.photoURL!,
        });
        this.store.dispatch(UserAction.getUser({ uid: user.uid, idToken: idToken }));
      } else {
        this.router.navigate(['/loading']);
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
          if (user.profile) {
            this.router.navigate(['/loading']);
          }
        }),

      this.isCreateSuccess$.subscribe((isCreateSuccess) => {
        if (isCreateSuccess) {
          this.router.navigate(['/home']);
        }
      }),
      this.errorMessage$.subscribe((errorMessage) => {
        if (errorMessage) {
          this.regisForm.patchValue({
            userName: '',
          });
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  ngOnInit(): void {
  }

  register() {
    this.regisData = {
      id: this.regisForm.value.id ?? '',
      email: this.regisForm.value.email ?? '',
      userName: this.regisForm.value.userName ?? '',
      displayName: this.regisForm.value.displayName ?? '',
      avatar : this.regisForm.value.avatar ??'',
    };

    this.store.dispatch(
      ProfileAction.create({
        profile: <Profile>this.regisData,
      })
    );
  }
}

