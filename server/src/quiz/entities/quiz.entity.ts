import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: true })
export class Quiz {
  @Prop()
  title: string;

  @Prop()
  courseId: string[];

  @Prop()
  img: string;

  @Prop()
  content: string;

  @Prop()
  total: number;

  @Prop()
  time: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
