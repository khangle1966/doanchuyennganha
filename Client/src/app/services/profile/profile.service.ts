import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

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
    );
  }

  get(idToken: string, id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });

    return this.httpClient.get<any>(`http://localhost:3000/v1/profile/${id}`, {
      headers,
    });
  }
}
