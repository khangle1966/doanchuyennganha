import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from 'src/app/models/Lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

 

  constructor(private httpClient : HttpClient) {}


   getLesson(_id: string, idToken: string) {
    return this.httpClient.get<Lesson[]>(
      `http://localhost:3000/v1/lesson/${_id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }
}