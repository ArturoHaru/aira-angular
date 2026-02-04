import { MainPage } from '../main-page';

/**
 * Controlla la wakeword
 */
export class PassiveListening implements MainPageState {
  constructor(private context: MainPage) {}

  async onEnter(): Promise<void> {
    this.context.color.set('green');
    await this.context.wakeVad.startVAD();
  }

  async onExit(): Promise<void> {
    await this.context.wakeVad.pauseVAD();
  }
}
