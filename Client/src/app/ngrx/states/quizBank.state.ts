import { quizBank } from 'src/app/models/quizBank.model';

export interface quizBankState {
  newQuizBank: quizBank | null;
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
