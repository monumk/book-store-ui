import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-book-detail',
  imports: [],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})
export class BookDetail {

  book:any;
  bookId:any;
  currentUser:any;
  constructor(
    private service: BookService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ){ }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let user = localStorage.getItem('user');

      if(user){
        this.currentUser = JSON.parse(user);
      }
    }
  this.bookId = this.route.snapshot.paramMap.get('id');
  if(this.bookId){
    this.getBookDetails(this.bookId);
  }
}

  getBookDetails(id:any){
    this.service.getBook(id).subscribe((res:any)=>{
      this.book = res.data;
      this.cdr.detectChanges();
    })
  }

  addToCart(){
     let payload = {
           userId: this.currentUser?.id,
           bookId: this.bookId
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
