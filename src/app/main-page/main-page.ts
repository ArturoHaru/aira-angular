import { Component, OnInit, signal } from '@angular/core';
import { Vad } from '../services/vad';
import { VoiceInteraction } from '../services/VoiceInteraction';
import { OpenWakeWord } from '../services/open-wake-word';
import { PassiveListening } from './states/passive-listening';
import { ActiveListening } from './states/active-listening';
import { SendingData } from './states/sending-data';
import { float32ToWavBlob } from './audio-converter';
import { Speaking } from './states/speaking';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage implements OnInit {
  color = signal('green');
  text = signal('Speak to change the text');
  state: MainPageState = new PassiveListening(this);

  constructor(
    public wakeWord: OpenWakeWord,
    public wakeVad: Vad,
    public commandVad: Vad,
    public voiceInteraction: VoiceInteraction,
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
    this.changeState(new SendingData(this));

    this.wakeWord.check(audioBlob).subscribe(async (response) => {
      if (response.wakeWordPresent) this.changeState(new ActiveListening(this));
      else this.changeState(new PassiveListening(this));
    });
  }

  private onWakeWordMisfire() {
    this.color.set('green');
  }

  private onStartListening() {
    this.color.set('#FF474C');
  }

  private async onFinishListening(audio: Float32Array) {
    this.changeState(new SendingData(this));
    const audioBlob = float32ToWavBlob(audio);
    //play audio ⬇
    this.voiceInteraction.sendVoiceCommand(audioBlob).subscribe(async (answerAudioBlob) => {
      this.changeState(new Speaking(this, answerAudioBlob));
    });
  }

  private onMisfire() {
    this.color.set('red');
  }
}
