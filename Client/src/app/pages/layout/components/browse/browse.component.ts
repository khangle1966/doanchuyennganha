import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/Course.model';
import { Store } from '@ngrx/store';
import { CourseState } from 'src/app/ngrx/states/course.state';
import * as CourseAction from 'src/app/ngrx/actions/course.actions'

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.less']
})
export class BrowseComponent {
  
  courseList$: Observable<Course[]> = this.store.select('course','courseList')
  constructor(private router:Router, private store: Store<{course: CourseState}>){
    this.store.dispatch(CourseAction.get());
    this.courseList$.subscribe((course)=>{
      console.log(course);
    })
  }



  description(id:string){
    this.router.navigate([`/base/browse/detail/${id}`]);
   }
  backhome(){
    this.router.navigate(['/base/home']);

  }
  


//   course = [
//   {
//     _id:'123',
//     nameCourse: 'Front-End',
//     categoryCourse: 'Web Developer',
//     imgUrl: '../../../../../assets/images/webdev.jpg'
//   },
//   {
//     _id:'456',
//     nameCourse: 'Front-End',
//     categoryCourse: 'Web Developer',
//     imgUrl: '../../../../../assets/images/webdev.jpg'
//   },
//   {
//     _id:'678',
//     nameCourse: 'Front-End',
//     categoryCourse: 'Web Developer',
//     imgUrl: '../../../../../assets/images/webdev.jpg'
//   },
//   {
//     _id:'346',
//     nameCourse: 'Front-End',
//     categoryCourse: 'Web Developer',
//     imgUrl: '../../../../../assets/images/webdev.jpg'
//   },
  
// ]
   
  search = '';
}
