import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
/**
 * Defines the structure for the text-to-speech request body.
 */

@Injectable({
  providedIn: 'root',
})
export class SpeechesService {
  private serverURL = `${environment.serverUrl}${environment.transcriptionEndpoint}`;

  constructor(private http: HttpClient) {}

  async speechToText(audio: Blob) {
    const formData = new FormData();
    formData.append('file', audio);
    formData.append('model', environment.transcriptionModel);

    return this.http.post<{ text: string }>(this.serverURL, formData);
  }
}
