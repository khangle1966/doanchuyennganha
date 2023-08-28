export class CreateCourseDto {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public img: string,
    // public students: string[],
    public price: string,
    public author: string,
  ) {}
}
