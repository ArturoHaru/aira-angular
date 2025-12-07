import { Component, signal } from '@angular/core';
import { Test } from './components/test/test';
import { TestChatbot } from './components/test-chatbot/test-chatbot';
import { TestTalkbot } from './components/test-talkbot/test-talkbot';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Test, TestChatbot, TestTalkbot, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('aira-angular');
}
