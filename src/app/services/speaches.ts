import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import OpenAI from 'openai';
import { Audio } from 'openai/resources.js';

/**
 * Defines the structure for the text-to-speech request body.
 */

@Injectable({
  providedIn: 'root',
})
export class SpeechesService {
  private serverURL = 'http://localhost:9000/api/speaches/tanscribe';

  constructor(private http: HttpClient) {}

  speechToText(audio: Blob) {
    const formData = new FormData();

    formData.append('file', audio);
    formData.append('model', 'kp-forks/faster-whisper-small');
    let transcription = this.http.post<string>(this.serverURL, formData);

    // let transcription = this.client.audio.transcriptions.create({
    //   model: 'kp-forks/faster-whisper-small',
    //   file: audio,
    // });

    return transcription;
  }
}
