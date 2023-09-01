import { Course } from "src/app/models/Course.model";


export interface CourseState{
    isLoading: boolean;
    isSuccess: boolean;
    isDelSuccess: boolean;
    isDelloading: boolean;
    isAddSuccess: boolean;
    isAddloading: boolean;
    isUpSuccess: boolean;
    isUpLoading: boolean;
    courseList: Course[];
    error: string;
}