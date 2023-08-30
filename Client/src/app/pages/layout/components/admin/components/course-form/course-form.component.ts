import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/Course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.less'],
})
export class CourseFormComponent {
  @Output('toggle') toggleEvent: EventEmitter<boolean> = new EventEmitter();
  @Output('editLessons') editLessonsEvent: EventEmitter<boolean> =
    new EventEmitter();
  @Output('editQuiz') editQuizEvent: EventEmitter<boolean> = new EventEmitter();

  @Input('isEdit') isEdit: boolean = false;
  @Input('course') course: Course | null = null;

  isDisable = true;

  courseForm: FormGroup = new FormGroup({
    _id: new FormControl({ value: '', disabled: true }, Validators.required),
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required),
    img: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    console.log(this.course);
    if (this.isEdit) {
      if (this.course != null) {
        this.courseForm = new FormGroup({
          _id: new FormControl(
            { value: this.course._id, disabled: true },
            Validators.required
          ),
          name: new FormControl(this.course.name, Validators.required),
          category: new FormControl(this.course.category, Validators.required),
          description: new FormControl(
            this.course.description,
            Validators.required
          ),
          price: new FormControl(this.course.price, Validators.required),
          img: new FormControl(this.course.img, Validators.required),
        });
      }
    }
  }

  toggle(toggle: boolean) {
    this.toggleEvent.emit(toggle);
  }

  editLessons() {
    this.editLessonsEvent.emit(false);
  }

  editQuiz() {
    this.editQuizEvent.emit(false);
  }
}
