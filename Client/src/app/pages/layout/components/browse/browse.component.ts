import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.less']
})
export class BrowseComponent {
  
  constructor(private router:Router){}
  description(id:string){
    this.router.navigate([`/base/browse/detail/${id}`]);
   }
  backhome(){
    this.router.navigate(['/base/home']);

  }
  
  course = [
  {
    _id:'123',
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
  {
    _id:'456',
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
  {
    _id:'678',
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
  {
    _id:'346',
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
  {
    _id:'120',
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
  {
    _id:'121',
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
    {
      _id:'133',
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
  {
    _id:'153',
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
  {
    _id:'173',
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
  {
    _id:'1223',
    nameCourse: 'Front-End',
    categoryCourse: 'Web Developer',
    imgUrl: '../../../../../assets/images/webdev.jpg'
  },
  
]
   
  search = '';
}
