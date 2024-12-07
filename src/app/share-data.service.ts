import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private data = new Subject<any>();

  data$ = this.data.asObservable();


  getData(data: any) {
    this.data.next(data);
  }
}
