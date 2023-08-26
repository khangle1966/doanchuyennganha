import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Lesson>;
@Schema({ timestamps: true })
export class Lesson {

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    courseId: string[];

    @Prop({required: true})
    img: string;

    @Prop({required: true})
    content: string;

    @Prop({required: true})
    description: string;

}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
