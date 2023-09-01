import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../../models/User.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) { }
  createUser(idToken: string) {
    // console.log(idToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });

    return this.httpClient.post<UserInfo>('http://localhost:3000/v1/user', null, {
      headers,
    });
  }

  getUser(uid: string, idToken: string) {
    return this.httpClient.get<UserInfo>(`http://localhost:3000/v1/user/${uid}`,{
      headers: new HttpHeaders({
        Authorization: `Bearer ${idToken}`
      })
      });
  }
}


