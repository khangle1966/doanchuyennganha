import { Course } from 'src/app/models/course.model';
import { Profile } from 'src/app/models/profile.model';

export interface CartState {
  cartList: Course[];
  courseList: Course[];
  total: number;
}
