import { Lesson } from "src/app/models/lesson.model";


export interface LessonState{
    lessons: Lesson;
    idToken: string;
    isLoading: boolean;
    isSuccess: boolean;
    isGetLoading: boolean;
    isGetSuccess: boolean;
    error: any;
    getError: any;

}