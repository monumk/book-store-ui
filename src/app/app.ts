import { Component } from '@angular/core';
import { Header } from './common/shared';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Header,Footer, RouterOutlet], // ✅ HERE

})
export class App {

}
