import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    // provideServerRendering(),
    provideHttpClient()
  ]
}).catch(err => console.error(err));