import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextStepComponent } from './text-step.component';

describe('TextStepComponent', () => {
  let component: TextStepComponent;
  let fixture: ComponentFixture<TextStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
