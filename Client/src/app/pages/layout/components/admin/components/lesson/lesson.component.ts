import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/Lesson.model';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.less'],
})
export class LessonComponent implements OnInit {
  isPreview: boolean = true;
  isSave: boolean = false;

  constructor() {}

  generateDummyContent(lessonTitle: string) {
    let dummyContent = {
      ops: [
        { insert: `${lessonTitle} content` },
        { attributes: { header: 3 }, insert: '\n' },
        { insert: '\n' },
      ],
    };
    return JSON.stringify(dummyContent);
  }

  ngOnInit(): void {}

  lessonList: Lesson[] = [
    {
      _id: '1',
      title: 'Lesson ' + Date.now().toString(),
      content: this.generateDummyContent('Lesson ' + Date.now().toString()),
      imageUrl: '../../../../../../../assets/images/lisa.jpg',
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
      content: 'Lesson ' + Date.now().toString() + ' content',
      imageUrl: '../../../../../../../assets/images/lisa.jpg',
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    });
  }

  selectLesson(lesson: Lesson) {
    this.selectedLesson = lesson;
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
    console.log('lesonList: ', this.lessonList);
  }

  saveLessonContent() {
    this.isSave = true;
  }

  updateLessonContent(content: string) {
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
      console.log('lesonList: ', this.lessonList);
    }
  }
}
