import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/lesson.model';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiDialogService,
} from '@taiga-ui/core';
import { Router } from '@angular/router';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Course } from 'src/app/models/course.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { CourseState } from 'src/app/ngrx/states/course.state';
import { LessonState } from 'src/app/ngrx/states/lesson.state';
import * as LessonActions from 'src/app/ngrx/actions/lesson.actions';
import * as CourseActions from 'src/app/ngrx/actions/course.actions';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.less'],
})
export class LessonComponent implements OnInit, OnDestroy {
  isPreview: boolean = true;
  isSave: boolean = false;
  isGettingCourse: boolean = false;
  isGettingLessons: boolean = false;

  subscriptions: Subscription[] = [];
  items = [
    {
      caption: 'Admin',
      routerLink: '/base/admin',
    },
  ];

  course: Course = <Course>{};
  idToken = '';

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private router: Router,
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private store: Store<{
      auth: AuthState;
      course: CourseState;
      lesson: LessonState;
    }>
  ) {
    this.items.push({
      caption: 'Current',
      routerLink: this.router.url,
    });
  }
  ngOnDestroy(): void {
    console.log('destroy');
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        if (idToken != '' && idToken != null && idToken != undefined) {
          this.idToken = idToken;
          console.log(`lesson's course id: `, this.router.url.split('/')[4]);
          this.store.dispatch(
            LessonActions.getAllByCourseId({
              idToken,
              courseId: this.router.url.split('/')[4],
            })
          );
          this.store.dispatch(
            CourseActions.getCourseDetail({
              idToken,
              id: this.router.url.split('/')[4],
            })
          );
        }
      }),
      this.store.select('course', 'courseDetail').subscribe((course) => {
        if (course != null && course != undefined) {
          this.course = course;
        }
      }),
      this.store.select('course', 'isSuccess').subscribe((val) => {
        if (val) {
          this.alerts
            .open('Get course detail success !!!', { status: 'success' })
            .subscribe();
        }
      }),
      this.store.select('course', 'error').subscribe((err) => {
        if (err != null && err != undefined && err != '') {
          this.alerts.open(err, { status: 'error' }).subscribe();
        }
      }),
      this.store.select('lesson', 'lessons').subscribe((lessons) => {
        if (lessons != null && lessons != undefined) {
          this.lessonList = lessons;
          console.log(this.lessonList);
        }
      }),
      this.store.select('lesson', 'isGetSuccess').subscribe((val) => {
        if (val) {
          this.alerts
            .open('Get lesson success !!!', { status: 'success' })
            .subscribe();
        }
      }),
      this.store.select('lesson', 'getMessError').subscribe((err) => {
        if (err != null && err != undefined && err != '') {
          this.alerts.open(err, { status: 'error' }).subscribe();
        }
      })
    );
  }

  // get func
  selectedLesson: Lesson | null = null;
  selectLesson(lesson: Lesson) {
    if (this.selectedLesson?._id === lesson._id) {
      this.alerts
        .open('Lesson already selected !!!', { status: 'warning' })
        .subscribe();
      return;
    }
    this.selectedLesson = lesson;
    this.isPreview = true;
    // console.log('selectedLesson: ', this.selectedLesson);
  }
  generateDummyContent(lessonTitle: string) {
    let dummyContent = `<p>${lessonTitle} content </p>`;
    return JSON.stringify(dummyContent);
  }

  //add func
  lessonList: Lesson[] = [];
  addLesson() {
    this.lessonList = [
      ...this.lessonList,
      {
        _id: Date.now().toString(),
        title: 'Lesson ' + Date.now().toString(),
        content: this.generateDummyContent('Lesson ' + Date.now().toString()),
        courseId: '1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ordinalNum: this.lessonList.length + 1,
      },
    ];
  }

  //update func
  openEdit = false;
  openEditSidebar(open: boolean): void {
    if (open != this.openEdit) {
      this.openEdit = open;
    }
  }

  updateLessonInfo($event: Lesson) {
    this.lessonList = this.lessonList.map((lesson) => {
      if (lesson._id === $event._id) {
        return $event;
      } else {
        return lesson;
      }
    });
    this.alerts
      .open('Lesson info updated success !!!', { status: 'success' })
      .subscribe();
    console.log('lesonList: ', this.lessonList);
  }

  saveLessonContent() {
    this.isSave = true;
    setInterval(() => {
      this.isSave = false;
    }, 2000);
  }

  updateLessonContent(content: string) {
    console.log(JSON.parse(content));
    if (this.selectedLesson != null) {
      this.lessonList = this.lessonList.map((lesson) => {
        if (lesson._id === this.selectedLesson?._id) {
          return {
            ...lesson,
            content: content,
          };
        } else {
          return lesson;
        }
      });
      this.alerts
        .open('Lesson content updated success !!!', { status: 'success' })
        .subscribe();
      console.log('lesonList: ', this.lessonList);
    }
  }

  //delete func
  showWarningDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content).subscribe();
  }

  deleteLesson(index: number) {
    this.lessonList = this.lessonList.filter((val, i) => {
      if (index != i) {
        return val;
      } else {
        if (this.selectedLesson != null) {
          if (val._id == this.selectedLesson._id) {
            this.selectedLesson = null;
          }
        }
        return;
      }
    });
    this.alerts
      .open('Delete question success !!!', { status: 'success' })
      .subscribe();
    console.log(this.lessonList);
  }

  //update lesson ordinal num
  order = new Map();
  updateOrdinalList() {
    console.log('order change: ', this.order);
    this.order.forEach((val, i) => {
      this.lessonList[i].ordinalNum = val;
    });
    console.log(this.lessonList);
  }
}
