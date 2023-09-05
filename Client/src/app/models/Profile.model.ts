import { Course } from './course.model';

export interface Profile {
  id: string;
  userName: string;
  displayName: string;
  email: string;
  country: string;
  avatar: string;
  gender: string;
  bio: string;
  notifications: string[];
  courses: Course[];
  ongoingCourses: Course[];
  completedCourses: Course[];
  role: string;
}
