import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiDialogService,
} from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Quiz } from 'src/app/models/quiz.model';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { QuizState } from 'src/app/ngrx/states/quiz.state';
import * as QuizActions from 'src/app/ngrx/actions/quiz.actions';
import { Observable, Subscription } from 'rxjs';
import { QuestionService } from 'src/app/services/question/question.service';
import * as QuestionActions from 'src/app/ngrx/actions/question.actions';
import { QuestionState } from 'src/app/ngrx/states/question.state';
import { quizBank } from 'src/app/models/quizBank.model';
import { quizBankState } from 'src/app/ngrx/states/quizBank.state';
// import { QuizBank } from 'src/app/models/quizBank.model';
import * as quizBankActions from 'src/app/ngrx/actions/quizBank.actions';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.less'],
})
export class QuizEditorComponent implements OnInit, OnDestroy {
  quizBank!: quizBank;
  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private router: Router,
    private readonly dialogs: TuiDialogService,
    private questionService: QuestionService,
    private store: Store<{
      auth: AuthState;
      quiz: QuizState;
      question: QuestionState;
      quizBank: quizBankState;
    }>
  ) {
    this.items.push({
      caption: 'Current',
      routerLink: this.router.url,
    });
  }

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

  //addquizbank xong nhét idquizbank vào addquestion
  // addquizBank() {}

  // addQuestion(quizBankId: string)
  // addQuestion() {
  //   const newQuestion: any = {
  //     quizId: this.router.url.split('/')[4],
  //     ordinalNum: this.questionList.length,
  //   };
  //   this.questionList.push(newQuestion);
  //   this.store.dispatch(
  //     QuestionActions.create({ question: newQuestion, idToken: this.idToken })
  //   );
  // }
  addquizBank() {
    const newQuizBank: any = {
      question: 'Your question here',
      options: ['Option 1', 'Option 2'],
      answerList: ['0'],
      img: '',
    };
    this.store.dispatch(
      quizBankActions.addquizBank({
        quizBank: newQuizBank,
        idToken: this.idToken,
      })
    );
    this.addQuestion(newQuizBank);
  }

  //add func
  questionList: Question[] = [];

  addQuestion(quizBank: quizBank) {
    const newQuestion: Question = {
      questionText: 'Your question here',
      correctOption: 0,
      quizBank: quizBank,
      _id: '',
      ordinalNum: 0,
      quizId: this.router.url.split('/')[4],
    };
    this.store.dispatch(
      QuestionActions.create({
        question: newQuestion,
        idToken: this.idToken,
      })
    );
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
    this.store.dispatch(
      QuestionActions.remove({
        idToken: this.idToken,
        questionId: this.questionList[i]._id,
      })
    );
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

  ngOnInit(): void {
    // chỉnh cái trên xíu
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
          this.store.dispatch(
            QuestionActions.getAllByQuizId({
              idToken: this.idToken,
              quizId: quiz._id,
            })
          );
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
        }),
      this.store.select('quizBank', 'quizBank').subscribe((quizBank) => {
        if (quizBank != null && quizBank != undefined) {
          quizBank = quizBank;
          this.handleQuizBankLoadSuccess();
        }
      }),
      this.store
        .select('quizBank', 'isCreateSuccess')
        .subscribe((isCreateSuccess) => {
          if (isCreateSuccess) {
            this.alerts
              .open('Create quizBank success !!!', { status: 'success' })
              .subscribe();
            this.handleQuizBankCreateSuccess();
          }
        }),
      this.store
        .select('quizBank', 'createMessError')
        .subscribe((createMessError) => {
          if (createMessError != '') {
            this.alerts.open(createMessError, { status: 'error' }).subscribe();
          }
        })
    );

    this.store.select('question', 'isGetSuccess').subscribe((val) => {
      if (val) {
        this.alerts
          .open('List questons success !!!!', { status: 'success' })
          .subscribe();
      }
    }),
      this.store.select('question', 'questions').subscribe((val) => {
        if (val != null && val != undefined) {
          this.questionList = val;
          console.log('questionList: ', this.questionList);
        }
      });
  }
  private handleQuizBankLoadSuccess() {}
  private handleQuizBankCreateSuccess() {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
