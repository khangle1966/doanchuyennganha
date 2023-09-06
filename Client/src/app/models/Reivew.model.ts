import { QuizBank } from "./quizBank";

export interface Review {
    _id: string,
    quizId: string,
    profileId: string,
    score: number,
    test: Array<{
        answer: string[];
        quizBankId: QuizBank;
    }>;
}
