import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
/**
 * Defines the structure for the text-to-speech request body.
 * And plays the audio
 */

@Injectable({
  providedIn: 'root',
})
export class VoiceInteraction {
  serverUrl = environment.serverUrl;
  endpointLLM = environment.interactionEndpoint;
  //TODO creare nel backend corrispettivo
  interactionAPI = `${this.serverUrl}${this.endpointLLM}`;

  constructor(private http: HttpClient) {}

  speechToText(audio: Blob) {
    const formData = new FormData();
    formData.append('file', audio);
    formData.append('model', environment.transcriptionModel);

    return this.http.post<{ text: string }>(this.serverUrl, formData);
  }

  /**
   * Sends audio prompt and returns audio answer
   * @param audio
   */
  sendVoiceCommand(audio: Blob) {
    const formData = new FormData();
    formData.append('file', audio);
    formData.append('model', environment.transcriptionModel);

    return this.http.post(this.interactionAPI, formData, {
      responseType: 'blob',
    });
  }
}
