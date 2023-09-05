import { QuizBank } from './quizBank.model';

export interface Question {
  _id: string;
  quizId: string;
  quizBank: QuizBank;
  ordinalNum: number;
}
