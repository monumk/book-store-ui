import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(App, {
  providers: [
    // provideServerRendering(),
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));