import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';




@Injectable({ providedIn: 'root' })
export class StepService {
  private baseUrl = environment.api; 

  constructor(private http: HttpClient) {}

  createStep(courseId: number, stepData: any) {
    return this.http.post(`${this.baseUrl}/Step/Course/${courseId}`, stepData);
  }

  updateStep(stepId: number, stepData: any) {
  return this.http.patch(`${this.baseUrl}/Step/${stepId}`, stepData);
}

getStepsByCourse(courseId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/Step/Course/${courseId}`);
}

}
