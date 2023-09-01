import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TuiBooleanHandler } from '@taiga-ui/cdk';
import { Observable } from 'rxjs';
import { LoginState } from 'src/app/ngrx/states/login.state';

import { ProfileService } from 'src/app/services/profile/profile.service';
import * as ProfileAction from 'src/app/ngrx/actions/profile.action';
import { idToken } from '@angular/fire/auth';
import { ProfileState } from 'src/app/ngrx/states/profile.state';

import { Profile } from 'src/app/models/Profile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  search = '';
  open = false;

  onClick(): void {
    this.open = !this.open;
  }

  onObscured(obscured: boolean): void {
    if (obscured) {
      this.open = false;
    }
  }

  onActiveZone(active: boolean): void {
    this.open = active && this.open;
  }

  course = [
    {
      id: '',
      name: 'Phát triển Web',
      category: 'Web Development',
      imgURL: '../../.././../../assets/images/Picture.png',
    },
    {
      id: '',
      name: 'Phát triển Web',
      category: 'Web Development',
      imgURL: '../../.././../../assets/images/Picture.png',
    },
    {
      id: '',
      name: 'Phát triển Web',
      category: 'Web Development',
      imgURL: '../../.././../../assets/images/Picture.png',
    },
    {
      id: '',
      name: 'Phát triển Web',
      category: 'Web Development',
      imgURL: '../../.././../../assets/images/Picture.png',
    },
    {
      id: '',
      name: 'Phát triển Web',
      category: 'Web Development',
      imgURL: '../../.././../../assets/images/Picture.png',
    },
    {
      id: '',
      name: 'Phát triển Web',
      category: 'Web Development',
      imgURL: '../../.././../../assets/images/Picture.png',
    },
    {
      id: '',
      name: 'Phát triển Web',
      category: 'Web Development',
      imgURL: '../../.././../../assets/images/Picture.png',
    },
    {
      id: '',
      name: 'Phát triển Web',
      category: 'Web Development',
      imgURL: '../../.././../../assets/images/Picture.png',
    },
    {
      id: '',
      name: 'Phát triển Web',
      category: 'Web Development',
      imgURL: '../../.././../../assets/images/Picture.png',
    },
    {
      id: '',
      name: 'Phát triển Web',
      category: 'Web Development',
      imgURL: '../../.././../../assets/images/Picture.png',
    },
  ];

  readonly testForm = new FormGroup({
    testValue: new FormControl('orange'),
  });

  readonly courses = ['Chưa học', 'Đang học', 'Đã học xong'];

  idToken: string = '';
  idToken$: Observable<string> = this.store.select('idToken', 'idToken');

  profile$ = this.store.select('profile', 'profile');

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private store: Store<{ profile: ProfileState; idToken: LoginState }>
  ) {
    this.idToken$.subscribe((idToken) => {
      this.idToken = idToken;
      console.log(this.idToken);

      this.store.dispatch(
        ProfileAction.get({
          idToken: this.idToken,
          id: '64f0107814b619bebaaf8e03',
        })
      );
    });

    this.profile$.subscribe((profile) => {
      console.log(profile);
    });
  }

  toEdit() {
    this.router.navigate(['/base/profile']);
  }

  updateProfile() {
    // this.store.dispatch(
    //   ProfileAction.updateProfile({
    //     idToken: this.idToken,
    //     profile: {},
    //     id: '1',
    //   })
    // );
    // console.log(id, profile);
  }
}
