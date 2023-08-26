import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<QuizBank>;

@Schema({ timestamps: true })

export class QuizBank {

    // @Prop({ required: true, unique: true })

    // id: string;

    @Prop({ required: true })

    question: string;

    @Prop()
    image: string;

    @Prop()

    options: string[];

    @Prop()

    answer: string;

}

export const QuizBankSchema = SchemaFactory.createForClass(QuizBank);