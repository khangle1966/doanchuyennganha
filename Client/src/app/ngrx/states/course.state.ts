import { Course } from 'src/app/models/course.model';

export interface CourseState {
  isLoading: boolean;
  isSuccess: boolean;
  isDelSuccess: boolean;
  isDelLoading: boolean;
  delErrMess: string;
  isAddSuccess: boolean;
  isAddLoading: boolean;
  addErrMess: string;
  isUpSuccess: boolean;
  isUpLoading: boolean;
  updateErrMess: string;
  courseList: Course[];
  courseDetail: Course;
  error: string;

  //getBuyUser
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrMess: string;
}
