import { Injectable, OnInit } from "@angular/core";
import { inject } from "@angular/core/primitives/di";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LmStudio {
  private apiUrl = "http://localhost:8000/api/lmstudio";
  private http = inject(HttpClient);

  getResponse(prompt: string): Observable<{ content: string }> {
    return this.http.post<{ content: string }>(this.apiUrl, {
      messages: prompt,
    });
  }
}
