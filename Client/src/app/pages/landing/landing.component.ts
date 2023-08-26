import { Component, Inject, OnInit } from '@angular/core';
import { TUI_IS_CYPRESS } from '@taiga-ui/cdk';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent implements OnInit {
  counter: number = 1;

  ngOnInit(): void{
    this.startImageSlider();
  
  }

  startImageSlider() {
    setInterval(() => {
      const imgElement = document.getElementById('img' + this.counter) as HTMLInputElement;
      if (imgElement) {
          imgElement.checked = true;
      }
      
      this.counter++;

      if (this.counter > 4) {
          this.counter = 1;
      }
    }, 4000);
  }
  constructor(@Inject(TUI_IS_CYPRESS) readonly isCypress: boolean) {}
 
    onClick(event: MouseEvent): void {
        console.info('click ', event);
    }
}
