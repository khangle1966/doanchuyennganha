import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { quizBank } from 'src/app/models/quizBank.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizBankService {
  constructor(private http: HttpClient) {}

  getquizBankId(idToken: string, id: string) {
    return this.http.get<quizBank[]>(environment.local_url + 'quiz-bank' + id, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${idToken}`,
      }),
    });
  }

  addquizBank(idToken: string, quizBank: quizBank) {
    return this.http.post<quizBank>(
      environment.local_url + 'quiz-bank',
      quizBank,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }

  updatequizBank(idToken: string, quizBank: quizBank) {
    return this.http.put<quizBank>(
      environment.local_url + `quiz-bank/${quizBank._id}`,
      quizBank,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }

  deletequizBank(idToken: string, quizBankId: string) {
    return this.http.delete<quizBank>(
      environment.local_url + `quiz-bank/${quizBankId}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }
}
