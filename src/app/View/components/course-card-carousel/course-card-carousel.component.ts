import { Component, ContentChildren, Input, ElementRef, OnInit } from '@angular/core';
import { CourseCardComponent } from '../course-card/course-card.component';

@Component({
  selector: 'course-card-carousel',
  templateUrl: './course-card-carousel.component.html',
  styleUrl: './course-card-carousel.component.css'
})
export class CourseCardCarouselComponent {
  currentPage: number = 1;
  @Input() amountPerPage: number = 4;
  @Input() courses: any;
  content: any;
  previousButton: any;
  nextButton: any;
  maxPage: number = 1;

  constructor( private el: ElementRef) {}

  ngOnChanges() {
    this.previousButton = this.el.nativeElement.querySelector('.carousel-previous-page');
    this.nextButton = this.el.nativeElement.querySelector('.carousel-next-page');

    this.showPage();
  }

  showPage() {
    this.content = this.courses.slice((this.currentPage - 1) * this.amountPerPage, (this.currentPage) * this.amountPerPage);
    this.maxPage = Math.ceil(this.courses.length / this.amountPerPage);

    let page = this.currentPage;
    if (page == 1 || this.courses.length % this.amountPerPage == 0) {
      this.previousButton.style.cursor = 'not-allowed';
      this.previousButton.disabled = true;
    } else {
      this.previousButton.style.cursor = 'pointer';
      this.previousButton.disabled = false;
    }

    if (page == this.maxPage || this.courses.length % this.amountPerPage == 0) {
      this.nextButton.style.cursor = 'not-allowed';
      this.nextButton.disabled = true;
    } else {
      this.nextButton.style.cursor = 'pointer';
      this.nextButton.disabled = false;
    }

    this.currentPage = page;
  }

  nextPage() {
    this.currentPage = Math.min(this.currentPage + 1, this.maxPage);
    this.showPage();
  }

  prevPage() {
    this.currentPage = Math.max(this.currentPage - 1, 1);
    this.showPage();
  }

}
