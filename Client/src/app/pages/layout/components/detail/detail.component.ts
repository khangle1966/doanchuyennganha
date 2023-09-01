import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class DetailComponent {
  constructor(private router: Router) {}

  backhome() {
    this.router.navigate(['/base/home']);
  }
  backcourse() {
    this.router.navigate(['/base/browse']);
  }

  rateControl = new FormControl(2);
  rateValue = 2;
  enableOrDisable(): void {
    if (this.rateControl.disabled) {
      this.rateControl.enable();
    } else {
      this.rateControl.disable();
    }
  }
  search = '';
}
