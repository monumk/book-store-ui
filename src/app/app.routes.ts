import { Routes } from '@angular/router';
import { FavouriteBooks } from './favourite-books/favourite-books';
import { Home } from './home/home';
import { About } from './about/about';

export const routes: Routes = [
    
{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'favourite-books', component: FavouriteBooks },
  { path: 'home', component: Home },
  { path: 'about-us', component: About },
  

];
