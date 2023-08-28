import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonInfoFormComponent } from './lesson-info-form.component';

describe('LessonInfoFormComponent', () => {
  let component: LessonInfoFormComponent;
  let fixture: ComponentFixture<LessonInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonInfoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
