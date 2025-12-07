import { Injectable } from '@angular/core';
import { MicVAD } from '@ricky0123/vad-web';
// link to the docs: https://docs.vad.ricky0123.com/

@Injectable({
  providedIn: 'root',
})
export class Vad {
  private vadObject: MicVAD | null = null;

  public async initVad(onVAD: () => void, onVADEnd: () => void) {
    this.vadObject = await MicVAD.new({
      baseAssetPath: '/',
      onnxWASMBasePath: '/',
      onSpeechEnd: (audio) => {
        onVADEnd();
      },
      onSpeechStart: () => {
        onVAD();
      },
      minSpeechMs: 100,
      redemptionMs: 100,
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
