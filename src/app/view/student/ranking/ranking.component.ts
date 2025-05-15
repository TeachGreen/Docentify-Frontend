import { Component, ViewChild } from '@angular/core';
import { httpOptions } from '../../../config/httpOptions';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {
  @ViewChild('search') search: any;

  podium: any;
  rankingData: any;
  currentPage: number = 1;
  userId: any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get(`${environment.api}/ranking`, httpOptions)
      .subscribe((data: any) => {
        this.rankingData = data;
        this.podium = data.rankings.slice(0, 3);
      });

    this.userId = parseInt(localStorage.getItem('user') ?? '0');
  }

  filtrar() {
    this.httpClient.get(`${environment.api}/Ranking?search=${this.search.nativeElement.value}`, httpOptions)
      .subscribe((data: any) => {
        this.rankingData = data;
      });
  }

  previousPage() {
    this.currentPage--;
    this.httpClient.get(`${environment.api}/Ranking?page=${this.currentPage}${this.search.nativeElement.value ? '&search=' + this.search.nativeElement.value : ''}`, httpOptions)
      .subscribe((data: any) => {
        this.rankingData = data;
      });
  }

  nextPage() {
    this.currentPage++;
    this.httpClient.get(`${environment.api}/Ranking?page=${this.currentPage}${this.search.nativeElement.value ? '&search=' + this.search.nativeElement.value : ''}`, httpOptions)
      .subscribe((data: any) => {
        this.rankingData = data;
      });
  }
}
