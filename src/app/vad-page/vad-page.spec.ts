import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VadPage } from './vad-page';

describe('VadPage', () => {
  let component: VadPage;
  let fixture: ComponentFixture<VadPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VadPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
