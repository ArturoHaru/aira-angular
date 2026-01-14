import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Llm } from '../llm';

@Component({
  selector: 'app-test-talkbot',
  imports: [AsyncPipe],
  templateUrl: './test-talkbot.html',
  styleUrl: './test-talkbot.scss',
})
export class TestTalkbot {
  constructor(private llm: Llm) {}

  text = signal('');
  answerText$: Observable<{ content: string }> | null = null;

  async startTranscription() {
    try {
      //TODO implement talking
      const transcription = 'test';
      this.text.set(`You said: ${transcription}`);
      this.answerText$ = this.llm.getAnswer(transcription);
    } catch (error) {
      console.error('Si è verificato un errore durante la trascrizione:', error);
    }
  }
}
