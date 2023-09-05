import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';
import { Profile } from 'src/app/models/profile.model';
import * as AuthActions from '../../../../ngrx/actions/auth.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  @Input('isEdit') isEdit: boolean = false;
  @Input('course') course: Course | null = null;
  @Input('profile') profile: Profile | null = null;

  readonly genders = ['Male', 'Female'];
  readonly countries = [
    'VietNam',
    'Japan',
    'Korea',
    'China',
    'USA',
    'UK',
    'Germany',
    'Italian',
    'France',
    'Spain',
    'Portugal',
    'Brazil',
    'Holland',
  ];

  courseForm: FormGroup = new FormGroup({
    _id: new FormControl({ value: '', disabled: true }, Validators.required),
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required),
    image: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    bio: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    console.log(this.course);
    if (this.isEdit) {
      if (this.course != null) {
        this.courseForm = new FormGroup({
          _id: new FormControl(
            { value: this.course._id, disabled: true },
            Validators.required
          ),
          name: new FormControl(this.course.name, Validators.required),
          category: new FormControl(this.course.category, Validators.required),
          description: new FormControl(
            this.course.description,
            Validators.required
          ),
          price: new FormControl(this.course.price, Validators.required),
          image: new FormControl(this.course.img, Validators.required),
        });
      }
    }
  }
  constructor(private store: Store<{ auth: AuthState }>) {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
