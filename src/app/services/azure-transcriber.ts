import { Injectable, HostListener, OnInit } from '@angular/core';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { environment } from '../../environments/environment.development';
import { window } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AzureTranscriber {
  // **Sostituisci con le tue credenziali di Azure Speech Service**
  private readonly speechKey: string = environment.azureKey;
  private readonly speechRegion: string = environment.azureRegion;
  recognizer: sdk.SpeechRecognizer | null = null;

  public async transcribeOnce() {
    if (!this.recognizer) {
      const speechConfig = sdk.SpeechConfig.fromSubscription(this.speechKey, this.speechRegion);
      const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
      this.recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    }

    this.recognizer.canceled = (s, e) => {
      console.log(`CANCELED: Reason=${e.reason}`);
      if (e.reason === sdk.CancellationReason.Error) {
        console.error(`CANCELED: ErrorCode=${e.errorCode}`);
        console.error(`CANCELED: ErrorDetails=${e.errorDetails}`);
      }
    };

    return await new Promise<string>((resolve, reject) => {
      if (this.recognizer)
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

  //Host listener should intercept attempts of leaving the page to close the connection
  @HostListener('window:beforeunload')
  handleReload() {
    console.log('Disposing');
    this.dispose();
  }

  public async dispose() {
    return await new Promise(() => {
      if (this.recognizer) {
        this.recognizer.close();
        location.reload();
      } else console.error("Recognizer is null, can't close null recognizer.");
    });
  }
}
