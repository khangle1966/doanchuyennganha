import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.less'],
})
export class LearningComponent {
  constructor(private router: Router) {}

  backhome() {
    this.router.navigate(['/base/home']);
  }
  search = '';
}
