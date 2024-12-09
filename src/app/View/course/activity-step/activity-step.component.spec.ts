import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityStepComponent } from './activity-step.component';

describe('ActivityStepComponent', () => {
  let component: ActivityStepComponent;
  let fixture: ComponentFixture<ActivityStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
