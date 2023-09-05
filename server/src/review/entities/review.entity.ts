
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' })
    quizId: string;

    @Prop({ required: true })
    userId: string;

    @Prop()
    score: number;

    @Prop()
    answer: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizBank' })
    quizBankId: string;

}

export const ReviewSchema = SchemaFactory.createForClass(Review);

