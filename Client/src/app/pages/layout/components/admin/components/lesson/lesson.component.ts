import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/Lesson.model';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.less'],
})
export class LessonComponent implements OnInit {
  lessonList: Lesson[] = [
    {
      _id: '1',
      title: 'Lesson 1',
      content: 'Lesson 1 content',
      imageUrl: 'https://picsum.photos/200/300',
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      _id: '2',
      title: 'Lesson 2',
      content: 'Lesson 2 content',
      imageUrl: 'https://picsum.photos/200/300',
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      _id: '3',
      title: 'Lesson 3',
      content: 'Lesson 3 content',
      imageUrl: 'https://picsum.photos/200/300',
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      _id: '4',
      title: 'Lesson 4',
      content: 'Lesson 4 content',
      imageUrl: 'https://picsum.photos/200/300',
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      _id: '5',
      title: 'Lesson 5',
      content: 'Lesson 5 content',
      imageUrl: 'https://picsum.photos/200/300',
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      _id: '6',
      title: 'Lesson 6',
      content: 'Lesson 6 content',
      imageUrl: 'https://picsum.photos/200/300',
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      _id: '7',
      title: 'Lesson 7',
      content: 'Lesson 7 content',
      imageUrl: 'https://picsum.photos/200/300',
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      _id: '8',
      title: 'Lesson 8',
      content: 'Lesson 8 content',
      imageUrl: 'https://picsum.photos/200/300',
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      _id: '9',
      title: 'Lesson 9',
      content: 'Lesson 9 content',
      imageUrl: 'https://picsum.photos/200/300',
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      _id: '10',
      title: 'Lesson 10',
      content: 'Lesson 10 content',
      imageUrl: 'https://picsum.photos/200/300',
      courseId: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
