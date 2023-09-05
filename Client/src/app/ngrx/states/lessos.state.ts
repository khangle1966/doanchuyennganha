import { Lesson } from "src/app/models/Lesson.model";


export interface LessonState{
    lessons: Lesson[];
    isLoading: boolean;
    isSuccess: boolean;
    isGetLoading: boolean;
    isGetSuccess: boolean;
    error: any;
    getError: any;

}