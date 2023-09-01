export interface Quiz {
  _id: string;
  title: string;
  courseId: string;
  content: string;
  total: number;
  duration: number;
  passCond: number;
}
