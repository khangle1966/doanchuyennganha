export class CreateReviewDto {

    constructor(
        public quizId: string,
        public userId: string,
        public score: number,
        public answer: string[],
        public quizBank: string,
    ) { }
}
