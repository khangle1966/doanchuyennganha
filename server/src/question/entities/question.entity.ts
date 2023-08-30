import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { QuizBank } from 'src/quiz-bank/entities/quiz-bank.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({ timestamps: true })
export class Question {


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true })
  quiz: Quiz[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizBank', required: true })
  quizbankId: QuizBank[];


}

export const QuestionSchema = SchemaFactory.createForClass(Question);
