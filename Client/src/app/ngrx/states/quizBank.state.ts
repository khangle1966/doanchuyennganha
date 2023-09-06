import { quizBank } from 'src/app/models/quizBank.model';

export interface quizBankState {
  quizBank: quizBank[];
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getMessError: string;
  isCreateLoading: boolean;
  isCreateSuccess: boolean;
  createMessError: string;
}
