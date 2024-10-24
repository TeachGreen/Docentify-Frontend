import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardCarouselComponent } from './course-card-carousel.component';

describe('CourseCardCarouselComponent', () => {
  let component: CourseCardCarouselComponent;
  let fixture: ComponentFixture<CourseCardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseCardCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
