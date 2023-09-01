export class CreateQuizDto {
    constructor(
        public title: string,
        public courseId: string,
        public content: string,
        public total: number,
        public duration: number,
        public passCond: number,
    ) { }
}
