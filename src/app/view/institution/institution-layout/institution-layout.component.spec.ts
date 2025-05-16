import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionLayoutComponent } from './institution-layout.component';

describe('InstitutionLayoutComponent', () => {
  let component: InstitutionLayoutComponent;
  let fixture: ComponentFixture<InstitutionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstitutionLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstitutionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
