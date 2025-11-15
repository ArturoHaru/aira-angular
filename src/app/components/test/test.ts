import { Component, signal } from '@angular/core';
import { AzureTranscriber } from '../../services/azure-transcriber';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.html',
  styleUrl: './test.scss',
})
export class Test {
  // Nel tuo Componente Angular

  constructor(private azureTranscriber: AzureTranscriber) {}

  text = signal('');

  async startTranscription() {
    try {
      const transcription = await this.azureTranscriber.transcribeOnce();
      this.text.set(transcription);
      // Qui puoi aggiornare la tua UI con il risultato
    } catch (error) {
      console.error('Si è verificato un errore durante la trascrizione:', error);
    }
  }

  async disposeRecognizer() {
    this.azureTranscriber.dispose();
  }
}
