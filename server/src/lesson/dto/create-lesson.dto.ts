export class CreateLessonDto {
  constructor(
    public ordinalnumber: number,
    public title: string,
    public courseId: string,
    public content: string,
    public img: string,
    public decription: string,
  ) {}
}
