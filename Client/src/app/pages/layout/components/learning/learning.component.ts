import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TuiAlertService } from '@taiga-ui/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Lesson } from 'src/app/models/lesson.model';
import { LessonState } from 'src/app/ngrx/states/lesson.state';
import * as LessonAction from 'src/app/ngrx/actions/lesson.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { CourseState } from 'src/app/ngrx/states/course.state';
import * as CourseAction from 'src/app/ngrx/actions/course.actions'
import { Course } from 'src/app/models/course.model';


@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.less'],
})
export class LearningComponent implements OnInit, OnDestroy {
  isPreview: boolean = true;


  subscriptions: Subscription[] = [];
  lesson: Lesson[] = <Lesson[]>{};
  course: Course = <Course>{};
  idToken = '';

  constructor(
    private router: Router,
    private store: Store<{
      lesson: LessonState;
      auth: AuthState;
      course: CourseState
    }>,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService
  ) {}

  warningNotification(message: string): void {
    this.alerts
      .open('', {
        label: message,
        status: 'warning',
        autoClose: 4000,
      })
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((val) => {
      val.unsubscribe();
    });
  }
  ngOnInit(): void {
    this.subscriptions.push(
    this.store.select('auth', 'idToken').subscribe((idToken) => {
      if (idToken != '' && idToken != null && idToken != undefined) {
        this.idToken = idToken;
        console.log(`lesson's course id: `, this.router.url.split('/')[4]);
        this.store.dispatch(
          LessonAction.getAllByCourseId({
            idToken,
            courseId: this.router.url.split('/')[4],
          })
        );
        this.store.dispatch(
          CourseAction.getCourseDetail({
            idToken,
            id: this.router.url.split('/')[4],
          })
        );
        this.store.select('lesson', 'lessons').subscribe((lessons) => {
          if (lessons != null && lessons != undefined) {
            // this.lessonList = lessons;
            console.log(this.lesson);
          }
        })

      }
    }),
    ),
    this.store.select('lesson', 'isGetSuccess').subscribe((val) => {
      if (val) {
        this.alerts
          .open('Get lesson success !!!', { status: 'success' })
          .subscribe();
      }
    }
    )


  }


  selectedLesson: Lesson | null = null;
  selectLesson(lesson: Lesson) {
    if (this.selectedLesson?._id === lesson._id) {
      this.warningNotification('Lesson already selected !!!');
      return;
    }
    this.selectedLesson = lesson;
    this.isPreview = true;
  }

  backhome() {
    this.router.navigate(['/base/home']);
  }
  search = '';
}
