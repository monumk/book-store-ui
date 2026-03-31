import { Routes } from '@angular/router';
import { FavouriteBooks } from './favourite-books/favourite-books';

export const routes: Routes = [
    
{ path: '', redirectTo: 'favourite-books', pathMatch: 'full' },
  { path: 'favourite-books', component: FavouriteBooks },

];
