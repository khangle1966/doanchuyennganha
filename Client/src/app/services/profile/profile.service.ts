import { Course } from 'src/app/models/Course.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'src/app/models/Profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  //course
  getCourse() {
    return this.httpClient.get<Course[]>('http://localhost:3000/v1/course', {});
  }
  deleteCourse(_id: string) {
    return this.httpClient.delete<Course>(
      `http://localhost:3000/v1/course/${_id}`,
      {}
    );
  }
  addCourse(course: Course) {
    return this.httpClient.post<Course>(
      `http://localhost:3000/v1/course`,
      course,
      {}
    );
  }
  updateCourse(course: Course) {
    return this.httpClient.put<Course>(
      `http://localhost:3000/v1/course/${course._id}`,
      course,
      {}
    );
  }

  create(profile: Profile, idToken: string) {
    return this.httpClient.post<any>(
      `http://localhost:3000/v1/profile`,
      profile,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }

  get(id: string, idToken: string) {
    return this.httpClient.get<Profile>(
      `http://localhost:3000/v1/profile?id=${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }
}
