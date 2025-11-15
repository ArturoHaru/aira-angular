import { Component, signal } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { LmStudio } from "../../services/lm-studio";
import { inject } from "@angular/core/primitives/di";
import { Observable } from "rxjs";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-test-chatbot",
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: "./test-chatbot.html",
  styleUrl: "./test-chatbot.scss",
})
export class TestChatbot {
  constructor(private lmstudio: LmStudio) {}

  answerText$: Observable<{ content: string }> | null = null;
  promptFormControl = new FormControl("");

  askChatbot() {
    const prompt = this.promptFormControl.value;
    console.log(prompt);
    if (!prompt) {
      console.error("Prompt cannot be null");
    } else {
      this.answerText$ = this.lmstudio.getResponse(prompt);
    }
  }
}
