import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.less']
})
export class CourseComponent {

  constructor(private router: Router) {}
  
  backhome(){
    this.router.navigate(['/base/home']);

  }
}
