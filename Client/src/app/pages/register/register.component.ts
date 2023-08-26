import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent {
  readonly testForm = new FormGroup({
    name: new FormControl,
    age: new FormControl,
    avatar: new FormControl,
    email: new FormControl,
    cover: new FormControl,

  });
  readonly items = ['Male', 'Female'];
  readonly form = new FormGroup({
    date: new FormControl(null, Validators.required),
    color: new FormControl(null, Validators.required),
  });
}
