import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/models/Course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private httpClient: HttpClient) {}
  getCourse(idToken: string) {
    return this.httpClient.get<Course[]>('http://localhost:3000/v1/course', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${idToken}`,
      }),
    });
  }
  getCourseById(idToken: string, id: string) {
    return this.httpClient.get<Course>(
      `http://localhost:3000/v1/course/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }
  buyCoure(idToken: string, courseId: string, userId: string) {
    return this.httpClient.put<any>(
      `http://localhost:3000/v1/course/${courseId}`,
      { userId },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }
}
