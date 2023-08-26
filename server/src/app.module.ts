/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LessonsModule } from './lessons/lessons.module';
import { CourseModule } from './course/course.module';
import { QuizBankModule } from './quiz-bank/quiz-bank.module';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
@Module({
  imports:
    [
      MongooseModule.forRoot('mongodb+srv://tranvanhao016:hao123456@cluster0.mwofhtq.mongodb.net/'),
      AuthModule,
      UserModule,
      ProfileModule,
      LessonsModule,
      CourseModule,
      QuizBankModule,
      QuizModule,
      QuestionModule,
    ],


  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
