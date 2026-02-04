import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenWakeWord {
  wakewordEndpoint = environment.openwakewordEndpoint;

  constructor(private http: HttpClient) {}

  check(audio: Blob): Observable<{ wakeWordPresent: boolean }> {
    const formdata = new FormData();
    formdata.append('file', audio);
    return this.http.post<{ wakeWordPresent: boolean }>(this.wakewordEndpoint, formdata);
  }
}
