import { MainPage } from '../main-page';

/**
 * Controlla la wakeword
 */
export class PassiveListening implements MainPageState {
  constructor(private context: MainPage) {}

  async onEnter(): Promise<void> {
    this.context.color.set('green');
    this.context.microphoneColor.set('white');
    this.context.text.set('Say "Alexa" to interact');

    await this.context.wakeVad.startVAD();
  }

  async onExit(): Promise<void> {
    await this.context.wakeVad.pauseVAD();
  }
}
