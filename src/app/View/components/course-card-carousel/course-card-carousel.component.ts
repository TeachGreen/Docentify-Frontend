import { Component, ContentChildren, Input, ElementRef, OnInit } from '@angular/core';
import { CourseCardComponent } from '../course-card/course-card.component';

@Component({
  selector: 'course-card-carousel',
  templateUrl: './course-card-carousel.component.html',
  styleUrl: './course-card-carousel.component.css'
})
export class CourseCardCarouselComponent {
  currentPage: number = 0;
  @Input() amountPerPage: number = 4;
  content: any;
  previousButton: any;
  nextButton: any;
  maxPage: number = 0;

  constructor( private el: ElementRef) {}

  ngAfterContentInit() {
    this.content = this.el.nativeElement.querySelectorAll('.course-card');
    this.previousButton = this.el.nativeElement.querySelector('.carousel-previous-page');
    this.nextButton = this.el.nativeElement.querySelector('.carousel-next-page');

    this.maxPage = Math.ceil(this.content.length / this.amountPerPage) - 1;
    this.showPage();
  }

  showPage() {
    let page = this.currentPage;
    if (page == 0 || this.content.length % this.amountPerPage == 0) {
      this.previousButton.disabled = true;
    } else {
      this.previousButton.disabled = false;
    }

    if (page == this.maxPage || this.content.length % this.amountPerPage == 0) {
      this.nextButton.style.cursor = 'not-allowed';
      this.nextButton.disabled = true;
    } else {
      this.nextButton.style.cursor = 'pointer';
      this.nextButton.disabled = false;
    }


    for (let i = 0; i < this.content.length; i++) {
      if (i >= page * this.amountPerPage && i < (page + 1) * this.amountPerPage) {
        this.content[i].style.display = 'block';
      } else {
        this.content[i].style.display = 'none';
      }
    }
    this.currentPage = page;
  }

  nextPage() {
    this.currentPage = Math.min(this.currentPage + 1, this.maxPage);
    this.showPage();
  }

  prevPage() {
    this.currentPage = Math.max(this.currentPage - 1, 0);
    this.showPage();
  }

}
