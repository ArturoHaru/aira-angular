import { Component, signal } from '@angular/core';
import { Test } from './components/test/test';
import { TestChatbot } from './components/test-chatbot/test-chatbot';

@Component({
  selector: 'app-root',
  imports: [Test, TestChatbot],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('aira-angular');
}
