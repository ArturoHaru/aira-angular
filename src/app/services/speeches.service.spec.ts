import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpeechesService, SpeechesRequestBody } from './speeches.service';

describe('SpeechesService', () => {
  let service: SpeechesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpeechesService]
    });
    service = TestBed.inject(SpeechesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to the textToSpeech endpoint and return a blob', () => {
    const mockRequestBody: SpeechesRequestBody = {
      input: 'Hello world',
      model: 'speaches-ai/Kokoro-82M-v1.0-ONNX',
      voice: 'en_US-amy-medium'
    };
    const mockBlob = new Blob(['audio data'], { type: 'audio/mpeg' });

    service.textToSpeech(mockRequestBody).subscribe(response => {
      expect(response).toEqual(mockBlob);
    });

    const req = httpMock.expectOne('http://localhost:8000/v1/audio/speech');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ ...mockRequestBody, response_format: 'mp3' });
    expect(req.request.responseType).toEqual('blob');

    req.flush(mockBlob);
  });
});
