import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, signal, PLATFORM_ID, Inject  } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { BookService } from '../services/book.service';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'home-root',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule, MatButtonModule],

})
export class Home {

  books: any = [];
  currentUser:any;
  constructor(
    private serivce: BookService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

  }

  ngOnInit(): void {
    

     if (isPlatformBrowser(this.platformId)) {
      let user = localStorage.getItem('user');

      if(user){
        this.currentUser = JSON.parse(user)
      }
    }
    this.getBooksList();
  }
  protected readonly title = signal('book-store-ui');
  searchTerm = '';

  getBooksList() {
    this.serivce.getBooksList({page: 1, limit: 20}).subscribe((res: any) => {
      this.books = res.list;
      this.cdr.detectChanges();
    })
  }

  async addFavourite(isFavourite:any, bookId:any){
    await this.checkUserLogin();
    let payload = {
      "userId": this.currentUser?.id,
      "bookId": bookId
    }
    this.serivce.addFavouriteBook(payload).subscribe((res:any)=>{
      isFavourite = !isFavourite;
      this.cdr.detectChanges();
      this.getBooksList();
    })
  }

  async removeFavourite(isFavourite:any, bookId:any){
    await this.checkUserLogin();
    let payload = {
      "userId": this.currentUser?.id,
      "bookId": bookId
    }
    this.serivce.removeFavouriteBook(payload).subscribe((res:any)=>{
      isFavourite = !isFavourite;
      this.cdr.detectChanges();
      this.getBooksList();
    })
  }

  async checkUserLogin(){
    if(!this.currentUser){
      Swal.fire({
          title: "Warning",
          html: "Please login!!",
          icon: "info",
          confirmButtonColor: "#3e70cb",
        })
      return 
    }
  }

  addToCart(bookId:any){
    let payload = {
      userId: this.currentUser?.id,
      bookId: bookId
    }
    this.serivce.addCartItem(payload).subscribe((res:any)=>{
      Swal.fire({
          title: "Success",
          html: res?.msg,
          icon: "success",
          confirmButtonColor: "#3e70cb",
        })
    })
  }
}
