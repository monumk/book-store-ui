import 'zone.js/node';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient } from '@angular/common/http';

export default function bootstrap(context: any) {
  return bootstrapApplication(
    App,
    {
      providers: [
        provideServerRendering(),
        provideHttpClient()
      ]
    },
    context
  );
}