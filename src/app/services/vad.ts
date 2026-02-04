import { Injectable } from '@angular/core';
import { MicVAD } from '@ricky0123/vad-web';
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

  public async startVAD() {
    if (this.vadObject != null) {
      await this.vadObject.start();
    } else {
      console.log('Vad non inizializzato');
    }
  }

  public async pauseVAD() {
    if (this.vadObject != null) {
      await this.vadObject.pause();
    } else {
      console.log('Vad non inizializzato');
    }
  }
}
