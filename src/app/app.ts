import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BookService } from '../services/book.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
    imports: [ReactiveFormsModule, FormsModule, CommonModule], // ✅ HERE

})
export class App {

  books:any = [];
  constructor(
    private serivce: BookService,
    private cdr: ChangeDetectorRef
  ){

  }

  ngOnInit(): void {
    this.getBooksList();
  }
  protected readonly title = signal('book-store-ui');

// filteredBooks = [...this.books];
searchTerm = '';
// categories = ['Self Help', 'Finance', 'Programming', 'Fiction'];
// selectedCategory = 'All';

filterBooks() {
  this.applyFilters();
}

filterByCategory(category: string) {
  // this.selectedCategory = category;
  this.applyFilters();
}

applyFilters() {
  // const term = this.searchTerm.toLowerCase();

  // this.filteredBooks = this.books.filter((book:any) => {
  //   const matchesSearch =
  //     book.title.toLowerCase().includes(term) ||
  //     book.author.toLowerCase().includes(term);

  //   const matchesCategory =
  //     this.selectedCategory === 'All' ||
  //     book.category === this.selectedCategory;

  //   return matchesSearch && matchesCategory;
  // });
}

openLogin() {
  console.log('Login modal');
}

openSignup() {
  console.log('Signup modal');
}

getBooksList(){
  this.serivce.getBooksList({}).subscribe((res:any)=>{
    this.books = res.list;
    this.cdr.detectChanges();
  })
}
}
