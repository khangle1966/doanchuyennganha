import { createAction, props } from "@ngrx/store";
import { Course } from "src/app/models/Course.model";

export const get = createAction('[course] get course');
export const getSuccess = createAction(
    '[course] get course success',
     props<{courseList: Course[]}>()
    );
export const getFailure = createAction(
    '[course] get course failure',
    props<{error: any}>()
);