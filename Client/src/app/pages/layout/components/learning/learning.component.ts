import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TuiAlertService } from '@taiga-ui/core';
import { Subscription } from 'rxjs';
import { Lesson } from 'src/app/models/Lesson.model';
import { LessonState } from 'src/app/ngrx/states/lessos.state';
import * as LessonAction from 'src/app/ngrx/actions/lesson.actions';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.less']
})
export class LearningComponent implements OnInit, OnDestroy {
  isPreview: boolean = true;

  idToken = '';
  subscriptions: Subscription[] = [];

  regisForm = new FormGroup ({
    _id: new FormControl('', Validators.required),
    title: new FormControl({ value: '', disabled: true }, Validators.required),
    content: new FormControl({ value: '', disabled: true }, Validators.required),
    description: new FormControl({ value: '', disabled: true }, Validators.required),
  })

  constructor(
    private router: Router,
    private store: Store<{
      lesson : LessonState
    }>,

    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,

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
      this.store.select('lesson').subscribe((lessonState) => {
        if (lessonState.isSuccess) {
          this.regisForm.controls.title.setValue(lessonState.lessons[0].title); 
          this.regisForm.controls.content.setValue(lessonState.lessons[0].content);
          this.regisForm.controls.description.setValue(lessonState.lessons[0].description);
        }else {

          this.warningNotification(lessonState.error);
        }
      })
    )
  }

  register() {
    let regisData: Lesson = {
      _id: this.regisForm.value._id ?? '',
      title: this.regisForm.value.title ?? '',
      content: this.regisForm.value.content ?? '',
      description: this.regisForm.value.description ?? '',
      courseId: '',
      ordinalNum: 0,
    }

    // this.store.dispatch(
    //   LessonAction.getLesson({
    //     _id: regisData,
    //     idToken: this.idToken,
    //   })
    // );
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



}