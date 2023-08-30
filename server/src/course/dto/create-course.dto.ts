export class CreateCourseDto {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public img: string,
    public category: string,
    public rating: number,
    public language: string,
    public price: string,
    public author: string,
  ) { }
}
