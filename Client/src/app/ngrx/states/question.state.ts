import { Question } from 'src/app/models/question.model';

export interface QuestionState {
  questions: Question[];
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getMessError: string;
  isCreateLoading: boolean;
  isCreateSuccess: boolean;
  createMessError: string;
}
