import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TuiAlertService } from '@taiga-ui/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Lesson } from 'src/app/models/lesson.model';
import { LessonState } from 'src/app/ngrx/states/lessos.state';
import * as LessonAction from 'src/app/ngrx/actions/lesson.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.less'],
})
export class LearningComponent implements OnInit, OnDestroy {
  isPreview: boolean = true;

  idToken$: Observable<string> = this.store.select('auth', 'idToken');
  lesson$: Observable<Lesson> = this.store.select('lesson', 'lessons');
  subscriptions: Subscription[] = [];

  learnForm = new FormGroup({
    _id: new FormControl('', Validators.required),
    courseId: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    ordinalNum: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
    ]),
  });

  constructor(
    private router: Router,
    private store: Store<{
      lesson: LessonState;
      auth: AuthState;
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
      this.store.select('lesson', 'lessons').subscribe((val) => {
        if (val != null && val != undefined) {
          this.learnForm.controls._id.setValue(val._id);
          this.learnForm.controls.courseId.setValue(val.courseId);
          this.learnForm.controls.title.setValue(val.title);
          this.learnForm.controls.content.setValue(val.content);
          this.learnForm.controls.description.setValue(val.description);
          this.learnForm.controls.ordinalNum.setValue(val.ordinalNum);
        }
      }),
      this.lesson$.subscribe((lesson) => {
        if (lesson != null && lesson != undefined) {
          console.log(lesson);
        }
      }),

      combineLatest({
        idToken: this.idToken$,
        lesson: this.lesson$,
      }).subscribe((res) => {
        if (
          res.idToken != undefined &&
          res.idToken != null &&
          res.idToken != '' &&
          res.lesson != null &&
          res.lesson != undefined
        ) {
          console.log(res.idToken);
          this.store.dispatch(
            LessonAction.getAllByCourseId({
              idToken: res.idToken,
              courseId: res.lesson.courseId,
            })
          );
        }
      })
    );
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
