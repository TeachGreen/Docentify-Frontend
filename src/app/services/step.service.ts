import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { httpOptions } from '../config/httpOptions';

@Injectable({ providedIn: 'root' })
export class StepService {
  private baseUrl = environment.api;

  constructor(private http: HttpClient) {}

  /** Cria um novo passo vinculado a um curso */
  createStep(courseId: number, stepData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Step/Course/${courseId}`, stepData, httpOptions);
  }

  /** Atualiza um passo específico */
  updateStep(stepId: number, stepData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/Step/${stepId}`, stepData, httpOptions);
  }

getStepsByCourse(courseId: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/Course/${courseId}/with-steps`, httpOptions);
}



}
