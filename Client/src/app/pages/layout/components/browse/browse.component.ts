import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { Store } from '@ngrx/store';
import { CourseState } from 'src/app/ngrx/states/course.state';
import * as CourseAction from 'src/app/ngrx/actions/course.actions';
import * as CartAction from 'src/app/ngrx/actions/cart.actions';
import { CartState } from 'src/app/ngrx/states/cart.state';
import { TuiAlertService } from '@taiga-ui/core';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { ProfileState } from 'src/app/ngrx/states/profile.state';
import { Profile } from 'src/app/models/profile.model';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.less'],
})
export class BrowseComponent implements OnInit, OnDestroy {
  courseList$: Observable<Course[]> = this.store.select('course', 'courseList');
  cartList$ = this.store.select('cart', 'cartList');
  cartList: Course[] = [];
  idToken$: Observable<string> = this.store.select('auth', 'idToken');
  subscriptions: Subscription[] = [];
  idToken = '';
  profile: Profile = <Profile>{};

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private router: Router,
    private store: Store<{
      course: CourseState;
      cart: CartState;
      auth: AuthState;
      profile: ProfileState;
    }>
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((val) => {
      val.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.cartList$.subscribe((cartList) => {
        if (cartList != undefined) {
          this.cartList = cartList;
          console.log('cartListL: ', this.cartList);
        }
      }),
      this.idToken$.subscribe((value) => {
        console.log(value);
        if (value) {
          this.store.dispatch(CourseAction.get({ idToken: value }));
        }
      }),

      this.courseList$.subscribe((item) => {
        if (item != undefined && item.length > 0) {
          console.log('courseList: ', item);
        }
      }),

      this.store.select('auth', 'idToken').subscribe((val) => {
        if (val != '') {
          this.idToken = val;
        }
      }),

      this.store.select('profile', 'profile').subscribe((profile) => {
        if (profile != null && profile != undefined) {
          this.profile = profile;
        }
      }),

      //how to subscribe getByUser
      this.store.select('course', 'courseList').subscribe((item) => {
        if (item != undefined && item.length > 0) {
          this.store.dispatch(
            CourseAction.getByUser({
              idToken: this.idToken,
              userId: this.profile.id,
            })
          );
        }
      })
    );
  }

  backhome() {
    this.router.navigate(['/base/home']);
  }

  description(id: string) {
    this.router.navigate([`/base/browse/detail/${id}`]);
  }

  addCourseToCart(course: Course) {
    let isExist = false;
    this.cartList.forEach((item) => {
      console.log(item);
      if (item._id == course._id) {
        this.warningNotification(`${course.name} is already in the cart`);
        isExist = true;
        return;
      }
    });
    if (isExist) {
      return;
    }
    this.store.dispatch(CartAction.addCourseToCart({ course }));
  }

  warningNotification(message: string): void {
    this.alerts
      .open('', {
        label: message,
        status: 'warning',
        autoClose: 4000,
      })
      .subscribe();
  }

  search = '';
}
