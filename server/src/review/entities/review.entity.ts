
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true })
    quizId: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    score: number;

    @Prop()
    answer: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizBank', required: true })
    quizBank: object;

}

export const ReviewSchema = SchemaFactory.createForClass(Review);

