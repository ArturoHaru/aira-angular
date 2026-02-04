import { MainPage } from '../main-page';

export class SendingData implements MainPageState {
  constructor(private context: MainPage) {}

  async onEnter(): Promise<void> {
    await this.context.commandVad.pauseVAD();
    await this.context.wakeVad.pauseVAD();
  }

  async onExit(): Promise<void> {}
}
