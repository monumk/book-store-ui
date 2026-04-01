import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../services/book.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {

  totalPrice: any = 0;
  discount: any = 0;
  finalAmount: any = 0;
  currentUser: any;
  cartItems: any = [];
  constructor(
    private service: BookService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let user = localStorage.getItem('user');

      if (user) {
        this.currentUser = JSON.parse(user);
        this.getCart(this.currentUser?.id)
      }
    }
  }

  decreaseQty(item: any) {
    let payload = {
      userId: this.currentUser?.id,
      bookId: item?.bookId
    }
    this.service.decreaseQuantity(payload).subscribe((res: any) => {
      this.getCart(this.currentUser?.id)
    })


  }

  increaseQty(item: any) {
    let payload = {
      userId: this.currentUser?.id,
      bookId: item?.bookId
    }
    this.service.addCartItem(payload).subscribe((res: any) => {
      this.getCart(this.currentUser?.id)
    })

  }

  removeItem(item: any) {
    this.service.removeItem({ itemId: item?._id }).subscribe((res: any) => {
      this.getCart(this.currentUser?.id)
    })
  }

  getCart(id: any) {
    this.service.getCart(id).subscribe((res: any) => {
      this.cartItems = res.list;
      this.totalPrice = 0;
      for(let k of res.list){
          this.totalPrice += k.totalAmount;
      }
      if(res.list?.length<=0){
        this.router.navigate(['/home']);
      }
      this.cdr.detectChanges();
    })
  }
}
