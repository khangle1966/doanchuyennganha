export interface Quiz {
  _id: string;
  title: string;
  courseId: string[];
  img: string;
  content: string;
  total: number;
  time: Date;
}
