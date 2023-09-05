import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiDialogService,
} from '@taiga-ui/core';
import { Question } from 'src/app/models/question.model';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Quiz } from 'src/app/models/quiz.model';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { QuizState } from 'src/app/ngrx/states/quiz.state';
import * as QuizActions from 'src/app/ngrx/actions/quiz.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.less'],
})
export class QuizEditorComponent implements OnInit, OnDestroy {
  //update func
  updateQuestionContent(event: Question) {
    if (this.selectedQuestion != null) {
      this.questionList = this.questionList.map((quest) => {
        if (quest._id === this.selectedQuestion?._id) {
          return {
            ...quest,
            quizBank: event.quizBank,
            ordinalNum: quest.ordinalNum,
          };
        } else {
          return quest;
        }
      });
      this.alerts
        .open('Question updated success !!!', { status: 'success' })
        .subscribe();
      console.log('lesonList: ', this.questionList);
    }
  }

  updateQuizContent($event: Quiz) {
    this.store.dispatch(
      QuizActions.update({ idToken: this.idToken, quiz: $event })
    );
  }

  save() {
    this.isSave = true;
    setInterval(() => {
      this.isSave = false;
    }, 2000);
  }

  quiz: Quiz = {
    _id: Date.now().toString(),
    content: ``,
    courseId: this.router.url.split('/')[4],
    duration: 0,
    total: 0,
    title: '0',
    passCond: 0,
  };
  editQuiz() {
    this.selectedQuestion = null;
  }

  //get func
  selectedQuestion: Question | null = null;
  selectQuestion(question: Question) {
    if (this.selectedQuestion?._id === question._id) {
      this.alerts
        .open('Question already selected !!!', { status: 'info' })
        .subscribe();
      return;
    }
    console.log('selected quest', question);
    this.selectedQuestion = question;
  }

  //add func
  questionList: Question[] = [];
  addQuestion() {
    this.questionList.push({
      _id: Date.now().toString(),
      quizBank: {
        _id: Date.now().toString() + 1,
        img: '',
        question: 'This is a question',
        answerList: ['Answer 1'],
        options: [
          'Answer 1',
          'Answer 2',
          'Answer 3',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua.',
        ],
      },
      quizId: this.router.url.split('/')[4],
      ordinalNum: this.questionList.length,
    });
    console.log('questList: ', this.questionList);
  }

  order = new Map();
  updateOrdinalList() {
    // console.log('order change: ', this.order);
    this.order.forEach((val, i) => {
      this.questionList[i].ordinalNum = val;
    });
    console.log(this.questionList);
  }

  //del func
  showWarningDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content).subscribe();
  }

  deleteQuestion(i: number) {
    this.questionList = this.questionList.filter((val, index) => {
      if (index != i) {
        return val;
      } else {
        if (this.selectedQuestion != null) {
          if (val._id == this.selectedQuestion._id) {
            this.selectedQuestion = null;
          }
        }
        return;
      }
    });
    this.alerts
      .open('Delete question success !!!', { status: 'success' })
      .subscribe();
    console.log(this.questionList);
  }

  isPreview: boolean = true;
  isSave: boolean = false;
  idToken = '';
  subscriptions: Subscription[] = [];
  isGetLoading: boolean = false;

  items = [
    {
      caption: 'Admin',
      routerLink: '/base/admin',
    },
  ];

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private router: Router,
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private store: Store<{ auth: AuthState; quiz: QuizState }>
  ) {
    this.items.push({
      caption: 'Current',
      routerLink: this.router.url,
    });
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        if (idToken != '' && idToken != null && idToken != undefined) {
          this.idToken = idToken;
          this.store.dispatch(
            QuizActions.get({
              idToken: this.idToken,
              id: this.router.url.split('/')[4],
            })
          );
        }
      }),
      this.store.select('quiz', 'quiz').subscribe((quiz) => {
        if (quiz != null && quiz != undefined) {
          this.quiz = quiz;
        }
      }),
      this.store.select('quiz', 'isGetLoading').subscribe((isGetLoading) => {
        this.isGetLoading = isGetLoading;
      }),
      this.store.select('quiz', 'isGetSuccess').subscribe((isGetSuccess) => {
        if (isGetSuccess) {
          this.alerts
            .open('Load quiz success !!!', { status: 'success' })
            .subscribe();
        }
      }),
      this.store.select('quiz', 'getMessError').subscribe((getMessError) => {
        if (getMessError != '') {
          this.alerts.open(getMessError, { status: 'error' }).subscribe();
          if (getMessError == 'Quiz is undefined or null') {
            let newQuiz = {
              content: `Bài quiz tổng hợp kiến thức đã học của course !!!`,
              courseId: this.router.url.split('/')[4],
              duration: 20,
              total: 100,
              title: 'This is a quiz content !!!!',
              passCond: 80,
            };
            this.store.dispatch(
              QuizActions.create({
                idToken: this.idToken,
                quiz: newQuiz as Quiz,
              })
            );
          }
        }
      }),
      this.store
        .select('quiz', 'isCreateLoading')
        .subscribe((isCreateLoading) => {
          if (isCreateLoading) {
            this.alerts
              .open('Creating quiz...', { status: 'info' })
              .subscribe();
          }
        }),
      this.store
        .select('quiz', 'isCreateSuccess')
        .subscribe((isCreateSuccess) => {
          if (isCreateSuccess) {
            this.alerts
              .open('Create quiz success !!!', { status: 'success' })
              .subscribe();
            this.store.dispatch(
              QuizActions.get({
                idToken: this.idToken,
                id: this.router.url.split('/')[4],
              })
            );
          }
        }),
      this.store
        .select('quiz', 'createMessError')
        .subscribe((createMessError) => {
          if (createMessError != '') {
            this.alerts.open(createMessError, { status: 'error' }).subscribe();
          }
        }),
      this.store
        .select('quiz', 'isUpdateSuccess')
        .subscribe((isUpdateSuccess) => {
          if (isUpdateSuccess) {
            this.alerts
              .open('Update quiz success !!!', { status: 'success' })
              .subscribe();
          }
        }),
      this.store
        .select('quiz', 'updateMessError')
        .subscribe((updateMessError) => {
          if (updateMessError != '') {
            this.alerts.open(updateMessError, { status: 'error' }).subscribe();
          }
        })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
