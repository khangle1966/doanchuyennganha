import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { CourseState } from 'src/app/ngrx/states/course.state';
import * as CourseAction from 'src/app/ngrx/actions/course.actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class DetailComponent implements OnInit {
  // courseDetail$!: Observable<Course>;
  //lưu ý thằng dưới !!!!
  courseDetail$: Observable<Course> = this.store.select(
    'course',
    'courseDetail'
  );
  idToken$: Observable<string> = this.store.select('auth', 'idToken');

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private store: Store<{ course: CourseState; auth: AuthState }>
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.idToken$.subscribe((value) => {
          if (value) {
            this.store.dispatch(
              CourseAction.getCourseDetail({ idToken: value, id })
            );
          }
          console.log(id);
        });
      }
    });
  }

  backhome() {
    this.router.navigate(['/base/home']);
  }
  backcourse() {
    this.router.navigate(['/base/browse']);
  }

  rateControl = new FormControl(2);
  rateValue = 2;
  enableOrDisable(): void {
    if (this.rateControl.disabled) {
      this.rateControl.enable();
    } else {
      this.rateControl.disable();
    }
  }
  search = '';
}
