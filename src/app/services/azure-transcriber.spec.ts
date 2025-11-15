import { TestBed } from '@angular/core/testing';

import { AzureTranscriber } from './azure-transcriber';

describe('AzureTranscriber', () => {
  let service: AzureTranscriber;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureTranscriber);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
