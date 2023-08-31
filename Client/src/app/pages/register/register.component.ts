import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Auth, idToken, onAuthStateChanged, user } from '@angular/fire/auth';
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
    avatar: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),

  });
  readonly items = ['Male', 'Female'];

  readonly form = new FormGroup({
    sex: new FormControl('', Validators.required),
  });

  user$ = this.store.select('user', 'user');
  userImg : UserInfo = <UserInfo>{};
  isGetSuccess$ = this.store.select('user', 'isGetSuccess');
  isCreateLoading$ = this.store.select('user','isLoading');
  isCreateSuccess$ = this.store.select('profile', 'isSuccess');
  errorMessage$ = this.store.select('profile', 'errorMessage');

  idToken: string = '';

  subscriptions: Subscription[] = [];

  id: string = '';
  email: string = '';
  displayName: string = '';
  userName: string = '';


  regisForm = new FormGroup({
    id: new FormControl(''),
    email: new FormControl(''),
    userName: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required, ),
    country: new FormControl('', Validators.required),
    // sex: new FormControl('', Validators.required),
  });
  
  regisData = {
    id: '',
    email: '',
    displayName: '',
    userName: '',
    country: '',
    // sex: '',
  };

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store <{ user: UserState, profile: ProfileState }>
  )
  {
    this.user$.subscribe((value) =>{
      if(value){
        this.userImg = value;
        console.log('userne',this.userImg)
      }
    })
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        console.log('user', user.uid);
        console.log('user',user)
        let idToken = await user!.getIdToken(true)
        this.idToken = idToken
        
        this.regisForm.patchValue({
          id: user!.uid,
          email: user!.email,
          displayName: user!.displayName!,

        });
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
        console.log('check succes',isCreateSuccess)
        if (isCreateSuccess) {
          this.router.navigate(['/base/home']);
        }
      }),
      this.errorMessage$.subscribe((errorMessage) => {
        if (errorMessage) {
          this.regisForm.patchValue({
            userName: '',
          });
        }
      }),
      this.isCreateLoading$.subscribe((val) => {
        if(val == false){
                  this.store.dispatch(UserAction.getUser({ uid: user.uid, idToken: idToken }));

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
      userName: this.regisForm.value.userName ?? 'abc',
      displayName: this.regisForm.value.displayName ?? '',
      country: this.regisForm.value.country ?? '',
      // sex: this.regisForm.value.sex ?? '',
    };

    // console.log(this.regisForm.value);
    

    this.store.dispatch(
      ProfileAction.create({
        profile: <Profile>this.regisData,
        idToken: this.idToken
      })
    );
  }
}

