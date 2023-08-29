export class CreateQuizBankDto {
  constructor(
    // public id: string,
    public image: string,
    public question: string,
    public options: string[],
    public answer: string,
  ) {}
}
