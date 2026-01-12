import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Llm {
  serverUrl = environment.serverUrl + 'lmstudio/';
  apiAnswer = this.serverUrl + 'answer';

  constructor(private http: HttpClient) {}

  getAnswer(prompt: string): Observable<{ content: string }> {
    let answer: string = '';
    return this.http.get<{ content: string }>(this.apiAnswer, {
      params: {
        prompt: prompt,
      },
    });
  }
}
