import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
}
