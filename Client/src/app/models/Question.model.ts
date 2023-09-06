import { quizBank } from './quizBank.model';

export interface Question {
  questionText: string;
  _id: string;
  quizId: string;
  quizBank: quizBank;
  ordinalNum: number;
  correctOption: number;
}
