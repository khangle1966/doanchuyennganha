import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({ timestamps: true })
export class Question {


  @Prop({ required: true })
  quizId: string;

  @Prop({ required: true })
  quizbankId: string;


}

export const QuestionSchema = SchemaFactory.createForClass(Question);
