import { Component, signal } from '@angular/core';
import { Vad } from '../services/vad';

@Component({
  selector: 'app-vad-page',
  imports: [],
  templateUrl: './vad-page.html',
  styleUrl: './vad-page.scss',
})
export class VadPage {
  color = signal('red');

  constructor(public vad: Vad) {
    vad.initVad(
      () => {
        this.color.set('blue');
      },
      () => {
        this.onStopSpeaking();
      },
      () => {
        this.color.set('red');
      },
    );
  }

  onStopSpeaking() {
    this.color.set('red');
  }
}
