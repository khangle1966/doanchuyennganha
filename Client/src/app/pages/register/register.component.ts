import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Auth, idToken, onAuthStateChanged, user } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as UserAction from 'src/app/ngrx/actions/user.action';
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
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/),
    ]),
    avatar: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
  });
  readonly items = ['Male', 'Female'];

  readonly form = new FormGroup({
    sex: new FormControl('', Validators.required),
  });

  id: string = '';
  email: string = '';
  displayName: string = '';
  userName: string = '';

  regisForm = new FormGroup({
    id: new FormControl(''),
    email: new FormControl(''),
    userName: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
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
    private store: Store<{ user: UserState; profile: ProfileState }>
  ) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {}

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
  }
}
