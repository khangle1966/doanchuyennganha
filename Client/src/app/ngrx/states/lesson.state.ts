import { Lesson } from 'src/app/models/lesson.model';

export interface LessonState {
  lessons: Lesson[];
  isGetting: boolean;
  isGetSuccess: boolean;
  getMessError: string;
  isCreating: boolean;
  isCreateSuccess: boolean;
  createMessError: string;
  isUpdating: boolean;
  isUpdateSuccess: boolean;
  updateMessError: string;
  isDeleting: boolean;
  isDeleteSuccess: boolean;
  deleteMessError: string;
}
