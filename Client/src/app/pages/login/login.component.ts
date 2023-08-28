import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as LoginAction from 'src/app/ngrx/actions/login.action';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  testForm = new FormGroup({
    testValue1: new FormControl(null),
    testValue2: new FormControl(null),
    testValue3: new FormControl({ value: false, disabled: true }),
  });

  constructor(private loginService: LoginService, private router: Router) { }

  async Login() {
    let loginResult = await this.loginService.loginWithGoogle();
    if (loginResult == null) {
      console.log('Login Failed');

    } else {
      console.log("Login Success");
      this.router.navigate(['/register'])
    }
  }

}
