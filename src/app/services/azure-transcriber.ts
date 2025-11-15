import { Injectable } from '@angular/core';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

@Injectable({
  providedIn: 'root',
})
export class AzureTranscriber {
  // **Sostituisci con le tue credenziali di Azure Speech Service**
  private readonly speechKey: string =
    '3RIZO6ivPaNQxpKRDEEzr27U75q9RpGWmjMH0Yx3M1i7i8hJ6X9pJQQJ99BAAC5RqLJXJ3w3AAAYACOGZf7r';
  private readonly speechRegion: string = 'westeurope';
  recognizer: sdk.SpeechRecognizer;

  constructor() {
    const speechConfig = sdk.SpeechConfig.fromSubscription(this.speechKey, this.speechRegion);
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    this.recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
  }

  public async dispose() {
    return await new Promise(() => {
      let error = this.recognizer.close();
      console.log(error);
    });
  }

  public async transcribeOnce() {
    this.recognizer.canceled = (s, e) => {
      console.log(`CANCELED: Reason=${e.reason}`);

      if (e.reason === sdk.CancellationReason.Error) {
        console.error(`CANCELED: ErrorCode=${e.errorCode}`);
        console.error(`CANCELED: ErrorDetails=${e.errorDetails}`);
      }
    };

    return await new Promise<string>((resolve, reject) => {
      this.recognizer.recognizeOnceAsync(
        (result) => {
          resolve(result.text);
        },
        (err) => {
          reject(err);
        },
      );
    });
  }
}
