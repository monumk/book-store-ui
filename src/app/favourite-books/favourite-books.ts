import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { BookService } from '../services/book.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favourite-books',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './favourite-books.html',
  styleUrl: './favourite-books.scss'
})
export class FavouriteBooks {

  currentUser:any;
  books:any = [];
  constructor(
    private service: BookService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ){ }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let user = localStorage.getItem('user');

      if(user){
        this.currentUser = JSON.parse(user);
        this.getFavouriteBook(this.currentUser?.id)
      }
    }
  }

  getFavouriteBook(id:any){
    this.service.getFavouriteBook({userId: id}).subscribe((res:any)=>{
      this.books = res.list;
      this.cdr.detectChanges();
    })
  }
  
    async removeFavourite(isFavourite:any, bookId:any){
    let payload = {
      "userId": this.currentUser?.id,
      "bookId": bookId
    }
    this.service.removeFavouriteBook(payload).subscribe((res:any)=>{
      isFavourite = !isFavourite;
      this.getFavouriteBook(this.currentUser?.id);
      this.cdr.detectChanges();
    })
  }

  addToCart(bookId:any){
   let payload = {
         userId: this.currentUser?.id,
         bookId: bookId
       }
       this.service.addCartItem(payload).subscribe((res:any)=>{
         Swal.fire({
             title: "Success",
             html: res?.msg,
             icon: "success",
             confirmButtonColor: "#3e70cb",
           })
       })
     }

}
