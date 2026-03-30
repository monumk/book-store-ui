import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  signupForm:any;
  showSignup:boolean = false;
  constructor(
    private serivce: BookService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.initForm();
    this.getBooksList();
  }
  protected readonly title = signal('book-store-ui');


  initForm(){
    this.signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
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
   this.showSignup = true;
}

getBooksList(){
  this.serivce.getBooksList({}).subscribe((res:any)=>{
    this.books = res.list;
    this.cdr.detectChanges();
  })
}

 closeSignup() {
    this.showSignup = false;
  }

   onSignup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      // 🔥 Call API here
      this.closeSignup();
    }
  }
}
