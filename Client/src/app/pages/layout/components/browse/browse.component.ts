import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/Course.model';
import { Store } from '@ngrx/store';
import { CourseState } from 'src/app/ngrx/states/course.state';
import * as CourseAction from 'src/app/ngrx/actions/course.actions';
import * as CartAction from 'src/app/ngrx/actions/cart.actions';
import { CartState } from 'src/app/ngrx/states/cart.state';
import { TuiAlertService } from '@taiga-ui/core';
import { Cart } from 'src/app/models/Cart.model';
import { AuthState } from 'src/app/ngrx/states/auth.state';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.less'],
})
export class BrowseComponent implements OnInit {
  courseList$: Observable<Course[]> = this.store.select('course', 'courseList');
  cartList$ = this.store.select('cart', 'cartList');
  cartList: Course[] = [];
  idToken$: Observable<string> = this.store.select('idToken', 'idToken');

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private router: Router,
    private store: Store<{
      course: CourseState;
      cart: CartState;
      idToken: AuthState;
    }>
  ) {
    this.idToken$.subscribe((value) => {
      console.log(value);

      if (value) {
        console.log('làm đúng r' + value);
        this.store.dispatch(CourseAction.get({ idToken: value }));
      }
    });
    this.courseList$.subscribe((item) => {
      console.log(item);
    });
  }
  ngOnInit(): void {
    this.cartList$.subscribe((cartList) => {
      if (cartList != undefined) {
        this.cartList = cartList;
        console.log(this.cartList);
      }
    });
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

  // courseList = [
  //   {
  //     _id: '123',
  //     name: 'Front-End',
  //     category: 'Web Developer',
  //     img: '../../../../../assets/images/webdev.jpg',
  //     author: '',
  //     rating: 345,
  //     language: '',
  //     date_Created: '',
  //     date_Updated: '',
  //     description: '',
  //     price: 321,
  //   },
  //   {
  //     _id: '678',
  //     name: 'Ielts',
  //     category: 'English',
  //     img: '../../../../../assets/images/webdev.jpg',
  //     author: '',
  //     rating: 345,
  //     language: '',
  //     date_Created: '',
  //     date_Updated: '',
  //     description: '',
  //     price: 456,
  //   },
  // ];

  search = '';
}
