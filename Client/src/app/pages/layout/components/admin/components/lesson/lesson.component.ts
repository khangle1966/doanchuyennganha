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

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.less'],
})
export class LessonComponent implements OnInit, OnDestroy {
  isPreview: boolean = true;
  isSave: boolean = false;

  items = [
    {
      caption: 'Admin',
      routerLink: '/base/admin',
    },
  ];

  course: Course = {
    _id: '1',
    name: 'Angular',
    category: 'Frontend Developer',
    description:
      'Angular is a platform for building mobile and desktop web applications.',
    price: 100,
    author: 'Google',
    date_Created: '2021-07-01',
    date_Updated: '2021-07-01',
    img: 'https://angular.io/assets/images/logos/angular/angular.svg',
    rating: 4.5,
    language: 'English',
  };

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private router: Router,
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService
  ) {
    this.items.push({
      caption: 'Current',
      routerLink: this.router.url,
    });
  }
  ngOnDestroy(): void {
    console.log('destroy');
  }

  //noti funcs
  successNotification(message: string): void {
    this.alerts
      .open('', {
        label: message,
        status: 'success',
        autoClose: 4000,
      })
      .subscribe();
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

  ngOnInit(): void {}

  // get func
  selectedLesson: Lesson | null = null;
  selectLesson(lesson: Lesson) {
    if (this.selectedLesson?._id === lesson._id) {
      this.warningNotification('Lesson already selected !!!');
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
  lessonList: Lesson[] = [
    {
      _id: '1',
      title: 'Lesson ' + Date.now().toString(),
      content: this.generateDummyContent('Lesson ' + Date.now().toString()),
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ordinalNum: 0,
    },
  ];
  addLesson() {
    this.lessonList.push({
      _id: Date.now().toString(),
      title: 'Lesson ' + Date.now().toString(),
      content: this.generateDummyContent('Lesson ' + Date.now().toString()),
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ordinalNum: this.lessonList.length + 1,
    });
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
    this.successNotification('Lesson info updated success !!!');
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
      this.successNotification('Lesson content updated success !!!');
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
    this.successNotification('Delete question success !!!');
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
