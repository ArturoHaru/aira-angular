import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTalkbot } from './test-talkbot';

describe('TestTalkbot', () => {
  let component: TestTalkbot;
  let fixture: ComponentFixture<TestTalkbot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTalkbot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTalkbot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
