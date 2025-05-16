import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';


import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = environment.api;

  constructor(private http: HttpClient) {}

 
  getCourses(institutionId: string, filters?:{ name?: string}): Observable<any[]> {
    const params: any ={};

    if(filters?.name){
      params.name = filters.name;
    }
    return this.http.get<any[]>(`${this.baseUrl}/Course/Institution/${institutionId}`);
  }

  createCourse(course: { name: string; description: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/Course`, course);
  }

  updateCourse(id: string, course: any): Observable<any> {
     return this.http.patch(`${this.baseUrl}/course/${id}`, course);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Courses/${id}`);
  }

// course.service.ts
getAll(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/course`);
}


}