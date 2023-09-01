import { Course } from "src/app/models/Course.model";

export interface CartState{
    cartList: Course[];
    courseList: Course[];
    total: number;
}