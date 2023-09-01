import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TuiAlertService } from '@taiga-ui/core';
import { Subscription } from 'rxjs';
import * as AuthActions from 'src/app/ngrx/actions/auth.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<{ auth: AuthState }>,
    // private router: Router,
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService
  ) {}
  subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((val) => {
      val.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'isSuccessful').subscribe((val) => {
        if (val) {
          this.alerts.open('Login Success !!!', { status: 'info' }).subscribe();
          // this.router.navigate(['/loading']);
        }
      }),
      this.store.select('auth', 'isLoading').subscribe((val) => {
        if (val) {
          this.alerts.open('Login.... !!!', { status: 'success' }).subscribe();
          // this.router.navigate(['/loading']);
        }
      }),
      this.store.select('auth', 'errorMessage').subscribe((val) => {
        if (val) {
          this.alerts.open(`Error: ${val}`, { status: 'error' }).subscribe();
        }
      })
    );
  }

  loginWithGoogle() {
    this.store.dispatch(AuthActions.login());
  }
}
