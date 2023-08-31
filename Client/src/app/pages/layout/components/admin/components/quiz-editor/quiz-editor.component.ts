import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiDialogService,
} from '@taiga-ui/core';
import { Question } from 'src/app/models/Question.model';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Quiz } from 'src/app/models/Quiz.model';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.less'],
})
export class QuizEditorComponent {
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
      this.successNotification('Question updated success !!!');
      console.log('lesonList: ', this.questionList);
    }
  }

  updateQuizContent($event: Quiz) {
    this.quiz = $event;
    this.successNotification('Update quiz info success !!!');
  }

  save() {
    this.isSave = true;
    setInterval(() => {
      this.isSave = false;
    }, 2000);
  }

  quiz: Quiz = {
    _id: Date.now().toString(),
    content: `Bài quiz tổng hợp kiến thức đã học của course !!!`,
    courseId: this.router.url.split('/')[4],
    duration: 20,
    total: 100,
    title: 'This is a quiz content !!!!',
    passCond: 80,
  };
  editQuiz() {
    this.selectedQuestion = null;
  }

  //get func
  selectedQuestion: Question | null = null;
  selectQuestion(question: Question) {
    if (this.selectedQuestion?._id === question._id) {
      this.warningNotification('Question already selected !!!');
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
    this.successNotification('Delete question success !!!');
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
    private router: Router,
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService
  ) {
    this.items.push({
      caption: 'Current',
      routerLink: this.router.url,
    });
  }
  ngOnDestroy(): void {
    console.log('destroy');
  }

  //noti funcs
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
