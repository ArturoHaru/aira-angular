import { MainPage } from '../main-page';
import { PassiveListening } from './passive-listening';

export class Speaking implements MainPageState {
  constructor(
    private context: MainPage,
    private audioBlob: Blob,
  ) {}

  audio: HTMLAudioElement | null = null;

  async onEnter(): Promise<void> {
    this.context.color.set('yellow');

    await this.context.commandVad.pauseVAD();
    await this.context.wakeVad.startVAD(); //permetti di interrompere se senti la wakeword

    const audioUrl = URL.createObjectURL(this.audioBlob);
    this.audio = new Audio(audioUrl);

    this.audio.play().catch((err) => console.error(err));
    this.audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      this.context.changeState(new PassiveListening(this.context));
    };
  }

  async onExit(): Promise<void> {
    await this.context.commandVad.pauseVAD();
    await this.context.wakeVad.pauseVAD();

    if (this.audio === null) return;
    if (!this.audio.paused) {
      this.audio.pause();
    }
  }
}
