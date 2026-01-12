import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Llm } from '../llm';

@Component({
  selector: 'app-test-chatbot',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './test-chatbot.html',
  styleUrl: './test-chatbot.scss',
})
export class TestChatbot {
  constructor(private llm: Llm) {}

  answerText$: Observable<{ content: string }> | null = null;
  promptFormControl = new FormControl('');

  askChatbot() {
    const prompt = this.promptFormControl.value;
    console.log(prompt);
    if (!prompt) {
      console.error('Prompt cannot be null');
    } else {
      this.answerText$ = this.llm.getAnswer(prompt);
    }
  }
}
