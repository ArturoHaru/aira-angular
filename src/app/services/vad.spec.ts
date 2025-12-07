import { TestBed } from '@angular/core/testing';

import { Vad } from './vad';

describe('Vad', () => {
  let service: Vad;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vad);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
