import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateStudentComponent } from './associate-student.component';

describe('AssociateStudentComponent', () => {
  let component: AssociateStudentComponent;
  let fixture: ComponentFixture<AssociateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociateStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
