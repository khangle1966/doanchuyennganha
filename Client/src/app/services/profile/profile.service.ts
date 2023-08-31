import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'src/app/models/Profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  create(profile: Profile, idToken: string) {
    return this.httpClient.post<Profile>(
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
