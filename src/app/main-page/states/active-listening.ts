import { MainPage } from '../main-page';

export class ActiveListening implements MainPageState {
  constructor(private context: MainPage) {}

  async onEnter(): Promise<void> {
    await this.context.commandVad.startVAD();
    this.context.color.set('red');
  }

  async onExit(): Promise<void> {
    await this.context.commandVad.pauseVAD();
  }
}
