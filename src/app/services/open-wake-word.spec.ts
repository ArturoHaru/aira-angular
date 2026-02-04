import { TestBed } from '@angular/core/testing';

import { OpenWakeWord } from './open-wake-word';

describe('OpenWakeWord', () => {
  let service: OpenWakeWord;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenWakeWord);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
