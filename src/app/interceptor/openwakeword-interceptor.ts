import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { delay, of } from 'rxjs';

export const openwakewordInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes(environment.openwakewordEndpoint) && req.method === 'POST') {
    console.log('Intercettata chiamata wakeword. Generando risposta fake.');

    return of(
      new HttpResponse({
        status: 200,
        body: {
          wakeWordPresent: true,
        },
      }),
    ).pipe(delay(1000));
  }

  return next(req);
};
