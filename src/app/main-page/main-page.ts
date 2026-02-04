import { Component, OnInit, signal } from '@angular/core';
import { Vad } from '../services/vad';
import { VoiceInteraction } from '../services/VoiceInteraction';
import { OpenWakeWord } from '../services/open-wake-word';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage implements OnInit {
  color = signal('green');
  text = signal('Speak to change the text');

  constructor(
    private wakeWord: OpenWakeWord,
    private wakeVad: Vad,
    private commandVad: Vad,
    private voiceInteraction: VoiceInteraction,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.wakeVad.initVad(
      () => this.onWakeWordStartListening(),
      async (audio) => this.onWakeWordFinishListening(audio),
      () => this.onWakeWordMisfire(),
    );

    await this.commandVad.initVad(
      () => this.onStartListening(),
      async (audio) => this.onFinishListening(audio),
      () => this.onMisfire(),
    );

    await this.commandVad.pauseVAD();
  }

  private onWakeWordStartListening() {
    this.color.set('#90EE90');
    console.log('wakevad startlistening called');
  }

  private onWakeWordFinishListening(audio: Float32Array) {
    //manda al backend senza mettere in pausa
    const audioBlob = float32ToWavBlob(audio);

    this.wakeWord.check(audioBlob).subscribe(async (response) => {
      if (!response.wakeWordPresent) return;
      await this.wakeVad.pauseVAD();
      await this.commandVad.startVAD().then(() => {
        this.color.set('red');
      });
    });
  }

  private onWakeWordMisfire() {
    this.color.set('green');
  }

  private onStartListening() {
    this.color.set('#FF474C');
  }

  private async onFinishListening(audio: Float32Array) {
    this.color.set('red');
    console.log('commandvad onFinishListening called');
    await this.commandVad.pauseVAD();
    await this.wakeVad.startVAD();
    const audioBlob = float32ToWavBlob(audio);
    //play audio ⬇
    this.voiceInteraction.sendVoiceCommand(audioBlob).subscribe(async (answerAudioBlob) => {
      const audioUrl = URL.createObjectURL(answerAudioBlob);
      const audio = new Audio(audioUrl);
      audio.play().catch((err) => console.error(err));
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    });
  }

  private onMisfire() {
    this.color.set('red');
  }
}

function float32ToWavBlob(float32Array: Float32Array, sampleRate: number = 16000): Blob {
  const buffer = new ArrayBuffer(44 + float32Array.length * 2);
  const view = new DataView(buffer);

  // Scrittura Header WAV (RIFF)
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 32 + float32Array.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM Lineare
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true); // 16-bit
  writeString(view, 36, 'data');
  view.setUint32(40, float32Array.length * 2, true);

  // Conversione Float32 -> Int16 (PCM)
  let offset = 44;
  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
