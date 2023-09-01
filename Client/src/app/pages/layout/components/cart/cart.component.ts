import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/models/Course.model';
import { CartState } from 'src/app/ngrx/states/cart.state';
import * as CartAction from 'src/app/ngrx/actions/cart.actions'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit { 

  cartList$ = this.store.select((state) => state.cart.cartList)
  // cartList: Course[]=[]
  total$ = this.store.select((state) => state.cart.total)
  constructor(private router:Router,private store: Store<{cart: CartState}>){
    console.log('chay chua')
    console.log(this.cartList$)

  }
  ngOnInit(): void {
    this.cartList$.subscribe((cartList)=>{
      console.log(cartList)
      
    })
  }


  addCourseToCart(course: Course){
    this.store.dispatch(CartAction.addCourseToCart({course}))
  }
  removeCourseFromCart(course: Course){
    this.store.dispatch(CartAction.removeCourseFromCart({course}))
  }
  clearAllCart(){
    this.store.dispatch(CartAction.clearAllCart()) 
  }

  


  backhome(){
    this.router.navigate(['/base/home']);
  }

  search = '';
  
  buyButton() {
    alert("Buy Success");
}
}
