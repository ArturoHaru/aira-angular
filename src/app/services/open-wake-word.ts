import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenWakeWord {
  wakewordEndpoint = `${environment.serverUrl}${environment.openwakewordEndpoint}`;

  constructor(private http: HttpClient) {}

  check(audio: Blob): Observable<{ wakeword_detected: boolean }> {
    const formdata = new FormData();
    formdata.append('audio', audio);
    return this.http.post<{ wakeword_detected: boolean }>(this.wakewordEndpoint, formdata);
  }
}
