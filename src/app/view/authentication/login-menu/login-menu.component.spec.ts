import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMenuComponent } from './login-menu.component';

describe('LoginComponent', () => {
  let component: LoginMenuComponent;
  let fixture: ComponentFixture<LoginMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginMenuComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
