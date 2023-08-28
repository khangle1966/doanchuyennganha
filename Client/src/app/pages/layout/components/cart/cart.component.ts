import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent {
  
  constructor(private router:Router){}
  
  backhome(){
    this.router.navigate(['/base/home']);
  }

  search = '';
  
  buyButton() {
    alert("Buy Success");
}
}
