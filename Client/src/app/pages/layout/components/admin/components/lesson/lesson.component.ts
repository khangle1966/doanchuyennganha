import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/Lesson.model';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.less'],
})
export class LessonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  lessonList: Lesson[] = [
    {
      _id: '1',
      title: 'Lesson ' + Date.now().toString(),
      content: 'Lesson ' + Date.now().toString() + ' content',
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
}
