import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Llm {
  //questa classe definisce l'interazione con il server llm
  constructor(private http: HttpClient) {}
  serverUrl = environment.serverUrl;
  apiLMM = this.serverUrl + 'lmstudio/answer';

  //manda un prompt singolo alla llm
  async sendPrompt(prompt: string) {
    console.log('entrato in sendPrompt');

    return this.http.post<{ content: string }>(this.apiLMM, {
      prompt: prompt,
    });
  }
}
