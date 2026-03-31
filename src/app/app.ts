import { Component } from '@angular/core';
import { Header } from './common/shared';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Header, RouterOutlet], // ✅ HERE

})
export class App {

}
