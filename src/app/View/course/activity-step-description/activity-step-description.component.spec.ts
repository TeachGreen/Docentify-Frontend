import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityStepDescriptionComponent } from './activity-step-description.component';

describe('ActivityStepDescriptionComponent', () => {
  let component: ActivityStepDescriptionComponent;
  let fixture: ComponentFixture<ActivityStepDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityStepDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityStepDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
