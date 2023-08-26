import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {

    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop()
    img: string;

    @Prop()
    price: string;

    // @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }])
    // students: string[];
    @Prop()
    author: string;


}

export const CourseSchema = SchemaFactory.createForClass(Course);
