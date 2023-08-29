import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/Lesson.model';
import Quill from 'quill';
import { TuiAlertService } from '@taiga-ui/core';
import { Router } from '@angular/router';

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

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private router: Router
  ) {
    this.items.push({
      caption: 'Current',
      routerLink: this.router.url,
    });
  }
  ngOnDestroy(): void {
    console.log('destroy');
  }

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

  generateDummyContent(lessonTitle: string) {
    let dummyContent = `<p>${lessonTitle} content </p>`;
    return JSON.stringify(dummyContent);
  }

  ngOnInit(): void {}

  lessonList: Lesson[] = [
    {
      _id: '1',
      title: 'Lesson ' + Date.now().toString(),
      content: this.generateDummyContent('Lesson ' + Date.now().toString()),
      img: '../../../../../../../assets/images/lisa.jpg',
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];

  selectedLesson: Lesson | null = null;

  addLesson() {
    this.lessonList.push({
      _id: Date.now().toString(),
      title: 'Lesson ' + Date.now().toString(),
      content: this.generateDummyContent('Lesson ' + Date.now().toString()),
      img: '../../../../../../../assets/images/lisa.jpg',
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    });
  }

  selectLesson(lesson: Lesson) {
    if (this.selectedLesson?._id === lesson._id) {
      this.warningNotification('Lesson already selected !!!');
      return;
    }
    this.selectedLesson = lesson;
    this.isPreview = true;
    // console.log('selectedLesson: ', this.selectedLesson);
  }

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
}
