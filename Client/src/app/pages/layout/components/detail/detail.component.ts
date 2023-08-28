import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent {
  constructor(private router:Router){}
  
  backhome(){
    this.router.navigate(['/base/home']);

  }
  backcourse(){
    this.router.navigate(['/base/browse']);

  }
  search = '';
}
