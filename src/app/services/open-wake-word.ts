import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenWakeWord {
  check(audio: Blob): Observable<boolean> {
    //TODO manda al backend
    return of(true).pipe(delay(500));
  }
}
