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
  private serverURL = `${environment.serverUrl}speaches/tanscribe`;

  constructor(private http: HttpClient) {}

  speechToText(audio: Blob) {
    const formData = new FormData();

    formData.append('file', audio);
    formData.append('model', 'kp-forks/faster-whisper-small');
    let transcription = this.http.post<string>(this.serverURL, formData);

    return transcription;
  }
}
