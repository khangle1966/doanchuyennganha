import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { Question } from 'src/app/models/Question.model';
import { QuizBank } from 'src/app/models/QuizBank.model';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.less'],
})
export class QuizEditorComponent {
  updateQuestionContent($event: string) {
    throw new Error('Method not implemented.');
  }
  saveQuestionContent() {
    throw new Error('Method not implemented.');
  }
  selectedQuestion: Question | null = null;
  selectQuestion(question: Question) {
    this.selectedQuestion = question;
  }
  questionList: Question[] = [];
  order = new Map();
  addQuestion() {
    this.questionList.push({
      _id: Date.now().toString(),
      quizBank: <QuizBank>{},
      quizId: this.router.url.split('/')[4],
      ordinalNum: this.questionList.length,
    });
    console.log(this.questionList);
  }
  isPreview: boolean = true;
  isSave: boolean = false;

  items = [
    {
      caption: 'Admin',
      routerLink: '/base/admin',
    },
  ];

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private router: Router
  ) {
    this.items.push({
      caption: 'Current',
      routerLink: this.router.url,
    });
  }
  ngOnDestroy(): void {
    console.log('destroy');
  }

  successNotification(message: string): void {
    this.alerts
      .open('', {
        label: message,
        status: 'success',
        autoClose: 4000,
      })
      .subscribe();
  }

  warningNotification(message: string): void {
    this.alerts
      .open('', {
        label: message,
        status: 'warning',
        autoClose: 4000,
      })
      .subscribe();
  }
}
