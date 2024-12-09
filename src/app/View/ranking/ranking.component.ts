import { Component, ViewChild } from '@angular/core';
import { httpOptions } from '../../config/httpOptions';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {
  @ViewChild('search') search: any;

  podium: any;
  ranking: any;
  userId: any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get(`${environment.api}/ranking`, httpOptions)
      .subscribe((data: any) => {
        this.ranking = data.rankings;
        this.podium = data.rankings.slice(0, 3);
      });

    this.userId = parseInt(localStorage.getItem('user') ?? '0');
    console.log(this.userId);
  }

  filtrar() {
    this.httpClient.get(`${environment.api}/Ranking?search=${this.search.nativeElement.value}`, httpOptions)
      .subscribe((data: any) => {
        this.ranking = data.rankings;
      });
  }
}
