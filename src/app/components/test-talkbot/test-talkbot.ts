import { Component, signal } from "@angular/core";
import { AzureTranscriber } from "../../services/azure-transcriber";
import { LmStudio } from "../../services/lm-studio";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-test-talkbot",
  imports: [AsyncPipe],
  templateUrl: "./test-talkbot.html",
  styleUrl: "./test-talkbot.scss",
})
export class TestTalkbot {
  constructor(
    private azureTranscriber: AzureTranscriber,
    private lmstudio: LmStudio,
  ) {}

  text = signal("");
  answerText$: Observable<{ content: string }> | null = null;

  async startTranscription() {
    try {
      const transcription = await this.azureTranscriber.transcribeOnce();
      this.text.set(`You said: ${transcription}`);
      this.answerText$ = this.lmstudio.getResponse(transcription);
    } catch (error) {
      console.error(
        "Si è verificato un errore durante la trascrizione:",
        error,
      );
    }
  }

  async disposeRecognizer() {
    this.azureTranscriber.dispose();
  }
}
