import { Injectable } from '@angular/core';
import { MicVAD } from '@ricky0123/vad-web';
import { SpeechesService } from './speaches';
// link to the docs: https://docs.vad.ricky0123.com/

@Injectable({
  providedIn: 'root',
})
export class Vad {
  private vadObject: MicVAD | null = null;

  public async initVad(
    onVAD: () => void,
    onVADEnd: (audio: Float32Array) => void,
    onMisfire: () => void,
  ) {
    this.vadObject = await MicVAD.new({
      baseAssetPath: '/',
      onnxWASMBasePath: '/',
      minSpeechMs: 300,
      redemptionMs: 100,
      onSpeechStart: () => {
        onVAD();
      },
      onSpeechEnd: (audio) => {
        onVADEnd(audio);
      },
      onVADMisfire: () => {
        onMisfire();
      },
    });
  }

  public startVAD() {
    if (this.vadObject != null) {
      this.vadObject.start();
    } else {
      console.log('initialize vad object first!');
    }
  }
}
