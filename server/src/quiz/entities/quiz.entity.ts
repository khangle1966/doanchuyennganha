import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: true })
export class Quiz {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  courseId: string;

  @Prop()
  img: string;

  @Prop()
  content: string;

  @Prop()
  total: number;

  @Prop()
  duration: number;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
