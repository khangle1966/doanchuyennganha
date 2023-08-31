import { QuizBank } from './QuizBank.model';

export interface Question {
  _id: string;
  quizId: string;
  quizBank: QuizBank;
  ordinalNum: number;
}
