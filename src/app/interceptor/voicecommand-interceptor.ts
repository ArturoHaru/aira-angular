import { HttpClient, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';
import { delay, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Si attiva solo in development
 * @param req
 * @param next
 * @returns
 */
export const voicecommandInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes(environment.interactionEndpoint) && req.method === 'POST') {
    console.log('Intercettata chiamata audio. Generando risposta fake.');

    const http = inject(HttpClient);

    return http.get('test.mp3', { responseType: 'blob' }).pipe(
      // Simulo un po' di ritardo del server
      delay(1000),
      switchMap((audioBlob) => {
        return of(
          new HttpResponse({
            status: 200,
            body: audioBlob,
          }),
        );
      }),
    );
  }

  return next(req);
};
