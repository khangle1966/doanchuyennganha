import { Question } from 'src/app/models/question.model';

export interface QuestionState {
  questions: Question[];
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getMessError: string;
  isCreating: boolean;
  isCreatedSuccess: boolean;
  createMessError: string;
  isDeleting: boolean;
  isDeleteSuccess: boolean;
  deleteMessError: string;
}
