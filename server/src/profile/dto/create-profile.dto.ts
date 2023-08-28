export class CreateProfileDto {
  constructor(
    public id: string,
    public userName: string,
    public displayName: string,
    public email: string,
    public country: string,
    public avatar: string,
    public sex: string,
    public courses: string[],
    public bio: string,
    public notifications: string[],
    public messages: string[],
  ) {}
}
