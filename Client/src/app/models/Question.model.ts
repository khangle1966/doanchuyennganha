import { QuizBank } from './quizBank';

export interface Question {
  _id: string;
  quizId: string;
  quizBank: QuizBank;
  ordinalNum: number;
}
