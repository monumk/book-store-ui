import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, signal, PLATFORM_ID, Inject  } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import Swal from 'sweetalert2';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  currentUser:any;
  signupForm: any;
  loginForm: any;
  showLogin:boolean = false;
  showSignup: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private serivce: BookService,
    private cdr: ChangeDetectorRef,
  ){

  }

    ngOnInit(): void {
    

     if (isPlatformBrowser(this.platformId)) {
      let user = localStorage.getItem('user');

      if(user){
        this.currentUser = JSON.parse(user)
      }
    }
    this.initForm();
    this.initLoginForm();
  }

    initForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  initLoginForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }


    openLogin() {
    this.showLogin = true;
    console.log('Login modal');
  }

  openSignup() {
    console.log('Signup modal');
    this.showSignup = true;
  }

  closeSignup() {
    this.showSignup = false;
  }

  onSignup() {
    console.log(this.signupForm.value)
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      // 🔥 Call API here

      let payload = {
        "name": this.signupForm.value.name,
        "email": this.signupForm.value.email,
        "mobile": this.signupForm.value.mobile,
        "password": this.signupForm.value.password
      }

      this.serivce.createUser(payload).subscribe((res: any) => {
        this.signupForm.reset();
        Swal.fire({
          title: "Success",
          html: res?.msg,
          icon: "success",
          confirmButtonColor: "#3e70cb",
        })
        this.closeSignup();
      }, (err) => {
        Swal.fire({
          title: "Warning",
          html: err?.error?.msg,
          icon: "info",
          confirmButtonColor: "#3e70cb",
        })
      })
    }
  }

  switchToSignup(){
    this.showLogin = false;
    this.openSignup();
  }

  closeLogin(){
    this.showLogin = false;
  }

  onLogin(){
    if(this.loginForm.valid){
      let payload = {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }

      this.serivce.loginUser(payload).subscribe((res:any)=>{
        if(res.user){
          this.loginForm.reset();
          this.closeLogin();
          Swal.fire({
            title: "Success",
            html: res?.msg,
            icon: "success",
            confirmButtonColor: "#3e70cb",
          })
          localStorage.setItem("user", JSON.stringify(res.user));
          this.cdr.detectChanges();
        }
      },(err)=>{
        Swal.fire({
          title: "Warning",
          html: err?.error?.msg,
          icon: "info",
          confirmButtonColor: "#3e70cb",
        })
      })
    }
  }

}
