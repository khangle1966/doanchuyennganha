import { Course } from 'src/app/models/Course.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'src/app/models/Profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

<<<<<<< HEAD
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
=======
  updateProfile(idToken: string, profile: any, id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });
    return this.httpClient.put<any>(
      `http://localhost:3000/v1/profile/${id}`,
      profile,
      {
        headers,
      }
>>>>>>> c4b672380ff38fa638076bfc5013026d52e8b83f
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
      `http://localhost:3000/v1/profile/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }
}
