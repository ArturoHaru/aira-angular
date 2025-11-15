import { Component, signal } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { LmStudio } from "../../services/lm-studio";
import { inject } from "@angular/core/primitives/di";
import { Observable } from "rxjs";

@Component({
  selector: "app-test-chatbot",
  imports: [AsyncPipe],
  templateUrl: "./test-chatbot.html",
  styleUrl: "./test-chatbot.scss",
})
export class TestChatbot {
  constructor(private lmstudio: LmStudio) {}

  answerText$: Observable<{ content: string }> | null = null;

  askChatbot(prompt: string = "What is the meaning of life?") {
    this.answerText$ = this.lmstudio.getResponse(prompt);
  }
}
