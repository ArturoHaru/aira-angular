import { TestBed } from '@angular/core/testing';

import { LLMService } from './LLMService';

describe('Llm', () => {
  let service: LLMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LLMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
