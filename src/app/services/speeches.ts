import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Defines the structure for the text-to-speech request body.
 */
export interface SpeechesRequestBody {
  input: string;
  model: string;
  voice: string;
  response_format?: 'mp3' | 'wav';
  speed?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SpeechesService {

  private apiUrl = 'http://localhost:8000/v1/audio/speech';

  constructor(private http: HttpClient) { }

  /**
   * Sends text to the Speaches server for TTS and returns the audio as a Blob.
   * @param requestBody The request object containing the text, model, and voice.
   * @returns An Observable that emits a Blob with the audio data.
   */
  textToSpeech(requestBody: SpeechesRequestBody): Observable<Blob> {
    // Default to mp3 if no format is specified
    const body: SpeechesRequestBody = {
      response_format: 'mp3',
      ...requestBody,
    };

    return this.http.post(this.apiUrl, body, {
      responseType: 'blob'
    });
  }
}
