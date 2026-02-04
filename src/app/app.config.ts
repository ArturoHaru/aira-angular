import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';
import { voicecommandInterceptor } from './interceptor/voicecommand-interceptor';
import { openwakewordInterceptor } from './interceptor/openwakeword-interceptor';

const interceptors = [];

if (!environment.production) {
  interceptors.push(voicecommandInterceptor);
  interceptors.push(openwakewordInterceptor);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors(interceptors)),
  ],
};
