export class CreateQuizBankDto {
  constructor(
    // public id: string,
    public img: string,
    public question: string,
    public options: string[],
    public answer: string,
  ) { }
}
