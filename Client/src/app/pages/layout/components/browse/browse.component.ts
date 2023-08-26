import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.less']
})
export class BrowseComponent {
  
  constructor(private router:Router){}
  description(){
    // this.router.navigate(['/detailcourse']);
   }
  backhome(){
    this.router.navigate(['/base/home']);

  }
  
  course = [
  {
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
  {
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
  {
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
  {
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
  {
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
  {
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
    {
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
]
   
  search = '';
}
