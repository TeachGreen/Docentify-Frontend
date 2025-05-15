import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInstitutionComponent } from './login-institution.component';

describe('LoginInstitutionComponent', () => {
  let component: LoginInstitutionComponent;
  let fixture: ComponentFixture<LoginInstitutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginInstitutionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
