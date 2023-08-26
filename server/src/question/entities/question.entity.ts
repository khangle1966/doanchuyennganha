import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({ timestamps: true })
export class Question {


  @Prop({ required: true })
  quizid: string;

  @Prop({ required: true })
  quizbankid: string;


}

export const QuestionSchema = SchemaFactory.createForClass(Question);
