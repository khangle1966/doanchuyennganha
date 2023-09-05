import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';
import { Quiz } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.less'],
})
export class QuizFormComponent {
  quizForm: FormGroup = new FormGroup({
    _id: new FormControl({ value: '', disabled: true }, Validators.required),
    courseId: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    total: new FormControl(0, Validators.required),
    duration: new FormControl(0, Validators.required),
    passCond: new FormControl(0, Validators.required),
  });
  quiz!: Quiz;
  @Input('quiz')
  set quizInput(value: Quiz | null) {
    if (value != null) {
      //binding val
      this.quiz = value;
      this.quizForm.patchValue(value);
    } else {
      this.quiz = <Quiz>{};
    }
  }
  @Input('isPreview') isPreview!: boolean;
  @Input('isSave')
  set isSaveInput(isSave: boolean) {
    if (isSave) {
      if (this.quizForm.invalid) {
        this.dangerNotification(
          'Please correct this quiz form before save !!!'
        );
        return;
      }
      let newQuizContent = {
        ...this.quizForm.value,
        _id: this.quiz._id,
        courseId: this.quiz.courseId,
      };
      this.saveEvent.emit(newQuizContent);
    }
  }
  @Output('save') saveEvent: EventEmitter<Quiz> = new EventEmitter();

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService
  ) {}

  //noti func
  dangerNotification(message: string): void {
    this.alerts
      .open('', {
        label: message,
        status: 'error',
        autoClose: 3500,
      })
      .subscribe();
  }
}
