import { Component, signal } from '@angular/core';
import { Test } from './components/test/test';

@Component({
  selector: 'app-root',
  imports: [Test],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('aira-angular');
}
