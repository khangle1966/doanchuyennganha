export class CreateProfileDto {
  constructor(
    public uId: string,
    public userName: string,
    public displayName: string,
    public email: string,
    public country: string,
    public avatar: string,
    public sex: string,
    public bio: string,
    public role: string,
    public notifications: string[],
    public messages: string[],
    public completeCourse: string[],
    public ongoingCourse: string[],
    public courses: string[],
  ) {}
}
