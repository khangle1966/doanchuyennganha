import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Course } from 'src/app/models/Course.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
})
export class AdminComponent implements OnInit {
  readonly searchForm = new FormGroup({
    searchValue: new FormControl(''),
  });

  checkboxList = new FormControl('Check');
  courseList: Course[] = [
    {
      _id: '1',
      name: 'Angular',
      category: 'Frontend Developer',
      description:
        'Angular is a platform for building mobile and desktop web applications.',
      price: 100,
      author: 'Google',
      date_Created: '2021-07-01',
      date_Updated: '2021-07-01',
      imageUrl: 'https://angular.io/assets/images/logos/angular/angular.svg',
    },
    {
      _id: '2',
      name: 'React',
      category: 'Frontend Developer',
      description: 'A JavaScript library for building user interfaces',
      price: 100,
      author: 'Facebook',
      date_Created: '2021-07-01',
      date_Updated: '2021-07-01',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png',
    },
    {
      _id: '3',
      name: 'Vue',
      category: 'Frontend Developer',
      description: 'The Progressive JavaScript Framework',
      price: 100,
      author: 'Evan You',
      date_Created: '2021-07-01',
      date_Updated: '2021-07-01',
      imageUrl: 'https://vuejs.org/images/logo.png',
    },
    {
      _id: '4',
      name: 'Svelte',
      category: 'Frontend Developer',
      description: 'Cybernetically enhanced web apps',
      price: 100,
      author: 'Rich Harris',
      date_Created: '2021-07-01',
      date_Updated: '2021-07-01',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png',
    },
    {
      _id: '5',
      name: 'Ember',
      category: 'Frontend Developer',
      description: 'A framework for ambitious web developers',
      price: 100,
      author: 'Yehuda Katz',
      date_Created: '2021-07-01',
      date_Updated: '2021-07-01',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ember-logo.svg/1200px-Ember-logo.svg.png',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  selectCourse: Course | null = null;
  selectEditCourse(course: Course) {
    if (this.selectCourse?._id !== course._id) {
      this.selectCourse = <Course>{ ...course };
      console.log('select courrse', this.selectCourse);
    }
  }

  openEdit = false;
  openEditSidebar(open: boolean): void {
    if (open != this.openEdit) {
      this.openEdit = open;
    }
  }
  openCreate = false;
  openCreateSidebar(open: boolean): void {
    if (open != this.openCreate) {
      this.openCreate = open;
    }
  }

  editLessons($event: boolean) {
    if ($event) {
      this.openEditSidebar($event);
      if (this.selectCourse != null) {
        this.router.navigateByUrl(
          `/base/admin/course/${this.selectCourse._id}`
        );
      }
    }
  }
}
