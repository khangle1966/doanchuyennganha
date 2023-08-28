import { Component, Input } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as UserAction from'src/app/ngrx/actions/user.action';
import { UserInfo } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user/user.service';
import { UserState } from 'src/app/ngrx/states/user.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent {
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

  id: string = '';
  email: string = '';
  displayName: string = '';

  regisForm = new FormGroup({
    id: new FormControl(''),
    email: new FormControl(''),
    userName: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
  });


  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store <{ user: UserState }>
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        console.log('user', user.uid);
        this.regisForm.patchValue({
          id: user!.uid,
          email: user!.email,
          displayName: user!.displayName!,
        });
        this.store.dispatch(UserAction.getUser({ uid: user.uid }));
      } else {
        this.router.navigate(['/loading']);
      }
    });

  
}

ngOnInit(): void {
  this.store.pipe(select(state => state.user.email)).subscribe(email => {
    this.email = email;
  });
}
}