import { MainPage } from '../main-page';

export class TransferingData implements MainPageState {
  constructor(private context: MainPage) {}

  async onEnter(): Promise<void> {
    await this.context.commandVad.pauseVAD();
    await this.context.wakeVad.pauseVAD();

    this.context.color.set('yellow');
  }

  async onExit(): Promise<void> {}
}
