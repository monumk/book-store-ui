import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {

  totalPrice:any = 0;
  discount:any = 0;
  finalAmount:any = 0;
  cartItems:any = [];
  constructor(){

  }

  decreaseQty(e:any){

  }

  increaseQty(e:any){

  }

  removeItem(e:any){

  }
}
