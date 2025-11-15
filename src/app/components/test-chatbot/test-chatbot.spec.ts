import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChatbot } from './test-chatbot';

describe('TestChatbot', () => {
  let component: TestChatbot;
  let fixture: ComponentFixture<TestChatbot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestChatbot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestChatbot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
