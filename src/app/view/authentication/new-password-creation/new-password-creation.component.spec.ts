import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordCreationComponent } from './new-password-creation.component';

describe('NewPasswordCreationComponent', () => {
  let component: NewPasswordCreationComponent;
  let fixture: ComponentFixture<NewPasswordCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPasswordCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPasswordCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
