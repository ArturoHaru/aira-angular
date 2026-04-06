import { Component, inject, InjectionToken, OnInit, signal } from '@angular/core';
import { Vad } from '../services/vad';
import { VoiceInteraction } from '../services/VoiceInteraction';
import { OpenWakeWord } from '../services/open-wake-word';
import { PassiveListening } from './states/passive-listening';
import { ActiveListening } from './states/active-listening';
import { TransferingData } from './states/transfering-data';
import { float32ToWavBlob } from './audio-converter';
import { Speaking } from './states/speaking';

export const WAKE_VAD = new InjectionToken<Vad>('wakeVAD');
export const COMMAND_VAD = new InjectionToken<Vad>('commandVAD');

@Component({
  standalone: true,
  providers: [
    { provide: WAKE_VAD, useClass: Vad },
    { provide: COMMAND_VAD, useClass: Vad },
  ],
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage implements OnInit {
  color = signal('green');
  microphoneColor = signal('white');
  text = signal('Say "aira" to interact');

  state: MainPageState = new PassiveListening(this);

  constructor(
    public wakeWord: OpenWakeWord,
    public voiceInteraction: VoiceInteraction,
  ) {}

  wakeVad = inject(WAKE_VAD);
  commandVad = inject(COMMAND_VAD);

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

    //li fermo entrambi e lascio che sia la state machine a gestirli
    await this.commandVad.pauseVAD();
    await this.wakeVad.pauseVAD();
    await this.state.onEnter();
  }

  async changeState(newState: MainPageState) {
    await this.state.onExit();
    this.state = newState;
    await this.state.onEnter();
  }

  private onWakeWordStartListening() {
    this.color.set('#90EE90');
  }

  private onWakeWordFinishListening(audio: Float32Array) {
    const audioBlob = float32ToWavBlob(audio);

    this.wakeWord.check(audioBlob).subscribe(async (response) => {
      let currentState = this.state;
      await this.changeState(new TransferingData(this));
      if (response.wakeword_detected) await this.changeState(new ActiveListening(this));
      else await this.changeState(currentState);
    });
  }

  private onWakeWordMisfire() {
    this.color.set('green');
  }

  private onStartListening() {
    this.color.set('#FF474C');
  }

  private async onFinishListening(audio: Float32Array) {
    const audioBlob = float32ToWavBlob(audio);
    //play audio ⬇
    this.voiceInteraction.sendVoiceCommand(audioBlob).subscribe(async (answerAudioBlob) => {
      await this.changeState(new TransferingData(this));
      await this.changeState(new Speaking(this, answerAudioBlob));
    });
  }

  private onMisfire() {
    this.color.set('red');
  }
}
