import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root',
})
export class BookService {

  constructor(
    private http: HttpClient
  ){

  }
  getBooksList(data:any){
    return this.http.post(`${environment.API_URL}book/list`, data)
  }

  createUser(data:any){
    return this.http.post(`${environment.API_URL}user/signup`, data)
  }

  loginUser(data:any){
    return this.http.post(`${environment.API_URL}user/login`, data)
  }

  addFavouriteBook(data:any){
    return this.http.post(`${environment.API_URL}book/addFavouriteBook`, data)
  }

  removeFavouriteBook(data:any){
    return this.http.post(`${environment.API_URL}book/removeFavouriteBook`, data)
  }

  getFavouriteBook(data:any){
    return this.http.post(`${environment.API_URL}book/getFavouriteBooks`, data)
  }

  addCartItem(data:any){
    return this.http.post(`${environment.API_URL}cart/addCartItem`, data)
  }

  getCart(userId:any){
    return this.http.get(`${environment.API_URL}cart/getCartItems/${userId}`)
  }
}
