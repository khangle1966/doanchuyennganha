import { Course } from 'src/app/models/Course.model';
import { Profile } from 'src/app/models/Profile.model';

export interface CartState {
  cartList: Course[];
  courseList: Course[];
  total: number;
  isBuyLoading: boolean;
  isBuySuccess: boolean;
  buyErrorMessage: any;
  profile: Profile;
}
