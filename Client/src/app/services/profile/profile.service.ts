import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient:HttpClient) { }
  updateProfile(idToken: string, course: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });
    return this.httpClient.put<any>(`http://localhost:3000/v1/profile/${idToken}`, course, {
      headers,
    });
  }
}
