import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../services/book.service';
import Swal from 'sweetalert2';

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
    private cdr: ChangeDetectorRef
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

  decreaseQty(e: any) {

  }

  increaseQty(item: any) {
    let payload = {
      userId: this.currentUser?.id,
      bookId: item?.bookId
    }
    this.service.addCartItem(payload).subscribe((res: any) => {
      this.getCart(this.currentUser?.id)
      Swal.fire({
        title: "Success",
        html: res?.msg,
        icon: "success",
        confirmButtonColor: "#3e70cb",
      })
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
      this.cdr.detectChanges();
    })
  }
}
