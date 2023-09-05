import { Quiz } from 'src/app/models/quiz.model';

export interface QuizState {
  quiz: Quiz | null;
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getMessError: string;
  isCreateLoading: boolean;
  isCreateSuccess: boolean;
  createMessError: string;
  isUpdateLoading: boolean;
  isUpdateSuccess: boolean;
  updateMessError: string;
}
