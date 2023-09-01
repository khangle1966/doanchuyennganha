import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, mergeMap } from 'rxjs';
import { UserState } from 'src/app/ngrx/states/user.state';
import * as UserAction from 'src/app/ngrx/actions/user.actions';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  user$ = this.store.select('user', 'user');

  constructor(
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    setTimeout(() => {
      this.user$.subscribe((user) => {
        if (user.uid) {
          console.log(user);
          if (user.profile) {
            this.router.navigateByUrl('/base');
          } else {
            this.router.navigateByUrl('/register');
          }
        } else {
          console.log('user not found');
        }
      });
    }, 2000);
  }
}
