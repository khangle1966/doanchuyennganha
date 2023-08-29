import { ChangeDetectionStrategy,Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import {TuiBooleanHandler} from '@taiga-ui/cdk';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  search = '';
  open = false;
 
  onClick(): void {
      this.open = !this.open;
  }

  onObscured(obscured: boolean): void {
      if (obscured) {
          this.open = false;
      }
  }

  onActiveZone(active: boolean): void {
      this.open = active && this.open;
  }

  course=[
    {
      id:'',
      name:'Phát triển Web',
      category:'Web Development',
      imgURL:'../../.././../../assets/images/Picture.png',
    },
    {
      id:'',
      name:'Phát triển Web',
      category:'Web Development',
      imgURL:'../../.././../../assets/images/Picture.png',
    },
    {
      id:'',
      name:'Phát triển Web',
      category:'Web Development',
      imgURL:'../../.././../../assets/images/Picture.png',
    },
    {
      id:'',
      name:'Phát triển Web',
      category:'Web Development',
      imgURL:'../../.././../../assets/images/Picture.png',
    },
    {
      id:'',
      name:'Phát triển Web',
      category:'Web Development',
      imgURL:'../../.././../../assets/images/Picture.png',
    },
    {
      id:'',
      name:'Phát triển Web',
      category:'Web Development',
      imgURL:'../../.././../../assets/images/Picture.png',
    },
    {
      id:'',
      name:'Phát triển Web',
      category:'Web Development',
      imgURL:'../../.././../../assets/images/Picture.png',
    },
    {
      id:'',
      name:'Phát triển Web',
      category:'Web Development',
      imgURL:'../../.././../../assets/images/Picture.png',
    },
    {
      id:'',
      name:'Phát triển Web',
      category:'Web Development',
      imgURL:'../../.././../../assets/images/Picture.png',
    },
    {
      id:'',
      name:'Phát triển Web',
      category:'Web Development',
      imgURL:'../../.././../../assets/images/Picture.png',
    }
  ];

  
  // items = [
  //     'Chưa học',
  //     'Đã học',
  //     'Đã học xong',
  // ];

  readonly testForm = new FormGroup({
    testValue: new FormControl('orange'),
  });

  readonly courses = ['Chưa học', 'Đang học', 'Đã học xong'];

  constructor(private router:Router) {}
  toEdit(){
    this.router.navigate(['/base/profile']);
  }

} 


  
  

