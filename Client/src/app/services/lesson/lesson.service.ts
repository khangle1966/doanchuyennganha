import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from 'src/app/models/Lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

 

  constructor(private httpClient : HttpClient) {}

  create(lesson: Lesson, idToken: string) {
    return this.httpClient.post<any>(
      `http://localhost:3000/v1/lesson`,
      lesson,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }
  
   getLesson(idToken: string, courseId: string) {
    return this.httpClient.get<Lesson>(
      `http://localhost:3000/v1/lesson/${courseId}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }
}